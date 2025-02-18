"use client";

import React from "react";
import TopNavigation from "../../_components/top-navigation";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import TabsContainer from "@/components/custom/TabsContainer";
import TabItem from "@/components/custom/TabItem";
import Link from "next/link";
import { Add } from "iconsax-react";

const tabs = [
  {
    name: "Approved (0)",
    slug: "approved",
    component: "No Approved Services Yet",
  },
  {
    name: "In Review (0)",
    slug: "review",
    component: "No service in review",
  },
  { name: "Rejected (0)", slug: "rejected", component: "No rejected service" },
  {
    name: "Drafts (0)",
    slug: "Draft",
    component: "'No draft'",
  },
];

const ServicesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>(tabs[0].slug);

  const handleTabClick = (slug: string) => {
    setActiveTab(slug);
    router.push(`/dashboard/services?tab=${slug}`);
  };

  useEffect(() => {
    if (!tab) {
      router.replace(`/dashboard/services?tab=${tabs[0].slug}`);
    }

    setActiveTab(tab as string);
  }, [tab, router, tabs]);

  const renderTabContent = () => {
    const currentTab = tabs.find((t) => t.slug === tab);
    return currentTab ? currentTab.component : null;
  };

  return (
    <div>
      <TopNavigation
        pageTitle="Services"
        action={
          <Link
            className="flex bg-main-color-500 items-center gap-1.5 text-gray-900 text-sm pr-3 pl-5 py-2 rounded-full font-bold"
            href="/dashboard/services/new"
          >
            <span className="leading-none">Create service</span>
            <Add size={20} color="black" />{" "}
          </Link>
        }
      />

      {/* Tabs */}

      <TabsContainer>
        {tabs.map((t) => (
          <TabItem
            route="services"
            key={t.slug}
            slug={t.slug}
            name={t.name}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
        ))}
      </TabsContainer>

      {/* Render the content based on the query parameter */}
      <div className="mt-4 md:my-8">{renderTabContent()}</div>
    </div>
  );
};

export default ServicesPage;
