// File: utils/OTPs/verifyVerificationToken.ts
import { compare } from "bcrypt"; // We will use bcrypt to compare the hash

export async function verifyVerificationToken(
  token: string,
  storedToken: { code: string; expiryAt: string }
) {
  // Check if the token has expired
  const currentTime = new Date();
  const expiryTime = new Date(storedToken.expiryAt);

  if (currentTime > expiryTime) {
    return false; // Token expired
  }

  // Compare the token with the stored hash
  const isValid = await compare(token, storedToken.code);
  return isValid;
}
