import pb from "@/lib/pocketbase";
import ProfileUpdatePageClient from "../../_components/ProfileUpdateClient";
import getUserAndRole from "@/utils/getUserAndRole";
import { redirect } from "next/navigation";

export default async function ProfileUpdatePage() {
  const { user } = await getUserAndRole();

  if (!user) redirect("/login");

  const userData = await pb.collection("users").getOne(user.id);

  return <ProfileUpdatePageClient user={userData} />;
}
