import { getAllTalents } from "@/utils/pb/getAllTalents";
import MainLayout from "./_components/mainLayout";
import HeroSection from "./_sections/HomeSection";
import TopRatedTalentsSection from "./_sections/TopRatedTalents";

export default async function Home() {
  const talents = await getAllTalents();

  return (
    <MainLayout>
      <HeroSection />
      <TopRatedTalentsSection talents={talents} />
    </MainLayout>
  );
}
