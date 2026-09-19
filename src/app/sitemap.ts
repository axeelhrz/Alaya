import type { MetadataRoute } from "next";
import { shapers } from "../../content/shapers";
import { boards } from "../../content/boards";
import { getAllPosts } from "@/lib/posts";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://alayadivision.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/new",
    "/apparel",
    "/surf",
    "/surf/boards",
    "/surf/shapers",
    "/surf/encuentra-tu-tabla",
    "/pide-cita",
    "/built-on-connection",
    "/about",
    "/contact",
    "/aviso-legal",
    "/customer-service",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const shaperRoutes = shapers.map((s) => ({
    url: `${base}/surf/shapers/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const boardRoutes = boards.map((b) => ({
    url: `${base}/surf/boards/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${base}/new/${p.slug}`,
    lastModified: new Date(p.date || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...shaperRoutes, ...boardRoutes, ...postRoutes];
}
