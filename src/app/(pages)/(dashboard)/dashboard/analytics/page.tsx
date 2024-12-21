import React from "react";
import TopNavigation from "../../_components/top-navigation";

export default function AnalyticsPage() {
  return (
    <div>
      <TopNavigation
        pageTitle="Analytics"
        pageCrumbs={[
          { text: "Home", link: "/dashboard/" },
          { text: "Analytics", link: "/dashboard/analytics" },
        ]}
      />
      AnalyticsPage
    </div>
  );
}
