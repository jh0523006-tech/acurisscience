import type { Product } from "@/data/products";
import { JsonLd } from "@/components/ui";
import { breadcrumbSchema, generateProductMetadata, generateProductPageMetadata, productBreadcrumbItems, productSchema } from "@/lib/seo";

export { generateProductMetadata, generateProductPageMetadata };

export function ProductSEO({ product }: { product: Product }) {
  return (
    <JsonLd
      data={[
        productSchema(product),
        breadcrumbSchema(productBreadcrumbItems(product)),
      ]}
    />
  );
}
