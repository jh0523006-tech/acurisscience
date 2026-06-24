import type { Metadata } from "next";
import { meta } from "@/lib/seo";

export const metadata: Metadata = meta({
  title: "CAS Number Search",
  description: "Search research peptides by CAS registry number, product name, or chemical identifier.",
  path: "/cas-search",
});

export default function CasSearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
