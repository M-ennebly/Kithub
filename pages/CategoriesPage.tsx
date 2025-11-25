
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { CATEGORY_DETAILS } from '../constants';
import SpotlightCard from '../components/SpotlightCard';

const CategoriesPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen bg-background text-zinc-900 dark:text-zinc-200">
      
      {/* Minimal Header */}
      <div className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-3 tracking-tight"
        >
          Browse by Category
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl"
        >
          Select a category to view curated boilerplates, starter kits, and tools optimized for that specific domain.
        </motion.p>
      </div>

      {/* Categories Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {CATEGORY_DETAILS.map((cat) => (
          <motion.div key={cat.id} variants={itemVariants} className="h-full">
            <SpotlightCard 
              as={Link}
              to={`/browse?category=${cat.id}`}
              className="group relative flex flex-col h-full bg-surface border border-border rounded-xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-primary/5"
              spotlightColor="rgba(139, 92, 246, 0.15)"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.color} opacity-70 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="p-6 flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors leading-tight">
                    {cat.title}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500">
                      {cat.count} items
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {cat.description}
                </p>

                {/* Footer: Features */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {cat.features.slice(0, 3).map((feat, i) => (
                            <span key={i} className="text-[10px] font-medium px-2 py-1 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                                {feat}
                            </span>
                        ))}
                    </div>
                   <div className="flex items-center justify-end text-xs font-medium text-zinc-400 group-hover:text-primary transition-colors">
                       View Collection <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}

        {/* Automations Category Card */}
        <motion.div variants={itemVariants} className="h-full">
            <SpotlightCard 
              as={Link}
              to="/automations"
              className="group relative flex flex-col h-full bg-surface border border-border rounded-xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-emerald-500/10"
              spotlightColor="rgba(16, 185, 129, 0.15)"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="p-6 flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                      <Zap size={20} className="text-emerald-500 fill-emerald-500/10" />
                      <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors leading-tight">
                        Automations
                      </h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500">
                      New
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  Browse workflow automations for SaaS, CRM, email, AI, operations, and more.
                </p>

                {/* Footer: Features */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {['n8n', 'Make.com', 'Zapier', 'Pipedream'].map((feat, i) => (
                            <span key={i} className="text-[10px] font-medium px-2 py-1 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                                {feat}
                            </span>
                        ))}
                    </div>
                   <div className="flex items-center justify-end text-xs font-medium text-zinc-400 group-hover:text-emerald-500 transition-colors">
                       Explore Workflows <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            </SpotlightCard>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default CategoriesPage;
