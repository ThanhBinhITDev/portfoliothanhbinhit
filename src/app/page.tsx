"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { LiquidBackground } from "@/components/ui/liquid-background";
import { BentoCard } from "@/components/ui/bento-card";
import { ArrowRight, ArrowUpRight, CheckCircle2, Check, Clock, Code2, Layers, Lightbulb, MonitorSmartphone, Settings, Zap } from "lucide-react";
import { HelloLoader } from "@/components/hello-loader";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const WorkflowStepItem = ({ step, index, progress, total }: any) => {
  const threshold = index / (total - 1); // 0, 0.25, 0.5, 0.75, 1
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(progress, "change", (latest: number) => {
    // Light up slightly early
    const active = latest >= threshold - 0.1;
    if (active !== isActive) setIsActive(active);
  });

  return (
    <div className={cn(
      "relative flex flex-col items-center w-[85vw] sm:w-[320px] md:w-[380px] shrink-0 transition-all duration-700",
      isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-8 grayscale"
    )}>
      {/* Circle (Centered over the absolute horizontal line) */}
      {/* Added z-20 and solid background to ensure line passes BEHIND the circle */}
      <div className={cn(
        "flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg md:text-xl border-[4px] transition-all duration-700 relative z-20",
        isActive
          ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/40 scale-110"
          : "bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-400"
      )}>
        {step.num}
      </div>

      {/* Vertical connector from circle to card */}
      <div className={cn(
        "w-[2px] h-8 md:h-12 transition-colors duration-700 bg-transparent" // Invisible line since the circle touches the track
      )} />

      {/* Content Card */}
      <div className={cn(
        "w-full flex-1 flex flex-col p-6 md:p-8 rounded-[32px] border transition-all duration-700 bg-white dark:bg-zinc-900/90 backdrop-blur-xl shadow-lg relative overflow-hidden text-center",
        isActive
          ? "border-blue-500/50 shadow-blue-500/20"
          : "border-slate-100 dark:border-zinc-800/60 shadow-black/5"
      )}>
        {/* Top active indicator highlight */}
        <div className={cn(
          "absolute top-0 left-8 right-8 h-[3px] rounded-b-full transition-opacity duration-700",
          isActive ? "bg-blue-500 opacity-100" : "opacity-0"
        )} />

        <p className={cn("text-[10px] md:text-xs font-bold tracking-wider mb-2 uppercase transition-colors duration-700", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400")}>{step.badge}</p>
        <h3 className={cn("text-xl md:text-2xl font-bold mb-2 tracking-tight transition-colors duration-700 line-clamp-2", isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>{step.title}</h3>
        <p className={cn("text-sm font-semibold mb-3 transition-colors duration-700", isActive ? "text-blue-600/80 dark:text-blue-400/80" : "text-slate-500")}>{step.subtitle}</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">{step.desc}</p>
      </div>
    </div>
  )
}

const StickyWorkflow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        // Calculate max horizontal translate to make right edge visible
        setScrollRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };

    updateRange();
    window.addEventListener("resize", updateRange);

    // Timeout to catch layout shifts from fonts or images
    const timeout = setTimeout(updateRange, 500);
    return () => {
      window.removeEventListener("resize", updateRange);
      clearTimeout(timeout);
    };
  }, []);

  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const steps = [
    {
      num: "01", badge: "GIAI ĐOẠN 1", title: "Khám phá & Định hình", subtitle: "Thấu hiểu mục tiêu",
      desc: "Nghiên cứu kỹ lưỡng insight, thấu hiểu trọn vẹn mục tiêu kinh doanh và vẽ ra lộ trình tối ưu."
    },
    {
      num: "02", badge: "GIAI ĐOẠN 2", title: "Thiết kế Trải nghiệm", subtitle: "Sáng tạo UI/UX",
      desc: "Xây dựng hệ thống giao diện tinh tế theo chuẩn Apple Design, ưu tiên sự tối giản và mượt mà."
    },
    {
      num: "03", badge: "GIAI ĐOẠN 3", title: "Phát triển Hệ thống", subtitle: "Tiến hành code",
      desc: "Lập trình an toàn, ưu việt với React/Next.js. Đảm bảo cấu trúc chuẩn SEO, hiệu suất khung hình 60fps."
    },
    {
      num: "04", badge: "GIAI ĐOẠN 4", title: "Kiểm thử nền tảng", subtitle: "QA đa thiết bị",
      desc: "Chạy kiểm duyệt khắt khe qua nhiều kịch bản, bao quát đa nền tảng từ mobile đến siêu màn hình."
    },
    {
      num: "05", badge: "GIAI ĐOẠN 5", title: "Khởi chạy & Mở rộng", subtitle: "Sẵn sàng scale",
      desc: "Bàn giao mã nguồn hoàn chỉnh, sẵn sàng bảo trì, hỗ trợ 24/7 đón nhận lượng truy cập khổng lồ."
    }
  ];

  return (
    <section ref={containerRef} id="workflow-sticky" className="w-full relative bg-slate-50/50 dark:bg-zinc-950 h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">

        {/* Fixed Header Layer */}
        <div className="absolute top-16 md:top-24 left-0 w-full px-4 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4 md:mb-6 flex items-center gap-2"
          >
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Live Progress Track</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4 text-slate-900 dark:text-white"
          >
            Quy trình <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">Làm việc</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 text-sm md:text-base lg:text-lg max-w-md mx-auto leading-relaxed"
          >
            Cuộn màn hình để theo dõi 5 giai đoạn phát triển biến ý tưởng thành hệ thống số đẳng cấp.
          </motion.p>
        </div>

        {/* Horizontal Moving Track */}
        <div className="w-full h-full flex items-center pt-32 md:pt-48 pb-10">
          <motion.div
            className="flex items-start w-max"
            style={{ x: xTransform }}
            ref={trackRef}
          >
            <div className="relative flex gap-8 md:gap-16 px-[10vw] md:px-[15vw]">

              {/* Static Background Line (Z-index 0) */}
              <div className="absolute top-6 md:top-8 -translate-y-1/2 left-0 right-0 h-[3px] bg-slate-200 dark:bg-zinc-800/80 rounded-full z-0" />

              {/* Dynamic Fill Line (Z-index 10) */}
              <motion.div
                className="absolute top-6 md:top-8 -translate-y-1/2 left-0 h-[4px] bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full origin-left z-10 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                style={{ scaleX: scrollYProgress, width: "100%" }}
              />

              {/* Step Items (Circle indicator must be Z-index 20+) */}
              {steps.map((step, i) => (
                <WorkflowStepItem key={i} step={step} index={i} progress={scrollYProgress} total={steps.length} />
              ))}

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 } as const
  },
};

const hoverScale = {
  scale: 1.02,
  y: -5,
  transition: { type: "spring", stiffness: 400, damping: 25 } as const
} as const;

export default function Home() {

  return (
    <>
      <HelloLoader />
      <LiquidBackground />
      <div className="flex flex-col items-center w-full pb-24 space-y-16 md:space-y-32">
        {/* Hero Section Redesigned */}
        <section className="relative z-10 pt-20 md:pt-24 pb-10 md:pb-16 px-4 sm:px-6 min-h-screen flex items-start md:items-center justify-center w-full">
          <div className="max-w-6xl w-full">
            <div className="glass-panel p-6 sm:p-8 md:p-10 lg:p-12 xl:p-24 rounded-[2.5rem] md:rounded-[4rem] text-center relative" data-purpose="hero-container">
              {/* Subtle Glow behind text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

              {/* ─── Floating Ambient SVG Decorations ─── */}
              {/* Top Left – spinning blue circle outline */}
              <motion.div
                className="absolute top-6 left-6 w-10 h-10 pointer-events-none opacity-30 dark:opacity-20"
                animate={{ y: [0, -14, 0], rotate: [0, 180, 360] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 4" /></svg>
              </motion.div>

              {/* Top Right – floating triangle */}
              <motion.div
                className="absolute top-8 right-8 w-8 h-8 pointer-events-none opacity-25 dark:opacity-15"
                animate={{ y: [0, 12, 0], x: [0, 6, 0], rotate: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              >
                <svg viewBox="0 0 32 32" fill="none"><polygon points="16,2 30,28 2,28" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" /></svg>
              </motion.div>

              {/* Centre Left – floating plus/cross */}
              <motion.div
                className="absolute left-6 top-1/2 w-8 h-8 pointer-events-none opacity-20 dark:opacity-15 -translate-y-1/2 hidden md:block"
                animate={{ y: [0, -10, 0], rotate: [0, 90, 180] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
              >
                <svg viewBox="0 0 32 32" fill="none"><line x1="16" y1="2" x2="16" y2="30" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" /><line x1="2" y1="16" x2="30" y2="16" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" /></svg>
              </motion.div>

              {/* Centre Right – floating diamond */}
              <motion.div
                className="absolute right-6 top-1/2 w-8 h-8 pointer-events-none opacity-20 dark:opacity-15 -translate-y-1/2 hidden md:block"
                animate={{ y: [0, 14, 0], rotate: [0, 45, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
              >
                <svg viewBox="0 0 32 32" fill="none"><rect x="8" y="8" width="16" height="16" stroke="#f59e0b" strokeWidth="2" transform="rotate(45 16 16)" /></svg>
              </motion.div>

              {/* Bottom Left – floating small filled circle */}
              <motion.div
                className="absolute bottom-8 left-10 w-5 h-5 pointer-events-none opacity-30 dark:opacity-20 hidden sm:block"
                animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
              >
                <svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="#34d399" fillOpacity="0.7" /></svg>
              </motion.div>

              {/* Bottom Right – floating star */}
              <motion.div
                className="absolute bottom-10 right-10 w-7 h-7 pointer-events-none opacity-25 dark:opacity-15 hidden sm:block"
                animate={{ y: [0, -12, 0], rotate: [0, 60, 0] }}
                transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 3 }}
              >
                <svg viewBox="0 0 28 28" fill="none"><polygon points="14,2 17,10 26,10 19,15 22,24 14,19 6,24 9,15 2,10 11,10" fill="#f472b6" fillOpacity="0.6" /></svg>
              </motion.div>

              {/* Tech Badge */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 mb-4 md:mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Kỹ sư Phần mềm & Kiến trúc sư Web</span>
              </motion.div>

              {/* Logo/Title Branding */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center justify-center mb-4 md:mb-6 gap-2 md:gap-4"
              >
                {/* Logo floats gently up and down */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                >
                  <BrandLogo className="w-12 md:w-16 lg:w-20 h-auto text-slate-900 dark:text-white" />
                </motion.div>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-gradient-hero opacity-90">
                  thanhbinhit
                </h2>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.2] pb-3 md:pb-4 text-gradient-display mb-4 md:mb-6"
              >
                Xin chào bạn!
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                variants={itemVariants}
                className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg xl:text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-6 md:mb-8 px-2"
              >
                Xây dựng web cùng <strong className="text-slate-900 dark:text-white font-semibold">thanhbinhit</strong> — khẳng định <span className="text-slate-800 dark:text-slate-200">thương hiệu</span>, phát triển <span className="text-slate-800 dark:text-slate-200">doanh nghiệp</span> của bạn.
              </motion.p>

              {/* Interactive CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 w-full sm:w-auto rounded-full bg-slate-900 dark:bg-white dark:text-black font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-slate-900/20 dark:shadow-white/5"
                >
                  Bắt đầu dự án
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 w-full sm:w-auto rounded-full bg-white/50 dark:bg-white/10 border border-slate-200 dark:border-white/10 font-bold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-100 dark:hover:bg-white/20 hover:border-slate-300 active:scale-95"
                >
                  Xem sản phẩm
                </motion.button>
              </motion.div>

              {/* Trusted Tech Stacks */}
              <motion.div
                variants={itemVariants}
                className="hidden xl:block mt-10 xl:mt-16 pt-8 xl:pt-12 border-t border-slate-200/50 dark:border-white/10"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 dark:text-slate-400 mb-6">Chuyên môn trong các công nghệ hiện đại</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-40 hover:opacity-100 transition-all duration-500">
                  <span className="text-sm font-bold">React.js</span>
                  <span className="text-sm font-bold">Next.js</span>
                  <span className="text-sm font-bold">Node.js</span>
                  <span className="text-sm font-bold">PostgreSQL</span>
                  <span className="text-sm font-bold">TailwindCSS</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects: Bento Grid */}
        <section id="projects" className="w-full max-w-6xl px-4 lg:px-8">
          <div className="mb-12 relative">
            {/* Floating SVG deco – left wavy line */}
            <motion.div
              className="absolute -left-8 top-0 w-6 h-20 opacity-20 dark:opacity-10 pointer-events-none hidden lg:block"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 80" fill="none"><path d="M12 5 C4 20 20 35 12 50 C4 65 20 75 12 80" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" /></svg>
            </motion.div>
            {/* Floating SVG deco – right 3×3 dots grid */}
            <motion.div
              className="absolute -right-8 top-2 w-10 h-10 opacity-20 dark:opacity-10 pointer-events-none hidden lg:block"
              animate={{ y: [0, 10, 0], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            >
              <svg viewBox="0 0 40 40" fill="none">
                {[0, 13, 26].map(cx => [0, 13, 26].map(cy => <circle key={`${cx}-${cy}`} cx={cx + 7} cy={cy + 7} r="3" fill="#8b5cf6" />))}
              </svg>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 font-display text-gradient-display leading-[1.2] pb-4">Dự án chọn lọc.</h2>
              <p className="text-slate-500 text-base md:text-xl">Dự án tiêu biểu ứng dụng sự hài hòa của Hệ thống Thiết kế Apple.</p>
            </motion.div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[340px] gap-3 md:gap-6">
            {/* Large Feature Card - E-Commerce Platform */}
            <BentoCard
              colSpan={2}
              rowSpan={2}
              className="bg-gradient-to-br from-slate-50 to-zinc-100 dark:from-zinc-900/40 dark:to-zinc-950/40 border-slate-200/50 dark:border-white/5"
              whileHover={hoverScale}
            >
              <div className="flex flex-col h-full justify-between p-2">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-700">
                      🛒 Thương mại điện tử
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Live
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 font-display">Nền tảng Thương mại<br />điện tử Lumina Shop</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm md:text-base leading-relaxed mb-4">Hệ thống B2C quy mô lớn với Headless CMS, Next.js 14 và Stripe. Tốc độ tải dưới 800ms, LCP đạt chuẩn Core Web Vitals.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js 14", "TypeScript", "Stripe", "PostgreSQL", "TailwindCSS"].map(tag => (
                      <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-300">{tag}</span>
                    ))}
                  </div>
                </div>
                {/* Mock Browser UI */}
                <div className="w-full h-40 md:h-52 bg-white dark:bg-zinc-900 rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden mt-4 shadow-xl">
                  <div className="w-full h-8 bg-slate-100 dark:bg-zinc-800 flex items-center px-3 gap-2 border-b border-slate-200 dark:border-zinc-700 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="ml-2 flex-1 h-4 bg-slate-200 dark:bg-zinc-700 rounded-full max-w-48 text-[8px] flex items-center px-2 text-slate-400">lumina-shop.vn</div>
                  </div>
                  <div className="p-3 grid gap-2">
                    <div className="flex gap-2">
                      <div className="w-24 h-5 bg-gradient-to-r from-emerald-400/40 to-teal-400/40 rounded-full" />
                      <div className="w-16 h-5 bg-slate-100 dark:bg-zinc-700 rounded-full" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map(i => <div key={i} className={`h-16 rounded-xl ${i === 1 ? 'bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 border border-emerald-300/20' : 'bg-slate-100 dark:bg-zinc-700/50'}`} />)}
                    </div>
                    <div className="flex gap-2">
                      <div className="h-4 w-20 bg-slate-100 dark:bg-zinc-700/50 rounded-full" />
                      <div className="h-4 w-28 bg-slate-100 dark:bg-zinc-700/50 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Tall Card - Mobile App (ZenTask) */}
            <BentoCard
              colSpan={1}
              rowSpan={2}
              className="border-transparent overflow-hidden"
              style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 60%, #1e3a5f 100%)" }}
              whileHover={hoverScale}
            >
              <div className="flex flex-col h-full p-2 relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="p-3 bg-blue-500/20 backdrop-blur-md shadow-sm w-fit rounded-2xl mb-5 border border-blue-400/30">
                  <MonitorSmartphone className="w-6 h-6 text-blue-300" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-300 mb-2">Ứng dụng di động</span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 font-display leading-tight text-white">ZenTask – App Quản lý Công việc</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">Ứng dụng React Native tích hợp AI phân loại ưu tiên, đồng bộ real-time trên mọi thiết bị.</p>
                <div className="flex flex-col gap-2 mt-auto">
                  {["React Native", "Firebase", "OpenAI API"].map(tag => (
                    <span key={tag} className="text-[10px] font-semibold w-fit px-2.5 py-1 rounded-lg bg-blue-500/20 border border-blue-400/40 text-sky-200">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-sky-300 text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
                  </span>
                  4,200+ người dùng hoạt động
                </div>
              </div>
            </BentoCard>

            {/* Small Card - Booking System (BookFlow) */}
            <BentoCard
              colSpan={1}
              rowSpan={1}
              className="border-transparent overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0d9488 0%, #059669 100%)" }}
              whileHover={hoverScale}
            >
              <div className="flex flex-col h-full justify-between p-2 relative">
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-100 bg-white/20 px-2 py-0.5 rounded-full">📅 SaaS</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 font-display text-white">BookFlow – Đặt lịch thông minh</h3>
                  <p className="text-white/80 text-sm font-medium leading-relaxed">CRM + Booking + Tự động nhắc lịch qua Zalo/SMS.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Đang chạy</span>
                  </div>
                  <div className="flex gap-1">
                    {["Next.js", "Zalo API"].map(t => <span key={t} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/20 border border-white/30 text-white">{t}</span>)}
                  </div>
                </div>
              </div>
            </BentoCard>
            {/* Wide Card - Dashboard */}
            <BentoCard
              colSpan={2}
              rowSpan={1}
              className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border-purple-200/30 dark:border-purple-800/20"
              whileHover={hoverScale}
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full gap-6 p-2">
                <div className="max-w-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-2 block">📊 Analytics Dashboard</span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 font-display">DataVault – Trực quan hoá Dữ liệu</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Dashboard real-time với biểu đồ tương tác, hỗ trợ xuất báo cáo PDF và tích hợp Google Analytics 4.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto shrink-0">
                  {[
                    { label: "Orders", value: "2,341", color: "from-purple-400 to-indigo-400" },
                    { label: "Revenue", value: "₫1.2B", color: "from-emerald-400 to-cyan-400" },
                    { label: "Users", value: "18.4K", color: "from-pink-400 to-rose-400" }
                  ].map((stat, i) => (
                    <div key={i} className="flex-1 md:w-24 h-24 md:h-28 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 shadow-sm flex flex-col items-center justify-center p-2 text-center">
                      <div className={`text-lg md:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br ${stat.color}`}>{stat.value}</div>
                      <div className="text-[9px] md:text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>
        </section>


        <StickyWorkflow />

        {/* Apple-style Bento Grid Features Section */}
        <section id="features" className="w-full max-w-6xl px-4 lg:px-8 py-24 relative">
          {/* ─── Background ambient floating SVGs for Features section ─── */}
          <motion.div
            className="absolute -top-8 -left-16 w-32 h-32 opacity-5 dark:opacity-[0.03] pointer-events-none hidden xl:block"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" fill="none">
              <polygon points="50,5 95,27 95,72 50,95 5,72 5,27" stroke="#6366f1" strokeWidth="2" />
              <polygon points="50,18 82,34 82,66 50,82 18,66 18,34" stroke="#8b5cf6" strokeWidth="1.5" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-0 -right-12 w-40 h-40 opacity-[0.04] dark:opacity-[0.02] pointer-events-none hidden xl:block"
            animate={{ rotate: [360, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="45" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="8 4" />
              <circle cx="50" cy="50" r="30" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4 6" />
            </svg>
          </motion.div>
          {/* Floating zigzag line top-right */}
          <motion.div
            className="absolute top-10 right-4 w-16 h-24 opacity-15 dark:opacity-10 pointer-events-none hidden lg:block"
            animate={{ y: [0, -14, 0], x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 40 80" fill="none">
              <polyline points="8,0 32,16 8,32 32,48 8,64 32,80" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          {/* Floating arc bottom-left */}
          <motion.div
            className="absolute bottom-16 left-0 w-14 h-14 opacity-15 dark:opacity-10 pointer-events-none hidden lg:block"
            animate={{ y: [0, 12, 0], rotate: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
          >
            <svg viewBox="0 0 56 56" fill="none">
              <path d="M8 48 Q28 8 48 48" stroke="#34d399" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>
          <div className="flex flex-col items-center text-center mb-16 px-4 relative">
            {/* Floating sparkle top-left of heading */}
            <motion.div
              className="absolute -left-6 top-2 w-6 h-6 pointer-events-none opacity-40 dark:opacity-25 hidden md:block"
              animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.5 10H22L15.5 15L18 23L12 18L6 23L8.5 15L2 10H10.5Z" fill="#fbbf24" fillOpacity="0.8" />
              </svg>
            </motion.div>
            {/* Floating sparkle top-right of heading */}
            <motion.div
              className="absolute -right-6 top-4 w-5 h-5 pointer-events-none opacity-35 dark:opacity-20 hidden md:block"
              animate={{ y: [0, 10, 0], rotate: [0, -120, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
            >
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="3" fill="#60a5fa" />
                <line x1="10" y1="2" x2="10" y2="5" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="10" y1="15" x2="10" y2="18" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="2" y1="10" x2="5" y2="10" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="15" y1="10" x2="18" y2="10" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-3 py-1 rounded-full bg-apple-blue/10 dark:bg-apple-blue/20 border border-apple-blue/20 dark:border-apple-blue/30 mb-6"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-apple-blue">Đặc quyền</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gradient-display mb-6"
            >
              Sức mạnh của Sự tinh tế.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-lg md:text-xl text-slate-500 dark:text-slate-400"
            >
              Chúng tôi tập trung vào những chi tiết nhỏ nhất để tạo ra những trải nghiệm lớn nhất, mang chuẩn mực quốc tế vào từng dòng mã.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: "Hiệu suất Siêu việt",
                desc: "Tối ưu hóa đến từng ms, đảm bảo ứng dụng của bạn luôn phản hồi tức thì dưới mọi tải trọng.",
                icon: Zap,
                percentage: "99.9%",
                gradient: "from-orange-400 to-rose-400",
                delay: 0
              },
              {
                title: "Trải nghiệm Tĩnh lặng",
                desc: "Ngôn ngữ thiết kế tối giản, loại bỏ mọi sự xao nhãng để tập trung vào giá trị cốt lõi.",
                icon: Layers,
                percentage: "100%",
                gradient: "from-emerald-400 to-teal-400",
                delay: 0.1
              },
              {
                title: "Bảo mật Tuyệt đối",
                desc: "Kiến trúc phòng thủ đa lớp, bảo vệ dữ liệu của bạn và khách hàng một cách an toàn nhất.",
                icon: Settings,
                percentage: "256-bit",
                gradient: "from-blue-400 to-indigo-400",
                delay: 0.2
              },
              {
                title: "Tương thích Tối đa",
                desc: "Giao diện thích ứng hoàn hảo trên mọi kích thước màn hình, từ smartphone đến desktop.",
                icon: MonitorSmartphone,
                percentage: "iOS/Android",
                gradient: "from-pink-400 to-purple-400",
                delay: 0.3
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative glass-panel p-8 md:p-10 rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 dark:shadow-white/5 border border-white/40 dark:border-white/5"
              >
                {/* Pill Badge Percentage */}
                <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/5 dark:border-white/10">
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{feature.percentage}</span>
                </div>

                <div className="flex flex-col h-full">
                  {/* Icon Box */}
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-10 bg-gradient-to-br shadow-inner",
                    feature.gradient
                  )}>
                    <feature.icon className="w-8 h-8 text-white drop-shadow-md" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-apple-blue transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </div>

                {/* Subtle background glow on hover */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-apple-blue/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Partners / Logo Cloud Section */}
        <section id="partners" className="w-full max-w-6xl px-4 lg:px-8 py-20 border-y border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-zinc-900/10">
          <div className="flex flex-col items-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-12"
            >
              Đồng hành cùng chúng tôi
            </motion.h2>

            {/* Logo Grid */}
            <div className="w-full max-w-5xl mx-auto overflow-hidden">
              {/* 
                Desktop: CSS Grid (5 columns)
                Mobile: Horizontal Scroll Snap (flex + overflow-x-auto)
              */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex md:grid grid-cols-5 gap-8 md:gap-x-12 md:gap-y-16 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 md:pb-0 px-4 md:px-0"
              >
                {[
                  // Fictional: Lumina
                  <svg key="lumina" viewBox="0 0 200 60" className="h-full w-auto max-w-[140px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="16" fill="url(#gradLumina)" />
                    <path d="M30 14 L40 30 L30 46 L20 30 Z" fill="white" opacity="0.8" />
                    <text x="55" y="42" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="32" fill="#2d3748">Lumina</text>
                    <defs>
                      <linearGradient id="gradLumina" x1="14" y1="14" x2="46" y2="46" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F6E05E" />
                        <stop offset="1" stopColor="#ED8936" />
                      </linearGradient>
                    </defs>
                  </svg>,
                  // Fictional: NexaCore
                  <svg key="nexacore" viewBox="0 0 200 60" className="h-full w-auto max-w-[150px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="20" width="20" height="20" rx="6" fill="#4299E1" transform="rotate(45 30 30)" />
                    <rect x="35" y="20" width="20" height="20" rx="6" fill="#3182CE" transform="rotate(45 45 30)" />
                    <text x="70" y="40" fontFamily="sans-serif" fontWeight="800" fontSize="28" fill="#2B6CB0">NexaCore</text>
                  </svg>,
                  // Fictional: Zenith Dynamics
                  <svg key="zenith" viewBox="0 0 200 60" className="h-full w-auto max-w-[160px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 45 L40 15 L55 45 L45 45 L40 35 L35 45 Z" fill="#9F7AEA" />
                    <path d="M40 35 L45 45 L50 35 Z" fill="#B794F4" />
                    <text x="65" y="42" fontFamily="serif" fontStyle="italic" fontWeight="900" fontSize="30" fill="#6B46C1">Zenith</text>
                  </svg>,
                  // Fictional: AeroSpace
                  <svg key="aero" viewBox="0 0 200 60" className="h-full w-auto max-w-[130px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 30 Q35 15 50 30 T80 30" stroke="#38B2AC" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <circle cx="50" cy="30" r="8" fill="#2C7A7B" />
                    <text x="90" y="40" fontFamily="sans-serif" fontWeight="700" fontSize="26" fill="#285E61">Aero</text>
                  </svg>,
                  // Fictional: Vertex
                  <svg key="vertex" viewBox="0 0 200 60" className="h-full w-auto max-w-[140px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="40,15 55,40 25,40" fill="#ED64A6" opacity="0.8" />
                    <polygon points="40,25 65,40 40,40" fill="#D53F8C" />
                    <text x="75" y="40" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="28" fill="#B83280">VERTEX</text>
                  </svg>,
                  // Fictional: Echo AI
                  <svg key="echo" viewBox="0 0 200 60" className="h-full w-auto max-w-[140px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="14" stroke="#4FD1C5" strokeWidth="4" fill="none" />
                    <circle cx="30" cy="30" r="6" fill="#319795" />
                    <path d="M45 20 A 15 15 0 0 1 45 40" stroke="#4FD1C5" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M55 15 A 25 25 0 0 1 55 45" stroke="#319795" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <text x="70" y="42" fontFamily="sans-serif" fontWeight="800" fontSize="30" fill="#285E61">echo</text>
                  </svg>,
                  // Fictional: Strata
                  <svg key="strata" viewBox="0 0 200 60" className="h-full w-auto max-w-[130px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="25" y="25" width="30" height="8" rx="4" fill="#F56565" />
                    <rect x="35" y="15" width="20" height="8" rx="4" fill="#C53030" />
                    <rect x="15" y="35" width="40" height="8" rx="4" fill="#E53E3E" />
                    <text x="65" y="40" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="#9B2C2C">Strata</text>
                  </svg>,
                  // Fictional: OmniFlow
                  <svg key="omni" viewBox="0 0 200 60" className="h-full w-auto max-w-[150px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35 15 A 15 15 0 1 0 50 30" stroke="#ECC94B" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M25 45 A 15 15 0 0 0 40 30" stroke="#D69E2E" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <text x="60" y="40" fontFamily="sans-serif" fontWeight="800" fontSize="28" fill="#B7791F">OmniFlow</text>
                  </svg>,
                  // Fictional: Prism
                  <svg key="prism" viewBox="0 0 200 60" className="h-full w-auto max-w-[140px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="35,15 50,45 20,45" fill="#4299E1" />
                    <polygon points="35,15 42,30 28,30" fill="white" opacity="0.5" />
                    <polygon points="42,30 50,45 35,45" fill="#2B6CB0" />
                    <text x="60" y="42" fontFamily="serif" fontWeight="800" fontSize="32" fill="#2A4365">Prism</text>
                  </svg>,
                  // Fictional: Catalyst
                  <svg key="catalyst" viewBox="0 0 200 60" className="h-full w-auto max-w-[150px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 20 C45 20 45 40 60 40" stroke="#48BB78" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <circle cx="30" cy="20" r="5" fill="#2F855A" />
                    <circle cx="60" cy="40" r="5" fill="#276749" />
                    <text x="75" y="40" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="#22543D">Catalyst</text>
                  </svg>,
                ].map((logo, i) => (
                  <div
                    key={i}
                    className="snap-center shrink-0 w-[140px] md:w-auto h-20 flex items-center justify-center group cursor-pointer"
                  >
                    <div className="transition-all duration-300 ease-out hover:scale-105 hover:drop-shadow-md flex items-center justify-center w-full h-full opacity-90 hover:opacity-100">
                      {logo}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Giải pháp thiết kế website</span>
            </motion.div>
          </div>
        </section>

        {/* Advanced Services Section */}
        <section id="services" className="w-full max-w-6xl px-4 lg:px-8 py-24 relative">
          {/* Floating code bracket left */}
          <motion.div
            className="absolute top-16 -left-10 w-10 h-16 opacity-10 dark:opacity-[0.07] pointer-events-none hidden lg:block"
            animate={{ y: [0, -16, 0], x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 40 64" fill="none">
              <path d="M28 4 L12 12 L12 32 L28 40" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M28 40 L12 48 L12 52 L28 60" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          {/* Floating gear right */}
          <motion.div
            className="absolute top-12 -right-6 w-12 h-12 opacity-[0.07] dark:opacity-[0.05] pointer-events-none hidden lg:block"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          >
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="8" stroke="#f59e0b" strokeWidth="2" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <rect key={i} x="22" y="2" width="4" height="8" rx="2" fill="#f59e0b" fillOpacity="0.8" transform={`rotate(${deg} 24 24)`} />
              ))}
            </svg>
          </motion.div>
          {/* Floating squiggle bottom */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-8 opacity-10 dark:opacity-[0.06] pointer-events-none hidden md:block"
            animate={{ x: [-8, 8, -8], y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 128 32" fill="none">
              <path d="M0 16 Q16 4 32 16 Q48 28 64 16 Q80 4 96 16 Q112 28 128 16" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
            >
              <span className="text-slate-900 dark:text-white">Dịch vụ </span>
              <span className="text-gradient-hero">cung cấp</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl"
            >
              Giải pháp số toàn diện, thiết kế riêng để khẳng định vị thế thương hiệu của bạn trên Internet.
            </motion.p>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: Code2,
                title: "Thiết kế & Phát triển Web",
                desc: "Xây dựng website chuẩn SEO, tốc độ cao với kiến trúc hiện đại (Next.js, React).",
                features: ["Landing Page chuyển đổi cao", "Website Doanh nghiệp", "Tối ưu hóa Core Web Vitals"],
                gradient: "from-pink-500 to-rose-400",
                textColor: "text-rose-500",
                bgLight: "bg-rose-50"
              },
              {
                icon: Layers,
                title: "Phát triển Ứng dụng Quản lý",
                desc: "Hệ thống SaaS, CRM, quản trị nội bộ linh hoạt, mở rộng không giới hạn.",
                features: ["Dashboard đa chiều", "Kiến trúc Microservices", "Tích hợp API/Thanh toán"],
                gradient: "from-blue-500 to-indigo-400",
                textColor: "text-blue-500",
                bgLight: "bg-blue-50"
              },
              {
                icon: MonitorSmartphone,
                title: "Thiết kế UI/UX Đột phá",
                desc: "Tạo ra những trải nghiệm mượt mà, tĩnh lặng theo triết lý Apple Design.",
                features: ["Wireframe & Prototyping", "Thiết kế đa nền tảng", "Animation mượt mà (60fps)"],
                gradient: "from-emerald-500 to-teal-400",
                textColor: "text-emerald-500",
                bgLight: "bg-emerald-50"
              },
              {
                icon: Settings,
                title: "Vận hành & Tối ưu Hệ thống",
                desc: "Bảo mật dự án nghiêm ngặt, tự động hóa quy trình triển khai (CI/CD).",
                features: ["Quản lý Server Cloud", "Giám sát thời gian thực", "Kiểm thử & Bảo mật 256-bit"],
                gradient: "from-orange-500 to-amber-400",
                textColor: "text-orange-500",
                bgLight: "bg-orange-50"
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative flex flex-col p-8 md:p-10 rounded-[36px] bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-500 cursor-pointer overflow-hidden glass-panel"
              >
                {/* Top Left Icon Container */}
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner bg-gradient-to-br", service.gradient)}>
                  <service.icon className="w-8 h-8 text-white drop-shadow-sm" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-slate-700 dark:group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8">
                    {service.desc}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className={cn("w-5 h-5 shrink-0", service.textColor)} />
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Right Arrow Button */}
                <div className="absolute bottom-8 right-8">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    "bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700",
                    "group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:scale-110",
                    "shadow-sm group-hover:shadow-md"
                  )}>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-white dark:group-hover:text-black transition-colors" />
                  </div>
                </div>

                {/* Subtle hover glow matching service brand */}
                <div className={cn(
                  "absolute top-0 right-0 w-64 h-64 opacity-0 group-hover:opacity-10 blur-[80px] rounded-full transition-opacity duration-700 pointer-events-none",
                  service.bgLight
                )} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA (Call To Action) Section - Hybrid Pastel Glass Style */}
        <section id="cta" className="w-full max-w-6xl mx-auto px-4 lg:px-8 py-16 md:py-32 lg:py-48 relative z-10 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative rounded-[3rem] overflow-hidden bg-white/40 dark:bg-zinc-950/40 glass-panel backdrop-blur-3xl border border-black/5 dark:border-white/5 py-24 md:py-32 lg:py-40 text-center flex flex-col items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)]"
          >
            {/* Mesh Gradient Background Layer (Purple, Pink, Blue) */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-100/50 via-purple-100/50 to-pink-100/50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 opacity-80" />

            {/* Central Glow Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/60 dark:bg-black/40 blur-[100px] rounded-full z-0 pointer-events-none" />

            {/* Floating Pastel Capsules (Background Elements) */}
            {/* Top Left - Blueish */}
            <motion.div
              animate={{ y: [0, -30, 0], rotate: [-10, -15, -10] }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
              className="absolute top-[-10%] left-[5%] w-48 h-24 lg:w-64 lg:h-32 bg-blue-300/40 dark:bg-blue-600/30 rounded-full blur-[40px] z-0 pointer-events-none"
            />
            {/* Mid Right - Pinkish/Orange */}
            <motion.div
              animate={{ y: [0, 40, 0], x: [0, 20, 0], rotate: [15, 20, 15] }}
              transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 1 }}
              className="absolute top-[30%] right-[-5%] w-56 h-32 lg:w-80 lg:h-40 bg-pink-300/40 dark:bg-pink-600/30 rounded-full blur-[50px] z-0 pointer-events-none"
            />
            {/* Bottom Left - Mint Green */}
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, -15, 0], rotate: [25, 20, 25] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[-5%] left-[10%] w-40 h-20 lg:w-56 lg:h-28 bg-emerald-200/40 dark:bg-emerald-600/30 rounded-full blur-[40px] z-0 pointer-events-none"
            />
            {/* Bottom Right - Purple */}
            <motion.div
              animate={{ y: [0, 25, 0], rotate: [-20, -25, -20] }}
              transition={{ repeat: Infinity, duration: 14, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[5%] right-[20%] w-32 h-16 lg:w-48 lg:h-24 bg-purple-300/50 dark:bg-purple-600/40 rounded-full blur-[35px] z-0 pointer-events-none"
            />

            {/* Main Content Area */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-3xl px-6 md:px-12">

              {/* Badge */}
              <span className="px-5 py-1.5 rounded-full bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#86868b] dark:text-slate-300 mb-8 md:mb-12 backdrop-blur-md shadow-sm">
                Thiết kế cao cấp
              </span>

              {/* Title Header */}
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-2 leading-[1.1] flex flex-col md:block items-center">
                <span>Website </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-800 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 pr-2">Sang - Xịn</span>
              </h2>

              {/* Subtitle (directly under title, light gray, non-italic) */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-[#86868b] dark:text-slate-400 mb-10 md:mb-12 tracking-wide">
                Tại sao không?
              </h3>

              {/* Description (Smaller size, forced 2 lines, bold black keywords) */}
              <p className="text-sm md:text-base lg:text-lg text-[#86868b] dark:text-slate-400 w-full mb-12 md:mb-16 leading-[1.8] font-normal">
                Đưa thương hiệu của bạn lên một tầm cao mới với trải nghiệm số <span className="text-[#1d1d1f] dark:text-white font-bold">khác biệt</span>, đảm bảo <span className="text-[#1d1d1f] dark:text-white font-bold">tốc độ</span> bứt phá và mang lại hiệu quả đầu tư <span className="text-[#1d1d1f] dark:text-white font-bold">tối đa</span>.
              </p>

              {/* Actions Box */}
              <div className="flex flex-col items-center justify-center gap-6 w-full">
                {/* Primary Button (Vibrant gradient, wide shadow restored) */}
                <a href="#contact" className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full font-semibold text-base transition-all duration-300 shadow-[0_15px_35px_-10px_rgba(59,130,246,0.6)] hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.7)] hover:-translate-y-0.5">
                  <span>Bắt đầu dự án ngay</span>
                  <ArrowRight strokeWidth={1.5} className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                {/* Sub-Action / Contact info */}
                <div className="flex flex-row items-center gap-1.5 text-xs md:text-sm text-[#86868b] font-normal mt-2">
                  <span>Hoặc liên hệ:</span>
                  <a href="mailto:work@ledinhtuan.com" className="text-[#1d1d1f] dark:text-white hover:underline underline-offset-4 transition-colors font-semibold">
                    work@ledinhtuan.com
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-6xl px-4 lg:px-8 py-16 mt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-slate-500 text-center md:text-left">
          <div className="flex items-center gap-3 font-medium">
            <BrandLogo className="w-6 h-6 text-slate-900 dark:text-white" />
            <p>© {new Date().getFullYear()} Thanh Bình IT. | All rights reserved.</p>
          </div>
          <div className="flex items-center gap-8 font-medium">
            <a href="#" className="hover:text-foreground transition-colors">Dribbble</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">Liên hệ</a>
          </div>
        </footer>
      </div>
    </>
  );
}

