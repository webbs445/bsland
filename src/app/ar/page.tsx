import { Suspense } from 'react';
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
import BridgeCTAAR from "@/components/ar/BridgeCTAAR";
import GeometricSeparatorAR from "@/components/ar/GeometricSeparatorAR";

export default function ArabicHomePage() {
    return (
        <main className="min-h-screen bg-white" dir="rtl">
            {/* Sticky Navigation */}
            <StickyNavAR />

            <Suspense fallback={<div className="min-h-screen bg-brand-navy" />}>
                {/* Hero Section with Lead Form */}
                <section id="contact">
                    <HeroSectionAR />
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

                {/* Bridge CTA */}
                <BridgeCTAAR />

                {/* Activity Finder */}
                <section id="activity-finder">
                    <FreeZoneActivitiesAR />
                </section>

                {/* Geometric Pattern Separator */}
                <GeometricSeparatorAR />

                {/* Interactive Setup Intelligence (Quiz & Calculator) */}
                {/* <section id="intelligence">
                    <IntelligenceSectionAR />
                </section> */}

                {/* Company Heritage & Team */}
                {/* <section id="team">
                    <TeamSectionAR />
                </section> */}

                {/* Commercial Packages & FAQ */}
                <section id="pricing">
                    <PricingFAQAR />
                </section>

                {/* Testimonials */}
                <TestimonialsSectionAR />

                <FooterAR />
            </Suspense>
        </main>
    );
}
