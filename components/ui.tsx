import type { ReactNode } from "react";

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export function Section({
  children,
  className = "",
  white = true,
}: {
  children: ReactNode;
  className?: string;
  white?: boolean;
}) {
  return (
    <section className={`py-16 ${white ? "bg-white" : ""} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
