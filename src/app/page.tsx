import HeroSection from "@/components/HeroSection";
import PartnerGrid from "@/components/PartnerGrid";
import SetupOptions from "@/components/SetupOptions";
import WhyChooseUs from "@/components/WhyChooseUs";
import LiabilityFocus from "@/components/LiabilityFocus";
import TeamSection from "@/components/TeamSection";
import PricingFAQ from "@/components/PricingFAQ";
import IntelligenceSection from "@/components/IntelligenceSection";
import FreeZoneActivities from "@/components/FreeZoneActivities";
import TestimonialsSection from "@/components/TestimonialsSection";
import FloatingCTA from "@/components/FloatingCTA";
import StickyNav from "@/components/StickyNav";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Floating WhatsApp + CTA */}
      <FloatingCTA />

      {/* Sticky Navigation */}
      <StickyNav />

      {/* Hero Section with Lead Form */}
      <section id="contact">
        <HeroSection />
      </section>

      {/* Partner Grid */}
      <PartnerGrid />
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

      {/* Footer */}
      <footer className="bg-brand-navy text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-white/10">

            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <img src="/logo.webp" alt="Best Solution" className="h-10 w-auto brightness-0 invert" />
              </div>
              <p className="text-white/40 text-xs font-medium leading-relaxed mb-6">
                Authorized DED & Free Zone Channel Partner. 22+ years helping entrepreneurs set up in Dubai.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/971522330011?text=${encodeURIComponent("Hi! I'd like to set up a business in Dubai.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  title="WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:border-brand-copper hover:scale-110 transition-all"
                  title="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white/60">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:border-brand-copper hover:scale-110 transition-all"
                  title="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/60">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-copper mb-6">Services</div>
              <ul className="space-y-3">
                {['Mainland LLC Setup', 'Free Zone Company', 'Offshore Formation', 'PRO Services', 'Golden Visa', 'Bank Account Opening'].map(s => (
                  <li key={s}>
                    <a href="#hero-form" className="text-white/40 hover:text-brand-copper text-xs font-medium transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Free Zones */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-copper mb-6">Free Zone Partners</div>
              <ul className="space-y-3">
                {['DMCC', 'IFZA', 'SHAMS', 'JAFZA', 'RAK ICC', 'Dubai South'].map(z => (
                  <li key={z}>
                    <a href="#intelligence" className="text-white/40 hover:text-brand-copper text-xs font-medium transition-colors">{z}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-copper mb-6">Contact Us</div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-brand-copper mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white/40 text-xs font-medium leading-relaxed">Office 1401, Tower B, Business Bay, Dubai, UAE</span>
                </li>
                <li>
                  <a href="tel:+97145531546" className="flex items-center gap-3 text-white/40 hover:text-brand-copper text-xs font-medium transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-brand-copper flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                    </svg>
                    +971 4 553 1546
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/971522330011?text=${encodeURIComponent("Hi! I'd like to set up a business in Dubai.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/40 hover:text-[#25D366] text-xs font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366] flex-shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    +971 52 233 0011
                  </a>
                </li>
                <li>
                  <a href="mailto:info@best-solution.ae" className="flex items-center gap-3 text-white/40 hover:text-brand-copper text-xs font-medium transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-brand-copper flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@best-solution.ae
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[9px] uppercase font-black tracking-[0.5em] text-white/20">
              © 2025 Best Solution® — All Rights Reserved
            </div>
            <div className="flex space-x-6 text-[9px] font-bold uppercase tracking-widest text-white/30">
              <a href="#" className="hover:text-brand-copper transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-copper transition-colors">Terms of Service</a>
            </div>
            <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/10 text-center">
              Authorized Government Channel Partner — DED & All Major Free Zones
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
