"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "motion/react";
import { memo, useCallback, useRef } from "react";

// ============================================================================
// Types
// ============================================================================

export interface InclusionTabsProps {
  /** Array of tabs to display */
  items?: string[];
  /** Custom class name for the container */
  className?: string;
  /** Optional callback when a tab is selected */
  onChange?: (tab: string) => void;
}

// ============================================================================
// Hoisted Constants & SVG Icons
// ============================================================================

const DEFAULT_ITEMS = ["Overview", "Docs", "About", "Playground", "Changelog"];

const SPRING_CONFIG = { stiffness: 400, damping: 30 } as const;

// ============================================================================
// Main Component
// ============================================================================

export default function InclusionTabs({
  items = DEFAULT_ITEMS,
  className,
  onChange,
}: InclusionTabsProps) {
  const isMobile = useIsMobile();

  items = isMobile ? DEFAULT_ITEMS.slice(0, 3) : DEFAULT_ITEMS;
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const pillX = useMotionValue(0);
  const pillWidth = useMotionValue(0);
  const pillOpacity = useMotionValue(0);

  const springX = useSpring(pillX, SPRING_CONFIG);
  const springWidth = useSpring(pillWidth, SPRING_CONFIG);
  const springOpacity = useSpring(pillOpacity, SPRING_CONFIG);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const btnRect = e.currentTarget.getBoundingClientRect();

      const nextX = btnRect.left - containerRect.left;
      const nextWidth = btnRect.width;

      if (!initialized.current) {
        pillX.jump(nextX);
        pillWidth.jump(nextWidth);
        initialized.current = true;
      } else {
        pillX.set(nextX);
        pillWidth.set(nextWidth);
      }

      pillOpacity.set(1);
    },
    [pillX, pillWidth, pillOpacity],
  );

  const handleMouseLeave = useCallback(() => {
    pillOpacity.set(0);
  }, [pillOpacity]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center gap-1 p-1 flex-wrap",
        className,
      )}
      onMouseLeave={handleMouseLeave}
      role="tablist"
      aria-label="Inclusion Tabs"
    >
      <motion.div
        aria-hidden="true"
        className="absolute top-1 bottom-1 rounded-lg bg-zinc-700/70 pointer-events-none"
        style={{
          x: springX,
          width: springWidth,
          opacity: springOpacity,
        }}
      />

      {items.map((tab) => (
        <button
          key={tab}
          role="tab"
          onMouseEnter={handleMouseEnter}
          onFocus={handleMouseEnter as any}
          onBlur={handleMouseLeave}
          onClick={() => onChange?.(tab)}
          className="relative z-10 px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-md"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

InclusionTabs.displayName = "InclusionTabs";

// Named exports for composition and tree-shaking
export { DEFAULT_ITEMS, SPRING_CONFIG };
