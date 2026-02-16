"use client";

import { notFound } from "next/navigation";
import { use } from "react";

import FlashlightTabs from "@/registry/iris/flashlight-tabs";
import LuminatedCheckbox from "@/registry/iris/luminated-checkbox";
import MultiFollowCursor from "@/registry/iris/multi-follow-cursor";
import SmoothAccordion from "@/registry/iris/smooth-accordion";
import TubelightAccordion from "@/registry/iris/tubelight-accordion";
import VerticalNav from "@/registry/iris/vertical-nav";
import GooeyMenu from "@/registry/iris/gooey-menu";

// ============================================================================
// Component Registry
// ============================================================================

const componentMap: Record<
  string,
  { component: React.ComponentType; title: string }
> = {
  "flashlight-tabs": {
    component: FlashlightTabs,
    title: "Flashlight Tabs",
  },
  "luminated-checkbox": {
    component: LuminatedCheckbox,
    title: "Luminated Checkbox",
  },
  "multi-follow-cursor": {
    component: MultiFollowCursor,
    title: "Multi Follow Cursor",
  },
  "smooth-accordion": {
    component: SmoothAccordion,
    title: "Smooth Accordion",
  },
  "tubelight-accordion": {
    component: TubelightAccordion,
    title: "Tubelight Accordion",
  },
  "gooey-menu": {
    component: GooeyMenu,
    title: "Gooey Menu",
  },
  // "vertical-nav": {
  //   component: VerticalNav,
  //   title: "Vertical Nav",
  // },
};

// ============================================================================
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
    <div className="min-h-screen h-screen bg-black flex justify-center items-center relative">
      <div className="relative w-[70%] h-[80%] border border-zinc-700 text-white border-dashed flex flex-col items-center justify-center">
        <Component />
        <div className="text-zinc-400 text-base absolute bottom-4 mx-auto sm:hidden">
          **Its still in development, please view on a bigger screen for better
          experience**
        </div>
      </div>
    </div>
  );
}
