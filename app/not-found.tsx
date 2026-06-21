import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white py-24 text-center">
      <h1 className="text-5xl font-semibold text-primary">404</h1>
      <p className="mt-4 text-muted">Page not found</p>
      <Link href="/" className="mt-8 inline-block rounded-md bg-brand px-6 py-3 text-sm font-medium text-white">Return Home</Link>
    </div>
  );
}
