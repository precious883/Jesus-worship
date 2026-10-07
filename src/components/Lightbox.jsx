import { useEffect } from 'react';

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;
    const handleKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div className="lightbox open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <button className="lightbox-close" aria-label="Close" onClick={onClose}>&times;</button>
      <img src={image.src} alt={image.alt} />
    </div>
  );
}
