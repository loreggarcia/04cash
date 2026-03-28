import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { BenchmarkSection } from "@/components/landing/benchmark-section";
import { JourneySection } from "@/components/landing/journey-section";
import { SmartSplitSection } from "@/components/landing/smart-split-section";
import { DashboardPreviewSection } from "@/components/landing/dashboard-preview-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { EcosystemSection } from "@/components/landing/ecosystem-section";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <BenchmarkSection />
      <JourneySection />
      <SmartSplitSection />
      <DashboardPreviewSection />
      <TestimonialsSection />
      <EcosystemSection />
      <Footer />
    </main>
  );
}
