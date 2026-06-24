import { CategoryPeptidesListing } from "@/components/CategoryPeptidesListing";
import { CATEGORY_SEO } from "@/lib/constants";
import { meta } from "@/lib/seo";

const category = "Cosmetic / Anti-aging Peptides";
const seo = CATEGORY_SEO[category];

export const metadata = meta({
  title: seo.title,
  description: seo.description,
  path: seo.path,
});

export default function CosmeticPeptidesPage() {
  return (
    <CategoryPeptidesListing
      category={category}
      title="Cosmetic / Anti-aging Peptides"
      subtitle="Dermatological and matrix peptides for cosmetic science and anti-aging research."
    />
  );
}
