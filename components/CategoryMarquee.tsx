import React from 'react';

const CATEGORIES_ROW_1 = [
  "SaaS", "AI Agents", "Dashboards", "E-commerce", "Mobile Apps", 
  "Landing Pages", "Crypto", "Dev Tools", "Marketing", "SEO",
  "Generative AI", "Vector DB", "RAG"
];

const CATEGORIES_ROW_2 = [
  "Databases", "Authentication", "Payments", "CMS", "Analytics",
  "Email Marketing", "Web3", "No-Code", "Automation", "CRM", 
  "ERP", "Fintech", "Microservices"
];

const MarqueeRow = ({ items, direction = 'left' }: { items: string[], direction?: 'left' | 'right' }) => {
  return (
    <div className="flex overflow-hidden group py-4">
       {/* Inner container for animation */}
       <div 
         className={`flex gap-4 md:gap-6 pr-4 md:pr-6 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'} group-hover:[animation-play-state:paused]`}
       >
          {/* Quadrupled items for seamless infinite loop */}
          {[...items, ...items, ...items, ...items].map((item, i) => (
             <div 
               key={i} 
               className="flex-shrink-0 px-8 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md 
               text-sm md:text-base font-display font-bold tracking-tight text-zinc-700 dark:text-zinc-300 whitespace-nowrap transition-all duration-300 cursor-pointer 
               hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-110 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
             >
               {item}
             </div>
          ))}
       </div>
    </div>
  );
};

const CategoryMarquee: React.FC = () => {
  return (
    <div className="w-full relative py-12 border-b border-zinc-200 dark:border-zinc-800/50 bg-background/50 backdrop-blur-sm z-20 overflow-hidden">
       <style>{`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            animation: marquee-left 80s linear infinite;
            width: fit-content;
          }
          .animate-marquee-right {
            animation: marquee-right 80s linear infinite;
            width: fit-content;
          }
       `}</style>
      
      {/* Gradient Masks */}
      <div className="absolute top-0 left-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-background via-background/90 to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-4">
        <MarqueeRow items={CATEGORIES_ROW_1} direction="left" />
        <MarqueeRow items={CATEGORIES_ROW_2} direction="right" />
      </div>
    </div>
  );
};

export default CategoryMarquee;