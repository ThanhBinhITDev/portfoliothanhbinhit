"use client";

import { motion, Variants } from "framer-motion";
import { LiquidBackground } from "@/components/ui/liquid-background";
import { BentoCard } from "@/components/ui/bento-card";
import { ArrowRight, Code2, Layers, MonitorSmartphone, Settings, Zap } from "lucide-react";
import { HelloLoader } from "@/components/hello-loader";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

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
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 font-display">Nền tảng Thương mại điện tử</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg leading-relaxed">Kiến trúc Headless CMS, Next.js 14, tốc độ tải trang dưới 1 giây. Hệ thống mượt mà và trực quan.</p>
              </div>
              <div className="w-full h-56 bg-white/50 dark:bg-black/40 rounded-3xl border border-black/5 dark:border-white/5 backdrop-blur-xl overflow-hidden mt-6 shadow-xl relative">
                 <div className="w-full h-10 bg-black/5 dark:bg-white/5 flex items-center px-4 gap-2 border-b border-black/5 dark:border-white/5">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-60" />
                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-60" />
                   <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-60" />
                 </div>
                 <div className="p-6 grid gap-4 opacity-40">
                    <div className="h-6 w-1/3 bg-black/10 dark:bg-white/10 rounded-full" />
                    <div className="h-20 w-full bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5" />
                 </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard 
            colSpan={1} 
            rowSpan={2} 
            className="bg-brand-blue/5 border-brand-blue/10 dark:bg-brand-blue/[0.03] overflow-hidden"
            whileHover={hoverScale}
          >
            <div className="flex flex-col h-full p-2">
              <div className="p-4 bg-white dark:bg-zinc-800 shadow-sm w-fit rounded-2xl mb-6">
                <MonitorSmartphone className="w-7 h-7 text-brand-blue" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2 font-display">Ứng dụng đa kênh</h3>
              <p className="text-slate-500 dark:text-slate-400">Trải nghiệm đồng nhất và hoàn hảo trên mọi nền tảng thiết bị.</p>
            </div>
          </BentoCard>

          <BentoCard 
            colSpan={1} 
            rowSpan={1} 
            className="bg-slate-900 text-white dark:bg-zinc-100 dark:text-black border-transparent"
            whileHover={hoverScale}
          >
            <div className="flex flex-col h-full justify-between p-2">
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-3 font-display">Hệ thống Đặt lịch</h3>
                <p className="opacity-70 font-medium">Đặt chỗ & Tư duy Logic</p>
              </div>
              <div className="flex items-center gap-3 opacity-80">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-teal"></span>
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider">Hệ thống đang chạy</span>
              </div>
            </div>
          </BentoCard>

          <BentoCard 
            colSpan={3} 
            rowSpan={1} 
            className="bg-brand-purple/5 border-brand-purple/10 dark:bg-brand-purple/[0.03]"
            whileHover={hoverScale}
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full gap-8 p-2">
              <div className="max-w-xl">
                 <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 font-display">Bảng điều khiển Dữ liệu</h3>
                 <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">Trực quan hóa dữ liệu thời gian thực. Giao diện tĩnh lặng tập trung vào những con số quan trọng nhất.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto overflow-hidden">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-20 md:w-32 h-24 md:h-36 rounded-2xl bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/5 shadow-sm" />
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Workflow: Horizontal Scroll */}
      <section id="workflow" className="w-full py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-display">Quy trình mượt mà.</h2>
          <p className="text-foreground/60 text-xl">Từ ý tưởng bay bổng đến sản phẩm hoàn thiện một cách tinh gọn.</p>
        </div>

        <div className="w-full overflow-x-auto pb-12 pt-4 px-4 lg:px-8 flex gap-6 md:gap-8 snap-x snap-mandatory scrollbar-hide md:pl-[max(2rem,calc((100vw-72rem)/2))]">
          {[
            { num: "01", title: "Khám phá & Tư vấn", desc: "Phân tích yêu cầu, insight khách hàng và định hình trải nghiệm cho sản phẩm." },
            { num: "02", title: "Thiết kế UI/UX", desc: "Xây dựng Wireframe & Prototype với chuẩn Apple Design System (Minimalism)." },
            { num: "03", title: "Phát triển (Dev)", desc: "Code với Next.js & Tailwind CSS. Tối ưu hiệu suất, SEO và mượt mà trên 60fps." },
            { num: "04", title: "Kiểm thử & Go Live", desc: "QA đa nền tảng, thiết lập CI/CD và bàn giao tài liệu kỹ thuật." },
            { num: "05", title: "Bảo trì & Mở rộng", desc: "Hỗ trợ 24/7. Sẵn sàng thêm tính năng mới khi doanh nghiệp scale." },
          ].map((step, i) => (
            <div key={i} className="snap-center w-[85vw] md:w-[420px] h-[350px] shrink-0 glass-panel bg-gradient-to-br from-white/40 to-white/10 dark:from-white/5 dark:to-transparent rounded-[32px] p-8 md:p-10 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 shadow-xl border border-white/20 dark:border-white/5">
              <span className="text-6xl font-extrabold text-foreground/[0.04] dark:text-white/[0.04] tracking-tighter">{step.num}</span>
              <div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{step.title}</h3>
                <p className="text-foreground/60 text-lg leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="w-full max-w-6xl px-4 lg:px-8">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-display">Dịch vụ cốt lõi.</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto">Giải pháp toàn diện cho mọi nhu cầu hiện diện và vận hành trên nền tảng số.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Code2, title: "Phát triển Web", desc: "Landing Pages, Portfolio, Trang web doanh nghiệp sang trọng." },
            { icon: Layers, title: "Ứng dụng Web", desc: "Hệ thống SaaS, ERP, CRM với kiến trúc cực kỳ hiện đại." },
            { icon: Zap, title: "Tối ưu hóa", desc: "Tối ưu tốc độ (Core Web Vitals) đạt điểm tuyệt đối." },
            { icon: Settings, title: "Quản trị", desc: "Quản trị Server, bảo mật thông tin chuẩn quốc tế." },
          ].map((service, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-[32px] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-500 border border-transparent hover:border-black/5 dark:hover:border-white/5"
            >
              <div className="w-14 h-14 rounded-[20px] bg-white dark:bg-black shadow-sm flex items-center justify-center mb-8 text-apple-blue">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3">{service.title}</h3>
              <p className="text-foreground/60 leading-relaxed text-base">{service.desc}</p>
            </motion.div>
          ))}
        </div>
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

