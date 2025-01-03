import React from "react";
import TopNavigation from "../../../_components/top-navigation";
import CreateServiceScreen from "../../../_components/CreateServiceScreen";

export default function CreateService() {
  return (
    <div>
      <TopNavigation pageTitle="Create service" />

      <CreateServiceScreen />
    </div>
  );
}
