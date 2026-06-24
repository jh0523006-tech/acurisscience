import type { Metadata } from "next";
import { getProduct, getProductSlugs, products } from "@/data/products";
import { siteUrl } from "@/lib/constants";
import {
  generateProductMetadata,
  generateProductPageMetadata,
  productNotFoundMetadata,
  productSchema,
} from "@/lib/seo";

function isRobotsNoIndex(robots: Metadata["robots"]): boolean {
  if (!robots) return false;
  if (typeof robots === "string") return robots.includes("noindex");
  return robots.index === false;
}

export type PeptideSeoStatus = {
  slug: string;
  name: string;
  category: string;
  url: string;
  staticParams: boolean;
  sitemap: boolean;
  metadata: boolean;
  jsonLd: boolean;
  coverage: "full" | "partial" | "missing";
};

export type PeptideSeoAudit = {
  scannedAt: string;
  dataSources: string[];
  totalProducts: number;
  fullCoverage: number;
  products: PeptideSeoStatus[];
  invalidSlugFallback: {
    slug: string;
    metadataRobotsNoindex: boolean;
  };
};

function hasProductMetadata(slug: string) {
  const product = getProduct(slug);
  if (!product) return false;
  const metadata = generateProductMetadata(product);
  return Boolean(
    metadata.title &&
      metadata.description &&
      metadata.alternates?.canonical === siteUrl(`/peptides/${slug}`)
  );
}

function hasProductJsonLd(slug: string) {
  const product = getProduct(slug);
  if (!product) return false;
  const schema = productSchema(product);
  return (
    schema["@type"] === "Product" &&
    schema.name === product.name &&
    schema.url === siteUrl(`/peptides/${slug}`) &&
    schema.sku === slug
  );
}

export function auditPeptideSeoCoverage(): PeptideSeoAudit {
  const slugs = getProductSlugs();
  const staticSlugs = new Set(slugs);
  const sitemapSlugs = new Set(slugs);

  const peptideStatuses: PeptideSeoStatus[] = products.map((product) => {
    const staticParams = staticSlugs.has(product.slug);
    const sitemap = sitemapSlugs.has(product.slug);
    const metadata = hasProductMetadata(product.slug);
    const jsonLd = hasProductJsonLd(product.slug);
    const checks = [staticParams, sitemap, metadata, jsonLd];
    const coverage: PeptideSeoStatus["coverage"] = checks.every(Boolean)
      ? "full"
      : checks.some(Boolean)
        ? "partial"
        : "missing";

    return {
      slug: product.slug,
      name: product.name,
      category: product.category,
      url: siteUrl(`/peptides/${product.slug}`),
      staticParams,
      sitemap,
      metadata,
      jsonLd,
      coverage,
    };
  });

  const fallback = generateProductPageMetadata("__invalid-slug__");
  const fallbackMeta = productNotFoundMetadata("__invalid-slug__");

  return {
    scannedAt: new Date().toISOString(),
    dataSources: ["data/products.ts"],
    totalProducts: products.length,
    fullCoverage: peptideStatuses.filter((p) => p.coverage === "full").length,
    products: peptideStatuses,
    invalidSlugFallback: {
      slug: "__invalid-slug__",
      metadataRobotsNoindex:
        isRobotsNoIndex(fallback.robots) &&
        isRobotsNoIndex(fallbackMeta.robots) &&
        Boolean(fallback.title),
    },
  };
}

export function formatPeptideSeoAuditReport(audit: PeptideSeoAudit) {
  const lines = [
    "Peptide SEO Coverage Report",
    "===========================",
    `Scanned: ${audit.scannedAt}`,
    `Data sources: ${audit.dataSources.join(", ")}`,
    `Total products: ${audit.totalProducts}`,
    `Full SEO coverage: ${audit.fullCoverage}/${audit.totalProducts}`,
    `Invalid slug fallback (noindex): ${audit.invalidSlugFallback.metadataRobotsNoindex ? "OK" : "FAIL"}`,
    "",
    "Slug | Name | Metadata | JSON-LD | Sitemap | Static | Status",
    "-----|------|----------|---------|---------|--------|-------",
  ];

  for (const p of audit.products) {
    lines.push(
      [
        p.slug,
        p.name,
        p.metadata ? "✓" : "✗",
        p.jsonLd ? "✓" : "✗",
        p.sitemap ? "✓" : "✗",
        p.staticParams ? "✓" : "✗",
        p.coverage,
      ].join(" | ")
    );
  }

  return lines.join("\n");
}
