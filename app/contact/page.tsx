import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/sections";
import { IMAGES, SITE_EMAIL } from "@/lib/constants";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Contact Us",
  description: "Contact Acuris Science for peptide inquiries and research support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-slate-50/40">
      <PageHero
        image={IMAGES.contactHero}
        alt="Research laboratory for peptide inquiries"
        title="Contact Us"
        subtitle="For product inquiries, analytical documentation requests and technical support."
        height={400}
        gradient
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-8 shadow-md">
            <h2 className="text-lg font-semibold text-primary">Company Information</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Acuris Science supports pharmaceutical, biotech, CRO/CDMO and academic
              research institutions with research-grade peptides and analytical services.
            </p>
            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="font-medium text-primary">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${SITE_EMAIL}`} className="text-brand hover:underline">
                    {SITE_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-primary">Regions Served</dt>
                <dd className="mt-1 text-muted">
                  USA, Canada, Europe, Australia, Japan, Singapore
                </dd>
              </div>
              <div>
                <dt className="font-medium text-primary">Response Time</dt>
                <dd className="mt-1 text-muted">Within 24 hours</dd>
              </div>
              <div>
                <dt className="font-medium text-primary">Research Use</dt>
                <dd className="mt-1 text-muted">
                  For laboratory research use only. Not for human consumption or therapeutic use.
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-white p-8 shadow-md">
            <h2 className="text-lg font-semibold text-primary">Inquiry Form</h2>
            <p className="mt-2 text-sm text-muted">
              Submit your peptide inquiry and our scientific team will respond promptly.
            </p>
            <div className="mt-6">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
