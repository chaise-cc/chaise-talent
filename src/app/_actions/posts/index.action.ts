"use server";

import pb from "@/lib/pocketbase";

export default async function getAllPosts() {
  try {
    const allPosts = await pb.collection("posts").getFullList();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedPosts = allPosts.map((post: any) => ({
      id: post.id,
      imageSrc: post.imageSrc || "",
      coverImage: post.coverImage || "",
      tags: post.tags || [],
      date: post.date || "",
      title: post.title || "",
      description: post.description || "",
    }));

    return formattedPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Unable to fetch posts.");
  }
}
