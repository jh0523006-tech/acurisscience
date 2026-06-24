import Link from "next/link";
import type { CategoryAuthorityContent } from "@/data/category-authority";
import { resolveComparisonProducts } from "@/data/category-authority";
import { formatCas } from "@/data/products";
import { JsonLd } from "@/components/ui";
import { getProductLinkText } from "@/lib/internalLinks";
import { categoryPageSchemas } from "@/lib/seo";
import type { Product } from "@/data/products";

export function CategoryAuthorityLayer({
  authority,
  products,
  breadcrumbItems,
}: {
  authority: CategoryAuthorityContent;
  products: Product[];
  breadcrumbItems: { name: string; path: string }[];
}) {
  const comparisonProducts = resolveComparisonProducts(authority.comparisonRows);

  return (
    <>
      <JsonLd data={categoryPageSchemas(products, authority.faqs, breadcrumbItems)} />

      <section className="mb-12" aria-labelledby="category-authority-intro">
        <h2 id="category-authority-intro" className="text-2xl font-semibold text-primary">
          Research Overview
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted">{authority.intro}</p>
      </section>

      {comparisonProducts.length > 0 && (
        <section className="mb-12" aria-labelledby="category-comparison-table">
          <h2 id="category-comparison-table" className="text-2xl font-semibold text-primary">
            Peptide Comparison
          </h2>
          <p className="mt-2 text-sm text-muted">
            Primary research targets and mechanism summaries for leading compounds in this category.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-blue-50/60">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-primary">
                    Peptide
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-primary">
                    Primary Research Target
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-primary">
                    Mechanism Summary
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-primary">
                    CAS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {comparisonProducts.map((row) => (
                  <tr key={row.slug}>
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-primary">
                      <Link
                        href={`/peptides/${row.slug}`}
                        className="text-brand hover:underline"
                      >
                        {getProductLinkText(row.product)}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{row.primaryTarget}</td>
                    <td className="px-4 py-3 text-muted">{row.mechanismSummary}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {formatCas(row.product.cas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}

export function CategoryFaqSection({ faqs }: { faqs: CategoryAuthorityContent["faqs"] }) {
  return (
    <section className="mt-16 border-t border-border pt-16" aria-labelledby="category-faq-heading">
      <div className="mx-auto max-w-3xl">
        <h2 id="category-faq-heading" className="text-2xl font-semibold text-primary">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-muted">
          Research-focused answers for this peptide category. For laboratory use only — not medical
          advice.
        </p>
        <dl className="mt-8 divide-y divide-border rounded-xl border border-border">
          {faqs.map((item) => (
            <div key={item.q} className="px-5 py-5 sm:px-6">
              <dt className="text-base font-medium text-primary">{item.q}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function CategoryRelatedResearchLinks({
  links,
}: {
  links: CategoryAuthorityContent["relatedLinks"];
}) {
  return (
    <section
      className="mt-16 border-t border-border pt-16"
      aria-labelledby="related-research-heading"
    >
      <h2 id="related-research-heading" className="text-2xl font-semibold text-primary">
        Related Research Areas
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-muted">
        Explore adjacent peptide categories, key compounds, and cross-disciplinary research topics.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-lg border border-border px-4 py-3 text-sm font-medium text-brand transition-colors hover:border-brand/40 hover:bg-blue-50/40"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
