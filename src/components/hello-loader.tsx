"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppleHelloVietnameseEffect } from "@/components/apple-hello-effect/apple-hello-effect";
import Image from "next/image";

export function HelloLoader() {
  const [showContainer, setShowContainer] = useState(true);
  const [phase, setPhase] = useState<"logo" | "hello">("logo");

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

  // Show logo for 500ms then switch to hello animation
  useEffect(() => {
    const t = setTimeout(() => setPhase("hello"), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {showContainer && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 40%, #0d0d1a 100%)",
            willChange: "opacity",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Ambient light - static, no animation for perf */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute -top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)", filter: "blur(60px)" }}
            />
            <div
              className="absolute -bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)", filter: "blur(60px)" }}
            />
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center justify-center gap-8">

            {/* Logo phase */}
            <AnimatePresence mode="wait">
              {phase === "logo" && (
                <motion.div
                  key="logo"
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Image
                    src="/logo.svg"
                    alt="thanhbinhit logo"
                    width={56}
                    height={56}
                    className="invert"
                    priority
                  />
                  <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/40">
                    thanhbinhit
                  </p>
                </motion.div>
              )}

              {/* Hello animation phase */}
              {phase === "hello" && (
                <motion.div
                  key="hello"
                  className="flex flex-col items-center gap-6"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <AppleHelloVietnameseEffect
                    speed={2}
                    className="h-20 md:h-28 text-white"
                    onAnimationComplete={() => {
                      setTimeout(() => setShowContainer(false), 150);
                    }}
                  />
                  <motion.p
                    className="text-xs tracking-[0.3em] uppercase font-medium text-white/40"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    Phát triển &amp; Quản trị Web
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress bar - tied to actual animation speed */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-[2px] rounded-full overflow-hidden bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #2DD4BF, #3b82f6, #a855f7)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
