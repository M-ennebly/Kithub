
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Image as ImageIcon, X, ArrowRight } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../constants';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive unique categories from data
  const categories = ['All', ...Array.from(new Set(MOCK_BLOG_POSTS.map(p => p.category)))];

  // Filter Logic
  const filteredPosts = MOCK_BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Split data for the "All" view curated layout
  const mainFeaturedPosts = filteredPosts.slice(0, 3);
  const trendingPosts = filteredPosts.slice(2, 5);
  const latestPosts = filteredPosts.slice(3, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      
      {/* --- Header --- */}
      <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">
            Blog
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl">
            Insights, tutorials, and updates from the Boilerplate Atlas team.
          </p>
        </div>

        {/* Compact Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 text-zinc-400" size={16} />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-sm text-zinc-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- Filter Pills --- */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
              selectedCategory === cat
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white'
                : 'bg-transparent text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
        {(searchTerm || selectedCategory !== 'All') && (
           <button 
             onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
             className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 px-2"
           >
              <X size={12} /> Clear
           </button>
        )}
      </div>

      <AnimatePresence mode='wait'>
        {selectedCategory === 'All' && !searchTerm ? (
          /* --- CURATED LAYOUT (Default View) --- */
          <motion.div 
            key="curated"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            
            {/* Left Column: Featured */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-white">Featured Stories</h2>
                  <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mainFeaturedPosts.map((post) => (
                    <motion.div key={post.id} variants={itemVariants} className="h-[400px]">
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="group relative block w-full h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                      >
                        <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 transition-colors duration-500 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700/50 flex items-center justify-center">
                            <ImageIcon className="text-zinc-300 dark:text-zinc-700 w-12 h-12 opacity-50" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                          <span className="inline-block px-2.5 py-1 mb-3 rounded-md bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                              {post.category}
                          </span>
                          <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:underline decoration-primary underline-offset-4 decoration-2">
                              {post.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                              <span>{post.date}</span>
                              <span className="w-1 h-1 rounded-full bg-zinc-500"></span>
                              <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 space-y-12">
              {/* Trending */}
              <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Trending</h2>
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                  <div className="space-y-6">
                    {trendingPosts.map((post) => (
                        <Link key={post.id} to={`/blog/${post.slug}`} className="flex gap-4 group items-center">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-colors group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700">
                              <ImageIcon size={16} className="text-zinc-400 dark:text-zinc-600" />
                          </div>
                          <div className="flex-1 py-1">
                              <span className="text-[10px] font-bold text-primary uppercase tracking-wide block mb-1">{post.date}</span>
                              <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                          </div>
                        </Link>
                    ))}
                  </div>
              </div>

              {/* Latest */}
              <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Latest</h2>
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                  <div className="space-y-6">
                    {latestPosts.map((post) => (
                        <Link key={post.id} to={`/blog/${post.slug}`} className="flex gap-4 group items-center">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-colors group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700">
                              <ImageIcon size={16} className="text-zinc-400 dark:text-zinc-600" />
                          </div>
                          <div className="flex-1 py-1">
                              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide block mb-1">{post.readTime}</span>
                              <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                          </div>
                        </Link>
                    ))}
                  </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- FILTERED GRID VIEW (Active when Searching or Category Selected) --- */
          <motion.div 
            key="filtered"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
             {filteredPosts.length > 0 ? (
               filteredPosts.map((post) => (
                 <motion.div key={post.id} variants={itemVariants}>
                    <Link 
                        to={`/blog/${post.slug}`}
                        className="group flex flex-col h-full bg-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 transition-colors">
                           <ImageIcon className="text-zinc-400 dark:text-zinc-600 w-10 h-10" />
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                           <div className="flex items-center gap-3 mb-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                 {post.category}
                              </span>
                              <span className="text-xs text-zinc-400">•</span>
                              <span className="text-xs text-zinc-500">{post.readTime}</span>
                           </div>
                           <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                              {post.title}
                           </h3>
                           <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4 flex-1">
                              {post.excerpt}
                           </p>
                           <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 group-hover:text-primary transition-colors">
                              Read Article <ArrowRight size={14} />
                           </div>
                        </div>
                    </Link>
                 </motion.div>
               ))
             ) : (
               <div className="col-span-full py-20 text-center">
                  <p className="text-zinc-500 text-lg">No articles found for "{selectedCategory}"</p>
                  <button 
                    onClick={() => {setSelectedCategory('All'); setSearchTerm('')}}
                    className="text-primary hover:underline mt-2 text-sm"
                  >
                    Clear filters
                  </button>
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BlogPage;
