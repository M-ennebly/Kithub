
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ChevronRight, Mail, ArrowRight, 
  Code2, Workflow, Zap, Layers, Cpu, Database,
  Sparkles, GitBranch
} from 'lucide-react';
import { MOCK_BOILERPLATES, MOCK_AUTOMATIONS } from '../constants';
import BoilerplateCard from '../components/BoilerplateCard';
import RippleGrid from '../components/RippleGrid';
import TextType from '../components/TextType';
import { useTheme } from '../context/ThemeContext';
import SpotlightCard from '../components/SpotlightCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Default to boilerplates search, but ideally this would be a global search page
      navigate(`/boilerplates?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  // --- Data Aggregation ---
  
  // Mix for "Featured Drops" (Taking newest from both)
  const mixedFeatured = [
    MOCK_BOILERPLATES[0], // Nexus AI
    MOCK_AUTOMATIONS[0],  // Lead Enrichment
    MOCK_BOILERPLATES[2], // Agentic Flow
    MOCK_AUTOMATIONS[3],  // Social Media
  ];

  // Mix for "Most Popular" (High ratings)
  const mixedPopular = [
    MOCK_AUTOMATIONS[1], // AI Support
    MOCK_BOILERPLATES[1], // Modern Dashboard
    MOCK_BOILERPLATES[3], // Supabase SaaS
    MOCK_AUTOMATIONS[2], // Stripe Recovery
  ];

  // Specific Deep Dives
  const highlightBoilerplates = MOCK_BOILERPLATES.slice(0, 3);
  const highlightAutomations = MOCK_AUTOMATIONS.slice(0, 3);

  return (
    <div className="flex flex-col pb-20 transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full overflow-hidden min-h-[700px] flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10 pointer-events-none transition-colors duration-300"></div>
          <RippleGrid
            enableRainbow={false}
            gridColor={theme === 'dark' ? "#8b5cf6" : "#a855f7"}
            rippleIntensity={0.6}
            gridSize={5} 
            gridThickness={5}
            mouseInteraction={true}
            mouseInteractionRadius={2}
            opacity={theme === 'dark' ? 0.8 : 0.4}
          />
        </div>

        <section className="relative z-10 px-6 pt-20 pb-16 max-w-7xl mx-auto w-full pointer-events-none">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in pointer-events-auto">
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1] drop-shadow-sm dark:drop-shadow-xl transition-colors">
              Ship products & workflows, <br/>
              <span className="">
                <TextType 
                  text={[
                    "faster than ever.",
                    "with AI agents.",
                    "without the hassle.",
                    "using pro blueprints."
                  ]}
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={2000}
                  loop={true}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              The ultimate directory for developers and founders. <br className="hidden md:block" />
              Discover production-ready <strong>Boilerplates</strong> and powerful <strong>Automation Workflows</strong>.
            </p>

            <div className="max-w-xl mx-auto relative group pt-4">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <div className="absolute left-4 text-primary">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search SaaS kits, n8n workflows, AI agents..."
                  className="w-full bg-white/95 dark:bg-zinc-900/90 backdrop-blur-xl border border-primary/40 text-zinc-900 dark:text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-zinc-500 text-base shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute right-2 bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-lg transition-colors">
                  <ChevronRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* --- TWO PILLARS SECTION (Redesigned & Compact) --- */}
      <section className="relative z-20 -mt-20 px-6 max-w-7xl mx-auto w-full mb-24">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Boilerplates Pillar */}
            <SpotlightCard 
                as={Link} 
                to="/boilerplates"
                className="group relative h-[220px] bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 shadow-xl"
                spotlightColor="rgba(139, 92, 246, 0.15)"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black/80 dark:via-transparent dark:to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white mb-2">Boilerplates</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs mb-4">
                            Full-stack starter kits. Next.js, React, SaaS, and Mobile codebases.
                        </p>
                        <div className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm group-hover:gap-3 transition-all border-b border-zinc-300 dark:border-zinc-700 pb-0.5 group-hover:border-zinc-900 dark:group-hover:border-white">
                            Browse Code <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </SpotlightCard>

            {/* Automations Pillar */}
            <SpotlightCard 
                as={Link} 
                to="/automations"
                className="group relative h-[220px] bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 shadow-xl"
                spotlightColor="rgba(16, 185, 129, 0.15)"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black/80 dark:via-transparent dark:to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white mb-2">Automations</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs mb-4">
                            No-code workflows. Connect n8n, Make, and Zapier to build agents.
                        </p>
                        <div className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm group-hover:gap-3 transition-all border-b border-zinc-300 dark:border-zinc-700 pb-0.5 group-hover:border-zinc-900 dark:group-hover:border-white">
                            Browse Workflows <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </SpotlightCard>
         </div>
      </section>

      {/* --- MIXED: FEATURED DROPS --- */}
      <section className="py-8 max-w-7xl mx-auto px-6 w-full">
        <div className="flex items-end justify-between mb-10">
            <div>
                <span className="text-primary font-bold tracking-wider uppercase text-xs mb-3 block">Fresh & Curated</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">Featured Drops</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mixedFeatured.map((item) => (
                <div key={item.id} className="h-full">
                    <BoilerplateCard data={item} featured={true} />
                </div>
            ))}
        </div>
      </section>

      {/* --- MIXED: POPULAR --- */}
      <section className="py-16 max-w-7xl mx-auto px-6 w-full bg-zinc-50/50 dark:bg-zinc-900/20 border-y border-zinc-200 dark:border-zinc-800/50 rounded-3xl my-16">
        <div className="flex items-end justify-between mb-10">
            <div>
                <span className="text-amber-500 font-bold tracking-wider uppercase text-xs mb-3 block">Trending Now</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white">Community Favorites</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mixedPopular.map((item) => (
                <div key={item.id} className="h-full">
                    <BoilerplateCard data={item} />
                </div>
            ))}
        </div>
      </section>

      {/* --- DEEP DIVE: BOILERPLATES --- */}
      <section className="py-12 max-w-7xl mx-auto px-6 w-full">
         <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Code2 size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white">Top Tier Boilerplates</h2>
            </div>
            <Link to="/boilerplates" className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors group">
                View All Code <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightBoilerplates.map((item) => (
                <div key={item.id} className="h-full">
                    <BoilerplateCard data={item} />
                </div>
            ))}
         </div>
         <Link to="/boilerplates" className="md:hidden mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold">
            View All Boilerplates <ArrowRight size={14} />
         </Link>
      </section>

      {/* --- DEEP DIVE: AUTOMATIONS --- */}
      <section className="py-12 max-w-7xl mx-auto px-6 w-full">
         <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <Workflow size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 dark:text-white">High-Impact Automations</h2>
            </div>
            <Link to="/automations" className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors group">
                View All Flows <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightAutomations.map((item) => (
                <div key={item.id} className="h-full">
                    <BoilerplateCard data={item} />
                </div>
            ))}
         </div>
         <Link to="/automations" className="md:hidden mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold">
            View All Automations <ArrowRight size={14} />
         </Link>
      </section>

      {/* --- PREMIUM NEWSLETTER SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <div className="relative rounded-[2.5rem] bg-[#09090b] dark:bg-black border border-zinc-800 overflow-hidden shadow-2xl">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 p-8 md:p-16 items-center">
                
                {/* Left Content */}
                <div className="space-y-8 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 text-xs font-medium text-zinc-300">
                        <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Weekly Digest
                    </div>
                    
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                            Join the top 1% of <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">software builders.</span>
                        </h2>
                        <p className="text-lg text-zinc-400 max-w-md mx-auto md:mx-0 leading-relaxed">
                            Get curated boilerplates, discount codes, and trend reports delivered to your inbox every Tuesday. No spam, just code.
                        </p>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="flex -space-x-3">
                            {/* Realistic User Avatars from Unsplash */}
                            <div className="w-10 h-10 rounded-full border-2 border-[#09090b] bg-zinc-800 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User 1" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-[#09090b] bg-zinc-800 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="User 2" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-[#09090b] bg-zinc-800 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="User 3" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-[#09090b] bg-zinc-800 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" alt="User 4" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="text-sm text-zinc-400">
                            <strong className="text-white block">12,000+</strong> builders joined
                        </div>
                    </div>
                </div>

                {/* Right Form Card */}
                <SpotlightCard className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 rounded-3xl shadow-xl relative group" spotlightColor="rgba(255,255,255,0.1)">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
                    
                    <div className="space-y-6 relative z-10">
                         <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-zinc-500" size={20} />
                                <input 
                                    type="email" 
                                    placeholder="founder@startup.com" 
                                    className="w-full bg-black/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                                />
                            </div>
                         </div>
                         <button className="w-full py-4 rounded-xl bg-white text-black font-bold text-base hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            Subscribe for Free
                         </button>
                         <p className="text-xs text-zinc-600 text-center">
                            Unsubscribe at any time. Read our <a href="#" className="text-zinc-400 hover:text-white underline">privacy policy</a>.
                         </p>
                    </div>
                </SpotlightCard>

            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
