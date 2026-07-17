import { auth, clerkClient } from "@clerk/nextjs/server";

const ALLOWED_EMAILS = (process.env.ADMIN_ALLOWED_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export type AdminCheckResult =
  | { authorized: true; email: string }
  | { authorized: false; reason: "unauthenticated" | "forbidden" };

export async function checkAdminAccess(): Promise<AdminCheckResult> {
  const { userId } = await auth();

  if (!userId) {
    return { authorized: false, reason: "unauthenticated" };
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase();

  if (!email || !ALLOWED_EMAILS.includes(email)) {
    return { authorized: false, reason: "forbidden" };
  }

  return { authorized: true, email };
}