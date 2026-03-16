// 'use client' — Required for Intersection Observer (active section tracking)
// and smooth-scroll click handlers
'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'about', label: 'ABOUT' },
  { id: 'approach', label: 'APPROACH' },
  { id: 'testimonials', label: 'TESTIMONIALS' },
  { id: 'pricing', label: 'PRICING' },
  { id: 'book', label: 'BOOK' },
];

export function CoachSubNav() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 120; // NavBar (64px) + SubNav (56px)
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <nav
      className="sticky top-16 z-40 border-b-3 border-border-hard bg-darker-bg"
      aria-label="Coach profile sections"
    >
      <div className="mx-auto flex max-w-[1600px] gap-0 overflow-x-auto px-6 md:px-10 lg:px-16">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollTo(section.id)}
            className={`shrink-0 px-4 py-4 font-mono text-xs uppercase tracking-widest transition-colors duration-150 ${
              activeSection === section.id
                ? 'border-b-2 border-cyan text-cyan'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
