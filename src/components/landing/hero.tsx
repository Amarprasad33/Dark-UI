"use client";

import React from 'react';
import { FadeIn } from './fade-in';
import { ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 lg:px-12 z-10 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col gap-8">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              v1.0.0 Public Beta is Live
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">Dark Side</span> of UI Design.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Highly animated, visually stunning components optimized for dark mode. 
              Built for Next.js and Framer Motion. Zero compromise on performance.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center gap-4">
              <button className="group h-12 px-6 bg-white text-black font-semibold rounded-md flex items-center gap-2 hover:bg-neutral-200 transition-all">
                Start Building
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="h-12 px-6 bg-transparent border border-neutral-700 text-white font-medium rounded-md hover:border-white transition-colors">
                View Components
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="flex items-center gap-8 mt-4 pt-8 border-t border-white/5">
            <div>
              <p className="text-2xl font-bold text-white">12kb</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Gzipped</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">60+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Components</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Typescript</p>
            </div>
          </FadeIn>
        </div>

        {/* Right Code/Visual */}
        <div className="relative hidden lg:block">
           <FadeIn delay={0.3}>
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-surface shadow-2xl shadow-black/50">
                {/* Mock Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="ml-4 text-xs text-neutral-500 font-mono">App.tsx</div>
                </div>

                {/* Mock Code */}
                <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                  <div className="text-neutral-500 mb-4 select-none">
                    // Import components
                  </div>
                  <div className="space-y-1">
                    <p><span className="text-purple-400">import</span> <span className="text-yellow-100">{`{ Button, Card }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@dark-ui/react'</span>;</p>
                    <p><span className="text-purple-400">import</span> <span className="text-yellow-100">{`{ motion }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'framer-motion'</span>;</p>
                    <br />
                    <p><span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-200">Dashboard</span>() {`{`}</p>
                    <p className="pl-4"><span className="text-purple-400">return</span> (</p>
                    <p className="pl-8"><span className="text-blue-300">&lt;Card</span> <span className="text-blue-200">variant</span>=<span className="text-green-400">"glass"</span><span className="text-blue-300">&gt;</span></p>
                     <p className="pl-12"><span className="text-blue-300">&lt;motion.div</span></p>
                     <p className="pl-16"><span className="text-blue-200">initial</span>={ `{ opacity: 0 }` }</p>
                     <p className="pl-16"><span className="text-blue-200">animate</span>={ `{ opacity: 1 }` }</p>
                     <p className="pl-12"><span className="text-blue-300">/&gt;</span></p>
                    <p className="pl-12"><span className="text-blue-300">&lt;Button&gt;</span>Deploy Project<span className="text-blue-300">&lt;/Button&gt;</span></p>
                    <p className="pl-8"><span className="text-blue-300">&lt;/Card&gt;</span></p>
                    <p className="pl-4">);</p>
                    <p>{`}`}</p>
                  </div>
                </div>

                {/* Decorational glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
              </div>
           </FadeIn>
        </div>

      </div>
    </section>
  );
};