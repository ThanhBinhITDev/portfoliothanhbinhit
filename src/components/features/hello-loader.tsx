"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AppleHelloVietnameseEffect } from "@/components/features/apple-hello-effect/apple-hello-effect";

interface HelloLoaderProps {
  onDone?: () => void;
}

const LOADER_SESSION_KEY = "thanhbinhit_loader_seen";
const LOADER_DURATION_MS = 1000;

export function HelloLoader({ onDone }: HelloLoaderProps) {
  const [showContainer, setShowContainer] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);
    const hasSeen = window.sessionStorage.getItem(LOADER_SESSION_KEY) === "true";
    setShowContainer(!hasSeen && !shouldReduceMotion);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!showContainer || !isClient || shouldReduceMotion) {
      if (isClient && shouldReduceMotion) {
        window.sessionStorage.setItem(LOADER_SESSION_KEY, "true");
      }
      onDone?.();
      return;
    }

    window.sessionStorage.setItem(LOADER_SESSION_KEY, "true");
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setShowContainer(false);
      document.body.style.overflow = "";
      onDone?.();
    }, LOADER_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [showContainer, isClient, shouldReduceMotion, onDone]);

  if (!isClient) return null;

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-8%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
            <motion.div
              key="hello"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <AppleHelloVietnameseEffect
                speed={18}
                className="h-20 md:h-24 text-slate-900"
              />
              <motion.p
                className="text-[11px] tracking-[0.28em] uppercase font-medium text-slate-400"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.25 }}
              >
                Phát triển &amp; Quản trị Web
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
