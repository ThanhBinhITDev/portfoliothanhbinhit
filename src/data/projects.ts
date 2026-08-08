export const projects = [
  {
    title: "AutoBank Gateway",
    category: "Fintech Automation",
    description:
      "Hệ thống thanh toán tự động cho nhiều ngân hàng tại Việt Nam, hỗ trợ đối soát giao dịch, nhận diện biến động số dư và tự động kích hoạt quy trình vận hành tài chính.",
    stack: ["Next.js", "Node.js", "TypeScript", "MySQL", "Realtime Queue"],
    highlight: "Dự án nổi bật",
  },
  {
    title: "OmniSales App",
    category: "Mobile Commerce",
    description:
      "Ứng dụng bán hàng đa nền tảng giúp đội ngũ kinh doanh theo dõi đơn hàng, khách hàng, tồn kho và báo cáo tức thời trên môi trường di động.",
    stack: ["React Native", "Node.js", "MySQL", "Socket.IO"],
    highlight: null,
  },
  {
    title: "OpsVision Command Center",
    category: "Operations Dashboard",
    description:
      "Trung tâm điều hành dữ liệu thời gian thực cho doanh nghiệp cần theo dõi doanh thu, KPI, cảnh báo và vận hành đa bộ phận trên một dashboard thống nhất.",
    stack: ["Next.js", "TypeScript", "Charts", "API Integration"],
    highlight: null,
  },
] as const;

export type Project = (typeof projects)[number];
