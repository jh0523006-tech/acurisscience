import { products, type Product } from "@/data/products";

export function searchProducts(q: string): Product[] {
  const n = q.trim().toLowerCase();
  if (!n) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(n) ||
      p.cas.toLowerCase().includes(n) ||
      p.category.toLowerCase().includes(n) ||
      p.slug.includes(n) ||
      p.description.toLowerCase().includes(n)
  );
}
