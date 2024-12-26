import pb from "@/lib/pocketbase";

export async function getUserById(userId: string) {
  return pb.collection("users").getOne(userId);
}
