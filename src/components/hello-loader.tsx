"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppleHelloVietnameseEffect } from "@/components/apple-hello-effect/apple-hello-effect";
import Image from "next/image";

export function HelloLoader() {
  const [showContainer, setShowContainer] = useState(true);
  const [phase, setPhase] = useState<"logo" | "hello" | "out">("logo");

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

  // After logo reveal, transition to hello animation
  useEffect(() => {
    const t = setTimeout(() => setPhase("hello"), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {showContainer && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 40%, #0d0d1a 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient light effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)", filter: "blur(80px)" }}
            />
            <div
              className="absolute -bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)", filter: "blur(80px)" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5"
              style={{ background: "radial-gradient(circle, #2DD4BF, transparent 70%)", filter: "blur(120px)" }}
            />
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center justify-center gap-8">

            {/* Logo mark reveal */}
            <AnimatePresence>
              {phase === "logo" && (
                <motion.div
                  key="logo"
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative">
                    {/* Glow ring */}
                    <div
                      className="absolute inset-0 rounded-full opacity-40"
                      style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)", filter: "blur(20px)", transform: "scale(1.5)" }}
                    />
                    <Image
                      src="/logo.svg"
                      alt="thanhbinhit logo"
                      width={64}
                      height={64}
                      className="relative z-10 invert"
                    />
                  </div>
                  <motion.p
                    className="text-sm font-medium tracking-[0.3em] uppercase text-white/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    thanhbinhit
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hello animation */}
            <AnimatePresence>
              {phase === "hello" && (
                <motion.div
                  key="hello"
                  className="flex flex-col items-center gap-6"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* SVG handwriting */}
                  <div className="relative">
                    {/* Soft glow behind */}
                    <div
                      className="absolute inset-0 z-0 pointer-events-none"
                      style={{
                        filter: "blur(40px)",
                        opacity: 0.25,
                        background: "linear-gradient(90deg, #2DD4BF 0%, #3b82f6 50%, #a855f7 100%)",
                        borderRadius: "50%",
                        transform: "scaleX(1.5) scaleY(0.6)",
                      }}
                    />
                    <AppleHelloVietnameseEffect
                      speed={1.5}
                      className="h-24 md:h-36 relative z-10 text-white"
                      onAnimationComplete={() => {
                        setTimeout(() => setShowContainer(false), 300);
                      }}
                    />
                  </div>

                  {/* Tagline */}
                  <motion.p
                    className="text-sm tracking-[0.3em] uppercase font-medium"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Phát triển & Quản trị Web
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-[2px] rounded-full overflow-hidden bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #2DD4BF, #3b82f6, #a855f7)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
