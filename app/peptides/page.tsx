import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { PageHero } from "@/components/sections";
import { formatCas, products } from "@/data/products";
import { IMAGES, SLUG_CATEGORY_MAP } from "@/lib/constants";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Research Peptides Catalog",
  description: "Browse research-grade peptides by category. Search by CAS, product name or keyword.",
  path: "/peptides",
});

export default async function PeptidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: catSlug } = await searchParams;
  const activeCat = catSlug ? SLUG_CATEGORY_MAP[catSlug] : undefined;
  const list = activeCat ? products.filter((p) => p.category === activeCat) : products;

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
        {activeCat && (
          <p className="mb-8 text-sm text-muted">
            Showing category: <span className="font-medium text-primary">{activeCat}</span>
          </p>
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <div
              key={p.slug}
              className="rounded-xl border border-border p-6 shadow-sm transition hover:border-brand hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-primary">{p.name}</h2>
              <p className="mt-2 text-sm text-muted">CAS: {formatCas(p.cas)}</p>
              <p className="text-sm text-muted">Purity: {p.purity}</p>
              <p className="text-sm text-muted">{p.category}</p>
              <Link
                href={`/peptides/${p.slug}`}
                className="mt-5 inline-block text-sm font-medium text-brand hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
