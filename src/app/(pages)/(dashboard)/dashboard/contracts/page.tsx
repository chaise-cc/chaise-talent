import React from "react";
import TopNavigation from "../../_components/top-navigation";
import Link from "next/link";
import { Add } from "iconsax-react";

export default function ContractsPage() {
  return (
    <div>
      <TopNavigation
        pageTitle="Direct Contracts"
        pageCrumbs={[
          { text: "Home", link: "/dashboard/" },
          { text: "Contracts", link: "/dashboard/contracts" },
        ]}
        action={
          <Link
            className="flex bg-main-color-500 items-center gap-1.5 text-gray-900 px-5 py-3 rounded-full font-bold"
            href="/dashboard/contracts/new"
          >
            <Add size={22} color="black" />

            <span className="leading-none">Create Contract</span>
          </Link>
        }
      />
      ContractsPage
    </div>
  );
}
