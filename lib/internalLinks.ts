import { products, type Product } from "@/data/products";
import { CATEGORY_PATH_MAP, PRODUCT_CATEGORIES } from "@/lib/constants";

export type ResearchCluster =
  | "glp1-metabolic"
  | "growth-hormone"
  | "regenerative"
  | "longevity"
  | "metabolic-mitochondrial"
  | "cognitive-neuro"
  | "melanocortin-signaling"
  | "cosmetic-dermatological";

/** Generic anchor text that must not appear on internal links. */
export const PROHIBITED_ANCHOR_PATTERNS = [
  /^view details/i,
  /^learn more/i,
  /^click here/i,
  /^view research profile/i,
  /^view all\s*→?$/i,
  /^read more$/i,
] as const;

const CLUSTER_LABELS: Record<ResearchCluster, string> = {
  "glp1-metabolic": "GLP-1 & Incretin Research",
  "growth-hormone": "Growth Hormone Axis Research",
  regenerative: "Regenerative & Tissue Research",
  longevity: "Longevity & Aging Research",
  "metabolic-mitochondrial": "Mitochondrial & Metabolic Research",
  "cognitive-neuro": "Cognitive & Neuroscience Research",
  "melanocortin-signaling": "Melanocortin Signaling Research",
  "cosmetic-dermatological": "Cosmetic & Dermatological Research",
};

/** Short SEO keyword labels for peptide categories. */
export const CATEGORY_SEO_KEYWORDS: Record<string, string> = {
  "GLP-1 / Metabolic Peptides": "GLP-1 Metabolic Peptides",
  "Growth Hormone & Recovery Peptides": "Growth Hormone Peptides",
  "Cognitive / Nootropic Peptides": "Nootropic Peptides",
  "Cosmetic / Anti-aging Peptides": "Cosmetic Anti-aging Peptides",
  "Research / Regenerative Peptides": "Research Regenerative Peptides",
};

/** Homepage category card copy with required topical keywords. */
export const HOMEPAGE_CATEGORY_LINKS = [
  {
    category: "GLP-1 / Metabolic Peptides" as const,
    title: "GLP-1 Metabolic Peptides",
    description: "Tirzepatide, semaglutide, and incretin pathway peptides for metabolic research.",
    anchor: "Browse GLP-1 Metabolic Peptides",
  },
  {
    category: "Growth Hormone & Recovery Peptides" as const,
    title: "Growth Hormone Peptides",
    description: "GH secretagogues and recovery peptides for endocrine and tissue research.",
    anchor: "Browse Growth Hormone Peptides",
  },
  {
    category: "Cognitive / Nootropic Peptides" as const,
    title: "Nootropic Peptides",
    description: "Selank, semax, and neuropeptides for cognitive neuroscience research.",
    anchor: "Browse Nootropic Peptides",
  },
  {
    category: "Cosmetic / Anti-aging Peptides" as const,
    title: "Cosmetic Peptides",
    description: "GHK-Cu, Matrixyl, and dermatological peptides for anti-aging research.",
    anchor: "Browse Cosmetic Anti-aging Peptides",
  },
  {
    category: "Research / Regenerative Peptides" as const,
    title: "Research Regenerative Peptides",
    description: "BPC-157, SS-31, and specialty signaling peptides for regenerative studies.",
    anchor: "Browse Research Regenerative Peptides",
  },
] as const;

const PRODUCT_FUNCTION_KEYWORDS: Record<string, string> = {
  tirzepatide: "GLP-1 peptide",
  semaglutide: "GLP-1 peptide",
  retatrutide: "metabolic peptide",
  cagrilintide: "metabolic peptide",
  tesamorelin: "growth hormone peptide",
  ipamorelin: "growth hormone peptide",
  "cjc-1295-without-dac": "growth hormone peptide",
  "hgh-fragment-176-191": "growth hormone peptide",
  "tb-500": "recovery peptide",
  "bpc-157": "regenerative peptide",
  epitalon: "nootropic peptide",
  "mots-c": "mitochondrial peptide",
  "ss-31": "regenerative peptide",
  selank: "nootropic peptide",
  semax: "nootropic peptide",
  "pt-141": "melanocortin peptide",
  "melanotan-ii": "cosmetic peptide",
  "ghk-cu": "cosmetic peptide",
  "matrixyl-3000": "cosmetic peptide",
  "snap-8": "cosmetic peptide",
  "syn-ake": "cosmetic peptide",
};

const CATEGORY_FUNCTION_FALLBACK: Record<string, string> = {
  "GLP-1 / Metabolic Peptides": "GLP-1 peptide",
  "Growth Hormone & Recovery Peptides": "growth hormone peptide",
  "Cognitive / Nootropic Peptides": "nootropic peptide",
  "Cosmetic / Anti-aging Peptides": "cosmetic peptide",
  "Research / Regenerative Peptides": "research peptide",
};

export function isProhibitedAnchor(text: string): boolean {
  const normalized = text.replace(/→/g, "").trim();
  return PROHIBITED_ANCHOR_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function getCategorySeoKeyword(category: string): string {
  return CATEGORY_SEO_KEYWORDS[category] ?? category;
}

export function getCategoryPath(category: string): string | undefined {
  return CATEGORY_PATH_MAP[category];
}

export function getCategoryLinkText(category: string): string {
  return `Browse ${getCategorySeoKeyword(category)} for Research`;
}

export function getCategoryBrowseAllText(category: string): string {
  return `View all ${getCategorySeoKeyword(category)} →`;
}

export function getCategoryBreadcrumbLabel(category: string): string {
  return getCategorySeoKeyword(category);
}

export function getProductFunctionKeyword(product: Product): string {
  return (
    PRODUCT_FUNCTION_KEYWORDS[product.slug] ??
    CATEGORY_FUNCTION_FALLBACK[product.category] ??
    "research peptide"
  );
}

export function getProductLinkText(product: Product): string {
  return `${product.name} ${getProductFunctionKeyword(product)}`;
}

export function getProductSeoTitle(product: Product): string {
  return `${product.name} – ${getCategorySeoKeyword(product.category)}`;
}

function researchPeptideCluster(product: Product): ResearchCluster {
  const text = `${product.name} ${product.description}`.toLowerCase();

  if (/(tissue|repair|regenerative|thymosin|bpc)/.test(text)) return "regenerative";
  if (/(aging|telomere|epitalon)/.test(text)) return "longevity";
  if (/(mitochondri|mots|oxidative|elamipretide|metabolic)/.test(text)) return "metabolic-mitochondrial";
  if (/(cognitive|neuro|selank|semax|acth|neuroprotective)/.test(text)) return "cognitive-neuro";
  if (/(melanocortin|bremelanotide|melanotan)/.test(text)) return "melanocortin-signaling";

  return "regenerative";
}

export function getResearchCluster(product: Product): ResearchCluster {
  switch (product.category) {
    case "GLP-1 / Metabolic Peptides":
      return "glp1-metabolic";
    case "Growth Hormone & Recovery Peptides":
      return "growth-hormone";
    case "Cosmetic / Anti-aging Peptides":
      return "cosmetic-dermatological";
    default:
      return researchPeptideCluster(product);
  }
}

export function getClusterLabel(cluster: ResearchCluster) {
  return CLUSTER_LABELS[cluster];
}

export function getRelatedProducts(product: Product, limit = 5): Product[] {
  const cluster = getResearchCluster(product);
  const sameCluster = products.filter(
    (p) => p.slug !== product.slug && getResearchCluster(p) === cluster
  );

  if (sameCluster.length >= limit) return sameCluster.slice(0, limit);

  const sameCategory = products.filter(
    (p) =>
      p.slug !== product.slug &&
      p.category === product.category &&
      getResearchCluster(p) !== cluster
  );

  return [...sameCluster, ...sameCategory].slice(0, limit);
}

export type InternalLinkAuditIssue = {
  file: string;
  anchor: string;
  reason: string;
};

/** Scan source files for prohibited internal link anchor text. */
export function auditInternalLinkAnchors(
  sources: { file: string; content: string }[]
): InternalLinkAuditIssue[] {
  const issues: InternalLinkAuditIssue[] = [];
  const linkTextPattern = />([^<]{3,80})<\s*\/?(?:Link|a)\b/gi;

  for (const { file, content } of sources) {
    for (const pattern of PROHIBITED_ANCHOR_PATTERNS) {
      if (pattern.test(content)) {
        const match = content.match(new RegExp(`>([^<]*${pattern.source.replace(/^\^|\$$/g, "")}[^<]*)<`, "i"));
        issues.push({
          file,
          anchor: match?.[1]?.trim() ?? pattern.source,
          reason: `Prohibited generic anchor: ${pattern.source}`,
        });
      }
    }

    let match: RegExpExecArray | null;
    const localPattern = linkTextPattern;
    localPattern.lastIndex = 0;
    while ((match = localPattern.exec(content)) !== null) {
      const anchor = match[1].replace(/\s+/g, " ").trim();
      if (isProhibitedAnchor(anchor)) {
        issues.push({
          file,
          anchor,
          reason: "Prohibited generic anchor text on internal link",
        });
      }
    }
  }

  return issues;
}

export function assertCategoryLinksConfigured(): string[] {
  const missing = PRODUCT_CATEGORIES.filter(
    (category) => !CATEGORY_PATH_MAP[category] || !CATEGORY_SEO_KEYWORDS[category]
  );
  return missing;
}
