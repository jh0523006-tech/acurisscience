import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createSupabaseServiceClient } from "@/lib/supabase";
import { InquiriesTable } from "./InquiriesTable";

export const metadata = {
  title: "Inquiries Admin",
  robots: { index: false, follow: false },
};

export default async function AdminInquiriesPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const supabase = createSupabaseServiceClient();
  if (!supabase) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-red-600">Database service not configured.</p>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-red-600">Failed to load inquiries.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <InquiriesTable rows={data ?? []} />
    </div>
  );
}
