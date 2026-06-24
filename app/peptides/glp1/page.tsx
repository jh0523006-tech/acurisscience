import { CategoryPeptidesListing } from "@/components/CategoryPeptidesListing";
import { CATEGORY_SEO } from "@/lib/constants";
import { meta } from "@/lib/seo";

const category = "GLP-1 / Metabolic Peptides";
const seo = CATEGORY_SEO[category];

export const metadata = meta({
  title: seo.title,
  description: seo.description,
  path: seo.path,
});

export default function Glp1PeptidesPage() {
  return (
    <CategoryPeptidesListing
      category={category}
      title="GLP-1 / Metabolic Peptides"
      subtitle="Metabolic and incretin pathway peptides for glucose regulation and metabolic research."
    />
  );
}
