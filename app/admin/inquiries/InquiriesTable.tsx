"use client";

import { useRouter } from "next/navigation";
import type { InquiryRow } from "@/lib/supabase";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function InquiriesTable({ rows }: { rows: InquiryRow[] }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Inquiries</h1>
          <p className="mt-1 text-sm text-muted">{rows.length} total submissions</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/api/admin/inquiries/export"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Export CSV
          </a>
          <button
            type="button"
            onClick={logout}
            className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Company</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Country</th>
              <th className="px-4 py-3 text-left font-medium">Research Interest</th>
              <th className="px-4 py-3 text-left font-medium">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  No inquiries yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3">{formatDate(row.created_at)}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.company || "—"}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${row.email}`} className="text-brand hover:underline">
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">{row.country || "—"}</td>
                  <td className="px-4 py-3">{row.research_interest || "—"}</td>
                  <td className="max-w-md px-4 py-3 whitespace-pre-wrap">{row.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
