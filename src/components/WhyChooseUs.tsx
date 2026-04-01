'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, LayoutGrid, BadgeCheck, Search, ArrowRight, Phone, CheckCircle2, X, Building2, Globe, FileText, CreditCard, Calculator, IdCard } from 'lucide-react';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';
import { getUTMParams } from '@/hooks/useUTMParams';

export default function WhyChooseUs() {
    const features = [
        {
            icon: BadgeCheck,
            title: "Authorized Government Channel Partner",
            description: "We walk into DED and Free Zone offices to submit on your behalf — because they've authorized us to. No middlemen. No delays. Direct partnership."
        },
        {
            icon: LayoutGrid,
            title: "You'll Never Step Inside a Government Office",
            description: "We prepare, review, and submit every document. From trade name to final license — you never stand in a queue or chase a clerk."
        },
        {
            icon: ShieldCheck,
            title: "Your Personal Assets Stay Legally Protected",
            description: "We guide you to the structure that ring-fences your personal wealth from business risk. LLC, FZE, or Professional — protection always comes first."
        },
        {
            icon: Zap,
            title: "Licensed in 2 Days, Not Weeks",
            description: "Our channel partnership means priority processing. While others wait, your application moves through dedicated fast-track channels."
        },
        {
            icon: Search,
            title: "The Price We Quote Is the Price You Pay",
            description: "Every dirham explained upfront. Government fees, service charges, visa costs — all transparent before you commit. Zero hidden fees. Guaranteed."
        }
    ];

    const services = [
        { id: 'mainland', label: 'Mainland Setup', icon: Building2 },
        { id: 'freezone', label: 'Free Zone Setup', icon: Globe },
        { id: 'golden-visa', label: 'Golden Visa', icon: IdCard },
        { id: 'pro', label: 'PRO Services', icon: FileText },
        { id: 'banking', label: 'Corporate Banking', icon: CreditCard },
        { id: 'tax', label: 'Tax & Accounting', icon: Calculator },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<'services' | 'form'>('services');
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', whatsapp: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => { setMounted(true); }, []);

    const openModal = () => {
        setStep('services');
        setSelectedService(null);
        setFormData({ firstName: '', lastName: '', email: '', whatsapp: '' });
        setSubmitted(false);
        setSubmitError(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const utmParams = getUTMParams();
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            let countryName = 'United Arab Emirates';
            if (formData.whatsapp) {
                try {
                    const parsed = parsePhoneNumber(formData.whatsapp);
                    if (parsed && parsed.country) {
                        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                        countryName = regionNames.of(parsed.country) || parsed.country;
                    }
                } catch (e) { console.error(e); }
            }
            const result = await submitLeadAction({
                first_name: formData.firstName,
                last_name: formData.lastName,
                custom_service_enquired: "Business Setup",
                custom_client_profile_and_requirement: `[Why Choose Us] Service: ${selectedService || 'General'} | CTA: Start Your Business Today`,
                email_id: formData.email,
                mobile_no: formData.whatsapp,
                country: countryName,
                ...utmParams,
            });
            if (result.success) {
                setSubmitted(true);
            } else {
                setSubmitError(result.error || "Submission failed. Please check your details and try again.");
            }
        } catch (error) {
            console.error(error);
            setSubmitError("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 px-8 bg-brand-navy text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sm font-bold uppercase tracking-[0.2em] text-[#c28867]"
                        >
                            Why Best Solution®
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 text-4xl md:text-5xl font-bold text-white uppercase"
                        >
                            We Don't Just Advise , We Act On Your Behalf
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 mb-12 text-lg text-white/70 max-w-lg"
                        >
                            Every concern you have about setting up in Dubai? We've already solved it — 2,500 times.
                        </motion.p>

                        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
                            <div className="absolute inset-0 bg-brand-copper/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                            <Image
                                src="/team.webp"
                                alt="Best Solution Management Team"
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-copper/20 blur-3xl rounded-full z-0"></div>
                            <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full z-20 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Dubai Headquarters</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-8 group"
                            >
                                <div className="flex-shrink-0 w-14 h-14 bg-brand-copper/10 border border-brand-copper/20 rounded-2xl flex items-center justify-center group-hover:bg-brand-copper transition-all duration-500">
                                    <feature.icon className="w-7 h-7 text-brand-copper group-hover:text-brand-navy transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-header font-black text-white mb-3 tracking-tight group-hover:text-brand-copper transition-colors uppercase">{feature.title}</h3>
                                    <p className="text-sm text-white/50 font-medium leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        {/* CTA Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="pt-3 border-t border-[#c28667] mt-10"
                        >
                            <p className="text-sm text-white/40 uppercase tracking-widest font-bold mb-6">
                                Ready to get started?
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={openModal}
                                    className="group inline-flex items-center justify-center gap-3 bg-brand-copper hover:bg-brand-copper/90 text-white font-black uppercase tracking-widest text-sm px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(194,136,103,0.3)]"
                                >
                                    Start Business Today
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                                <a
                                    href="tel:+971522330011"
                                    className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-2xl transition-all duration-300"
                                >
                                    <Phone className="w-4 h-4 text-brand-copper" />
                                    Speak to an Advisor
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#070E1A]/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
                                style={{ borderTop: '4px solid #C28667' }}
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 text-brand-navy/40 hover:text-brand-navy hover:bg-slate-100 rounded-full transition-colors z-10"
                                >
                                    <X size={20} />
                                </button>

                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
                                            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl" style={{ background: '#C28667', boxShadow: '0 20px 40px rgba(194,134,103,0.4)' }}>
                                                <CheckCircle2 className="w-10 h-10 text-white" />
                                            </div>
                                            <h4 className="text-2xl font-black text-brand-navy mb-2 uppercase tracking-tight">Success!</h4>
                                            <p className="text-brand-navy/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                                Your request is received.<br />An expert will contact you shortly.
                                            </p>
                                            <button onClick={() => setIsModalOpen(false)} className="mt-8 text-sm font-bold tracking-widest uppercase hover:underline" style={{ color: '#C28667' }}>Close Window</button>
                                        </motion.div>
                                    ) : step === 'services' ? (
                                        <motion.div key="services" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <div className="mb-8">
                                                <h3 className="text-2xl font-black text-brand-navy uppercase tracking-tight mb-2">What can we help you with?</h3>
                                                <p className="text-brand-navy/50 text-sm font-medium">Select a service to get a tailored quote from our experts.</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {services.map((svc) => (
                                                    <button
                                                        key={svc.id}
                                                        onClick={() => { setSelectedService(svc.label); setStep('form'); }}
                                                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:border-brand-copper hover:bg-brand-copper/5 group ${selectedService === svc.label ? 'border-brand-copper bg-brand-copper/5' : 'border-slate-100 bg-slate-50'}`}
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                                                            <svc.icon className="w-5 h-5 text-brand-copper" />
                                                        </div>
                                                        <span className="text-xs font-black uppercase tracking-wide text-brand-navy leading-tight">{svc.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => { setSelectedService('General Inquiry'); setStep('form'); }}
                                                className="mt-4 w-full text-center text-xs font-bold text-brand-navy/40 hover:text-brand-navy uppercase tracking-widest transition-colors"
                                            >
                                                Not sure? Just connect me with an expert →
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                            <div className="flex items-center gap-3 mb-8">
                                                <button onClick={() => setStep('services')} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-brand-navy/40 hover:text-brand-navy">
                                                    <ArrowRight className="w-4 h-4 rotate-180" />
                                                </button>
                                                <div>
                                                    <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">{selectedService}</h3>
                                                    <p className="text-brand-navy/50 text-xs font-medium">Fill in your details and we'll be in touch.</p>
                                                </div>
                                            </div>
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                {submitError && (
                                                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-medium border border-red-100 text-center">{submitError}</div>
                                                )}
                                                <div className="flex gap-3">
                                                    <input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium" />
                                                    <input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium" />
                                                </div>
                                                <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium" />
                                                <div className="space-y-1.5 pb-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">WhatsApp Number</label>
                                                    <PhoneInput
                                                        international defaultCountry="AE"
                                                        value={formData.whatsapp}
                                                        onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                        className="phone-input-custom text-brand-navy w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-brand-copper focus-within:ring-1 focus-within:ring-brand-copper transition-all text-sm font-medium"
                                                        placeholder="WhatsApp Number"
                                                    />
                                                </div>
                                                <button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2" style={{ background: '#C28667', color: '#fff', boxShadow: '0 10px 30px rgba(194,134,103,0.3)', opacity: isSubmitting ? 0.7 : 1 }}>
                                                    {isSubmitting ? 'Processing...' : <>Start Your Business <ArrowRight size={16} /></>}
                                                </button>
                                                <p className="text-center text-[10px] text-brand-navy/40 font-bold uppercase tracking-widest mt-4">100% Secure • Fast Response</p>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}
