"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { formatCas } from "@/data/products";
import { searchProducts } from "@/lib/search";

function CasSearchResultsInner() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") || "";
  const [q, setQ] = useState(initial);

  useEffect(() => setQ(initial), [initial]);

  const results = useMemo(() => searchProducts(q), [q]);

  return (
    <>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Enter CAS registry number (e.g. 910463-68-2)"
        className="mb-8 w-full max-w-xl rounded-md border border-border px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        aria-label="CAS number search"
      />
      {q.trim() ? (
        <>
          <p className="mb-6 text-sm text-muted">
            {results.length} result(s) for CAS or identifier &ldquo;{q}&rdquo;
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((product) => (
              <Link
                key={product.slug}
                href={`/peptides/${product.slug}`}
                className="rounded-xl border border-border p-5 hover:border-brand hover:shadow-md"
              >
                <h2 className="font-semibold text-primary">{product.name}</h2>
                <p className="mt-1 text-sm text-muted">CAS: {formatCas(product.cas)}</p>
                <p className="text-sm text-muted">{product.category}</p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="text-muted">Enter a CAS registry number to find matching research peptides.</p>
      )}
    </>
  );
}

export function CasSearchResults() {
  return (
    <Suspense fallback={<p className="text-muted">Loading...</p>}>
      <CasSearchResultsInner />
    </Suspense>
  );
}
