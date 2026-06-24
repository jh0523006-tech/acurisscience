export const SITE_NAME = "Acuris Science";
export const CANONICAL_HOST = "www.acurisscience.com";
export const SITE_URL = `https://${CANONICAL_HOST}`;
export const SITE_EMAIL = "sales@acurisscience.com";

/** Absolute URL on the canonical https://www origin. */
export function siteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/peptides", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const RESEARCH_INTERESTS = [
  "Growth Hormone Peptides",
  "GLP-1 Related Peptides",
  "Research Peptides",
  "Cosmetic Peptides",
  "Custom Synthesis",
  "Analytical Standards",
  "Bulk Supply",
] as const;

export const HOME_WHY_CHOOSE = [
  {
    title: "Research Grade Quality",
    desc: "≥98% purity peptides for reproducible laboratory research.",
    image: "/images/why-ResearchGrade.png",
    alt: "Research grade peptide quality standards",
  },
  {
    title: "Professional Analysis Reports",
    desc: "COA, HPLC, LC-MS, NMR and third-party analytical testing reports available upon request.",
    image: "/images/COA.jpg",
    alt: "Professional analytical reports and COA documentation",
  },
  {
    title: "Global Shipping",
    desc: "Worldwide delivery to pharma, biotech and academic labs.",
    image: "/images/why-global-supply.jpg",
    alt: "Global peptide supply for research institutions",
  },
  {
    title: "Scientific Support",
    desc: "Responsive technical assistance for research inquiries.",
    image: "/images/why-fast-response.png",
    alt: "Scientific support for peptide research",
  },
] as const;

export const SERVICE_CARDS = [
  {
    title: "Custom Peptide Synthesis",
    desc: "Sequence-specific peptide synthesis tailored to research requirements, including modifications and purity specifications.",
    image: "/images/service-custom.jpg",
    alt: "Custom peptide synthesis laboratory",
  },
  {
    title: "Analytical Testing",
    desc: "LC-MS, HPLC and 1H NMR characterization supporting identity verification and purity assessment.",
    image: "/images/about-lab-lcms.png",
    alt: "LC-MS and analytical testing laboratory",
  },
  {
    title: "Bulk Research Supply",
    desc: "Milligram-to-gram scale peptide supply for pharmaceutical, biotech and academic research programs.",
    image: "/images/Bulk-Powder-3kg.jpg",
    alt: "Bulk research-grade peptide powder supply",
  },
  {
    title: "Technical Consultation",
    desc: "Scientific support for peptide selection, analytical documentation requests and handling recommendations.",
    image: "/images/bussiness-consultation.jpg",
    alt: "Technical consultation for peptide research programs",
  },
] as const;

export const ABOUT_LAB_GALLERY = [
  { image: "/images/about-capabilities.png", alt: "Laboratory capabilities" },
  { image: "/images/about-lab-lcms.png", alt: "Analytical laboratory" },
  { image: "/images/Moisture-Content-Analyzer.webp", alt: "Quality analysis laboratory" },
] as const;

export const ABOUT_TRUST_INDICATORS = [
  "≥98% Purity",
  "COA Available",
  "LC-MS Verified",
  "HPLC Verified",
  "NMR Verified",
  "Batch Documentation Available",
] as const;

export const FEATURED_CATEGORIES = [
  {
    slug: "growth-hormone-peptides",
    name: "Growth Hormone Peptides",
    desc: "Secretagogues and GH-related signaling peptides for endocrine research.",
    href: "/peptides?category=growth-hormone-peptides",
  },
  {
    slug: "glp-1-related-peptides",
    name: "GLP-1 Related Peptides",
    desc: "Metabolic and incretin pathway peptides for glucose regulation studies.",
    href: "/peptides?category=glp-1-related-peptides",
  },
  {
    slug: "research-peptides",
    name: "Research Peptides",
    desc: "Specialty peptides for tissue repair, longevity and neuroscience research.",
    href: "/peptides?category=research-peptides",
  },
  {
    slug: "custom-synthesis",
    name: "Custom Synthesis",
    desc: "Tailored peptide synthesis for specific research sequences.",
    href: "/services",
  },
  {
    slug: "analytical-standards",
    name: "Analytical Standards",
    desc: "Analytical characterization and documentation services.",
    href: "/services",
  },
] as const;

export const GLOBAL_REGIONS = [
  { name: "USA", top: "38%", left: "22%" },
  { name: "Canada", top: "28%", left: "24%" },
  { name: "Europe", top: "32%", left: "52%" },
  { name: "Japan", top: "40%", left: "84%" },
  { name: "Singapore", top: "58%", left: "76%" },
  { name: "Australia", top: "72%", left: "82%" },
] as const;

export const SERVICES = [
  {
    title: "Custom Peptide Synthesis",
    desc: "Sequence-specific synthesis tailored to research requirements and purity specifications.",
  },
  {
    title: "LC-MS Analysis",
    desc: "Mass spectrometry identity verification and molecular weight confirmation.",
  },
  {
    title: "HPLC Analysis",
    desc: "Chromatographic purity assessment and batch composition analysis.",
  },
  {
    title: "NMR Analysis",
    desc: "Structural characterization and peptide sequence confirmation.",
  },
  {
    title: "Purity Verification",
    desc: "Rigorous quality control with Certificate of Analysis documentation.",
  },
  {
    title: "Technical Support",
    desc: "Scientific guidance and responsive research program assistance.",
  },
] as const;

export const QUALITY_ASSURANCE_ITEMS = [
  "COA Available",
  "LC-MS Verified",
  "HPLC Tested",
  "Research Grade Quality",
] as const;

export const PRODUCT_CATEGORIES = [
  "GLP-1 / Metabolic Peptides",
  "Growth Hormone & Recovery Peptides",
  "Cognitive / Nootropic Peptides",
  "Cosmetic / Anti-aging Peptides",
  "Research / Regenerative Peptides",
] as const;

export const CATEGORY_SLUG_MAP: Record<string, string> = {
  "GLP-1 / Metabolic Peptides": "glp1",
  "Growth Hormone & Recovery Peptides": "growth-hormone",
  "Cognitive / Nootropic Peptides": "nootropic",
  "Cosmetic / Anti-aging Peptides": "cosmetic",
  "Research / Regenerative Peptides": "research",
};

export const SLUG_CATEGORY_MAP = Object.fromEntries(
  Object.entries(CATEGORY_SLUG_MAP).map(([n, s]) => [s, n])
);

export const CATEGORY_PATH_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_SLUG_MAP).map(([name, slug]) => [name, `/peptides/${slug}`])
);

export const CATEGORY_SEO: Record<
  (typeof PRODUCT_CATEGORIES)[number],
  { title: string; description: string; path: string }
> = {
  "GLP-1 / Metabolic Peptides": {
    title: "GLP-1 Metabolic Peptides for research supply",
    description:
      "Research-grade GLP-1 and metabolic peptides including tirzepatide, semaglutide, and retatrutide for laboratory studies.",
    path: "/peptides/glp1",
  },
  "Growth Hormone & Recovery Peptides": {
    title: "Growth Hormone & Recovery Peptides for research supply",
    description:
      "GH secretagogues and recovery peptides including ipamorelin, tesamorelin, and TB-500 for endocrine and regenerative research.",
    path: "/peptides/growth-hormone",
  },
  "Cognitive / Nootropic Peptides": {
    title: "Cognitive Nootropic Peptides for research supply",
    description:
      "Neuropeptides including selank, semax, and epitalon for cognitive neuroscience and nootropic mechanism research.",
    path: "/peptides/nootropic",
  },
  "Cosmetic / Anti-aging Peptides": {
    title: "Cosmetic Anti-aging Peptides for research supply",
    description:
      "Dermatological research peptides including GHK-Cu, Matrixyl 3000, and Snap-8 for cosmetic and anti-aging studies.",
    path: "/peptides/cosmetic",
  },
  "Research / Regenerative Peptides": {
    title: "Research Regenerative Peptides for research supply",
    description:
      "Regenerative research peptides including BPC-157, SS-31, and PT-141 for tissue repair and specialty signaling studies.",
    path: "/peptides/research",
  },
};

export const DISCLAIMER =
  "For laboratory research use only. Products are not intended for human consumption, therapeutic use or diagnostic procedures.";

export const FAQ = [
  {
    q: "What purity standards do your peptides meet?",
    a: "Our research-grade peptides are manufactured to ≥98% purity with COA, LC-MS and NMR documentation available.",
  },
  {
    q: "Do you ship to USA and Europe?",
    a: "Yes. We support worldwide delivery to pharmaceutical, biotech, CRO/CDMO and academic research institutions.",
  },
  {
    q: "What analytical documents are available?",
    a: "COA, LC-MS, HPLC and NMR reports are available upon request for research batches.",
  },
  {
    q: "Do you offer custom synthesis?",
    a: "Yes. We provide custom peptide synthesis services tailored to specific research sequences and modifications.",
  },
] as const;

export const IMAGES = {
  homeHero: "/images/home-hero.png",
  coa: "/images/COA.jpg",
  servicesHero: "/images/about-lab-lcms.png",
  aboutHero: "/images/about-capabilities.png",
  aboutOverview: "/images/about-overview.jpg",
  worldMap: "/images/world-map.jpg",
  contactHero: "/images/about-overview.jpg",
  fallback: "/images/lab-qc.jpg",
} as const;
