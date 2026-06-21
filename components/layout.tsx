import Link from "next/link";
import { NAV, SITE_NAME } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4">
      <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
        <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" stroke="#2563EB" strokeWidth="1.5" fill="rgba(37,99,235,0.1)" />
        <circle cx="20" cy="20" r="4" fill="#2563EB" />
        <line x1="20" y1="16" x2="20" y2="8" stroke="#1e40af" strokeWidth="1.2" />
        <line x1="23" y1="22" x2="31" y2="26" stroke="#1e40af" strokeWidth="1.2" />
        <line x1="17" y1="22" x2="9" y2="26" stroke="#1e40af" strokeWidth="1.2" />
      </svg>
      <div>
        <p className="text-sm font-bold tracking-widest text-primary">ACURIS SCIENCE</p>
        <p className="hidden text-[10px] text-muted sm:block">Research Grade Peptide Supplier</p>
      </div>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-text hover:text-brand">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark">
            Request Information
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold">{SITE_NAME}</p>
            <p className="mt-2 text-sm text-slate-300">Research Grade Peptide Supplier</p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Quick Links</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {NAV.filter((l) => l.href !== "/").map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Contact</p>
            <p className="text-sm text-slate-300">sales@acurisscience.com</p>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-700 pt-6 text-xs text-slate-400">
          For laboratory research use only. Products are not intended for human consumption, therapeutic use or diagnostic procedures.
        </p>
      </div>
    </footer>
  );
}
