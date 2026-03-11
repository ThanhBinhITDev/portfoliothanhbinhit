"use client";

import { motion, useMotionTemplate, useMotionValue, HTMLMotionProps } from "framer-motion";
import { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2 | 3;
  noGlass?: boolean;
}

export function BentoCard({ children, className, colSpan = 1, rowSpan = 1, noGlass = false, ...props }: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spanClasses = {
    col: {
      1: "md:col-span-1",
      2: "md:col-span-2",
      3: "md:col-span-3",
    },
    row: {
      1: "md:row-span-1",
      2: "md:row-span-2",
      3: "md:row-span-3",
    }
  };


  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-[calc(var(--radius-apple)+4px)]",
        !noGlass && "glass-panel",
        "transition-transform duration-500",
        spanClasses.col[colSpan],
        spanClasses.row[rowSpan],
        className
      )}
      style={{ willChange: "transform" }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 dark:group-hover:opacity-50"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.15),
              transparent 80%
            )
          `,
        }}
      />
      {/* Light mode shadow/highlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0,0,0,0.02),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative h-full w-full p-6 sm:p-8 flex flex-col z-10">
        {children}
      </div>
    </motion.div>
  );
}
