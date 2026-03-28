import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://thanhbinhit.com";

export const metadata: Metadata = {
  title: "Dịch vụ | Lê Thanh Bình - Thanh Binh IT",
  description:
    "Dịch vụ của Lê Thanh Bình và Thanh Binh IT bao gồm thiết kế website, landing page, web app, hệ thống quản trị, app di động, tool theo yêu cầu, game 2D/3D và technical SEO.",
  alternates: {
    canonical: `${SITE_URL}/dich-vu`,
  },
  openGraph: {
    title: "Dịch vụ | Lê Thanh Bình - Thanh Binh IT",
    description:
      "Tổng hợp dịch vụ kỹ thuật số và giải pháp phát triển sản phẩm của Thanh Binh IT tại Việt Nam.",
    url: `${SITE_URL}/dich-vu`,
  },
};

const services = [
  {
    title: "Thiết kế website, landing page, web app",
    description:
      "Phát triển website và web app hiện đại với tốc độ cao, cấu trúc sạch, chuẩn SEO và tối ưu chuyển đổi.",
  },
  {
    title: "Hệ thống quản trị và dashboard doanh nghiệp",
    description:
      "Thiết kế nền tảng quản lý nội bộ, CRM, ERP mini, dashboard và quy trình số hóa cho vận hành thực tế.",
  },
  {
    title: "App di động, tool theo yêu cầu, automation",
    description:
      "Xây dựng app iOS/Android, công cụ nội bộ, bot, quy trình tự động và sản phẩm đặc thù theo nhu cầu riêng.",
  },
  {
    title: "Technical SEO, tối ưu hiệu suất và giải pháp nâng cao",
    description:
      "Tối ưu Core Web Vitals, technical SEO, bảo mật, triển khai server và cả các hạng mục R&D như game 2D/3D.",
  },
];

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/dich-vu#webpage`,
        url: `${SITE_URL}/dich-vu`,
        name: "Dịch vụ | Lê Thanh Bình - Thanh Binh IT",
        description:
          "Tổng hợp dịch vụ kỹ thuật số và giải pháp phát triển sản phẩm của Thanh Binh IT tại Việt Nam.",
        inLanguage: "vi-VN",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person-lite`,
        name: "Lê Thanh Bình",
        alternateName: ["Thanh Binh IT", "thanhbinhit"],
        jobTitle: "Full-stack Developer",
      },
      {
        "@type": "OfferCatalog",
        "@id": `${SITE_URL}/dich-vu#catalog`,
        name: "Dịch vụ của Thanh Binh IT",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@id": `${SITE_URL}/#person-lite`,
            },
            areaServed: "Việt Nam",
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
            Dịch vụ
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Thanh Binh IT cung cấp giải pháp số toàn diện cho doanh nghiệp và cá nhân.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Dưới thương hiệu cá nhân Thanh Binh IT, Lê Thanh Bình cung cấp dịch
            vụ phát triển sản phẩm số từ giai đoạn ý tưởng đến triển khai thực
            tế, tập trung vào hiệu suất, trải nghiệm và khả năng mở rộng.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[1.75rem] border border-slate-200/70 bg-white/80 p-8 dark:border-white/10 dark:bg-zinc-900/70"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {service.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
                {service.description}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-slate-200/70 bg-slate-900 p-8 md:p-10 text-white dark:border-white/10">
          <h2 className="text-2xl font-bold tracking-tight">
            Tìm đúng người để triển khai sản phẩm số
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
            Nếu bạn đang cần một Full-stack Developer có thể vừa làm sản phẩm,
            vừa hiểu vận hành, vừa định vị thương hiệu tốt trên môi trường số,
            bạn có thể bắt đầu từ email hoặc xem thêm các dự án tiêu biểu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/gioi-thieu"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Xem giới thiệu
            </Link>
            <a
              href="mailto:thanhbinhit2006@gmail.com"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Gửi email cho tôi
            </a>
            <Link
              href="/du-an"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Xem dự án
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
