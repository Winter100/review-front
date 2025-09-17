import HeroSection from "@/components/hero-section";
import ReviewCategories from "@/components/review/review-categories";
import ReviewFeatures from "@/components/review/review-features";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      <ReviewCategories />
      <ReviewFeatures />
    </div>
  );
}
