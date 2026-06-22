import type { InquiryRow } from "@/lib/supabase";

export function inquiriesToCsv(rows: InquiryRow[]) {
  const headers = [
    "id",
    "created_at",
    "name",
    "company",
    "email",
    "country",
    "research_interest",
    "message",
  ];

  const escape = (value: string | null) => {
    const text = value ?? "";
    if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
    return text;
  };

  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      headers.map((key) => escape(row[key as keyof InquiryRow] as string | null)).join(","),
    ),
  ];

  return lines.join("\r\n");
}
