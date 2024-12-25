// import { otpDecrypt } from "@/lib/otp"; // Import the otpDecrypt function
import { decrypt, encrypt } from "@/lib/session"; // Import session functions
import { cookies } from "next/headers"; // For working with cookies
import { otpDecrypt } from "./encryption";

export async function validateOTP(
  token: string,
  userOTP: string
): Promise<boolean> {
  try {
    // Decrypt session to retrieve OTP information
    const session = await decrypt(token);

    if (!session || !session.user) {
      console.log("Invalid session data");
      return false; // Invalid session
    }

    const { user } = session;

    // Decrypt OTP from the session
    const otpData = await otpDecrypt(user.verificationToken);
    if (!otpData) {
      console.log("Invalid or expired OTP");
      return false; // OTP is invalid or expired
    }

    // Check if the OTP has expired
    const currentTime = new Date();
    if (otpData.otpExpiry < currentTime) {
      console.log("OTP has expired");
      return false; // OTP expired
    }

    // Check if the OTP provided by the user matches the stored OTP
    if (userOTP !== otpData.verificationToken) {
      console.log("Invalid OTP");
      return false; // OTP does not match
    }

    // Clear the OTP from the session after successful validation
    user.verificationToken = ""; // Clear OTP token after validation

    // Re-encrypt and update session with the cleared OTP
    const updatedSession = {
      ...session,
      user: { ...user, verificationToken: "" }, // Clear OTP in the user object
    };

    const encryptedSession = await encrypt(updatedSession);

    const cookiesStore = await cookies();
    cookiesStore.set("session", encryptedSession, {
      httpOnly: true,
      secure: true,
      expires: session.expiresAt,
    });

    return true; // OTP is valid and session updated
  } catch (error) {
    console.error("Error during OTP validation:", error);
    return false;
  }
}
