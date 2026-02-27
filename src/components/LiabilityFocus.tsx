'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, UserPlus, Globe, Layers, Check } from 'lucide-react';

const scrollToForm = () =>
    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });

const benefits = [
    {
        icon: ShieldAlert,
        title: 'Personal Asset Protection',
        description: 'Liability limited to your capital contribution. Creditors cannot touch personal wealth.',
    },
    {
        icon: UserPlus,
        title: '100% Foreign Ownership',
        description: 'No local sponsor required. Your name, your control, your profits.',
    },
    {
        icon: Globe,
        title: 'Full UAE Market Access',
        description: 'Trade anywhere in the emirates. Government contracts. Retail. No restrictions.',
    },
    {
        icon: Layers,
        title: 'Multiple Activities, One License',
        description: 'Trading, consulting, services — all under a single company.',
    },
];

const tableData = [
    { label: 'Personal asset protection', value: 'Full', featured: true, check: true },
    { label: '100% foreign ownership', value: 'Yes', featured: false, check: true },
    { label: 'Trade anywhere in UAE', value: 'Yes', featured: false, check: true },
    { label: 'Government contracts', value: 'Eligible', featured: false, check: true },
    { label: 'Multiple activities', value: 'Yes', featured: false, check: true },
    { label: 'Profit repatriation', value: '100%', featured: false, check: true },
    { label: 'Setup time', value: '2–5 Days', featured: false, check: false },
    { label: 'Starting from', value: 'AED 20,000', featured: true, check: false },
];

const trustItems = ['No Hidden Fees', 'Same-Day Consultation', '22+ Years Experience'];

export default function LiabilityFocus() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
    };
    return (
        <section className="relative py-24 px-8 bg-white overflow-hidden">

            {/* Background radial glows */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse 70% 60% at 100% 50%, rgba(194,134,103,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 0% 30%,  rgba(13,27,42,0.03)    0%, transparent 50%)
          `,
                }}
            />



            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* ── LEFT ── */}
                    <div>
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-3 mb-5"
                        >
                            <span className="block w-8 h-px bg-brand-copper" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-copper">
                                LLC — Liability Protection
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-header font-black tracking-tighter uppercase text-brand-navy mb-6"
                            style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4rem)', lineHeight: 0.95, letterSpacing: '0.02em' }}
                        >
                            YOUR BUSINESS TAKES RISKS.
                            <br />
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #C28667, #d4957a)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                YOUR PERSONAL LIFE SHOULDN'T.
                            </span>
                        </motion.h2>

                        {/* Body */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-brand-navy/60 font-medium mb-12 leading-relaxed max-w-lg text-sm"
                        >
                            An LLC creates a legal wall between your company and your personal assets.
                            Your home, your savings, your family's security — all ring-fenced.
                        </motion.p>

                        {/* Benefits grid */}
                        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9">
                            {benefits.map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                                    className="group"
                                >
                                    <div
                                        className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-4 transition-all duration-300 group-hover:-translate-y-1"
                                        style={{ background: 'rgba(13,27,42,0.05)', color: '#C28667' }}
                                    >
                                        <benefit.icon className="w-5 h-5" style={{ stroke: 'currentColor', fill: 'none', strokeWidth: 1.75 }} />
                                    </div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-brand-navy mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-[12px] text-brand-navy/40 font-medium leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT — CARD ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="relative"
                    >
                        {/* Tilt layers */}
                        <div
                            className="absolute inset-[-14px] rounded-[44px] border"
                            style={{
                                background: 'rgba(13,27,42,0.04)',
                                borderColor: 'rgba(13,27,42,0.06)',
                                transform: 'rotate(-1.5deg)',
                            }}
                        />
                        <div
                            className="absolute inset-[-7px] rounded-[40px] border"
                            style={{
                                background: 'rgba(194,134,103,0.03)',
                                borderColor: 'rgba(194,134,103,0.07)',
                                transform: 'rotate(0.6deg)',
                            }}
                        />

                        {/* Main card */}
                        <motion.div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="relative rounded-[36px] overflow-hidden"
                            style={{
                                background: '#ffffff',
                                border: '1.5px solid rgba(13,27,42,0.08)',
                                boxShadow: '0 20px 60px rgba(13,27,42,0.08), 0 4px 16px rgba(13,27,42,0.04)',
                                padding: '40px',
                            }}
                        >
                            {/* Interactive Spotlight Glow */}
                            <motion.div
                                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                                style={{
                                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(194, 134, 103, 0.08), transparent 40%)`,
                                    opacity: isHovered ? 1 : 0,
                                }}
                            />

                            {/* Top shimmer */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px] z-10"
                                style={{
                                    background: 'linear-gradient(90deg, transparent 0%, #C28667 40%, #d4957a 60%, transparent 100%)',
                                    opacity: 0.6,
                                }}
                            />

                            {/* Header */}
                            <div
                                className="flex items-center justify-between mb-7 pb-5 relative z-10"
                                style={{ borderBottom: '1px solid rgba(13,27,42,0.05)' }}
                            >
                                <div
                                    className="font-header font-black tracking-wide uppercase text-brand-navy"
                                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '0.04em' }}
                                >
                                    LLC at a Glance
                                </div>
                                <div
                                    className="px-3 py-[5px] text-[7.5px] font-black uppercase tracking-[0.2em] rounded-full backdrop-blur-sm"
                                    style={{
                                        background: 'rgba(194,134,103,0.10)',
                                        border: '1px solid rgba(194,134,103,0.20)',
                                        color: '#C28667',
                                    }}
                                >
                                    Secure Structure
                                </div>
                            </div>

                            {/* Table */}
                            <div className="flex flex-col gap-[2px] mb-8 relative z-10">
                                {tableData.map((row, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between px-3 py-[10px] rounded-[10px] transition-colors duration-200"
                                        style={
                                            row.featured
                                                ? {
                                                    background: 'linear-gradient(135deg, rgba(194,134,103,0.07), rgba(194,134,103,0.02))',
                                                    border: '1px solid rgba(194,134,103,0.12)',
                                                }
                                                : undefined
                                        }
                                        onMouseEnter={e => {
                                            if (!row.featured)
                                                (e.currentTarget as HTMLDivElement).style.background = 'rgba(13,27,42,0.03)';
                                        }}
                                        onMouseLeave={e => {
                                            if (!row.featured)
                                                (e.currentTarget as HTMLDivElement).style.background = '';
                                        }}
                                    >
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-[0.12em]"
                                            style={{ color: row.featured ? 'rgba(13,27,42,0.55)' : 'rgba(13,27,42,0.38)' }}
                                        >
                                            {row.label}
                                        </span>
                                        <div className="flex items-center gap-[6px]">
                                            {row.check && (
                                                <Check
                                                    className="w-[15px] h-[15px]"
                                                    style={{ color: '#C28667', strokeWidth: 2.5 }}
                                                />
                                            )}
                                            <span
                                                className="text-[10px] font-black uppercase tracking-[0.08em]"
                                                style={{ color: row.featured ? '#C28667' : '#0d1b2a', fontSize: row.featured ? '11px' : undefined }}
                                            >
                                                {row.value}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={scrollToForm}
                                className="group relative w-full overflow-hidden rounded-[16px] py-[18px] px-7 font-header font-black tracking-widest uppercase text-white transition-all duration-300 hover:-translate-y-[2px] z-10"
                                style={{
                                    background: '#0d1b2a',
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: '1.05rem',
                                    letterSpacing: '0.1em',
                                    boxShadow: '0 4px 20px rgba(13,27,42,0.15)',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(13,27,42,0.22)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(13,27,42,0.15)';
                                }}
                            >
                                {/* Copper hover overlay */}
                                <span
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: 'linear-gradient(135deg, #C28667, #d4957a)' }}
                                />
                                <span className="relative z-10">Protect My Assets — Set Up LLC →</span>
                            </button>

                            {/* Trust micro-row */}
                            <div className="flex items-center justify-center gap-5 mt-4 relative z-10">
                                {trustItems.map((item, i) => (
                                    <div key={i} className="flex items-center gap-[5px]">
                                        <span
                                            className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                                            style={{ background: '#C28667' }}
                                        />
                                        <span
                                            className="text-[8.5px] font-bold uppercase tracking-[0.12em]"
                                            style={{ color: 'rgba(13,27,42,0.35)' }}
                                        >
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}