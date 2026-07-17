import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const results = await prisma.profile.findMany({
    where: {
      status: "PUBLISHED",
      name: { contains: q, mode: "insensitive" },
    },
    select: { slug: true, name: true, thumbnailUrl: true },
    take: 8,
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ results });
}