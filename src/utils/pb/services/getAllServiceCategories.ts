import pb from "@/lib/pocketbase";

export default async function getAllServiceCategories() {
  try {
    const allServiceCategories = await pb
      .collection("specializations")
      .getFullList();

    // Map PocketBase's RecordModel to Service type
    return allServiceCategories.map((category) => ({
      id: category.id,
      name: category.name,
      illustration: category.illustration,
      description: category.description,
    }));
  } catch (error) {
    console.error("Error fetching allServiceCategories:", error);
    return [];
  }
}
