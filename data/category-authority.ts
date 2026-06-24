import type { Product } from "@/data/products";
import { getProduct } from "@/data/products";
import type { PRODUCT_CATEGORIES } from "@/lib/constants";

export type CategoryAuthorityFaq = { q: string; a: string };

export type CategoryComparisonRow = {
  slug: string;
  primaryTarget: string;
  mechanismSummary: string;
};

export type CategoryRelatedLink = { href: string; label: string };

export type CategoryAuthorityContent = {
  intro: string;
  comparisonSlugs: string[];
  comparisonRows: CategoryComparisonRow[];
  faqs: CategoryAuthorityFaq[];
  relatedLinks: CategoryRelatedLink[];
};

const GLP1_AUTHORITY: CategoryAuthorityContent = {
  intro:
    "GLP-1 receptor agonist peptides are a class of metabolic research compounds studied for their roles in incretin signaling, glucose homeostasis, and energy balance. These research peptides act primarily through glucagon-like peptide-1 receptor (GLP-1R) activation, while select analogues also engage glucose-dependent insulinotropic polypeptide (GIPR) and glucagon receptors in multi-agonist scaffolds. In laboratory models, GLP-1 metabolic peptides modulate insulin secretion, suppress inappropriate glucagon output, slow gastric emptying, and influence hypothalamic appetite circuits. Investigators employ them in cell-based cAMP assays, isolated islet perifusion, and rodent metabolic paradigms to map receptor bias, signaling kinetics, and pathway cross-talk with the somatotropic axis. This category encompasses synthetic incretin mimetics, long-acting amylin analogues, and next-generation multi-agonists characterized for analytical identity and receptor pharmacology in controlled research settings only.",
  comparisonSlugs: ["tirzepatide", "semaglutide", "retatrutide", "cagrilintide"],
  comparisonRows: [
    {
      slug: "tirzepatide",
      primaryTarget: "GIPR / GLP-1R",
      mechanismSummary:
        "Dual incretin receptor agonism elevates cAMP, augments glucose-stimulated insulin release, and modulates glucagon and gastric motility in metabolic assays.",
    },
    {
      slug: "semaglutide",
      primaryTarget: "GLP-1R",
      mechanismSummary:
        "Selective GLP-1R activation with lipidation-extended half-life; studied for insulinotropic signaling and central appetite pathway engagement.",
    },
    {
      slug: "retatrutide",
      primaryTarget: "GLP-1R / GIPR / GCGR",
      mechanismSummary:
        "Triple incretin–glucagon receptor agonism coordinates multi-pathway metabolic signaling in advanced receptor pharmacology models.",
    },
    {
      slug: "cagrilintide",
      primaryTarget: "Amylin / Calcitonin receptor complexes",
      mechanismSummary:
        "Long-acting amylin analogue modulates satiety and postprandial hormone profiles alongside incretin pathway research.",
    },
  ],
  faqs: [
    {
      q: "What are GLP-1 peptides used for in research?",
      a: "GLP-1 peptides are used in laboratory research to study incretin receptor pharmacology, glucose-stimulated insulin secretion, glucagon suppression, gastric emptying kinetics, and central energy-balance signaling. Investigators apply them in cell assays, islet perifusion, and animal metabolic models to characterize receptor activation profiles without therapeutic intent.",
    },
    {
      q: "How do GLP-1 receptor agonist peptides work?",
      a: "GLP-1 receptor agonist peptides bind class B GPCRs coupled to Gs proteins, elevating intracellular cAMP in beta cells, enteroendocrine cells, and select neuronal populations. Downstream signaling augments insulin granule exocytosis, reduces alpha-cell glucagon output during hyperglycemia, and slows gastric motility through vagal and local enteric mechanisms in research systems.",
    },
    {
      q: "What is the difference between selective and dual incretin agonist peptides?",
      a: "Selective agonists such as semaglutide engage GLP-1R predominantly, whereas dual agonists like tirzepatide activate both GIPR and GLP-1R. Multi-agonist scaffolds enable comparative studies of receptor synergy, biased signaling, and coordinated effects on hepatic glucose output and adipose lipid handling in controlled experiments.",
    },
    {
      q: "Are GLP-1 metabolic peptides studied alongside growth hormone axis research?",
      a: "Yes. Metabolic and somatotropic pathways intersect in energy expenditure, body composition, and insulin sensitivity models. Researchers often compare GLP-1 incretin signaling with growth hormone secretagogue pharmacology to map endocrine cross-talk in rodent and ex vivo systems.",
    },
    {
      q: "What analytical documentation supports GLP-1 peptide identity in research?",
      a: "Research-grade GLP-1 peptides are typically characterized by HPLC purity assessment, mass spectrometric identity confirmation, and certificate-of-analysis reporting. CAS registry numbers, where assigned, support compound traceability in laboratory inventory and publication methods sections.",
    },
  ],
  relatedLinks: [
    { href: "/peptides/growth-hormone", label: "Growth hormone secretagogue peptide research overview" },
    { href: "/peptides/research", label: "Regenerative and specialty signaling peptide research" },
    { href: "/peptides/nootropic", label: "Cognitive neuropeptide research catalog" },
    { href: "/peptides/cosmetic", label: "Cosmetic dermatological peptide research area" },
    { href: "/peptides/tirzepatide", label: "Tirzepatide dual incretin receptor pharmacology profile" },
    { href: "/peptides/semaglutide", label: "Semaglutide GLP-1 receptor agonist research reference" },
    { href: "/peptides/retatrutide", label: "Retatrutide triple incretin agonist mechanism studies" },
    { href: "/peptides/ipamorelin", label: "Ipamorelin growth hormone axis interaction research" },
    { href: "/peptides", label: "Full research peptides catalog index" },
  ],
};

const GROWTH_HORMONE_AUTHORITY: CategoryAuthorityContent = {
  intro:
    "Growth hormone peptides are research compounds that modulate somatotropic signaling through growth hormone-releasing hormone (GHRH) receptor agonism, ghrelin receptor engagement, or downstream effectors of tissue repair. These research peptides are studied for their roles in pituitary GH secretion, IGF-1 axis activation, and regenerative cell migration in laboratory models. Selective GH secretagogues such as ipamorelin minimize cortisol and prolactin co-stimulation compared with broader-acting analogues, enabling cleaner pharmacological dissection. GHRH mimetics including tesamorelin and CJC-1295 variants activate GHRH receptors on somatotrophs, while thymosin beta-4 fragments support actin-binding and wound-healing pathway research. Investigators apply growth hormone peptides in endocrine cell lines, primary pituitary cultures, and tissue repair assays to characterize receptor selectivity, pulse dynamics, and cross-talk with metabolic incretin pathways.",
  comparisonSlugs: ["tesamorelin", "ipamorelin", "cjc-1295-without-dac", "tb-500"],
  comparisonRows: [
    {
      slug: "tesamorelin",
      primaryTarget: "GHRH receptor",
      mechanismSummary:
        "GHRH analogue stimulates somatotroph GH release via Gs-coupled receptor activation and cAMP elevation in endocrine research models.",
    },
    {
      slug: "ipamorelin",
      primaryTarget: "Ghrelin receptor (GHS-R1a)",
      mechanismSummary:
        "Selective GH secretagogue promotes pituitary GH pulses with minimal impact on cortisol and prolactin in comparative endocrine assays.",
    },
    {
      slug: "cjc-1295-without-dac",
      primaryTarget: "GHRH receptor",
      mechanismSummary:
        "Modified GHRH peptide stimulates GH axis signaling; studied for pulse amplitude and frequency in somatotropic pharmacology.",
    },
    {
      slug: "tb-500",
      primaryTarget: "Actin / cell migration pathways",
      mechanismSummary:
        "Thymosin beta-4 fragment modulates actin polymerization and cellular migration in regenerative and recovery research models.",
    },
  ],
  faqs: [
    {
      q: "How do growth hormone peptides work in research models?",
      a: "Growth hormone peptides act through distinct receptor classes: GHRH analogues activate GHRH receptors on pituitary somatotrophs, while ghrelin-mimetic secretagogues engage GHS-R1a. Both pathways elevate intracellular cAMP or calcium signals that trigger GH vesicle release, with downstream IGF-1 production studied in hepatocyte and tissue co-culture systems.",
    },
    {
      q: "What is the difference between GHRH analogues and GH secretagogues?",
      a: "GHRH analogues such as tesamorelin mimic the native hypothalamic releasing hormone at the GHRH receptor. GH secretagogues like ipamorelin act through the ghrelin receptor to stimulate GH release via a separate hypothalamic–pituitary input. Comparative research uses both classes to dissociate receptor-specific effects on pulse dynamics.",
    },
    {
      q: "Are growth hormone peptides studied for tissue repair research?",
      a: "Yes. Thymosin beta-4 fragments and related recovery peptides are investigated for actin cytoskeleton modulation, endothelial cell migration, and extracellular matrix remodeling in wound-healing and regenerative assays, distinct from classical GH secretagogue pharmacology.",
    },
    {
      q: "How does the growth hormone axis interact with GLP-1 metabolic peptide research?",
      a: "Somatotropic and incretin pathways converge on insulin sensitivity, lipolysis, and body composition endpoints in rodent models. Researchers co-characterize GH secretagogue and GLP-1 agonist signaling to map endocrine cross-talk in metabolic–endocrine interaction studies.",
    },
    {
      q: "What receptors are primary targets for growth hormone research peptides?",
      a: "Primary targets include the GHRH receptor, ghrelin receptor (GHS-R1a), and downstream GH receptor on peripheral tissues. Recovery-oriented peptides in this category may additionally engage cytoskeletal and cell migration pathways rather than classical pituitary receptors.",
    },
  ],
  relatedLinks: [
    { href: "/peptides/glp1", label: "GLP-1 metabolic peptide research overview" },
    { href: "/peptides/research", label: "Regenerative signaling peptide research catalog" },
    { href: "/peptides/nootropic", label: "Cognitive neuropeptide mechanism research" },
    { href: "/peptides/cosmetic", label: "Dermatological anti-aging peptide studies" },
    { href: "/peptides/tesamorelin", label: "Tesamorelin GHRH receptor agonist research profile" },
    { href: "/peptides/ipamorelin", label: "Ipamorelin selective GH secretagogue pharmacology" },
    { href: "/peptides/tb-500", label: "TB-500 thymosin beta-4 tissue migration research" },
    { href: "/peptides/bpc-157", label: "BPC-157 regenerative pentadecapeptide studies" },
    { href: "/peptides", label: "Complete research peptides catalog" },
  ],
};

const NOOTROPIC_AUTHORITY: CategoryAuthorityContent = {
  intro:
    "Nootropic peptides are neuropeptide research compounds investigated for effects on cognitive function, neuroprotection, and stress-response modulation in laboratory neuroscience models. These research peptides include ACTH-derived analogues, synthetic tuftsin fragments, and mitochondrial-derived signaling peptides that act on distinct receptor and non-receptor targets. Semax and selank are widely studied for neurotrophic factor expression, GABAergic tone, and anxiety-related behavioral paradigms in rodent research. MOTS-c, a mitochondrial-encoded peptide, modulates metabolic stress responses relevant to neuronal energy homeostasis. Epitalon is investigated in telomere biology and circadian gene expression assays. Investigators employ nootropic peptides in primary neuronal cultures, fear-conditioning models, and transcriptomic profiling to characterize mechanism without clinical cognitive enhancement claims.",
  comparisonSlugs: ["semax", "selank", "mots-c", "epitalon"],
  comparisonRows: [
    {
      slug: "semax",
      primaryTarget: "NGF / BDNF pathways",
      mechanismSummary:
        "ACTH(4-10) analogue upregulates neurotrophin expression and modulates glutamatergic signaling in neuroprotection research models.",
    },
    {
      slug: "selank",
      primaryTarget: "GABAergic / immune-neural interfaces",
      mechanismSummary:
        "Tuftsin-derived peptide modulates GABA receptor sensitivity and cytokine expression in stress and anxiety behavioral assays.",
    },
    {
      slug: "mots-c",
      primaryTarget: "Mitochondrial / AMPK pathways",
      mechanismSummary:
        "Mitochondrial-derived peptide activates stress-response signaling linked to metabolic regulation and neuronal energy homeostasis.",
    },
    {
      slug: "epitalon",
      primaryTarget: "Telomerase / pineal axis",
      mechanismSummary:
        "Tetrapeptide studied for telomere biology, melatonin synthesis pathways, and circadian gene expression in aging research.",
    },
  ],
  faqs: [
    {
      q: "Are nootropic peptides studied for cognitive function in research?",
      a: "Yes. Nootropic peptides are applied in preclinical neuroscience to study learning, memory consolidation, neuroprotection, and stress-related behavior in rodent paradigms. Research focuses on molecular mechanisms—neurotrophin expression, receptor modulation, and synaptic plasticity markers—rather than human cognitive enhancement.",
    },
    {
      q: "How do Semax and Selank differ in mechanism of action?",
      a: "Semax, an ACTH fragment analogue, is studied primarily for neurotrophic factor upregulation and neuroprotective signaling. Selank, derived from tuftsin, is investigated for GABAergic modulation and immune–neural cross-talk in anxiety and stress models. Both serve as pharmacological probes with distinct pathway emphasis.",
    },
    {
      q: "What role does MOTS-c play in nootropic peptide research?",
      a: "MOTS-c is a mitochondrial-derived peptide researched for metabolic stress signaling that intersects with neuronal energy homeostasis. Studies examine AMPK-related pathways and mitochondrial–nuclear communication in models linking metabolism to cognitive resilience.",
    },
    {
      q: "Is Epitalon classified as a cognitive or longevity research peptide?",
      a: "Epitalon is primarily investigated in aging and longevity research for telomere biology and pineal gland gene expression, with secondary interest in circadian regulation. It is grouped with nootropic peptides when catalogs emphasize neuropeptide mechanism studies spanning cognition and aging.",
    },
    {
      q: "What laboratory models are used to study nootropic peptide mechanisms?",
      a: "Common models include primary cortical and hippocampal neuronal cultures, fear-conditioning and Morris water maze paradigms, oxidative stress injury assays, and RNA-seq profiling of neuropeptide-treated brain tissue in controlled research protocols.",
    },
  ],
  relatedLinks: [
    { href: "/peptides/research", label: "Regenerative and specialty signaling peptide research" },
    { href: "/peptides/glp1", label: "GLP-1 metabolic pathway peptide research" },
    { href: "/peptides/growth-hormone", label: "Growth hormone axis peptide research overview" },
    { href: "/peptides/cosmetic", label: "Cosmetic dermatological peptide research area" },
    { href: "/peptides/semax", label: "Semax ACTH analogue neuroprotection research profile" },
    { href: "/peptides/selank", label: "Selank tuftsin-derived neuropeptide studies" },
    { href: "/peptides/mots-c", label: "MOTS-c mitochondrial peptide metabolic research" },
    { href: "/peptides/ss-31", label: "SS-31 mitochondria-targeted oxidative stress research" },
    { href: "/peptides", label: "Full research peptides catalog index" },
  ],
};

const COSMETIC_AUTHORITY: CategoryAuthorityContent = {
  intro:
    "Cosmetic peptides are dermatological research compounds studied for effects on extracellular matrix remodeling, melanocyte signaling, and skin barrier biology in laboratory models. These research peptides include copper-binding tripeptides, palmitoylated oligopeptide blends, and synthetic neuropeptide mimics that modulate collagen synthesis, matrix metalloproteinase activity, or neuromuscular junction signaling relevant to wrinkle formation research. GHK-Cu is investigated for wound-healing gene expression and antioxidant enzyme upregulation in keratinocyte and fibroblast cultures. Snap-8 and Matrixyl 3000 analogues target expression lines and procollagen production pathways in cosmetic science assays. Melanocortin peptides such as Melanotan II serve as receptor pharmacology tools for pigmentation and UV-response studies. This category supports analytical characterization of peptide identity and matrix biology endpoints in controlled research settings.",
  comparisonSlugs: ["ghk-cu", "melanotan-ii", "snap-8", "matrixyl-3000"],
  comparisonRows: [
    {
      slug: "ghk-cu",
      primaryTarget: "Copper-dependent matrix genes",
      mechanismSummary:
        "Copper-binding tripeptide modulates collagen, elastin, and antioxidant gene expression in dermal fibroblast research models.",
    },
    {
      slug: "melanotan-ii",
      primaryTarget: "Melanocortin receptors (MC1R / MC4R)",
      mechanismSummary:
        "Cyclic melanocortin agonist studied for melanogenesis, pigmentation pathways, and receptor selectivity profiling.",
    },
    {
      slug: "snap-8",
      primaryTarget: "SNAP-25 / neuromuscular signaling",
      mechanismSummary:
        "Acetyl octapeptide modulates SNARE complex interactions studied in expression-line and neuromuscular junction models.",
    },
    {
      slug: "matrixyl-3000",
      primaryTarget: "Collagen / ECM synthesis",
      mechanismSummary:
        "Palmitoylated oligopeptide blend stimulates procollagen I and III expression in matrix remodeling assays.",
    },
  ],
  faqs: [
    {
      q: "What are cosmetic peptides used for in dermatological research?",
      a: "Cosmetic peptides are used to study extracellular matrix synthesis, melanocyte signaling, neuromuscular junction modulation, and skin barrier function in cell culture and ex vivo skin models. Research emphasizes molecular endpoints such as collagen production, MMP activity, and pigmentation gene expression.",
    },
    {
      q: "How does GHK-Cu function in skin matrix research?",
      a: "GHK-Cu delivers bioavailable copper to cells, modulating expression of matrix structural proteins, glycosaminoglycans, and antioxidant enzymes in fibroblast and keratinocyte assays. Investigators use it as a reference compound for wound-healing and anti-aging pathway studies at the cellular level.",
    },
    {
      q: "Are cosmetic peptides related to melanocortin receptor research?",
      a: "Yes. Melanocortin agonist peptides such as Melanotan II activate MC1R and related receptors studied in pigmentation, UV-response, and energy homeostasis models. Melanocortin pharmacology links cosmetic science to broader receptor signaling research.",
    },
    {
      q: "What is the research relevance of Matrixyl and Snap-8 peptides?",
      a: "Matrixyl 3000 palmitoylated peptides are studied for procollagen upregulation and ECM remodeling markers. Snap-8 is investigated for SNARE protein interactions and neuromuscular signaling pathways associated with expression-line formation in cosmetic science models.",
    },
    {
      q: "How are cosmetic research peptides analytically characterized?",
      a: "Peptide identity is confirmed by HPLC purity analysis and mass spectrometry where applicable. Copper content and peptide composition are reported for GHK-Cu and blend products. CAS registry numbers support traceability when assigned to the research compound.",
    },
  ],
  relatedLinks: [
    { href: "/peptides/research", label: "Regenerative signaling peptide research catalog" },
    { href: "/peptides/nootropic", label: "Cognitive neuropeptide research overview" },
    { href: "/peptides/glp1", label: "GLP-1 metabolic peptide research area" },
    { href: "/peptides/growth-hormone", label: "Growth hormone recovery peptide research" },
    { href: "/peptides/ghk-cu", label: "GHK-Cu copper tripeptide matrix biology profile" },
    { href: "/peptides/melanotan-ii", label: "Melanotan II melanocortin receptor pharmacology" },
    { href: "/peptides/pt-141", label: "PT-141 melanocortin agonist signaling research" },
    { href: "/peptides/snap-8", label: "Snap-8 neuromuscular junction peptide studies" },
    { href: "/peptides", label: "Complete research peptides catalog" },
  ],
};

const RESEARCH_AUTHORITY: CategoryAuthorityContent = {
  intro:
    "Research peptides in the regenerative and specialty signaling category encompass compounds studied for tissue repair, mitochondrial function, and non-incretin receptor pharmacology in laboratory models. These research peptides include gastric pentadecapeptides, mitochondria-targeted tetrapeptides, and melanocortin receptor agonists applied across distinct biological systems. BPC-157 is investigated for angiogenesis, growth factor expression, and gastrointestinal mucosal protection in rodent injury models. SS-31 (elamipretide) targets cardiolipin in the inner mitochondrial membrane to modulate oxidative stress and bioenergetics. PT-141 acts as a melanocortin receptor agonist studied in central and peripheral signaling paradigms. Investigators use this category to explore repair pathways, organelle-level stress responses, and specialty GPCR pharmacology with full analytical documentation.",
  comparisonSlugs: ["bpc-157", "ss-31", "pt-141"],
  comparisonRows: [
    {
      slug: "bpc-157",
      primaryTarget: "Growth factor / angiogenesis pathways",
      mechanismSummary:
        "Pentadecapeptide modulates VEGF, FAK–paxillin signaling, and mucosal protection in tissue injury and repair research models.",
    },
    {
      slug: "ss-31",
      primaryTarget: "Mitochondrial cardiolipin",
      mechanismSummary:
        "Aromatic-cation tetrapeptide stabilizes mitochondrial cristae and reduces ROS in oxidative stress and bioenergetics assays.",
    },
    {
      slug: "pt-141",
      primaryTarget: "Melanocortin receptors (MC3R / MC4R)",
      mechanismSummary:
        "Cyclic melanocortin agonist studied for central nervous system and peripheral receptor pharmacology in specialty signaling research.",
    },
  ],
  faqs: [
    {
      q: "What are regenerative research peptides studied for?",
      a: "Regenerative research peptides are investigated for tissue repair, angiogenesis, mitochondrial bioenergetics, and specialty receptor signaling in controlled animal and cell models. Applications include wound-healing assays, oxidative stress paradigms, and GPCR pharmacology profiling without therapeutic claims.",
    },
    {
      q: "How does BPC-157 function in tissue repair research?",
      a: "BPC-157 is studied for modulation of growth factor expression, endothelial cell migration, and focal adhesion kinase signaling in injury models spanning tendon, ligament, and gastrointestinal mucosa. Research focuses on molecular repair pathways rather than clinical treatment outcomes.",
    },
    {
      q: "What is the mechanism of SS-31 in mitochondrial research?",
      a: "SS-31 associates with cardiolipin in the inner mitochondrial membrane, stabilizing electron transport chain supercomplexes and reducing reactive oxygen species in oxidative stress models. It serves as a tool compound for organelle-targeted peptide pharmacology.",
    },
    {
      q: "How does PT-141 relate to melanocortin signaling research?",
      a: "PT-141 (bremelanotide) is a melanocortin receptor agonist studied for MC3R and MC4R engagement in central and peripheral signaling assays. It complements cosmetic and regenerative category research exploring melanocortin pathway pharmacology.",
    },
    {
      q: "Can regenerative peptides be studied alongside growth hormone recovery research?",
      a: "Yes. Tissue repair peptides such as BPC-157 and thymosin beta-4 fragments are frequently characterized alongside growth hormone axis compounds in models examining musculoskeletal recovery, angiogenesis, and extracellular matrix remodeling.",
    },
  ],
  relatedLinks: [
    { href: "/peptides/growth-hormone", label: "Growth hormone and recovery peptide research overview" },
    { href: "/peptides/glp1", label: "GLP-1 metabolic peptide research catalog" },
    { href: "/peptides/nootropic", label: "Cognitive neuropeptide mechanism research" },
    { href: "/peptides/cosmetic", label: "Cosmetic dermatological peptide research area" },
    { href: "/peptides/bpc-157", label: "BPC-157 pentadecapeptide tissue repair research profile" },
    { href: "/peptides/ss-31", label: "SS-31 mitochondria-targeted oxidative stress studies" },
    { href: "/peptides/pt-141", label: "PT-141 melanocortin receptor agonist research reference" },
    { href: "/peptides/tb-500", label: "TB-500 thymosin beta-4 regenerative migration research" },
    { href: "/peptides", label: "Full research peptides catalog index" },
  ],
};

export const CATEGORY_AUTHORITY: Record<
  (typeof PRODUCT_CATEGORIES)[number],
  CategoryAuthorityContent
> = {
  "GLP-1 / Metabolic Peptides": GLP1_AUTHORITY,
  "Growth Hormone & Recovery Peptides": GROWTH_HORMONE_AUTHORITY,
  "Cognitive / Nootropic Peptides": NOOTROPIC_AUTHORITY,
  "Cosmetic / Anti-aging Peptides": COSMETIC_AUTHORITY,
  "Research / Regenerative Peptides": RESEARCH_AUTHORITY,
};

export function getCategoryAuthority(category: string): CategoryAuthorityContent | undefined {
  return CATEGORY_AUTHORITY[category as (typeof PRODUCT_CATEGORIES)[number]];
}

export function resolveComparisonProducts(
  rows: CategoryComparisonRow[]
): (CategoryComparisonRow & { product: Product })[] {
  return rows
    .map((row) => {
      const product = getProduct(row.slug);
      return product ? { ...row, product } : null;
    })
    .filter((row): row is CategoryComparisonRow & { product: Product } => row !== null);
}
