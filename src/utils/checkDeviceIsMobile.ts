// utils/isMobile.ts
import { headers } from "next/headers";

export const isMobile = async () => {
  const header = await headers();
  const userAgent = header.get("user-agent") || "";

  return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
};

export const isIphone = async () => {
  const header = await headers();
  const userAgent = header.get("user-agent") || "";

  return /ip(hone|[oa]d)/i.test(userAgent);
};
