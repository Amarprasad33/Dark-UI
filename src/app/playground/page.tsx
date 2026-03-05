"use client";

import DraggableCards from "@/registry/iris/draggable-cards";
import TubelightAccordion from "@/registry/iris/tubelight-accordion";
import VerticalNav from "@/components/archive/vertical-nav";
import LampCard from "@/registry/iris/lamp-card";
import TextMorphButton from "@/registry/iris/text-morph-button";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

export default function Playground() {
  return (
    <div className="min-h-screen h-screen bg-black flex justify-center items-center">
      <div className="relative w-[70%] h-[80%] border border-zinc-700 text-white border-dashed flex flex-col items-center justify-center">
        {/* <DraggableCards /> */}
        <CornerDecor />
        {/* <VerticalNav /> */}
        {/* <TextMorphButton /> */}
        {/* <LampCard /> */}
        {/* <TubelightAccordion /> */}
        <InclusionTabs />
        <div className="text-zinc-400 text-base absolute bottom-4 mx-auto sm:hidden">
          **Its still in development, please view on a bigger screen for better
          experience**
        </div>
      </div>
    </div>
  );
}



const TABS = ["Overview", "Components", "Playground", "Docs", "Changelog"];

// Spring config for the pill travel
const SPRING_CONFIG = { stiffness: 400, damping: 30 };

export function InclusionTabs() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Whether the pill has been positioned at least once (prevents flying from 0,0)
  const initialized = useRef(false);

  // Raw motion values for the pill geometry
  const pillX = useMotionValue(0);
  const pillWidth = useMotionValue(0);
  // Opacity is instant — no spring needed, just a direct motion value
  const pillOpacity = useMotionValue(0);

  // Spring-ify x and width so travel between tabs is smooth
  const springX = useSpring(pillX, SPRING_CONFIG);
  const springWidth = useSpring(pillWidth, SPRING_CONFIG);
  const springOpacity = useSpring(pillOpacity, SPRING_CONFIG);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = e.currentTarget.getBoundingClientRect();

    const nextX = btnRect.left - containerRect.left;
    const nextWidth = btnRect.width;

    if (!initialized.current) {
      // First hover: snap pill into place so it doesn't fly in from (0, 0)
      pillX.jump(nextX);
      pillWidth.jump(nextWidth);
      initialized.current = true;
    } else {
      // Subsequent hovers: spring travels from previous position
      pillX.set(nextX);
      pillWidth.set(nextWidth);
    }

    pillOpacity.set(1);
  };

  const handleMouseLeave = () => {
    // Fade out only — pill stays at its last x/width so next enter springs from there
    pillOpacity.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-1 p-1"
      onMouseLeave={handleMouseLeave}
    >
      {/* Single persistent pill — never mounts/unmounts, position driven by motion values */}
      <motion.div
        aria-hidden
        className="absolute top-1 bottom-1 rounded-lg bg-zinc-700/70 pointer-events-none"
        style={{
          x: springX,
          width: springWidth,
          opacity: springOpacity,
        }}
      />

      {TABS.map((tab) => (
        <button
          key={tab}
          onMouseEnter={handleMouseEnter}
          className="relative z-10 px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-150"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}




const CornerDecor = () => (
  <>
    <div className="corner-group absolute -top-[1px] -left-[1px] flex size-4 h-fit w-fit flex-col z-10">
      <span className="h-px w-1 translate-x-[1px] bg-[#262626] dark:bg-white" />
      <span className="h-1 w-px bg-[#262626] dark:bg-white" />
    </div>
    <div className="corner-group absolute -top-[1px] -right-1 flex size-4 h-fit w-fit flex-col z-10">
      <span className="h-px w-1 -translate-x-[4px] bg-[#262626] dark:bg-white" />
      <span className="h-1 w-px bg-[#262626] dark:bg-white" />
    </div>
    <div className="corner-group absolute -bottom-[1px] -left-[1px] flex size-4 h-fit w-fit flex-col z-10">
      <span className="h-1 w-px bg-[#262626] dark:bg-white" />
      <span className="h-px w-1 translate-x-[1px] bg-[#262626] dark:bg-white" />
    </div>
    <div className="corner-group absolute -right-1 -bottom-[1px] flex size-4 h-fit w-fit flex-col z-10">
      <span className="h-1 w-px bg-[#262626] dark:bg-white" />
      <span className="h-px w-1 -translate-x-[4px] bg-[#262626] dark:bg-white" />
    </div>
  </>
);
