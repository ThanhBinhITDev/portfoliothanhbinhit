"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppleHelloEnglishEffect, AppleHelloVietnameseEffect } from "@/components/apple-hello-effect/apple-hello-effect";

export function HelloLoader() {
  const [showContainer, setShowContainer] = useState(true);

  useEffect(() => {
    if (showContainer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showContainer]);

  return (
    <AnimatePresence>
      {showContainer && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white text-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="vietnamese"
              className="flex items-center justify-center"
              initial={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <AppleHelloVietnameseEffect
                speed={1.5}
                className="h-20 md:h-32 text-black"
                onAnimationComplete={() => {
                  setTimeout(() => setShowContainer(false), 200);
                }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
