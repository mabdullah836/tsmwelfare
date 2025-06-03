export const SITE_CONFIG = {
  name: 'TSM Welfare',
  description: 'Empowering communities through sustainable welfare initiatives',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/images/og.jpg',
  links: {
    twitter: 'https://twitter.com/tsmwelfare',
    github: 'https://github.com/tsmwelfare',
    facebook: 'https://facebook.com/tsmwelfare',
  },
} as const;

export const DONATION_CATEGORIES = [
  'Zakat',
  'Sadaqah',
  'Education',
  'Healthcare',
  'Emergency Relief',
  'Food Security',
  'Water Projects',
  'Orphan Care',
] as const;

export const NAVIGATION_ITEMS = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Services', href: '/services' },
  { title: 'Departments', href: '/departments' },
  { title: 'Donate', href: '/donate' },
  { title: 'Contact', href: '/contact' },
] as const;

export const FOOTER_LINKS = {
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Accessibility', href: '/accessibility' },
  ],
  resources: [
    { title: 'FAQ', href: '/faq' },
    { title: 'Bank Details', href: '/bank-details' },
    { title: 'Zakat Calculator', href: '/zakat-calculator' },
  ],
} as const;

export const API_ENDPOINTS = {
  donations: '/api/donations',
  events: '/api/events',
  departments: '/api/departments',
  media: '/api/media',
  contact: '/api/contact',
} as const; 