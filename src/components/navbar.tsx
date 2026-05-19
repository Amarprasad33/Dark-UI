"use client";

import { Logo } from "@/components/landing/logo";
import { motion } from "motion/react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-12 flex justify-center py-4 lg:px-12 backdrop-blur-sm border-b border-white/5 bg-background/50"
    >
      <div className=" flex items-center justify-between w-full max-w-7xl">
        <div className="flex gap-6 items-center">
          <div className="flex items-center justify-center">
            <Logo className="text-white" width={24} height={24} />
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground border-l px-6 border-[#2A2A2A]">
            <Link
              href="/docs"
              className="hover:text-white transition-colors text-sm"
            >
              Components
            </Link>
            <Link
              href="/blocks"
              className="hover:text-white transition-colors text-sm"
            >
              Blocks
            </Link>
            <Link
              href="/templates"
              className="hover:text-white transition-colors text-sm"
            >
              Templates
            </Link>
            <Link
              href="/pricing"
              className="hover:text-white transition-colors text-sm"
            >
              Pricing
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block px-4 py-2 font-medium text-sm bg-white text-black rounded-md hover:bg-neutral-200 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
