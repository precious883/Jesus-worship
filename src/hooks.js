import { useEffect, useRef, useState } from 'react';
import { YOUTUBE_CHANNEL_ID } from './config.js';

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
const CACHE_KEY = 'church-yt-videos-v1';
export const REFRESH_MS = 5 * 60 * 1000;

function parseXml(text) {
  const doc = new DOMParser().parseFromString(text, 'text/xml');
  return [...doc.getElementsByTagName('entry')].map(entry => {
    const get = tag => entry.getElementsByTagName(tag)[0]?.textContent ?? '';
    return { id: get('yt:videoId'), title: get('title'), published: get('published') };
  });
}

async function fromRss2Json() {
  const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}&t=${Date.now()}`);
  const data = await res.json();
  if (data.status !== 'ok') throw new Error('rss2json failed');
  return data.items.map(item => ({
    id: item.guid.replace('yt:video:', ''),
    title: item.title,
    published: `${item.pubDate.replace(' ', 'T')}Z`,
  }));
}

async function fromProxy(makeUrl) {
  const res = await fetch(makeUrl(FEED_URL));
  if (!res.ok) throw new Error('proxy failed');
  return parseXml(await res.text());
}

const sources = [
  fromRss2Json,
  () => fromProxy(u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`),
  () => fromProxy(u => `https://corsproxy.io/?${encodeURIComponent(u)}`),
];

async function loadVideos() {
  for (const source of sources) {
    try {
      const list = (await source()).filter(v => v.id);
      if (list.length) return list;
    } catch {
      // try the next source
    }
  }
  throw new Error('All sources failed');
}

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function useYouTubeVideos() {
  const [videos, setVideos] = useState(readCache);
  const [status, setStatus] = useState(() => (readCache().length ? 'ready' : 'loading'));
  const [updatedAt, setUpdatedAt] = useState(null);
  const busy = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      if (busy.current) return;
      busy.current = true;
      try {
        const list = await loadVideos();
        if (cancelled) return;
        setVideos(list);
        setStatus('ready');
        setUpdatedAt(new Date());
        localStorage.setItem(CACHE_KEY, JSON.stringify(list));
      } catch {
        if (!cancelled) setStatus(current => (current === 'ready' ? 'ready' : 'error'));
      } finally {
        busy.current = false;
      }
    };

    refresh();
    const timer = window.setInterval(refresh, REFRESH_MS);
    const onVisible = () => document.visibilityState === 'visible' && refresh();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('online', refresh);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('online', refresh);
    };
  }, []);

  return { videos, status, updatedAt };
}

export function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('revealed'));
      return undefined;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    items.forEach(el => observer.observe(el));

    // Safety net: never leave content hidden if the observer misses an element.
    const reveal = () => document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('revealed');
    });
    window.addEventListener('scroll', reveal, { passive: true });
    const fallback = window.setTimeout(
      () => document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed')),
      6000,
    );

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', reveal);
      window.clearTimeout(fallback);
    };
  }, []);
}
