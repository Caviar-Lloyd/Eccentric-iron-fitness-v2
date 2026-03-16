'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'COACHES', href: '/coaches' },
  { label: 'MAP', href: '/map' },
  { label: 'CALCULATOR', href: '/calculator' },
  { label: 'BLOG', href: '/blog' },
];

export function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b-3 border-border-hard bg-darker-bg"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Logo + Wordmark */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://assets.cdn.filesafe.space/z3m4mhravHce78P6jW12/media/67266bd09e9f000c92db2bce.png"
            alt="Eccentric Iron Fitness logo"
            width={48}
            height={48}
            className="h-12 w-12"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono text-sm uppercase tracking-widest transition-colors duration-150 ${
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'text-cyan border-b-2 border-cyan pb-0.5'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex min-h-[40px] items-center border-3 border-border-hard bg-cyan px-5 font-mono text-sm font-medium uppercase tracking-widest text-darker-bg shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
          >
            BOOK A CALL
          </Link>
        </div>

        {/* Mobile: CTA + Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/contact"
            className="inline-flex min-h-[36px] items-center border-3 border-border-hard bg-cyan px-3 font-mono text-xs font-medium uppercase tracking-widest text-darker-bg"
          >
            BOOK A CALL
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col justify-center gap-[5px] p-2 focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="block h-[3px] w-6 bg-text-primary" />
            <span className="block h-[3px] w-6 bg-text-primary" />
            <span className="block h-[3px] w-6 bg-text-primary" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 top-16 z-40 bg-darker-bg/95 lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex h-full flex-col items-center justify-center gap-10"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-mono text-2xl uppercase tracking-widest ${
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-cyan'
                      : 'text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
