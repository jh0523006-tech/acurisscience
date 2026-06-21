"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar({
  defaultValue = "",
  large = false,
  placeholder = "CAS, Product Name or Keyword",
}: {
  defaultValue?: string;
  large?: boolean;
  placeholder?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(defaultValue);
  function go(e: FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }
  const input = large ? "px-4 py-3.5 text-base" : "px-3 py-2 text-sm";
  return (
    <form onSubmit={go} className="flex flex-col gap-3 sm:flex-row">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className={`flex-1 rounded-md border border-border bg-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand ${input}`}
      />
      <button
        className={`rounded-md bg-brand font-medium text-white hover:bg-brand-dark ${large ? "px-8 py-3.5" : "px-4 py-2 text-sm"}`}
      >
        Search
      </button>
    </form>
  );
}
