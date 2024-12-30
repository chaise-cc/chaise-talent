import Avatar from "@/components/icons/Avatar.icon";
import { getTalentByUsername } from "@/utils/pb/getTalentByUsername";
// import { getServiceById } from "@/utils/pb/getServiceById"; // Utility to fetch service details
import { Location } from "iconsax-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import MainLayout from "../../../_components/mainLayout";

export default async function ServiceProfilePage(props: {
  params: Promise<{ username: string; serviceId: string }>;
}) {
  const { username, serviceId } = await props.params;

  // Fetch user and service details in parallel
  const [user, service] = await Promise.all([
    getTalentByUsername(username),
    getServiceById(serviceId),
  ]);

  if (!user || !service || service.talentId !== user.id) {
    return notFound(); // Show 404 if user or service not found, or service doesn't belong to user
  }

  return (
    <MainLayout>
      <section className="container flex flex-col gap-4">
        <Image
          height={400}
          width={1200}
          alt="Talent Profile Page bg"
          src={"/images/talent-profile-bg.png"}
          className="h-52 w-full object-cover rounded-xl"
        />

        <div className="flex w-full gap-8">
          {/* Talent Info */}
          <div className="w-full max-w-xs border rounded-xl gap-4 shadow-sm p-4 flex flex-col justify-center items-center">
            <Avatar size="extra-large" src={user.avatar} />

            <div className="flex flex-col justify-center items-center gap-1">
              <h2 className="text-lg font-semibold capitalize">
                {user.firstname} {user.lastname}
              </h2>

              <div className="capitalize flex items-center gap-2 font-medium">
                <Location size={16} color="black" /> {user.country}
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="flex flex-col w-full p-4 border rounded-xl shadow-sm gap-4">
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
