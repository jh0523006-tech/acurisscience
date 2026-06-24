import type { Product } from "@/data/products";
import { products } from "@/data/products";
import { getProductContentFacts, productContentFacts } from "@/data/product-content/facts";
import type { ProductRichContent } from "@/data/product-content/types";

const missingContent = products.filter((p) => !productContentFacts[p.slug]);
if (missingContent.length > 0) {
  throw new Error(
    `Missing ranking content for product slugs: ${missingContent.map((p) => p.slug).join(", ")}`
  );
}

function buildExperimental(product: Product, facts: NonNullable<ReturnType<typeof getProductContentFacts>>) {
  return {
    stability: `${facts.stabilityNotes} Lyophilized ${product.name} should be protected from repeated freeze-thaw cycles, moisture, and prolonged exposure to ambient light where applicable. Analytical integrity is best preserved when material is stored under the conditions specified on the certificate of analysis.`,
    storage: `${product.storage}. ${product.name} is supplied as ${product.appearance.toLowerCase()}. For long-term archival storage in research inventories, maintain sealed containers with desiccant where recommended and document lot numbers for traceability across experimental runs.`,
    handling: `${facts.handlingNotes} Reconstitute only with appropriate research-grade solvents compatible with your assay format. Allow vials to reach equilibrium before opening, work under clean bench conditions, and label all working solutions with concentration, date, and researcher ID per institutional SOPs.`,
  };
}

function buildFaq(product: Product, facts: NonNullable<ReturnType<typeof getProductContentFacts>>) {
  return {
    researchUse: facts.faqResearchUse,
    mechanism: facts.faqMechanism,
    receptors: facts.faqReceptors,
    roomTempStability: `${facts.stabilityNotes} For short-term laboratory workflows, minimize time at room temperature and return unused material to recommended storage promptly. ${product.name} is not formulated for ambient long-term storage.`,
    storageRecommendation: `${product.storage}. Store lyophilized material in a dedicated −20°C freezer, protect from moisture ingress, and avoid repeated temperature cycling. Reconstituted solutions should be aliquoted and frozen if not used within the validated window of your internal stability study.`,
  };
}

export function getProductContent(product: Product): ProductRichContent {
  const facts = getProductContentFacts(product.slug);
  if (!facts) {
    throw new Error(`Missing ranking content for product slug: ${product.slug}`);
  }

  return {
    overview: {
      whatItIs: `${facts.identity} Supplied at ${product.purity} purity (${product.molecularFormula}; ${product.molecularWeight}), this material supports controlled laboratory investigation under research-use-only conditions.`,
      mechanism: facts.mechanism,
      receptors: facts.receptors,
    },
    researchApplications: facts.applications.map((app) => ({
      title: app.title,
      description: app.body,
    })),
    molecular: {
      chainSummary: facts.chainSummary,
      modification: facts.modification,
      structuralNotes: `${facts.structuralNotes} Batch-specific molecular characterization—including mass confirmation and purity profiling—is available through COA, LC-MS, HPLC, and NMR documentation supplied with ${product.name}.`,
    },
    experimental: buildExperimental(product, facts),
    faq: buildFaq(product, facts),
  };
}

export function buildProductFaqItems(product: Product, content: ProductRichContent) {
  return [
    { q: `What is ${product.name} used for in research?`, a: content.faq.researchUse },
    { q: `How does ${product.name} work biologically?`, a: content.faq.mechanism },
    { q: `What receptors does ${product.name} interact with?`, a: content.faq.receptors },
    { q: `Is ${product.name} stable at room temperature?`, a: content.faq.roomTempStability },
    { q: `What is the recommended storage condition for ${product.name}?`, a: content.faq.storageRecommendation },
  ];
}
