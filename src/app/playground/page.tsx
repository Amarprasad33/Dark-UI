"use client";

import DraggableCards from "@/registry/iris/draggable-cards";
import TubelightAccordion from "@/registry/iris/tubelight-accordion";
import VerticalNav from "@/components/archive/vertical-nav";
import LampCard from "@/registry/iris/lamp-card";
import TextMorphButton from "@/registry/iris/text-morph-button";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

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

export function InclusionTabs() {
  // Which tab is actively hovered right now (null = nothing hovered)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  // Last tab that was hovered — pill stays mounted here so it can spring from this position
  const [lastHoveredTab, setLastHoveredTab] = useState<string | null>(null);

  const handleMouseEnter = (tab: string) => {
    setLastHoveredTab(tab);
    setHoveredTab(tab);
  };

  const handleMouseLeave = () => {
    setHoveredTab(null);
    // lastHoveredTab intentionally NOT cleared — pill stays mounted there
  };

  return (
    <div className="flex items-center gap-1 rounded-full p-1 backdrop-blur-sm">
      {TABS.map((tab) => (
        <button
          key={tab}
          onMouseEnter={() => handleMouseEnter(tab)}
          onMouseLeave={handleMouseLeave}
          className="relative px-4 py-1.5 text-sm font-medium transition-colors duration-150"
          style={{
            color: hoveredTab === tab ? "#fff" : "#a1a1aa",
          }}
        >
          {/*
            Pill is always rendered at lastHoveredTab, never unmounted.
            - opacity 1 when something is hovered, opacity 0 when user leaves
            - layoutId makes Framer spring it to the new tab position on enter
          */}
          <AnimatePresence mode="popLayout">
          {tab === lastHoveredTab && (
            <motion.div
              layoutId="tab-hover-pill"
              className="absolute inset-0 rounded-lg bg-zinc-700/70"
              initial={false}
              animate={{ opacity: hoveredTab ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 50, bounce: 0 }}
            />
          )}
          </AnimatePresence>
          <span className="relative z-10">{tab}</span>
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
