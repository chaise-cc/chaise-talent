import Avatar from "@/components/icons/Avatar.icon";
import { getTalentByUsername } from "@/utils/pb/getTalentByUsername";
import { Location } from "iconsax-react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function TalentProflePage({
  params,
}: {
  params: { username: string };
}) {
  const processTalentId = (talentId: string) =>
    decodeURIComponent(talentId).replace(/^@/, ""); // Automatically remove @ if present

  const p = await params;

  if (!decodeURIComponent(p.username).startsWith("@")) return redirect("/");
  const talentId = processTalentId(p.username);

  if (!talentId) {
    return notFound(); // Show 404 if user not found
  }

  const cleanTalentId = (id: string) =>
    id.startsWith("@")
      ? id.slice(1).toLocaleLowerCase()
      : id.toLocaleLowerCase();

  const username = cleanTalentId(talentId);

  const user = await getTalentByUsername(username);

  if (!user) return redirect("/404");

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

// Mocked database function
