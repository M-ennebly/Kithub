import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Cloud, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CinematicThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative h-9 w-16 rounded-full p-1 transition-colors duration-500 ease-in-out focus:outline-none shadow-inner border overflow-hidden
        ${isDark ? 'bg-[#0f172a] border-zinc-700' : 'bg-sky-200 border-sky-300'}
      `}
      aria-label="Toggle Theme"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Stars for Dark Mode */}
        <motion.div 
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: isDark ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        >
            <Star className="absolute top-1.5 left-2 text-white/60 w-1.5 h-1.5 fill-current" />
            <Star className="absolute bottom-2 left-4 text-white/40 w-1 h-1 fill-current" />
            <Star className="absolute top-3 right-8 text-white/30 w-1 h-1 fill-current" />
        </motion.div>

        {/* Clouds for Light Mode */}
        <motion.div 
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: isDark ? 0 : 1 }}
            transition={{ duration: 0.5 }}
        >
             <Cloud className="absolute top-1.5 right-2 text-white w-3 h-3 fill-white" />
             <Cloud className="absolute bottom-1 right-5 text-white/80 w-2.5 h-2.5 fill-white" />
        </motion.div>
      </div>

      {/* Toggle Thumb */}
      <motion.div
        className={`
            relative z-10 h-6 w-6 rounded-full shadow-md flex items-center justify-center
            ${isDark ? 'bg-zinc-800 border border-zinc-600' : 'bg-white border border-white'}
        `}
        animate={{
          x: isDark ? 28 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
            key={isDark ? "dark" : "light"}
            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="absolute"
        >
            {isDark ? (
                <Moon className="w-3.5 h-3.5 text-white fill-white/20" />
            ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            )}
        </motion.div>
      </motion.div>
    </button>
  );
};

export default CinematicThemeToggle;