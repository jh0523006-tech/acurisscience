import Link from "next/link";
import type { Product } from "@/data/products";
import { getCategoryPath, getCategorySeoKeyword, getRelatedProducts } from "@/lib/internalLinks";
import { getRelatedPeptideAnchor } from "@/lib/product-seo";

const MAX_RELATED = 2;

export function RelatedPeptides({ product }: { product: Product }) {
  const related = getRelatedProducts(product, MAX_RELATED);
  const categoryHref = getCategoryPath(product.category);

  if (related.length === 0 && !categoryHref) return null;

  return (
    <section className="border-t border-border bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-primary">Related Peptides</h2>
        {related.length > 0 && (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/peptides/${p.slug}`}
                  className="group block rounded-xl border border-border bg-slate-50/50 p-5 transition hover:border-brand hover:bg-white hover:shadow-md"
                >
                  <span className="font-semibold text-brand group-hover:underline">
                    {getRelatedPeptideAnchor(p)}
                  </span>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {categoryHref && (
            <Link href={categoryHref} className="font-medium text-brand hover:underline">
              {getCategorySeoKeyword(product.category)} →
            </Link>
          )}
          <Link
            href={product.cas.trim() ? `/cas-search?q=${encodeURIComponent(product.cas.trim())}` : "/cas-search"}
            className="font-medium text-brand hover:underline"
          >
            Peptide CAS database →
          </Link>
        </p>
      </div>
    </section>
  );
}
