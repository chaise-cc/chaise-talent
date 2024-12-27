import getUserAndRole from "@/utils/getUserAndRole";
import { logout } from "@/app/_actions/auth.action";
import { redirect } from "next/navigation";
import OnboardingHeader from "./_components/header";
import { Toaster } from "sonner";

export default async function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, activeRole } = await getUserAndRole();

  if (!activeRole || !user) redirect("/login");

  if (user.accounts.find((acc) => acc.type === activeRole)?.isOnboarded)
    redirect("/dashboard");

  return (
    <div className="">
      <OnboardingHeader activeRole={activeRole} logout={logout} />
      {children}
      <Toaster richColors position="top-right" />
    </div>
  );
}
