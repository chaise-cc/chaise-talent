import React from "react";
import TopNavigation from "../../_components/talent/top-navigation";

export default function HelpPage() {
  return (
    <div>
      <TopNavigation
        pageTitle="Help"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "Help", link: "/help" },
        ]}
      />
      HelpPage
    </div>
  );
}
