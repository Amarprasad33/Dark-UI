import React from 'react';
import { Logo } from './logo';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-white/10 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <Logo width={20} height={26} className="text-white opacity-80" />
          <span className="text-sm font-medium text-neutral-400">© 2024 Dark-UI Inc.</span>
        </div>
        
        <div className="flex gap-8 text-sm text-neutral-500">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};