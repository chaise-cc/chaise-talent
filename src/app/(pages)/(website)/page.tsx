import { getAllTalents } from "@/utils/pb/getAllTalents";
import MainLayout from "./_components/mainLayout";
import HeroSection from "./_sections/HomeSection";
import TopRatedTalentsSection from "./_sections/TopRatedTalents";
import { Talent } from "@/types";
import ExclusiveBenefitsSection from "./_sections/ExclusiveBenefitsSection";
import CTASection from "./_sections/CTASection";
import ExploreBlogSection from "./_sections/ExploreBlogSection";

export default async function Home() {
  const talents: Talent[] = await getAllTalents();

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <HeroSection />
        <TopRatedTalentsSection talents={talents} />
        <ExclusiveBenefitsSection />
        <ExploreBlogSection />
        <CTASection />
      </div>
    </MainLayout>
  );
}
