import React from "react";
import MainLayout from "../../_components/mainLayout";
import servicesCategories from "@/data/services-categories";

export default async function ServiceCatgegory(props: {
  params: Promise<{ serviceCategory: string }>;
}) {
  const { serviceCategory } = await props.params;

  const serviceCategoryData = servicesCategories.find(
    (category) => category.slug === serviceCategory
  );

  console.log(serviceCategory, serviceCategoryData);

  return (
    <MainLayout>
      <section className="container">
        <div>ServiceCatgegory</div>
      </section>
    </MainLayout>
  );
}
