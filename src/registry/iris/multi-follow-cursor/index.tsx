"use client";

import { cn } from "@/lib/utils";
import { motion, MotionValue, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

// ============================================================================
// Types
// ============================================================================

export interface MultiFollowCursorProps {
  /** Custom class name for the container */
  className?: string;
  /** Content to be rendered inside the cursor area */
  children?: React.ReactNode;
}

export interface CursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isTextHover: MotionValue<number>;
}

// ============================================================================
// Cursor Sub-component
// ============================================================================

export function Cursor({ containerRef, isTextHover }: CursorProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Snappy: { stiffness: 800, damping: 60, mass: 0.3 }
  // Smooth: { stiffness: 300, damping: 40, mass: 0.8 }
  // Bouncy: { stiffness: 400, damping: 20, mass: 0.5 }
  // Lazy: { stiffness: 100, damping: 25, mass: 1.5 }
  // Responsive: { stiffness: 600, damping: 50, mass: 0.4 }

  const springX = useSpring(mouseX, { stiffness: 260, damping: 40, mass: 1.2 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 40, mass: 1.2 });
  const midSpringX = useSpring(mouseX, {
    stiffness: 300,
    damping: 35,
    mass: 0.5,
  });
  const midSpringY = useSpring(mouseY, {
    stiffness: 300,
    damping: 35,
    mass: 0.5,
  });
  const innerSpringX = useSpring(mouseX, {
    stiffness: 700,
    damping: 60,
    mass: 0.6,
  });
  const innerSpringY = useSpring(mouseY, {
    stiffness: 700,
    damping: 60,
    mass: 0.6,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [containerRef, mouseX, mouseY]);

  return (
    <div className="flex items-center justify-center">
      <div className="text-white text-2xl">Does your cursor follow you?</div>
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#f5f5f5",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <motion.div
        className="border-2 border-pink-500"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <motion.div
        className="border-2 border-cyan-400"
        style={{
          x: innerSpringX,
          y: innerSpringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <motion.div
        className="border-2 border-blue-600"
        style={{
          x: midSpringX,
          y: midSpringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </div>
  );
}
Cursor.displayName = "Cursor";

// ============================================================================
// Main Component
// ============================================================================

export default function MultiFollowCursor({
  className,
  children,
}: MultiFollowCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textHover = useMotionValue(0);

  return (
    <div
      className={cn(
        "relative w-full h-full flex justify-center items-center overflow-hidden cursor-none",
        className,
      )}
      ref={containerRef}
    >
      {children}
      <Cursor containerRef={containerRef} isTextHover={textHover} />
    </div>
  );
}
MultiFollowCursor.displayName = "MultiFollowCursor";
