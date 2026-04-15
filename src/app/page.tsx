import { Suspense } from 'react';
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
import GeometricSeparator from "@/components/GeometricSeparator";
import BridgeCTA from "@/components/BridgeCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <StickyNav />

      <Suspense fallback={<div className="min-h-screen bg-brand-navy" />}>
        {/* Hero Section with Lead Form */}
        <section id="contact">
          <HeroSection />
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

        {/* Bridge CTA */}
        <BridgeCTA />

        {/* Activity Finder */}
        <section id="activity-finder">
         <FreeZoneActivities />
      </section> 
        {/* Geometric Pattern Separator */}
        <GeometricSeparator />


        {/* Company Heritage & Team */}
        {/* <section id="team">
          <TeamSection />
        </section> */}

        {/* Commercial Packages & FAQ */}
        <section id="pricing">
          <PricingFAQ />
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        <Footer />
      </Suspense>
    </main>
  );
}
