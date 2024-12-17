import React from "react";
import TopNavigation from "../../_components/top-navigation";

export default function NotificationsPage() {
  return (
    <div>
      <TopNavigation
        pageTitle="Notifications"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "Notifications", link: "/notifiations" },
        ]}
      />
      NotificationsPage
    </div>
  );
}
