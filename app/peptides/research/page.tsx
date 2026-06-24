import { CategoryPeptidesListing } from "@/components/CategoryPeptidesListing";
import { CATEGORY_SEO } from "@/lib/constants";
import { meta } from "@/lib/seo";

const category = "Research / Regenerative Peptides";
const seo = CATEGORY_SEO[category];

export const metadata = meta({
  title: seo.title,
  description: seo.description,
  path: seo.path,
});

export default function ResearchPeptidesPage() {
  return (
    <CategoryPeptidesListing
      category={category}
      title="Research / Regenerative Peptides"
      subtitle="Specialty peptides for tissue repair, mitochondrial function, and regenerative research."
    />
  );
}
