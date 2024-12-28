import { getAllTalents } from "@/utils/pb/getAllTalents";
import MainLayout from "./_components/mainLayout";
import HeroSection from "./_sections/HomeSection";
import TopRatedTalentsSection from "./_sections/TopRatedTalents";
import { Talent } from "@/types";
import ExclusiveBenefitsSection from "./_sections/ExclusiveBenefitsSection";
import CTASection from "./_sections/CTASection";

export default async function Home() {
  const talents: Talent[] = await getAllTalents();

  return (
    <MainLayout>
      <HeroSection />
      <ExclusiveBenefitsSection />
      <TopRatedTalentsSection talents={talents} />
      <CTASection />
    </MainLayout>
  );
}
