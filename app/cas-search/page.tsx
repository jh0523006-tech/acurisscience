import Link from "next/link";
import { CasSearchResults } from "@/components/CasSearchResults";
import { formatCas, products } from "@/data/products";

const CAS_SEARCH_EXAMPLES = [
  { name: "Semaglutide", cas: "910463-68-2", slug: "semaglutide" },
  { name: "Tirzepatide", cas: "2023788-19-2", slug: "tirzepatide" },
  { name: "Retatrutide", cas: "", slug: "retatrutide" },
  { name: "Cagrilintide", cas: "1415456-99-3", slug: "cagrilintide" },
] as const;

export default function CasSearchPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-primary">CAS Number Search</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Look up research peptides by CAS registry number, chemical identifier, or product name.
        </p>

        <section className="mt-10 max-w-3xl" aria-label="Search intent">
          <h2 className="text-xl font-semibold text-primary">How to Use the CAS Peptide Database</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            This CAS mapping system connects Chemical Abstracts Service registry numbers to research
            peptide profiles across the Acuris Science catalog. Researchers use CAS number lookup to
            cross-reference literature identifiers, verify compound identity against certificate of
            analysis documentation, and navigate from chemical registry entries to detailed peptide
            mechanism and receptor data. Search by full CAS number (e.g. 910463-68-2), partial
            identifier, or peptide name to locate matching GLP-1, metabolic, and specialty research
            peptides.
          </p>
        </section>

        <section className="mt-10" aria-label="Search examples">
          <h2 className="text-lg font-semibold text-primary">Common CAS Lookup Examples</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {CAS_SEARCH_EXAMPLES.map((example) => (
              <li key={example.slug}>
                <Link
                  href={
                    example.cas
                      ? `/cas-search?q=${encodeURIComponent(example.cas)}`
                      : `/peptides/${example.slug}`
                  }
                  className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm transition hover:border-brand hover:bg-slate-50"
                >
                  <span className="font-medium text-primary">{example.name}</span>
                  <span className="text-muted">
                    {example.cas ? `CAS ${example.cas}` : "View profile →"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10">
          <CasSearchResults />
        </div>

        <section className="mt-16 border-t border-border pt-12" aria-label="Research peptide catalog">
          <h2 className="text-xl font-semibold text-primary">Research Peptide Catalog</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Browse all peptide research profiles with CAS numbers, mechanism data, and analytical
            documentation. Each profile links back to this CAS database for identifier cross-referencing.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/peptides/${product.slug}`}
                  className="group block rounded-xl border border-border p-4 transition hover:border-brand hover:shadow-md"
                >
                  <span className="font-medium text-brand group-hover:underline">
                    {product.name} research profile
                  </span>
                  <p className="mt-1 text-xs text-muted">CAS: {formatCas(product.cas)}</p>
                  <p className="text-xs text-muted">{product.category}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm">
            <Link href="/peptides/glp1" className="font-medium text-brand hover:underline">
              GLP-1 receptor peptide research →
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
