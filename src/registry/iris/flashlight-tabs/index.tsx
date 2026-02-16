"use client";

import { cn } from "@/lib/utils";
import { motion, LayoutGroup } from "motion/react";
// import { color, motion, LayoutGroup } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

// Needs cleanup and refactor to match the other component patterns

const ALL_TABS = ["Home", "Projects", "Deployments", "Members", "Settings"];
const TAB_OFFSETS = [0, 70, 170, 270, 360];
const buttonVariants = {
  initial: {
    color: "#A0A0A0",
    textShadow: "none",
    transition: {
      color: { duration: 0.15 }, // 150ms
      textShadow: { duration: 0.25 },
    },
  },
  hover: {
    color: "#EDEDED",
    transition: {
      color: { duration: 0.15 }, // 150ms
      textShadow: { duration: 0.25 },
    },
  },
  selected: {
    color: "#EDEDED",
    textShadow: "rgba(255, 255, 255, 0.57) 1px 1px 12px",
  },
};

export default function FlashlightTabs() {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState("Home");

  const tabs = isMobile ? ALL_TABS.slice(0, 3) : ALL_TABS;

  // Handle case where selected tab might be hidden on mobile resize
  useEffect(() => {
    if (isMobile && !tabs.includes(selected)) {
      setSelected("Home");
    }
  }, [isMobile, selected, tabs]);
  return (
    <main
      className={` w-full flex justify-center items-center bg-[#161616] text-white px-4 sm:px-8 lg:px-20`}
    >
      <div className="content-container w-full flex items-center flex-col gap-8 h-2/4">
        <div className="comp w-full flex justify-center items-center h-80 border border-[#282828] bg-[#1C1C1C] rounded-xl max-w-4xl">
          <LayoutGroup id="tabs">
            <div
              className={cn(
                "flashligh-tabs relative flex p-[1px] bg-[#343434] overflow-hidden rounded-full",
                "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1/2 after:bg-zinc-300/90 after:blur-sm",
                "after:w-[calc(100%/var(--tab-count)+10px)]",
                "after:translate-x-[var(--x-offset)]",
                "after:transition-transform after:duration-500 after:ease-out",
              )}
              style={
                {
                  "--tab-count": tabs.length,
                  "--x-offset": `${TAB_OFFSETS[tabs.indexOf(selected)] || 0}%`,
                } as React.CSSProperties
              }
            >
              <div
                aria-hidden="true"
                className="bg-gradient-to-r from-[#343434]/20 via-[#7E7E7E]/65 to-[#161616]/5 absolute h-[1px] top-0 left-14 w-[85%] z-10"
              ></div>
              <div
                className="inner-container z-30 bg-[#1C1C1C] p-[5px] relative flex rounded-full overflow-hidden "
                style={{ "--xOff": "50%" } as React.CSSProperties}
              >
                {tabs.map((tab) => {
                  const isFirst = tab === tabs[0];
                  const isLast = tab === tabs[tabs.length - 1];

                  // Logic: First tab = left round, Last tab = right round, Middle = fully round
                  // const backgroundRadius = isFirst
                  //   ? "45px 12px 12px 45px"
                  //   : isLast
                  //     ? "12px 45px 45px 12px"
                  //     : "45px 45px 45px 45px";

                  return (
                    <motion.button
                      key={tab}
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="clicked"
                      className="px-[12px] py-[10px] text-[15px] relative flex justify-center items-center text-center outline-0 cursor-pointer"
                      animate={selected == tab ? "selected" : "initial"}
                      onClick={() => setSelected(tab)}
                    >
                      {tab}
                      {selected == tab && (
                        <motion.div
                          layoutId="glow"
                          layout
                          initial={false}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.8,
                          }}
                          style={{
                            position: "absolute",
                            width: "70px",
                            height: "70px",
                            background: "white",
                            borderRadius: "9999px",
                            zIndex: 1,
                            bottom: "-46px",
                            filter: "blur(10px)",
                            opacity: 0.3,
                            transformOrigin: "50% 50%",
                          }}
                        ></motion.div>
                      )}
                      {selected == tab && (
                        <motion.div
                          layoutId="background"
                          layout
                          initial={false}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.8,
                          }}
                          style={{
                            borderRadius: "60px",
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                            width: "100%",
                            padding: "10px 12px",
                            height: "100%",
                            zIndex: 6,
                            backgroundColor: "rgba(255, 255, 255, 0.056)",
                            transformOrigin: "50% 50% 0px",
                          }}
                        ></motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </LayoutGroup>
        </div>
      </div>
    </main>
  );
}
