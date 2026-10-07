import { useEffect, useState } from 'react';
import { YOUTUBE_CHANNEL_HANDLE } from '../config.js';
import { useYouTubeVideos, REFRESH_MS } from '../hooks.js';

function timeAgo(iso) {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
  for (const [name, size] of units) {
    const n = Math.floor(seconds / size);
    if (n >= 1) return `${n} ${name}${n > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

export default function Gallery() {
  const { videos, status, updatedAt } = useYouTubeVideos();
  const [selected, setSelected] = useState(null);
  const [, tick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => tick(n => n + 1), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selected) return undefined;
    const onKey = e => e.key === 'Escape' && setSelected(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected]);

  const featured = videos[0];
  const rest = videos.slice(1);

  return (
    <section id="videos" className="section">
      <div className="container">
        <p className="eyebrow">Fresh from our channel</p>
        <h2 className="section-title">Latest Church Videos</h2>
        <p className="section-lead">
          Our newest sermons and worship moments appear here automatically, refreshed every {REFRESH_MS / 60000} minutes.
          {updatedAt && <span className="synced"> <i /> Synced {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
        </p>

        {status === 'loading' && <p className="video-status">Loading the latest videos…</p>}
        {status === 'error' && (
          <p className="video-status">
            Couldn't load videos right now. <a href={`https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}/videos`} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>.
          </p>
        )}

        {featured && (
          <div className="featured reveal-up" data-reveal>
            <div className="video-wrapper">
              <iframe
                key={featured.id}
                src={`https://www.youtube.com/embed/${featured.id}?rel=0`}
                title={featured.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="featured-meta">
              <span className="badge-new">Newest</span>
              <h3>{featured.title}</h3>
              <p>{timeAgo(featured.published)}</p>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="video-grid">
            {rest.map((video, i) => (
              <button
                key={video.id}
                type="button"
                className="video-card reveal-up"
                data-reveal
                style={{ '--d': `${(i % 4) * 80}ms` }}
                onClick={() => setSelected(video)}
                aria-label={`Play ${video.title}`}
              >
                <div className="thumb">
                  <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
                  <span className="play">▶</span>
                </div>
                <div className="video-card-body">
                  <h4>{video.title}</h4>
                  <p>{timeAgo(video.published)}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        <p className="live-note">
          Visit our{' '}
          <a href={`https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`} target="_blank" rel="noopener noreferrer">YouTube channel</a>
          {' '}for the full library.
        </p>
      </div>

      {selected && (
        <div className="video-modal open" onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="video-modal-content">
            <button className="video-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close video popup">&times;</button>
            <div className="video-modal-frame">
              <iframe
                src={`https://www.youtube.com/embed/${selected.id}?autoplay=1&rel=0`}
                title={selected.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
