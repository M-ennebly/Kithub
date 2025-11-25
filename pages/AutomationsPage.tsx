
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Filter, Search, X, Check, Zap, ChevronDown, 
  Mail, ArrowRight, Star, Tag, SlidersHorizontal
} from 'lucide-react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { MOCK_AUTOMATIONS, AUTOMATION_CATEGORIES } from '../constants';
import BoilerplateCard from '../components/BoilerplateCard';
import { FilterState } from '../types';

// --- Icons ---
const N8nIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
       <path fillRule="evenodd" clipRule="evenodd" d="M11.9567 4.19727C12.3565 4.19727 12.6934 4.51268 12.6934 5.01358V10.2796C12.6934 10.7075 13.0403 11.0544 13.4682 11.0544H18.7342C19.1621 11.0544 19.509 11.4013 19.509 11.8292V14.7088C19.509 15.1367 19.1621 15.4836 18.7342 15.4836H15.0172C13.7335 15.4836 12.6934 16.5237 12.6934 17.8074V21.5244C12.6934 21.9523 12.3465 22.2992 11.9186 22.2992H9.03903C8.61113 22.2992 8.26422 21.9523 8.26422 21.5244V16.2584C8.26422 15.8305 7.91731 15.4836 7.48941 15.4836H2.22341C1.7955 15.4836 1.44861 15.1367 1.44861 14.7088V11.8292C1.44861 11.4013 1.7955 11.0544 2.22341 11.0544H5.94041C7.22415 11.0544 8.26422 10.0143 8.26422 8.73059V5.01358C8.26422 4.58568 8.61113 4.23877 9.03903 4.23877H11.9567V4.19727ZM13.8016 1.44849C13.8016 1.02058 14.1485 0.673676 14.5764 0.673676H17.456C17.8839 0.673676 18.2308 1.02058 18.2308 1.44849V6.71449C18.2308 7.1424 18.5777 7.48931 19.0056 7.48931H22.2234C22.6513 7.48931 22.9982 7.83622 22.9982 8.26413V11.1437C22.9982 11.5716 22.6513 11.9185 22.2234 11.9185H19.0056C17.7219 11.9185 16.6818 10.8784 16.6818 9.59468V4.32868C16.6818 2.73801 15.3923 1.44849 13.8016 1.44849Z" fill="currentColor"/>
    </svg>
);
const MakeIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8.6 16.6L6.2 14.2L11 9.4L15.8 14.2L13.4 16.6L11 14.2L8.6 16.6ZM15.4 9.4L13 7L17.8 2.2L20.2 4.6L15.4 9.4Z" fill="currentColor"/>
      <circle cx="12" cy="12" r="8" fill="#884CFC"/>
      <path d="M7 12L11 16L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const ZapierIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const PipedreamIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
      <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const AirtableIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2L2 22H22L12 2Z" fill="currentColor"/>
      <path d="M12 8L7 18H17L12 8Z" fill="white"/>
    </svg>
);
const NotionIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 4H20V20H4V4Z" fill="currentColor"/>
      <path d="M9 8V16L14 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// Extract unique values for filters
const AUTOMATION_TOOLS = ['n8n', 'Make', 'Zapier', 'Pipedream', 'Airtable', 'Notion'];
const AUTOMATION_DIFFICULTY = ['Beginner', 'Intermediate', 'Advanced'];
const AUTOMATION_CATS_LIST = AUTOMATION_CATEGORIES.map(c => c.title);

const TOOL_CONFIG: Record<string, { icon: React.ElementType, color: string }> = {
  'n8n': { icon: N8nIcon, color: 'text-[#EA4B71]' },
  'Make': { icon: MakeIcon, color: 'text-[#6A1B9A]' },
  'Zapier': { icon: ZapierIcon, color: 'text-[#FF4F00]' },
  'Pipedream': { icon: PipedreamIcon, color: 'text-[#34D399]' },
  'Airtable': { icon: AirtableIcon, color: 'text-[#F59E0B]' },
  'Notion': { icon: NotionIcon, color: 'text-zinc-900 dark:text-white' },
};

const AutomationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Initial state derived from URL
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') ? [searchParams.get('category')!] : [],
    framework: searchParams.get('tool') ? [searchParams.get('tool')!] : [],
    priceType: [], // using this for Difficulty
    aiReady: searchParams.get('ai') === 'true',
  });

  const [sortBy, setSortBy] = useState('Featured');

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

  // --- Filtering Logic for Automations ---
  const filteredItems = MOCK_AUTOMATIONS.filter(item => {
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase()) && !item.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.category.length > 0 && !filters.category.includes('All') && !filters.category.includes(item.category)) return false;
    
    // framework -> tool
    if (filters.framework.length > 0 && !filters.framework.includes(item.tool)) return false;
    
    if (filters.aiReady && !item.aiReady) return false;
    
    // priceType -> difficulty
    if (filters.priceType.length > 0 && !filters.priceType.includes(item.difficulty)) return false;
    
    return true;
  });

  // --- Sorting Logic ---
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch(sortBy) {
      case 'Highest Rated': return b.rating - a.rating;
      case 'Newest': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'Most Popular': return b.reviewCount - a.reviewCount;
      default: return 0;
    }
  });

  // Featured Picks
  const featuredPicks = sortedItems.filter(i => i.rating >= 4.8).slice(0, 3);
  const displayGridItems = sortedItems; 

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
      
      {/* --- Intro Section --- */}
      <motion.div variants={itemVariants} className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
          {currentCategory === 'All' ? 'All' : currentCategory} Automations
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
           Curated automation workflows for n8n, Make.com, Zapier, and Pipedream.
        </p>
      </motion.div>

      {/* --- Tool Badges (Quick Access) --- */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex flex-wrap gap-3">
          {AUTOMATION_TOOLS.map((tool) => {
            const config = TOOL_CONFIG[tool] || { icon: Tag, color: 'text-zinc-500' };
            const Icon = config.icon;
            const isSelected = filters.framework.includes(tool);
            
            return (
              <button
                key={tool}
                onClick={() => toggleFilter('framework', tool)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-200 group ${
                  isSelected
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white shadow-lg'
                    : 'bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200 hover:shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-current' : config.color} transition-colors`} />
                {tool}
              </button>
            );
          })}
        </div>
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
                    <span>AI / LLM Ready</span>
                  </div>
                  <button 
                    onClick={() => setFilters(prev => ({ ...prev, aiReady: !prev.aiReady }))}
                    className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 ${filters.aiReady ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${filters.aiReady ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Only show automations that use AI models (OpenAI, Claude, etc).
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search automations..." 
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow placeholder:text-zinc-500"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>

            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/50"></div>

            <FilterSection 
              title="Tool" 
              options={AUTOMATION_TOOLS} 
              selected={filters.framework} 
              onToggle={(val) => toggleFilter('framework', val)} 
              type="list"
            />

            <FilterSection 
              title="Category" 
              options={AUTOMATION_CATS_LIST} 
              selected={filters.category} 
              onToggle={(val) => toggleFilter('category', val)} 
              type="pills"
            />

            <FilterSection 
              title="Difficulty" 
              options={AUTOMATION_DIFFICULTY} 
              selected={filters.priceType} 
              onToggle={(val) => toggleFilter('priceType', val)} 
              type="pills"
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
                      <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white">All {currentCategory} Automations</h3>
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
              <p className="text-zinc-500 text-lg">No automations found matching your criteria.</p>
              <button 
                onClick={() => setFilters({ search: '', category: [], framework: [], priceType: [], aiReady: false })}
                className="mt-4 text-primary hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
          
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

export default AutomationsPage;
