"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState, memo } from "react";

// ============================================================================
// Hoisted SVG Icons - Static, never re-created on render
// ============================================================================

const PowerOffIcon = memo(function PowerOffIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 8 8"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.6875 4V0.875C3.6875 0.79212 3.72042 0.712634 3.77903 0.654029C3.83763 0.595424 3.91712 0.5625 4 0.5625C4.08288 0.5625 4.16237 0.595424 4.22097 0.654029C4.27958 0.712634 4.3125 0.79212 4.3125 0.875V4C4.3125 4.08288 4.27958 4.16237 4.22097 4.22097C4.16237 4.27958 4.08288 4.3125 4 4.3125C3.91712 4.3125 3.83763 4.27958 3.77903 4.22097C3.72042 4.16237 3.6875 4.08288 3.6875 4ZM6.0457 0.925781C5.9763 0.881915 5.89242 0.867126 5.81219 0.884611C5.73197 0.902096 5.66185 0.950451 5.617 1.01922C5.57214 1.08799 5.55616 1.17165 5.57249 1.25212C5.58883 1.33258 5.63618 1.40338 5.7043 1.44922C6.60703 2.03789 7.125 2.96758 7.125 4C7.125 4.8288 6.79576 5.62366 6.20971 6.20971C5.62366 6.79576 4.8288 7.125 4 7.125C3.1712 7.125 2.37634 6.79576 1.79029 6.20971C1.20424 5.62366 0.875 4.8288 0.875 4C0.875 2.96758 1.39297 2.03789 2.2957 1.44922C2.36383 1.40338 2.41117 1.33258 2.42751 1.25212C2.44384 1.17165 2.42786 1.08799 2.383 1.01922C2.33815 0.950451 2.26803 0.902096 2.18781 0.884611C2.10758 0.867126 2.0237 0.881915 1.9543 0.925781C0.871094 1.63203 0.25 2.75234 0.25 4C0.25 4.99456 0.645088 5.94839 1.34835 6.65165C2.05161 7.35491 3.00544 7.75 4 7.75C4.99456 7.75 5.94839 7.35491 6.65165 6.65165C7.35491 5.94839 7.75 4.99456 7.75 4C7.75 2.75234 7.12891 1.63203 6.0457 0.925781Z"
        fill="currentColor"
      />
    </svg>
  );
});
PowerOffIcon.displayName = "PowerOffIcon";

const PlusIcon = memo(function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 12 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 6C10.5 6.09946 10.4605 6.19484 10.3902 6.26517C10.3198 6.33549 10.2245 6.375 10.125 6.375H6.375V10.125C6.375 10.2245 6.33549 10.3198 6.26517 10.3902C6.19484 10.4605 6.09946 10.5 6 10.5C5.90054 10.5 5.80516 10.4605 5.73484 10.3902C5.66451 10.3198 5.625 10.2245 5.625 10.125V6.375H1.875C1.77554 6.375 1.68016 6.33549 1.60984 6.26517C1.53951 6.19484 1.5 6.09946 1.5 6C1.5 5.90054 1.53951 5.80516 1.60984 5.73484C1.68016 5.66451 1.77554 5.625 1.875 5.625H5.625V1.875C5.625 1.77554 5.66451 1.68016 5.73484 1.60984C5.80516 1.53951 5.90054 1.5 6 1.5C6.09946 1.5 6.19484 1.53951 6.26517 1.60984C6.33549 1.68016 6.375 1.77554 6.375 1.875V5.625H10.125C10.2245 5.625 10.3198 5.66451 10.3902 5.73484C10.4605 5.80516 10.5 5.90054 10.5 6Z"
        fill="currentColor"
      />
    </svg>
  );
});
PlusIcon.displayName = "PlusIcon";

// ============================================================================
// Tubelight Glow SVG - Hoisted for performance
// ============================================================================

const TubelightGlowSVG = memo(function TubelightGlowSVG() {
  return (
    <svg
      width="569"
      height="358"
      viewBox="0 0 569 358"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_35_5)">
        <path
          d="M147.923 111H339.715L457.264 247H18L147.923 111Z"
          fill="#E8E8E8"
          fillOpacity="0.39"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_35_5"
          x="-92.9885"
          y="0.0114975"
          width="661.241"
          height="357.977"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="55.4943"
            result="effect1_foregroundBlur_35_5"
          />
        </filter>
      </defs>
    </svg>
  );
});
TubelightGlowSVG.displayName = "TubelightGlowSVG";

// ============================================================================
// Reusable Flicker Animation Hook
// ============================================================================

interface FlickerAnimationResult {
  keyframes: number[];
  times: number[];
  totalDuration: number;
}

/**
 * Custom hook for tubelight flicker animation timing
 * Memoized to prevent recalculation on re-renders
 */
export function useFlickerAnimation(): FlickerAnimationResult {
  return useMemo(() => {
    const flickerSequence = [
      { opacity: 0, duration: 0.3 },
      { opacity: 0.2, duration: 0.1 },
      { opacity: 1, duration: 0.08 },
      { opacity: 0.3, duration: 0.13 },
      { opacity: 1, duration: 0.1 },
    ];

    let totalDuration = 0;
    const keyframes: number[] = [];
    for (const step of flickerSequence) {
      keyframes.push(step.opacity);
      totalDuration += step.duration;
    }
    keyframes.push(1);

    const times = [
      0,
      ...flickerSequence.map(
        (_, i) =>
          flickerSequence.slice(0, i + 1).reduce((a, b) => a + b.duration, 0) /
          (totalDuration + 0.1),
      ),
      1,
    ];

    return { keyframes, times, totalDuration };
  }, []);
}

// ============================================================================
// Main Component
// ============================================================================

export interface TubelightAccordionProps {
  /** Custom class name for the container */
  className?: string;
  /** Accordion header/question text */
  question?: string;
  /** Accordion body/answer text */
  answer?: string;
}

export default function TubelightAccordion({
  className,
  question = "Why don't I ever have brilliant ideas in meetings?",
  answer = "Because your brain runs on tubelight mode. It flickers, hums, then lights up exactly 10 minutes after the meeting ends.",
}: TubelightAccordionProps) {
  const [open, setOpen] = useState(false);
  const { keyframes, times, totalDuration } = useFlickerAnimation();

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        className={cn(
          "outer-container relative overflow-hidden text-white w-full max-w-[30rem] border-b border-[#313335]",
          className,
        )}
      >
        {/* Tubelight bar animation */}
        <AnimatePresence mode="popLayout">
          {open && (
            <motion.div
              className="tubelight-container h-6 w-full flex justify-center absolute -top-[6px]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: keyframes,
              }}
              transition={{
                duration: totalDuration + 0.1,
                times,
                ease: "linear",
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
            >
              <div className="w-[62%] h-3 bg-[#E8E8E8] blur-md rounded-full" />
              <div className="absolute w-[60%] h-2 top-[2px] bg-[#E8E8E8] rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tubelight glow effect - animate wrapper div instead of SVG */}
        <AnimatePresence mode="popLayout">
          {open && (
            <motion.div
              className="tubelight-glow absolute -top-[9rem] blur-[0px] left-[40%] -translate-x-1/2 w-[80%]"
              animate={{
                opacity: [0, 1],
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              initial={{ opacity: 0 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              <TubelightGlowSVG />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accordion header */}
        <div className="flex justify-between items-center px-5 py-3">
          <div className="text-sm">{question}</div>
          <motion.div
            whileTap={{ scale: 0.84 }}
            className={cn(
              "relative bg-[#141616] h-6 w-6 rounded-full flex items-center justify-center cursor-pointer z-10",
              open && "shadow-[0px_0px_9px_1px_rgba(255,_255,_255,_0.25)]",
            )}
            onClick={() => setOpen((prev) => !prev)}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {open ? (
                <motion.span
                  key="power"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <PowerOffIcon />
                </motion.span>
              ) : (
                <motion.span
                  key="plus"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <PlusIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Accordion content */}
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key="accordion-content"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex items-center px-5 py-3">
                <motion.div
                  className="accordion-text text-white text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: keyframes }}
                  transition={{
                    duration: totalDuration + 0.1,
                    times,
                    ease: "linear",
                  }}
                >
                  {answer}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

TubelightAccordion.displayName = "TubelightAccordion";

// Named exports for composition and tree-shaking
export { PowerOffIcon, PlusIcon, TubelightGlowSVG };
