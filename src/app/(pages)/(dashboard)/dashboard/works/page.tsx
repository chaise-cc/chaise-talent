import React from "react";
import TopNavigation from "../../_components/top-navigation";

export default function WorksPage() {
  return (
    <div>
      <TopNavigation
        pageTitle="Find Works"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "Find Works", link: "/works" },
        ]}
      />
      WorksPage
    </div>
  );
}
