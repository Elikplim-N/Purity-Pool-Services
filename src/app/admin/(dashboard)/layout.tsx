import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/session";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return <AdminShell email={session?.email ?? ""}>{children}</AdminShell>;
}
