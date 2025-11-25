
import { Boilerplate, BlogPost, Automation } from './types';

export const MOCK_BOILERPLATES: Boilerplate[] = [
  {
    id: '1',
    title: 'Nexus AI Starter',
    description: 'The ultimate Next.js 14 starter kit for building AI-powered SaaS applications with RAG integration pre-configured.',
    longDescription: 'Nexus AI Starter is a production-ready boilerplate designed for developers who want to ship AI products fast. It comes with a pre-configured RAG pipeline using Pinecone and OpenAI, secure authentication via Clerk, and a stripe integration for handling subscriptions.',
    priceType: 'Paid',
    price: '$149',
    tags: ['AI-Native', 'RAG', 'SaaS', 'Stripe'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'OpenAI'],
    lastUpdated: '2 days ago',
    rating: 4.9,
    reviewCount: 124,
    author: 'Nexus Labs',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    category: 'AI',
    framework: 'Next.js',
    database: 'PostgreSQL',
    aiReady: true,
    features: [
      'Pre-built RAG Pipeline',
      'OpenAI & Anthropic Integration',
      'Stripe Subscription Payments',
      'User Dashboard & Settings',
      'Dark Mode built-in',
      'SEO Optimized Blog',
      'Email Marketing Integration',
      'Admin Panel'
    ],
    demoUrl: '#',
    repoUrl: '#',
    reviews: [
      {
        id: 'r1',
        user: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
        rating: 5,
        date: '1 week ago',
        comment: 'Saved me at least 40 hours of setup time. The RAG implementation is super clean.'
      }
    ]
  },
  {
    id: '3',
    title: 'Modern Dashboard UI',
    description: 'A beautiful, responsive admin dashboard template with 50+ pre-built components and charts.',
    longDescription: 'Built for enterprise applications, this dashboard template offers a comprehensive suite of data visualization tools, data tables with sorting and filtering, and a robust layout system.',
    priceType: 'Free',
    price: 'Free',
    tags: ['Dashboard', 'Admin', 'UI Kit'],
    techStack: ['React', 'Vite', 'Recharts'],
    lastUpdated: '3 weeks ago',
    rating: 4.5,
    reviewCount: 42,
    author: 'UI Master',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    category: 'Dashboard',
    framework: 'React',
    database: 'Firebase',
    aiReady: false,
    features: [
      '50+ Components',
      'Dark/Light Theme',
      'Interactive Charts',
      'Kanban Board',
      'Calendar Integration'
    ],
    demoUrl: '#',
    repoUrl: '#',
    reviews: []
  },
  {
    id: '5',
    title: 'Agentic Flow',
    description: 'Framework for building autonomous AI agents with LangChain integration.',
    longDescription: 'The frontier of AI development. Agentic Flow provides the scaffolding to build autonomous agents that can browse the web, execute code, and persist memory. Built for the era of Agentic AI.',
    priceType: 'Freemium',
    price: 'Free / $299',
    tags: ['Agents', 'LangChain', 'Automation'],
    techStack: ['Python', 'FastAPI', 'React'],
    lastUpdated: '12 hours ago',
    rating: 5.0,
    reviewCount: 21,
    author: 'Future Systems',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    category: 'AI',
    framework: 'React',
    database: 'PostgreSQL',
    aiReady: true,
    features: [
      'LangChain Setup',
      'Vector Database Ops',
      'Agent Memory Management',
      'Tool Execution Sandbox',
      'Streaming Responses'
    ],
    demoUrl: '#',
    repoUrl: '#',
    reviews: []
  },
  {
    id: '6',
    title: 'Supabase SaaS Kit',
    description: 'Complete SaaS starter with Supabase Auth, Database, and Stripe Subscription handling.',
    longDescription: 'A robust starting point for SaaS founders who prefer Supabase. Includes row-level security policies, subscription webhooks, and a user account portal.',
    priceType: 'Paid',
    price: '$99',
    tags: ['SaaS', 'Supabase', 'Auth'],
    techStack: ['Next.js', 'Supabase', 'Stripe'],
    lastUpdated: '1 day ago',
    rating: 4.8,
    reviewCount: 89,
    author: 'SaaS Forge',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-c81c0cda1a29?q=80&w=800&auto=format&fit=crop',
    category: 'SaaS',
    framework: 'Next.js',
    database: 'Supabase',
    aiReady: false,
    features: ['Auth UI', 'Subscription Management', 'RLS Policies', 'Email Templates'],
    demoUrl: '#',
    repoUrl: '#',
    reviews: []
  },
  {
    id: '7',
    title: 'Mobile Commerce Pro',
    description: 'React Native boilerplate for high-performance e-commerce mobile applications.',
    longDescription: 'Build native iOS and Android apps with a single codebase. Optimized for performance with animated transitions and offline support.',
    priceType: 'Paid',
    price: '$199',
    tags: ['Mobile', 'E-commerce', 'React Native'],
    techStack: ['React Native', 'Expo', 'Shopify'],
    lastUpdated: '5 days ago',
    rating: 4.7,
    reviewCount: 34,
    author: 'Native Base',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    category: 'Mobile',
    framework: 'React',
    database: 'Firebase',
    aiReady: false,
    features: ['Push Notifications', 'Apple Pay', 'Offline Mode', 'Analytics'],
    demoUrl: '#',
    repoUrl: '#',
    reviews: []
  },
  {
    id: '8',
    title: 'Micro-SaaS Clarity',
    description: 'Minimalist Vue 3 starter for micro-SaaS projects with clean architecture.',
    longDescription: 'Perfect for small, focused tools. Lightweight, fast, and easy to extend.',
    priceType: 'Free',
    price: 'Free',
    tags: ['SaaS', 'Minimal', 'Vue'],
    techStack: ['Vue', 'Nuxt', 'Tailwind'],
    lastUpdated: '1 week ago',
    rating: 4.6,
    reviewCount: 15,
    author: 'Vue Master',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop',
    category: 'SaaS',
    framework: 'Vue',
    database: 'Supabase',
    aiReady: false,
    features: ['Clean Code', 'TypeScript', 'ESLint', 'Prettier'],
    demoUrl: '#',
    repoUrl: '#',
    reviews: []
  },
  {
    id: '9',
    title: 'Enterprise CRM',
    description: 'Scalable CRM dashboard with complex data tables and role-based access control.',
    longDescription: 'Designed for B2B applications requiring granular permissions and heavy data lifting.',
    priceType: 'Paid',
    price: '$249',
    tags: ['Dashboard', 'Enterprise', 'CRM'],
    techStack: ['React', 'Redux', 'Node.js'],
    lastUpdated: '2 weeks ago',
    rating: 4.8,
    reviewCount: 56,
    author: 'Enterprise UI',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    category: 'Dashboard',
    framework: 'React',
    database: 'PostgreSQL',
    aiReady: true,
    features: ['RBAC', 'Data Grid', 'Audit Logs', 'SSO'],
    demoUrl: '#',
    repoUrl: '#',
    reviews: []
  }
];

export const MOCK_AUTOMATIONS: Automation[] = [
  {
    id: 'auto-1',
    title: 'Lead Enrichment Pipeline',
    description: 'Automatically enrich new leads from Typeform using Clearbit and sync to HubSpot.',
    longDescription: 'Stop manual data entry. This n8n workflow listens for new Typeform submissions, queries the Clearbit API to find company details, social profiles, and employee count, then formats the data and creates a detailed deal in HubSpot.',
    priceType: 'Free',
    price: 'Free',
    tags: ['CRM', 'Sales', 'Enrichment'],
    techStack: ['n8n', 'Typeform', 'HubSpot', 'Clearbit'],
    lastUpdated: '3 days ago',
    rating: 4.9,
    reviewCount: 32,
    author: 'Workflow Wiz',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    category: 'Automation',
    framework: 'n8n',
    tool: 'n8n',
    difficulty: 'Intermediate',
    database: '',
    aiReady: false,
    features: ['Webhook Trigger', 'API Error Handling', 'Data Formatting', 'CRM Sync'],
    steps: ['Trigger: Typeform Submission', 'Action: Clearbit Lookup', 'Action: Data Transform', 'Action: HubSpot Create'],
    demoUrl: '#',
    repoUrl: '#',
    reviews: []
  },
  {
    id: 'auto-2',
    title: 'AI Customer Support Agent',
    description: 'Connect Zendesk to OpenAI to draft automatic responses for support tickets.',
    longDescription: 'Reduce response times by 80%. This Make.com scenario triggers when a new ticket arrives. It uses GPT-4 to analyze the sentiment and intent, checks your knowledge base, and drafts a high-quality reply for your agent to review.',
    priceType: 'Paid',
    price: '$29',
    tags: ['AI', 'Support', 'Zendesk'],
    techStack: ['Make', 'OpenAI', 'Zendesk'],
    lastUpdated: '1 week ago',
    rating: 4.7,
    reviewCount: 45,
    author: 'AutoMate Pro',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop',
    category: 'Automation',
    framework: 'Make',
    tool: 'Make',
    difficulty: 'Advanced',
    database: '',
    aiReady: true,
    features: ['Sentiment Analysis', 'Context Awareness', 'Draft Mode', 'Slack Notification'],
    steps: ['Trigger: New Ticket', 'Action: Analyze Intent', 'Action: Generate Draft', 'Action: Update Ticket'],
    demoUrl: '#',
    repoUrl: '#',
    reviews: []
  },
  {
    id: 'auto-3',
    title: 'Stripe Failed Payment Recovery',
    description: 'Automated email sequence and notification flow for failed SaaS payments.',
    longDescription: 'Recover lost revenue automatically. This workflow triggers on Stripe "invoice.payment_failed" events. It sends a series of branded emails to the customer and notifies your success team via Slack if the payment fails 3 times.',
    priceType: 'Free',
    price: 'Free',
    tags: ['Finance', 'Stripe', 'SaaS'],
    techStack: ['Zapier', 'Stripe', 'Gmail', 'Slack'],
    lastUpdated: '2 weeks ago',
    rating: 4.8,
    reviewCount: 18,
    author: 'SaaS Ops',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    category: 'Automation',
    framework: 'Zapier',
    tool: 'Zapier',
    difficulty: 'Beginner',
    database: '',
    aiReady: false,
    features: ['Event Trigger', 'Conditional Logic', 'Email Templating', 'Team Alert'],
    steps: ['Trigger: Stripe Event', 'Condition: Check Attempts', 'Action: Send Email', 'Action: Notify Team'],
    demoUrl: '#',
    repoUrl: '#',
    reviews: []
  },
  {
    id: 'auto-4',
    title: 'Social Media Content Repurposer',
    description: 'Turn a single blog post into tweets, LinkedIn posts, and newsletter snippets using AI.',
    longDescription: 'Maximize your content ROI. Input a blog URL, and this Pipedream workflow scrapes the content, summarizes it using Claude 3, and generates formatted posts for Twitter and LinkedIn, scheduling them automatically.',
    priceType: 'Paid',
    price: '$49',
    tags: ['Marketing', 'Content', 'AI'],
    techStack: ['Pipedream', 'Claude', 'Twitter API', 'LinkedIn'],
    lastUpdated: '4 days ago',
    rating: 5.0,
    reviewCount: 12,
    author: 'Content Flow',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    category: 'Automation',
    framework: 'Pipedream',
    tool: 'Pipedream',
    difficulty: 'Intermediate',
    database: '',
    aiReady: true,
    features: ['Web Scraping', 'LLM Summarization', 'Multi-Platform Post', 'Scheduling'],
    steps: ['Trigger: New URL', 'Action: Scrape Text', 'Action: Generate Content', 'Action: Schedule Posts'],
    demoUrl: '#',
    repoUrl: '#',
    reviews: []
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'top-10-nextjs-boilerplates-2024',
    title: 'The Top 10 Next.js Boilerplates for 2024',
    excerpt: 'We reviewed over 50 starter kits to bring you the best options for speed, scalability, and developer experience.',
    content: `...`,
    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop',
    date: 'Oct 12, 2024',
    category: 'Best-Of',
    author: 'Sarah Jenkins',
    readTime: '8 min read',
    featured: true
  },
  {
    id: '2',
    slug: 'rag-is-future-of-saas',
    title: 'Why RAG is the Future of SaaS',
    excerpt: 'Retrieval-Augmented Generation is changing how we build software. Here is why every founder needs to pay attention.',
    content: `...`,
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    date: 'Oct 10, 2024',
    category: 'Guides',
    author: 'Alex Chen',
    readTime: '5 min read',
    featured: true
  },
  {
    id: '3',
    slug: 'supabase-vs-firebase',
    title: 'Supabase vs Firebase: The Ultimate Comparison',
    excerpt: 'A deep dive into the two most popular Backend-as-a-Service platforms. Which one should you choose?',
    content: `...`,
    coverImage: 'https://images.unsplash.com/photo-1558494949-efc025848402?q=80&w=800&auto=format&fit=crop',
    date: 'Oct 05, 2024',
    category: 'Comparisons',
    author: 'David Ross',
    readTime: '12 min read',
    featured: true
  },
  {
    id: '4',
    slug: 'building-ai-agent-langchain',
    title: 'Building an AI Agent with LangChain',
    excerpt: 'Step-by-step tutorial on creating an autonomous agent that can browse the web and summarize news.',
    content: `...`,
    coverImage: 'https://images.unsplash.com/photo-1535378437321-20383780743d?q=80&w=800&auto=format&fit=crop',
    date: 'Sep 28, 2024',
    category: 'Tutorials',
    author: 'Elena M.',
    readTime: '15 min read',
    featured: false
  },
  {
    id: '5',
    slug: 'stripe-integration-guide',
    title: 'Stripe Integration in 5 Minutes',
    excerpt: 'How to set up subscription payments in Next.js using Stripe Checkout and Webhooks.',
    content: `...`,
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop',
    date: 'Sep 25, 2024',
    category: 'Guides',
    author: 'Sarah Jenkins',
    readTime: '6 min read',
    featured: false
  },
  {
    id: '6',
    slug: 'nextjs-14-server-actions',
    title: 'Mastering Server Actions in Next.js 14',
    excerpt: 'Forget API routes. Learn how to mutate data directly from your components with Server Actions.',
    content: `...`,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    date: 'Sep 20, 2024',
    category: 'Tutorials',
    author: 'Alex Chen',
    readTime: '10 min read',
    featured: false
  }
];

export const CATEGORIES = ['All', 'SaaS', 'AI', 'Dashboard', 'E-commerce', 'Mobile'];
export const FRAMEWORKS = ['Next.js', 'React', 'Vue', 'Remix'];
export const DATABASES = ['PostgreSQL', 'MongoDB', 'Supabase', 'Firebase'];

export const CATEGORY_DETAILS = [
  {
    id: 'SaaS',
    title: 'SaaS Starters',
    description: 'Launch your startup faster with production-ready SaaS boilerplates. Includes auth, payments, and landing pages.',
    icon: 'Rocket',
    color: 'from-blue-500 to-indigo-500',
    count: 42,
    features: ['Authentication', 'Stripe Payments', 'User Dashboard', 'Email Config']
  },
  {
    id: 'AI',
    title: 'AI & LLM',
    description: 'Integrate LLMs, vector databases, and RAG pipelines into your apps with these AI-native starter kits.',
    icon: 'Cpu',
    color: 'from-purple-500 to-pink-500',
    count: 28,
    features: ['OpenAI Integration', 'Vector DB Setup', 'RAG Pipelines', 'Chat UI']
  },
  {
    id: 'Dashboard',
    title: 'Dashboards',
    description: 'Professional admin panels and data visualization kits for enterprise applications.',
    icon: 'Layout',
    color: 'from-emerald-500 to-teal-500',
    count: 35,
    features: ['Data Grids', 'Interactive Charts', 'Admin Layouts', 'Dark Mode']
  },
  {
    id: 'E-commerce',
    title: 'E-commerce',
    description: 'Storefronts, cart logic, and checkout flows optimized for conversion.',
    icon: 'ShoppingBag',
    color: 'from-orange-500 to-amber-500',
    count: 19,
    features: ['Product Catalog', 'Cart Logic', 'Checkout Flow', 'Inventory']
  },
  {
    id: 'Mobile',
    title: 'Mobile Apps',
    description: 'React Native and Expo starter kits to ship iOS and Android apps from a single codebase.',
    icon: 'Smartphone',
    color: 'from-cyan-500 to-blue-500',
    count: 15,
    features: ['Expo Config', 'Native Navigation', 'Offline Support', 'Push Notifs']
  }
];

export const AUTOMATION_CATEGORIES = [
  { id: 'SaaS Ops', title: 'SaaS Ops', description: 'Automate user onboarding, churn prevention, and internal alerts.', count: 12, color: 'from-blue-500 to-cyan-500' },
  { id: 'CRM', title: 'CRM', description: 'Sync leads between forms, CRMs, and outreach tools automatically.', count: 8, color: 'from-orange-500 to-red-500' },
  { id: 'Email', title: 'Email', description: 'Smart autoresponders, newsletter ops, and cold outreach flows.', count: 15, color: 'from-yellow-500 to-amber-500' },
  { id: 'Marketing', title: 'Marketing', description: 'Social media scheduling, content repurposing, and ad ops.', count: 20, color: 'from-pink-500 to-rose-500' },
  { id: 'AI Agents', title: 'AI Agents', description: 'Autonomous agents for research, support, and data analysis.', count: 10, color: 'from-purple-500 to-indigo-500' },
  { id: 'Finance', title: 'Finance', description: 'Invoice generation, expense tracking, and payment alerts.', count: 6, color: 'from-emerald-500 to-green-500' },
  { id: 'E-commerce', title: 'E-commerce', description: 'Order processing, inventory sync, and customer support flows.', count: 14, color: 'from-teal-500 to-emerald-500' },
  { id: 'Notifications', title: 'Notifications', description: 'Centralized alerts via Slack, Discord, or SMS.', count: 9, color: 'from-sky-500 to-blue-500' },
  { id: 'Data Sync', title: 'Data Sync', description: 'Keep databases and spreadsheets in perfect sync.', count: 11, color: 'from-slate-500 to-zinc-500' },
];

export const POPULAR_CATEGORIES_DATA = [
  { name: 'AI Apps', icon: 'Cpu', count: '120+' },
  { name: 'SaaS', icon: 'Layers', count: '350+' },
  { name: 'Dashboards', icon: 'LayoutDashboard', count: '85+' },
  { name: 'Authentication', icon: 'Lock', count: '40+' },
  { name: 'Stripe Ready', icon: 'CreditCard', count: '200+' },
  { name: 'Mobile Apps', icon: 'Smartphone', count: '90+' },
  { name: 'Dev Tools', icon: 'Wrench', count: '60+' },
  { name: 'Landing Pages', icon: 'Monitor', count: '150+' }
];

export const PERSONAS_DATA = [
  { title: "Founders", desc: "Validate & launch MVPs in days, not months.", icon: "Rocket" },
  { title: "Students", desc: "Learn modern architecture by reading pro code.", icon: "GraduationCap" },
  { title: "Indie Hackers", desc: "Ship multiple side projects with one stack.", icon: "Code2" },
  { title: "Agencies", desc: "Deliver client projects faster and increase margins.", icon: "Building2" }
];

export const TESTIMONIALS_DATA = [
  { text: "This directory saved me weeks of research. Found the perfect Next.js starter for my SaaS.", author: "Sarah Jenkins", role: "Indie Hacker" },
  { text: "The quality of boilerplates here is unmatched. Highly curated and reliable codebases.", author: "David Ross", role: "CTO at TechFlow" },
  { text: "I launched my MVP in 3 days using a boilerplate I found on Atlas. It pays for itself.", author: "Elena M.", role: "Founder" }
];

export const FAQ_DATA = [
  { q: "Are these boilerplates free?", a: "We list both free and paid high-quality boilerplates. You can filter by price type to find exactly what fits your budget." },
  { q: "How often is the directory updated?", a: "We add new quality submissions daily. Our team manually reviews every submission to ensure it meets our code quality standards." },
  { q: "Can I submit my own boilerplate?", a: "Yes! Use the 'Submit' button in the navigation. We welcome high-quality contributions from the community." },
  { q: "What frameworks are supported?", a: "We cover all major modern web frameworks including Next.js, React, Vue, Remix, Laravel, Django, and mobile frameworks like React Native." }
];
