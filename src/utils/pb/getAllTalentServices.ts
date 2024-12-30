"use server";

import pb from "@/lib/pocketbase";

type Service = {
  id: string;
  title: string;
  description: string;
};

export default async function getAllTalentServices(
  talentId: string
): Promise<Service[]> {
  if (!talentId) {
    throw new Error("Talent ID is required");
  }

  try {
    const services = await pb.collection("services").getFullList({
      filter: `talentId = '${talentId}'`,
      $autoCancel: false,
    });

    // Map PocketBase's RecordModel to Service type
    return services.map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description,
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}
