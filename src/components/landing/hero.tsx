"use client";

import React from "react";
import { FadeIn } from "./fade-in";
import { ChevronRight } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-32 px-6 lg:px-12 z-10 overflow-hidden text-center">
      <FadeIn>
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground mb-8 hover:bg-white/10 transition-colors cursor-pointer">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
          Introducing Magnetic Fill
          <ChevronRight className="w-3 h-3 ml-1 opacity-50" />
        </div>
      </FadeIn>

      <FadeIn delay={0.1} className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-6xl font-semibold tracking-tight leading-[110%] text-white mb-6">
          Beautiful components for those obsessed with dark mode
        </h1>
      </FadeIn>

      <FadeIn delay={0.2} className="max-w-xl mx-auto">
        <p className="text-base font-normal text-muted-foreground leading-relaxed mb-10">
          10+ premium animated components built with React, TypeScript, Tailwind
          CSS, and Motion.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="h-10 px-6 bg-white text-black font-medium text-sm rounded-md hover:bg-neutral-200 transition-colors">
            Browse Components
          </button>
          <button className="h-10 px-6 bg-transparent border border-neutral-700 text-white font-medium text-sm rounded-md hover:bg-white/5 transition-colors">
            Get all access
          </button>
        </div>
      </FadeIn>
    </section>
  );
};
