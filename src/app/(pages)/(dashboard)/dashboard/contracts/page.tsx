import React from "react";
import TopNavigation from "../../_components/top-navigation";
import Link from "next/link";
import { DocumentFavorite } from "iconsax-react";

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
            className="flex bg-main-color-500 items-center gap-2.5 text-gray-900 pr-3 pl-5 py-2.5 rounded-full font-bold"
            href="/dashboard/contracts/new"
          >
            <DocumentFavorite size={18} color="black" />
            <span className="leading-none">New Contract</span>
          </Link>
        }
      />
      ContractsPage
    </div>
  );
}
