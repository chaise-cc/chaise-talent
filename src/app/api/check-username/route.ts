import { NextResponse } from "next/server";
import pb from "@/lib/pocketbase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { available: false, message: "Username query parameter is required." },
      { status: 400 }
    );
  }

  try {
    // Query PocketBase for the username
    const records = await pb.collection("users").getList(1, 1, {
      filter: `username="${username}"`,
    });

    const isAvailable = records.items.length === 0;

    return NextResponse.json({ available: isAvailable });
  } catch (error) {
    console.error("Error querying PocketBase:", error);

    return NextResponse.json(
      {
        available: false,
        message: "An error occurred while checking username availability.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
