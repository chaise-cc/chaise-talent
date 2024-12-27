import Avatar from "@/components/icons/Avatar.icon";
import { getTalentByUsername } from "@/utils/pb/getTalentByUsername";
import { Location } from "iconsax-react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function TalentProfilePage(props: {
  params: Promise<{ username: string }>;
}) {
  // Await the params since it's a Promise
  const { username: encodedUsername } = await props.params;

  const processTalentId = (talentId: string) =>
    decodeURIComponent(talentId).replace(/^@/, ""); // Automatically remove @ if present

  if (!decodeURIComponent(encodedUsername).startsWith("@")) {
    return redirect("/"); // Redirect to homepage if username does not start with "@"
  }

  const talentId = processTalentId(encodedUsername);

  if (!talentId) {
    return notFound(); // Show 404 if user not found
  }

  const cleanTalentId = (id: string) =>
    id.startsWith("@") ? id.slice(1).toLowerCase() : id.toLowerCase();

  const username = cleanTalentId(talentId);

  const user = await getTalentByUsername(username);

  if (!user) {
    return notFound(); // Show 404 if talent is not found
  }

  return (
    <main className="py-2">
      <section className="container flex flex-col gap-4">
        <Image
          height={400}
          width={1200}
          alt="Talent Profile Page bg"
          src={"/images/talent-profile-bg.png"}
          className="h-52 w-full object-cover rounded-xl"
        />

        <div className="flex w-full gap-8">
          <div className="w-full max-w-xs border rounded-xl gap-4 shadow-sm p-4 flex flex-col justify-center items-center">
            <Avatar size="extra-large" src={user.avatar} />

            <div className="flex flex-col justify-center items-center gap-1">
              <h2 className="text-lg font-semibold">
                {user.firstname} {user.lastname}
              </h2>

              <div className="capitalize flex items-center gap-2 font-medium">
                <Location size={16} color="black" /> {user.country}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
