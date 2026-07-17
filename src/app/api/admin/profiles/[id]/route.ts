import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAccess } from "@/lib/admin-auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await checkAdminAccess();
  if (!access.authorized) {
    return NextResponse.json(
      { error: access.reason === "unauthenticated" ? "Unauthenticated" : "Forbidden" },
      { status: access.reason === "unauthenticated" ? 401 : 403 }
    );
  }

  const { id } = await params;

  try {
    await prisma.profile.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Profile not found or already deleted" }, { status: 404 });
  }
}