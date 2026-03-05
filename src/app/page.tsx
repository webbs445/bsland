import HeroSection from "@/components/HeroSection";
import SetupOptions from "@/components/SetupOptions";
import WhyChooseUs from "@/components/WhyChooseUs";
import LiabilityFocus from "@/components/LiabilityFocus";
import TeamSection from "@/components/TeamSection";
import PricingFAQ from "@/components/PricingFAQ";
import IntelligenceSection from "@/components/IntelligenceSection";
import FreeZoneActivities from "@/components/FreeZoneActivities";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import StickyNav from "@/components/StickyNav";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">


      {/* Sticky Navigation */}
      <StickyNav />

      {/* Hero Section with Lead Form */}
      <section id="contact">
        <HeroSection />
      </section>

      {/* Activity Finder */}
      <FreeZoneActivities />
      {/* Interactive Setup Intelligence (Quiz & Calculator) */}
      <section id="intelligence">
        <IntelligenceSection />
      </section>


      {/* License Options Comparison */}
      <section id="options">
        <SetupOptions />
      </section>

      {/* Value Propositions */}
      <section id="why-us">
        <WhyChooseUs />
      </section>

      {/* Deep Dive: Liability & LLC */}
      <LiabilityFocus />

      {/* Company Heritage & Team */}
      <section id="team">
        <TeamSection />
      </section>

      {/* Commercial Packages & FAQ */}
      <section id="pricing">
        <PricingFAQ />
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      <Footer />
    </main>
  );
}
