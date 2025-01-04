"use client";

import { useState } from "react";
import servicesCategories from "@/data/services-categories";
import ServiceCategoryCard from "../_components/ServiceCategoryCard";

const ExploreCategoriesSection = () => {
  const categoriesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(servicesCategories.length / categoriesPerPage);

  //   const handleNext = () => {
  //     setCurrentPage((prev) => (prev + 1) % totalPages);
  //   };

  //   const handlePrev = () => {
  //     setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  //   };

  const handleDotClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const currentCategories = servicesCategories.slice(
    currentPage * categoriesPerPage,
    (currentPage + 1) * categoriesPerPage
  );

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
          {currentCategories.map(
            ({ name, cover_image: imgSrc, slug, rating, skillsNo }, index) => (
              <ServiceCategoryCard
                key={index}
                name={name}
                imgsrc={imgSrc}
                rating={rating}
                skillsNo={skillsNo}
                slug={slug}
              />
            )
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentPage ? "bg-main-color-500" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCategoriesSection;
