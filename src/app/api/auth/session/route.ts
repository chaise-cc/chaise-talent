// /app/api/auth/session/route.ts
import { decrypt } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const session = token ? await decrypt(token) : null;

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session }, { status: 200 });
}
