import React from "react";
import TopNavigation from "../../_components/talent/top-navigation";

export default function SettingsPage() {
  return (
    <div>
      <TopNavigation
        pageTitle="Settings"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "Settings", link: "/settings" },
        ]}
      />
      SettingsPage
    </div>
  );
}
