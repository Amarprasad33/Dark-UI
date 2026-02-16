"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { memo, useState, type ReactNode } from "react";

// ============================================================================
// Types
// ============================================================================

interface GooeyMenuItem {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
}

export interface GooeyMenuProps {
  /** Array of menu items with icons and titles */
  items?: GooeyMenuItem[];
  /** Custom class name for the container */
  className?: string;
  /** Callback when menu is toggled */
  onOpenChange?: (isOpen: boolean) => void;
}

// ============================================================================
// Icons
// ============================================================================

const MenuIcon = memo(function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-menu-icon lucide-menu text-black"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
});

const CloseIcon = memo(function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-x-icon lucide-x text-black"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
});

const HomeIcon = memo(function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-house-icon lucide-house text-zinc-500 group-hover:text-black"
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
});

const MailIcon = memo(function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-mail-icon lucide-mail text-zinc-500 group-hover:text-black"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
});

const UserIcon = memo(function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-user-icon lucide-user text-zinc-500 group-hover:text-black"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
});

const SettingsIcon = memo(function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-settings-icon lucide-settings text-zinc-500 group-hover:text-black"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
});

// ============================================================================
// Constants & Variants
// ============================================================================

const DEFAULT_ITEMS: GooeyMenuItem[] = [
  { title: "Home", icon: <HomeIcon /> },
  { title: "Mail", icon: <MailIcon /> },
  { title: "User", icon: <UserIcon /> },
  { title: "Settings", icon: <SettingsIcon /> },
];

const containerVariants = {
  open: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================================================
// Main Component
// ============================================================================

export default function GooeyMenu({
  items = DEFAULT_ITEMS,
  className,
  onOpenChange,
}: GooeyMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        className,
      )}
    >
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="h-[20rem] w-[20rem] flex justify-center items-center pointer-events-none"
        >
          <defs>
            <filter
              id="gooey-tooltip"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="8"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
          <foreignObject
            width="100%"
            height="100%"
            filter="url(#gooey-tooltip)"
            className="pointer-events-auto"
          >
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col gap-[2px] items-center h-[10rem]">
                {/* Toggle Button (Always Visible) */}
                <button
                  onClick={toggleMenu}
                  className="h-10 w-10 rounded-full bg-[#efefef] text-white absolute top-[39px] flex items-center justify-center z-50 cursor-pointer hover:bg-[#e0e0e0] transition-colors"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <CloseIcon />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hamburger"
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <MenuIcon />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* Menu Items (Animated) */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="flex flex-row gap-[2px] mt-[2px]"
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={containerVariants}
                    >
                      {items.map((item, index) => (
                        <motion.button
                          key={index}
                          className="group h-10 w-10 rounded-full bg-[#efefef] text-white flex items-center justify-center cursor-pointer"
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          variants={itemVariants}
                          onClick={item.onClick}
                          aria-label={item.title}
                        >
                          {item.icon}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}

GooeyMenu.displayName = "GooeyMenu";

// Named exports for composition
export {
  GooeyMenu,
  type GooeyMenuItem,
  MenuIcon,
  CloseIcon,
  HomeIcon,
  MailIcon,
  UserIcon,
  SettingsIcon,
  DEFAULT_ITEMS,
};
