import type { Metadata } from "next";
import type { Product } from "@/data/products";
import { getProduct } from "@/data/products";
import { CATEGORY_PATH_MAP, DISCLAIMER, FAQ, SITE_EMAIL, SITE_NAME, siteUrl } from "@/lib/constants";

const CATEGORY_SEO_KEYWORDS: Record<string, string> = {
  "GLP-1 / Metabolic Peptides": "GLP-1 Metabolic Peptides",
  "Growth Hormone & Recovery Peptides": "Growth Hormone Peptides",
  "Cognitive / Nootropic Peptides": "Nootropic Peptides",
  "Cosmetic / Anti-aging Peptides": "Cosmetic Anti-aging Peptides",
  "Research / Regenerative Peptides": "Research Regenerative Peptides",
};

const KEYWORD_LANDING_SLUGS = ["tirzepatide", "semaglutide", "retatrutide"] as const;
type KeywordLandingSlug = (typeof KEYWORD_LANDING_SLUGS)[number];

const PRIMARY_KEYWORDS: Record<KeywordLandingSlug, string> = {
  tirzepatide: "Tirzepatide peptide",
  semaglutide: "Semaglutide GLP-1 peptide",
  retatrutide: "Retatrutide metabolic peptide",
};

const CATEGORY_META_SUFFIX: Record<string, string> = {
  "GLP-1 / Metabolic Peptides": "GLP-1 Metabolic Research Peptide",
  "Growth Hormone & Recovery Peptides": "Growth Hormone Research Peptide",
  "Cognitive / Nootropic Peptides": "Nootropic Research Peptide",
  "Cosmetic / Anti-aging Peptides": "Cosmetic Research Peptide",
  "Research / Regenerative Peptides": "Regenerative Research Peptide",
};

const PRODUCT_CATEGORY = "Research Peptide";
const B2B_INTENDED_USE = "Research Use Only / Inquiry Based Supply";

function getCategorySeoKeyword(category: string) {
  return CATEGORY_SEO_KEYWORDS[category] ?? category;
}

function isKeywordLandingPage(slug: string): slug is KeywordLandingSlug {
  return (KEYWORD_LANDING_SLUGS as readonly string[]).includes(slug);
}

function getProductMetaTitle(product: Product) {
  const suffix = CATEGORY_META_SUFFIX[product.category] ?? "Research Peptide";
  const primary = isKeywordLandingPage(product.slug) ? PRIMARY_KEYWORDS[product.slug] : undefined;
  if (primary) return `${primary} | ${suffix}`;
  return `${product.name} | ${suffix}`;
}

function getProductMetaDescription(product: Product) {
  const primary = isKeywordLandingPage(product.slug) ? PRIMARY_KEYWORDS[product.slug] : undefined;
  if (primary) {
    return `${primary} for laboratory research. ${product.description} Research-grade compound (${product.purity} purity) with COA, LC-MS, HPLC, and NMR documentation for academic, biotech, and pharmaceutical metabolic research. Not intended for medical or therapeutic use.`;
  }
  return `${product.name} is a research peptide for laboratory research. ${product.description} Research-grade compound (${product.purity} purity) with COA, LC-MS, HPLC, and NMR documentation for academic, biotech, and pharmaceutical research. Not intended for medical or therapeutic use.`;
}

function getProductSchemaDescription(product: Product) {
  const primary = isKeywordLandingPage(product.slug) ? PRIMARY_KEYWORDS[product.slug] : undefined;
  if (primary) return `${primary}: ${product.description}`;
  return product.description;
}

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

export function productPageTitle(product: Product) {
  return getProductMetaTitle(product);
}

export function productSeoDescription(product: Product) {
  return getProductMetaDescription(product);
}

export function generateProductMetadata(product: Product): Metadata {
  const path = `/peptides/${product.slug}`;
  const title = productPageTitle(product);
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

export function productSchema(
  p: Pick<Product, "name" | "description" | "slug" | "cas" | "category">
) {
  const url = siteUrl(`/peptides/${p.slug}`);
  const schemaDescription = getProductSchemaDescription(p as Product);
  const additionalProperty: Array<{ "@type": "PropertyValue"; name: string; value: string }> = [
    { "@type": "PropertyValue", name: "Intended Use", value: B2B_INTENDED_USE },
  ];

  if (p.cas) {
    additionalProperty.unshift({
      "@type": "PropertyValue",
      name: "CAS Registry Number",
      value: p.cas,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: `${schemaDescription} ${DISCLAIMER}`,
    sku: p.slug,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: PRODUCT_CATEGORY,
    url,
    additionalProperty,
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

export function categoryPageSchemas(
  categoryProducts: Product[],
  faqs: { q: string; a: string }[],
  breadcrumbItems: { name: string; path: string }[]
) {
  return [
    ...categoryProducts.map((p) => productSchema(p)),
    productFaqSchema(faqs),
    breadcrumbSchema(breadcrumbItems),
  ];
}

export const categoryBreadcrumbItems = (category: string, categoryPath: string) => [
  { name: "Home", path: "/" },
  { name: "Peptides", path: "/peptides" },
  { name: getCategorySeoKeyword(category), path: categoryPath },
];

export const productBreadcrumbItems = (product: Pick<Product, "name" | "slug" | "category">) => {
  const items: { name: string; path: string }[] = [
    { name: "Home", path: "/" },
    { name: "Peptides", path: "/peptides" },
  ];
  const categoryPath = CATEGORY_PATH_MAP[product.category];
  if (categoryPath) {
    items.push({ name: getCategorySeoKeyword(product.category), path: categoryPath });
  }
  items.push({ name: product.name, path: `/peptides/${product.slug}` });
  return items;
};

export const globalSchemas = [orgSchema, webSchema, faqSchema];
