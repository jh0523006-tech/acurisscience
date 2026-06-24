import Link from "next/link";
import type { Product } from "@/data/products";
import { getRelatedProducts } from "@/lib/internalLinks";
import { getRelatedPeptideAnchor } from "@/lib/product-seo";

export function RelatedPeptides({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 5);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-border bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-primary">Related Peptides</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Explore adjacent research compounds commonly studied within the same investigational area as{" "}
          {product.name}.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}
