import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const SITE_URL = "https://thanhbinhit.com";

export const metadata: Metadata = {
  // ── Title ──────────────────────────────────────────────────
  title: {
    default: "Thanh Bình IT | Thiết kế & Phát triển Website Chuyên nghiệp",
    template: "%s | Thanh Bình IT",
  },

  // ── Description (155-160 ký tự để hiển thị đủ trên Google) ──
  description:
    "Thanh Bình IT – Kỹ sư phần mềm chuyên thiết kế website, xây dựng ứng dụng web, phát triển hệ thống quản lý và tối ưu hiệu suất. Uy tín – Chất lượng – Đúng hạn.",

  // ── Keywords (từ khóa SEO) ──────────────────────────────────
  keywords: [
    "thiết kế website",
    "phát triển web",
    "làm website chuyên nghiệp",
    "web developer Việt Nam",
    "kỹ sư phần mềm",
    "Next.js developer",
    "React developer",
    "Thanh Bình IT",
    "thanhbinhit",
    "thiết kế UI UX",
    "xây dựng hệ thống quản lý",
    "website doanh nghiệp",
    "SEO website",
    "lập trình web",
    "full stack developer",
  ],

  // ── Canonical URL ────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Authors / Creator ────────────────────────────────────────
  authors: [{ name: "Thanh Bình IT", url: SITE_URL }],
  creator: "Thanh Bình IT",
  publisher: "Thanh Bình IT",

  // ── Robots ──────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // ── Open Graph (Facebook / Zalo / LinkedIn) ──────────────────
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Thanh Bình IT",
    title: "Thanh Bình IT | Thiết kế & Phát triển Website Chuyên nghiệp",
    description:
      "Thanh Bình IT – Kỹ sư phần mềm chuyên thiết kế website, phát triển ứng dụng web và tối ưu hiệu suất. Uy tín – Chất lượng – Đúng hạn.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Thanh Bình IT – Thiết kế & Phát triển Website",
      },
    ],
  },

  // ── Twitter Card ─────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Thanh Bình IT | Thiết kế & Phát triển Website Chuyên nghiệp",
    description:
      "Kỹ sư phần mềm – Thiết kế website đẹp, hiệu suất cao, chuẩn SEO. Liên hệ ngay!",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@thanhbinhit",
  },

  // ── Icons ────────────────────────────────────────────────────
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },

  // ── Verification (Google Search Console / Bing) ──────────────
  // verification: {
  //   google: "GOOGLE_VERIFICATION_CODE",
  //   other: { "msvalidate.01": "BING_CODE" },
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Thanh Bình IT",
        url: SITE_URL,
        description:
          "Kỹ sư Phần mềm & Kiến trúc sư Web – chuyên thiết kế website, phát triển ứng dụng và tối ưu hiệu suất hệ thống.",
        jobTitle: "Kỹ sư Phần mềm & Kiến trúc sư Web",
        knowsAbout: ["Next.js", "React", "TypeScript", "SEO", "UI/UX Design", "Three.js"],
        sameAs: [
          "https://github.com/thanhbinhit",
          "https://linkedin.com/in/thanhbinhit",
        ],
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Thanh Bình IT",
        description: "Portfolio cá nhân – Thiết kế & Phát triển Website Chuyên nghiệp",
        author: { "@id": `${SITE_URL}/#person` },
        inLanguage: "vi-VN",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased text-foreground bg-background min-h-screen relative overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 max-w-7xl mx-auto flex flex-col items-center">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
