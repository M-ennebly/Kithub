
export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Boilerplate {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  priceType: 'Free' | 'Paid' | 'Freemium';
  price: string;
  tags: string[];
  techStack: string[];
  lastUpdated: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  author: string;
  imageUrl: string;
  features: string[];
  category: 'SaaS' | 'AI' | 'Dashboard' | 'E-commerce' | 'Mobile' | 'Automation';
  framework: 'Next.js' | 'React' | 'Vue' | 'Remix' | 'n8n' | 'Make' | 'Zapier' | 'Pipedream' | string;
  database: 'PostgreSQL' | 'MongoDB' | 'Supabase' | 'Firebase' | string;
  aiReady: boolean;
  demoUrl: string;
  repoUrl: string;
}

// Extending Boilerplate to ensure compatibility with cards, but adding automation specifics
export interface Automation extends Boilerplate {
  tool: 'n8n' | 'Make' | 'Zapier' | 'Pipedream';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: string[];
}

export interface FilterState {
  search: string;
  framework: string[];
  priceType: string[];
  aiReady: boolean;
  category: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  category: 'Guides' | 'Comparisons' | 'Best-Of' | 'Tutorials' | 'News';
  author: string;
  readTime: string;
  featured?: boolean;
}
