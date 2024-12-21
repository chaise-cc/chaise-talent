// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session")?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const session = await decrypt(token);

  if (!session && !isAuthPage) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (session && isAuthPage) {
    // Redirect to dashboard if authenticated and trying to access auth page
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/panel/:path*"],
};
