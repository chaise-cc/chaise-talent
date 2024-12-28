import MainLayout from "./_components/mainLayout";
import HeroSection from "./_sections/HomeSection";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <section className="py-8 container">
        {/* <h2>Chaise - Africa&apos;s Leading Freelance Space</h2> */}
      </section>
    </MainLayout>
  );
}
