import Link from "next/link";
import type { Product } from "@/data/products";
import { getClusterLabel, getRelatedProducts, getResearchCluster } from "@/lib/internalLinks";

export function RelatedPeptides({ product }: { product: Product }) {
  const related = getRelatedProducts(product);
  if (related.length === 0) return null;

  const cluster = getResearchCluster(product);

  return (
    <section className="border-t border-border bg-slate-50/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">{getClusterLabel(cluster)}</p>
        <h2 className="mt-2 text-2xl font-semibold text-primary">Related Research Peptides</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Explore adjacent compounds commonly studied within the same investigational research area as {product.name}.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/peptides/${p.slug}`}
              className="group rounded-xl border border-border bg-white p-5 shadow-sm transition hover:border-brand hover:shadow-md"
            >
              <h3 className="font-semibold text-primary group-hover:text-brand">{p.name}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{p.description}</p>
              <span className="mt-4 inline-block text-xs font-medium text-brand">View research profile →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
