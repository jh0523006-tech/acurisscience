import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  assertCategoryLinksConfigured,
  auditInternalLinkAnchors,
  getProductLinkText,
  isProhibitedAnchor,
} from "../lib/internalLinks";
import { products as catalog } from "../data/products";

function collectSourceFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      collectSourceFiles(full, acc);
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

const root = join(import.meta.dirname ?? __dirname, "..");
const files = collectSourceFiles(root).filter(
  (f) => !f.includes("verify-internal-links") && !f.includes("internalLinks.ts")
);

const sources = files.map((file) => ({
  file: file.replace(root + "\\", "").replace(root + "/", ""),
  content: readFileSync(file, "utf8"),
}));

const issues = auditInternalLinkAnchors(sources);
const missingCategories = assertCategoryLinksConfigured();

console.log("Internal Link SEO Audit");
console.log("=======================");
console.log(`Scanned ${sources.length} source files`);
console.log(`Prohibited anchor issues: ${issues.length}`);
console.log(`Category config gaps: ${missingCategories.length}`);
console.log("");

if (issues.length > 0) {
  console.log("Issues:");
  for (const issue of issues) {
    console.log(`- [${issue.file}] "${issue.anchor}" — ${issue.reason}`);
  }
  console.log("");
}

if (missingCategories.length > 0) {
  console.log("Missing category SEO config:");
  for (const category of missingCategories) {
    console.log(`- ${category}`);
  }
  console.log("");
}

const glp1Products = catalog.filter((p) => p.category === "GLP-1 / Metabolic Peptides");
console.log("GLP-1 product anchor samples:");
for (const p of glp1Products) {
  console.log(`- ${getProductLinkText(p)}`);
}

if (issues.length > 0 || missingCategories.length > 0) {
  process.exit(1);
}

// Sanity check helper
for (const sample of ["View Details", "Learn More", "Click Here"]) {
  if (!isProhibitedAnchor(sample)) {
    console.error(`Expected "${sample}" to be prohibited`);
    process.exit(1);
  }
}

console.log("\nAll internal link checks passed.");
