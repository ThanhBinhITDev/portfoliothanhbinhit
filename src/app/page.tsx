"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, Variants, useMotionValueEvent } from "framer-motion";
import { LiquidBackground } from "@/components/ui/liquid-background";
import Image from "next/image";
import { BentoCard } from "@/components/ui/bento-card";
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock, Code2, Layers, Lightbulb, MonitorSmartphone, Settings, Zap } from "lucide-react";
import { HelloLoader } from "@/components/hello-loader";
import { cn } from "@/lib/utils";

type WorkflowStep = {
  num: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
};

type WorkflowStepItemProps = {
  step: WorkflowStep;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
};

const WorkflowStepItem = ({ step, index, progress, total }: WorkflowStepItemProps) => {
  const threshold = index / (total - 1); // 0, 0.25, 0.5, 0.75, 1
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(progress, "change", (latest: number) => {
    // Light up slightly early
    const active = latest >= threshold - 0.1;
    if (active !== isActive) setIsActive(active);
  });

  return (
    <div className={cn(
      "relative flex flex-col items-center w-[85vw] sm:w-[320px] md:w-[380px] shrink-0 transition-all duration-700 z-30",
      isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-8 grayscale"
    )}>
      {/* Circle (Centered over the absolute horizontal line) */}
      <div className={cn(
        "flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg md:text-xl border-[4px] transition-all duration-700 relative bg-clip-padding",
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
            Quy trình <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">Phát triển</span>
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
  const [bgReady, setBgReady] = useState(false);

  return (
    <>
      <HelloLoader onDone={() => setBgReady(true)} />
      {bgReady && <LiquidBackground />}
      <div className="flex flex-col items-center w-full pb-16 md:pb-24 space-y-16 md:space-y-28">
        {/* Hero Section Redesigned */}
        <section className="relative z-10 pt-24 pb-8 px-4 sm:px-6 min-h-screen flex flex-col items-center justify-between w-full gap-6">
          <div className="max-w-6xl w-full">
            <div className="glass-panel p-6 sm:p-10 md:p-14 lg:p-16 rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] relative overflow-hidden" data-purpose="hero-container">
              {/* Subtle Glow behind text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

              <motion.div
                className="absolute left-[4%] top-[14%] hidden h-28 w-28 md:block lg:h-40 lg:w-40 opacity-70 pointer-events-none"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/svgs/hero-grid.svg" alt="Subtle dot grid" fill className="object-contain" />
              </motion.div>

              <motion.div
                className="absolute right-[12%] top-[18%] hidden h-20 w-56 lg:block opacity-80 pointer-events-none"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/svgs/hero-wave.svg" alt="Subtle wave" fill className="object-contain" />
              </motion.div>

              <motion.div
                className="absolute right-[6%] top-[22%] hidden h-[260px] w-[260px] lg:block opacity-60 pointer-events-none"
                animate={{ y: [0, 12, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/svgs/hero-orbit.svg" alt="Subtle orbit graphic" fill className="object-contain" />
              </motion.div>

              <div className="relative z-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_360px] lg:gap-12">
                <div className="max-w-3xl text-left">
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/75 dark:text-slate-300"
                  >
                    <span className="h-2 w-2 rounded-full bg-brand-teal" />
                    Full-stack Developer tại Việt Nam
                  </motion.div>

                  <motion.p
                    variants={itemVariants}
                    className="mt-6 text-sm font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400"
                  >
                    Lê Thanh Bình • Thanh Binh IT
                  </motion.p>

                  <motion.h1
                    variants={itemVariants}
                    className="mt-5 max-w-4xl text-4xl font-extrabold tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl md:text-[3.6rem] md:leading-[1.02] lg:text-[4.1rem]"
                  >
                    Thiết kế và phát triển sản phẩm số gọn, mạnh và đúng mục tiêu.
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-[1.05rem]"
                  >
                    Tôi xây dựng website, landing page, web app, hệ thống quản trị,
                    mobile app và các giải pháp automation cho doanh nghiệp cần một
                    sản phẩm vừa đẹp về trải nghiệm, vừa mạnh về kỹ thuật, vừa rõ về
                    định vị thương hiệu.
                  </motion.p>

                  <motion.div
                    variants={itemVariants}
                    className="mt-8 flex flex-col items-start gap-4 sm:flex-row"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
                      className="w-full rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 sm:w-auto dark:bg-white dark:text-black"
                    >
                      Bắt đầu dự án
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                      className="w-full rounded-full border border-slate-300 bg-white/70 px-8 py-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 sm:w-auto dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
                    >
                      Xem dự án tiêu biểu
                    </motion.button>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="mt-10 grid gap-3 sm:grid-cols-3"
                  >
                    {[
                      { label: "Hướng triển khai", value: "Website • Web App • Automation" },
                      { label: "Tech stack", value: "Next.js • React • Node.js" },
                      { label: "Phạm vi", value: "Thiết kế, code, tối ưu và vận hành" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[1.5rem] border border-slate-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/60"
                      >
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-3 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.aside
                  variants={itemVariants}
                  className="relative self-start rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70 dark:shadow-black/20 lg:mt-4"
                >
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/20" />
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                    Hồ sơ năng lực
                  </p>
                  <div className="mt-5 space-y-5">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Vai trò chính</p>
                      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Full-stack Developer
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "Next.js", label: "Frontend" },
                        { value: "Node.js", label: "Backend" },
                        { value: "MySQL", label: "Database" },
                        { value: "SEO", label: "Tối ưu" },
                      ].map((item) => (
                        <div
                          key={item.value}
                          className="rounded-[1.25rem] bg-slate-50 p-4 dark:bg-zinc-950/70"
                        >
                          <p className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white dark:bg-white dark:text-black">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 dark:text-black/60">
                        Định vị
                      </p>
                      <p className="mt-3 text-base font-semibold leading-7">
                        Thanh Binh IT là thương hiệu cá nhân tập trung vào giải pháp
                        số hiệu quả, bền vững và có chất lượng triển khai thực tế.
                      </p>
                    </div>
                  </div>
                </motion.aside>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator - flex sibling, not absolute */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            onClick={() => {
              if (typeof document !== 'undefined') {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex flex-col items-center gap-2 select-none cursor-pointer hover:opacity-80 transition-opacity pb-4"
          >
            <span className="text-xs font-medium tracking-widest text-slate-400 dark:text-slate-500 uppercase">Cuộn xuống</span>
            {/* Vertical line */}
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-600"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            />
            {/* Mouse icon */}
            <div className="w-7 h-11 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-start justify-center pt-2">
              <motion.div
                className="w-1 h-2 rounded-full bg-slate-400 dark:bg-slate-500"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </section>

        {/* Projects: Bento Grid */}
        <section id="projects" className="w-full max-w-6xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 font-display text-gradient-display pb-2">Dự án chọn lọc.</h2>
            <p className="text-slate-500 text-lg md:text-xl">Những dự án tiêu biểu giúp Google và khách hàng hiểu rõ năng lực thực chiến của Lê Thanh Bình và thương hiệu thanhbinhit.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[340px] gap-4 md:gap-6">
            {/* PROJECT 1: ShopVN - Full E-Commerce Platform (Big card, 2x2) */}
            <BentoCard
              colSpan={2}
              rowSpan={2}
              className="bg-gradient-to-br from-slate-50 to-zinc-100 dark:from-zinc-900/40 dark:to-zinc-950/40 border-slate-200/50 dark:border-white/5"
              whileHover={hoverScale}
            >
              <div className="flex flex-col h-full justify-between p-2">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      Fintech Automation
                    </span>
                    <a href="#cta"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                      Trao đổi dự án <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 font-display">AutoBank Gateway</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md text-base leading-relaxed mb-4">
                    Hệ thống thanh toán tự động kết nối nhiều ngân hàng tại Việt Nam, đối soát giao dịch theo thời gian thực, phát hiện biến động số dư và tự động hóa luồng xử lý cho <strong className="text-slate-700 dark:text-white">khối vận hành tài chính cường độ cao</strong>.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {["Next.js", "Node.js", "TypeScript", "MySQL", "Banking APIs", "Realtime Queue"].map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Real screenshot mockup for ShopVN */}
                <div className="w-full h-48 md:h-56 relative rounded-2xl overflow-hidden mt-4 border border-black/5 dark:border-white/5 shadow-xl group">
                  <div className="absolute inset-0 bg-slate-200 dark:bg-zinc-800 animate-pulse" /> {/* Placeholder while loading or missing */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 z-10 flex-col gap-2 opacity-0 group-hover:opacity-10 transition-opacity">
                    <MonitorSmartphone className="w-8 h-8 opacity-50" />
                    <span className="text-sm font-medium">Ảnh dự án thật (16:9)</span>
                  </div>
                  <Image src="/projects/shopvn.png" alt="AutoBank Gateway Dashboard Mockup" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105 z-20" />
                </div>
              </div>
            </BentoCard>

            {/* PROJECT 2: EduPro LMS – Multi-platform (1x2) */}
            <BentoCard
              colSpan={1}
              rowSpan={2}
              className="bg-gradient-to-b from-brand-blue/5 to-indigo-500/5 border-brand-blue/10 dark:from-brand-blue/[0.05] dark:to-indigo-500/[0.03] overflow-hidden"
              whileHover={hoverScale}
            >
              <div className="flex flex-col h-full p-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 bg-gradient-to-br from-brand-blue to-indigo-500 shadow-lg shadow-blue-500/30 w-fit rounded-2xl">
                    <MonitorSmartphone className="w-6 h-6 text-white" />
                  </div>
                  <a href="#cta"
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 transition-colors">
                    Chi tiết <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-1 font-display">OmniSales App</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-1">
                  Ứng dụng bán hàng đa nền tảng cho đội ngũ kinh doanh di động, đồng bộ tồn kho, đơn hàng, chăm sóc khách hàng và báo cáo tức thời cho <strong className="text-slate-700 dark:text-slate-200">mô hình vận hành đa chi nhánh</strong>.
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {["React Native", "Node.js", "MySQL", "Socket.IO"].map(t => (
                    <span key={t} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-700/50">{t}</span>
                  ))}
                </div>
                {/* Real screenshot mockup for EduPro (Mobile/Vertical) */}
                <div className="flex-1 w-full min-h-[220px] relative rounded-t-2xl overflow-hidden mt-2 border border-black/5 dark:border-white/5 border-b-0 shadow-2xl translate-y-2 group">
                  <div className="absolute inset-0 bg-slate-200 dark:bg-zinc-800 animate-pulse" /> {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 z-10 flex-col gap-2 opacity-0 group-hover:opacity-10 transition-opacity">
                    <MonitorSmartphone className="w-8 h-8 opacity-50" />
                    <span className="text-sm font-medium">Ảnh Mobile/App</span>
                  </div>
                  <Image src="/projects/edupro-mobile.png" alt="OmniSales mobile app mockup" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105 z-20" />
                </div>
              </div>
            </BentoCard>

            {/* PROJECT 3: BookEasy – Booking System (1x1 dark) */}
            <BentoCard
              colSpan={1}
              rowSpan={1}
              noGlass
              className="bg-slate-900 text-white border-transparent overflow-hidden shadow-2xl"
              whileHover={hoverScale}
            >
              <div className="flex flex-col h-full justify-between p-2 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-teal/20 blur-3xl rounded-full pointer-events-none" />
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-1 font-display">BookEasy</h3>
                    <p className="opacity-60 font-medium text-sm">Đặt lịch & Quản lý khách hàng</p>
                  </div>
                  <a href="#cta"
                    className="opacity-40 hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                {/* Mini calendar */}
                <div className="my-2">
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
                  <span className="text-sm font-semibold uppercase tracking-wider opacity-80">340 quy trình tự động hôm nay</span>
                </div>
              </div>
            </BentoCard>

            {/* PROJECT 4: Analytics Dashboard (3 wide) */}
            <BentoCard
              colSpan={3}
              rowSpan={1}
              className="bg-gradient-to-br from-brand-purple/5 via-transparent to-pink-500/5 border-brand-purple/10 dark:from-brand-purple/[0.05] overflow-hidden"
              whileHover={hoverScale}
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full gap-6 p-2">
                <div className="max-w-sm shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-full px-3 py-1">
                      <Zap className="w-3 h-3" /> Real-time
                    </span>
                    <a href="#cta"
                      className="text-[11px] font-bold text-slate-400 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 transition-colors">
                      Khám phá <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 font-display">OpsVision Command Center</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    Trung tâm điều hành dữ liệu thời gian thực dành cho doanh nghiệp cần nhìn toàn bộ vận hành trong một màn hình, từ doanh thu, đơn hàng, KPI đội ngũ đến cảnh báo tự động cho <strong className="text-slate-700 dark:text-white">chuỗi kinh doanh tăng trưởng nhanh</strong>.
                  </p>
                </div>
                {/* KPI cards with mini bar charts */}
                <div className="w-full md:flex-1 flex gap-3 overflow-x-auto pb-2 md:pb-0">
                  {[
                    { label: "Doanh thu tháng", value: "₫1.28 tỷ", change: "+12%", color: "from-emerald-400 to-teal-500" },
                    { label: "Đơn hàng", value: "4,281", change: "+8%", color: "from-blue-400 to-indigo-500" },
                    { label: "Khách mới", value: "9,540", change: "+23%", color: "from-purple-400 to-pink-500" },
                  ].map(({ label, value, change, color }) => (
                    <div key={label} className="flex-1 min-w-[130px] bg-white/60 dark:bg-black/30 border border-black/5 dark:border-white/5 rounded-2xl p-3 md:p-4 flex flex-col justify-between shadow-sm">
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
        <section id="features" className="w-full max-w-6xl px-4 lg:px-8 py-24 relative">
          {/* Floating Decor SVGs */}
          <motion.div
            className="absolute top-[10%] left-[-5%] w-32 md:w-56 h-32 md:h-56 opacity-30 pointer-events-none hidden md:block"
            animate={{ y: [0, 30, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src="/svgs/decorate-4.svg" alt="Decor 4" fill className="object-contain" />
          </motion.div>
          <motion.div
            className="absolute bottom-[20%] right-[-5%] w-48 md:w-72 h-48 md:h-72 opacity-20 pointer-events-none hidden md:block"
            animate={{ y: [0, -40, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <Image src="/svgs/decorate-5.svg" alt="Decor 5" fill className="object-contain" />
          </motion.div>
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
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gradient-display pb-2 mb-6"
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
              Thanh Binh IT tập trung vào trải nghiệm mượt, hiệu năng cao và cấu trúc kỹ thuật đủ mạnh để vừa lên thương hiệu, vừa phục vụ tăng trưởng dài hạn.
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
              Dịch vụ cốt lõi của Lê Thanh Bình tập trung vào các giải pháp số có thể triển khai thật, tối ưu thật và mở rộng thật cho doanh nghiệp tại Việt Nam.
            </motion.p>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: Code2,
                title: "Thiết kế & Phát triển Web",
                desc: "Thiết kế website, landing page và web app chuẩn SEO, tốc độ cao, tập trung mạnh vào chuyển đổi và nhận diện thương hiệu.",
                features: ["Landing page chuyển đổi cao", "Website doanh nghiệp chuẩn SEO", "Tối ưu Core Web Vitals và technical SEO"],
                gradient: "from-pink-500 to-rose-400",
                textColor: "text-rose-500",
                bgLight: "bg-rose-50"
              },
              {
                icon: Layers,
                title: "Web App & Hệ thống Quản trị",
                desc: "Xây dựng SaaS, CRM, ERP mini, dashboard điều hành và nền tảng quản trị nội bộ có khả năng mở rộng cao.",
                features: ["Dashboard đa chiều", "Tích hợp API, thanh toán, realtime", "Kiến trúc đủ mạnh cho scale-up"],
                gradient: "from-blue-500 to-indigo-400",
                textColor: "text-blue-500",
                bgLight: "bg-blue-50"
              },
              {
                icon: MonitorSmartphone,
                title: "App Di động, Tool & Sản phẩm đặc thù",
                desc: "Phát triển ứng dụng iOS/Android, tool theo yêu cầu, hệ thống tự động hóa và các sản phẩm kỹ thuật chuyên biệt.",
                features: ["App mobile cho vận hành thực tế", "Tool nội bộ theo nhu cầu riêng", "Tự động hóa quy trình và xử lý dữ liệu"],
                gradient: "from-emerald-500 to-teal-400",
                textColor: "text-emerald-500",
                bgLight: "bg-emerald-50"
              },
              {
                icon: Settings,
                title: "Giải pháp nâng cao & R&D",
                desc: "Từ game 2D/3D, tích hợp backend phức tạp đến tối ưu hệ thống và kiến trúc triển khai, mọi bài toán đều có thể được đóng gói thành giải pháp thực chiến.",
                features: ["Game 2D/3D và tương tác thời gian thực", "Quản lý server, CI/CD, bảo mật", "Tư duy kỹ thuật đa ngôn ngữ và đa nền tảng"],
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
                className="group relative flex flex-col p-6 md:p-8 lg:p-10 rounded-[28px] md:rounded-[36px] bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-500 cursor-pointer overflow-hidden glass-panel"
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
            {/* CTA specific Floating SVG Decoration */}
            <motion.div
              className="absolute top-[-10%] right-[-5%] w-48 md:w-80 h-48 md:h-80 opacity-40 mix-blend-overlay dark:mix-blend-normal pointer-events-none z-0"
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/svgs/decorate-6.svg" alt="Decor 6" fill className="object-contain" />
            </motion.div>
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
                <a href="mailto:thanhbinhit2006@gmail.com" className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full font-semibold text-base transition-all duration-300 shadow-[0_15px_35px_-10px_rgba(59,130,246,0.6)] hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.7)] hover:-translate-y-0.5">
                  <span>Bắt đầu dự án ngay</span>
                  <ArrowRight strokeWidth={1.5} className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                {/* Sub-Action / Contact info */}
                <div className="flex flex-row items-center gap-1.5 text-xs md:text-sm text-[#86868b] font-normal mt-2">
                  <span>Hoặc liên hệ:</span>
                  <a href="mailto:thanhbinhit2006@gmail.com" className="text-[#1d1d1f] dark:text-white hover:underline underline-offset-4 transition-colors font-semibold">
                    thanhbinhit2006@gmail.com
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-6xl px-4 lg:px-8 pt-16 pb-8 mt-10 border-t border-black/5 dark:border-white/5">
          {/* Top grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

            {/* Brand column */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Image src="/logo.svg" alt="thanhbinhit logo" width={32} height={32} className="dark:invert" />
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">thanhbinhit</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[220px]">
                Lê Thanh Bình là Full-stack Developer xây dựng website, web app, hệ thống quản trị và giải pháp số hiệu năng cao dưới thương hiệu cá nhân thanhbinhit.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3 mt-1">
                {[
                  {
                    label: "GitHub", href: "https://github.com/ThanhBinhITDev", icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                    )
                  },
                  {
                    label: "Facebook", href: "https://www.facebook.com/thanhbinhittt", icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.008 10.125 11.927v-8.437H7.078v-3.49h3.047V9.412c0-3.021 1.792-4.689 4.533-4.689 1.313 0 2.686.236 2.686.236v2.965H15.83c-1.491 0-1.956.931-1.956 1.887v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.081 24 18.092 24 12.073z" /></svg>
                    )
                  },
                  {
                    label: "Email", href: "mailto:thanhbinhit2006@gmail.com", icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    )
                  },
                ].map(({ label, href, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav: Trang */}
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">Trang</p>
              <ul className="space-y-3">
                {[
                  { label: "Trang chủ", href: "/" },
                  { label: "Giới thiệu", href: "/gioi-thieu" },
                  { label: "Dự án SEO", href: "/du-an" },
                  { label: "Dịch vụ SEO", href: "/dich-vu" },
                  { label: "Dự án", href: "#projects" },
                  { label: "Đặc quyền", href: "#features" },
                  { label: "Dịch vụ", href: "#services" },
                  { label: "Liên hệ", href: "#cta" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nav: Dịch vụ */}
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">Dịch vụ</p>
              <ul className="space-y-3">
                {[
                  "Thiết kế Website",
                  "Phát triển Ứng dụng",
                  "App iOS/Android",
                  "Hệ thống Quản lý",
                  "Tối ưu Hiệu suất",
                  "Tool theo yêu cầu",
                ].map((s) => (
                  <li key={s}>
                    <a href="#services" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">Liên hệ</p>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:thanhbinhit2006@gmail.com" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium break-all">
                    thanhbinhit2006@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:0819957249" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
                    0819 957 249
                  </a>
                </li>
                <li className="text-sm text-slate-500 dark:text-slate-400 font-medium">Việt Nam 🇻🇳</li>
                <li className="text-sm text-slate-500 dark:text-slate-400 font-medium">Thứ 2 – Thứ 7, 8:00 – 18:00</li>
              </ul>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Next.js", "React", "TypeScript", "Node.js"].map((t) => (
                  <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 border border-black/5 dark:border-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-black/5 dark:border-white/5">
            <p className="text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
              © {new Date().getFullYear()} <strong className="text-slate-600 dark:text-slate-300">thanhbinhit</strong>. All rights reserved.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
            >
              Lên đầu trang
              <span className="w-7 h-7 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 group-hover:bg-slate-100 dark:group-hover:bg-white/10 transition-all">
                <ArrowRight className="w-3 h-3 -rotate-90" />
              </span>
            </button>
          </div>
        </footer>
      </div >
    </>
  );
}
