// /app/api/switch-role/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt, createSession } from "@/lib/session";

export async function POST(req: Request) {
  const body = await req.json();
  const { newRole } = body;
  const cookiesStore = await cookies();

  const token = cookiesStore.get("session")?.value;
  if (!token) {
    return NextResponse.json({ error: "Session not found" }, { status: 401 });
  }

  const sessionData = await decrypt(token);

  if (!sessionData || !sessionData.user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const { user } = sessionData;

  if (!user.accounts.includes(newRole)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  // Update the session with the new role
  await createSession(user, newRole);

  return NextResponse.json({ success: true });
}
