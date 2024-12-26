/* eslint-disable @typescript-eslint/no-unused-vars */
import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { User } from "@/types";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  user: User;
  expiresAt: Date;
  activeRole: string;
};

// Add the OTP and expiry information when creating the session
export async function createSession(
  user: User,
  activeRole: string
): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session: SessionPayload = { user, expiresAt, activeRole };

  const encryptedSession = await encrypt(session);
  const cookiesStore = await cookies();

  cookiesStore.set("session", encryptedSession, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  const cookiesStore = await cookies();

  cookiesStore.delete("session");

  return {
    "Set-Cookie": `session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`,
  };
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({
    user: payload.user,
    activeRole: payload.activeRole,
    expiresAt: payload.expiresAt.toISOString(), // Explicitly include expiresAt in the payload
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(payload.expiresAt.getTime() / 1000)) // Ensure expiration is consistent with expiresAt
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ""
): Promise<SessionPayload | null> {
  if (!session) {
    console.log("No session provided");
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    if (!payload.user || !payload.activeRole || !payload.expiresAt) {
      console.log(
        "Invalid session payload: missing user, activeRole, or expiresAt"
      );
      return null;
    }

    // Parse expiresAt back into a Date object
    const expiresAt = new Date(payload.expiresAt as string);

    // Ensure the payload has the correct structure
    const user = payload.user as User;
    const activeRole = payload.activeRole as string;

    return { user, activeRole, expiresAt };
  } catch (error) {
    // Narrow the error type and handle it safely
    if (error instanceof Error) {
      console.error("Failed to verify session:", error.message);
    } else {
      console.error("An unknown error occurred during session decryption");
    }
    return null;
  }
}
