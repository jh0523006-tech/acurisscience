import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { PageHero } from "@/components/sections";
import { getProductsByCategory } from "@/data/products";
import { CATEGORY_PATH_MAP, IMAGES, PRODUCT_CATEGORIES } from "@/lib/constants";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Research Peptides Catalog",
  description: "Browse research-grade peptides by category. Search by CAS, product name or keyword.",
  path: "/peptides",
});

export default function PeptidesPage() {
  const byCategory = getProductsByCategory();

  return (
    <div className="bg-white">
      <PageHero
        image={IMAGES.homeHero}
        alt="Research peptides catalog"
        title="Research Peptides"
        subtitle="Research-grade peptides supported by analytical documentation and scientific expertise."
        height={420}
        gradient
      />

      <section className="border-b border-border bg-blue-50/40 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SearchBar large placeholder="Search by CAS Number, Product Name or Sequence" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {PRODUCT_CATEGORIES.map((category) => {
          const items = byCategory[category] ?? [];
          if (items.length === 0) return null;
          const categoryHref = CATEGORY_PATH_MAP[category];

          return (
            <section key={category} className="mb-16 last:mb-0">
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-2xl font-semibold text-primary">{category}</h2>
                {categoryHref && (
                  <Link href={categoryHref} className="text-sm font-medium text-brand hover:underline">
                    View all →
                  </Link>
                )}
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
