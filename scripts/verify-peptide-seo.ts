import { auditPeptideSeoCoverage, formatPeptideSeoAuditReport } from "../lib/peptide-seo-audit";

const audit = auditPeptideSeoCoverage();
console.log(formatPeptideSeoAuditReport(audit));

if (audit.fullCoverage !== audit.totalProducts || !audit.invalidSlugFallback.metadataRobotsNoindex) {
  process.exit(1);
}
