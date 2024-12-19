import React from "react";
import TopNavigation from "../../_components/talent/top-navigation";

export default function MyProfilePage() {
  return (
    <div>
      <TopNavigation
        pageTitle="My Profile"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "My Profile", link: "/profile" },
        ]}
      />
      MyProfilePage
    </div>
  );
}
