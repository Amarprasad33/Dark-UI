"use client";

import { memo, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface FilingProps {
  /** X position of the filing within the card */
  x: number;
  /** Y position of the filing within the card */
  y: number;
  /** Spring-smoothed mouse X motion value */
  mx: MotionValue<number>;
  /** Spring-smoothed mouse Y motion value */
  my: MotionValue<number>;
  /** Spring-smoothed hover state (0 = idle, 1 = hovered) */
  hover: MotionValue<number>;
}

export interface MagneticFilingsProps {
  /** Custom class name for the outer wrapper */
  className?: string;
  /** Card title text shown in the overlay */
  title?: string;
  /** Card description text shown in the overlay */
  description?: string;
}

// ============================================================================
// Hoisted Constants
// ============================================================================

const GRID_SIZE = 20 as const;
const CARD_WIDTH = 400 as const;
const CARD_HEIGHT = 400 as const;

export const SPRING_CONFIG = {
  stiffness: 250,
  damping: 29,
  mass: 0.6,
} as const;

export const HOVER_SPRING_CONFIG = {
  stiffness: 200,
  damping: 24,
  mass: 0.6,
} as const;

// ============================================================================
// Sub-components
// ============================================================================

const Filing = memo(function Filing({ x, y, mx, my, hover }: FilingProps) {
  const angle = useTransform([mx, my], ([mxVal, myVal]: number[]) =>
    Math.atan2(myVal - y, mxVal - x),
  );
  const rotate = useTransform(
    [angle, hover],
    ([a, h]: number[]) => `${a * h}rad`,
  );

  return (
    <motion.div
      className="absolute w-3 h-[1px] bg-white origin-left rounded-sm will-change-transform"
      style={{ left: x - 6, top: y - 1, rotate }}
    />
  );
});
Filing.displayName = "Filing";

// ============================================================================
// Main Component
// ============================================================================

export default function MagneticFilings({
  className,
  title = "Developers",
  description = "Debugging logic is easy, debugging vibes is harder",
}: MagneticFilingsProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Generate grid of filing positions — memoized, no deps that change
  const filings = useMemo(() => {
    const arr: Array<{ x: number; y: number }> = [];
    for (let x = GRID_SIZE; x < CARD_WIDTH; x += GRID_SIZE) {
      for (let y = GRID_SIZE; y < CARD_HEIGHT; y += GRID_SIZE) {
        arr.push({ x, y });
      }
    }
    return arr;
  }, []);

  // Shared motion values for pointer position
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxSpring = useSpring(mx, SPRING_CONFIG);
  const mySpring = useSpring(my, SPRING_CONFIG);
  const hoverMV = useMotionValue<number>(0);
  const hoverSpring = useSpring(hoverMV, HOVER_SPRING_CONFIG);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mx.set(e.clientX - rect.left);
      my.set(e.clientY - rect.top);
    },
    [mx, my],
  );

  const handlePointerEnter = useCallback(() => {
    hoverMV.set(1);
  }, [hoverMV]);

  const handlePointerLeave = useCallback(() => {
    hoverMV.set(0);
  }, [hoverMV]);

  return (
    <div
      className={cn(
        "bg-transparent p-8 flex items-center justify-center",
        className,
      )}
    >
      <div className="w-fit p-0 bg-black border border-dashed rounded-[0px] border-zinc-800">
        <div
          ref={cardRef}
          className="relative w-[400px] h-[400px] bg-black rounded-[0px]"
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          {filings.map((p, i) => (
            <Filing
              key={i}
              x={p.x}
              y={p.y}
              mx={mxSpring}
              my={mySpring}
              hover={hoverSpring}
            />
          ))}

          {/* Corner markers */}
          <div className="absolute -top-[1px] -left-[1px] w-[10px] h-[10px] border-t border-l border-zinc-500 z-10" />
          <div className="absolute -top-[1px] -right-[1px] w-[10px] h-[10px] border-t border-r border-zinc-500 z-10" />
          <div className="absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] border-b border-r border-zinc-500 z-10" />
          <div className="absolute -bottom-[1px] -left-[1px] w-[10px] h-[10px] border-b border-l border-zinc-500 z-10" />

          {/* Info overlay */}
          <div className="border-none h-[8rem] bg-zinc-800/20 backdrop-blur-[4px] w-full absolute bottom-0 text-white">
            <div className="mt-2 ml-3 text-lg font-medium text-zinc-400">
              {title}
            </div>
            <div className="mt-3 ml-3 text-sm font-normal text-zinc-100">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MagneticFilings.displayName = "MagneticFilings";

// Named exports for composition and tree-shaking
export { Filing, GRID_SIZE, CARD_WIDTH, CARD_HEIGHT };
