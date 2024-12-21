import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { isUser } from "@/utils/session.util";
import { User } from "@/types";

export async function getSessionData(): Promise<{
  user: User | null;
  activeRole?: string;
}> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session")?.value;

  if (!token) return { user: null };

  try {
    const decryptedData = await decrypt(token);
    if (isUser(decryptedData)) {
      return { user: decryptedData.user, activeRole: decryptedData.activeRole };
    }
    console.warn("Decrypted data does not match User structure.");
  } catch (error) {
    console.error("Failed to decrypt session token:", error);
  }

  return { user: null };
}
