import MainLayout from "@/app/(pages)/(website)/_components/mainLayout";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import pb from "@/lib/pocketbase";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function BlogPostPage(props: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await props.params;

  const post = await pb.collection("posts").getOne(postId);

  if (!post) return redirect("/blog");

  console.log(post);

  return (
    <MainLayout>
      <section className="container py-4 md:py-8">
        <ScrollArea className="w-full text-center flex mb-4 justify-center items-center">
          <div className="flex gap-4 mx-auto w-max pb-2">
            <Link href={"/blog/1"} className=" shrink-0">
              All
            </Link>
            <Link href={"/blog/1"} className="text-main-color-500 shrink-0">
              Freelancer Tips
            </Link>
            <Link href={"/blog/1"} className=" shrink-0">
              AI & Machine Learning
            </Link>
            <Link href={"/blog/1"} className=" shrink-0">
              Tech Tools & Resources
            </Link>
            <Link href={"/blog/1"} className=" shrink-0">
              Innovation
            </Link>
          </div>

          <ScrollBar orientation="horizontal" className="-mb-1" />
        </ScrollArea>
        <div className="blogpost-header text-center flex flex-col gap-8">
          <h2 className="text-2xl font-varela md:text-4xl">{post.title}</h2>
          <Image
            src={post.coverImage}
            height={500}
            width={1200}
            className="w-full max-w-[990px] h-72 md:h-[400px] mx-auto object-cover rounded-xl"
            alt="Blog image"
          />
        </div>
      </section>

      <section
        className="container prose py-4 md:py-8 w-full !max-w-6xl first-letter:text-3xl first-letter:font-bold mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></section>
    </MainLayout>
  );
}
