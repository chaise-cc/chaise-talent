import React from "react";
import MainLayout from "../../_components/mainLayout";
import getAllServiceCategories from "@/utils/pb/services/getAllServiceCategories";

export default async function ServiceCatgegory(props: {
  params: Promise<{ serviceCategory: string }>;
}) {
  const serviceCategories = await getAllServiceCategories();
  const { serviceCategory } = await props.params;

  const serviceCategoryData = serviceCategories.find(
    (category) => category.id === serviceCategory
  );

  console.log(serviceCategory, serviceCategoryData);

  return (
    <MainLayout>
      <section className="container ">
        <div
          style={{
            backgroundImage: `url(${serviceCategoryData?.illustration})`,
          }}
          className="h-52 w-full bg-cover bg-center bg-blend-overlay p-4 grid place-items-center rounded-xl"
        ></div>
      </section>
    </MainLayout>
  );
}
