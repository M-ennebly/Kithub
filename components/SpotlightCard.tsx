import React, { useRef, forwardRef } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: React.ElementType;
  [key: string]: any;
}

const SpotlightCard = forwardRef<HTMLElement, SpotlightCardProps>(({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(139, 92, 246, 0.15)', // Default to primary purple glow
  as: Component = 'div',
  ...props
}, ref) => {
  const localRef = useRef<HTMLElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = localRef.current;
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    el.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <Component
      ref={(node: HTMLElement) => {
         localRef.current = node;
         if (typeof ref === 'function') ref(node);
         else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default SpotlightCard;