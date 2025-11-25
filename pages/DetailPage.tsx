
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Clock, Globe, Zap, 
  Terminal, ChevronRight, ChevronDown,
  Shield, Download, Layout as LayoutIcon, Cpu, Check, 
  ArrowLeft, ArrowRight, Folder, FileCode, FileJson, File
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_BOILERPLATES } from '../constants';
import SpotlightCard from '../components/SpotlightCard';
import BoilerplateCard from '../components/BoilerplateCard';

// --- Mock File Structure Component ---
const FileTreeItem = ({ name, type, children, depth = 0 }: { name: string, type: 'folder' | 'file', children?: React.ReactNode, depth?: number }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-1.5 py-1 px-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer text-sm font-mono text-zinc-600 dark:text-zinc-400`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => type === 'folder' && setIsOpen(!isOpen)}
      >
        <span className="opacity-60">
           {type === 'folder' && (
              isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
           )}
           {type === 'file' && <span className="w-3.5" />} 
        </span>
        
        {type === 'folder' && <Folder size={14} className="text-blue-500 fill-blue-500/20" />}
        {type === 'file' && name.endsWith('.tsx') && <FileCode size={14} className="text-cyan-500" />}
        {type === 'file' && name.endsWith('.json') && <FileJson size={14} className="text-amber-500" />}
        {type === 'file' && name.endsWith('.css') && <File size={14} className="text-pink-500" />}
        {type === 'file' && !name.match(/\.(tsx|json|css)$/) && <File size={14} className="text-zinc-500" />}
        
        <span className={`${type === 'folder' ? 'font-bold text-zinc-800 dark:text-zinc-200' : ''}`}>
           {name}
        </span>
      </div>
      <AnimatePresence>
        {isOpen && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectStructure = () => (
  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 overflow-hidden">
    <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
       <span>Project Structure</span>
       <span className="text-[10px] bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-600 dark:text-zinc-400">src</span>
    </div>
    <div className="p-2">
      <FileTreeItem name="app" type="folder">
         <FileTreeItem name="layout.tsx" type="file" depth={1} />
         <FileTreeItem name="page.tsx" type="file" depth={1} />
         <FileTreeItem name="(auth)" type="folder" depth={1}>
            <FileTreeItem name="login" type="folder" depth={2} />
            <FileTreeItem name="register" type="folder" depth={2} />
         </FileTreeItem>
         <FileTreeItem name="api" type="folder" depth={1} />
      </FileTreeItem>
      <FileTreeItem name="components" type="folder">
         <FileTreeItem name="ui" type="folder" depth={1}>
             <FileTreeItem name="button.tsx" type="file" depth={2} />
             <FileTreeItem name="card.tsx" type="file" depth={2} />
         </FileTreeItem>
         <FileTreeItem name="Navbar.tsx" type="file" depth={1} />
      </FileTreeItem>
      <FileTreeItem name="lib" type="folder">
         <FileTreeItem name="utils.ts" type="file" depth={1} />
         <FileTreeItem name="db.ts" type="file" depth={1} />
      </FileTreeItem>
      <FileTreeItem name="package.json" type="file" />
      <FileTreeItem name="tailwind.config.ts" type="file" />
    </div>
  </div>
);

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const boilerplate = MOCK_BOILERPLATES.find(b => b.id === id);

  if (!boilerplate) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Boilerplate not found</h2>
        <Link to="/browse" className="text-primary hover:underline">Return to Browse</Link>
      </div>
    );
  }

  // Filter related boilerplates
  const relatedBoilerplates = MOCK_BOILERPLATES
    .filter(b => b.category === boilerplate.category && b.id !== boilerplate.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link to="/browse" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Browse
        </Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-200 font-medium">{boilerplate.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- LEFT COLUMN (Main Content) --- */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
               {boilerplate.aiReady && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    <Zap size={12} /> AI Ready
                  </span>
               )}
               <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                  v2.4.0
               </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
              {boilerplate.title}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {boilerplate.longDescription}
            </p>
          </div>

          {/* Hero Preview */}
          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 aspect-video relative shadow-2xl group">
             <img 
               src={boilerplate.imageUrl} 
               alt={boilerplate.title} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
             
             {/* Floating Badge */}
             <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex gap-2">
                   {boilerplate.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white">
                         {tag}
                      </span>
                   ))}
                </div>
                <button className="bg-white text-zinc-900 px-5 py-2.5 rounded-lg font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                   <Globe size={16} /> Live Demo
                </button>
             </div>
          </div>

          {/* --- Technical Deep Dive (Tabs Layout) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
             {/* Code Structure */}
             <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                   <Folder size={18} className="text-zinc-400" /> Codebase Structure
                </h3>
                <ProjectStructure />
             </div>

             {/* Quick Start Terminal */}
             <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                   <Terminal size={18} className="text-zinc-400" /> Quick Start
                </h3>
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#09090b] shadow-2xl h-full min-h-[280px]">
                  <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                      </div>
                      <div className="ml-2 text-xs text-zinc-500 font-mono opacity-50">bash — 80x24</div>
                  </div>
                  <div className="p-6 font-mono text-sm space-y-4">
                      <div className="space-y-1">
                        <div className="flex gap-2 text-zinc-500 text-xs select-none"># Clone the repository</div>
                        <div className="flex gap-2 text-zinc-400">
                            <span className="text-emerald-400">➜</span>
                            <span className="text-blue-400">~</span>
                            <span>git clone {boilerplate.repoUrl || 'git@github.com:atlas/starter.git'}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex gap-2 text-zinc-500 text-xs select-none"># Install dependencies</div>
                        <div className="flex gap-2 text-zinc-400">
                            <span className="text-emerald-400">➜</span>
                            <span className="text-blue-400">~</span>
                            <span>npm install</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex gap-2 text-zinc-500 text-xs select-none"># Start development server</div>
                        <div className="flex gap-2 text-zinc-400">
                            <span className="text-emerald-400">➜</span>
                            <span className="text-blue-400">~</span>
                            <span>npm run dev</span>
                        </div>
                      </div>

                      <div className="pt-2 text-emerald-400/80 animate-pulse">
                         Ready in 3.4s ⚡
                      </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Features Grid (Bento Style) */}
          <div>
            <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-6">Included Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {boilerplate.features.map((feature, i) => (
                  <div key={i} className="group flex items-start gap-4 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 hover:border-primary/30 transition-colors">
                     <div className="mt-0.5 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Check size={14} className="text-primary" />
                     </div>
                     <div>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white block mb-1">{feature}</span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                           Production-ready implementation with full TypeScript support and testing coverage.
                        </span>
                     </div>
                  </div>
               ))}
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN (Sticky Sidebar) --- */}
        <div className="lg:col-span-4 space-y-8">
           <div className="sticky top-32 space-y-6">
              
              {/* Buy Card */}
              <SpotlightCard className="bg-surface border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden" spotlightColor="rgba(139, 92, 246, 0.2)">
                 <div className="flex items-baseline justify-between mb-6">
                    <span className="text-sm font-medium text-zinc-500">One-time payment</span>
                    <span className="text-4xl font-display font-bold text-zinc-900 dark:text-white">
                       {boilerplate.priceType === 'Free' ? 'Free' : boilerplate.price}
                    </span>
                 </div>
                 
                 <div className="space-y-3 mb-6">
                    <button className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]">
                       <Download size={18} /> 
                       {boilerplate.priceType === 'Free' ? 'Download Now' : 'Buy License'}
                    </button>
                    <button className="w-full py-3 rounded-xl bg-transparent border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-semibold text-sm transition-all">
                       Preview Live Demo
                    </button>
                 </div>

                 <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between text-xs">
                       <span className="text-zinc-500">Last Updated</span>
                       <span className="font-medium text-zinc-900 dark:text-white flex items-center gap-1">
                          <Clock size={12} /> {boilerplate.lastUpdated}
                       </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                       <span className="text-zinc-500">Version</span>
                       <span className="font-medium text-zinc-900 dark:text-white">2.4.0</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                       <span className="text-zinc-500">License</span>
                       <span className="font-medium text-zinc-900 dark:text-white flex items-center gap-1">
                          <Shield size={12} /> MIT / Commercial
                       </span>
                    </div>
                 </div>
              </SpotlightCard>

              {/* Tech Specs */}
              <div className="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                 <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Tech Stack</h4>
                 <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                       <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          <LayoutIcon size={16} className="text-zinc-400" /> Framework
                       </div>
                       <span className="text-xs font-bold text-zinc-900 dark:text-white">{boilerplate.framework}</span>
                    </div>
                    {boilerplate.database && (
                       <div className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                          <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                             <Cpu size={16} className="text-zinc-400" /> Database
                          </div>
                          <span className="text-xs font-bold text-zinc-900 dark:text-white">{boilerplate.database}</span>
                       </div>
                    )}
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                       <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          <Terminal size={16} className="text-zinc-400" /> Language
                       </div>
                       <span className="text-xs font-bold text-zinc-900 dark:text-white">TypeScript</span>
                    </div>
                 </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {boilerplate.author.charAt(0)}
                 </div>
                 <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Created by</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">{boilerplate.author}</p>
                 </div>
                 <button className="ml-auto text-xs font-medium text-zinc-500 hover:text-primary transition-colors">
                    View Profile
                 </button>
              </div>

           </div>
        </div>
      </div>

      {/* --- REVIEWS SECTION --- */}
      <div className="mt-20 border-t border-zinc-200 dark:border-zinc-800 pt-16">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">Community Reviews</h3>
            <div className="flex items-center gap-2">
               <Star size={20} className="text-amber-500 fill-amber-500" />
               <span className="text-xl font-bold text-zinc-900 dark:text-white">{boilerplate.rating}</span>
               <span className="text-sm text-zinc-500">({boilerplate.reviewCount} reviews)</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boilerplate.reviews.length > 0 ? (
               boilerplate.reviews.map((review) => (
                  <SpotlightCard key={review.id} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800">
                     <div className="flex items-center gap-3 mb-4">
                        <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                           <p className="text-sm font-bold text-zinc-900 dark:text-white">{review.user}</p>
                           <p className="text-xs text-zinc-500">{review.date}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                           {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-zinc-300 dark:text-zinc-700"} />
                           ))}
                        </div>
                     </div>
                     <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        "{review.comment}"
                     </p>
                  </SpotlightCard>
               ))
            ) : (
               <div className="col-span-2 text-center py-12 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                  <p className="text-zinc-500">No reviews yet. Be the first to try it out!</p>
               </div>
            )}
         </div>
      </div>

      {/* --- SIMILAR BOILERPLATES SECTION --- */}
      {relatedBoilerplates.length > 0 && (
        <div className="mt-24 border-t border-zinc-200 dark:border-zinc-800 pt-16">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">Similar Boilerplates</h3>
             <Link to={`/browse?category=${boilerplate.category}`} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                View more {boilerplate.category} <ArrowRight size={14} />
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBoilerplates.map((item) => (
               <div key={item.id} className="h-full">
                  <BoilerplateCard data={item} />
               </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default DetailPage;
