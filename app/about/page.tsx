import type { Metadata } from "next";
import Link from "next/link";
import { LabImage } from "@/components/LabImage";
import { GlobalCustomersSection, PageHero } from "@/components/sections";
import {
  ABOUT_LAB_GALLERY,
  ABOUT_TRUST_INDICATORS,
  GLOBAL_REGIONS,
  IMAGES,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Acuris Science",
  description:
    "Research-grade peptide supplier with analytical documentation and global scientific support.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <PageHero
        image={IMAGES.aboutHero}
        alt="Research-grade peptide laboratory capabilities"
        title="About Us"
        subtitle="A research-grade peptide supplier for pharmaceutical, biotech and academic laboratories worldwide."
        height={480}
        gradient
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <LabImage
                src={IMAGES.aboutOverview}
                alt="Research laboratory overview"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-primary">Company Overview</h2>
              <p className="mt-4 leading-relaxed text-muted">
                Acuris Science supplies research-grade peptides to pharmaceutical companies,
                biotechnology firms, CRO/CDMO organizations and academic research laboratories.
                We focus on documented quality, analytical verification and responsive scientific
                support for laboratory research programs.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Our products are intended for laboratory research use only and are supported by
                comprehensive batch documentation upon request.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-gradient-to-br from-slate-900 via-brand-dark to-brand py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Research Standards</h2>
            <p className="mt-3 text-blue-100">
              Documented quality and analytical rigor for every research batch.
            </p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT_TRUST_INDICATORS.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/15 bg-white/10 px-5 py-4 text-center text-sm font-semibold text-white backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-primary">Laboratory Capabilities</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ABOUT_LAB_GALLERY.map((item) => (
              <div
                key={item.image}
                className="relative min-h-[320px] overflow-hidden rounded-2xl border border-border shadow-md lg:min-h-[360px]"
              >
                <LabImage src={item.image} alt={item.alt} sizes="(max-width:768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlobalCustomersSection
        image={IMAGES.worldMap}
        alt="Global research coverage map"
        regions={GLOBAL_REGIONS}
        title="Global Coverage"
      />

      <section className="border-t border-border py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/contact"
            className="inline-block rounded-md bg-brand px-8 py-3 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Request Information
          </Link>
        </div>
      </section>
    </div>
  );
}
