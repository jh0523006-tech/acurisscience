import Link from "next/link";
import type { Product } from "@/data/products";
import { formatCas } from "@/data/products";
import { CATEGORY_PATH_MAP } from "@/lib/constants";

export function ProductCard({ product: p }: { product: Product }) {
  const categoryHref = CATEGORY_PATH_MAP[p.category];

  return (
    <div className="rounded-xl border border-border p-6 shadow-sm transition hover:border-brand hover:shadow-md">
      <h2 className="text-lg font-semibold text-primary">{p.name}</h2>
      <p className="mt-2 text-sm text-muted">CAS: {formatCas(p.cas)}</p>
      <p className="text-sm text-muted">Purity: {p.purity}</p>
      {categoryHref ? (
        <Link href={categoryHref} className="text-sm text-muted hover:text-brand hover:underline">
          {p.category}
        </Link>
      ) : (
        <p className="text-sm text-muted">{p.category}</p>
      )}
      <Link
        href={`/peptides/${p.slug}`}
        className="mt-5 inline-block text-sm font-medium text-brand hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
}
