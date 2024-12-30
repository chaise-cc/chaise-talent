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

  // Handle Talent URL
  if (pathname == "/~") {
    return NextResponse.redirect("/"); // Redirect to homepage for invalid usernames
  }

  // Redirect unauthenticated users to login
  if (!session && !isAuthPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session) {
    const { user, activeRole } = session;

    if (!user || !activeRole) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const activeAccount = user.accounts?.find(
      (acc) => acc?.type === activeRole
    );

    if (activeAccount && !activeAccount.isOnboarded && !isOnboardingPage) {
      const onboardingPath =
        activeRole === "client" ? "/onboarding/client" : "/onboarding/talent";
      return NextResponse.redirect(new URL(onboardingPath, request.url));
    }

    if (isAuthPage) {
      return NextResponse.redirect(getSafeRedirectUrl(request, "/dashboard"));
    }

    const response = NextResponse.next();
    response.headers.set("x-user-session", JSON.stringify(session));
    return response;
  }

  return NextResponse.next(); // Allow other requests to proceed
}

// Config for applying middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
    "/onboarding/:path*",
    "/panel/:path*",
    "/signup/verify-email",
    "/signup/verify-phone",
    "/@:path*", // Explicitly handle @username paths
  ],
};
