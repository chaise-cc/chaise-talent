import getUserAndRole from "@/utils/getUserAndRole";
import { logout } from "@/app/_actions/auth.action";
import { redirect } from "next/navigation";
import OnboardingHeader from "./_components/header";

export default async function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, activeRole } = await getUserAndRole();

  if (!activeRole || !user) redirect("/auth/login");

  return (
    <div className="">
      <OnboardingHeader activeRole={activeRole} logout={logout} />
      {children}
    </div>
  );
}
