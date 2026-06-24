import type { Product } from "@/data/products";
import { formatCas } from "@/data/products";
import { getCategorySeoKeyword, getProductFunctionKeyword } from "@/lib/internalLinks";

/** Slugs upgraded to keyword-first ranking landing pages. */
export const KEYWORD_LANDING_SLUGS = ["tirzepatide", "semaglutide", "retatrutide"] as const;

export type KeywordLandingSlug = (typeof KEYWORD_LANDING_SLUGS)[number];

/** Primary SEO keyword — used in meta + schema copy. */
const PRIMARY_KEYWORDS: Record<KeywordLandingSlug, string> = {
  tirzepatide: "Tirzepatide peptide",
  semaglutide: "Semaglutide GLP-1 peptide",
  retatrutide: "Retatrutide metabolic peptide",
};

/** Single semantic paragraph per product page (primary on-page topical signal). */
const SEMANTIC_INTROS: Record<string, string> = {
  semaglutide:
    "Semaglutide is a lipidated glucagon-like peptide-1 receptor agonist that has become a standard pharmacological reference for selective incretin signaling in metabolic laboratories. Registered under CAS 910463-68-2, the analog resists dipeptidyl peptidase-4 cleavage and binds serum albumin, properties that make it well suited to half-life and receptor-occupancy studies spanning several hours. Research objectives vary considerably across groups—some isolate beta-cell insulin granule dynamics, others map vagal contributions to gastric emptying, and still others compare signaling bias relative to native GLP-1. Typical experimental deployments include stable GLP-1R cell-line dose–response assays, islet perifusion under graded glucose, and rodent gastric transit protocols with tracer readouts. Analytical batches are characterized by COA, LC-MS, HPLC, and NMR documentation; material is supplied for academic and biotech laboratory use only.",
  tirzepatide:
    "Laboratory programs investigating coordinated GIP and GLP-1 receptor biology frequently turn to tirzepatide, a 39-residue dual incretin agonist identified by CAS 2023788-19-2. The peptide's GIP-backbone architecture with C-terminal lipidation permits simultaneous engagement of pancreatic, adipose, and hypothalamic targets in a single exposure window—a design feature that distinguishes it from selective GLP-1 analogs in head-to-head pharmacology. Investigators adapt the compound to markedly different question sets: hepatic glucose-output perfusion, adipocyte lipid-partitioning models, and biased-agonism screens in heterologous receptor expression systems. Common bench applications involve nanomolar titration in cAMP accumulation assays, islet co-culture with alpha-cell glucagon readouts, and indirect calorimetry paired with controlled peptide infusion in rodent cohorts. Research-grade material ships with COA, LC-MS, HPLC, and NMR verification; not intended for clinical or therapeutic use.",
  retatrutide:
    "Retatrutide occupies a distinct niche among investigational incretin tools as a peptide agonist that engages GLP-1, GIP, and glucagon receptors within a single molecular scaffold. The triple-receptor profile allows laboratories to partition thermogenic, hepatic lipid-oxidation, and insulinotropic outputs in ways that dual or selective agonists cannot replicate, though experimental interpretation depends heavily on species, dose, and receptor-expression context. Research groups differ in emphasis—some prioritize indirect calorimetry endpoints, others focus on liver triglyceride flux or triple-receptor occupancy modeling in cell panels. Practical use spans multi-day rodent metabolic cage studies, hepatocyte lipid-loading assays with hormone profiling, and receptor-knockout backgrounds that attribute phenotypes to individual targets. Characterization follows COA, LC-MS, HPLC, and NMR standards; supplied exclusively for controlled laboratory research.",
  cagrilintide:
    "Cagrilintide is a long-acting amylin receptor agonist analogue (CAS 1415456-99-3) explored alongside incretin peptides when satiety and postprandial hormone integration are central to the experimental design. Its fatty-acid conjugation extends receptor engagement relative to native amylin, giving pharmacokinetic flexibility that single-injection rodent paradigms often require. The relevance of amylin-pathway readouts shifts with model selection—pair-feeding studies emphasize behavioral components, whereas portal hormone sampling stresses endocrine coordination. Researchers frequently combine the analogue with GLP-1R ligands in co-administration protocols, run hypothalamic neuropeptide expression panels after acute dosing, and quantify gastric-retention kinetics using non-absorbed tracers. Batches are released with COA, LC-MS, HPLC, and NMR data for laboratory use only.",
  tesamorelin:
    "Tesamorelin (CAS 901758-09-6) is a stabilized growth hormone-releasing hormone analogue used to probe pituitary GH axis dynamics without the broad receptor cross-reactivity seen in some older secretagogues. Stabilizing substitutions extend peptide integrity in serum-containing media, which matters when pulse-frequency experiments run over 24–48 hours. Endocrine research contexts range from isolated pituitary somatotroph cultures to whole-animal GH pulsatility recording, and the appropriate readout—IGF-1, GH burst amplitude, or GHRH-receptor internalization—varies by laboratory focus. Typical workflows include subcutaneous bolus studies in rodent models, perifused pituitary fragments with calcium imaging, and comparative assays against native GHRH(1-44). Material is documented by COA, LC-MS, HPLC, and NMR and is restricted to research applications.",
  ipamorelin:
    "Among selective growth hormone secretagogues, ipamorelin (CAS 170851-70-4) is valued for activating the ghrelin receptor with minimal impact on cortisol or prolactin axes in standard research concentrations. The pentapeptide's compact structure simplifies dose calibration in vitro and keeps reconstitution volumes low for in vivo bolus designs. Experimental priorities differ: some laboratories map GH release kinetics alone, while others embed the secretagogue within broader endocrine challenge batteries. Common scenarios include overnight GH sampling in rodent models, GH3 cell-line secretion assays, and pituitary explant perifusion with somatostatin co-treatment. Supplied at research grade with COA, LC-MS, HPLC, and NMR characterization—not for therapeutic application.",
  "cjc-1295-without-dac":
    "CJC-1295 Without DAC (CAS 863288-34-0) is a growth hormone-releasing hormone analogue lacking drug-affinity complex modification, producing a shorter plasma exposure profile suited to pulse-timing and receptor-desensitization studies. Without albumin binding, the peptide's pharmacokinetics more closely track bolus injection experiments and short-window tissue sampling. Research questions vary from GHRH-receptor trafficking in recombinant cell lines to pulsatile GH output patterns following discrete subcutaneous administration. Bench use often involves timed serum GH immunoassays, pituitary slice electrophysiology, and head-to-head comparison with DAC-modified analogs under matched molar dosing. Analytical documentation includes COA, LC-MS, HPLC, and NMR; laboratory research use only.",
  "hgh-fragment-176-191":
    "The HGH Fragment 176-191 region (CAS 66004-57-7) represents the lipolytic C-terminal portion of human growth hormone and is applied when investigators wish to separate metabolic fragment activity from full-length GH receptor signaling. Because the truncated sequence does not replicate complete GH biology, experimental framing must account for receptor-context limitations that differ from intact hormone studies. Groups variously examine adipocyte lipolysis markers, substrate-oxidation shifts in lean tissue, or comparative responses against GH(1-191) in cell models. Practical deployments include differentiated adipocyte incubations with glycerol-release endpoints, rodent metabolic-chamber sessions with clamped nutrition, and dose-titration in primary hepatocyte cultures. Research-grade supply includes COA, LC-MS, HPLC, and NMR verification.",
  "bpc-157":
    "BPC-157 (Acetate) (CAS 137525-51-0) is a synthetic pentadecapeptide derived from gastric juice protein fragments, widely adopted in regenerative and tissue-repair research for its reported effects on angiogenic and cytoprotective pathways. Outcomes are sensitive to injury model, route of administration, and species, so cross-study comparisons require careful alignment of dosing schedules and histological endpoints. Laboratories apply the acetate salt in tendon transection models, dermal wound-closure time courses, and endothelial migration assays with distinct emphasis on vascular versus matrix remodeling. Standard preparations are characterized by COA, LC-MS, HPLC, and NMR; not intended for human or veterinary therapeutic use.",
  "tb-500":
    "TB-500 (Thymosin Beta-4) (CAS 77591-33-4) supplies the actin-binding motif associated with thymosin beta-4, a peptide context in which cytoskeletal remodeling and cell migration are primary mechanistic hypotheses. Research utility depends on whether the model stresses acute wound closure, chronic fibrosis reversal, or cardiac tissue repair after ischemic insult—each framing yields different interpretive constraints. Experimental use includes corneal scrape assays, cardiac fibroblast scratch-wound migration, and localized intramuscular injection following controlled laceration in rodent soft tissue. Material is released with COA, LC-MS, HPLC, and NMR documentation for controlled laboratory investigation only.",
  epitalon:
    "Epitalon (CAS 307297-39-8) is a synthetic tetrapeptide modeled on pineal epithalamin sequences and studied primarily in aging-related and circadian-biology research programs. Telomerase-activity claims and pineal-axis hypotheses are evaluated under widely divergent protocols, from cell-senescence cultures to long-duration rodent cohorts with varied light–dark entrainment. Investigators may deploy the peptide in fibroblast replicative-lifespan assays, melatonin-rhythm monitoring after subcutaneous dosing, or comparative studies alongside other geroprotective candidates. Supplied with COA, LC-MS, HPLC, and NMR analytical support for research use—not for clinical anti-aging application.",
  "mots-c":
    "MOTS-c (CAS 1627580-64-6) is a mitochondria-encoded peptide that has drawn interest for its reported role in metabolic stress adaptation and exercise-mimetic signaling pathways. Because mitochondrial peptide biology spans organelle bioenergetics and systemic glucose handling, experimental readouts range from OCR measurements in myotubes to whole-body glucose-tolerance shifts in active versus sedentary rodent cohorts. Typical bench scenarios include AMPK phosphorylation time courses in C2C12 cultures, palmitate-challenge survival assays, and acute intraperitoneal dosing before treadmill exhaustion testing. Research-grade characterization follows COA, LC-MS, HPLC, and NMR standards.",
  "ss-31":
    "SS-31 (Elamipretide) (CAS 736992-21-5) is a mitochondria-targeted tetrapeptide designed to associate with cardiolipin and modulate inner-membrane bioenergetics under oxidative stress. Cardiac, renal, and skeletal-muscle models each emphasize different facets of mitochondrial dysfunction, so the peptide's apparent efficacy can shift with the stressor—ischemia-reperfusion versus chronic ROS elevation, for example. Laboratories employ it in isolated mitochondria respiration assays, Langendorff-perfused heart preparations, and tubular-cell injury models with ATP-depletion readouts. Documented by COA, LC-MS, HPLC, and NMR; restricted to research environments.",
  selank:
    "Selank (CAS 129954-34-3) is a heptapeptide anxiolytic research candidate derived from tuftsin, studied in cognitive neuroscience for GABAergic modulation and stress-response pathways. Behavioral endpoints—elevated plus maze, conditioned fear, social interaction—vary substantially in sensitivity and translatability across rodent strains and handling protocols. Experimental applications include acute intranasal delivery with corticosterone sampling, hippocampal slice LTP recordings after bath application, and transcriptomic profiling of amygdalar tissue. Material ships with COA, LC-MS, HPLC, and NMR verification for laboratory research only.",
  semax:
    "Semax (CAS 80714-61-0) is a synthetic ACTH(4-10) analogue investigated for neuroprotective and nootropic mechanism research, particularly where BDNF upregulation and dopaminergic signaling are hypothesized mediators. Stroke, hypoxia, and toxin-challenge models each impose different temporal windows for peptide administration, which strongly influences observed neurochemical outcomes. Common experimental routes include intranasal dosing before middle-cerebral-artery occlusion, primary cortical neuron survival assays after glutamate excitotoxicity, and open-field locomotion paired with striatal neurotransmitter analysis. Supplied at research grade with COA, LC-MS, HPLC, and NMR data—not for cognitive enhancement outside controlled studies.",
  "pt-141":
    "PT-141 (Bremelanotide) (CAS 189691-06-3) is a cyclic melanocortin receptor agonist used to interrogate central melanocortin-4 signaling in specialty endocrine and behavioral research. Peripheral versus central receptor engagement, dose, and species differences mean that autonomic and appetitive readouts do not always align across published protocols. Researchers apply the peptide in intracerebroventricular titration studies, melanocortin-receptor binding competition assays, and rodent models monitoring feeding suppression or thermoregulatory shifts. Analytical batches include COA, LC-MS, HPLC, and NMR documentation; laboratory use only.",
  "melanotan-ii":
    "Melanotan II (CAS 121062-08-6) is a cyclic lactam melanocortin agonist employed to study pigmentation biology and MC1R/MC4R pathway pharmacology in dermatological research settings. Melanogenic response magnitude varies with baseline skin type, UV co-exposure, and delivery route, factors that complicate cross-laboratory comparison of tanning endpoints. Experimental use spans melanocyte tyrosinase-activity assays, eumelanin quantification in UV-irradiated rodent skin, and receptor-selectivity panels in heterologous expression systems. Characterized by COA, LC-MS, HPLC, and NMR; not intended for cosmetic tanning outside research frameworks.",
  "ghk-cu":
    "GHK-Cu (Copper Peptide) (CAS 49557-75-7) is a tripeptide–copper complex studied for extracellular-matrix gene regulation and wound-healing signaling in dermatological and regenerative research. Copper coordination state and peptide stability influence assay performance, so formulation and storage conditions become part of experimental design rather than incidental detail. Laboratories run fibroblast collagen-I expression studies, keratinocyte migration scratch assays, and ex vivo human skin explant models with varied copper-to-peptide ratios. Research supply includes COA, LC-MS, HPLC, and NMR verification.",
  "matrixyl-3000":
    "Matrixyl 3000 is a palmitoylated oligopeptide blend referenced in cosmetic-matrix research for its reported effects on procollagen expression and dermal remodeling markers. Blend composition and palmitoylation stoichiometry can differ between commercial preparations, so batch-specific characterization governs inter-study reproducibility more than with single-sequence peptides. Investigators apply the material in human dermal fibroblast collagen assays, reconstructed skin-equivalent models, and ELISA-based matrix-protein quantification under serum-deprived conditions. Supplied with COA and purity documentation appropriate to blend format; research use only.",
  "snap-8":
    "Snap-8 is an acetylated octapeptide modeled on enkephalinase-cleavage sites and studied in cosmetic science for its proposed modulation of neuromuscular signaling relevant to expression-line formation. In vitro muscle-contraction and neuronal co-culture systems produce variable magnitude effects depending on peptide concentration and cell-source heterogeneity. Typical experimental setups include organotypic skin models with simulated repetitive contraction, SNARE-protein interaction assays, and comparative testing against longer neurotransmitter-modulating sequences. Research-grade material with analytical documentation; not for commercial cosmetic formulation outside laboratory study.",
  "syn-ake":
    "Syn-Ake is a synthetic tripeptide inspired by temple viper waglerin sequences, used in dermatological research as a probe of nicotinic acetylcholine receptor modulation at the neuromuscular junction. Receptor subtype expression in skin-derived models differs from skeletal muscle, so relaxation endpoints must be interpreted within the specific cell system employed. Researchers deploy the peptide in micronucleus-free fibroblast contractility assays, in vitro neuromuscular junction co-cultures, and peptide-library screens comparing waglerin-mimetic scaffolds. Characterization follows COA and purity profiling standards for short synthetic peptides; laboratory research only.",
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
  const intro = SEMANTIC_INTROS[product.slug];
  if (intro) return intro;

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

export function getBackToCategoryText(category: string): string {
  return `← Back to ${getCategorySeoKeyword(category)}`;
}
