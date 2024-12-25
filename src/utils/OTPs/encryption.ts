import { jwtVerify, SignJWT } from "jose";
import { TextEncoder } from "util";

const otpSecretKey = process.env.OTP_SECRET_KEY;
const otpEncodedKey = new TextEncoder().encode(otpSecretKey);

// Encrypt OTP-related data
export async function otpEncrypt(otpPayload: {
  verificationToken: string;
  otpExpiry: Date;
}): Promise<string> {
  return new SignJWT({
    verificationToken: otpPayload.verificationToken,
    otpExpiry: otpPayload.otpExpiry.toISOString(), // Ensure otpExpiry is serialized as a string
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(otpPayload.otpExpiry.getTime() / 1000)) // Ensuring the expiry is correctly handled
    .sign(otpEncodedKey);
}

// Decrypt OTP-related data
export async function otpDecrypt(
  otpToken: string
): Promise<{ verificationToken: string; otpExpiry: Date } | null> {
  try {
    const { payload } = await jwtVerify(otpToken, otpEncodedKey, {
      algorithms: ["HS256"],
    });

    if (!payload.verificationToken || !payload.otpExpiry) {
      console.log("Invalid OTP token: Missing otp or expiry");
      return null;
    }

    // Parse expiry back into a Date object
    const otpExpiry = new Date(payload.otpExpiry as string);

    return {
      verificationToken: payload.verificationToken as string,
      otpExpiry,
    };
  } catch (error) {
    console.error("Error decrypting OTP:", error);
    return null;
  }
}
