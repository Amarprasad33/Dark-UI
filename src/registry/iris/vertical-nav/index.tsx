"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";
import { motion, useAnimate } from "motion/react";

// ============================================================================
// Types
// ============================================================================

export interface MenuItem {
  id: string;
  label: string;
}

export interface VerticalNavProps {
  /** Array of menu items to display */
  items?: MenuItem[];
  /** Callback when an item is selected */
  onSelect?: (item: MenuItem, index: number) => void;
  /** Custom class name for the container */
  className?: string;
}

// ============================================================================
// Hoisted SVG Icons - Static, never re-created on render
// ============================================================================

const ReturnIcon = memo(function ReturnIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 1L1 4L4.5 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 4H12.497C15.9385 4 18.861 6.81 18.995 10.25C19.137 13.885 16.1335 17 12.497 17H10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
ReturnIcon.displayName = "ReturnIcon";

// ============================================================================
// Spring Animation Config - Hoisted for reuse
// ============================================================================

const SPRING_CONFIG = {
  type: "spring",
  stiffness: 520,
  damping: 36,
  mass: 0.7,
} as const;

// ============================================================================
// Default Menu Items
// ============================================================================

const DEFAULT_ITEMS: MenuItem[] = [
  { id: "home", label: "Home" },
  { id: "craft", label: "Craft" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// ============================================================================
// NavRow Sub-component
// ============================================================================

interface NavRowProps {
  index: number;
  label: string;
  isActive: boolean;
  register: (index: number, element: HTMLDivElement | null) => void;
  onClick: () => void;
  onBack: () => void;
}

const NavRow = memo(function NavRow({
  index,
  label,
  isActive,
  register,
  onClick,
  onBack,
}: NavRowProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    register(index, ref.current);
  }, [index, register]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 0, opacity: 1 }}
      style={{ willChange: "transform, opacity" }}
      className="nav-item-with-return relative flex gap-1"
    >
      {isActive && (
        <div
          aria-label="Back to menu"
          onClick={onBack}
          className="mb-1 absolute -left-6 inline-flex items-center gap-1 text-zinc-300 hover:text-zinc-100 cursor-pointer"
        >
          <ReturnIcon className="text-zinc-200/70" />
        </div>
      )}

      <div className="hover:text-zinc-200/80 cursor-pointer" onClick={onClick}>
        {label}
      </div>
    </motion.div>
  );
});
NavRow.displayName = "NavRow";

// ============================================================================
// Main Component
// ============================================================================

export default function VerticalNav({
  items = DEFAULT_ITEMS,
  onSelect,
  className,
}: VerticalNavProps) {
  // Stabilize items reference if using defaults
  const stableItems = useMemo(() => items, [items]);

  // Storage for child-provided elements
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scope, animate] = useAnimate();

  const registerItem = useCallback(
    (index: number, element: HTMLDivElement | null) => {
      itemRefs.current[index] = element;
    },
    []
  );

  const measure = useCallback(() => {
    const heights = itemRefs.current.map((el) => el?.offsetHeight ?? 0);
    setItemHeights(heights);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, stableItems.length]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Helper to sum heights above an index
  const getCumulativeHeightAbove = useCallback(
    (index: number) => {
      if (!itemHeights.length) return 0;
      let sum = 0;
      for (let i = 0; i < index; i++) sum += itemHeights[i] ?? 0;
      return sum;
    },
    [itemHeights]
  );

  const handleClick = useCallback(
    async (clickedIndex: number) => {
      setActiveIndex(clickedIndex);

      // Notify parent of selection
      if (onSelect) {
        onSelect(stableItems[clickedIndex], clickedIndex);
      }

      // Selected to top: translate by negative of cumulative height above
      const toTopY = -getCumulativeHeightAbove(clickedIndex);

      await Promise.all(
        itemRefs.current.map((el, index) => {
          if (!el) return;
          if (index < clickedIndex) {
            return animate(el, { y: -20, opacity: 0 }, SPRING_CONFIG);
          }
          if (index === clickedIndex) {
            return animate(el, { y: toTopY, opacity: 1 }, SPRING_CONFIG);
          }
          return animate(el, { y: 20, opacity: 0 }, SPRING_CONFIG);
        })
      );
    },
    [animate, getCumulativeHeightAbove, onSelect, stableItems]
  );

  const handleBack = useCallback(async () => {
    setActiveIndex(null);
    await Promise.all(
      itemRefs.current.map(
        (el) => el && animate(el, { y: 0, opacity: 1 }, SPRING_CONFIG)
      )
    );
  }, [animate]);

  return (
    <div ref={scope} className={className}>
      <div className="flex flex-col">
        {stableItems.map((item, index) => (
          <NavRow
            key={item.id}
            index={index}
            label={item.label}
            isActive={activeIndex === index}
            register={registerItem}
            onClick={() => handleClick(index)}
            onBack={handleBack}
          />
        ))}
      </div>
    </div>
  );
}

VerticalNav.displayName = "VerticalNav";

// Named exports for composition and tree-shaking
export { ReturnIcon, NavRow, SPRING_CONFIG, DEFAULT_ITEMS };
