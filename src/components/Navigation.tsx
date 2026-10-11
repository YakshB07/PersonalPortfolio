import { useState } from 'react';
import { profile } from '../data/resume';
import { Logo } from './ui/Logo';

const NAV_LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/15 bg-paper/95 backdrop-blur-[2px]">
      <nav aria-label="Main" className="sheet flex h-14 items-center justify-between gap-4">
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight text-ink hover:text-accent-ink"
        >
          <Logo className="h-7 w-7 shrink-0" />
          {profile.name}
          <span className="ml-3 hidden text-ink-faint lg:inline">/ Robotics &amp; Controls</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-ink-soft hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#resume" className="btn-primary min-h-[36px] px-3 py-1.5 text-xs">
            Resume
          </a>

          <button
            type="button"
            className="min-h-[36px] px-2 font-mono text-xs uppercase tracking-wider text-ink md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <ul id="mobile-menu" className="sheet border-t border-ink/15 pb-3 md:hidden">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="border-b border-ink/10 last:border-0">
              <a href={link.href} onClick={closeMenu} className="flex items-baseline gap-3 py-3 text-lg">
                <span className="font-mono text-xs text-accent-ink">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
