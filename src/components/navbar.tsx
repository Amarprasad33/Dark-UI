"use client";

import { Logo } from '@/components/landing/logo';
import { motion } from 'motion/react';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-4 lg:px-12 backdrop-blur-sm border-b border-white/5 bg-background/50"
    >
      <div className="flex items-center gap-3">
        <Logo className="text-white" width={24} height={32} />
        <span className="font-bold text-lg tracking-tight text-white">Dark-UI</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <a href="#features" className="hover:text-white transition-colors">Components</a>
        <a href="#vision" className="hover:text-white transition-colors">Vision</a>
        <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
      </div>

      <div className="flex items-center gap-4">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          className="text-muted-foreground hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 1.19 6.44 1.54A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <button className="hidden sm:block px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-white text-black rounded-sm hover:bg-neutral-200 transition-colors">
          Get Started
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;