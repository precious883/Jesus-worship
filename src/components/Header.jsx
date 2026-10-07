import { useEffect, useState } from 'react';
import churchLogo from '../Images/church logo.jpeg';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#activities', label: 'Activities' },
  { href: '#live', label: 'Live' },
  { href: '#videos', label: 'Videos' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#home" className="logo" aria-label="Jesus Worship Interdenominational Prayer Ministry Int'l">
          <img src={churchLogo} alt="Church logo" className="logo-mark" />
          <span className="logo-text">Jesus Worship Interdenominational <small>Prayer Ministry Int'l</small></span>
        </a>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span><span></span><span></span>
        </button>
        <nav className={`main-nav${isOpen ? ' open' : ''}`}>
          <ul>
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setIsOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
