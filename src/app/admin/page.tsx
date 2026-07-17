import { redirect } from "next/navigation";
import { checkAdminAccess } from "@/lib/admin-auth";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const access = await checkAdminAccess();

if (!access.authorized && access.reason === "unauthenticated") {
  redirect("/sign-in?redirect_url=/admin");
}

  if (!access.authorized) {
    return (
      <div className="max-w-md mx-auto mt-24 p-8 text-center">
        <h1 className="text-2xl font-semibold mb-2">Access denied</h1>
        <p className="text-gray-600">
          Your account is not authorized to access this dashboard. If you think
          this is a mistake, contact the site owner.
        </p>
      </div>
    );
  }

  return <AdminDashboard />;
}
