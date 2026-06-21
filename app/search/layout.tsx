import type { Metadata } from "next";
import { meta } from "@/lib/seo";

export const metadata: Metadata = { ...meta({ title: "Search Products", description: "Search peptides by CAS, name or keyword.", path: "/search" }), robots: { index: false } };

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
