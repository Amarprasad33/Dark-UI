"use client";

import { notFound } from "next/navigation";
import { use } from "react";

import DraggableCards from "@/registry/iris/draggable-cards";
import FlashlightTabs from "@/registry/iris/flashlight-tabs";
import GooeyMenu from "@/registry/iris/gooey-menu";
import LampCard from "@/registry/iris/lamp-card";
import LuminatedCheckbox from "@/registry/iris/luminated-checkbox";
import MagneticFilings from "@/registry/iris/magnetic-filings";
import MultiFollowCursor from "@/registry/iris/multi-follow-cursor";
import SmoothAccordion from "@/registry/iris/smooth-accordion";
import TextMorphButton from "@/registry/iris/text-morph-button";
import TubelightAccordion from "@/registry/iris/tubelight-accordion";
import InclusionTabs from "@/registry/iris/inclusion-tabs";

// ============================================================================
// Component Registry
// ============================================================================

const componentMap: Record<
  string,
  { component: React.ComponentType; title: string }
> = {
  "draggable-cards": {
    component: DraggableCards,
    title: "Draggable Cards",
  },
  "flashlight-tabs": {
    component: FlashlightTabs,
    title: "Flashlight Tabs",
  },
  "gooey-menu": {
    component: GooeyMenu,
    title: "Gooey Menu",
  },
  "lamp-card": {
    component: LampCard,
    title: "Lamp Card",
  },
  "luminated-checkbox": {
    component: LuminatedCheckbox,
    title: "Luminated Checkbox",
  },
  "magnetic-filings": {
    component: MagneticFilings,
    title: "Magnetic Filings",
  },
  "multi-follow-cursor": {
    component: MultiFollowCursor,
    title: "Multi Follow Cursor",
  },
  "smooth-accordion": {
    component: SmoothAccordion,
    title: "Smooth Accordion",
  },
  "text-morph-button": {
    component: TextMorphButton,
    title: "Text Morph Button",
  },
  "tubelight-accordion": {
    component: TubelightAccordion,
    title: "Tubelight Accordion",
  },
  "inclusion-tabs": {
    component: InclusionTabs,
    title: "Inclusion Tabs",
  },
};

// =============================================================
// Page Component
// ============================================================================

export default function ShowcasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const entry = componentMap[slug];

  if (!entry) {
    notFound();
  }

  const Component = entry.component;

  return (
    <div className="min-h-screen relative h-screen bg-black flex justify-center items-center m-2 md:m-0">
      <div className="relative w-full md:w-[70%] h-full md:h-[80%] border border-zinc-700 text-white border-dashed flex flex-col items-center justify-center">
        <CornerDecor />
        <Component />
        <div className="text-zinc-400 text-base absolute bottom-4 mx-auto sm:hidden">
          **Its still in development, please view on a bigger screen for better
          experience**
        </div>
      </div>
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
