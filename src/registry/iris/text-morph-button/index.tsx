"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useMemo, memo } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface TextMorphButtonProps {
  /** The default text to display */
  defaultText?: string;
  /** The text to display on hover */
  hoverText?: string;
  /** Optional custom className for the button container */
  className?: string;
  /** Optional custom className for the button itself */
  buttonClassName?: string;
}

export interface MorphProps {
  /** The text content to animate */
  children: string;
  /** Optional custom className for the span elements */
  className?: string;
}

// ============================================================================
// Hoisted Constants & Utilities
// ============================================================================

/**
 * Generates unique keys for each character in a string to support layout animations
 * even when characters are duplicated.
 */
function generateKeys(text: string) {
  const charCount: { [key: string]: number } = {};
  return text.split("").map((char) => {
    if (!charCount[char]) {
      charCount[char] = 0;
    }
    const key = `${char}-${charCount[char]}`;
    charCount[char]++;
    return { char, key };
  });
}

const MORPH_TRANSITION = {
  duration: 0.25,
  type: "spring",
  bounce: 0,
  opacity: {
    duration: 0.35,
    type: "spring",
    bounce: 0,
  },
} as const;

// ============================================================================
// Sub-components
// ============================================================================

/**
 * A component that morphs text by animating individual characters.
 */
const Morph = memo(function Morph({ children, className }: MorphProps) {
  const textToDisplay = useMemo(() => generateKeys(children), [children]);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {textToDisplay.map(({ char, key }) => (
        <motion.span
          key={key}
          layoutId={key}
          className={cn("inline-block text-inherit", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={MORPH_TRANSITION}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </AnimatePresence>
  );
});

Morph.displayName = "Morph";

// ============================================================================
// Main Component
// ============================================================================

/**
 * TextMorphButton - A premium button that morphs its text label on hover.
 */
export default function TextMorphButton({
  defaultText = "Get Started",
  hoverText = "Go Start Now",
  className,
  buttonClassName,
}: TextMorphButtonProps) {
  const [text, setText] = useState(defaultText);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <motion.button
        className={cn(
          "px-5 py-2 text-zinc-950 bg-zinc-100 hover:bg-zinc-100/95 font-semibold border border-zinc-400/70 rounded-xl flex items-center justify-center w-[9rem] cursor-pointer select-none",
          buttonClassName,
        )}
        onMouseEnter={() => setText(hoverText)}
        onMouseLeave={() => setText(defaultText)}
        whileTap={{ scale: 0.96 }}
        aria-label={text}
      >
        <Morph>{text}</Morph>
      </motion.button>
    </div>
  );
}

TextMorphButton.displayName = "TextMorphButton";

// Named exports for composition and tree-shaking
export { Morph, MORPH_TRANSITION };
