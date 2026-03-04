"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Building2,
    Globe,
    Briefcase,
    CheckCircle2,
    Clock,
    Users,
    TrendingUp,
    Shield,
    Zap,
    Star,
    MapPin,
    ChevronRight,
    X
} from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

const options = [
    {
        id: 1,
        key: 'mainland',
        title: 'Mainland LLC',
        subtitle: 'Full UAE market access',
        description:
            'Sell to any UAE client, bid on government tenders, and open physical retail. Your assets stay legally separate from the company.',
        price: '20,000',
        priceNote: 'Starting cost / year',
        badge: 'Most Popular',
        icon: Building2,
        accentColor: '#14253E',
        features: [
            { icon: MapPin, text: 'Operate anywhere in UAE' },
            { icon: Users, text: 'Government contracts eligible' },
            { icon: Shield, text: 'Personal liability protection' },
            { icon: TrendingUp, text: 'Unlimited business activities' },
        ],
        timeline: '7–14 business days',
        visas: 'Unlimited',
        ownership: '100% (since 2021)',
        bestFor: 'Retail, F&B, trading, local services',
    },
    {
        id: 2,
        key: 'freezone',
        title: 'Free Zone Company',
        subtitle: '100% foreign ownership',
        description:
            '0% personal & corporate tax, full profit repatriation. Perfect for e-commerce, consulting, startups, and export-focused businesses.',
        price: '7,900',
        priceNote: 'Starting at SHAMS / IFZA',
        badge: 'Best Value',
        icon: Globe,
        accentColor: '#CC8667',
        features: [
            { icon: Zap, text: 'Setup in as little as 48 hrs' },
            { icon: Shield, text: '0% corporate & personal tax' },
            { icon: TrendingUp, text: 'Full profit repatriation' },
            { icon: Globe, text: '3,000+ permitted activities' },
        ],
        timeline: '2–5 business days',
        visas: '1–6 per license',
        ownership: '100% foreign',
        bestFor: 'E-commerce, SaaS, consulting, export',
    },
    {
        id: 3,
        key: 'professional',
        title: 'Professional License',
        subtitle: 'For freelancers & specialists',
        description:
            'Ideal for independent consultants, IT specialists, and service providers. Simpler structure, lowest cost, no local partner required.',
        price: '12,500',
        priceNote: 'All-inclusive package',
        badge: null,
        icon: Briefcase,
        accentColor: '#4A90D9',
        features: [
            { icon: Star, text: 'Lowest cost to start' },
            { icon: Clock, text: 'Fastest processing' },
            { icon: Briefcase, text: 'Professional & service activities' },
            { icon: Shield, text: 'No local partner required' },
        ],
        timeline: '3–7 business days',
        visas: '1–3 per license',
        ownership: '100% ownership',
        bestFor: 'Consultants, freelancers, IT services',
    },
];

export default function SetupOptions() {
    const [hovered, setHovered] = useState(options[1]);
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
                custom_client_profile: `[Setup Options] Selected Path: ${hovered.title}`,
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
        <section className="relative py-28 px-6 bg-gradient-to-b from-white to-[#f7f8fa] overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(204,134,103,0.08),transparent_40%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold uppercase tracking-[0.2em] text-[#c28867]"
                    >
                        Your Setup Options
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-4xl md:text-5xl font-bold text-gray-900"
                    >
                        Three Paths to Business in Dubai
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Every business is different. Explore your options and choose the structure that fits your ambition.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

                    {/* LEFT */}
                    <div className="lg:col-span-2 flex flex-row lg:flex-col gap-4 lg:gap-5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x lg:snap-none">
                        {options.map((opt) => {
                            const Icon = opt.icon;
                            const isActive = hovered.id === opt.id;

                            return (
                                <motion.div
                                    key={opt.id}
                                    onHoverStart={() => setHovered(opt)}
                                    onClick={() => setHovered(opt)}
                                    whileHover={{ y: -3 }}
                                    animate={{ scale: isActive ? 1.02 : 1 }}
                                    transition={{ type: 'spring', stiffness: 250 }}
                                    className="relative rounded-3xl p-7 cursor-pointer transition-all duration-300 snap-start"
                                    style={{
                                        minWidth: '280px',
                                        background: isActive ? `${opt.accentColor}10` : 'white',
                                        border: `1.5px solid ${isActive ? opt.accentColor + '40' : 'rgba(20,37,62,0.06)'}`,
                                        boxShadow: isActive
                                            ? `0 20px 60px ${opt.accentColor}20`
                                            : '0 4px 18px rgba(0,0,0,0.04)',
                                    }}
                                >
                                    {opt.badge && (
                                        <div
                                            className="absolute -top-3 right-5 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                                            style={{ background: opt.accentColor }}
                                        >
                                            {opt.badge}
                                        </div>
                                    )}

                                    <div className="flex items-start gap-5">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                            style={{
                                                background: `${opt.accentColor}15`,
                                            }}
                                        >
                                            <Icon size={22} style={{ color: opt.accentColor }} />
                                        </div>

                                        <div className="flex-1">
                                            <h3
                                                className="font-bold text-lg mb-1"
                                                style={{ color: opt.accentColor }}
                                            >
                                                {opt.title}
                                            </h3>

                                            <p className="text-xs text-[#14253E]/50 font-semibold uppercase tracking-wider mb-3">
                                                {opt.subtitle}
                                            </p>

                                            <div className="text-xl font-black text-[#14253E]">
                                                AED {opt.price}
                                            </div>
                                            <div className="text-[10px] text-[#14253E]/40 font-bold uppercase tracking-widest">
                                                {opt.priceNote}
                                            </div>
                                        </div>

                                        <ChevronRight
                                            size={18}
                                            style={{ color: opt.accentColor }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="lg:col-span-3 lg:sticky lg:top-28">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={hovered.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-3xl bg-white border border-[#14253E]/10 shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden"
                            >
                                <div className="p-10">

                                    <h3
                                        className="text-3xl font-black mb-4"
                                        style={{ color: hovered.accentColor }}
                                    >
                                        {hovered.title}
                                    </h3>

                                    <p className="text-[#14253E]/60 leading-relaxed mb-8">
                                        {hovered.description}
                                    </p>

                                    {/* FEATURES */}
                                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                        {hovered.features.map(({ icon: FIcon, text }) => (
                                            <div
                                                key={text}
                                                className="flex items-center gap-3 p-4 rounded-2xl"
                                                style={{
                                                    background: `${hovered.accentColor}08`,
                                                }}
                                            >
                                                <FIcon size={16} style={{ color: hovered.accentColor }} />
                                                <span className="text-sm font-semibold text-[#14253E]">
                                                    {text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-3 gap-6 text-center mb-10">
                                        <div>
                                            <div className="text-xs uppercase text-[#14253E]/40 mb-1">
                                                Timeline
                                            </div>
                                            <div className="font-bold text-[#14253E]">
                                                {hovered.timeline}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase text-[#14253E]/40 mb-1">
                                                Visas
                                            </div>
                                            <div className="font-bold text-[#14253E]">
                                                {hovered.visas}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase text-[#14253E]/40 mb-1">
                                                Ownership
                                            </div>
                                            <div className="font-bold text-[#14253E]">
                                                {hovered.ownership}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSubmitted(false);
                                            setIsModalOpen(true);
                                        }}
                                        className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                                        style={{
                                            background: hovered.accentColor,
                                            color: '#fff',
                                            boxShadow: `0 15px 40px ${hovered.accentColor}40`,
                                        }}
                                    >
                                        Get Started with {hovered.title} <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
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
                            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#14253E]/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                                style={{ borderTop: `4px solid ${hovered.accentColor}` }}
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 text-[#14253E]/40 hover:text-[#14253E] hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                {submitted ? (
                                    <div className="text-center py-10">
                                        <div
                                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                                            style={{ background: hovered.accentColor, boxShadow: `0 20px 40px ${hovered.accentColor}40` }}
                                        >
                                            <CheckCircle2 className="w-10 h-10 text-white" />
                                        </div>
                                        <h4 className="text-2xl font-black text-[#14253E] mb-2 uppercase tracking-tight">Success!</h4>
                                        <p className="text-[#14253E]/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                            Your {hovered.title} setup guide is on its way.<br />A specialist will contact you shortly.
                                        </p>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="mt-8 text-sm font-bold tracking-widest uppercase hover:underline"
                                            style={{ color: hovered.accentColor }}
                                        >
                                            Close Window
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-black text-[#14253E] uppercase tracking-tight mb-2">
                                                Start Your {hovered.title}
                                            </h3>
                                            <p className="text-[#14253E]/50 text-sm font-medium">
                                                Enter your details below and we'll send you the full breakdown and exact pricing.
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
                                                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#14253E] placeholder:text-[#14253E]/40 rounded-xl outline-none focus:border-[#CC8667] focus:ring-1 focus:ring-[#CC8667] transition-all text-sm font-medium"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#14253E] placeholder:text-[#14253E]/40 rounded-xl outline-none focus:border-[#CC8667] focus:ring-1 focus:ring-[#CC8667] transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#14253E] placeholder:text-[#14253E]/40 rounded-xl outline-none focus:border-[#CC8667] focus:ring-1 focus:ring-[#CC8667] transition-all text-sm font-medium"
                                            />
                                            <div className="space-y-1.5 pb-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#14253E]/40 ml-1">
                                                    WhatsApp Number
                                                </label>
                                                <PhoneInput
                                                    international
                                                    defaultCountry="AE"
                                                    value={formData.whatsapp}
                                                    onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                    className="phone-input-custom text-[#14253E] w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#CC8667] focus-within:ring-1 focus-within:ring-[#CC8667] transition-all text-sm font-medium"
                                                    placeholder="WhatsApp Number"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                                                style={{
                                                    background: hovered.accentColor,
                                                    color: '#fff',
                                                    boxShadow: `0 10px 30px ${hovered.accentColor}30`,
                                                    opacity: isSubmitting ? 0.7 : 1
                                                }}
                                            >
                                                {isSubmitting ? 'Processing...' : (
                                                    <>Get Setup Guide <ArrowRight size={16} /></>
                                                )}
                                            </button>
                                            <p className="text-center text-[10px] text-[#14253E]/40 font-bold uppercase tracking-widest mt-4">
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