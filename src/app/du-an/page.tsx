import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thanhbinhit.com";

export const metadata: Metadata = {
  title: "Dự án | Thanh Binh IT",
  description:
    "Danh sách dự án tiêu biểu của Lê Thanh Bình - Thanh Binh IT, bao gồm hệ thống thanh toán tự động, app bán hàng đa nền tảng và nền tảng điều hành dữ liệu thời gian thực.",
  alternates: {
    canonical: `${SITE_URL}/du-an`,
  },
  openGraph: {
    title: "Dự án | Thanh Binh IT",
    description:
      "Khám phá các dự án tiêu biểu của Lê Thanh Bình trong lĩnh vực website, automation, app di động và hệ thống quản trị.",
    url: `${SITE_URL}/du-an`,
  },
};

const projects = [
  {
    title: "AutoBank Gateway",
    category: "Fintech Automation",
    description:
      "Hệ thống thanh toán tự động cho nhiều ngân hàng tại Việt Nam, hỗ trợ đối soát giao dịch, nhận diện biến động số dư và tự động kích hoạt quy trình vận hành tài chính.",
    stack: ["Next.js", "Node.js", "TypeScript", "MySQL", "Realtime Queue"],
  },
  {
    title: "OmniSales App",
    category: "Mobile Commerce",
    description:
      "Ứng dụng bán hàng đa nền tảng giúp đội ngũ kinh doanh theo dõi đơn hàng, khách hàng, tồn kho và báo cáo tức thời trên môi trường di động.",
    stack: ["React Native", "Node.js", "MySQL", "Socket.IO"],
  },
  {
    title: "OpsVision Command Center",
    category: "Operations Dashboard",
    description:
      "Trung tâm điều hành dữ liệu thời gian thực cho doanh nghiệp cần theo dõi doanh thu, KPI, cảnh báo và vận hành đa bộ phận trên một dashboard thống nhất.",
    stack: ["Next.js", "TypeScript", "Charts", "API Integration"],
  },
];

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/du-an#webpage`,
        url: `${SITE_URL}/du-an`,
        name: "Dự án | Thanh Binh IT",
        description:
          "Danh sách dự án tiêu biểu của Lê Thanh Bình - Thanh Binh IT.",
        inLanguage: "vi-VN",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/du-an#itemlist`,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            category: project.category,
            description: project.description,
            creator: {
              "@type": "Person",
              name: "Lê Thanh Bình",
              alternateName: ["Thanh Binh IT", "thanhbinhit"],
            },
            keywords: project.stack.join(", "),
          },
        })),
      },
    ],
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="glass-panel rounded-[2rem] p-8 md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            Dự án
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Dự án tiêu biểu của Lê Thanh Bình và thương hiệu thanhbinhit.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Trang này tổng hợp các dự án tiêu biểu để khách hàng và công cụ tìm
            kiếm hiểu rõ năng lực triển khai thực tế của Thanh Binh IT trong các
            bài toán automation, app di động, web app và dashboard doanh
            nghiệp.
          </p>
        </section>

        <section className="space-y-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-[1.75rem] border border-slate-200/70 bg-white/80 p-8 dark:border-white/10 dark:bg-zinc-900/70"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
                {project.category}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {project.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-zinc-950 dark:text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-8 md:p-10 dark:border-white/10 dark:bg-zinc-900/60">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bạn đang cần một dự án tương tự?
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Thanh Binh IT nhận phát triển hệ thống theo yêu cầu, từ website,
            landing page đến sản phẩm vận hành chuyên biệt cho doanh nghiệp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/gioi-thieu"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Xem giới thiệu
            </Link>
            <Link
              href="/dich-vu"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              Xem dịch vụ
            </Link>
            <a
              href="mailto:thanhbinhit2006@gmail.com"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Liên hệ trực tiếp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
