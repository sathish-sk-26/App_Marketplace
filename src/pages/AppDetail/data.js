export const appData = {
  id: 'resource-centre',
  name: 'Resource Centre',
  verified: true,
  tagline: 'Test Tagline test words to be here 12323 fssdfs',
  iconLetter: 'h',
  iconBg: '#F04438',

  rating: 4.5,
  reviewCount: 102,
  installs: 25000,
  subAccountInstalls: 175,
  whiteLabel: 'Verified',
  pricingLabel: 'Paid',

  scopes: ['Agency', 'Sub-account', 'Location'],
  defaultScope: 'Agency',

  media: {
    video: {
      title: 'Klaviyo Platform Product Tour and Demo',
      poster: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'
    ]
  },

  about: {
    description:
      'Make connects GHL to 1,500+ apps — CRMs, spreadsheets, project tools, messaging platforms — through a visual no-code scenario builder. Where GHL workflows handle what happens inside GHL, Make handles everything in between.',
    bullets: [
      'Build no-code automations visually — drag, connect, configure',
      'Sync GHL contacts, opportunities, and workflow triggers with external apps',
      'Run scenarios on event trigger, schedule, or on demand — with full error handling'
    ],
    tags: ['Multi-app stacks', 'Lead routing', 'CRM sync', 'Reporting automation', 'Sales ops']
  },

  worksWith: {
    total: '1,500+',
    items: [
      { name: 'Airtable',    letter: 'A', color: '#FCB900' },
      { name: 'Monday.com',  letter: 'M', color: '#FF3D57' },
      { name: 'Slack',       letter: 'S', color: '#4A154B' },
      { name: 'Asana',       letter: 'A', color: '#F06A6A' },
      { name: 'Jira',        letter: 'J', color: '#2684FF' },
      { name: 'Xero',        letter: 'X', color: '#13B5EA' },
      { name: 'HubSpot',     letter: 'H', color: '#FF7A59' },
      { name: 'Notion',      letter: 'N', color: '#111111' }
    ],
    extra: 1492
  },

  whatsIncluded: {
    description:
      'Resource Centre is a marketplace app that helps businesses increase user engagement via messages in a CRM application.',
    customJs: [{ name: 'Test Custom_JS', color: '#3B0764' }],
    snapshots: [{ name: 'Real estate-stater kit', color: '#7C3AED' }]
  },

  otherApps: [
    { name: 'Adobe XD',            category: 'Graphics & Design', color: '#470137', letter: 'XD' },
    { name: 'Mockup - UI & UX',    category: 'Graphics & Design', color: '#A78BFA', letter: 'M' },
    { name: 'Behance',             category: 'Graphics & Design', color: '#1E40AF', letter: 'Bē' },
    { name: 'Figurative for Figma',category: 'Graphics & Design', color: '#111111', letter: 'F' }
  ],

  sidebar: {
    categories: ['Authentication'],
    type: 'Vercel Native',
    resources: [
      { name: 'Support',        icon: 'support',    href: '#' },
      { name: 'Documentation',  icon: 'docs',       href: '#' },
      { name: 'Terms',          icon: 'terms',      href: '#' },
      { name: 'Privacy Policy', icon: 'privacy',    href: '#' },
      { name: 'Website',        icon: 'globe',      href: '#' }
    ]
  },

  pricing: {
    plans: [
      { name: 'Free Trial',  price: '$0',   period: '/ 14 days', features: ['Up to 100 contacts', 'Basic automations', 'Email support'] },
      { name: 'Standard',    price: '$29',  period: '/ month',   features: ['Up to 10,000 contacts', 'Advanced automations', 'Priority support', '1,500+ integrations'], highlighted: true },
      { name: 'Enterprise',  price: 'Custom', period: '',        features: ['Unlimited contacts', 'Dedicated success manager', 'Custom SLA', 'White-label included'] }
    ]
  },

  permissions: [
    { scope: 'Contacts',     access: 'Read & Write', description: 'View and modify contact details, custom fields, and tags.' },
    { scope: 'Opportunities',access: 'Read & Write', description: 'Create, update, and delete opportunities across pipelines.' },
    { scope: 'Workflows',    access: 'Read',         description: 'Read workflow triggers and execution history.' },
    { scope: 'Calendars',    access: 'Read',         description: 'View calendar events and availability.' },
    { scope: 'Conversations',access: 'Read & Write', description: 'Send and receive messages on behalf of the user.' }
  ],

  reviews: [
    {
      name: 'Bark & Beyond',
      location: 'United States',
      duration: 'Over 4 years using the app',
      rating: 2,
      date: 'April 21, 2026',
      body: 'The app wont verify me, it just goes round in circles and it has been doing this for months, I was told i can\'t link because I am in a probation period as a new seller however I want to be able to bulk upload my items so I can sell them to be able to achieve all the targets to get our of probation.',
      response: {
        date: 'April 23, 2026',
        text: 'Thank you for your feedback. We understand your frustration with the verification process. We\'ve reviewed your account and found a technical issue that was causing the circular verification loop. Our support team has manually verified your account, and you should now have bulk upload access. We apologize for the inconvenience and will be implementing improvements to prevent this issue in the future.'
      }
    },
    {
      name: 'YUNG\'NRICH',
      location: 'United Kingdom',
      duration: 'Over 4 years using the app',
      rating: 1,
      date: 'February 21, 2026',
      body: 'Legitimate UK registered company, trading since 2013. Account deactivated by a bot with zero explanation. Appeal rejected with a blank reason field. Funds frozen for 90 days. No human support available. Avoid until they fix their automated moderation system — it is destroying real businesses.'
    },
    {
      name: 'Chacho\'s Kids',
      location: 'United States',
      duration: 'Over 1 year using the app',
      rating: 1,
      date: 'April 7, 2026',
      body: 'I decided to remove all of my products from TikTok Shop through my Shopify admin due to the extremely poor support experience. It is nearly impossible to get help when issues arise. There is no phone support, the chat support does not work properly, and emails go unanswered.',
      response: {
        date: 'April 9, 2026',
        text: 'We\'re sorry to hear about your experience. We take support quality very seriously and your feedback highlights areas we need to improve. We\'ve escalated your case to our support manager. Our team is now available via chat 24/7 and we\'re expanding our phone support hours. Please reach out directly to support@resourcecentre.app and we\'ll prioritize your case.'
      }
    }
  ]
}
