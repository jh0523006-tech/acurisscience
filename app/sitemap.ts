import type { MetadataRoute } from "next";
import { getProductSlugs } from "@/data/products";
import { CATEGORY_SEO, siteUrl } from "@/lib/constants";

const STATIC_PATHS = ["", "/peptides", "/services", "/about", "/contact", "/cas-search"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = STATIC_PATHS.map((path) => ({
    url: siteUrl(path),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryPages = Object.values(CATEGORY_SEO).map((category) => ({
    url: siteUrl(category.path),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const productPages = getProductSlugs().map((slug) => ({
    url: siteUrl(`/peptides/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
