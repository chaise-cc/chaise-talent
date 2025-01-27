import Image from "next/image";
import React from "react";

import BlogsCard from "../_components/blogsCard";

export default async function ExploreBlogSection() {
  return (
    <section className="container pb-12">
      <h1 className="mb-4 md:mb-12 text-center text-3xl md:text-4xl font-varela">
        Explore latest articles for
        <span className="relative text-main-color-500">
          &nbsp; you
          <div className="block absolute left-2 md:w-20 w-16 h-2">
            <Image
              src="/images/vector-underline.png"
              alt=""
              fill
              className="w-full h-auto object-contain"
            />
          </div>
        </span>
      </h1>

      <BlogsCard />
    </section>
  );
}
