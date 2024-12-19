import AccountSwitcher from "@/app/(pages)/(dashboard)/_components/shared/AccountSwitcher";
import TopNavigation from "@/app/(pages)/(dashboard)/_components/talent/top-navigation";
import { User } from "@/types";
import React from "react";

type TalentHomePageData = {
  user: User;
  activeRole: string;
};

export default function TalentHomePageScreen({
  user,
  activeRole,
}: TalentHomePageData) {
  return (
    <div>
      <TopNavigation
        pageTitle={`Welcome back, ${user?.firstName || "Guest"}`}
      />
      <main className="p-4">
        <p>Explore your dashboard and make the most of your account.</p>

        <AccountSwitcher accounts={user.accounts} activeRole={activeRole} />
      </main>
    </div>
  );
}
