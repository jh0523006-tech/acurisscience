import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type InquiryRow = {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  email: string;
  country: string | null;
  research_interest: string | null;
  message: string;
};

export type InquiryInsert = Omit<InquiryRow, "id" | "created_at">;

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

export function createSupabaseAnonClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function createSupabaseServiceClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
