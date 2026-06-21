import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Header } from "@/components/layout";
import { JsonLd } from "@/components/ui";
import { globalSchemas } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Research Grade Peptide Supplier | Acuris Science", template: "%s | Acuris Science" },
  description: "Research-grade peptides with COA, LC-MS, HPLC and NMR documentation for pharma, biotech and academic research.",
  metadataBase: new URL("https://www.acurisscience.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head><JsonLd data={globalSchemas} /></head>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
