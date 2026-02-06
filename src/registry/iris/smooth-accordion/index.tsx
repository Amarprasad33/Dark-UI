"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { memo, useMemo, useState } from "react";

// ============================================================================
// Hoisted SVG Icons - Static, never re-created on render
// ============================================================================

const ChevronDownIcon = memo(function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
});
ChevronDownIcon.displayName = "ChevronDownIcon";

// ============================================================================
// Type Definitions
// ============================================================================

export interface AccordionItem {
  /** The label/question text for the accordion item */
  label: string;
  /** The content/answer text for the accordion item */
  data: string;
}

// ============================================================================
// Main Component
// ============================================================================

export interface SmoothAccordionProps {
  /** Custom class name for the container */
  className?: string;
  /** Array of accordion items to display */
  items?: AccordionItem[];
}

export default function SmoothAccordion({
  className,
  items,
}: SmoothAccordionProps) {
  const [expandIndex, setExpandIndex] = useState<number | null>(null);

  const acData = useMemo<AccordionItem[]>(() => {
    return (
      items ?? [
        {
          label: "Why do design engineers love coffee?",
          data: "Because every great idea needs a little JavaScript... and a LOT of actual java!",
        },
        {
          label: "What's a design engineer's favorite party trick?",
          data: "Turning 'just one small change' into a full product redesign—complete with animated mood lighting.",
        },
        {
          label: "How do design engineers fix a bug?",
          data: "With creativity, caffeine, and occasionally… duct tape (metaphorically, of course).",
        },
        {
          label: "Biggest design engineering secret?",
          data: "When in doubt, add more whitespace. If that fails, animate something and say it's 'intentional'!",
        },
      ]
    );
  }, [items]);

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col gap-8 items-center justify-center",
        className,
      )}
    >
      <div className="flex flex-col rounded-3xl min-w-[25rem]">
        {acData.map((obj, i: number) => {
          return (
            <motion.div
              key={i}
              layout
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(
                "py-4 px-5 bg-[#151515] text-zinc-200 border-x border-zinc-800 cursor-pointer select-none transition-all duration-300 ease-out",
                i === 0 && "rounded-t-2xl border-t",
                i !== acData.length - 1 && "border-b border-zinc-800",
                i === acData.length - 1 && "rounded-b-2xl",
                expandIndex != null && i === expandIndex - 1 && "rounded-b-2xl",
                expandIndex != null && i === expandIndex + 1 && "rounded-t-2xl",
                i === expandIndex && "rounded-2xl my-3",
              )}
              onClick={() => setExpandIndex((prev) => (prev === i ? null : i))}
            >
              <div className="flex gap-3 justify-between">
                <div>{obj.label}</div>
                <motion.div
                  animate={{
                    rotate: i === expandIndex ? 180 : 0,
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 0.3,
                  }}
                >
                  <ChevronDownIcon />
                </motion.div>
              </div>
              <AnimatePresence mode="wait">
                {expandIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, filter: "blur(6px)", height: 0 }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                      height: "auto",
                    }}
                    exit={{ opacity: 0, filter: "blur(6px)", height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="max-w-[18rem] text-sm text-zinc-500 overflow-hidden"
                    style={{ willChange: "filter, opacity" }}
                  >
                    <div className="pt-1 pb-1">{obj.data}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

SmoothAccordion.displayName = "SmoothAccordion";

// Named exports for composition and tree-shaking
export { ChevronDownIcon };
