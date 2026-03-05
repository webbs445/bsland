'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

export default function PricingFAQ() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        whatsapp: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let countryName = 'United Arab Emirates';
            if (formData.whatsapp) {
                try {
                    const parsed = parsePhoneNumber(formData.whatsapp);
                    if (parsed && parsed.country) {
                        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                        countryName = regionNames.of(parsed.country) || parsed.country;
                    }
                } catch (e) {
                    console.error("Could not parse phone country code", e);
                }
            }

            await submitLeadAction({
                first_name: formData.firstName,
                last_name: formData.lastName,
                custom_service_enquired: "Business Setup",
                custom_client_profile_and_requirement: `[FAQ Section] General Inquiry`,
                email_id: formData.email,
                mobile_no: formData.whatsapp,
                country: countryName
            });
            setSubmitted(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sm font-bold uppercase tracking-[0.2em] text-[#c28867]"
                        >
                            FAQ
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 uppercase"
                        >
                            Honest Answers. No Surprises.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
                        >
                            Every question answered without jargon.
                        </motion.p>
                    </div>

                    <div className="text-center mb-12 hidden">
                        <h3 className="text-2xl font-header font-black text-brand-navy tracking-tight uppercase">Common Concerns</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border-b border-brand-navy/5">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                    className="w-full py-6 flex items-center justify-between text-left group"
                                >
                                    <span className="text-sm font-black uppercase tracking-widest text-brand-navy group-hover:text-brand-copper transition-colors pr-4">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-brand-copper transition-transform duration-300 flex-shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
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

                <div className="mt-32 relative rounded-[3rem] p-10 md:p-20 text-center bg-brand-navy">
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-header font-black tracking-tight uppercase mb-6 leading-tight max-w-4xl text-white"
                        >
                            Your business in Dubai starts with{' '}
                            <span className="text-brand-copper">one conversation.</span>
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-white/60 text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            Talk to a setup expert today — free, no commitment. We'll recommend the right structure, give you exact costs, and handle everything from there.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <button
                                onClick={() => { setSubmitted(false); setIsModalOpen(true); }}
                                className="px-8 py-4 rounded-full bg-brand-copper text-white text-sm font-black uppercase tracking-[0.15em] hover:opacity-90 transition-opacity flex items-center gap-2"
                            >
                                Start Now <ArrowRight className="w-4 h-4" strokeWidth={3} />
                            </button>

                            <div className="hidden sm:block w-px h-10 bg-white/10" />

                            <a href="tel:+971522330011" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-brand-copper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Call Experts</p>
                                    <p className="text-base font-black text-white group-hover:text-brand-copper transition-colors">+971 522 330 011</p>
                                </div>
                            </a>
                        </motion.div>
                    </div>
                </div>            </div>

            {/* Popup Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                                style={{ borderTop: `4px solid #C28667` }}
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 text-brand-navy/40 hover:text-brand-navy hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                {submitted ? (
                                    <div className="text-center py-10">
                                        <div
                                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                                            style={{ background: '#C28667', boxShadow: `0 20px 40px rgba(194, 134, 103, 0.4)` }}
                                        >
                                            <CheckCircle2 className="w-10 h-10 text-white" />
                                        </div>
                                        <h4 className="text-2xl font-black text-brand-navy mb-2 uppercase tracking-tight">Success!</h4>
                                        <p className="text-brand-navy/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                            Your inquiry relies on us.<br />Our setup expert will contact you shortly.
                                        </p>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="mt-8 text-sm font-bold tracking-widest uppercase hover:underline"
                                            style={{ color: '#C28667' }}
                                        >
                                            Close Window
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-black text-brand-navy tracking-tight mb-2 uppercase">
                                                Start Your Setup Now
                                            </h3>
                                            <p className="text-brand-navy/50 text-sm font-medium">
                                                Enter your details below to proceed. We'll outline exact costs and the next steps.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium"
                                            />
                                            <div className="space-y-1.5 pb-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">
                                                    WhatsApp Number
                                                </label>
                                                <PhoneInput
                                                    international
                                                    defaultCountry="AE"
                                                    value={formData.whatsapp}
                                                    onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                    className="phone-input-custom text-brand-navy w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-brand-copper focus-within:ring-1 focus-within:ring-brand-copper transition-all text-sm font-medium"
                                                    placeholder="WhatsApp Number"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                                                style={{
                                                    background: '#C28667',
                                                    color: '#fff',
                                                    boxShadow: `0 10px 30px rgba(194, 134, 103, 0.3)`,
                                                    opacity: isSubmitting ? 0.7 : 1
                                                }}
                                            >
                                                {isSubmitting ? 'Processing...' : (
                                                    <>Speak to an Expert <ArrowRight size={16} /></>
                                                )}
                                            </button>
                                            <p className="text-center text-[10px] text-brand-navy/40 font-bold uppercase tracking-widest mt-4">
                                                100% Secure • Fast Response
                                            </p>
                                        </form>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}
