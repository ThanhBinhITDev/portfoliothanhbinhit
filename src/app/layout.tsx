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
  title: {
    default: "Lê Thanh Bình | Full-stack Developer & Thanh Binh IT",
    template: "%s | Lê Thanh Bình",
  },
  description:
    "Lê Thanh Bình, còn được biết đến là Thanh Binh IT hoặc thanhbinhit, là Full-stack Developer tại Việt Nam chuyên thiết kế website, landing page, web app, hệ thống quản trị, app di động và giải pháp SEO kỹ thuật.",
  keywords: [
    "Lê Thanh Bình",
    "Le Thanh Binh",
    "Thanh Binh IT",
    "thiết kế website",
    "full-stack developer",
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

  alternates: {
    canonical: SITE_URL,
  },
  authors: [{ name: "Lê Thanh Bình", url: SITE_URL }],
  creator: "Lê Thanh Bình",
  publisher: "Thanh Binh IT",
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

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Thanh Binh IT",
    title: "Lê Thanh Bình | Full-stack Developer & Thanh Binh IT",
    description:
      "Lê Thanh Bình là Full-stack Developer tại Việt Nam, phát triển website, web app, hệ thống quản trị, app di động và giải pháp số dưới thương hiệu cá nhân Thanh Binh IT.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Lê Thanh Bình - Full-stack Developer & Thanh Binh IT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lê Thanh Bình | Full-stack Developer & Thanh Binh IT",
    description:
      "Full-stack Developer tại Việt Nam, chuyên thiết kế website, landing page, web app, hệ thống quản trị và giải pháp kỹ thuật cao.",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@thanhbinhit",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
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
        name: "Lê Thanh Bình",
        alternateName: ["Thanh Binh IT", "thanhbinhit"],
        url: SITE_URL,
        description:
          "Lê Thanh Bình là Full-stack Developer tại Việt Nam, xây dựng website, landing page, web app, hệ thống quản trị, app di động, tool theo yêu cầu và game 2D/3D dưới thương hiệu cá nhân Thanh Binh IT.",
        jobTitle: "Full-stack Developer",
        homeLocation: {
          "@type": "Country",
          name: "Việt Nam",
        },
        email: "mailto:thanhbinhit2006@gmail.com",
        telephone: "+84 819957249",
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "PHP",
          "Python",
          "Laravel",
          "MySQL",
          "MongoDB",
          "Java",
          "C#",
          "C++",
          "UI/UX Design",
          "Technical SEO",
          "Game Development",
        ],
        sameAs: [
          "https://github.com/ThanhBinhITDev",
          "https://www.facebook.com/thanhbinhittt",
        ],
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "Brand",
        "@id": `${SITE_URL}/#brand`,
        name: "Thanh Binh IT",
        alternateName: ["thanhbinhit"],
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        slogan: "Giải pháp website, web app và hệ thống số hiệu suất cao",
        founder: { "@id": `${SITE_URL}/#person` },
        sameAs: [
          "https://github.com/ThanhBinhITDev",
          "https://www.facebook.com/thanhbinhittt",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Lê Thanh Bình | Thanh Binh IT",
        description: "Portfolio cá nhân của Lê Thanh Bình, Full-stack Developer và thương hiệu cá nhân Thanh Binh IT.",
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#brand` },
        inLanguage: "vi-VN",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#services`,
        name: "Thanh Binh IT",
        areaServed: "Việt Nam",
        url: SITE_URL,
        provider: { "@id": `${SITE_URL}/#person` },
        serviceType: [
          "Thiết kế website",
          "Landing page",
          "Web app",
          "Hệ thống quản trị",
          "SEO kỹ thuật",
          "Phát triển app iOS/Android",
          "Viết tool theo yêu cầu",
          "Game 2D/3D",
        ],
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
