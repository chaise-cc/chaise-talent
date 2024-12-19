import AccountSwitcher from "@/app/(pages)/(dashboard)/_components/shared/AccountSwitcher";
import { User } from "@/types";
import React from "react";

type ClientHomePageData = {
  user: User;
  activeRole: string;
};

export default function ClientHomePageScreen({
  user,
  activeRole,
}: ClientHomePageData) {
  return (
    <div>
      HomePageScreen for client {user.firstName}
      <AccountSwitcher accounts={user.accounts} activeRole={activeRole} />
    </div>
  );
}
