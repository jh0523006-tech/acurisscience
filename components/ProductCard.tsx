import Link from "next/link";
import type { Product } from "@/data/products";
import { formatCas } from "@/data/products";
import {
  getCategoryLinkText,
  getCategoryPath,
  getCategorySeoKeyword,
  getProductLinkText,
  getProductSeoTitle,
} from "@/lib/internalLinks";

type ProductCardProps = {
  product: Product;
  /** Use H3 headings and keyword-rich titles (category listing pages). */
  seoHeading?: boolean;
};

export function ProductCard({ product: p, seoHeading = false }: ProductCardProps) {
  const categoryHref = getCategoryPath(p.category);
  const TitleTag = seoHeading ? "h3" : "h2";
  const title = seoHeading ? getProductSeoTitle(p) : p.name;
  const linkText = getProductLinkText(p);
  return (
    <div className="rounded-xl border border-border p-6 shadow-sm transition hover:border-brand hover:shadow-md">
      <TitleTag className="text-lg font-semibold text-primary">{title}</TitleTag>
      <p className="mt-2 text-sm text-muted">CAS: {formatCas(p.cas)}</p>
      <p className="text-sm text-muted">Purity: {p.purity}</p>
      {categoryHref ? (
        <Link href={categoryHref} className="text-sm text-muted hover:text-brand hover:underline">
          {getCategoryLinkText(p.category)}
        </Link>
      ) : (
        <p className="text-sm text-muted">{getCategorySeoKeyword(p.category)}</p>
      )}
      <Link
        href={`/peptides/${p.slug}`}
        className="mt-5 inline-block text-sm font-medium text-brand hover:underline"
        aria-label={linkText}
      >
        {linkText} →
      </Link>
    </div>
  );
}
