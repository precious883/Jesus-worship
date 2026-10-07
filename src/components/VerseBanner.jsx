import { useEffect, useState } from 'react';
import { verses } from '../data/activities.js';

export default function VerseBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex(i => (i + 1) % verses.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  const verse = verses[index];

  return (
    <section className="verse-banner" data-reveal>
      <div className="container">
        <blockquote key={index} className="verse-quote">
          <p>“{verse.text}”</p>
          <cite>— {verse.ref}</cite>
        </blockquote>
        <div className="verse-dots">
          {verses.map((v, i) => (
            <button
              key={v.ref}
              type="button"
              className={i === index ? 'active' : ''}
              onClick={() => setIndex(i)}
              aria-label={`Show ${v.ref}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
