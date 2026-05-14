export const appData = {
  id: 'resource-centre',
  name: 'Resource Centre',
  verified: true,
  tagline: 'Centralise your knowledge, empower your team.',
  developer: 'HighLevel',
  iconLetter: 'R',
  iconBg: '#7839EE',

  rating: 4.1,
  reviewCount: 103,
  installs: 12800,
  subAccountInstalls: 340,
  whiteLabel: 'Verified',
  pricingLabel: 'Free',
  pricingInfo: '',
  installableBy: ['Agency', 'Sub-account'],
  appFor: ['Sub-account'],

  scopes: ['Agency', 'Sub-account'],
  defaultScope: 'Agency',

  media: {
    video: {
      title: 'Resource Centre platform product tour and demo',
      poster: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
    ]
  },

  about: {
    description:
      '<h2>Resource Centre</h2><p>Resource Centre is a marketplace app that helps businesses increase user engagement via messages in a CRM application. Centralise your knowledge base, training materials, and support documentation so your team always has what they need at their fingertips.</p><p><strong>Key Features:</strong><br>Centralised document and media library<br>Role-based access for agency and sub-accounts<br>Instant search across all resources<br>Embeddable help widgets for any page<br>Version history and content approvals</p><p><strong>Use Cases:</strong><br>Onboarding new team members faster<br>Storing SOPs and playbooks<br>Sharing training videos and guides with sub-accounts<br>Building a self-serve support hub for clients</p>',
    bullets: [],
    tags: []
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
    conversationProviders: [
      { name: 'WAVV', type: 'Call', icon: 'phone' }
    ],
    customJs: [
      { name: 'VAVV', icon: 'code' }
    ],
    customActions: [
      { name: 'Remove from all boards', description: 'Remove a contact from all boards.', icon: 'arrowLeft' },
      { name: 'Check contact attempts', description: 'Check if a contact has been attempted.', icon: 'check' },
      { name: 'Check if in stage', description: 'Check if a contact is in a stage.', icon: 'check' },
      { name: 'Send email notification', description: 'Send an email to the contact.', icon: 'mail' },
      { name: 'Update contact status', description: 'Update the contact status.', icon: 'edit' },
      { name: 'Create task for contact', description: 'Create a new task assigned to a contact.', icon: 'check' },
      { name: 'Add contact to campaign', description: 'Add a contact to a marketing campaign.', icon: 'users' },
      { name: 'Schedule follow-up call', description: 'Schedule a follow-up call with a contact.', icon: 'phone' }
    ],
    customActionsExtra: 3,
    customTriggers: [
      { name: 'Call recorded', description: 'This trigger activates when a call is recorded.', icon: 'play' },
      { name: 'Call ended', description: 'This trigger activates when a call ends.', icon: 'phone' },
      { name: 'Call started', description: 'This trigger activates when a call starts.', icon: 'volume2' }
    ],
    customTriggersExtra: 0,
    snapshots: [{ name: 'Resource Centre integration assets', icon: 'eye' }],
    webhooks: [
      { name: 'Contact created', description: 'Triggered when a new contact is created.', icon: 'bell' },
      { name: 'Contact updated', description: 'Triggered when contact information is updated.', icon: 'bell' }
    ],
    integrations: [
      { name: 'Slack integration', description: 'Send notifications to Slack channels.', icon: 'share2' }
    ],
    apiEndpoints: [
      { name: 'REST API', description: 'Full REST API access for integrations.', icon: 'code' }
    ]
  },

  similarApps: [
    { name: 'Klaviyo',           category: 'Email marketing',      color: '#1A1A1A', letter: 'K',  rating: 4.7, installs: 18500, description: 'Email and SMS marketing platform built for ecommerce growth.',    pricing: 'Free', whiteLabel: true,  installed: true },
    { name: 'ActiveCampaign',    category: 'Marketing automation', color: '#356AE6', letter: 'AC', rating: 4.4, installs: 12300, description: 'Automate your marketing and sales with powerful CRM tools.',          pricing: 'Paid', whiteLabel: true  },
    { name: 'Mailchimp',         category: 'Email marketing',      color: '#FFE01B', letter: 'M',  rating: 4.2, installs: 25000, description: 'All-in-one marketing platform for growing your audience.',            pricing: 'Paid', whiteLabel: false },
    { name: 'HubSpot CRM',       category: 'CRM',                  color: '#FF7A59', letter: 'H',  rating: 4.8, installs: 42000, description: 'Free CRM software to manage contacts, deals, and pipelines.',        pricing: 'Paid', whiteLabel: false }
  ],

  otherApps: [
    { name: 'Adobe XD',            category: 'Graphics and design', color: '#470137', letter: 'XD', rating: 4.3, installs: 9800,  description: 'Design and prototype user experiences for web and mobile.',   pricing: 'Free', whiteLabel: true,  installed: true },
    { name: 'Mockup - UI & UX',    category: 'Graphics and design', color: '#A78BFA', letter: 'M',  rating: 4.6, installs: 6400,  description: 'Create beautiful mockups and wireframes for any screen.',       pricing: 'Paid', whiteLabel: true  },
    { name: 'Behance',             category: 'Graphics and design', color: '#1E40AF', letter: 'Bē', rating: 4.5, installs: 15200, description: 'Showcase your creative work and discover top design talent.',    pricing: 'Paid', whiteLabel: false },
    { name: 'Figurative for Figma', category: 'Graphics and design', color: '#111111', letter: 'F', rating: 4.1, installs: 3200,  description: 'Advanced Figma plugin for faster, more consistent design.',    pricing: 'Paid', whiteLabel: false }
  ],

  resources: {
    website: 'https://highlevel.com/resource-centre',
    supportEmail: 'support@highlevel.com',
    documentationUrl: 'https://help.highlevel.com/resource-centre',
    supportWebsiteUrl: 'https://highlevel.com/support',
    supportPhone: '+1-888-732-4197'
  },

  appDetails: {
    categories: ['Content Management', 'Knowledge Base', 'Productivity'],
    businessNiche: ['Agency', 'SaaS', 'Professional Services'],
    version: '2.4.1',
    updated: 'April 2026',
    developer: 'HighLevel'
  },

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
    trialNote: 'This app offers a 7-day free trial.',
    plans: [
      {
        name: 'Free plan',
        price: 'Free',
        subtext: 'Free for sub-accounts',
        features: [
          '1 sub-account',
          'Unlimited social campaigns',
          'Unlimited ad creatives',
          'AI UGC avatars',
          'Advanced editor'
        ],
        highlighted: false
      },
      {
        name: 'White-label basic',
        price: '$197',
        period: '/ month',
        subtext: 'Free for sub-accounts',
        features: [
          'Unlimited sub-accounts',
          'Unlimited social campaigns',
          'Unlimited ad creatives',
          'AI UGC avatars',
          'Advanced editor'
        ],
        highlighted: false
      },
      {
        name: 'White-label pro',
        price: '$197',
        period: '/ month',
        subtextMonthly: '$5 / month per sub-account',
        subtextYearly: '$60 / year per sub-account',
        features: [
          'Unlimited sub-accounts',
          'Unlimited social campaigns',
          'Unlimited ad creatives',
          'AI UGC avatars',
          'Advanced editor + unlimited Storyblock...'
        ],
        highlighted: false
      },
      {
        name: 'Growth plan',
        price: '$397',
        period: '/ month',
        subtext: 'For growing teams',
        features: [
          'Unlimited sub-accounts',
          'Unlimited social campaigns',
          'Priority support',
          'Advanced analytics',
          'Custom integrations'
        ],
        highlighted: false
      },
      {
        name: 'Scale plan',
        price: '$597',
        period: '/ month',
        subtext: 'For scaling businesses',
        features: [
          'Everything in Growth',
          'Dedicated account manager',
          'Custom workflows',
          'API access',
          'White-label solution'
        ],
        highlighted: true
      },
      {
        name: 'Enterprise plan',
        price: 'Custom',
        period: '/ month',
        subtext: 'Contact sales for pricing',
        features: [
          'Everything in Scale',
          'Custom development',
          'SLA guarantee',
          'On-premise deployment',
          '24/7 priority support'
        ],
        highlighted: false
      },
      {
        name: 'Premium Plus',
        price: '$797',
        period: '/ month',
        subtext: 'Ultimate solution',
        features: [
          'All features included',
          'Unlimited everything',
          'Premium support',
          'Advanced AI features',
          'Exclusive beta access'
        ],
        highlighted: false
      },
      {
        name: 'Agency plan',
        price: '$1,297',
        period: '/ month',
        subtext: 'For agencies',
        features: [
          'Unlimited sub-accounts',
          'Multi-user collaboration',
          'Agency dashboard',
          'White-label options',
          'Bulk operations'
        ],
        highlighted: false
      }
    ],
    usageBased: [
      { price: '$0.15 per second', label: 'AI UGC avatar video' },
      { price: '$0.03 per image', label: 'Templated image generation' },
      { price: '$0.05 per brand...', label: 'Brand enrichment' },
      { price: '$0.012 per second', label: 'Standard video template...' },
      { price: '$0.026 per second', label: 'HD video template (1080p)' },
      { price: '$0.2 per image', label: 'AI image generation' },
      { price: '$0.4 per image', label: 'New AI avatar generation' },
      { price: '$0.3 per second', label: 'Sora 2 Pro' },
      { price: '$0.15 per second', label: 'Veo 3.1 Fast' }
    ]
  },

  permissions: [
    {
      name: 'Companies', icon: 'building',
      description: 'Access company data and organizational information.',
      children: [
        { name: 'Companies', description: 'Companies will read.' }
      ]
    },
    {
      name: 'Conversations', icon: 'messageCircle',
      description: 'Manage messaging and communication with contacts.',
      children: [
        { name: 'Conversations', description: 'Conversations will read and write.' },
        { name: 'Message',       description: 'Message will read and write.' },
        { name: 'Reports',       description: 'Reports will read.' },
        { name: 'Livechat',      description: 'Livechat will write.' }
      ]
    },
    {
      name: 'Contacts', icon: 'users',
      description: 'View and manage contact information and details.',
      children: [
        { name: 'Contacts', description: 'Contacts will read and write.' }
      ]
    },
    {
      name: 'Forms', icon: 'fileText',
      description: 'Create and manage forms for lead capture.',
      children: [
        { name: 'Forms', description: 'Forms will read and write.' }
      ]
    },
    {
      name: 'Locations', icon: 'mapPin',
      description: 'Manage business locations and location data.',
      children: [
        { name: 'CustomValues',  description: 'Customvalues will read and write.' },
        { name: 'CustomFields',  description: 'Customfields will read and write.' },
        { name: 'Locations',     description: 'Locations will read and write.' },
        { name: 'Tags',          description: 'Tags will write and read.' },
        { name: 'Templates',     description: 'Templates will read.' },
        { name: 'Tasks',         description: 'Tasks will read and write.' }
      ]
    },
    {
      name: 'Media', icon: 'image',
      description: 'Manage media files and assets.',
      children: [
        { name: 'Media', description: 'Media will read and write.' }
      ]
    },
    {
      name: 'OAuth', icon: 'lock',
      description: 'Manage OAuth authentication and security.',
      children: [
        { name: 'OAuth', description: 'OAuth will write and read.' }
      ]
    },
    {
      name: 'Opportunities', icon: 'target',
      description: 'Create and manage sales opportunities and pipelines.',
      children: [
        { name: 'Opportunities', description: 'Opportunities will read and write.' }
      ]
    },
    {
      name: 'Payments', icon: 'creditCard',
      description: 'Manage payments, orders, and transactions.',
      children: [
        { name: 'Orders',          description: 'Orders will read and write.' },
        { name: 'Integration',     description: 'Integration will read and write.' },
        { name: 'Transactions',    description: 'Transactions will read.' },
        { name: 'Subscriptions',   description: 'Subscriptions will read.' },
        { name: 'Coupons',         description: 'Coupons will read and write.' },
        { name: 'Custom-provider', description: 'Custom-provider will read and write.' }
      ]
    },
    {
      name: 'Products', icon: 'box',
      description: 'Manage product catalog and pricing.',
      children: [
        { name: 'Products',   description: 'Products will read and write.' },
        { name: 'Prices',     description: 'Prices will read and write.' },
        { name: 'Collection', description: 'Collection will read and write.' }
      ]
    },
    {
      name: 'Snapshots', icon: 'camera',
      description: 'Manage data snapshots and backups.',
      children: [
        { name: 'Snapshots', description: 'Snapshots will read and write.' }
      ]
    },
    {
      name: 'Store', icon: 'shoppingBag',
      description: 'Manage store configuration and shipping.',
      children: [
        { name: 'Shipping', description: 'Shipping will read and write.' },
        { name: 'Setting',  description: 'Setting will read and write.' }
      ]
    },
    {
      name: 'Users', icon: 'user',
      description: 'Manage user accounts and permissions.',
      children: [
        { name: 'Users', description: 'Users will read and write.' }
      ]
    },
    {
      name: 'Workflows', icon: 'workflow',
      description: 'View and manage automation workflows.',
      children: [
        { name: 'Workflows', description: 'Workflows will read.' }
      ]
    },
    {
      name: 'Custom Menu Link', icon: 'menu',
      description: 'Create custom navigation links.',
      children: [
        { name: 'Custom Menu Link', description: 'Custom Menu Link will read and write.' }
      ]
    },
    {
      name: 'Calendars', icon: 'calendar',
      description: 'Manage calendar events, schedules, and availability.',
      children: [
        { name: 'Calendars', description: 'Calendars will write and read.' },
        { name: 'Events',    description: 'Events will read and write.' },
        { name: 'Groups',    description: 'Groups will read and write.' },
        { name: 'Resources', description: 'Resources will read and write.' }
      ]
    },
    {
      name: 'Charges', icon: 'dollarSign',
      description: 'Manage charges and billing.',
      children: [
        { name: 'Charges', description: 'Charges will read and write.' }
      ]
    },
    {
      name: 'Marketplace Installer Details', icon: 'package',
      description: 'View app installation and usage data.',
      children: [
        { name: 'Marketplace Installer Details', description: 'Marketplace Installer Details will read.' }
      ]
    },
    {
      name: 'Emails', icon: 'mail',
      description: 'Manage email campaigns and schedules.',
      children: [
        { name: 'Builder',  description: 'Builder will read and write.' },
        { name: 'Schedule', description: 'Schedule will read and write.' }
      ]
    },
    {
      name: 'Businesses', icon: 'briefcase',
      description: 'View and manage business information and settings.',
      children: [
        { name: 'Businesses', description: 'Businesses will read and write.' }
      ]
    },
    {
      name: 'Campaigns', icon: 'megaphone',
      description: 'Access marketing campaign data and analytics.',
      children: [
        { name: 'Campaigns', description: 'Campaigns will read.' }
      ]
    },
    {
      name: 'Social Planner', icon: 'share2',
      description: 'Manage social media posts and scheduling.',
      children: [
        { name: 'Tag',        description: 'Tag will read and write.' },
        { name: 'Oauth',      description: 'Oauth will read and write.' },
        { name: 'Post',       description: 'Post will read and write.' },
        { name: 'Account',    description: 'Account will read and write.' },
        { name: 'Csv',        description: 'Csv will read and write.' },
        { name: 'Category',   description: 'Category will read and write.' },
        { name: 'Statistics', description: 'Statistics will read.' }
      ]
    },
    {
      name: 'Objects', icon: 'grid',
      description: 'Manage custom objects and data schemas.',
      children: [
        { name: 'Schema', description: 'Schema will read and write.' },
        { name: 'Record', description: 'Record will read and write.' }
      ]
    },
    {
      name: 'Associations', icon: 'link2',
      description: 'Manage relationships between records.',
      children: [
        { name: 'Associations', description: 'Associations will write and read.' },
        { name: 'Relation',     description: 'Relation will read and write.' }
      ]
    },
    {
      name: 'SaaS', icon: 'cloud',
      description: 'Manage SaaS application integration data.',
      children: [
        { name: 'Company',  description: 'Company will read and write.' },
        { name: 'Location', description: 'Location will read and write.' }
      ]
    },
    {
      name: 'Invoices', icon: 'file',
      description: 'Manage invoicing and billing information.',
      children: [
        { name: 'Invoices', description: 'Invoices will read and write.' },
        { name: 'Schedule', description: 'Schedule will read and write.' },
        { name: 'Template', description: 'Template will read and write.' },
        { name: 'Estimate', description: 'Estimate will read and write.' }
      ]
    },
    {
      name: 'Affiliate Manager', icon: 'userPlus',
      description: 'Manage affiliate relationships and tracking.',
      children: [
        { name: 'Affiliate Manager', description: 'Affiliate Manager will read.' }
      ]
    },
    {
      name: 'Agent Studio', icon: 'bot',
      description: 'Build and configure AI agents.',
      children: [
        { name: 'Agent Studio', description: 'Agent Studio will read and write.' }
      ]
    },
    {
      name: 'Blogs', icon: 'newspaper',
      description: 'Manage blog posts and content.',
      children: [
        { name: 'Post',        description: 'Post will write.' },
        { name: 'Post-update', description: 'Post-update will write.' },
        { name: 'Check-slug',  description: 'Check-slug will read.' },
        { name: 'Category',    description: 'Category will read.' },
        { name: 'Author',      description: 'Author will read.' },
        { name: 'Posts',       description: 'Posts will read.' },
        { name: 'List',        description: 'List will read.' }
      ]
    },
    {
      name: 'Brand Boards', icon: 'palette',
      description: 'Manage brand assets and design kits.',
      children: [
        { name: 'Design-kit', description: 'Design-kit will read and write.' },
        { name: 'Voices',     description: 'Voices will read and write.' }
      ]
    },
    {
      name: 'Conversation Ai', icon: 'messageSquare',
      description: 'Manage Conversation AI settings and data.',
      children: [
        { name: 'Conversation Ai', description: 'Conversation Ai will read and write.' }
      ]
    },
    {
      name: 'Courses', icon: 'bookOpen',
      description: 'Manage online courses and content.',
      children: [
        { name: 'Courses', description: 'Courses will write and read.' }
      ]
    },
    {
      name: 'Surveys', icon: 'checkCircle',
      description: 'Create and distribute surveys.',
      children: [
        { name: 'Surveys', description: 'Surveys will read.' }
      ]
    },
    {
      name: 'Twilioaccount', icon: 'phone',
      description: 'Access Twilio account data.',
      children: [
        { name: 'Twilioaccount', description: 'Twilioaccount will read.' }
      ]
    },
    {
      name: 'Voice Ai Dashboard', icon: 'barChart',
      description: 'View Voice AI dashboard analytics.',
      children: [
        { name: 'Voice Ai Dashboard', description: 'Voice Ai Dashboard will read.' }
      ]
    },
    {
      name: 'Voice Ai Agents', icon: 'volume2',
      description: 'Manage Voice AI agents.',
      children: [
        { name: 'Voice Ai Agents', description: 'Voice Ai Agents will read and write.' }
      ]
    },
    {
      name: 'Voice Ai Agent Goals', icon: 'target',
      description: 'Manage Voice AI agent goals.',
      children: [
        { name: 'Voice Ai Agent Goals', description: 'Voice Ai Agent Goals will read and write.' }
      ]
    },
    {
      name: 'WordPress', icon: 'globe',
      description: 'Access WordPress integration data.',
      children: [
        { name: 'WordPress', description: 'WordPress will read.' }
      ]
    },
    {
      name: 'Lc Email', icon: 'mail',
      description: 'Manage LC email communications.',
      children: [
        { name: 'Lc Email', description: 'Lc Email will read.' }
      ]
    },
    {
      name: 'Links', icon: 'link',
      description: 'Manage tracking links and URL tracking.',
      children: [
        { name: 'Links', description: 'Links will read and write.' }
      ]
    },
    {
      name: 'Recurring Tasks', icon: 'repeat',
      description: 'Manage recurring tasks and schedules.',
      children: [
        { name: 'Recurring Tasks', description: 'Recurring Tasks will read and write.' }
      ]
    },
    {
      name: 'Marketplace External Auth Migration', icon: 'shield',
      description: 'Manage external auth migrations.',
      children: [
        { name: 'Marketplace External Auth Migration', description: 'Marketplace External Auth Migration will write.' }
      ]
    },
    {
      name: 'Phonenumbers', icon: 'phone',
      description: 'Manage phone numbers.',
      children: [
        { name: 'Phonenumbers', description: 'Phonenumbers will read and write.' }
      ]
    },
    {
      name: 'Numberpools', icon: 'hash',
      description: 'View number pool data.',
      children: [
        { name: 'Numberpools', description: 'Numberpools will read.' }
      ]
    },
    {
      name: 'Documents_contracts', icon: 'fileText',
      description: 'Manage document contracts.',
      children: [
        { name: 'List',     description: 'List will read.' },
        { name: 'SendLink', description: 'SendLink will write.' }
      ]
    },
    {
      name: 'Documents_contracts_template', icon: 'fileText',
      description: 'Manage document contract templates.',
      children: [
        { name: 'SendLink', description: 'SendLink will write.' },
        { name: 'List',     description: 'List will read.' }
      ]
    }
  ],

  aiTopics: {
    pros: [
      'easy setup',
      'reliable SMS functionality',
      'responsive customer support'
    ],
    cons: [
      'Mac requirement for iOS compatibility',
      'lack of free trial option'
    ]
  },

  reviews: [
    {
      name: 'Bright Roots Studio',
      location: 'Canada',
      duration: 'Over 2 years using the app',
      rating: 5,
      date: 'May 2, 2026',
      topics: ['easy setup', 'responsive customer support'],
      body: 'Honestly the easy setup blew me away — I had everything connected in under ten minutes and didn\'t need to call anyone. When I did have a question later about templates, their responsive customer support team got back to me the same day with screenshots. Couldn\'t ask for more.'
    },
    {
      name: 'Northwind Plumbing',
      location: 'United States',
      duration: '1 year using the app',
      rating: 5,
      date: 'April 28, 2026',
      topics: ['reliable SMS functionality', 'responsive customer support'],
      body: 'We send hundreds of appointment reminders a week and the reliable SMS functionality just works — no missed sends, no delivery delays. The responsive customer support has been a huge bonus too whenever we onboard a new technician.'
    },
    {
      name: 'Olive & Co Marketing',
      location: 'Australia',
      duration: '8 months using the app',
      rating: 4,
      date: 'April 15, 2026',
      topics: ['easy setup', 'reliable SMS functionality'],
      body: 'The easy setup got us live in an afternoon. The reliable SMS functionality has handled three campaigns now without issues. Docking a star only because the dashboard could use a refresh, but support promised it\'s on the roadmap.'
    },
    {
      name: 'Bark & Beyond',
      location: 'United States',
      duration: 'Over 4 years using the app',
      rating: 2,
      date: 'April 21, 2026',
      topics: ['Mac requirement for iOS compatibility'],
      body: 'The Mac requirement for iOS compatibility is a real headache for our windows-only team. We genuinely wanted to use the mobile features but ended up parking that whole workflow because nobody on our staff has a Mac available.',
      response: {
        date: 'April 23, 2026',
        text: 'Thanks for the honest feedback. We hear you on the Mac requirement for iOS compatibility — we\'re actively investigating a cloud build pipeline so Windows-only teams can publish iOS builds without a Mac. We\'ll update you when there\'s progress.'
      }
    },
    {
      name: 'YUNG\'NRICH',
      location: 'United Kingdom',
      duration: 'Over 4 years using the app',
      rating: 1,
      date: 'February 21, 2026',
      topics: ['lack of free trial option'],
      body: 'Wanted to evaluate this properly but the lack of free trial option meant we had to commit to a paid month just to find out it wasn\'t the right fit. A 14-day trial would have made this decision a lot easier.'
    },
    {
      name: 'Chacho\'s Kids',
      location: 'United States',
      duration: 'Over 1 year using the app',
      rating: 2,
      date: 'April 7, 2026',
      topics: ['lack of free trial option', 'Mac requirement for iOS compatibility'],
      body: 'Two things held us back: the lack of free trial option, which meant our finance team was hesitant to approve a yearly contract, and the Mac requirement for iOS compatibility which surprised us mid-project. Otherwise the core product seems solid.',
      response: {
        date: 'April 9, 2026',
        text: 'Appreciate you laying that out clearly. We\'re piloting a 7-day trial program next quarter — happy to add you to the early access list if you\'d like.'
      }
    }
  ]
}
