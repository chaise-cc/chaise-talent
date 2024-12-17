import React from "react";
import TopNavigation from "../../_components/top-navigation";

export default function MessagesPage() {
  return (
    <div>
      <TopNavigation
        pageTitle="Messages"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "Messages", link: "/messages" },
        ]}
      />
      MessagesPage
    </div>
  );
}
