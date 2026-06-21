"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, useEffect } from "react";
import { formatCas } from "@/data/products";
import { searchProducts } from "@/lib/search";

function Results() {
  const sp = useSearchParams();
  const initial = sp.get("q") || "";
  const [q, setQ] = useState(initial);
  useEffect(() => setQ(initial), [initial]);
  const results = useMemo(() => searchProducts(q), [q]);

  return (
    <>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="CAS, Product Name or Keyword" className="mb-8 w-full max-w-xl rounded-md border border-border px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
      {q.trim() ? (
        <>
          <p className="mb-6 text-sm text-muted">{results.length} result(s) for &ldquo;{q}&rdquo;</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <Link key={p.slug} href={`/peptides/${p.slug}`} className="rounded-xl border border-border p-5 hover:border-brand hover:shadow-md">
                <h2 className="font-semibold text-primary">{p.name}</h2>
                <p className="mt-1 text-sm text-muted">CAS: {formatCas(p.cas)}</p>
                <p className="text-sm text-muted">{p.category}</p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="text-muted">Enter a search term to find peptides.</p>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-primary">Search Products</h1>
        <Suspense fallback={<p className="mt-8 text-muted">Loading...</p>}>
          <div className="mt-8"><Results /></div>
        </Suspense>
      </div>
    </div>
  );
}
