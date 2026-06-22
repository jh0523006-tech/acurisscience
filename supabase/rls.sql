-- Run in Supabase Dashboard → SQL Editor
-- Table: inquiries (id uuid PK default gen_random_uuid(), created_at timestamptz default now(), ...)

alter table public.inquiries enable row level security;

-- Allow anonymous inserts from the public website API (anon key)
drop policy if exists "Allow anonymous insert" on public.inquiries;
create policy "Allow anonymous insert"
  on public.inquiries
  for insert
  to anon
  with check (true);

-- Block public reads/updates/deletes (admin uses service role key server-side)
drop policy if exists "Deny anonymous select" on public.inquiries;
create policy "Deny anonymous select"
  on public.inquiries
  for select
  to anon
  using (false);

drop policy if exists "Deny anonymous update" on public.inquiries;
create policy "Deny anonymous update"
  on public.inquiries
  for update
  to anon
  using (false);

drop policy if exists "Deny anonymous delete" on public.inquiries;
create policy "Deny anonymous delete"
  on public.inquiries
  for delete
  to anon
  using (false);
