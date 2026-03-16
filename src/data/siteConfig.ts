export const siteConfig = {
  name: 'Eccentric Iron Fitness',
  tagline: 'Applied Hypertrophy & Evidence-Based Nutrition',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eccentriciron.com',
  owner: 'Carver Lloyd',
  email: 'carver@eccentriciron.ca',
  phone: '(604) 200-3390',
  address: {
    city: 'Maple Ridge',
    province: 'BC',
    country: 'Canada',
  },
  certifications: [
    'Applied Hypertrophy Specialist',
  ],
  social: {
    instagram: 'https://www.instagram.com/eccentriciron',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: {
    label: 'Book a Discovery Call',
    href: '/contact',
  },
} as const;
