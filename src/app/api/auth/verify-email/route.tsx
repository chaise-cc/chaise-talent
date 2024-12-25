import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "@/lib/session"; // Assume you have an encrypt helper

// Handle email verification
export async function POST(req: NextRequest) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session")?.value; // Get the session token from cookies

  if (!token) {
    return NextResponse.json(
      { message: "No session found. Please log in." },
      { status: 401 }
    );
  }

  try {
    const session = await decrypt(token); // Decrypt the session to get user info

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Invalid session data." },
        { status: 401 }
      );
    }

    const { user } = session;
    const { code } = await req.json(); // OTP sent by the user

    if (!code) {
      return NextResponse.json(
        { message: "Code is required." },
        { status: 400 }
      );
    }

    // Check if the email verification token matches
    if (user.verificationToken !== code) {
      return NextResponse.json(
        { message: "Invalid verification code." },
        { status: 400 }
      );
    }

    // Mark the user's email as verified
    user.emailIsVerified = true;
    user.verificationToken = ""; // Clear the verification token after successful verification

    // Re-encrypt and update the session in cookies
    const updatedSession = {
      ...session,
      user: { ...user, emailIsVerified: true },
    };
    const encryptedSession = await encrypt(updatedSession);

    cookiesStore.set("session", encryptedSession, { path: "/" });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
