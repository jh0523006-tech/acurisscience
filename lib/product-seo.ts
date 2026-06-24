import type { Product } from "@/data/products";
import { formatCas } from "@/data/products";
import { getCategorySeoKeyword, getProductFunctionKeyword } from "@/lib/internalLinks";

/** Slugs upgraded to keyword-first ranking landing pages. */
export const KEYWORD_LANDING_SLUGS = ["tirzepatide", "semaglutide", "retatrutide"] as const;

export type KeywordLandingSlug = (typeof KEYWORD_LANDING_SLUGS)[number];

/** Primary SEO keyword — used as H1 and woven into meta + schema copy. */
const PRIMARY_KEYWORDS: Record<KeywordLandingSlug, string> = {
  tirzepatide: "Tirzepatide peptide",
  semaglutide: "Semaglutide GLP-1 peptide",
  retatrutide: "Retatrutide metabolic peptide",
};

/** 100–150 word SEO hook paragraphs for priority landing pages. */
const LANDING_INTROS: Record<KeywordLandingSlug, string> = {
  tirzepatide:
    "Tirzepatide peptide is a dual GIP/GLP-1 receptor agonist engineered for incretin pathway and metabolic research. This synthetic 39-amino-acid compound activates glucose-dependent insulinotropic polypeptide and glucagon-like peptide-1 receptors to coordinate pancreatic hormone secretion, hepatic glucose output, and central energy balance signaling in controlled laboratory models. Within the broader GLP-1 and metabolic research field, tirzepatide serves as a pharmacological probe for comparing dual incretin agonism against selective GLP-1 analogs such as semaglutide and advanced triple-receptor scaffolds like retatrutide. Research programs employ this GLP-1 peptide in islet perifusion, adipose biology, and receptor bias profiling assays—always under research-use-only conditions with documented COA, LC-MS, HPLC, and NMR characterization. Not intended for medical, therapeutic, or diagnostic application.",
  semaglutide:
    "Semaglutide GLP-1 peptide is a lipidated analog of native glucagon-like peptide-1 developed as a selective GLP-1 receptor agonist for laboratory metabolic research. The molecule incorporates DPP-4-resistant substitutions and albumin-binding lipidation that extend receptor engagement in pharmacokinetic and signaling studies. As a benchmark GLP-1 peptide within incretin biology, semaglutide enables investigators to model glucose-dependent insulin secretion, glucagon suppression, and gastric emptying kinetics without concurrent GIP receptor activation. Comparative metabolic research often positions semaglutide alongside dual incretin agonists such as tirzepatide peptide, triple agonists like retatrutide metabolic peptide, and amylin pathway tools including cagrilintide. Supplied at research grade with COA, LC-MS, HPLC, and NMR analytical documentation for academic, biotech, and pharmaceutical laboratory use only—not for human or therapeutic application.",
  retatrutide:
    "Retatrutide metabolic peptide is a triple receptor agonist targeting GLP-1, GIP, and glucagon receptors for advanced incretin and energy metabolism research. This investigational scaffold combines incretin-mimetic signaling with glucagon receptor engagement, enabling laboratory separation of thermogenic, hepatic lipid oxidation, and insulinotropic pathways in rodent and cell-based models. Within GLP-1 metabolic peptide research, retatrutide complements selective agonists such as semaglutide GLP-1 peptide and dual incretin compounds including tirzepatide peptide, while amylin analogs like cagrilintide address complementary satiety signaling nodes. Researchers apply this metabolic peptide in triple-receptor occupancy modeling, indirect calorimetry, and comparative pharmacology protocols with full analytical characterization via COA, LC-MS, HPLC, and NMR. Laboratory research use only—not intended for clinical or therapeutic application.",
};

/** Short category label used in H1 and intro copy for non-landing products. */
const CATEGORY_SHORT: Record<string, string> = {
  "GLP-1 / Metabolic Peptides": "GLP-1",
  "Growth Hormone & Recovery Peptides": "Growth Hormone",
  "Cognitive / Nootropic Peptides": "Nootropic",
  "Cosmetic / Anti-aging Peptides": "Cosmetic",
  "Research / Regenerative Peptides": "Research",
};

/** Title suffix for `<title>` tags — e.g. "GLP-1 Metabolic Research Peptide". */
const CATEGORY_META_SUFFIX: Record<string, string> = {
  "GLP-1 / Metabolic Peptides": "GLP-1 Metabolic Research Peptide",
  "Growth Hormone & Recovery Peptides": "Growth Hormone Research Peptide",
  "Cognitive / Nootropic Peptides": "Nootropic Research Peptide",
  "Cosmetic / Anti-aging Peptides": "Cosmetic Research Peptide",
  "Research / Regenerative Peptides": "Regenerative Research Peptide",
};

/** Research-context keywords woven into intro paragraphs by category. */
const CATEGORY_RESEARCH_CONTEXT: Record<string, string> = {
  "GLP-1 / Metabolic Peptides":
    "receptor agonist peptide studied in metabolic and appetite regulation research",
  "Growth Hormone & Recovery Peptides":
    "secretagogue peptide used in endocrine signaling and recovery research",
  "Cognitive / Nootropic Peptides":
    "neuropeptide studied in cognitive neuroscience and nootropic mechanism research",
  "Cosmetic / Anti-aging Peptides":
    "laboratory peptide used in dermatological and anti-aging research",
  "Research / Regenerative Peptides":
    "research peptide used in regenerative signaling and tissue repair studies",
};

/** High-intent keyword overrides for priority products (non-landing fallback). */
const PRODUCT_RESEARCH_CONTEXT: Record<string, string> = {
  cagrilintide:
    "long-acting amylin analogue peptide studied in metabolic and satiety research",
};

/** SEO anchor text for related-peptide internal links. */
const RELATED_LINK_ANCHORS: Record<string, string> = {
  tirzepatide: "Tirzepatide GLP-1 peptide research profile",
  semaglutide: "Semaglutide GLP-1 peptide research profile",
  retatrutide: "Retatrutide metabolic peptide overview",
  cagrilintide: "Cagrilintide metabolic peptide research profile",
  tesamorelin: "Tesamorelin growth hormone peptide research profile",
  ipamorelin: "Ipamorelin growth hormone peptide overview",
  "cjc-1295-without-dac": "CJC-1295 growth hormone peptide research profile",
  "hgh-fragment-176-191": "HGH Fragment growth hormone peptide overview",
  "tb-500": "TB-500 recovery peptide research profile",
  epitalon: "Epitalon nootropic peptide research profile",
  "mots-c": "MOTS-c mitochondrial peptide overview",
  selank: "Selank nootropic peptide research profile",
  semax: "Semax nootropic peptide overview",
  "bpc-157": "BPC-157 regenerative peptide research profile",
  "ss-31": "SS-31 regenerative peptide overview",
  "pt-141": "PT-141 melanocortin peptide research profile",
  "melanotan-ii": "Melanotan II cosmetic peptide research profile",
  "ghk-cu": "GHK-Cu cosmetic peptide overview",
  "matrixyl-3000": "Matrixyl 3000 cosmetic peptide research profile",
  "snap-8": "Snap-8 cosmetic peptide overview",
  "syn-ake": "Syn-Ake cosmetic peptide research profile",
};

/** GLP-1 entity cluster referenced in schema sameAs for landing pages. */
export const GLP1_ENTITY_SLUGS = ["semaglutide", "tirzepatide", "retatrutide", "cagrilintide"] as const;

export function isKeywordLandingPage(slug: string): slug is KeywordLandingSlug {
  return (KEYWORD_LANDING_SLUGS as readonly string[]).includes(slug);
}

export function getProductPrimaryKeyword(product: Product): string | undefined {
  if (isKeywordLandingPage(product.slug)) {
    return PRIMARY_KEYWORDS[product.slug];
  }
  return undefined;
}

export function getCategoryShortLabel(category: string): string {
  return CATEGORY_SHORT[category] ?? "Research";
}

export function getProductMetaTitle(product: Product): string {
  const suffix = CATEGORY_META_SUFFIX[product.category] ?? "Research Peptide";
  const primary = getProductPrimaryKeyword(product);
  if (primary) return `${primary} | ${suffix}`;
  return `${product.name} | ${suffix}`;
}

export function getProductH1(product: Product): string {
  return `${product.name} | CAS: ${formatCas(product.cas)}`;
}

export function getProductSeoIntro(product: Product): string {
  if (isKeywordLandingPage(product.slug)) {
    return LANDING_INTROS[product.slug];
  }

  const researchContext =
    PRODUCT_RESEARCH_CONTEXT[product.slug] ??
    CATEGORY_RESEARCH_CONTEXT[product.category] ??
    "laboratory peptide used in controlled research applications";

  const keyword = getProductFunctionKeyword(product);
  const categoryLabel = getCategorySeoKeyword(product.category);

  return `${product.name} is a ${researchContext}. This ${keyword} supports ${categoryLabel.toLowerCase()} investigations with documented COA, LC-MS, HPLC, and NMR analytical characterization. Supplied for laboratory use only—not intended for medical, therapeutic, or diagnostic application.`;
}

export function getProductMetaDescription(product: Product): string {
  const primary = getProductPrimaryKeyword(product);
  const keyword = getProductFunctionKeyword(product);
  if (primary) {
    return `${primary} for laboratory research. ${product.description} Research-grade compound (${product.purity} purity) with COA, LC-MS, HPLC, and NMR documentation for academic, biotech, and pharmaceutical metabolic research. Not intended for medical or therapeutic use.`;
  }
  return `${product.name} is a ${keyword} for laboratory research. ${product.description} Research-grade compound (${product.purity} purity) with COA, LC-MS, HPLC, and NMR documentation for academic, biotech, and pharmaceutical research. Not intended for medical or therapeutic use.`;
}

export function getProductSchemaDescription(product: Product): string {
  const primary = getProductPrimaryKeyword(product);
  if (primary) {
    return `${primary}: ${product.description}`;
  }
  return product.description;
}

export function getRelatedPeptideAnchor(product: Product): string {
  return (
    RELATED_LINK_ANCHORS[product.slug] ??
    `${product.name} ${getProductFunctionKeyword(product)} research profile`
  );
}

export function getRelatedPeptideAnchorBySlug(slug: string, name: string): string {
  return RELATED_LINK_ANCHORS[slug] ?? `${name} research peptide profile`;
}

export function getBackToCategoryText(category: string): string {
  return `← Back to ${getCategorySeoKeyword(category)}`;
}
