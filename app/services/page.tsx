import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PhotoServiceCard } from "@/components/sections";
import { IMAGES, SERVICE_CARDS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Research & Analytical Services | Acuris Science",
  description:
    "Custom peptide synthesis, analytical testing, bulk research supply and technical consultation.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <PageHero
        image={IMAGES.servicesHero}
        alt="Analytical testing and third-party peptide verification"
        title={
          <>
            Research &amp;
            <br />
            Analytical Services
          </>
        }
        subtitle="Supporting pharmaceutical, biotech, CRO/CDMO and academic research with synthesis, analytical testing and scientific consultation."
        height={520}
        gradient
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {SERVICE_CARDS.map((service) => (
              <PhotoServiceCard key={service.title} {...service} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-brand px-8 py-3 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Request Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
