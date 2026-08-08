export const services = [
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
] as const;

export type Service = (typeof services)[number];
