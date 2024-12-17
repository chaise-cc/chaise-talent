import React from "react";
import TopNavigation from "../../_components/top-navigation";

export default function AnalyticsPage() {
  return (
    <div>
      <TopNavigation
        pageTitle="Analytics"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "Analytics", link: "/analytics" },
        ]}
      />
      AnalyticsPage
    </div>
  );
}
