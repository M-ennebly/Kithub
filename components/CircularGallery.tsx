import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue
} from 'framer-motion';
import BoilerplateCard from './BoilerplateCard';
import { Boilerplate } from '../types';

interface CircularGalleryProps {
  items: Boilerplate[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({ 
  items, 
  bend = 200 // Pixel value for the 'sag' of the arch
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  // Animation State
  const scrollPosRef = useRef(0);
  const scrollVelRef = useRef(0);
  const lastTimeRef = useRef(0);
  
  // Interaction State
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  // Framer Motion hooks for page scroll reactivity
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Configuration
  const CARD_WIDTH = 340; // Card width + gap
  const VISIBLE_WIDTH = typeof window !== 'undefined' ? window.innerWidth : 1200;
  
  // We duplicate items to create an infinite loop effect
  // Ensure we have enough items to cover the screen plus buffers
  const minItems = Math.ceil(VISIBLE_WIDTH / CARD_WIDTH) + 2;
  const repeatCount = Math.ceil(minItems / items.length) * 2; 
  const displayItems = Array(Math.max(repeatCount, 4)).fill(items).flat();

  useEffect(() => {
    let animationFrameId: number;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // 1. Calculate Scroll Movement
      // Base auto-scroll speed (very slow)
      let moveAmount = -0.5; // Pixels per frame (negative for left)

      // Add Page Scroll Velocity influence (accelerate when scrolling down)
      const pageVel = smoothVelocity.get();
      // Only influence if significant
      if (Math.abs(pageVel) > 5) {
        moveAmount += pageVel * 0.05; // reduced influence factor
      }

      // Add Dragging/Inertia if we implemented complex drag (skipping for simplicity/cleanliness)
      
      if (!isDragging.current) {
        scrollPosRef.current += moveAmount;
      }

      // 2. Wrap Scroll Position (Infinite Loop)
      const totalWidth = displayItems.length * CARD_WIDTH;
      if (scrollPosRef.current <= -totalWidth / 2) {
        scrollPosRef.current += totalWidth / 2;
      } else if (scrollPosRef.current > 0) {
        scrollPosRef.current -= totalWidth / 2;
      }

      // 3. Update Card Transforms (The "Bend" Math)
      if (containerRef.current) {
        const containerCenter = containerRef.current.clientWidth / 2;
        // Radius of the arch based on bend amount
        // R = (W^2 + B^2) / 2B where W is half-width
        // But for visual simplicity, we can just use a large radius relative to screen
        // Using the user's OGL logic adapted for pixels:
        // Assume half-width of interaction area is ~600px
        const H = 800; 
        const B_abs = Math.abs(bend);
        const R = (H * H + B_abs * B_abs) / (2 * B_abs);

        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          // Calculate absolute X position of this card including scroll
          const cardBaseX = index * CARD_WIDTH;
          const currentX = cardBaseX + scrollPosRef.current;
          
          // Position relative to center of screen
          const cardCenter = currentX + CARD_WIDTH / 2;
          const distFromCenter = cardCenter - containerCenter;

          // Only compute transform if visible (optimization)
          if (cardCenter < -CARD_WIDTH || cardCenter > containerRef.current!.clientWidth + CARD_WIDTH) {
             card.style.display = 'none';
             return;
          }
          card.style.display = 'block';

          // --- The BEND Math ---
          // effectiveX is constrained distance
          const effectiveX = Math.min(Math.abs(distFromCenter), H);
          
          // Calculate the Y-drop (sag) on the curve
          // Circle equation: x^2 + y^2 = R^2  => y = sqrt(R^2 - x^2)
          // We want the peak at y=0, so y = R - sqrt(R^2 - x^2)
          let arcY = R - Math.sqrt(R * R - effectiveX * effectiveX);
          
          // Apply direction of bend
          const y = bend > 0 ? arcY : -arcY;

          // Calculate Rotation
          // angle = asin(x / R)
          const angle = Math.asin(effectiveX / R) * (distFromCenter > 0 ? -1 : 1);
          
          // Convert to CSS
          // We use translate3d for GPU acceleration
          card.style.transform = `translate3d(${currentX}px, ${y}px, 0) rotate(${angle}rad)`;
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [bend, smoothVelocity, displayItems.length]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] overflow-hidden cursor-grab active:cursor-grabbing touch-none"
      onMouseDown={(e) => {
        isDragging.current = true;
        startX.current = e.pageX;
        startScroll.current = scrollPosRef.current;
      }}
      onMouseMove={(e) => {
        if (!isDragging.current) return;
        const diff = e.pageX - startX.current;
        scrollPosRef.current = startScroll.current + diff;
      }}
      onMouseUp={() => { isDragging.current = false; }}
      onMouseLeave={() => { isDragging.current = false; }}
    >
      <div className="absolute top-10 left-0 w-full h-full">
        {displayItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            // Fix: Ref callback should return void, not the element
            ref={(el) => { cardsRef.current[index] = el; }}
            className="absolute top-0 left-0 w-[320px] will-change-transform"
            style={{ 
                // Initial placement off-screen before JS kicks in
                transform: `translateX(${index * CARD_WIDTH}px)`
            }}
          >
            <div className="transform scale-90 hover:scale-100 transition-transform duration-300">
               {/* Pass featured=false to keep it looking like a standard card, or true for badge */}
               <BoilerplateCard data={item} featured={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularGallery;