import { CategoryPeptidesListing } from "@/components/CategoryPeptidesListing";
import { CATEGORY_SEO } from "@/lib/constants";
import { meta } from "@/lib/seo";

const category = "Growth Hormone & Recovery Peptides";
const seo = CATEGORY_SEO[category];

export const metadata = meta({
  title: seo.title,
  description: seo.description,
  path: seo.path,
});

export default function GrowthHormonePeptidesPage() {
  return (
    <CategoryPeptidesListing
      category={category}
      title="Growth Hormone & Recovery Peptides"
      subtitle="GH secretagogues and recovery peptides for endocrine signaling and regenerative research."
    />
  );
}
