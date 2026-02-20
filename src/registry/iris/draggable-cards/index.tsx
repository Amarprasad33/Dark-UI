"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimate } from "motion/react";
import Image from "next/image";
import { memo, useCallback, useState } from "react";

// ============================================================================
// Types
// ============================================================================

export interface CardData {
  /** Unique identifier for the card */
  id: number;
  /** Background color of the card */
  color: string;
  /** Initial rotation angle in degrees */
  rotation: number;
  /** Image URL */
  image: string;
  /** Orientation of the card */
  orient: "landscape" | "portrait";
  /** Tailwind dimension classes */
  dimensions: string;
}

export interface DraggableCardsProps {
  /** Array of card data to display */
  cards?: CardData[];
  /** Custom class name for the container */
  className?: string;
  /** Swipe distance threshold in pixels */
  swipeThreshold?: number;
}

export interface CardItemProps {
  card: CardData;
  index: number;
  totalCards: number;
  onDragEnd: (
    index: number,
  ) => (
    event: PointerEvent,
    info: { offset: { x: number; y: number } },
  ) => void;
}

// ============================================================================
// Hoisted Constants
// ============================================================================

const randomRotation = () => Math.floor(Math.random() * 21) - 10;

export const DEFAULT_CARDS: CardData[] = [
  {
    id: 1,
    color: "#64748b",
    rotation: randomRotation(),
    image:
      "https://images.unsplash.com/photo-1762172619623-507e76f3d3a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    orient: "landscape",
    dimensions: "w-72 h-60",
  },
  {
    id: 2,
    color: "#57534e",
    rotation: randomRotation(),
    image:
      "https://images.unsplash.com/photo-1762123884534-493cea2b4b5f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    orient: "portrait",
    dimensions: "w-56 h-72",
  },
  {
    id: 3,
    color: "#6b7280",
    rotation: randomRotation(),
    image:
      "https://images.unsplash.com/photo-1751420195738-239002789547?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    orient: "portrait",
    dimensions: "w-56 h-72",
  },
  {
    id: 4,
    color: "#71717a",
    rotation: randomRotation(),
    image:
      "https://images.unsplash.com/photo-1753847726685-6af24062aa9e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    orient: "portrait",
    dimensions: "w-56 h-72",
  },
  {
    id: 5,
    color: "#78716c",
    rotation: randomRotation(),
    image:
      "https://images.unsplash.com/photo-1761440567736-1bef26a5afff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    orient: "portrait",
    dimensions: "w-56 h-72",
  },
];

export const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 600,
  damping: 70,
};

export const STACK_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 200,
  damping: 30,
};

// ============================================================================
// Sub-components
// ============================================================================

const CardItem = memo(function CardItem({
  card,
  index,
  totalCards,
  onDragEnd,
}: CardItemProps) {
  const isTopCard = index === totalCards - 1;

  return (
    <motion.div
      data-card-id={card.id}
      className={cn(
        "absolute rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-xl overflow-hidden",
        card.dimensions,
        card.orient === "landscape" && "-left-8 top-6",
      )}
      style={{
        backgroundColor: card.color,
        transformOrigin: "bottom",
        zIndex: index + 1,
        pointerEvents: isTopCard ? "auto" : "none",
        cursor: isTopCard ? "grab" : "default",
      }}
      animate={{
        scale: 1 - (totalCards - 1 - index) * 0.05,
        rotate: card.rotation,
      }}
      transition={STACK_SPRING_CONFIG}
      {...(isTopCard && {
        drag: "x",
        dragConstraints: { left: -400, right: 300 },
        whileTap: { cursor: "grabbing" },
        dragElastic: 0.2,
        onDragEnd: onDragEnd(index),
      })}
    >
      <Image
        fill
        src={card.image}
        alt={`Card ${card.id} — ${card.orient}`}
        className="h-full w-full object-cover rounded-lg pointer-events-none !m-0"
        sizes="(max-width: 768px) 100vw, 288px"
      />
    </motion.div>
  );
});
CardItem.displayName = "CardItem";

// ============================================================================
// Main Component
// ============================================================================

export default function DraggableCards({
  cards: initialCards = DEFAULT_CARDS,
  className,
  swipeThreshold = 140,
}: DraggableCardsProps) {
  const [cards, setCards] = useState(initialCards);
  const [scope, animate] = useAnimate();

  const handleDragEnd = useCallback(
    (index: number) =>
      async (
        _event: PointerEvent,
        info: { offset: { x: number; y: number } },
      ) => {
        if (Math.abs(info.offset.x) > swipeThreshold) {
          // Swipe detected: send card to back
          const swipedCard = cards[cards.length - 1];

          animate(
            `[data-card-id="${swipedCard.id}"]`,
            { scale: 0.3, x: 0, z: -10 },
            { ...SPRING_CONFIG },
          );

          animate(
            `[data-card-id="${swipedCard.id}"]`,
            { x: 0, z: 0 },
            { ...SPRING_CONFIG, bounce: 0 },
          );

          // Reorder cards: move top card to the back
          setCards((prev) => {
            const next = [...prev];
            const [top] = next.splice(next.length - 1, 1);
            return [top, ...next];
          });
        } else {
          // Not swiped far enough: snap back to center
          const topCard = cards[cards.length - 1];
          await animate(
            `[data-card-id="${topCard.id}"]`,
            { x: 0 },
            { type: "spring", stiffness: 400, damping: 30 },
          );
        }
      },
    [cards, animate, swipeThreshold],
  );

  return (
    <div
      className={cn(
        "w-full  h-full flex items-center justify-center bg-zinc-50 relative rounded-xl",
        className,
      )}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={scope}
        className="relative w-64 h-60 select-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {cards.map((card, index) => (
          <CardItem
            key={card.id}
            card={card}
            index={index}
            totalCards={cards.length}
            onDragEnd={handleDragEnd}
          />
        ))}
      </motion.div>
    </div>
  );
}

DraggableCards.displayName = "DraggableCards";

// Named exports for composition and tree-shaking
export { CardItem };
