import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thanhbinhit.com";

export const metadata: Metadata = {
  title: "Giới thiệu | Lê Thanh Bình Full-stack Developer",
  description:
    "Giới thiệu về Lê Thanh Bình, còn được biết đến là Thanh Binh IT hoặc thanhbinhit, Full-stack Developer tại Việt Nam chuyên xây dựng website, web app, hệ thống quản trị và giải pháp số hiệu năng cao.",
  alternates: {
    canonical: `${SITE_URL}/gioi-thieu`,
  },
  openGraph: {
    title: "Giới thiệu | Lê Thanh Bình Full-stack Developer",
    description:
      "Thông tin giới thiệu chính thức về Lê Thanh Bình, thương hiệu cá nhân Thanh Binh IT và định hướng phát triển giải pháp số tại Việt Nam.",
    url: `${SITE_URL}/gioi-thieu`,
  },
};

const strengths = [
  "Thiết kế website, landing page và web app chuẩn SEO",
  "Phát triển hệ thống quản trị, dashboard và nền tảng vận hành nội bộ",
  "Xây dựng app di động, tool theo yêu cầu và sản phẩm số đặc thù",
  "Tối ưu hiệu suất, technical SEO và trải nghiệm người dùng",
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "MySQL",
  "Tailwind CSS",
  "PHP",
  "Python",
  "Laravel",
  "MongoDB",
  "Java",
  "C#",
];

export default function AboutPage() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="glass-panel rounded-[2rem] p-8 md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            Giới thiệu
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Lê Thanh Bình là Full-stack Developer đứng sau thương hiệu cá nhân Thanh Binh IT.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Lê Thanh Bình, còn được biết đến với tên gọi Thanh Binh IT hoặc
            thanhbinhit, là Full-stack Developer tại Việt Nam chuyên xây dựng
            website, landing page, web app, hệ thống quản trị, app di động và
            các giải pháp số có hiệu suất cao. Mục tiêu cốt lõi là tạo ra sản
            phẩm vừa mạnh về kỹ thuật, vừa rõ về thương hiệu, vừa sẵn sàng tăng
            trưởng lâu dài.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-slate-200/70 bg-white/80 p-8 dark:border-white/10 dark:bg-zinc-900/70">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Năng lực cốt lõi
            </h2>
            <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
              {strengths.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 p-4 dark:bg-zinc-950/60">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/70 bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white dark:border-white/10">
            <h2 className="text-2xl font-bold tracking-tight">Kỹ năng nổi bật</h2>
            <p className="mt-4 text-slate-200">
              Hệ kỹ năng đa nền tảng giúp xử lý từ giao diện, backend, dữ liệu,
              automation đến tối ưu triển khai thực tế.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-8 md:p-10 dark:border-white/10 dark:bg-zinc-900/60">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Định hướng làm việc
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Mình tập trung vào các dự án cần sự cân bằng giữa trải nghiệm người
            dùng, chất lượng kỹ thuật và khả năng vận hành thực tế. Mỗi sản phẩm
            đều được ưu tiên tính rõ ràng, tốc độ và khả năng mở rộng lâu dài.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dich-vu"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              Xem dịch vụ
            </Link>
            <Link
              href="/du-an"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Dự án tiêu biểu
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
