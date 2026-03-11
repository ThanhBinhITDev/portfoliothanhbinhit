"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { LiquidBackground } from "@/components/ui/liquid-background";
import { BentoCard } from "@/components/ui/bento-card";
import { ArrowRight, ArrowUpRight, CheckCircle2, Check, Clock, Code2, Layers, Lightbulb, MonitorSmartphone, Settings, Zap } from "lucide-react";
import { HelloLoader } from "@/components/hello-loader";
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
      <div className={cn(
        "flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg md:text-xl border-[4px] transition-all duration-700 relative z-20",
        isActive
          ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/40 scale-110"
          : "bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-400"
      )}>
        {step.num}
      </div>

      {/* Vertical connector from circle to card */}
      <div className={cn(
        "w-[2px] h-8 md:h-12 transition-colors duration-700",
        isActive ? "bg-blue-600" : "bg-slate-200 dark:bg-zinc-800"
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
            Hành trình <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">Kiến tạo</span>
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

              {/* Static Background Line */}
              {/* top-6 = 24px (half of h-12), md:top-8 = 32px (half of h-16) */}
              <div className="absolute top-6 md:top-8 -translate-y-1/2 left-[10vw] relative-line-bg right-[10vw] h-[3px] bg-slate-200 dark:bg-zinc-800 rounded-full z-0" style={{ width: "calc(100% - 20vw - 3vw)" /* approximation to stop early */ }} />
              <div className="absolute top-6 md:top-8 -translate-y-1/2 left-0 right-0 h-[3px] bg-slate-200 dark:bg-zinc-800 rounded-full z-0" />

              {/* Dynamic Fill Line */}
              <motion.div
                className="absolute top-6 md:top-8 -translate-y-1/2 left-0 h-[4px] bg-gradient-to-r from-blue-400 to-blue-600 rounded-full origin-left z-10 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                style={{ scaleX: scrollYProgress, width: "100%" }}
              />

              {/* Step Items */}
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
      <div className="flex flex-col items-center w-full pb-24 space-y-32">
        {/* Hero Section Redesigned */}
        <section className="relative z-10 pt-32 pb-20 px-6 min-h-screen flex items-center justify-center w-full">
          <div className="max-w-6xl w-full">
            <div className="glass-panel p-12 md:p-32 rounded-[4rem] text-center relative overflow-hidden" data-purpose="hero-container">
              {/* Subtle Glow behind text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

              {/* Tech Badge */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 mb-10"
              >
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Kỹ sư Phần mềm & Kiến trúc sư Web</span>
              </motion.div>

              {/* Logo/Title Branding */}
              <motion.h2
                variants={itemVariants}
                className="font-display text-3xl md:text-4xl mb-6 font-bold tracking-tight text-gradient-hero opacity-90"
              >
                thanhbinhit
              </motion.h2>

              {/* Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[1.05] text-gradient-display mb-10"
              >
                Xin chào bạn!
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                variants={itemVariants}
                className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-16"
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
                className="mt-24 pt-12 border-t border-slate-200/50 dark:border-white/10"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 font-display text-gradient-display">Dự án chọn lọc.</h2>
            <p className="text-slate-500 text-lg md:text-xl">Dự án tiêu biểu ứng dụng sự hài hòa của Hệ thống Thiết kế Apple.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[340px] gap-4 md:gap-6">
            <BentoCard
              colSpan={2}
              rowSpan={2}
              className="bg-gradient-to-br from-slate-50 to-zinc-100 dark:from-zinc-900/40 dark:to-zinc-950/40 border-slate-200/50 dark:border-white/5"
              whileHover={hoverScale}
            >
              <div className="flex flex-col h-full justify-between p-2">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Thương mại điện tử
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 font-display">Nền tảng Thương mại điện tử</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md text-base leading-relaxed mb-4">Kiến trúc Headless CMS, Next.js 14, tốc độ tải trang dưới 1 giây. Hệ thống mượt mà và trực quan.</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {["Next.js 14", "Headless CMS", "Stripe", "Vercel"].map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Browser mock */}
                <div className="w-full flex-1 min-h-40 bg-white/60 dark:bg-black/40 rounded-3xl border border-black/5 dark:border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl relative mt-4">
                  <div className="w-full h-9 bg-slate-100/70 dark:bg-white/5 flex items-center px-4 gap-2 border-b border-black/5 dark:border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-70" />
                    <div className="flex-1 mx-4 h-5 bg-white/50 dark:bg-white/5 rounded-full flex items-center px-3 gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400/60" />
                      <div className="h-1.5 w-28 rounded-full bg-slate-300/50 dark:bg-white/10" />
                    </div>
                  </div>
                  <div className="p-4 grid gap-3">
                    <div className="flex justify-between items-center">
                      <div className="h-3 w-14 rounded-full bg-slate-900/10 dark:bg-white/10" />
                      <div className="flex gap-2">
                        {[1, 2, 3].map(i => <div key={i} className="h-2 w-8 rounded-full bg-slate-300/40 dark:bg-white/5" />)}
                        <div className="h-5 w-14 rounded-full bg-blue-500/20" />
                      </div>
                    </div>
                    <div className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/20 flex items-center px-4 gap-3">
                      <div className="flex flex-col gap-1.5 flex-1">
                        <div className="h-2.5 w-2/3 rounded-full bg-slate-400/30 dark:bg-white/20" />
                        <div className="h-2 w-1/2 rounded-full bg-slate-300/30 dark:bg-white/10" />
                      </div>
                      <div className="h-7 w-16 rounded-full bg-blue-500/30" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["from-pink-100 to-rose-100 dark:from-pink-900/20", "from-amber-100 to-yellow-100 dark:from-amber-900/20", "from-emerald-100 to-teal-100 dark:from-emerald-900/20"].map((g, i) => (
                        <div key={i} className={`h-14 rounded-xl bg-gradient-to-br ${g} flex flex-col justify-end p-2 gap-1`}>
                          <div className="h-2 w-3/4 rounded-full bg-black/10 dark:bg-white/15" />
                          <div className="h-1.5 w-1/2 rounded-full bg-black/5 dark:bg-white/10" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard
              colSpan={1}
              rowSpan={2}
              className="bg-gradient-to-b from-brand-blue/5 to-indigo-500/5 border-brand-blue/10 dark:from-brand-blue/[0.05] dark:to-indigo-500/[0.03] overflow-hidden"
              whileHover={hoverScale}
            >
              <div className="flex flex-col h-full p-2">
                <div className="p-4 bg-gradient-to-br from-brand-blue to-indigo-500 shadow-lg shadow-blue-500/30 w-fit rounded-2xl mb-5">
                  <MonitorSmartphone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 font-display">Ứng dụng đa kênh</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">Trải nghiệm đồng nhất và hoàn hảo trên mọi nền tảng thiết bị.</p>
                {/* Device previews */}
                <div className="relative flex-1 flex items-end justify-center">
                  {/* Tablet behind */}
                  <div className="absolute bottom-10 left-0 w-28 h-36 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-xl overflow-hidden">
                    <div className="h-3 w-full bg-slate-100 dark:bg-zinc-700 flex items-center justify-center">
                      <div className="w-6 h-1 rounded-full bg-slate-300 dark:bg-zinc-500" />
                    </div>
                    <div className="p-2 grid gap-1.5 mt-1">
                      <div className="h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40" />
                      <div className="h-2 w-3/4 rounded-full bg-slate-200 dark:bg-zinc-600" />
                      <div className="h-2 w-1/2 rounded-full bg-slate-100 dark:bg-zinc-700" />
                      <div className="grid grid-cols-2 gap-1 mt-1">
                        <div className="h-6 rounded-lg bg-slate-100 dark:bg-zinc-700/50" />
                        <div className="h-6 rounded-lg bg-blue-50 dark:bg-blue-900/20" />
                      </div>
                    </div>
                  </div>
                  {/* Phone front */}
                  <div className="relative z-10 w-24 h-44 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 dark:from-zinc-900 dark:to-zinc-950 border-2 border-slate-700 dark:border-zinc-700 shadow-2xl overflow-hidden mb-2">
                    <div className="h-5 w-full bg-slate-800 dark:bg-zinc-800 flex items-center justify-center">
                      <div className="w-10 h-1.5 rounded-full bg-slate-900 dark:bg-zinc-900" />
                    </div>
                    <div className="p-2 grid gap-2 mt-1">
                      <div className="h-12 rounded-xl bg-gradient-to-br from-blue-500/80 to-indigo-500/80" />
                      <div className="h-2 w-3/4 rounded-full bg-white/20" />
                      <div className="h-2 w-1/2 rounded-full bg-white/10" />
                      <div className="h-7 rounded-xl bg-white/10 mt-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-12 bg-blue-500/20 blur-2xl rounded-full" />
                </div>
              </div>
            </BentoCard>

            <BentoCard
              colSpan={1}
              rowSpan={1}
              className="text-white border-transparent overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
              whileHover={hoverScale}
            >
              <div className="flex flex-col h-full justify-between p-2 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-teal/20 blur-3xl rounded-full pointer-events-none" />
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-1 font-display">Hệ thống Đặt lịch</h3>
                  <p className="opacity-60 font-medium text-sm">Đặt chỗ & Tư duy Logic</p>
                </div>
                {/* Mini calendar */}
                <div className="my-3">
                  <div className="grid grid-cols-7 gap-0.5 w-fit mx-auto">
                    {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(d => (
                      <div key={d} className="w-7 h-5 flex items-center justify-center text-[8px] font-bold opacity-40">{d}</div>
                    ))}
                    {[null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((d, i) => (
                      <div key={i} className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-transform",
                        d === 10 ? "bg-brand-teal text-slate-900 scale-105 shadow-lg shadow-brand-teal/40" :
                          d === 11 || d === 14 ? "bg-white/15 dark:bg-black/20" :
                            d ? "opacity-40" : ""
                      )}>{d}</div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-teal"></span>
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wider opacity-80">Hệ thống đang chạy</span>
                </div>
              </div>
            </BentoCard>

            <BentoCard
              colSpan={3}
              rowSpan={1}
              className="bg-gradient-to-br from-brand-purple/5 via-transparent to-pink-500/5 border-brand-purple/10 dark:from-brand-purple/[0.05] overflow-hidden"
              whileHover={hoverScale}
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full gap-6 p-2">
                <div className="max-w-sm shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-full px-3 py-1 mb-4">
                    <Zap className="w-3 h-3" /> Real-time
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 font-display">Bảng điều khiển Dữ liệu</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Trực quan hóa dữ liệu thời gian thực. Giao diện tập trung vào những con số quan trọng nhất.</p>
                </div>
                {/* KPI cards with mini bar charts */}
                <div className="flex-1 w-full md:w-auto flex gap-3 overflow-hidden">
                  {[
                    { label: "Doanh thu", value: "128M", change: "+12%", color: "from-emerald-400 to-teal-500" },
                    { label: "Đơn hàng", value: "4,281", change: "+8%", color: "from-blue-400 to-indigo-500" },
                    { label: "Khách hàng", value: "9,540", change: "+23%", color: "from-purple-400 to-pink-500" },
                  ].map(({ label, value, change, color }) => (
                    <div key={label} className="flex-1 min-w-0 bg-white/60 dark:bg-black/30 border border-black/5 dark:border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">{label}</p>
                      <p className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">{value}</p>
                      <div className={`mt-2 inline-flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r ${color} rounded-full px-2 py-0.5 w-fit`}>
                        <ArrowRight className="w-3 h-3" />{change}
                      </div>
                      <div className="flex items-end gap-0.5 mt-3 h-8">
                        {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                          <div key={i} className={`flex-1 rounded-sm bg-gradient-to-t ${color} opacity-50`} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>
        </section>

        <StickyWorkflow />

        {/* Apple-style Bento Grid Features Section */}
        <section id="features" className="w-full max-w-6xl px-4 lg:px-8 py-24">
          <div className="flex flex-col items-center text-center mb-16 px-4">
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
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gradient-display mb-6"
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
        <section id="services" className="w-full max-w-6xl px-4 lg:px-8 py-24">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
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
        <section id="cta" className="w-full max-w-6xl mx-auto px-4 lg:px-8 py-32 md:py-48 relative z-10 flex flex-col items-center justify-center">
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
          <p className="font-medium">© {new Date().getFullYear()} Thanh Bình IT. Thiết kế từ sự tĩnh lặng.</p>
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

