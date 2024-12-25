import { cookies } from "next/headers";
import { otpEncrypt } from "./encryption"; // Assuming otpEncrypt is a function that encrypts the session
import { SessionPayload } from "@/types"; // Importing the session type

const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes expiry time

// Updated function with proper types
export async function storeOtpInSession(
  session: SessionPayload,
  otp: string
): Promise<SessionPayload> {
  // Set the OTP and expiry time in the user object
  session.user.verificationToken = otp;
  session.user.otpExpiry = Date.now() + OTP_EXPIRY_TIME; // Set OTP expiry time

  // Encrypt the session with the OTP data
  const encryptedSession = await otpEncrypt({
    verificationToken: otp,
    otpExpiry: new Date(session.user.otpExpiry), // Convert timestamp to Date object
  });

  // Save updated session in cookies
  const cookiesStore = await cookies();
  cookiesStore.set("session", encryptedSession, { path: "/" });

  // Return the updated session
  return session;
}
