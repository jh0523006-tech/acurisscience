import Link from "next/link";
import type { Product } from "@/data/products";
import { getProduct } from "@/data/products";
import {
  GLP1_ENTITY_SLUGS,
  getRelatedPeptideAnchorBySlug,
  isKeywordLandingPage,
} from "@/lib/product-seo";

export function ProductEntityCrossLinks({ product }: { product: Product }) {
  if (!isKeywordLandingPage(product.slug)) return null;

  const related = GLP1_ENTITY_SLUGS.filter((slug) => slug !== product.slug);

  return (
    <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
      Within the{" "}
      <Link href="/peptides/glp1" className="font-medium text-brand hover:underline">
        GLP-1 metabolic peptide
      </Link>{" "}
      research landscape, investigators frequently compare incretin pathway tools—including{" "}
      {related.map((slug, index) => {
        const p = getProduct(slug);
        const label = p
          ? getRelatedPeptideAnchorBySlug(slug, p.name)
          : getRelatedPeptideAnchorBySlug(slug, slug);
        const isLast = index === related.length - 1;
        const isSecondLast = index === related.length - 2;
        return (
          <span key={slug}>
            <Link href={`/peptides/${slug}`} className="font-medium text-brand hover:underline">
              {label}
            </Link>
            {isSecondLast ? ", and " : isLast ? "" : ", "}
          </span>
        );
      })}
      —to map receptor selectivity, metabolic signaling synergy, and satiety pathway integration in
      controlled laboratory models.
    </p>
  );
}
