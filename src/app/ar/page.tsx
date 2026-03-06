import HeroSectionAR from "@/components/ar/HeroSectionAR";
import SetupOptionsAR from "@/components/ar/SetupOptionsAR";
import WhyChooseUsAR from "@/components/ar/WhyChooseUsAR";
import LiabilityFocusAR from "@/components/ar/LiabilityFocusAR";
import TeamSectionAR from "@/components/ar/TeamSectionAR";
import PricingFAQAR from "@/components/ar/PricingFAQAR";
import IntelligenceSectionAR from "@/components/ar/IntelligenceSectionAR";
import FreeZoneActivitiesAR from "@/components/ar/FreeZoneActivitiesAR";
import TestimonialsSectionAR from "@/components/ar/TestimonialsSectionAR";
import FooterAR from "@/components/ar/FooterAR";
import StickyNavAR from "@/components/ar/StickyNavAR";

export default function ArabicHomePage() {
    return (
        <main className="min-h-screen bg-white" dir="rtl">
            {/* Sticky Navigation */}
            <StickyNavAR />

            {/* Hero Section with Lead Form */}
            <section id="contact">
                <HeroSectionAR />
            </section>

            {/* Activity Finder */}
            <FreeZoneActivitiesAR />

            {/* Interactive Setup Intelligence (Quiz & Calculator) */}
            <section id="intelligence">
                <IntelligenceSectionAR />
            </section>

            {/* License Options Comparison */}
            <section id="options">
                <SetupOptionsAR />
            </section>

            {/* Value Propositions */}
            <section id="why-us">
                <WhyChooseUsAR />
            </section>

            {/* Deep Dive: Liability & LLC */}
            <LiabilityFocusAR />

            {/* Company Heritage & Team */}
            <section id="team">
                <TeamSectionAR />
            </section>

            {/* Commercial Packages & FAQ */}
            <section id="pricing">
                <PricingFAQAR />
            </section>

            {/* Testimonials */}
            <TestimonialsSectionAR />

            <FooterAR />
        </main>
    );
}
