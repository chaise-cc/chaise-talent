import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "iconsax-react";
import { BlogCardProps } from "@/types";

// Reusable BlogCard component
const BlogCard = ({ blog, fullWidth }: BlogCardProps) => {
  return (
    <div
      className={`flex flex-col shrink-0 w-full ${
        !fullWidth && "max-w-[280px]"
      } sm:max-w-[380px] gap-2 md:gap-3 p-2`}
    >
      <div className="card-header flex flex-col gap-2">
        <Image
          height={220}
          width={400}
          alt={blog.title}
          src={blog.coverImage}
          className="object-cover h-48 md:h-52 w-full rounded-xl mb-2"
        />
        <div className="flex justify-between items-center text-xs">
          <p className="tag uppercase font-[500] text-main-color-500 leading-none">
            {blog.tags[0]}
          </p>
          <p className="date leading-none">{blog.date}</p>
        </div>
      </div>
      <h2 className="md:text-lg text-base font-sans leading-6 font-semibold line-clamp-2">
        {blog.title}
      </h2>
      <p className="line-clamp-3 text-sm md:text-base">{blog.description}</p>
      <Link
        href={`/blog/${blog.id}`}
        className="flex gap-1 w-max items-center text-main-color-500 font-[500]"
      >
        Read more <ArrowRight size={24} color="orange" />
      </Link>
    </div>
  );
};

export default BlogCard;
