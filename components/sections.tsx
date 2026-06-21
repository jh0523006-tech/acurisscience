import type { ReactNode } from "react";
import Link from "next/link";
import { LabImage } from "@/components/LabImage";

interface PageHeroProps {
  image: string;
  alt: string;
  title: ReactNode;
  subtitle?: string;
  height?: number;
  overlay?: string;
  gradient?: boolean;
}

export function PageHero({
  image,
  alt,
  title,
  subtitle,
  height = 550,
  overlay = "rgba(30,64,175,0.75)",
  gradient = false,
}: PageHeroProps) {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: `${height}px` }}
    >
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <LabImage src={image} alt={alt} priority sizes="100vw" />
        </div>
        <div
          className="absolute inset-0"
          style={
            gradient
              ? {
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,64,175,0.82) 55%, rgba(37,99,235,0.72) 100%)",
                }
              : { backgroundColor: overlay }
          }
        />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-slate-100">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export function PhotoServiceCard({
  title,
  desc,
  image,
  alt,
}: {
  title: string;
  desc: string;
  image: string;
  alt: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-md transition hover:-translate-y-0.5 hover:border-brand hover:shadow-xl">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[220px] md:min-h-[260px]">
          <LabImage src={image} alt={alt} sizes="(max-width:768px) 100vw, 50vw" />
        </div>
        <div className="flex flex-col justify-center p-7 lg:p-8">
          <h3 className="text-xl font-semibold text-primary">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export function GlobalCustomersSection({
  image,
  alt,
  regions,
  title = "Global Customers",
}: {
  image: string;
  alt: string;
  regions: readonly { name: string; top: string; left: string }[];
  title?: string;
}) {
  return (
    <section className="relative min-h-[480px] overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <LabImage src={image} alt={alt} sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-slate-900/78" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-slate-200">
          Supporting research institutions across major scientific markets worldwide.
        </p>
        <div className="relative mt-10 hidden min-h-[280px] md:block">
          {regions.map((region) => (
            <div
              key={region.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: region.top, left: region.left }}
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-40" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-brand" />
              </span>
              <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded bg-white/95 px-2 py-1 text-xs font-semibold text-primary shadow">
                {region.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
          {regions.map((region) => (
            <span
              key={region.name}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              {region.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PhotoBanner({
  image,
  alt,
  title,
  items,
  button,
}: {
  image: string;
  alt: string;
  title: string;
  items: string[];
  button?: { label: string; href: string };
}) {
  return (
    <section className="relative min-h-[420px] overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <LabImage src={image} alt={alt} sizes="100vw" />
        </div>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(30,64,175,0.82)" }} />
      </div>
      <div className="relative mx-auto flex min-h-[420px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/20 bg-white/10 px-5 py-4 text-center text-sm font-semibold text-white backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </ul>
          {button && (
            <Link
              href={button.href}
              className="mt-10 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-slate-100"
            >
              {button.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
