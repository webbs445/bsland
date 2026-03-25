import Navbar from '@/components/spc_components/Navbar'
import HeroSection from '@/components/spc_components/HeroSection'
// import StatsStrip from '@/components/StatsStrip'
import BenefitsSection from '@/components/spc_components/BenefitsSection'
import IncludedSection from '@/components/spc_components/IncludedSection'
import WhyUsSection from '@/components/spc_components/WhyUsSection'
import StepsSection from '@/components/spc_components/StepsSection'
// import PartnersTicker from '@/components/spc_components/PartnersTicker'
import CTASection from '@/components/spc_components/CTASection'
import Footer from '@/components/spc_components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* <StatsStrip /> */}
        <BenefitsSection />
        <IncludedSection />
        <StepsSection />
        <WhyUsSection />
        {/* <PartnersTicker /> */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
