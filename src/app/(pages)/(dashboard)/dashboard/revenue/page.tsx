import React from "react";
import TopNavigation from "../../_components/top-navigation";

export default function RevenuePage() {
  return (
    <div>
      <TopNavigation
        pageTitle="My Earnings"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "Revenue", link: "/revenue" },
        ]}
      />
      RevenuePage
    </div>
  );
}
