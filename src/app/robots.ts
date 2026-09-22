import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://alayadivision.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/panel", "/api/reservas", "/api/panel"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
