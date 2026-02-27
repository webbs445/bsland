'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, ArrowRight } from 'lucide-react';

const scrollToForm = () => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });

export default function PricingFAQ() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const packages = [
        {
            name: "Starter",
            price: "12,000",
            description: "Free Zone license for solopreneurs and freelancers starting lean.",
            features: ["Free Zone License", "1 Visa allocation", "Virtual office", "Full document handling", "Emirates ID assistance", "PRO services"],
            isMostPopular: false
        },
        {
            name: "Business",
            price: "25,000",
            description: "Mainland LLC with full market access and liability protection.",
            features: ["Mainland LLC License", "2 Visa allocations", "Ejari / office", "Bank account assistance", "Dedicated consultant", "PRO services"],
            isMostPopular: true
        },
        {
            name: "Premium",
            price: "40,000+",
            description: "DMCC, DIFC, or premium Free Zone with maximum flexibility.",
            features: ["Premium Free Zone", "5+ Visa allocations", "Dedicated office", "Priority processing", "Premium bank intro", "Account manager"],
            isMostPopular: false
        }
    ];

    const faqs = [
        { q: "Can foreigners own 100% of a company?", a: "Yes, 100% foreign ownership is available for both Free Zone and Mainland LLC structures in most activities." },
        { q: "How much does it really cost?", a: "Our packages start from AED 12,000 all-inclusive, but exact costs depend on your specific business activity and visa requirements." },
        { q: "Mainland vs Free Zone — which is right?", a: "Mainland offers full UAE market access, while Free Zones provide 100% tax benefits and specialized trade environments." },
        { q: "Why choose an LLC?", a: "An LLC provides the highest level of personal asset protection and unlimited market access within the UAE." },
        { q: "Does Best Solution issue the license?", a: "We are authorized partners who process the application. The government entity (DED or Free Zone Authority) issues the final license." },
        { q: "Is visa included?", a: "Yes, our quoted packages typically include your initial residence visa allocation and processing." },
        { q: "How long does it take?", a: "With our fast-track channel partnership, licenses can be delivered in as little as 2 working days." }
    ];

    return (
        <section className="py-24 px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-copper mb-4">Packages & FAQ</div>
                    <h2 className="font-header font-black text-brand-navy tracking-tighter uppercase mb-6"
                        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, lineHeight: 1.05 }}>
                        CLEAR PRICING. HONEST ANSWERS. <br /><span style={{ background: 'linear-gradient(135deg, #C28667, #d4957a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>NO SURPRISES.</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-brand-navy/60 font-medium">
                        Every package includes visa processing. Every question answered without jargon.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    {packages.map((pkg, idx) => (
                        <div key={idx} className={`relative p-10 rounded-[32px] border-2 transition-all duration-500 hover:shadow-2xl ${pkg.isMostPopular ? 'border-brand-copper bg-brand-navy text-white' : 'border-brand-navy/5 bg-white text-brand-navy'}`}>
                            {pkg.isMostPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-copper text-brand-navy text-[9px] font-black uppercase tracking-widest px-6 py-1.5 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-header font-black mb-2 tracking-tight uppercase">{pkg.name}</h3>
                                <p className={`text-xs font-medium leading-relaxed ${pkg.isMostPopular ? 'text-white/40' : 'text-brand-navy/40'}`}>
                                    {pkg.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Starting from</div>
                                <div className="text-4xl font-header font-black tracking-tight">AED {pkg.price}</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest mt-1 text-brand-copper">All-in / No Hidden Fees</div>
                            </div>

                            <div className="space-y-4 mb-10">
                                {pkg.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-3">
                                        <Check className={`w-4 h-4 flex-shrink-0 ${pkg.isMostPopular ? 'text-brand-copper' : 'text-brand-navy'}`} />
                                        <span className={`text-xs font-bold uppercase tracking-wide ${pkg.isMostPopular ? 'text-white/70' : 'text-brand-navy/70'}`}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button onClick={scrollToForm} className={`btn-primary w-full ${!pkg.isMostPopular ? 'btn-dark' : ''}`}>
                                {pkg.isMostPopular ? 'Get Quote →' : 'Get Started →'}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-header font-black text-brand-navy tracking-tight uppercase">Common Concerns</h3>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border-b border-brand-navy/5">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                    className="w-full py-6 flex items-center justify-between text-left group"
                                >
                                    <span className="text-sm font-black uppercase tracking-widest text-brand-navy group-hover:text-brand-copper transition-colors">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-brand-copper transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-8 text-sm text-brand-navy/50 font-medium leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-32 text-center bg-brand-navy text-white p-16 rounded-[48px] relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(var(--color-brand-copper) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-header font-black tracking-tighter uppercase mb-6 relative z-10">
                        Your business in Dubai starts <br /> with <span className="text-brand-copper italic">one conversation.</span>
                    </h3>
                    <p className="text-white/60 font-medium mb-10 max-w-xl mx-auto relative z-10">
                        Talk to a setup expert today — free, no commitment. We'll recommend the right structure, give you exact costs, and handle everything from there.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                        <button onClick={scrollToForm} className="btn-primary">
                            Get My Free Consultation <ArrowRight className="w-4 h-4" />
                        </button>
                        <div className="text-lg font-header font-black tracking-tight border-b-2 border-brand-copper pb-1">Call +971 522 330 011</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
