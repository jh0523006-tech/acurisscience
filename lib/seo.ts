import type { Metadata } from "next";
import type { Product } from "@/data/products";
import { getProduct } from "@/data/products";
import { FAQ, SITE_EMAIL, SITE_NAME, siteUrl } from "@/lib/constants";

const PRODUCT_CATEGORY = "Research Peptide";

export function meta({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = siteUrl(path);
  return {
    title,
    description,
    metadataBase: new URL(siteUrl()),
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_NAME, locale: "en_US", type: "website" },
  };
}

export function productPageTitle(name: string) {
  return `${name} Research Peptide`;
}

export function productSeoDescription(product: Product) {
  return `${product.name} research-grade peptide (${product.purity} purity) from ${SITE_NAME}. ${product.description} Includes COA, LC-MS, HPLC, and NMR documentation for academic, biotech, and pharmaceutical research.`;
}

export function generateProductMetadata(product: Product): Metadata {
  const path = `/peptides/${product.slug}`;
  const title = productPageTitle(product.name);
  const description = productSeoDescription(product);
  const url = siteUrl(path);

  return {
    title,
    description,
    metadataBase: new URL(siteUrl()),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
  };
}

export function productNotFoundMetadata(slug: string): Metadata {
  return {
    title: "Product Not Found",
    description: `The research peptide "${slug}" was not found. Browse our full catalog at ${SITE_NAME}.`,
    robots: { index: false, follow: true },
  };
}

export function generateProductPageMetadata(slug: string): Metadata {
  const product = getProduct(slug);
  if (!product) return productNotFoundMetadata(slug);
  return generateProductMetadata(product);
}

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: siteUrl(),
  email: SITE_EMAIL,
  description: "Chemical / Research Supplier",
  knowsAbout: ["Research Peptides", "Chemical Synthesis", "Analytical Standards"],
};

export const webSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: siteUrl(),
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl("/search")}?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function productSchema(p: Pick<Product, "name" | "description" | "slug" | "cas" | "purity">) {
  const url = siteUrl(`/peptides/${p.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    url,
    sku: p.slug,
    category: PRODUCT_CATEGORY,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "CAS", value: p.cas || "Available Upon Request" },
      { "@type": "PropertyValue", name: "Purity", value: p.purity },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
  };
}

export function productFaqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export const productBreadcrumbItems = (product: Pick<Product, "name" | "slug">) => [
  { name: "Home", path: "/" },
  { name: "Peptides", path: "/peptides" },
  { name: product.name, path: `/peptides/${product.slug}` },
];

export const globalSchemas = [orgSchema, webSchema, faqSchema];
