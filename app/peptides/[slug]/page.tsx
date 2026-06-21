import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import { JsonLd } from "@/components/ui";
import { formatCas, getProduct, products } from "@/data/products";
import { breadcrumbSchema, meta, productSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Not Found" };
  return meta({ title: `${p.name} | Research Peptide`, description: p.description, path: `/peptides/${slug}` });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const docs = ["COA", "LC-MS", "HPLC", "NMR"];
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
      <JsonLd data={[productSchema(p), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Products", path: "/peptides" }, { name: p.name, path: `/peptides/${slug}` }])]} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-muted">
          <Link href="/" className="hover:text-brand">Home</Link> / <Link href="/peptides" className="hover:text-brand">Products</Link> / {p.name}
        </nav>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-semibold text-primary">{p.name}</h1>
            <p className="mt-2 text-sm text-muted">{p.category}</p>
            <p className="mt-4 text-muted leading-relaxed">{p.description}</p>
            <dl className="mt-8 divide-y divide-border rounded-xl border border-border">
              {info.map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 gap-4 px-4 py-3 sm:grid-cols-3">
                  <dt className="text-sm font-medium text-muted">{k}</dt>
                  <dd className="text-sm sm:col-span-2">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-primary">Documents</h2>
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
            <h2 className="text-lg font-semibold text-primary">Product Inquiry</h2>
            <div className="mt-4"><InquiryForm productName={p.name} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
