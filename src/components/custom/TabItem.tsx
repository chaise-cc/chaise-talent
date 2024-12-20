"use client";

import React from "react";
import TransitionLink from "./TransitionLink";

interface TabItemProps {
  slug: string;
  name: string;
  activeTab: string;
  handleTabClick?: (slug: string) => void;
}

const TabItem: React.FC<TabItemProps> = ({ slug, name, activeTab }) => {
  return (
    <TransitionLink
      href={`/dashboard/settings?tab=${slug}`}
      key={slug}
      className={`pb-1.5 border-b-2 shrink-0 font-medium text-gray-700 cursor-pointer ${
        activeTab === slug
          ? "border-main-color-500 text-main-color-500"
          : "border-transparent"
      }`}
    >
      {name}
    </TransitionLink>
  );
};

export default TabItem;
