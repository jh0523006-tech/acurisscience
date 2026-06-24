import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { Section } from "@/components/ui";
import { formatCas, getFeaturedProducts } from "@/data/products";
import { HOME_WHY_CHOOSE } from "@/lib/constants";
import {
  getCategoryPath,
  getProductLinkText,
  getProductSeoTitle,
  HOMEPAGE_CATEGORY_LINKS,
} from "@/lib/internalLinks";
import { meta } from "@/lib/seo";
import { LabImage } from "@/components/LabImage";

export const metadata = meta({
  title: "Research Grade Peptide Supplier | Acuris Science",
  description:
    "High-quality research peptides with analytical documentation for pharmaceutical, biotech and academic researchers worldwide.",
  path: "/",
});

const featuredPeptides = getFeaturedProducts();

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[520px] overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <LabImage
              src="/images/home-hero.png"
              alt="DNA molecular research background"
              priority
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,64,175,0.85) 55%, rgba(30,64,175,0.78) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              Research Use Only
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Research Grade Peptides for Scientific Discovery
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
              High-quality research peptides supported by comprehensive analytical
              documentation and technical expertise.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/peptides"
                className="rounded-md bg-white px-6 py-3 text-sm font-medium text-brand-dark hover:bg-slate-100"
              >
                Browse Research Peptides Catalog
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
              >
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-blue-50/40 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SearchBar
            large
            placeholder="Search by CAS Number, Product Name or Sequence"
          />
        </div>
      </section>

      <Section>
        <h2 className="text-2xl font-semibold text-primary">Research Peptide Categories</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Explore research-grade peptides organized by therapeutic area and signaling pathway.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOMEPAGE_CATEGORY_LINKS.map((item) => {
            const href = getCategoryPath(item.category);
            if (!href) return null;

            return (
            <Link
              key={item.category}
              href={href}
              className="group flex flex-col rounded-xl border border-border bg-white p-6 shadow-sm transition hover:border-brand hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-primary group-hover:text-brand">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
              <span className="mt-5 text-sm font-medium text-brand">{item.anchor} →</span>
            </Link>
            );
          })}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-primary">Featured Products</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredPeptides.map((product) => (
            <div
              key={product.slug}
              className="flex flex-col rounded-xl border border-border bg-white p-7 shadow-sm transition hover:border-brand hover:shadow-lg"
            >
              <Link href={`/peptides/${product.slug}`} className="group flex-1">
                <h3 className="text-xl font-semibold text-primary group-hover:text-brand">
                  {getProductSeoTitle(product)}
                </h3>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-border/70 pb-3">
                    <dt className="text-muted">CAS</dt>
                    <dd className="font-medium text-primary">{formatCas(product.cas)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border/70 pb-3">
                    <dt className="text-muted">Purity</dt>
                    <dd className="font-medium text-brand">{product.purity}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Category</dt>
                    <dd className="text-right font-medium text-primary">{product.category}</dd>
                  </div>
                </dl>
                <span className="mt-5 inline-block text-sm font-medium text-brand group-hover:underline">
                  {getProductLinkText(product)} →
                </span>
              </Link>
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="mt-6 block rounded-md bg-brand px-4 py-3 text-center text-sm font-medium text-white hover:bg-brand-dark"
              >
                Request Information
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50/50">
        <h2 className="text-2xl font-semibold text-primary">Why Choose Us</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_WHY_CHOOSE.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10] bg-slate-50">
                <LabImage src={item.image} alt={item.alt} sizes="(max-width:1024px) 50vw, 25vw" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-brand-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Ready to Discuss Your Research Requirements?
          </h2>
          <p className="mt-4 leading-relaxed text-blue-100">
            Research-grade peptides supported by analytical documentation and technical expertise.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-white px-8 py-3 text-sm font-medium text-brand-dark hover:bg-slate-100"
            >
              Request Information
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white/40 px-8 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
