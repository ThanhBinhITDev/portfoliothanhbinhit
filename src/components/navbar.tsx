"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#projects", label: "Dự án" },
  { href: "#workflow", label: "Quy trình" },
  { href: "#services", label: "Dịch vụ" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-4 sm:px-6 py-3 rounded-2xl"
          data-purpose="main-nav"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl sm:text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.svg"
              alt="thanhbinhit logo"
              width={28}
              height={28}
              className="dark:invert-0"
            />
            <span>
              thanhbinh<span className="text-brand-teal">it</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-500 dark:text-slate-400">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="mailto:contact@thanhbinhit.com"
              className="bg-slate-950 dark:bg-white dark:text-black text-white px-5 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-all shadow-md shadow-slate-950/10"
            >
              Liên hệ
            </Link>
          </div>

          {/* Mobile: ThemeToggle + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Mở menu"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[72px] left-4 right-4 z-40 md:hidden rounded-2xl glass-panel border border-black/5 dark:border-white/5 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-3 border-t border-black/5 dark:border-white/5">
                <Link
                  href="mailto:contact@thanhbinhit.com"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full bg-slate-950 dark:bg-white dark:text-black text-white px-5 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
                >
                  Liên hệ
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
