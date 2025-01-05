import Avatar from "@/components/icons/Avatar.icon";
import { getTalentByUsername } from "@/utils/pb/getTalentByUsername";
import { Location } from "iconsax-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import MainLayout from "../../_components/mainLayout";
import getAllTalentServices from "@/utils/pb/getAllTalentServices";

// Define types for better type safety
type User = {
  avatar: string;
  firstname: string;
  lastname: string;
  country: string;
};

type Service = {
  id: string;
  title: string;
  description: string;
};

export default async function TalentProfilePage(props: {
  params: Promise<{ username: string; serviceId: string }>;
}) {
  const { username } = await props.params;

  // Fetch user and services concurrently
  const [user, services] = await Promise.all([
    getTalentByUsername(username).catch(() => null),
    getAllTalentServices(username).catch(() => []),
  ]);

  // Handle user not found
  if (!user) {
    return notFound();
  }

  return (
    <MainLayout>
      <section className="container flex flex-col gap-4">
        {/* Background Image */}
        <Image
          height={400}
          width={1200}
          alt="Talent Profile Page Background"
          src="/images/talent-profile-bg.png"
          className="h-52 w-full object-cover rounded-xl"
        />

        <div className="flex w-full gap-8 flex-col md:flex-row pb-24">
          {/* Profile Card */}
          <ProfileCard user={user} />

          <div className="flex flex-col gap-4">
            <div className="">
              <h2 className="text-lg font-medium">Overview</h2>

              <div
                className="flex flex-col gap-2"
                dangerouslySetInnerHTML={{ __html: user.bio }}
              />
            </div>
            {/* Top skills */}

            <div className="">
              <h2 className="text-lg font-medium">Top Skills</h2>

              <p>No skills listed yet</p>
            </div>
            {/* Services Section */}
            <ServicesList services={services} />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

// Profile Card Component
function ProfileCard({ user }: { user: User }) {
  return (
    <div className="w-full md:max-w-xs h-max border rounded-xl shadow-sm p-4 flex flex-col items-center gap-4">
      <Avatar size="extra-large" src={user.avatar} />
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-lg font-semibold capitalize">
          {user.firstname} {user.lastname}
        </h2>
        <div className="capitalize flex items-center gap-2 font-medium">
          <Location size={16} color="black" />
          {user.country}
        </div>
      </div>
    </div>
  );
}

// Services List Component
function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="flex-1">
      <h2 className="text-lg font-medium">Services</h2>
      {services.length > 0 ? (
        <div>
          {services.map((service) => (
            <div key={service.id} className="mb-4">
              <h3 className="font-medium">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No services listed yet.</p>
      )}
    </div>
  );
}
