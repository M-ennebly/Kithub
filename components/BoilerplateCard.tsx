
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Zap, Code2, Database } from 'lucide-react';
import { Boilerplate, Automation } from '../types';
import SpotlightCard from './SpotlightCard';

interface BoilerplateCardProps {
  data: Boilerplate | Automation;
  featured?: boolean;
}

// Type guard to check if data is an Automation
const isAutomation = (data: Boilerplate | Automation): data is Automation => {
  return (data as Automation).tool !== undefined;
};

// --- Brand Icons Helper ---
const getFrameworkIcon = (framework: string, className: string) => {
  const fw = framework.toLowerCase();
  
  if (fw.includes('next')) {
    return (
      <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <mask id="mask0_next_card" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="black"/>
        </mask>
        <g mask="url(#mask0_next_card)">
          <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.1"/>
          <path d="M149.508 157.52L69.142 54H54V125.97H66.6V72.698L136.2 161.99C140.89 160.78 145.33 159.27 149.508 157.52Z" fill="currentColor"/>
          <path d="M115.8 54H128.4V125.97H115.8V54Z" fill="currentColor"/>
        </g>
      </svg>
    );
  }
  if (fw.includes('react') && !fw.includes('native')) {
    return (
      <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="0" cy="0" r="2" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="10" ry="4.5"/>
          <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
          <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }
  if (fw.includes('n8n')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
         <path fillRule="evenodd" clipRule="evenodd" d="M11.9567 4.19727C12.3565 4.19727 12.6934 4.51268 12.6934 5.01358V10.2796C12.6934 10.7075 13.0403 11.0544 13.4682 11.0544H18.7342C19.1621 11.0544 19.509 11.4013 19.509 11.8292V14.7088C19.509 15.1367 19.1621 15.4836 18.7342 15.4836H15.0172C13.7335 15.4836 12.6934 16.5237 12.6934 17.8074V21.5244C12.6934 21.9523 12.3465 22.2992 11.9186 22.2992H9.03903C8.61113 22.2992 8.26422 21.9523 8.26422 21.5244V16.2584C8.26422 15.8305 7.91731 15.4836 7.48941 15.4836H2.22341C1.7955 15.4836 1.44861 15.1367 1.44861 14.7088V11.8292C1.44861 11.4013 1.7955 11.0544 2.22341 11.0544H5.94041C7.22415 11.0544 8.26422 10.0143 8.26422 8.73059V5.01358C8.26422 4.58568 8.61113 4.23877 9.03903 4.23877H11.9567V4.19727ZM13.8016 1.44849C13.8016 1.02058 14.1485 0.673676 14.5764 0.673676H17.456C17.8839 0.673676 18.2308 1.02058 18.2308 1.44849V6.71449C18.2308 7.1424 18.5777 7.48931 19.0056 7.48931H22.2234C22.6513 7.48931 22.9982 7.83622 22.9982 8.26413V11.1437C22.9982 11.5716 22.6513 11.9185 22.2234 11.9185H19.0056C17.7219 11.9185 16.6818 10.8784 16.6818 9.59468V4.32868C16.6818 2.73801 15.3923 1.44849 13.8016 1.44849Z" fill="#EA4B71"/>
      </svg>
    );
  }
  if (fw.includes('make')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8.6 16.6L6.2 14.2L11 9.4L15.8 14.2L13.4 16.6L11 14.2L8.6 16.6ZM15.4 9.4L13 7L17.8 2.2L20.2 4.6L15.4 9.4Z" fill="#6A1B9A"/>
        <circle cx="12" cy="12" r="8" fill="#884CFC"/>
        <path d="M7 12L11 16L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (fw.includes('zapier')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 12H20" stroke="#FF4F00" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 4V20" stroke="#FF4F00" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 6L18 18" stroke="#FF4F00" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 6L6 18" stroke="#FF4F00" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (fw.includes('pipedream')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#34D399"/>
        <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (fw.includes('airtable')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 2L2 22H22L12 2Z" fill="#FBBF24"/>
        <path d="M12 8L7 18H17L12 8Z" fill="#F59E0B"/>
      </svg>
    );
  }
  if (fw.includes('notion')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 4H20V20H4V4Z" fill="currentColor"/>
        <path d="M9 8V16L14 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  // Fallback
  return <Code2 size={14} className={className} />;
};

const BoilerplateCard: React.FC<BoilerplateCardProps> = ({ data, featured = false }) => {
  // Determine link destination based on data type
  const detailLink = isAutomation(data) 
    ? `/automation/${data.id}` 
    : `/boilerplate/${data.id}`;

  const frameworkLabel = isAutomation(data) ? data.tool : data.framework;

  return (
    <SpotlightCard 
      as={Link}
      to={detailLink}
      className="group relative flex flex-col h-full bg-surface border border-border rounded-xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-primary/5"
      spotlightColor="rgba(139, 92, 246, 0.2)"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent group-hover:via-primary/70 transition-all duration-500 opacity-50 group-hover:opacity-100"></div>

      <div className="p-6 flex flex-col h-full relative z-10">
        {/* Header: Title & Badges */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
             {/* Featured Tag */}
             {featured && (
              <span className="inline-block mb-2 text-[10px] font-bold tracking-wider uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Featured
              </span>
            )}
            
            <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors leading-tight">
              {data.title}
            </h3>
            <p className="text-xs text-zinc-500 mt-1 font-mono">{data.author}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className={`text-sm font-semibold px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${data.priceType === 'Free' ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-700 dark:text-zinc-200'}`}>
               {data.priceType === 'Free' ? 'Free' : data.price}
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-500 dark:text-amber-400 font-medium">
              <Star size={12} fill="currentColor" />
              <span>{data.rating}</span>
            </div>
          </div>
        </div>

        {/* Body: Description */}
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {data.description}
        </p>

        {/* Footer: Tech Stack & Meta */}
        <div className="mt-auto space-y-4">
          
          {/* Tags / AI Ready */}
          <div className="flex flex-wrap gap-2">
            {data.aiReady && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                <Zap size={10} /> AI Ready
              </span>
            )}
            {data.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-md text-[10px] font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800/50"></div>

          {/* Tech Stack Row */}
          <div className="flex items-center justify-between text-xs text-zinc-500">
             <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" title="Framework/Platform">
                   {/* Render correct icon based on framework string */}
                   {getFrameworkIcon(frameworkLabel, "w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors")}
                   <span>{frameworkLabel}</span>
                </div>
                {data.database && (
                  <div className="flex items-center gap-1.5" title="Database">
                    <Database size={14} className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors" />
                    <span>{data.database}</span>
                  </div>
                )}
             </div>
             
             <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                <ArrowRight size={16} className="text-zinc-400 dark:text-zinc-300" />
             </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default BoilerplateCard;
