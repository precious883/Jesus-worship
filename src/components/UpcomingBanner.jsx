import { useEffect, useState } from 'react';
import { UPCOMING_BANNER_ENABLED, UPCOMING_BANNER_IMAGE } from '../config.js';

// Changes on every page load so a replaced flyer shows up instead of a cached copy.
const imageSrc = `${UPCOMING_BANNER_IMAGE}?v=${Date.now()}`;

export default function UpcomingBanner() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!UPCOMING_BANNER_ENABLED) return undefined;
    const timer = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

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
        <img
          src={imageSrc}
          alt="Upcoming church program"
          onLoad={() => setLoaded(true)}
          onError={() => setOpen(false)}
        />
        <a href="#contact" className="btn btn-primary promo-btn" onClick={() => setOpen(false)}>Contact Us</a>
      </div>
    </div>
  );
}
