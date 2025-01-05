"use client";

import { ArrowRight } from "lucide-react";
import ServiceCategoryCard from "../_components/ServiceCategoryCard";
import Link from "next/link";

type ExploreCategoriesSectionProps = {
  allCategories: {
    name: string;
    illustration: string;
    id: string;
    description: string;
  }[];
};

export default function ExploreCategoriesSection({
  allCategories,
}: ExploreCategoriesSectionProps) {
  const currentCategories = allCategories.slice(0, 6);

  return (
    <section className="text-center py-4 md:py-8 md:mt-4">
      <div className="container">
        <h2 className="md:text-4xl text-2xl md:mb-2 varela-round-regular">
          Explore Categories
        </h2>
        <p className="mb-8">
          The best of works?&nbsp;
          <span className="text-main-color-500">Find here</span>
        </p>

        {/* Categories Carousel */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 md:gap-8">
          {currentCategories.map((category) => (
            <ServiceCategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <Link
            href={"/services"}
            className="font-medium flex items-center gap-2 text-base text-main-color-500 underline"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
