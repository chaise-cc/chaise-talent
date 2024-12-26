import crypto from "crypto";
import bcrypt from "bcrypt";

export async function generateVerificationToken(hours: number) {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(rawToken, 10);
  const expiryAt = new Date(Date.now() + hours * 60 * 60 * 1000);

  return { rawToken, hashedToken, expiryAt };
}
