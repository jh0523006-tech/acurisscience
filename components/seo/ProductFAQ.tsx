import type { Product } from "@/data/products";
import { buildProductFaqItems, getProductContent } from "@/data/product-content";
import { JsonLd } from "@/components/ui";
import { productFaqSchema } from "@/lib/seo";

export function ProductFAQ({ product }: { product: Product }) {
  const content = getProductContent(product);
  const items = buildProductFaqItems(product, content);

  return (
    <section className="border-t border-border bg-white py-12">
      <JsonLd data={productFaqSchema(items)} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-primary">Frequently Asked Questions</h2>
        <p className="mt-2 text-sm text-muted">
          Research-focused answers about {product.name}. For laboratory use only — not medical advice.
        </p>
        <dl className="mt-8 divide-y divide-border rounded-xl border border-border">
          {items.map((item) => (
            <div key={item.q} className="px-5 py-5 sm:px-6">
              <dt className="text-base font-medium text-primary">{item.q}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
