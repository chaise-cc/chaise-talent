/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/types";

export function isUser(
  data: unknown
): data is { user: User; activeRole: string } {
  return (
    typeof data === "object" &&
    data !== null &&
    "user" in data &&
    typeof (data as any).user === "object" &&
    (data as any).user !== null &&
    "firstName" in (data as any).user &&
    "lastName" in (data as any).user &&
    "email" in (data as any).user &&
    "activeRole" in (data as any)
  );
}
