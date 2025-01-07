import React from "react";
import TopNavigation from "../../../_components/top-navigation";
import CreateServiceScreen from "../../../_components/CreateServiceScreen";
import getAllServiceCategories from "@/utils/pb/services/getAllServiceCategories";

export default async function CreateService() {
  const serviceCategories = await getAllServiceCategories();

  return (
    <div>
      <TopNavigation pageTitle="Create service" />

      <CreateServiceScreen servicesCategories={serviceCategories} />
    </div>
  );
}
