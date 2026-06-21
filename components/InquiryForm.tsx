"use client";

import { FormEvent, useState } from "react";
import { RESEARCH_INTERESTS } from "@/lib/constants";

export function InquiryForm({ productName }: { productName?: string }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    country: "",
    researchInterest: "",
    message: productName ? `Inquiry about ${productName}` : "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [err, setErr] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErr("");
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, productName }),
    });
    if (!res.ok) {
      const d = await res.json();
      setErr(d.error || "Failed");
      setStatus("err");
      return;
    }
    setStatus("ok");
    setForm({ name: "", company: "", email: "", country: "", researchInterest: "", message: "" });
  }

  const cls = "w-full rounded-md border border-border px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

  if (status === "ok") {
    return (
      <div className="rounded-lg border border-border p-6 text-center">
        <p className="font-medium text-primary">Thank you. We will respond shortly.</p>
        <button type="button" className="mt-3 text-sm text-brand" onClick={() => setStatus("idle")}>Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium">Name *</label><input required className={cls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><label className="mb-1 block text-sm font-medium">Company</label><input className={cls} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium">Email *</label><input type="email" required className={cls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><label className="mb-1 block text-sm font-medium">Country</label><input className={cls} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Research Interest</label>
        <select className={cls} value={form.researchInterest} onChange={(e) => setForm({ ...form, researchInterest: e.target.value })}>
          <option value="">Select area</option>
          {RESEARCH_INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div><label className="mb-1 block text-sm font-medium">Message *</label><textarea required rows={4} className={cls} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
      {status === "err" && <p className="text-sm text-red-600">{err}</p>}
      <button disabled={status === "loading"} className="rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-50">
        {status === "loading" ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
