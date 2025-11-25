
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Compass, Github, Twitter, Layers, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import PillNav from './PillNav';
import { Link } from 'react-router-dom';
import AnimatedThemeToggle from './AnimatedThemeToggle';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Define colors based on theme
  const navConfig = theme === 'dark' 
    ? {
        baseColor: '#27272a', // zinc-800
        pillColor: '#8b5cf6', // Purple 500
        pillTextColor: '#ffffff',
        hoveredPillTextColor: '#ffffff'
      }
    : {
        baseColor: '#f4f4f5', // zinc-100
        pillColor: '#8b5cf6', // Purple 500
        pillTextColor: '#000000',
        hoveredPillTextColor: '#ffffff'
      };

  // SVG Data URI for the new pixel icon to pass to PillNav
  const logoColor = '#8b5cf6'; // Purple
  // Using the provided pixel icon, replacing currentColor with the theme color for the img src
  const logoSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12"><path fill="${logoColor}" d="M3 12h5v-1h2V9h1V4h-1V2H8V1H3v1H1v2H0v5h1v2h2Zm0-3V7h1V5h2V4h2v2H7v2H5v1Zm2-2h1V6H5Zm0 0"/></svg>`;
  const logoSvg = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvgString)}`;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-zinc-900 dark:text-zinc-300 selection:bg-primary/30 selection:text-white transition-colors duration-300">
      
      {/* Pill Navigation */}
      <PillNav
        logo={logoSvg}
        logoAlt="Boilerplate Atlas"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Boilerplates', href: '/boilerplates' },
          { label: 'Automations', href: '/automations' },
          { label: 'Blog', href: '/blog' },
          { label: 'Login', href: '/login' },
          { label: 'Submit', href: '#' }
        ]}
        activeHref={location.pathname}
        baseColor={navConfig.baseColor}
        pillColor={navConfig.pillColor}
        pillTextColor={navConfig.pillTextColor}
        hoveredPillTextColor={navConfig.hoveredPillTextColor}
        mobileAccessory={<AnimatedThemeToggle />}
      />

      {/* Theme Toggle - Absolute positioned top right, hidden on mobile */}
      <div className="fixed top-6 right-6 z-50 hidden md:block">
        <AnimatedThemeToggle />
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-24 md:pt-32">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/50 mt-32 bg-white dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1 space-y-6">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700">
                   <div className="w-5 h-5 flex items-center justify-center">
                     <img src={logoSvg} alt="Logo" className="w-full h-full" />
                   </div>
                </div>
                <span className="font-display font-bold text-lg text-zinc-900 dark:text-white">BoilerplateAtlas</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Curating the finest starting points for your next big idea. 
                Built for developers who value quality and speed.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Explore</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link to="/boilerplates" className="hover:text-primary transition-colors">SaaS Starters</Link></li>
                <li><Link to="/automations" className="hover:text-primary transition-colors">Automations</Link></li>
                <li><Link to="/boilerplates?category=Dashboard" className="hover:text-primary transition-colors">Dashboards</Link></li>
                <li><Link to="/boilerplates?category=Mobile" className="hover:text-primary transition-colors">Mobile Kits</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link to="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Submit Tool</Link></li>
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Socials</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                  <Github size={18} />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                  <Layers size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-200 dark:border-zinc-800/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 dark:text-zinc-600">
            <p>&copy; 2024 Boilerplate Atlas Inc.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-400">Privacy</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-400">Terms</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-400">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
