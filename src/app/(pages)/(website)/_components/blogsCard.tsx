import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import BlogCard from "./BlogCard";
import getAllPosts from "@/app/_actions/posts/index.action";

export default async function BlogsCard() {
  const allPosts = (await getAllPosts()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <ScrollArea className="w-full pb-3">
      <div className="flex md:gap-4 w-full">
        {allPosts.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="-mb-1.5 " />
    </ScrollArea>
  );
}
