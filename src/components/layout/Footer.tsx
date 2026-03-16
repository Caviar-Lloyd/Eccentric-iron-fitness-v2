import Link from 'next/link';

const quickLinks = [
  { label: 'Coaches', href: '/coaches' },
  { label: 'Find a Coach', href: '/map' },
  { label: 'Calculator', href: '/calculator' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/eccentricironfitness' },
  { label: 'TikTok', href: 'https://tiktok.com/@eccentricironfitness' },
  { label: 'YouTube', href: 'https://youtube.com/@eccentricironfitness' },
];

export function Footer() {
  return (
    <footer className="border-t-3 border-border-hard bg-darker-bg" role="contentinfo">
      <div className="mx-auto max-w-[1600px] px-6 py-12 md:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Column 1: Brand + Contact */}
          <div>
            <p className="font-mono text-lg font-bold uppercase tracking-widest text-text-primary">
              ECCENTRIC IRON
            </p>
            <p className="mt-4 font-body text-sm text-text-secondary">
              <a href="mailto:carver@eccentriciron.ca" className="transition-colors duration-150 hover:text-cyan">
                carver@eccentriciron.ca
              </a>
            </p>
            <p className="mt-2 font-body text-sm text-text-secondary">
              <a href="tel:+16042003390" className="transition-colors duration-150 hover:text-cyan">
                (604) 200-3390
              </a>
            </p>
            <p className="mt-2 font-body text-sm text-text-muted">
              #2418-11280 Pazarena Place<br />
              Maple Ridge, BC V2X 9H8
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
              Quick Links
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-sm uppercase tracking-widest text-text-secondary transition-colors duration-150 hover:text-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal + Social */}
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
              Social
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm uppercase tracking-widest text-text-secondary transition-colors duration-150 hover:text-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex gap-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-xs uppercase tracking-widest text-text-muted transition-colors duration-150 hover:text-text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="font-mono text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Eccentric Iron Fitness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
