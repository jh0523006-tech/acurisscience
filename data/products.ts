export interface Product {
  slug: string;
  name: string;
  cas: string;
  category: string;
  purity: string;
  molecularFormula: string;
  molecularWeight: string;
  appearance: string;
  storage: string;
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  { slug: "tirzepatide", name: "Tirzepatide", cas: "2023788-19-2", category: "GLP-1 / Metabolic Peptides", purity: "≥98%", molecularFormula: "C225H348N48O68", molecularWeight: "4813.5 g/mol", appearance: "White to off-white lyophilized powder", storage: "Store at -20°C, desiccated", description: "Dual GIP/GLP-1 receptor agonist for metabolic research.", featured: true },
  { slug: "semaglutide", name: "Semaglutide", cas: "910463-68-2", category: "GLP-1 / Metabolic Peptides", purity: "≥98%", molecularFormula: "C187H291N45O59", molecularWeight: "4113.6 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C, desiccated", description: "GLP-1 receptor agonist for glucose regulation research.", featured: true },
  { slug: "retatrutide", name: "Retatrutide", cas: "", category: "GLP-1 / Metabolic Peptides", purity: "≥98%", molecularFormula: "C267H402N64O78", molecularWeight: "6021.0 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Triple incretin receptor agonist for advanced metabolic studies.", featured: true },
  { slug: "cagrilintide", name: "Cagrilintide", cas: "1415456-99-3", category: "GLP-1 / Metabolic Peptides", purity: "≥98%", molecularFormula: "C194H295N45O59", molecularWeight: "4258.7 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Long-acting amylin analogue for metabolic research.", featured: true },
  { slug: "tesamorelin", name: "Tesamorelin", cas: "901758-09-6", category: "Growth Hormone & Recovery Peptides", purity: "≥98%", molecularFormula: "C221H366N72O67S", molecularWeight: "5135.9 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "GHRH analogue for endocrine signaling research.", featured: true },
  { slug: "ipamorelin", name: "Ipamorelin", cas: "170851-70-4", category: "Growth Hormone & Recovery Peptides", purity: "≥98%", molecularFormula: "C38H49N9O5", molecularWeight: "711.9 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Selective GH secretagogue for endocrine research." },
  { slug: "cjc-1295-without-dac", name: "CJC-1295 Without DAC", cas: "863288-34-0", category: "Growth Hormone & Recovery Peptides", purity: "≥98%", molecularFormula: "C152H252N44O42", molecularWeight: "3367.9 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "GHRH analogue peptide for growth hormone research." },
  { slug: "hgh-fragment-176-191", name: "HGH Fragment 176-191", cas: "66004-57-7", category: "Growth Hormone & Recovery Peptides", purity: "≥98%", molecularFormula: "C78H125N23O23S", molecularWeight: "1817.1 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Truncated GH fragment for metabolic research." },
  { slug: "bpc-157", name: "BPC-157 (Acetate)", cas: "137525-51-0", category: "Research / Regenerative Peptides", purity: "≥98%", molecularFormula: "C62H98N16O22", molecularWeight: "1419.5 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Pentadecapeptide for tissue repair research.", featured: true },
  { slug: "tb-500", name: "TB-500 (Thymosin Beta-4)", cas: "77591-33-4", category: "Growth Hormone & Recovery Peptides", purity: "≥98%", molecularFormula: "C212H350N56O78S", molecularWeight: "4963.5 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Thymosin beta-4 fragment for regenerative research." },
  { slug: "epitalon", name: "Epitalon", cas: "307297-39-8", category: "Cognitive / Nootropic Peptides", purity: "≥98%", molecularFormula: "C14H22N4O9", molecularWeight: "390.3 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Tetrapeptide studied in aging research." },
  { slug: "mots-c", name: "MOTS-c", cas: "1627580-64-6", category: "Cognitive / Nootropic Peptides", purity: "≥98%", molecularFormula: "C101H152N28O22S2", molecularWeight: "2174.6 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Mitochondrial-derived peptide for metabolic research." },
  { slug: "ss-31", name: "SS-31 (Elamipretide)", cas: "736992-21-5", category: "Research / Regenerative Peptides", purity: "≥98%", molecularFormula: "C32H49N9O5", molecularWeight: "639.8 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Mitochondria-targeted peptide for oxidative stress research." },
  { slug: "selank", name: "Selank", cas: "129954-34-3", category: "Cognitive / Nootropic Peptides", purity: "≥98%", molecularFormula: "C33H57N11O9", molecularWeight: "751.9 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Neuropeptide for cognitive neuroscience research." },
  { slug: "semax", name: "Semax", cas: "80714-61-0", category: "Cognitive / Nootropic Peptides", purity: "≥98%", molecularFormula: "C37H51N9O10", molecularWeight: "813.9 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "ACTH analogue for neuroprotective mechanism research." },
  { slug: "pt-141", name: "PT-141 (Bremelanotide)", cas: "189691-06-3", category: "Research / Regenerative Peptides", purity: "≥98%", molecularFormula: "C50H68N14O10", molecularWeight: "1025.2 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Melanocortin receptor agonist for specialty research." },
  { slug: "melanotan-ii", name: "Melanotan II", cas: "121062-08-6", category: "Cosmetic / Anti-aging Peptides", purity: "≥98%", molecularFormula: "C50H69N15O9", molecularWeight: "1024.2 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Cyclic peptide for melanocortin signaling research." },
  { slug: "ghk-cu", name: "GHK-Cu (Copper Peptide)", cas: "49557-75-7", category: "Cosmetic / Anti-aging Peptides", purity: "≥98%", molecularFormula: "C14H24CuN6O4", molecularWeight: "403.9 g/mol", appearance: "Blue-green lyophilized powder", storage: "Store at -20°C, protect from light", description: "Copper-binding tripeptide for dermatological research." },
  { slug: "matrixyl-3000", name: "Matrixyl 3000", cas: "", category: "Cosmetic / Anti-aging Peptides", purity: "≥95%", molecularFormula: "Peptide Blend", molecularWeight: "N/A", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Palmitoylated oligopeptide blend for matrix research." },
  { slug: "snap-8", name: "Snap-8", cas: "", category: "Cosmetic / Anti-aging Peptides", purity: "≥98%", molecularFormula: "C50H69N15O10", molecularWeight: "1075.2 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Octapeptide for cosmetic science research." },
  { slug: "syn-ake", name: "Syn-Ake", cas: "", category: "Cosmetic / Anti-aging Peptides", purity: "≥98%", molecularFormula: "C19H29N3O6", molecularWeight: "395.5 g/mol", appearance: "White lyophilized powder", storage: "Store at -20°C", description: "Synthetic tripeptide for dermatological research." },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductSlugs() {
  return products.map((p) => p.slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function formatCas(cas: string) {
  return cas.trim() || "Available Upon Request";
}

export function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}

export function getProductsByCategory() {
  const map: Record<string, Product[]> = {};
  for (const p of products) {
    if (!map[p.category]) map[p.category] = [];
    map[p.category].push(p);
  }
  return map;
}
