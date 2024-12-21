import AccountSwitcher from "@/components/custom/AccountSwitcher";
import getUserAndRole from "@/utils/getUserAndRole";
import { handleRoleRedirection } from "@/utils/handleRoleRedirection";
import { Button } from "@/components/ui/button";
import { Logout } from "iconsax-react";
import { logout } from "@/app/_actions/auth.action";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the user and active role asynchronously
  const { user, activeRole } = await getUserAndRole();

  // Handle unauthenticated or incomplete states
  if (!user) {
    return redirect("/auth/login");
  }

  if (!activeRole) {
    // If the active role is not available, render loading state or redirect based on your requirement
    return (
      <div className="flex justify-center items-center h-screen animate-pulse font-medium">
        <p>Loading...</p>
      </div>
    );
  }

  // Find the active account based on the active role
  const activeAccount = user.accounts.find((acc) => acc.type === activeRole);

  // // Check if the account is onboarded; if not, redirect to onboarding
  // if (activeAccount && !activeAccount.isOnboarded) {
  //   return redirect("/onboarding");
  // }

  // Handle the redirection based on role if onboarded
  if (activeAccount?.isOnboarded) {
    handleRoleRedirection(activeRole); // This handles role-specific redirects if necessary
  }

  // If all conditions are satisfied, render the layout
  return (
    <div className="">
      <header className="flex justify-between p-4 container">
        <p></p>

        <div className="flex gap-4">
          <AccountSwitcher activeRole={activeRole} />

          <Button onClick={logout}>
            <Logout size={16} color="white" /> Logout
          </Button>
        </div>
      </header>

      <p>{activeAccount?.type}</p>
      {children}
    </div>
  );
}
