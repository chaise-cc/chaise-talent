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
          className="h-96 w-full bg-cover rounded-xl bg-center bg-blend-overlay p-4 md:px-6"
        >
          <h2 className="text-gray-700 font-bold text-xl">
            {serviceCategoryData?.name}
          </h2>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-center text-2xl md:text-3xl font-medium">
          Explore Subcategories
        </h2>
      </section>
    </MainLayout>
  );
}
