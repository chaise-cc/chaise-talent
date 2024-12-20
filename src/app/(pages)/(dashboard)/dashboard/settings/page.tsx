"use client";

import React from "react";
import TopNavigation from "../../_components/top-navigation";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import TabsContainer from "@/components/custom/TabsContainer";
import TabItem from "@/components/custom/TabItem";

const tabs = [
  { name: "Profile", slug: "profile", component: "<ProfileSettingsScreen />" },
  {
    name: "Withdrawal Methods",
    slug: "withdrawals",
    component: "<WithdrawalMethodsScreen />",
  },
  { name: "Contact Info", slug: "contact", component: "<ContactSettings />" },
  {
    name: "Security & Password",
    slug: "security",
    component: "<SecuritySettings />",
  },
  {
    name: "Notifications",
    slug: "notifications",
    component: "<NotificationSettings />",
  },
];

const SettingsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>(tabs[0].slug);

  const handleTabClick = (slug: string) => {
    setActiveTab(slug);
    router.push(`/dashboard/settings?tab=${slug}`);
  };

  useEffect(() => {
    if (!tab) {
      router.replace(`/dashboard/settings?tab=${tabs[0].slug}`);
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
        pageTitle="Settings"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "Settings", link: "/settings" },
        ]}
      />

      {/* Tabs */}

      <TabsContainer>
        {tabs.map((t) => (
          <TabItem
            route="settings"
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

export default SettingsPage;
