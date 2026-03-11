"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-6 py-3 rounded-2xl" data-purpose="main-nav">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity">
            <Image
              src="/logo.svg"
              alt="thanhbinhit logo"
              width={32}
              height={32}
              className="dark:invert-0"
            />
            <span>thanhbinh<span className="text-brand-teal">it</span></span>
          </Link>
        </div>
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10 font-medium text-sm text-slate-500 dark:text-slate-400">
          <Link href="#projects" className="hover:text-foreground dark:hover:text-white transition-colors">Dự án</Link>
          <Link href="#workflow" className="hover:text-foreground dark:hover:text-white transition-colors">Quy trình</Link>
          <Link href="#services" className="hover:text-foreground dark:hover:text-white transition-colors">Dịch vụ</Link>
        </div>
        {/* CTA Button & Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="mailto:contact@thanhbinhit.com"
            className="bg-slate-950 dark:bg-white dark:text-black text-white px-6 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-all shadow-md shadow-slate-950/10 block"
          >
            Liên hệ
          </Link>
        </div>
      </nav>
    </header>
  );
}
