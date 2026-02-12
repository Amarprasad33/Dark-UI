import React from 'react';
import { FadeIn } from './fade-in';
import { Zap, Moon, Layout, Eye, Layers, Code2 } from 'lucide-react';

const features = [
  {
    icon: Moon,
    title: "Dark Mode Native",
    description: "Built from the ground up for dark interfaces. No more inverting colors or fighting default light themes."
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Zero runtime overhead styling. Components are optimized for 60fps animations even on mobile devices."
  },
  {
    icon: Layout,
    title: "Accessible",
    description: "WCAG 2.1 compliant contrast ratios and keyboard navigation support out of the box."
  },
  {
    icon: Eye,
    title: "Premium Aesthetics",
    description: "Subtle gradients, perfect blurs, and glassmorphism effects designed for modern SaaS products."
  },
  {
    icon: Layers,
    title: "Composition Ready",
    description: "Atomic components that compose beautifully. Build complex dashboards in minutes, not days."
  },
  {
    icon: Code2,
    title: "Developer Experience",
    description: "Fully typed with TypeScript. Comprehensive JSDoc comments and intuitive prop names."
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 lg:px-12 bg-surfaceHighlight/30 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-2xl mx-auto">
           <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Designed for the Dark</h2>
            <p className="text-muted-foreground text-lg">
              Dark-UI isn't just a skin. It's a complete design system for building sophisticated, dark-themed web applications.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="h-full">
              <div className="h-full p-8 rounded-2xl bg-surface border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};