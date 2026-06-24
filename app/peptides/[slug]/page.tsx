import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import { ProductContentSections } from "@/components/ProductContentSections";
import { ProductSEO, generateProductPageMetadata } from "@/components/ProductSEO";
import { ProductFAQ } from "@/components/seo/ProductFAQ";
import { RelatedPeptides } from "@/components/seo/RelatedPeptides";
import { formatCas, getProduct, getProductSlugs } from "@/data/products";
import { getCategoryBreadcrumbLabel, getCategoryPath } from "@/lib/internalLinks";
import { getBackToCategoryText, getProductH1, getProductSeoIntro } from "@/lib/product-seo";

export async function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return generateProductPageMetadata(slug);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const docs = ["COA", "LC-MS", "HPLC", "NMR"];
  const categoryHref = getCategoryPath(p.category);
  const categoryLabel = getCategoryBreadcrumbLabel(p.category);
  const info = [
    ["CAS", formatCas(p.cas)],
    ["Molecular Formula", p.molecularFormula],
    ["Molecular Weight", p.molecularWeight],
    ["Purity", p.purity],
    ["Appearance", p.appearance],
    ["Storage", p.storage],
  ];

  return (
    <div className="bg-white">
      <ProductSEO product={p} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand">Home</Link>
          {" / "}
          <Link href="/peptides" className="hover:text-brand">Research Peptides Catalog</Link>
          {categoryHref && (
            <>
              {" / "}
              <Link href={categoryHref} className="hover:text-brand">
                {categoryLabel}
              </Link>
            </>
          )}
          {" / "}
          <span className="text-primary">{p.name}</span>
        </nav>
        {categoryHref && (
          <p className="mb-6 text-sm">
            <Link href={categoryHref} className="font-medium text-brand hover:underline">
              {getBackToCategoryText(p.category)}
            </Link>
          </p>
        )}
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-semibold text-primary">{getProductH1(p)}</h1>
            <section
              className="mt-4 rounded-xl border border-border bg-slate-50/80 px-4 py-4 sm:px-5"
              aria-label="Product identity"
            >
              <dl className="space-y-2 text-sm">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-medium text-primary">CAS Number:</dt>
                  <dd className="text-muted">{formatCas(p.cas)}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-medium text-primary">Chemical Classification:</dt>
                  <dd className="text-muted">Research peptide</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-medium text-primary">Primary Keyword:</dt>
                  <dd className="text-muted">{p.name}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm">
                <Link
                  href={p.cas.trim() ? `/cas-search?q=${encodeURIComponent(p.cas.trim())}` : "/cas-search"}
                  className="font-medium text-brand hover:underline"
                >
                  Search related CAS →
                </Link>
              </p>
            </section>
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">{getProductSeoIntro(p)}</p>
            <dl className="mt-8 divide-y divide-border rounded-xl border border-border">
              {info.map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 gap-4 px-4 py-3 sm:grid-cols-3">
                  <dt className="text-sm font-medium text-muted">{k}</dt>
                  <dd className="text-sm sm:col-span-2">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-primary">Analytical Documentation</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {docs.map((d) => (
                  <div key={d} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                    <span className="text-sm font-medium">{d}</span>
                    <span className="text-xs font-medium text-emerald-700">✓ Available</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-blue-50/30 p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-primary">Research Inquiry</h2>
            <div className="mt-4"><InquiryForm productName={p.name} /></div>
          </div>
        </div>
      </div>
      <ProductContentSections product={p} />
      <ProductFAQ product={p} />
      <RelatedPeptides product={p} />
    </div>
  );
}
