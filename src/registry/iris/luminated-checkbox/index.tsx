"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimate } from "motion/react";
import { useEffect, useState, useCallback, memo } from "react";

// ============================================================================
// Types
// ============================================================================

export interface LuminatedCheckboxProps {
  /** Array of checkbox items to display */
  items?: string[];
  /** Custom class name for the container */
  className?: string;
  /** Callback when any checkbox changes */
  onChange?: (index: number, checked: boolean) => void;
}

export interface AnimatedCheckboxProps {
  /** Text to display next to the checkbox */
  displayText: string;
  /** Callback when checkbox state changes */
  onChange?: (checked: boolean) => void;
  /** Custom class name */
  className?: string;
}

// ============================================================================
// Default Items
// ============================================================================

const DEFAULT_ITEMS = [
  "Wake up in delusion that you are best in your field",
  "Become humbled by a junior",
  "Now google all day how become a better skibidi dev",
];

// ============================================================================
// AnimatedCheckbox Sub-component
// ============================================================================

const AnimatedCheckbox = memo(function AnimatedCheckbox({
  displayText,
  onChange,
  className,
}: AnimatedCheckboxProps) {
  const [checked, setChecked] = useState(false);
  const [initialChecked, setInitialChecked] = useState(false);
  const [borderSc, borderAnimate] = useAnimate();
  const [boxSc, boxAnimate] = useAnimate();
  const [tickSc, tickAnimate] = useAnimate();
  const [lineSc, lineAnimate] = useAnimate();
  const [textSc, textAnimate] = useAnimate();

  const toggleAnimations = useCallback(async () => {
    if (!initialChecked) return;

    if (checked) {
      // Check animation sequence
      await borderAnimate(
        borderSc.current,
        { pathLength: 0 },
        { duration: 0.2, ease: "easeInOut" },
      );

      await boxAnimate(
        boxSc.current,
        { scale: 1 },
        { duration: 0.2, ease: "easeOut" },
      );

      tickAnimate(
        tickSc.current,
        { pathLength: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );

      lineAnimate(
        lineSc.current,
        { width: "100%" },
        { duration: 0.2, ease: "easeInOut" },
      );

      textAnimate(textSc.current, { x: [0, 4, 0] });
    } else {
      // Uncheck animation sequence
      lineAnimate(
        lineSc.current,
        { width: 0 },
        { duration: 0.2, ease: "easeInOut" },
      );

      textAnimate(textSc.current, { x: [0, -4, 0] });

      await tickAnimate(
        tickSc.current,
        { pathLength: 0, opacity: 0 },
        { duration: 0.2, ease: "easeInOut" },
      );

      await boxAnimate(
        boxSc.current,
        { scale: 0 },
        { duration: 0.1, ease: "easeOut" },
      );

      await borderAnimate(
        borderSc.current,
        { pathLength: 1 },
        { duration: 0.4, ease: "easeInOut" },
      );
    }
  }, [
    checked,
    initialChecked,
    borderAnimate,
    borderSc,
    boxAnimate,
    boxSc,
    tickAnimate,
    tickSc,
    lineAnimate,
    lineSc,
    textAnimate,
    textSc,
  ]);

  useEffect(() => {
    toggleAnimations();
  }, [toggleAnimations]);

  const handleToggle = useCallback(() => {
    setChecked((prev) => {
      const newValue = !prev;
      onChange?.(newValue);
      return newValue;
    });
    setInitialChecked(true);
  }, [onChange]);

  return (
    <div
      className={cn(
        "hover:bg-zinc-800 cursor-pointer flex items-center px-[10px] py-2 rounded-lg w-fit",
        className,
      )}
      onClick={handleToggle}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <div style={{ position: "relative", width: 24, height: 24 }}>
        {/* Border animation */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ position: "absolute", top: 0, left: 0 }}
          aria-hidden="true"
        >
          <motion.rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            ry="5"
            stroke="#9f9fa9"
            strokeWidth="2"
            initial={{ pathLength: 1 }}
            ref={borderSc}
          />
        </svg>

        {/* Filled box scaling in */}
        <motion.div
          initial={{ scale: 0 }}
          ref={boxSc}
          className="absolute top-[2px] left-[2px] w-[20px] h-[20px] bg-[#f7f7f7] rounded-[5px] flex justify-center items-center"
          aria-hidden="true"
        >
          {/* Checkmark tick path */}
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M1 5L4.5 8.5L11 2"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              ref={tickSc}
            />
          </svg>
        </motion.div>
      </div>

      <motion.span
        className={cn(
          "ml-2 relative font-medium",
          checked ? "text-[#545454]" : "text-[#c1c1c1]",
        )}
        style={{ userSelect: "none" }}
        initial={{ x: 0 }}
        ref={textSc}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        {displayText}
        <motion.span
          className="absolute left-0 top-1/2 h-[2px] bg-[#999] pointer-events-none"
          initial={{ width: 0 }}
          ref={lineSc}
          style={{ transform: "translateY(-50%)" }}
          aria-hidden="true"
        />
      </motion.span>
    </div>
  );
});
AnimatedCheckbox.displayName = "AnimatedCheckbox";

// ============================================================================
// Main Component
// ============================================================================

export default function LuminatedCheckbox({
  items = DEFAULT_ITEMS,
  className,
  onChange,
}: LuminatedCheckboxProps) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      {items.map((text, idx) => (
        <AnimatedCheckbox
          key={idx}
          displayText={text}
          onChange={(checked) => onChange?.(idx, checked)}
        />
      ))}
    </div>
  );
}

LuminatedCheckbox.displayName = "LuminatedCheckbox";

// Named exports for composition and tree-shaking
export { AnimatedCheckbox, DEFAULT_ITEMS };
