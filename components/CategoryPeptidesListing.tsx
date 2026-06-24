import Link from "next/link";
import {
  CategoryAuthorityLayer,
  CategoryFaqSection,
  CategoryRelatedResearchLinks,
} from "@/components/CategoryAuthorityLayer";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { PageHero } from "@/components/sections";
import { getCategoryAuthority } from "@/data/category-authority";
import { products } from "@/data/products";
import { CATEGORY_PATH_MAP, IMAGES } from "@/lib/constants";
import { getCategoryBreadcrumbLabel } from "@/lib/internalLinks";
import { categoryBreadcrumbItems } from "@/lib/seo";

export function CategoryPeptidesListing({
  category,
  title,
  subtitle,
}: {
  category: string;
  title: string;
  subtitle: string;
}) {
  const list = products.filter((p) => p.category === category);
  const authority = getCategoryAuthority(category);
  const categoryPath = CATEGORY_PATH_MAP[category] ?? "/peptides";
  const breadcrumbItems = categoryBreadcrumbItems(category, categoryPath);

  return (
    <div className="bg-white">
      <PageHero
        image={IMAGES.homeHero}
        alt={title}
        title={title}
        subtitle={subtitle}
        height={420}
        gradient
      />

      <section className="border-b border-border bg-blue-50/40 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SearchBar large placeholder="Search by CAS Number, Product Name or Sequence" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-muted">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/peptides" className="hover:text-brand">
            Research Peptides Catalog
          </Link>{" "}
          / {getCategoryBreadcrumbLabel(category)}
        </nav>

        {authority && (
          <CategoryAuthorityLayer
            authority={authority}
            products={list}
            breadcrumbItems={breadcrumbItems}
          />
        )}

        <section aria-labelledby="category-product-grid">
          <h2 id="category-product-grid" className="mb-6 text-2xl font-semibold text-primary">
            {getCategoryBreadcrumbLabel(category)} Catalog
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} seoHeading />
            ))}
          </div>
        </section>

        {authority && (
          <>
            <CategoryFaqSection faqs={authority.faqs} />
            <CategoryRelatedResearchLinks links={authority.relatedLinks} />
          </>
        )}
      </div>
    </div>
  );
}
