import Image from "next/image";
import React from "react";
import BlogCard from "../_components/BlogCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import getAllPosts from "@/app/_actions/posts/index.action";

export default async function ExploreBlogSection() {
  const allPosts = await getAllPosts();
  console.log(allPosts);

  return (
    <section className="container pb-12">
      <h1 className="mb-4 md:mb-12 text-center text-2xl md:text-4xl font-varela">
        Explore our latest articles for
        <span className="relative text-main-color-500">
          &nbsp; you
          <div className="block absolute left-0 md:w-20 w-12 h-2">
            <Image
              src="/images/vector-underline.png"
              alt=""
              fill
              className="w-full h-auto object-contain"
            />
          </div>
        </span>
      </h1>

      <ScrollArea className="w-full pb-3">
        <div className="flex md:gap-4 w-full">
          {allPosts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} fullWidth={true} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="-mb-1.5 " />
      </ScrollArea>
    </section>
  );
}
