"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useRef,
  useCallback,
  memo,
  type PointerEvent,
  type ReactNode,
} from "react";

// ============================================================================
// Types
// ============================================================================

export interface LampCardProps {
  /** Title text to display */
  title?: string;
  /** Description text to display */
  description?: string;
  /** Custom children to render instead of title/description */
  children?: ReactNode;
  /** Custom class name for the container */
  className?: string;
}

// ============================================================================
// Hoisted SVG Components
// ============================================================================

const LampSVG = memo(function LampSVG() {
  return (
    <svg
      width="107"
      height="142"
      viewBox="0 0 107 142"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="53.5" cy="75.5" r="24.5" fill="#E0E0E0" />
      <g filter="url(#filter0_f_103_3)">
        <circle cx="53.5" cy="88.5" r="24.5" fill="#E0E0E0" />
      </g>
      <line
        x1="53"
        y1="4.37114e-08"
        x2="53"
        y2="34"
        stroke="#363636"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53.2116 29C54.329 29.0001 55.4075 29.4123 56.2425 30.1583C57.0776 30.9043 57.611 31.9322 57.7418 33.0471L57.7737 33.5833V38.625L95.0688 76.0983C97.8471 78.885 96.0862 83.5692 92.3316 83.9725L91.8115 84H75.5659H30.8574H14.6163C10.6883 84 8.63995 79.4396 11.0077 76.4879L11.359 76.0983L48.6495 38.625V33.5833C48.6495 32.3678 49.1302 31.202 49.9857 30.3424C50.8413 29.4829 52.0017 29 53.2116 29Z"
        fill="#3C3B3B"
      />
      <defs>
        <filter
          id="filter0_f_103_3"
          x="0.200001"
          y="35.2"
          width="106.6"
          height="106.6"
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
            stdDeviation="14.4"
            result="effect1_foregroundBlur_103_3"
          />
        </filter>
      </defs>
    </svg>
  );
});
LampSVG.displayName = "LampSVG";

const LampGlow = memo(function LampGlow() {
  return (
    <svg
      width="231"
      height="214"
      viewBox="0 0 231 214"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g filter="url(#filter0_f_103_5)">
        <path
          d="M98.9288 46H132.813L185 168H46L98.9288 46Z"
          fill="#E8E8E8"
          fillOpacity="0.39"
        />
      </g>
      <g filter="url(#filter1_f_103_5)">
        <path
          d="M104.174 56H127.333L163 97H68L104.174 56Z"
          fill="#E8E8E8"
          fillOpacity="0.39"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_103_5"
          x="0.599998"
          y="0.599998"
          width="229.8"
          height="212.8"
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
            stdDeviation="22.7"
            result="effect1_foregroundBlur_103_5"
          />
        </filter>
        <filter
          id="filter1_f_103_5"
          x="39"
          y="27"
          width="153"
          height="99"
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
            stdDeviation="14.5"
            result="effect1_foregroundBlur_103_5"
          />
        </filter>
      </defs>
    </svg>
  );
});
LampGlow.displayName = "LampGlow";

// ============================================================================
// Main Component
// ============================================================================

export default function LampCard({
  title = "What do I ask to get better",
  description = "Just question yourself and drown in the loop of overthinking till you feel suffocation with your own thoughts and ask why did you ask the question in the first place.",
  children,
  className,
}: LampCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Create motion values for cursor position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Create spring values for smooth animation
  const springX = useSpring(0, {
    stiffness: 750,
    damping: 45,
    bounce: 0,
  });

  // Create motion template for the mask position
  const maskPosition = useMotionTemplate`${x}px ${y}px`;

  // Create transforms for lamp rotation
  const lampRotation = useTransform(springX, [0, 350], [25, -25]); // Adjust range as needed
  const glowRotation = useTransform(springX, [0, 350], [25, -25]); // Slightly less rotation for glow
  const xOffsetWithRotate = useTransform(springX, [0, 350], [-25, 25]);

  const pointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const bounds = containerRef.current?.getBoundingClientRect();

      if (bounds) {
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        // Update motion values
        x.set(mouseX);
        y.set(mouseY);
        springX.set(e.clientX - bounds.left - 20);
      }
    },
    [x, y, springX],
  );

  return (
    <div
      ref={containerRef}
      onPointerMove={pointerMove}
      className={cn(
        "relative overflow-hidden flex flex-col items-center justify-end p-4 rounded-lg border border-white/5 bg-[#0D0D0D] min-h-[20rem] min-w-[18rem] max-w-[22rem]",
        className,
      )}
    >
      <motion.div style={{ rotate: lampRotation }} className="absolute -top-3">
        <LampSVG />
      </motion.div>
      <motion.div
        style={{ rotate: glowRotation, x: xOffsetWithRotate }}
        className="absolute top-5"
      >
        <LampGlow />
      </motion.div>
      <div className="relative cursor-default flex flex-col gap-1.5 w-full place-content-end">
        {/* The text content */}
        <motion.div
          style={
            {
              position: "relative",
              color: "white",
              maskImage: useMotionTemplate`radial-gradient(circle at ${maskPosition}, black 10%, transparent 80%)`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            } as any
          }
          className="text-white"
        >
          {children || (
            <>
              <div className="text-base font-medium">{title}</div>
              <div className="text-sm font-normal flex-wrap">{description}</div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

LampCard.displayName = "LampCard";

// Named exports for composition and tree-shaking
export { LampSVG, LampGlow };
