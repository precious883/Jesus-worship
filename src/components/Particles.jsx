import { useEffect, useRef } from 'react';

export default function Particles() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let frame;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(70, Math.floor(window.innerWidth / 18));
    const motes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.4,
      vy: Math.random() * 0.35 + 0.1,
      sway: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const m of motes) {
        m.y -= m.vy;
        m.sway += 0.01;
        m.x += Math.sin(m.sway) * 0.3;
        if (m.y < -5) {
          m.y = height + 5;
          m.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 214, 120, ${m.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffd36e';
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}
