import { useEffect, useState } from 'react';
import { UPCOMING_BANNER_ENABLED, UPCOMING_BANNER_IMAGES } from '../config.js';

// Changes on every page load so replaced flyers show up instead of cached copies.
const imageSources = UPCOMING_BANNER_IMAGES.map(image => `${image}?v=${Date.now()}`);

export default function UpcomingBanner() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!UPCOMING_BANNER_ENABLED) return undefined;
    const timer = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open || UPCOMING_BANNER_IMAGES.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setLoaded(false);
      setCurrentImage(index => (index + 1) % UPCOMING_BANNER_IMAGES.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!UPCOMING_BANNER_ENABLED || !open) return null;

  return (
    <div className={`promo-modal${loaded ? ' ready' : ''}`} onClick={e => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-label="Upcoming program">
      <div className="promo-card">
        <button type="button" className="promo-close" onClick={() => setOpen(false)} aria-label="Close upcoming program banner">&times;</button>
        <span className="promo-tag">Upcoming Program</span>
        {UPCOMING_BANNER_IMAGES.length > 1 && (
          <button
            type="button"
            className="promo-arrow promo-arrow-prev"
            onClick={() => {
              setLoaded(false);
              setCurrentImage(index => (index - 1 + UPCOMING_BANNER_IMAGES.length) % UPCOMING_BANNER_IMAGES.length);
            }}
            aria-label="Show previous program banner"
          >
            &#8249;
          </button>
        )}
        <img
          src={imageSources[currentImage]}
          alt="Upcoming church program"
          onLoad={() => setLoaded(true)}
          onError={() => setOpen(false)}
        />
        {UPCOMING_BANNER_IMAGES.length > 1 && (
          <button
            type="button"
            className="promo-arrow promo-arrow-next"
            onClick={() => {
              setLoaded(false);
              setCurrentImage(index => (index + 1) % UPCOMING_BANNER_IMAGES.length);
            }}
            aria-label="Show next program banner"
          >
            &#8250;
          </button>
        )}
        {UPCOMING_BANNER_IMAGES.length > 1 && (
          <div className="promo-dots" aria-label="Program banner selection">
            {UPCOMING_BANNER_IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`promo-dot${index === currentImage ? ' active' : ''}`}
                onClick={() => {
                  setLoaded(false);
                  setCurrentImage(index);
                }}
                aria-label={`Show program banner ${index + 1}`}
                aria-current={index === currentImage ? 'true' : undefined}
              />
            ))}
          </div>
        )}
        <a href="#contact" className="btn btn-primary promo-btn" onClick={() => setOpen(false)}>Contact Us</a>
      </div>
    </div>
  );
}
