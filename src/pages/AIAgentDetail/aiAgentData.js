export const aiAgentData = {
  id: 'ai-sales-assistant',
  name: 'AI Sales Assistant',
  verified: true,
  isAIAgent: true,
  tagline: 'Scale Your Business with AI Sales Agent.',
  developer: 'AI Agency',
  iconLetter: 'A',
  iconBg: '#155EEF',

  rating: 1,
  reviewCount: 1,
  installs: 1100,
  subAccountInstalls: 1,
  whiteLabel: 'Verified',
  pricingLabel: 'Free',
  pricingInfo: '',
  installableBy: ['Agency', 'Sub-account'],
  appFor: ['Sub-account'],

  scopes: ['Agency', 'Sub-account'],
  defaultScope: 'Agency',

  media: {
    video: {
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      poster: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    },
    images: [
      'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    ],
  },

  about: {
    description:
      '<h2>AI Sales Agent — Use Cases &amp; Features for All Business Types</h2><h4>1. Use Cases</h4><p>This AI Sales Agent can be deployed across any type of business, automating sales, lead qualification, and follow-up with natural, conversational voice interactions.</p><p><strong>Examples of Use Cases Across Niches:</strong><br><strong>SaaS &amp; Software Companies:</strong> Automate demo bookings, capture leads, qualify prospects, and send payment links.<br><strong>Coaching &amp; Consulting:</strong> Book strategy sessions, qualify client needs, provide answers to common questions, and send follow-ups.<br><strong>E-Commerce &amp; Retail:</strong> Answer product questions, capture orders, confirm payments, and provide shipping updates.<br><strong>Marketing &amp; Service Providers:</strong> Qualify potential clients, book consultation calls, and present service offerings.<br><strong>Professional Services (Legal, Accounting, etc.):</strong> Capture client details, schedule appointments, answer FAQs, and share relevant information.<br><strong>Healthcare &amp; Wellness Providers:</strong> Book appointments, provide service information, and answer common patient queries.<br><strong>Any B2B or B2C Business:</strong> Fully adaptable to industry-specific offers, goals, and workflows.<br><strong>Key Benefit Across Use Cases:</strong><br><strong>Dynamic Setup:</strong> Just fill out one simple form with your business name, offers, and key details — these are automatically used to customize the AI\'s prompts, responses, and conversation flow.<br><strong>Fast Deployment:</strong> The AI Sales Agent is trained and ready to go in under 60 seconds.</p><h4>2. Features</h4><p>The AI Sales Agent includes these core features:</p><p><strong>Structured Sales Flow</strong><br>Captures accurate contact details first (name, email, phone)<br>Greets prospects and qualifies their goals, challenges, and urgency<br>Answers FAQs and redirects unknown questions<br>Presents offers and guarantees persuasively<br>Handles objections and re-engages if necessary<br>Books appointments for follow-up<br>Concludes calls professionally and warmly</p><p><strong>Customizable Experience</strong><br>Branded with your business name<br>Conversation tone, voice, and scripts are automatically personalized using your form inputs<br>Reads numbers and prices clearly for natural speech</p><p><strong>Integrated Workflows</strong><br><strong>Appointment Booking &amp; Follow-Up:</strong> Confirms sessions via email/SMS, sends reminders and prep materials, and automatically tags contacts in your CRM for tracking.<br><strong>Payment Confirmation:</strong> Sends secure payment links, confirms successful payments, updates records, and applies the correct CRM tags for reporting and automation.<br><strong>AI Knowledge &amp; Training:</strong> Continuously improves qualification, objection handling, and responses over time.</p><p><strong>Adaptable to Any Business Type</strong><br>Works for SaaS, coaching, retail, professional services, healthcare, and more<br>Customizable to match your products, offers, and services<br>Optimized to convert leads and book appointments automatically</p><p><strong>Fallback &amp; Unknown Question Handling</strong><br>Provides professional, general responses to off-topic questions<br>Redirects conversations back to your offers and goals</p><p><strong>Analytics &amp; Optimization</strong><br>Tracks leads, conversions, and interactions<br>Provides insights for improving performance and results</p><h4>3. Quick &amp; Simple Setup</h4><p>Simply fill out one form, and all your details — business name, offer, pricing, FAQs — are dynamically added to the AI\'s prompt. No technical expertise needed. Your AI agent is ready to engage prospects in less than 60 seconds, automatically tagging contacts in your CRM for smooth follow-up and reporting.</p>',
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
    description: 'AI Sales Assistant automates your sales conversations across all major messaging channels.',
    conversationProviders: [
      { name: 'Conversation AI', type: 'AI', icon: 'messageSquare' }
    ],
    customJs: [],
    customActions: [
      { name: 'Book Appointment', description: 'Automatically book appointments with qualified leads.', icon: 'calendar' },
      { name: 'Send Payment Link', description: 'Send a secure payment link to the contact.', icon: 'creditCard' },
      { name: 'Human Handover', description: 'Transfer the conversation to a human agent.', icon: 'user' },
      { name: 'Stop Bot', description: 'Stop the AI bot for this contact.', icon: 'x' },
    ],
    customActionsExtra: 0,
    customTriggers: [
      { name: 'Appointment Booked', description: 'Triggers when an appointment is successfully booked.', icon: 'calendar' },
      { name: 'Payment Received', description: 'Triggers when a payment is confirmed.', icon: 'creditCard' },
    ],
    customTriggersExtra: 0,
    snapshots: [{ name: 'AI Sales Assistant snapshot', icon: 'eye' }],
    webhooks: [],
    integrations: [],
    apiEndpoints: []
  },

  similarApps: [
    { name: 'Klaviyo',        category: 'Email marketing',      color: '#1A1A1A', letter: 'K',  rating: 4.7, installs: 18500, description: 'Email and SMS marketing platform built for ecommerce growth.',  pricing: 'Free', whiteLabel: true, installed: true },
    { name: 'ActiveCampaign', category: 'Marketing automation', color: '#356AE6', letter: 'AC', rating: 4.4, installs: 12300, description: 'Automate your marketing and sales with powerful CRM tools.',        pricing: 'Paid', whiteLabel: true },
    { name: 'Mailchimp',      category: 'Email marketing',      color: '#FFE01B', letter: 'M',  rating: 4.2, installs: 25000, description: 'All-in-one marketing platform for growing your audience.',          pricing: 'Paid', whiteLabel: false },
    { name: 'HubSpot CRM',    category: 'CRM',                  color: '#FF7A59', letter: 'H',  rating: 4.8, installs: 42000, description: 'Free CRM software to manage contacts, deals, and pipelines.',      pricing: 'Paid', whiteLabel: false }
  ],

  otherApps: [
    { name: 'Adobe XD',           category: 'Graphics and design', color: '#470137', letter: 'XD', rating: 4.3, installs: 9800,  description: 'Design and prototype user experiences for web and mobile.', pricing: 'Free', whiteLabel: true, installed: true },
    { name: 'Mockup - UI & UX',   category: 'Graphics and design', color: '#A78BFA', letter: 'M',  rating: 4.6, installs: 6400,  description: 'Create beautiful mockups and wireframes for any screen.',     pricing: 'Paid', whiteLabel: true },
    { name: 'Behance',            category: 'Graphics and design', color: '#1E40AF', letter: 'Bē', rating: 4.5, installs: 15200, description: 'Showcase your creative work and discover top design talent.', pricing: 'Paid', whiteLabel: false },
    { name: 'Figurative for Figma', category: 'Graphics and design', color: '#111111', letter: 'F', rating: 4.1, installs: 3200, description: 'Advanced Figma plugin for faster, more consistent design.',    pricing: 'Paid', whiteLabel: false }
  ],

  resources: {
    website: 'https://gamma.app/docs/Unlocking-Growth-You...',
    supportEmail: 'kazimabbas103@gmail.com',
    documentationUrl: 'https://gamma.app/docs/Unloc...',
    supportWebsiteUrl: 'https://linkedin.com/in/kazima...',
    supportPhone: '+923033671110'
  },

  appDetails: {
    categories: ['Sales Enablement', 'Calling', 'Virtual Assistants'],
    businessNiche: ['SaaS', 'Coaching', 'Professional Services'],
    version: '1.1.0',
    updated: 'May 2026',
    developer: 'AI Agency'
  },

  sidebar: {
    categories: ['AI & Automation'],
    type: 'Marketplace App',
    resources: [
      { name: 'Support',        icon: 'support',  href: '#' },
      { name: 'Documentation',  icon: 'docs',     href: '#' },
      { name: 'Terms',          icon: 'terms',    href: '#' },
      { name: 'Privacy Policy', icon: 'privacy',  href: '#' },
      { name: 'Website',        icon: 'globe',    href: '#' }
    ]
  },

  pricing: {
    trialNote: 'This app offers a 7-day free trial.',
    plans: [
      {
        name: 'Free plan',
        price: 'Free',
        subtext: 'Free for sub-accounts',
        features: ['1 sub-account', 'Unlimited conversations', 'Basic AI responses', 'SMS & Live Chat channels'],
        highlighted: false
      },
      {
        name: 'Starter',
        price: '$97',
        period: '/ month',
        subtext: 'For small agencies',
        features: ['Up to 5 sub-accounts', 'All channels', 'Appointment booking', 'CRM tagging'],
        highlighted: false
      },
      {
        name: 'Growth',
        price: '$197',
        period: '/ month',
        subtext: 'Most popular for agencies',
        features: ['Unlimited sub-accounts', 'All channels', 'Payment link sending', 'Priority support', 'Advanced analytics'],
        highlighted: true
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        subtext: 'Contact sales for pricing',
        features: ['Everything in Growth', 'Custom AI training', 'Dedicated account manager', 'SLA guarantee', 'White-label options'],
        highlighted: false
      }
    ],
    usageBased: [
      { price: '$0.01 per message', label: 'AI conversation messages' },
      { price: '$0.05 per booking', label: 'Appointment bookings' },
      { price: '$0.10 per link',    label: 'Payment links sent' }
    ]
  },

  permissions: [
    {
      name: 'Conversations', icon: 'messageCircle',
      description: 'Manage messaging and communication with contacts.',
      children: [
        { name: 'Conversations', description: 'Conversations will read and write.' },
        { name: 'Message',       description: 'Message will read and write.' },
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
      name: 'Calendars', icon: 'calendar',
      description: 'Manage calendar events, schedules, and availability.',
      children: [
        { name: 'Calendars', description: 'Calendars will write and read.' },
        { name: 'Events',    description: 'Events will read and write.' }
      ]
    },
    {
      name: 'Payments', icon: 'creditCard',
      description: 'Manage payments and transactions.',
      children: [
        { name: 'Orders',       description: 'Orders will read and write.' },
        { name: 'Transactions', description: 'Transactions will read.' }
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
      name: 'Workflows', icon: 'workflow',
      description: 'View and manage automation workflows.',
      children: [
        { name: 'Workflows', description: 'Workflows will read.' }
      ]
    }
  ],

  aiTopics: {
    pros: ['fast deployment', 'multi-channel support', 'automatic CRM tagging'],
    cons: ['limited free tier', 'requires onboarding form setup']
  },

  reviews: [
    {
      name: 'TechScale Agency',
      location: 'United States',
      duration: '6 months using the app',
      rating: 5,
      date: 'May 1, 2026',
      topics: ['fast deployment', 'multi-channel support'],
      body: 'Had the AI Sales Agent live within an hour. It booked 3 appointments on the first day without any human involvement. The multi-channel support means our leads on SMS, Instagram, and WhatsApp all get the same experience.'
    }
  ]
}
