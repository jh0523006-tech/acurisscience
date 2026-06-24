import type { Metadata } from "next";
import type { Product } from "@/data/products";
import { getProduct } from "@/data/products";
import { CATEGORY_PATH_MAP, DISCLAIMER, FAQ, SITE_EMAIL, SITE_NAME, siteUrl } from "@/lib/constants";
import { getCategorySeoKeyword } from "@/lib/internalLinks";
import {
  GLP1_ENTITY_SLUGS,
  getProductMetaDescription,
  getProductMetaTitle,
  getProductSchemaDescription,
  isKeywordLandingPage,
} from "@/lib/product-seo";

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

const RESEARCH_DOCUMENTATION_USE =
  "For laboratory research and scientific documentation use only. Not intended for human consumption, therapeutic use, or diagnostic procedures.";

export function productSchema(
  p: Pick<
    Product,
    | "name"
    | "description"
    | "slug"
    | "cas"
    | "purity"
    | "category"
    | "molecularFormula"
    | "molecularWeight"
  >
) {
  const url = siteUrl(`/peptides/${p.slug}`);
  const categoryLabel = getCategorySeoKeyword(p.category);
  const schemaDescription = getProductSchemaDescription(p as Product);

  const entityRefs = isKeywordLandingPage(p.slug)
    ? GLP1_ENTITY_SLUGS.filter((slug) => slug !== p.slug)
        .map((slug) => getProduct(slug))
        .filter(Boolean)
        .map((related) => siteUrl(`/peptides/${related!.slug}`))
    : [];

  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: `${p.name} — Research Peptide Documentation`,
    name: p.name,
    description: `${schemaDescription} ${DISCLAIMER}`,
    url,
    inLanguage: "en-US",
    genre: "Research Documentation",
    keywords: [p.name, categoryLabel, "research peptide", "laboratory research"].join(", "),
    author: { "@type": "Organization", name: SITE_NAME, url: siteUrl() },
    publisher: { "@type": "Organization", name: SITE_NAME, url: siteUrl() },
    audience: {
      "@type": "Audience",
      audienceType: "Research scientists and laboratory professionals",
    },
    usageInfo: RESEARCH_DOCUMENTATION_USE,
    about: {
      "@type": "MolecularEntity",
      name: p.name,
      ...(p.cas
        ? {
            identifier: {
              "@type": "PropertyValue",
              propertyID: "CAS Registry Number",
              value: p.cas,
            },
          }
        : {}),
      molecularFormula: p.molecularFormula,
      ...(p.molecularWeight && p.molecularWeight !== "N/A"
        ? { molecularMass: p.molecularWeight }
        : {}),
    },
    ...(entityRefs.length > 0
      ? {
          mentions: entityRefs.map((refUrl) => ({
            "@type": "ScholarlyArticle",
            url: refUrl,
          })),
        }
      : {}),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "CAS Registry Number",
        value: p.cas || "Available Upon Request",
      },
      { "@type": "PropertyValue", name: "Molecular Formula", value: p.molecularFormula },
      { "@type": "PropertyValue", name: "Molecular Weight", value: p.molecularWeight },
      { "@type": "PropertyValue", name: "Analytical Purity", value: p.purity },
      { "@type": "PropertyValue", name: "Intended Use", value: RESEARCH_DOCUMENTATION_USE },
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
