import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, Search, X, Check, Zap, ChevronDown, 
  HelpCircle, BookOpen, Mail, ArrowRight, Star,
  Plus, Minus, Tag
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { MOCK_BOILERPLATES, CATEGORIES, FRAMEWORKS } from '../constants';
import BoilerplateCard from '../components/BoilerplateCard';
import { FilterState, Boilerplate } from '../types';

const BrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Initial state derived from URL
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') ? [searchParams.get('category')!] : [],
    framework: searchParams.get('framework') ? [searchParams.get('framework')!] : [],
    priceType: [],
    aiReady: searchParams.get('ai') === 'true',
  });

  const [sortBy, setSortBy] = useState('Featured');

  // Update URL when filters change (simplified sync)
  useEffect(() => {
    // In a real app, this would update searchParams
  }, [filters]);

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[key] as string[];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter(i => i !== value) };
      } else {
        return { ...prev, [key]: [...current, value] };
      }
    });
  };

  const currentCategory = filters.category.length === 1 ? filters.category[0] : 'All';

  // --- Filtering Logic ---
  const filteredItems = MOCK_BOILERPLATES.filter(item => {
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase()) && !item.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.category.length > 0 && !filters.category.includes('All') && !filters.category.includes(item.category)) return false;
    if (filters.framework.length > 0 && !filters.framework.includes(item.framework)) return false;
    if (filters.aiReady && !item.aiReady) return false;
    if (filters.priceType.length > 0 && !filters.priceType.includes(item.priceType)) return false;
    return true;
  });

  // --- Sorting Logic ---
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch(sortBy) {
      case 'Highest Rated': return b.rating - a.rating;
      case 'Newest': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(); // Mock logic
      case 'Most Popular': return b.reviewCount - a.reviewCount;
      default: return 0; // Featured usually manual, we'll assume default order is featured
    }
  });

  // Featured Picks (Top 3 from current filtered set)
  const featuredPicks = sortedItems.filter(i => i.rating >= 4.8).slice(0, 3);
  const displayGridItems = sortedItems; 

  // --- Descriptions & Content ---
  const getCategoryDescription = (cat: string) => {
    switch(cat) {
      case 'SaaS': return "Launch your startup faster with production-ready SaaS boilerplates. Includes auth, payments, and landing pages.";
      case 'AI': return "Integrate LLMs, vector databases, and RAG pipelines into your apps with these AI-native starter kits.";
      case 'Dashboard': return "Professional admin panels and data visualization kits for enterprise applications.";
      case 'Mobile': return "React Native and Expo starter kits to ship iOS and Android apps from a single codebase.";
      case 'E-commerce': return "Storefronts, cart logic, and checkout flows optimized for conversion.";
      default: return "Discover the best developer boilerplates, curated for quality and speed.";
    }
  };

  const FilterSection = ({ 
    title, 
    options, 
    selected, 
    onToggle, 
    type = 'list' 
  }: { 
    title: string, 
    options: string[], 
    selected: string[], 
    onToggle: (val: string) => void,
    type?: 'list' | 'pills'
  }) => (
    <div className="mb-8">
      <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">{title}</h3>
      
      {type === 'pills' ? (
        <div className="flex flex-wrap gap-2">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 
                ${selected.includes(opt) 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white shadow-sm' 
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group p-2 -mx-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all 
                ${selected.includes(opt) 
                  ? 'bg-primary border-primary shadow-sm' 
                  : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 group-hover:border-zinc-400 dark:group-hover:border-zinc-500'
                }`}>
                {selected.includes(opt) && <Check size={10} className="text-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={selected.includes(opt)} 
                onChange={() => onToggle(opt)}
              />
              <span className={`text-sm ${selected.includes(opt) ? 'text-zinc-900 dark:text-white font-medium' : 'text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors'}`}>
                {opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  // --- Animations ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.5 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const sidebarVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-6 py-8"
    >
      
      {/* --- Intro Section (Minimal Header) --- */}
      <motion.div variants={itemVariants} className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
          {currentCategory} Boilerplates
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
           {getCategoryDescription(currentCategory)}
        </p>
      </motion.div>

      {/* --- Horizontal Filters Row (Quick Access) --- */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-zinc-200 dark:border-zinc-800/50 lg:hidden">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mr-2 hidden sm:inline-block">Quick Filter:</span>
        
        {/* Price Pills */}
        <button 
          onClick={() => toggleFilter('priceType', 'Free')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filters.priceType.includes('Free') ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'}`}
        >
          Free
        </button>
        <button 
          onClick={() => toggleFilter('priceType', 'Paid')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filters.priceType.includes('Paid') ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'}`}
        >
          Paid
        </button>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Mobile Filter Toggle */}
        <motion.div variants={itemVariants} className="lg:hidden mb-4">
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Filter size={16} /> Filters
          </button>
        </motion.div>

        {/* --- Sidebar Filters --- */}
        <motion.aside variants={sidebarVariants} className={`lg:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-28 space-y-8 h-[calc(100vh-8rem)] overflow-y-auto pr-2 pb-10 scrollbar-hide">
            
            {/* AI Ready Toggle Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <Zap size={16} fill="currentColor" />
                    <span>AI / Cursor Ready</span>
                  </div>
                  <button 
                    onClick={() => setFilters(prev => ({ ...prev, aiReady: !prev.aiReady }))}
                    className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 ${filters.aiReady ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${filters.aiReady ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Only show boilerplates optimized for LLMs and Cursor IDE.
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search keywords..." 
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow placeholder:text-zinc-500"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>

            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/50"></div>

            <FilterSection 
              title="Category" 
              options={CATEGORIES.filter(c => c !== 'All')} 
              selected={filters.category} 
              onToggle={(val) => toggleFilter('category', val)} 
              type="pills"
            />

            <FilterSection 
              title="Pricing" 
              options={['Free', 'Paid', 'Freemium']} 
              selected={filters.priceType} 
              onToggle={(val) => toggleFilter('priceType', val)} 
              type="pills"
            />

            <FilterSection 
              title="Framework" 
              options={FRAMEWORKS} 
              selected={filters.framework} 
              onToggle={(val) => toggleFilter('framework', val)} 
              type="list"
            />
          </div>
        </motion.aside>

        {/* --- Main Content --- */}
        <motion.div variants={itemVariants} className="flex-1">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              {displayGridItems.length} Results
            </h2>
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent pl-3 pr-8 py-2 text-sm font-semibold text-zinc-900 dark:text-white cursor-pointer focus:outline-none"
              >
                <option>Featured</option>
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            </div>
          </div>

          {/* Featured Picks Row */}
          {featuredPicks.length > 0 && (
             <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white">Editor's Choice</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredPicks.map(item => (
                        <div key={item.id} className="h-full">
                            <BoilerplateCard data={item} featured={true} />
                        </div>
                    ))}
                </div>
             </div>
          )}

          {/* Main Grid */}
          {displayGridItems.length > 0 ? (
            <div>
                {featuredPicks.length > 0 && (
                   <div className="flex items-center gap-2 mb-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <Tag size={16} className="text-zinc-400" />
                      <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white">All {currentCategory} Boilerplates</h3>
                   </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayGridItems.map(item => (
                    <BoilerplateCard key={item.id} data={item} />
                ))}
                </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 text-lg">No boilerplates found matching your criteria.</p>
              <button 
                onClick={() => setFilters({ search: '', category: [], framework: [], priceType: [], aiReady: false })}
                className="mt-4 text-primary hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {/* --- Helpful Guide Section --- */}
          <div className="mt-24 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                   <BookOpen size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">What makes a great {currentCategory} boilerplate?</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                   <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      When selecting a {currentCategory} starter kit, look for code quality, documentation, and maintainability. The best choices often include pre-configured CI/CD pipelines and comprehensive testing setups.
                   </p>
                   <ul className="space-y-3">
                      {[
                        'Modern Tech Stack (Next.js 14, React 19)',
                        'Type Safety (TypeScript strictly typed)',
                        'Authentication flows pre-built',
                        'Database ORM configured (Prisma/Drizzle)'
                      ].map((item, i) => (
                         <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                            <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                            {item}
                         </li>
                      ))}
                   </ul>
                </div>
                <div className="space-y-4">
                   <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Pay attention to the licensing terms. "Commercial" or "MIT" licenses are preferred for flexibility. Also check the last updated date to ensure dependencies are not stale.
                   </p>
                </div>
             </div>
          </div>

          {/* --- FAQ Section --- */}
          <div className="mt-12">
             <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <HelpCircle size={20} className="text-zinc-400" /> Frequently Asked Questions
             </h3>
             <div className="space-y-3">
                {[
                   { q: "Do these boilerplates support TypeScript?", a: "Yes, almost all featured boilerplates are built with TypeScript by default for type safety." },
                   { q: "Can I use these for commercial projects?", a: "Most Paid boilerplates include a commercial license. Always check the specific license on the repo page." },
                   { q: "How do I get updates?", a: "For GitHub-based boilerplates, you can pull upstream changes. Paid products usually offer lifetime updates via email or dashboard." },
                   { q: "Are they suitable for beginners?", a: "Yes, but some knowledge of React/Next.js is recommended to get the most value out of them." }
                ].map((faq, i) => (
                   <div key={i} className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/20">
                      <button 
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 text-left font-medium text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                      >
                         {faq.q}
                         {expandedFaq === i ? <Minus size={16} className="text-primary" /> : <Plus size={16} className="text-zinc-400" /> }
                      </button>
                      {expandedFaq === i && (
                         <div className="p-4 pt-0 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-transparent">
                            {faq.a}
                         </div>
                      )}
                   </div>
                ))}
             </div>
          </div>

          {/* --- Newsletter --- */}
          <div className="mt-20 py-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-900 dark:text-white mb-4">
                <Mail size={24} />
             </div>
             <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-2">Get the weekly drop</h3>
             <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm">
                Join 12,000+ developers getting the best new boilerplates sent to their inbox.
             </p>
             <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                   type="email" 
                   placeholder="you@example.com" 
                   className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button className="bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-sm px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                   Join
                </button>
             </form>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default BrowsePage;