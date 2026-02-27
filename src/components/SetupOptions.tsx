'use client';

import { useState } from 'react';
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
} from 'lucide-react';

const scrollToForm = () =>
    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });

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

    return (
        <section className="relative py-28 px-6 bg-gradient-to-b from-white to-[#f7f8fa] overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(204,134,103,0.08),transparent_40%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="mb-20 max-w-3xl">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#CC8667] mb-5">
                        Your Setup Options
                    </div>

                    <h2 className="font-black tracking-tight leading-[1.05] mb-6 text-[#14253E] text-4xl md:text-6xl">
                        Three Paths to{' '}
                        <span className="bg-gradient-to-r from-[#C28667] to-[#e3a98d] bg-clip-text text-transparent">
                            Business in Dubai
                        </span>
                    </h2>

                    <p className="text-[#14253E]/60 text-base leading-relaxed">
                        Every business is different. Explore your options and choose the
                        structure that fits your ambition.
                    </p>
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
                                        onClick={scrollToForm}
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
        </section>
    );
}