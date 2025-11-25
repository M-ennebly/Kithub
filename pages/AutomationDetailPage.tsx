
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Clock, Globe, Zap, 
  ArrowLeft, ArrowRight, Check, Shield, Download,
  Workflow, Layers, Activity, Play, GitBranch, Settings,
  Database, Box, Cpu, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_AUTOMATIONS } from '../constants';
import SpotlightCard from '../components/SpotlightCard';
import BoilerplateCard from '../components/BoilerplateCard';

// --- Icons Helper ---
const ToolIcon = ({ name, className }: { name: string, className?: string }) => {
  const n = name.toLowerCase();
  if (n.includes('n8n')) return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
       <path fillRule="evenodd" clipRule="evenodd" d="M11.9567 4.19727C12.3565 4.19727 12.6934 4.51268 12.6934 5.01358V10.2796C12.6934 10.7075 13.0403 11.0544 13.4682 11.0544H18.7342C19.1621 11.0544 19.509 11.4013 19.509 11.8292V14.7088C19.509 15.1367 19.1621 15.4836 18.7342 15.4836H15.0172C13.7335 15.4836 12.6934 16.5237 12.6934 17.8074V21.5244C12.6934 21.9523 12.3465 22.2992 11.9186 22.2992H9.03903C8.61113 22.2992 8.26422 21.9523 8.26422 21.5244V16.2584C8.26422 15.8305 7.91731 15.4836 7.48941 15.4836H2.22341C1.7955 15.4836 1.44861 15.1367 1.44861 14.7088V11.8292C1.44861 11.4013 1.7955 11.0544 2.22341 11.0544H5.94041C7.22415 11.0544 8.26422 10.0143 8.26422 8.73059V5.01358C8.26422 4.58568 8.61113 4.23877 9.03903 4.23877H11.9567V4.19727ZM13.8016 1.44849C13.8016 1.02058 14.1485 0.673676 14.5764 0.673676H17.456C17.8839 0.673676 18.2308 1.02058 18.2308 1.44849V6.71449C18.2308 7.1424 18.5777 7.48931 19.0056 7.48931H22.2234C22.6513 7.48931 22.9982 7.83622 22.9982 8.26413V11.1437C22.9982 11.5716 22.6513 11.9185 22.2234 11.9185H19.0056C17.7219 11.9185 16.6818 10.8784 16.6818 9.59468V4.32868C16.6818 2.73801 15.3923 1.44849 13.8016 1.44849Z" fill="currentColor"/>
    </svg>
  );
  if (n.includes('make')) return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8.6 16.6L6.2 14.2L11 9.4L15.8 14.2L13.4 16.6L11 14.2L8.6 16.6ZM15.4 9.4L13 7L17.8 2.2L20.2 4.6L15.4 9.4Z" fill="currentColor"/>
    </svg>
  );
  if (n.includes('zapier')) return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  // Generic fallbacks
  if (n.includes('google') || n.includes('gmail')) return <Mail className={className} />;
  if (n.includes('slack') || n.includes('discord')) return <Activity className={className} />;
  if (n.includes('openai') || n.includes('gpt') || n.includes('claude')) return <Cpu className={className} />;
  if (n.includes('hubspot') || n.includes('crm')) return <Database className={className} />;
  
  return <Box className={className} />;
};

// --- Visual Workflow Node ---
interface WorkflowNodeProps {
  step: string;
  index: number;
  isLast: boolean;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ step, index, isLast }) => {
  const isTrigger = step.toLowerCase().includes('trigger');
  const isAction = step.toLowerCase().includes('action');
  const isCondition = step.toLowerCase().includes('condition');

  return (
    <div className="relative flex gap-6 group">
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-[22px] top-12 bottom-[-24px] w-0.5 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-primary/50 transition-colors"></div>
      )}

      {/* Icon Node */}
      <div className={`
        relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all duration-300
        ${isTrigger ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700 text-amber-600 dark:text-amber-400' : 
          isCondition ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400' :
          'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:border-primary/50 group-hover:text-primary'}
      `}>
        {isTrigger ? <Play size={20} fill="currentColor" className="ml-1" /> :
         isCondition ? <GitBranch size={20} /> :
         <Settings size={20} />}
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-8">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm group-hover:shadow-md group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider 
              ${isTrigger ? 'text-amber-500' : isCondition ? 'text-purple-500' : 'text-zinc-400'}`}>
              {isTrigger ? 'Trigger' : isCondition ? 'Logic' : 'Action'}
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Step {index + 1}</span>
          </div>
          <div className="font-bold text-zinc-900 dark:text-white text-sm md:text-base">
            {step.replace(/^(Trigger:|Action:|Condition:)\s*/i, '')}
          </div>
        </div>
      </div>
    </div>
  );
};

const AutomationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const automation = MOCK_AUTOMATIONS.find(a => a.id === id);

  if (!automation) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Automation not found</h2>
        <Link to="/automations" className="text-primary hover:underline">Return to Automations</Link>
      </div>
    );
  }

  // Filter related automations
  const relatedAutomations = MOCK_AUTOMATIONS
    .filter(a => a.tool === automation.tool && a.id !== automation.id)
    .slice(0, 3);

  // Connected apps (excluding the main platform)
  const connectedApps = automation.techStack.filter(t => t !== automation.tool);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link to="/automations" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Automations
        </Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-200 font-medium">{automation.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- LEFT COLUMN (Main Content) --- */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Header with Integration Chain */}
          <div>
            <div className="flex items-center gap-3 mb-6">
               {/* Main Tool Badge */}
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <ToolIcon name={automation.tool} className="w-5 h-5" />
                  <span className="font-bold text-sm text-zinc-900 dark:text-white">{automation.tool}</span>
               </div>
               <ArrowRight size={16} className="text-zinc-300 dark:text-zinc-700" />
               {/* Connected Apps Row */}
               <div className="flex items-center gap-2">
                  {connectedApps.map((app, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400" title={app}>
                        <ToolIcon name={app} className="w-4 h-4" />
                    </div>
                  ))}
               </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
              {automation.title}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {automation.longDescription}
            </p>
          </div>

          {/* Hero Visual Canvas */}
          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-[#0f172a] relative shadow-2xl group aspect-[16/9] flex items-center justify-center">
             {/* Background Grid Pattern */}
             <div className="absolute inset-0 opacity-20" 
                  style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
             </div>
             
             {/* Center Visual */}
             <div className="relative z-10 flex flex-col items-center gap-6 scale-90 md:scale-100">
                <div className="flex items-center gap-4">
                   {/* Mock Visual Flow Nodes */}
                   <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl flex items-center justify-center border-2 border-amber-500">
                      <ToolIcon name={connectedApps[0] || 'Trigger'} className="w-8 h-8 text-amber-500" />
                   </div>
                   <div className="w-12 h-0.5 bg-zinc-600 dashed"></div>
                   <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl flex items-center justify-center border border-zinc-600">
                      <ToolIcon name={automation.tool} className="w-8 h-8 text-zinc-400" />
                   </div>
                   <div className="w-12 h-0.5 bg-zinc-600 dashed"></div>
                   <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl flex items-center justify-center border-2 border-emerald-500">
                      <ToolIcon name={connectedApps[1] || 'Action'} className="w-8 h-8 text-emerald-500" />
                   </div>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                   <Activity size={12} className="text-green-400 animate-pulse" />
                   Workflow Active
                </div>
             </div>

             {/* View Demo Button */}
             <div className="absolute bottom-6 right-6">
                <button className="bg-white text-zinc-900 px-5 py-2.5 rounded-lg font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                   <Globe size={16} /> Live Preview
                </button>
             </div>
          </div>

          {/* --- Visual Workflow Steps --- */}
          <div>
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">Workflow Logic</h3>
                 <span className="text-xs font-mono text-zinc-500 px-2 py-1 bg-zinc-100 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
                    {automation.steps.length} Nodes
                 </span>
              </div>
              
              <div className="pl-2">
                  {automation.steps.map((step, i) => (
                      <WorkflowNode 
                        key={i} 
                        step={step} 
                        index={i} 
                        isLast={i === automation.steps.length - 1} 
                      />
                  ))}
              </div>
          </div>

          {/* Features Grid */}
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white mb-6">What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {automation.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800">
                     <Check size={16} className="text-primary mt-0.5 shrink-0" />
                     <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </div>
               ))}
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN (Sticky Sidebar) --- */}
        <div className="lg:col-span-4 space-y-8">
           <div className="sticky top-32 space-y-6">
              
              {/* Buy / Download Card */}
              <SpotlightCard className="bg-surface border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden" spotlightColor="rgba(139, 92, 246, 0.2)">
                 <div className="flex items-center justify-between mb-6">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                       JSON / Blueprint
                    </span>
                    <span className="text-3xl font-display font-bold text-zinc-900 dark:text-white">
                       {automation.priceType === 'Free' ? 'Free' : automation.price}
                    </span>
                 </div>
                 
                 <div className="space-y-3 mb-6">
                    <button className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]">
                       <Download size={18} /> 
                       {automation.priceType === 'Free' ? 'Download Blueprint' : 'Buy Template'}
                    </button>
                 </div>

                 <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between text-xs">
                       <span className="text-zinc-500">Last Updated</span>
                       <span className="font-medium text-zinc-900 dark:text-white flex items-center gap-1">
                          <Clock size={12} /> {automation.lastUpdated}
                       </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                       <span className="text-zinc-500">Complexity</span>
                       <span className={`font-medium flex items-center gap-1
                           ${automation.difficulty === 'Beginner' ? 'text-emerald-500' :
                             automation.difficulty === 'Intermediate' ? 'text-amber-500' : 'text-red-500'}
                       `}>
                          <Activity size={12} /> {automation.difficulty}
                       </span>
                    </div>
                 </div>
              </SpotlightCard>

              {/* Requirements / Apps */}
              <div className="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                 <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers size={14} /> Required Apps
                 </h4>
                 <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                       <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white">
                          <ToolIcon name={automation.tool} className="w-4 h-4 text-zinc-400" /> {automation.tool}
                       </div>
                       <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">Free/Pro</span>
                    </div>
                    {connectedApps.map((app, i) => (
                       <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                          <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white">
                             <ToolIcon name={app} className="w-4 h-4 text-zinc-400" /> {app}
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">Account</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                 <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold">
                    {automation.author.charAt(0)}
                 </div>
                 <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Created by</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">{automation.author}</p>
                 </div>
                 <button className="ml-auto text-xs font-medium text-primary hover:text-accent transition-colors">
                    View Profile
                 </button>
              </div>

           </div>
        </div>
      </div>

      {/* --- REVIEWS SECTION --- */}
      <div className="mt-20 border-t border-zinc-200 dark:border-zinc-800 pt-16">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">User Reviews</h3>
            <div className="flex items-center gap-2">
               <Star size={20} className="text-amber-500 fill-amber-500" />
               <span className="text-xl font-bold text-zinc-900 dark:text-white">{automation.rating}</span>
               <span className="text-sm text-zinc-500">({automation.reviewCount} reviews)</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automation.reviews && automation.reviews.length > 0 ? (
               automation.reviews.map((review) => (
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

      {/* --- RELATED AUTOMATIONS SECTION --- */}
      {relatedAutomations.length > 0 && (
        <div className="mt-24 border-t border-zinc-200 dark:border-zinc-800 pt-16">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">Related Workflows</h3>
             <Link to={`/automations?tool=${automation.tool}`} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                View more for {automation.tool} <ArrowRight size={14} />
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedAutomations.map((item) => (
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

export default AutomationDetailPage;
