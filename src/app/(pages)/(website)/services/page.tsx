import React from "react";
import MainLayout from "../_components/mainLayout";
import getAllServiceCategories from "@/utils/pb/services/getAllServiceCategories";
import ServiceCategoryCard from "../_components/ServiceCategoryCard";
import CTASection from "../_sections/CTASection";

export default async function ServicesPage() {
  const allServiceCategories = await getAllServiceCategories();

  return (
    <MainLayout>
      <section className="text-center py-4 md:py-8 md:mt-4 !pb-24">
        <div className="container">
          <h2 className="md:text-4xl text-2xl md:mb-2 varela-round-regular">
            Explore All Categories
          </h2>
          <p className="mb-8">
            The best of works?&nbsp;
            <span className="text-main-color-500">Find here</span>
          </p>

          {/* Categories Carousel */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 md:gap-8">
            {allServiceCategories.map((category) => (
              <ServiceCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </MainLayout>
  );
}
