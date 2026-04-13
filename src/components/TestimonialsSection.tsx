'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Quote, Star, Users, Building2, Briefcase, Award, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

export default function TeamSection() {
    const team = [
        { name: "Essa Al Harthi", role: "Founder & CEO", initials: "EA", image: "/team/essa.webp" },
        { name: "Abdul Munim", role: "Partner", initials: "AM", image: "/team/6.webp" },
        { name: "Vipin Kumar", role: "General Manager", initials: "VK", image: "/team/Vipin.webp" },
        { name: "Abdulla Al Harthi", role: "Business Development Head", initials: "AH", image: "/team/8.webp" },
    ];

    const teamWithImages = useMemo(() => team.filter(m => m.image), []);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % teamWithImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [teamWithImages.length]);

    const stats = [
        { label: "Years Expertise", value: "23+", icon: Award },
        { label: "Businesses Set", value: "5K+", icon: Building2 },
        { label: "Team Experts", value: "50+", icon: Users },
        { label: "Service Partners", value: "10+", icon: Briefcase }
    ];

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
                custom_client_profile_and_requirement: `[Team Section] Selected Path: Speak to an Expert`,
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

    return (
        <section className="py-24 px-6 bg-[#070E1A] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-16 items-center">

                    {/* LEFT COLUMN: Visuals & Stats */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Featured Carousel */}
                        <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-white/5 border border-white/10 group shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={teamWithImages[activeIdx].image}
                                    src={teamWithImages[activeIdx].image}
                                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-[#070E1A]/20 to-transparent opacity-80" />

                            {/* Dynamic Tag */}
                            <div className="absolute bottom-10 left-10 right-10">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIdx}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#CC8667] mb-2 block">
                                            {teamWithImages[activeIdx].role}
                                        </span>
                                        <h3 className="text-3xl font-black uppercase tracking-tight leading-none text-white">
                                            {teamWithImages[activeIdx].name}
                                        </h3>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-sm"
                                >
                                    <stat.icon className="w-5 h-5 text-white/40 mb-3" />
                                    <div className="text-2xl font-black text-[#CC8667] leading-none mb-1">{stat.value}</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Content */}
                    <div className="lg:col-span-7">
                        <div className="mb-12">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-sm font-bold uppercase tracking-[0.3em] text-[#CC8667] block mb-4"
                            >
                                Leadership & Legacy
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-white uppercase leading-[0.9] mb-6"
                            >
                                Real People.<br />
                                <span className="text-transparent border-t-white border-b-white py-2" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Real Results.</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-white/60 max-w-xl leading-relaxed"
                            >
                                Best Solution® is powered by 50+ specialized professionals. We don't just process paperwork; we navigate the intricate legal and bureaucratic landscape of the UAE so you don't have to.
                            </motion.p>
                        </div>

                        {/* Founder Quote */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative p-10 bg-gradient-to-br from-[#111827] to-[#070E1A] rounded-[2rem] mb-12 border border-white/10 shadow-xl"
                        >
                            <Quote className="absolute top-6 right-10 w-12 h-12 text-[#CC8667] opacity-10" />
                            <p className="text-base italic text-white/80 leading-relaxed mb-8 relative z-10">
                                "Our founder, Mr. Essa Al Harthi, started as a PRO officer in 2000. He witnessed the struggles entrepreneurs faced with bureaucracy and founded Best Solution® to be the bridge to their success."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img src="/team/essa.webp" alt="Essa Al Harthi" width={48} height={48} className="rounded-full border-2 border-[#CC8667]" />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#CC8667] rounded-full flex items-center justify-center">
                                        <Star className="w-2 h-2 text-[#070E1A] fill-current" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-black uppercase tracking-widest text-white">Essa Al Harthi</div>
                                    <div className="text-[10px] text-[#CC8667] font-bold uppercase tracking-tight">Founder & CEO</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Trust Signals & Locations */}
                        <div className="grid sm:grid-cols-2 gap-10 pt-10 border-t border-white/10">
                            {/* Google Reviews */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-lg">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 text-[#fbbc04] mb-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                                    </div>
                                    <div className="text-[11px] font-black uppercase tracking-[0.1em] text-white">4.8/5 Average Rating</div>
                                    <div className="text-[10px] font-bold text-white/30 uppercase mt-0.5">200+ Verified Reviews</div>
                                </div>
                            </div>

                            {/* Locations */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-[#CC8667] mt-1" />
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white mb-0.5">Dubai HQ</div>
                                        <a
                                            href="https://maps.app.goo.gl/FAEU9zgK2FCiwmtLA"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] text-white/40 uppercase tracking-tight leading-tight hover:text-white transition-colors cursor-pointer"
                                        >
                                            906 Capital Golden Tower, Business Bay
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team CTA Block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-r from-brand-copper/10 to-transparent border border-brand-copper/20 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                    {/* User Avatars stacked */}
                    <div className="flex -space-x-4 mb-6 relative z-10">
                        {['/clients/Abzter-_-Haris-Maheen.webp',
                            '/clients/chandra-mohan_Prism-Advertising.webp',
                            '/clients/Michael-Doherty.webp',
                            '/clients/Hameed.webp',
                            '/clients/Carlos-Freyre.webp',
                            '/clients/Nassem-Bonne-apart.webp',].map((img, i) => (
                                <img key={i} src={img} alt="Client" className="w-12 h-12 rounded-full border-2 border-[#070E1A] object-cover" />
                            ))}
                        <div className="w-12 h-12 rounded-full border-2 border-[#070E1A] bg-[#2E548A] flex items-center justify-center text-xs font-bold text-white z-10">
                            +5,000
                        </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-header font-black tracking-tight text-white uppercase mb-3 relative z-10">
                        Join <span className="text-brand-copper">5,000+</span> Business Leaders
                    </h3>
                    <p className="text-white/60 font-medium mb-8 max-w-lg relative z-10">
                        Our experts have built the UAE's most successful ventures. Stop wasting time on paperwork and let the professionals handle your setup.
                    </p>

                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setIsModalOpen(true);
                        }}
                        className="btn-primary"
                    >
                        Speak to an Expert Today <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </motion.div>

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
                                className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                                style={{ borderTop: `4px solid #CC8667` }}
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 text-[#070E1A]/40 hover:text-[#070E1A] hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                {submitted ? (
                                    <div className="text-center py-10">
                                        <div
                                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                                            style={{ background: '#CC8667', boxShadow: `0 20px 40px rgba(204, 134, 103, 0.4)` }}
                                        >
                                            <CheckCircle2 className="w-10 h-10 text-white" />
                                        </div>
                                        <h4 className="text-2xl font-black text-[#070E1A] mb-2 uppercase tracking-tight">Success!</h4>
                                        <p className="text-[#070E1A]/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                            Your request has been received.<br />One of our experts will contact you soon.
                                        </p>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="mt-8 text-sm font-bold tracking-widest uppercase hover:underline"
                                            style={{ color: '#CC8667' }}
                                        >
                                            Close Window
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-black text-[#070E1A] uppercase tracking-tight mb-2">
                                                Speak to an Expert
                                            </h3>
                                            <p className="text-[#070E1A]/50 text-sm font-medium">
                                                Enter your details below and our specialists will reach out to schedule your free consultation.
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
                                                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#070E1A] placeholder:text-[#070E1A]/40 rounded-xl outline-none focus:border-[#CC8667] focus:ring-1 focus:ring-[#CC8667] transition-all text-sm font-medium"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#070E1A] placeholder:text-[#070E1A]/40 rounded-xl outline-none focus:border-[#CC8667] focus:ring-1 focus:ring-[#CC8667] transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#070E1A] placeholder:text-[#070E1A]/40 rounded-xl outline-none focus:border-[#CC8667] focus:ring-1 focus:ring-[#CC8667] transition-all text-sm font-medium"
                                            />
                                            <div className="space-y-1.5 pb-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#070E1A]/40 ml-1">
                                                    WhatsApp Number
                                                </label>
                                                <PhoneInput
                                                    international
                                                    defaultCountry="AE"
                                                    value={formData.whatsapp}
                                                    onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                    className="phone-input-custom text-[#070E1A] w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#CC8667] focus-within:ring-1 focus-within:ring-[#CC8667] transition-all text-sm font-medium"
                                                    placeholder="WhatsApp Number"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                                                style={{
                                                    background: '#CC8667',
                                                    color: '#fff',
                                                    boxShadow: `0 10px 30px rgba(204, 134, 103, 0.3)`,
                                                    opacity: isSubmitting ? 0.7 : 1
                                                }}
                                            >
                                                {isSubmitting ? 'Processing...' : (
                                                    <>Get Expert Advice <ArrowRight size={16} /></>
                                                )}
                                            </button>
                                            <p className="text-center text-[10px] text-[#070E1A]/40 font-bold uppercase tracking-widest mt-4">
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
