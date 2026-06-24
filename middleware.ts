import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_HOST, SITE_URL } from "@/lib/constants";

function shouldSkipRedirect(host: string): boolean {
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".vercel.app")
  );
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (shouldSkipRedirect(host)) {
    return NextResponse.next();
  }

  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const needsHttps = proto !== "https";
  const needsWww = host !== CANONICAL_HOST;

  if (needsHttps || needsWww) {
    const destination = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      SITE_URL
    );
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
