import { NextRequest, NextResponse } from "next/server";
import { searchWikipedia } from "@/lib/wikipedia";
import { checkAdminAccess } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const access = await checkAdminAccess();
  if (!access.authorized) {
    return NextResponse.json(
      { error: access.reason === "unauthenticated" ? "Unauthenticated" : "Forbidden" },
      { status: access.reason === "unauthenticated" ? 401 : 403 }
    );
  }

  const query = req.nextUrl.searchParams.get("q");
  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const results = await searchWikipedia(query);
    return NextResponse.json({ results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}