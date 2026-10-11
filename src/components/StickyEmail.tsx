import { useEffect, useState } from 'react';
import { contact } from '../data/resume';

/** Phone-only floating email button. Hidden while the hero (with its own Email button) is on screen. */
export default function StickyEmail() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={`mailto:${contact.email}`}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`btn-primary fixed bottom-4 right-4 z-40 shadow-[3px_3px_0_0_rgb(23_21_15)] transition-[opacity,transform] duration-200 md:hidden ${
        isVisible ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      Email me
    </a>
  );
}
