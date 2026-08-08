/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tắt xuất tĩnh để dễ build/test trên máy giám khảo
  // output: "export",
  trailingSlash: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },

  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
};

module.exports = nextConfig;
