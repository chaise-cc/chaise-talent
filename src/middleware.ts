import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session")?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isOnboardingPage = request.nextUrl.pathname.startsWith("/onboarding");
  const session = token ? await decrypt(token) : null;

  if (!session && !isAuthPage) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (session) {
    const { user, activeRole } = session;

    if (!user || !activeRole) {
      // Redirect to login if session is incomplete
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const activeAccount = user.accounts?.find(
      (acc) => acc?.type === activeRole
    );

    console.log(activeAccount, activeRole);

    if (activeAccount && !activeAccount.isOnboarded && !isOnboardingPage) {
      // Redirect non-onboarded users to onboarding
      if (activeRole === "client") {
        return NextResponse.redirect(
          new URL("/onboarding/client", request.url)
        );
      } else {
        return NextResponse.redirect(
          new URL("/onboarding/talent", request.url)
        );
      }
    }

    if (isAuthPage) {
      // Redirect authenticated users away from auth pages
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Pass session to downstream layouts or handlers (optional)
    const response = NextResponse.next();
    response.headers.set("x-user-session", JSON.stringify(session));
    return response;
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
    "/onboarding/:path*",
    "/panel/:path*",
  ],
};
