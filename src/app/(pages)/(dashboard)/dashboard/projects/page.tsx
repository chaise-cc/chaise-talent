import React from "react";
import TopNavigation from "../../_components/talent/top-navigation";

export default function ProjectsPage() {
  return (
    <div>
      <TopNavigation
        pageTitle="Projects"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "Projects", link: "/projects" },
        ]}
      />
      ProjectsPage
    </div>
  );
}
