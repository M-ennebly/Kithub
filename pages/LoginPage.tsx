import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[80vh] px-4">
       {/* Background Elements */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-30 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-surface border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-8 md:p-10 relative overflow-hidden backdrop-blur-xl">
          {/* Top Highlight Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Sign in to manage your submissions and saved items</p>
          </div>

          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-200 font-medium text-sm group">
              <Chrome size={18} />
              <span>Continue with Google</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-zinc-400" />
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-200 font-medium text-sm group">
              <Github size={18} />
              <span>Continue with Github</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-zinc-400" />
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>
            <span className="relative bg-white dark:bg-surface px-3 text-xs uppercase text-zinc-400 tracking-wider font-medium">Or continue with</span>
          </div>

          <form className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute left-3.5 top-3.5 text-zinc-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-11 pr-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
               <div className="flex justify-between ml-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Password</label>
                  <a href="#" className="text-xs text-primary hover:text-accent transition-colors">Forgot?</a>
               </div>
              <div className="relative">
                <div className="absolute left-3.5 top-3.5 text-zinc-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-11 pr-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200">
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-zinc-500">
            Don't have an account? <Link to="/login" className="text-zinc-900 dark:text-white font-semibold hover:underline">Sign up for free</Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
