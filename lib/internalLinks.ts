import { products, type Product } from "@/data/products";

export type ResearchCluster =
  | "glp1-metabolic"
  | "growth-hormone"
  | "regenerative"
  | "longevity"
  | "metabolic-mitochondrial"
  | "cognitive-neuro"
  | "melanocortin-signaling"
  | "cosmetic-dermatological";

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
    case "GLP-1 Related Peptides":
      return "glp1-metabolic";
    case "Growth Hormone Peptides":
      return "growth-hormone";
    case "Cosmetic Peptides":
      return "cosmetic-dermatological";
    default:
      return researchPeptideCluster(product);
  }
}

export function getClusterLabel(cluster: ResearchCluster) {
  return CLUSTER_LABELS[cluster];
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
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
