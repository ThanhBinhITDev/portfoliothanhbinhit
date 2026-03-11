"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppleHelloVietnameseEffect } from "@/components/apple-hello-effect/apple-hello-effect";
import Image from "next/image";

interface HelloLoaderProps {
  onDone?: () => void;
}

export function HelloLoader({ onDone }: HelloLoaderProps) {
  const [showContainer, setShowContainer] = useState(true);
  const [phase, setPhase] = useState<"logo" | "hello">("logo");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!showContainer) {
      document.body.style.overflow = "";
      onDone?.();
    }
  }, [showContainer, onDone]);

  // Show logo for 500ms then switch to hello animation
  useEffect(() => {
    const t = setTimeout(() => setPhase("hello"), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {showContainer && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Static ambient glows – light mode version */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            <div
              className="absolute -top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.2]"
              style={{ background: "radial-gradient(circle, #e0f2fe, transparent 70%)", filter: "blur(60px)" }}
            />
            <div
              className="absolute -bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-[0.2]"
              style={{ background: "radial-gradient(circle, #f3e8ff, transparent 70%)", filter: "blur(60px)" }}
            />
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center justify-center gap-8">

            {/* Phase: logo */}
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
                    className="dark:invert-0"
                    priority
                  />
                  <p className="text-sm font-medium tracking-[0.3em] uppercase text-slate-500">
                    thanhbinhit
                  </p>
                </motion.div>
              )}

              {/* Phase: hello SVG handwriting */}
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
                    speed={2.5}
                    className="h-20 md:h-28 text-slate-900"
                    onAnimationComplete={() => {
                      setTimeout(() => setShowContainer(false), 250);
                    }}
                  />
                  <motion.p
                    className="text-xs tracking-[0.3em] uppercase font-medium text-slate-400"
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

          {/* Progress bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-[2px] rounded-full overflow-hidden bg-slate-200">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #2DD4BF, #3b82f6, #a855f7)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
