import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getWikipediaSummary } from "@/lib/wikipedia";
import { generateUniqueSlug } from "@/lib/slug";
import { checkAdminAccess } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const access = await checkAdminAccess();
  if (!access.authorized) {
    return NextResponse.json(
      { error: access.reason === "unauthenticated" ? "Unauthenticated" : "Forbidden" },
      { status: access.reason === "unauthenticated" ? 401 : 403 }
    );
  }

  const { wikipediaTitle, customSlug } = await req.json();

  if (!wikipediaTitle) {
    return NextResponse.json({ error: "wikipediaTitle is required" }, { status: 400 });
  }

  try {
    const summary = await getWikipediaSummary(wikipediaTitle);

    if (summary.isDisambiguation) {
      return NextResponse.json(
        { error: "This title is a disambiguation page — pick a more specific result." },
        { status: 422 }
      );
    }

    const slug = customSlug || (await generateUniqueSlug(summary.title));

    const profile = await prisma.profile.create({
      data: {
        slug,
        name: summary.title,
        wikipediaTitle: summary.title,
        extract: summary.extract,
        thumbnailUrl: summary.thumbnailUrl,
        sourceUrl: summary.sourceUrl,
      },
    });

    return NextResponse.json({ profile }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const access = await checkAdminAccess();
  if (!access.authorized) {
    return NextResponse.json(
      { error: access.reason === "unauthenticated" ? "Unauthenticated" : "Forbidden" },
      { status: access.reason === "unauthenticated" ? 401 : 403 }
    );
  }

  const profiles = await prisma.profile.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ profiles });
}