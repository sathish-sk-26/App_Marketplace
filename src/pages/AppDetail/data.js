export const appData = {
  id: 'resource-centre',
  name: 'Resource Centre',
  verified: true,
  tagline: 'Test Tagline test words to be here 12323 fssdfs',
  developer: 'MyCRMSupport',
  iconLetter: 'h',
  iconBg: '#F04438',

  rating: 4.5,
  reviewCount: 102,
  installs: 25000,
  subAccountInstalls: 175,
  whiteLabel: 'Verified',
  pricingLabel: 'Free to install',
  pricingInfo: 'Additional charges may apply.',
  installableBy: ['Agency'],
  appFor: ['Sub Account'],

  scopes: ['Agency', 'Sub-account'],
  defaultScope: 'Agency',

  media: {
    video: {
      title: 'Klaviyo Platform Product Tour and Demo',
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
      '<h4>About Official Jobber Integration</h4><p>Jobber keeps your home service business running, even when you\'re on the move. From capturing leads to getting paid, it\'s everything you need to stay organized, close jobs faster, and keep your cash flow strong—all in one place.</p><h4>Jobber Features & Benefits</h4><p><strong>Get Noticed:</strong> Make your business the first one people find, and the one they trust most. Together, Jobber and your CRM help you build visibility, establish credibility, and turn good impressions into booked work.</p><p><strong>Win Jobs:</strong> Turn interest into income quickly and professionally. Jobber makes it easy for potential customers to reach you, get a fast, accurate quote, and book your services with confidence.</p><p><strong>Work Smarter:</strong> Spend less time on back-and-forth, and more time delivering the high-quality work that sets you apart. Jobber takes the busywork off your plate by automating tasks, simplifying scheduling, and keeping communication effortless.</p><p><strong>Boost Profits:</strong> Get paid faster, stay in control, and keep your cash flow strong. Send invoices in seconds, and get paid faster, every time—customers can pay you online, in-person or automatically.</p><h4>About the Integration</h4><p>The Jobber integration creates a direct data bridge that brings every Jobber contact into our platform without any manual effort. It synchronizes contacts across the two systems so that your team always works from the same live information.</p><p>Capture and nurture new inquiries with our marketing suite, then schedule and complete the work in Jobber before turning satisfied clients into five star reviews through our reputation tools. Campaigns built in our system can gather leads from ads or web forms, nurture them with personalized email and SMS messages, and then hand off the fully qualified opportunity to Jobber for quoting and scheduling.</p><p>Our advanced intelligence features leap into action the moment a new message or phone call arrives, ensuring that every lead is greeted and guided automatically. When a job is marked complete in Jobber, that status can trigger a reputation request in our suite, prompting delighted customers to post reviews on Google and other directories—fueling higher search rankings and undeniable social proof. You can also launch an upsell journey by scheduling a service reminder in six months.</p><p>The integration includes bi-directional triggers and actions so that every event inspires the next step. Together these seamless workflows offer home service businesses a single continuous path from first click to repeat sale, reducing overhead and accelerating response times with elegant simplicity.</p>',
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
      { name: 'Remove from All Boards', description: 'Remove a contact from all...', icon: 'arrowLeft' },
      { name: 'Check Contact Attempts', description: 'Check if a contact has be...', icon: 'check' },
      { name: 'Check if in Stage', description: 'Check if a contact is in a ...', icon: 'check' }
    ],
    customActionsExtra: 6,
    customTriggers: [
      { name: 'Call Recorded', description: 'This trigger activates whe...', icon: 'play' },
      { name: 'Call Ended', description: 'This trigger activates whe...', icon: 'phone' },
      { name: 'Call Started', description: 'This trigger activates whe...', icon: 'volume2' }
    ],
    customTriggersExtra: 0,
    snapshots: [{ name: 'Jobber Integration Assets', icon: 'eye' }]
  },

  otherApps: [
    { name: 'Adobe XD',            category: 'Graphics & Design', color: '#470137', letter: 'XD' },
    { name: 'Mockup - UI & UX',    category: 'Graphics & Design', color: '#A78BFA', letter: 'M' },
    { name: 'Behance',             category: 'Graphics & Design', color: '#1E40AF', letter: 'Bē' },
    { name: 'Figurative for Figma',category: 'Graphics & Design', color: '#111111', letter: 'F' }
  ],

  appDetails: {
    categories: ['Advertising', 'Lead Generation', 'Sales Enablement'],
    businessNiche: ['Advertising Agency', 'Marketing Agency'],
    version: '1.0.0',
    updated: 'Mar 2026',
    developer: 'MyCRMSupport'
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
    trialNote: 'This app offers 7 days of free trial.',
    plans: [
      {
        name: 'Free Plan',
        price: 'Free',
        subtext: 'Free for sub-accounts',
        features: [
          '1 Sub-Account',
          'Unlimited Social Campaigns',
          'Unlimited Ad Creatives',
          'AI UGC Avatars',
          'Advanced Editor'
        ],
        highlighted: false
      },
      {
        name: 'White-label Basic',
        price: '$197',
        period: '/ month',
        subtext: 'Free for sub-accounts',
        features: [
          'Unlimited Sub-Accounts',
          'Unlimited Social Campaigns',
          'Unlimited Ad Creatives',
          'AI UGC Avatars',
          'Advanced Editor'
        ],
        highlighted: false
      },
      {
        name: 'White-label Pro',
        price: '$197',
        period: '/ month',
        subtextMonthly: '$5 / month / sub-account',
        subtextYearly: '$60 / year / sub-account',
        features: [
          'Unlimited Sub-Accounts',
          'Unlimited Social Campaigns',
          'Unlimited Ad Creatives',
          'AI UGC Avatars',
          'Advanced Editor + Unlimited Storyblock...'
        ],
        highlighted: false
      },
      {
        name: 'Growth Plan',
        price: '$397',
        period: '/ month',
        subtext: 'For growing teams',
        features: [
          'Unlimited Sub-Accounts',
          'Unlimited Social Campaigns',
          'Priority Support',
          'Advanced Analytics',
          'Custom Integrations'
        ],
        highlighted: false
      },
      {
        name: 'Scale Plan',
        price: '$597',
        period: '/ month',
        subtext: 'For scaling businesses',
        features: [
          'Everything in Growth',
          'Dedicated Account Manager',
          'Custom Workflows',
          'API Access',
          'White-label Solution'
        ],
        highlighted: true
      },
      {
        name: 'Enterprise Plan',
        price: 'Custom',
        period: '/ month',
        subtext: 'Contact sales for pricing',
        features: [
          'Everything in Scale',
          'Custom Development',
          'SLA Guarantee',
          'On-premise Deployment',
          '24/7 Priority Support'
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
        name: 'Agency Plan',
        price: '$1,297',
        period: '/ month',
        subtext: 'For agencies',
        features: [
          'Unlimited Sub-Accounts',
          'Multi-user collaboration',
          'Agency dashboard',
          'White-label options',
          'Bulk operations'
        ],
        highlighted: false
      }
    ],
    usageBased: [
      { price: '$0.15 per second', label: 'AI UGC Avatar Video' },
      { price: '$0.03 per image', label: 'Templated Image Generation' },
      { price: '$0.05 per brand...', label: 'Brand Enrichment' },
      { price: '$0.012 per second', label: 'Standard Video Template...' },
      { price: '$0.026 per second', label: 'HD Video Template (1080p)' },
      { price: '$0.2 per image', label: 'AI Image Generation' },
      { price: '$0.4 per image', label: 'New AI Avatar Generation' },
      { price: '$0.3 per second', label: 'Sora 2 Pro' },
      { price: '$0.15 per second', label: 'Veo 3.1 Fast' }
    ]
  },

  permissions: [
    {
      name: 'Businesses',
      icon: 'briefcase',
      description: 'View and manage business information and settings.',
      children: [
        { access: 'Read', description: 'View business details and information' },
        { access: 'Write', description: 'Create, update, and modify business records' }
      ]
    },
    {
      name: 'Companies',
      icon: 'building',
      description: 'Access company data and organizational information.',
      children: [
        { access: 'Read', description: 'View company details and profiles' },
        { access: 'Write', description: 'Create and modify company records' }
      ]
    },
    {
      name: 'Calendars',
      icon: 'calendar',
      description: 'Manage calendar events, schedules, and availability.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View calendar events and schedules' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify calendar events' },
        { name: 'Events - Read', access: 'Read', description: 'View event details and information' },
        { name: 'Events - Write', access: 'Write', description: 'Create and update calendar events' },
        { name: 'Groups - Read', access: 'Read', description: 'View calendar group information' },
        { name: 'Groups - Write', access: 'Write', description: 'Manage calendar groups' },
        { name: 'Resources - Read', access: 'Read', description: 'View calendar resources' },
        { name: 'Resources - Write', access: 'Write', description: 'Manage calendar resources' }
      ]
    },
    {
      name: 'Campaigns',
      icon: 'megaphone',
      description: 'Access marketing campaign data and analytics.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View campaign details and performance metrics' }
      ]
    },
    {
      name: 'Conversations',
      icon: 'messageCircle',
      description: 'Manage messaging and communication with contacts.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View conversation history and messages' },
        { name: 'Write Access', access: 'Write', description: 'Send and compose messages' },
        { name: 'Messages - Read', access: 'Read', description: 'View message content and details' },
        { name: 'Messages - Write', access: 'Write', description: 'Create and send messages' },
        { name: 'Live Chat - Write', access: 'Write', description: 'Send live chat messages' },
        { name: 'Reports - Read', access: 'Read', description: 'View communication reports and analytics' }
      ]
    },
    {
      name: 'Contacts',
      icon: 'users',
      description: 'View and manage contact information and details.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View contact details, custom fields, and tags' },
        { name: 'Write Access', access: 'Write', description: 'Create, update, and delete contact records' }
      ]
    },
    {
      name: 'Forms',
      icon: 'fileText',
      description: 'Create and manage forms for lead capture.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View form details and submissions' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify forms' }
      ]
    },
    {
      name: 'Invoices',
      icon: 'file',
      description: 'Manage invoicing and billing information.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View invoice details and history' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify invoices' },
        { name: 'Schedule - Read', access: 'Read', description: 'View invoice schedules' },
        { name: 'Schedule - Write', access: 'Write', description: 'Create and modify invoice schedules' },
        { name: 'Templates - Read', access: 'Read', description: 'View invoice templates' },
        { name: 'Templates - Write', access: 'Write', description: 'Create and modify invoice templates' }
      ]
    },
    {
      name: 'Links',
      icon: 'link',
      description: 'Manage tracking links and URL tracking.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View link details and tracking data' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify tracking links' }
      ]
    },
    {
      name: 'Locations',
      icon: 'mapPin',
      description: 'Manage business locations and location data.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View location information' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify locations' },
        { name: 'Custom Values - Read', access: 'Read', description: 'View custom location values' },
        { name: 'Custom Values - Write', access: 'Write', description: 'Manage custom location values' },
        { name: 'Custom Fields - Read', access: 'Read', description: 'View custom location fields' },
        { name: 'Custom Fields - Write', access: 'Write', description: 'Create and modify custom fields' },
        { name: 'Tasks - Read', access: 'Read', description: 'View location tasks' },
        { name: 'Tasks - Write', access: 'Write', description: 'Create and modify location tasks' },
        { name: 'Tags - Read', access: 'Read', description: 'View location tags' },
        { name: 'Tags - Write', access: 'Write', description: 'Add and manage location tags' },
        { name: 'Templates - Read', access: 'Read', description: 'View location templates' }
      ]
    },
    {
      name: 'Media',
      icon: 'image',
      description: 'Manage media files and assets.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View media files and assets' },
        { name: 'Write Access', access: 'Write', description: 'Upload and modify media files' }
      ]
    },
    {
      name: 'Opportunities',
      icon: 'target',
      description: 'Create and manage sales opportunities and pipelines.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View opportunities across pipelines' },
        { name: 'Write Access', access: 'Write', description: 'Create, update, and delete opportunities' }
      ]
    },
    {
      name: 'Products',
      icon: 'box',
      description: 'Manage product catalog and pricing.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View product information' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify products' }
      ]
    },
    {
      name: 'SaaS',
      icon: 'cloud',
      description: 'Manage SaaS application integration data.',
      children: [
        { name: 'Company - Read', access: 'Read', description: 'View SaaS company data' },
        { name: 'Company - Write', access: 'Write', description: 'Modify SaaS company information' },
        { name: 'Location - Read', access: 'Read', description: 'View SaaS location data' },
        { name: 'Location - Write', access: 'Write', description: 'Modify SaaS location information' }
      ]
    },
    {
      name: 'Surveys',
      icon: 'checkCircle',
      description: 'Create and distribute surveys.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View survey details and responses' }
      ]
    },
    {
      name: 'Users',
      icon: 'user',
      description: 'Manage user accounts and permissions.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View user information and accounts' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify user accounts' }
      ]
    },
    {
      name: 'Workflows',
      icon: 'workflow',
      description: 'View and manage automation workflows.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View workflows and execution history' }
      ]
    },
    {
      name: 'Snapshots',
      icon: 'camera',
      description: 'Manage data snapshots and backups.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View snapshots and backup information' },
        { name: 'Write Access', access: 'Write', description: 'Create and manage snapshots' }
      ]
    },
    {
      name: 'OAuth',
      icon: 'lock',
      description: 'Manage OAuth authentication and security.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View OAuth credentials and settings' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify OAuth tokens' }
      ]
    },
    {
      name: 'Objects',
      icon: 'grid',
      description: 'Manage custom objects and data schemas.',
      children: [
        { name: 'Schema - Read', access: 'Read', description: 'View object schema definitions' },
        { name: 'Schema - Write', access: 'Write', description: 'Create and modify object schemas' },
        { name: 'Records - Read', access: 'Read', description: 'View object records' },
        { name: 'Records - Write', access: 'Write', description: 'Create and modify object records' }
      ]
    },
    {
      name: 'Associations',
      icon: 'link2',
      description: 'Manage relationships between records.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View record associations' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify record associations' },
        { name: 'Relations - Read', access: 'Read', description: 'View relationship definitions' },
        { name: 'Relations - Write', access: 'Write', description: 'Create and modify relationships' }
      ]
    },
    {
      name: 'LC Email',
      icon: 'mail',
      description: 'Manage email communications.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View email messages and history' }
      ]
    },
    {
      name: 'Custom Menu Link',
      icon: 'menu',
      description: 'Create custom navigation links.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View custom menu links' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify menu links' }
      ]
    },
    {
      name: 'Knowledge Bases',
      icon: 'bookOpen',
      description: 'Manage knowledge base articles.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View knowledge base content' },
        { name: 'Write Access', access: 'Write', description: 'Create and modify articles' }
      ]
    },
    {
      name: 'Blogs',
      icon: 'newspaper',
      description: 'Manage blog posts and content.',
      children: [
        { name: 'Posts - Write', access: 'Write', description: 'Create new blog posts' },
        { name: 'Posts - Update Write', access: 'Write', description: 'Update existing blog posts' },
        { name: 'Check Slug - Read', access: 'Read', description: 'View and validate post slugs' },
        { name: 'Categories - Read', access: 'Read', description: 'View post categories' },
        { name: 'Authors - Read', access: 'Read', description: 'View author information' },
        { name: 'Posts - Read', access: 'Read', description: 'View published blog posts' },
        { name: 'List - Read', access: 'Read', description: 'View post listings' }
      ]
    },
    {
      name: 'Marketplace Installer Details',
      icon: 'package',
      description: 'View app installation and usage data.',
      children: [
        { name: 'Read Access', access: 'Read', description: 'View app installation details' }
      ]
    }
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
