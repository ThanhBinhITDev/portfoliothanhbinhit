import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: "https://thanhbinhit.com/sitemap.xml",
        host: "https://thanhbinhit.com",
    };
}
