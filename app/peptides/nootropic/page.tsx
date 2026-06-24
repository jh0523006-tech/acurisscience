import { CategoryPeptidesListing } from "@/components/CategoryPeptidesListing";
import { CATEGORY_SEO } from "@/lib/constants";
import { meta } from "@/lib/seo";

const category = "Cognitive / Nootropic Peptides";
const seo = CATEGORY_SEO[category];

export const metadata = meta({
  title: seo.title,
  description: seo.description,
  path: seo.path,
});

export default function NootropicPeptidesPage() {
  return (
    <CategoryPeptidesListing
      category={category}
      title="Cognitive / Nootropic Peptides"
      subtitle="Neuropeptides for cognitive neuroscience, neuroprotection, and nootropic mechanism research."
    />
  );
}
