import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

// Utility to construct a safe redirect URL
function getSafeRedirectUrl(request: NextRequest, fallbackUrl: string) {
  const redirectUrl = request.nextUrl.searchParams.get("redirectUrl");
  return redirectUrl && redirectUrl.startsWith("/")
    ? new URL(redirectUrl, request.url)
    : new URL(fallbackUrl, request.url);
}

export async function middleware(request: NextRequest) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/auth");
  const isOnboardingPage = pathname.startsWith("/onboarding");
  const session = token ? await decrypt(token) : null;

  // If no session and not on an auth page, redirect to login with redirectUrl
  if (!session && !isAuthPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle authenticated users
  if (session) {
    const { user, activeRole } = session;

    // Redirect to login if session data is incomplete
    if (!user || !activeRole) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect to appropriate onboarding page for non-onboarded users
    const activeAccount = user.accounts?.find(
      (acc) => acc?.type === activeRole
    );

    if (activeAccount && !activeAccount.isOnboarded && !isOnboardingPage) {
      const onboardingPath =
        activeRole === "client" ? "/onboarding/client" : "/onboarding/talent";
      return NextResponse.redirect(new URL(onboardingPath, request.url));
    }

    // Redirect authenticated users away from auth pages
    if (isAuthPage) {
      return NextResponse.redirect(getSafeRedirectUrl(request, "/dashboard"));
    }

    // Pass session to downstream handlers (optional)
    const response = NextResponse.next();
    response.headers.set("x-user-session", JSON.stringify(session));
    return response;
  }

  // Allow requests to proceed by default
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
    "/onboarding/:path*",
    "/panel/:path*",
    "/signup/verify-email",
    "/signup/verify-phone",
  ],
};
