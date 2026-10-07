import { useEffect, useState } from 'react';
import { verses } from '../data/activities.js';

const heroImages = Object.entries(
  import.meta.glob('../pics/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, image]) => image);

function BibleBook() {
  const [pageVerse, setPageVerse] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setPageVerse(i => (i + 1) % verses.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const verse = verses[pageVerse];

  return (
    <div className="bible-scene" aria-hidden="true">
      <div className="bible-rays" />
      <div className="bible">
        <div className="bible-base" />
        <div className="bible-page bible-page-right">
          <p key={pageVerse} className="page-verse">
            {verse.text}
            <b>{verse.ref}</b>
          </p>
        </div>
        <div className="bible-flip bible-flip-1" />
        <div className="bible-flip bible-flip-2" />
        <div className="bible-flip bible-flip-3" />
        <div className="bible-cover">
          <div className="cover-front">
            <span className="cover-cross">✝</span>
            <span className="cover-text">HOLY BIBLE</span>
          </div>
          <div className="cover-back">
            <span className="cover-cross small">✝</span>
            <span className="cover-title">The Holy Bible</span>
            <span className="cover-sub">Old &amp; New Testament</span>
          </div>
        </div>
      </div>
      <div className="bible-glow" />
    </div>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (heroImages.length < 2) return undefined;
    const timer = window.setInterval(() => setActive(i => (i + 1) % heroImages.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-slides" aria-hidden="true">
        {heroImages.map((image, i) => (
          <div
            key={image}
            className={`hero-slide${i === active ? ' is-active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow">Delta State · Nigeria</p>
          <h1>Welcome <span>Home</span></h1>
          <p className="hero-sub">A place to worship, grow, and belong. Join us this Sunday, in person or online.</p>
          <div className="hero-actions">
            <a href="#live" className="btn btn-primary">▶ Watch Live</a>
            <a href="#videos" className="btn btn-outline">Latest Videos</a>
            <a href="#activities" className="btn btn-outline">Service Times</a>
          </div>
        </div>
        <BibleBook />
      </div>
      <a href="#about" className="scroll-hint" aria-label="Scroll down"><span /></a>
    </section>
  );
}
