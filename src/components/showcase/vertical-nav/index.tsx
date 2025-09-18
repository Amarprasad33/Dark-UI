"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useAnimate, useAnimation } from "motion/react";

type MenuItem = { id: string; label: string };

export default function NavMenu() {
  // Array of objects for the menu items
  const items: MenuItem[] = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "craft", label: "Craft" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  // Storage for child-provided controls and elements
  const controlsRef = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scope, animate] = useAnimate();

  const registerItem = useCallback(
    (index: number, element: HTMLDivElement | null) => {
      // controlsRef.current[index] = controls;
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
  }, [measure, items.length]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Helper to sum heights above an index
  const getCumulativeHeightAbove = (index: number) => {
    if (!itemHeights.length) return 0;
    let sum = 0;
    for (let i = 0; i < index; i++) sum += itemHeights[i] ?? 0;
    return sum;
  };

  const handleClick = async (clickedIndex: number) => {
    // 3 animation types with individual controls
    // 1) Above items: move up slightly and fade out
    // 2) Selected item: move to container top, stay visible
    // 3) Below items: move down slightly and fade out
    setActiveIndex(clickedIndex);

    const spring = {
      type: "spring",
      stiffness: 520,
      damping: 36,
      mass: 0.7,
    } as const;

    // Selected to top: translate by negative of cumulative height above
    const toTopY = -getCumulativeHeightAbove(clickedIndex);

    await Promise.all(
      // controlsRef.current.map((controls, index) => {
      //   if (index < clickedIndex) {
      //     // Above
      //     return controls.start({ y: -20, opacity: 0, transition: spring });
      //   } else if (index === clickedIndex) {
      //     // Selected
      //     return controls.start({ y: toTopY, opacity: 1, transition: spring });
      //   } else {
      //     // Below
      //     return controls.start({ y: 20, opacity: 0, transition: spring });
      //   }
      // })
      itemRefs.current.map((el, index) => {
        if (!el) return;
        if (index < clickedIndex)
          return animate(el, { y: -20, opacity: 0 }, { transition: spring });
        if (index === clickedIndex)
          return animate(el, { y: toTopY, opacity: 1 }, { transition: spring });
        return animate(el, { y: 20, opacity: 0 }, { transition: spring });
      })
    );
  };

  const handleBack = async () => {
    setActiveIndex(null);
    const spring = {
      type: "spring",
      stiffness: 520,
      damping: 36,
      mass: 0.7,
    } as const;
    await Promise.all(
      itemRefs.current.map(
        (el) => el && animate(el, { y: 0, opacity: 1 }, { transition: spring })
      )
    );
  };

  return (
    <div ref={scope} className="flex flex-col">
      {items.map((item, index) => (
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
  );
}

function NavRow({
  index,
  label,
  isActive,
  register,
  onClick,
  onBack,
}: {
  index: number;
  label: string;
  isActive: boolean;
  register: (index: number, element: HTMLDivElement | null) => void;
  onClick: () => void;
  onBack: () => void;
}) {
  // const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    register(index, ref.current);
  }, [index, register]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 0, opacity: 1 }}
      // animate={controls}
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
}

const ReturnIcon = ({ className }: { className: string }) => (
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
