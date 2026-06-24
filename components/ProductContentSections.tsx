import type { ReactNode } from "react";
import type { Product } from "@/data/products";
import { getProductContent } from "@/data/product-content";
import { ProductEntityCrossLinks } from "@/components/seo/ProductEntityCrossLinks";

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-xl border border-border bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-primary">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">{children}</div>
    </article>
  );
}

export function ProductContentSections({ product }: { product: Product }) {
  const content = getProductContent(product);

  return (
    <section className="border-t border-border bg-slate-50/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionBlock title="Overview">
            <p>{content.overview.whatItIs}</p>
            <ProductEntityCrossLinks product={product} />
          </SectionBlock>

          <SectionBlock title="Mechanism of Action">
            <p>{content.overview.mechanism}</p>
            {content.overview.receptors && (
              <div>
                <h3 className="font-medium text-primary">Receptor Binding &amp; Signaling</h3>
                <p className="mt-2">{content.overview.receptors}</p>
              </div>
            )}
          </SectionBlock>

          <SectionBlock title="Research Applications">
            {content.researchApplications.map((app) => (
              <div key={app.title}>
                <h3 className="font-medium text-primary">{app.title}</h3>
                <p className="mt-2">{app.description}</p>
              </div>
            ))}
          </SectionBlock>

          <SectionBlock title="Molecular Information">
            {content.molecular.chainSummary && (
              <div>
                <h3 className="font-medium text-primary">Sequence &amp; Chain Summary</h3>
                <p className="mt-2">{content.molecular.chainSummary}</p>
              </div>
            )}
            {content.molecular.modification && (
              <div>
                <h3 className="font-medium text-primary">Modification Type</h3>
                <p className="mt-2">{content.molecular.modification}</p>
              </div>
            )}
            <div>
              <h3 className="font-medium text-primary">Structural Notes</h3>
              <p className="mt-2">{content.molecular.structuralNotes}</p>
            </div>
            <dl className="mt-4 grid gap-2 rounded-lg border border-border bg-slate-50/80 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Molecular Formula</dt>
                <dd className="font-medium text-primary">{product.molecularFormula}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Molecular Weight</dt>
                <dd className="font-medium text-primary">{product.molecularWeight}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Purity Specification</dt>
                <dd className="font-medium text-primary">{product.purity}</dd>
              </div>
            </dl>
          </SectionBlock>

          <SectionBlock title="Experimental Notes">
            <div>
              <h3 className="font-medium text-primary">Stability</h3>
              <p className="mt-2">{content.experimental.stability}</p>
            </div>
            <div>
              <h3 className="font-medium text-primary">Storage Conditions</h3>
              <p className="mt-2">{content.experimental.storage}</p>
            </div>
            <div>
              <h3 className="font-medium text-primary">Laboratory Handling</h3>
              <p className="mt-2">{content.experimental.handling}</p>
            </div>
          </SectionBlock>
        </div>
      </div>
    </section>
  );
}
