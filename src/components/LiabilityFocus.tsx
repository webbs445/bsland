'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, UserPlus, Globe, Layers, Check, X, CheckCircle2, ArrowRight } from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

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
                custom_client_profile: `[Liability Focus] Selected Path: Setup LLC`,
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
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sm font-bold uppercase tracking-[0.2em] text-[#c28867] mb-5 block"
                        >
                            LLC — Liability Protection
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 mb-6 text-4xl md:text-5xl font-bold text-gray-900 uppercase leading-[1.2] tracking-wide"
                        >
                            Your Business Takes Risks. Your Personal Life Shouldn't.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 mb-12 text-lg text-gray-600 max-w-lg"
                        >
                            An LLC creates a legal wall between your company and your personal assets. Your home, your savings, your family's security — all ring-fenced.
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
                                onClick={() => {
                                    setSubmitted(false);
                                    setIsModalOpen(true);
                                }}
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

            {/* Popup Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#0d1b2a]/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                                style={{ borderTop: `4px solid #C28667` }}
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 text-[#0d1b2a]/40 hover:text-[#0d1b2a] hover:bg-slate-100 rounded-full transition-colors"
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
                                        <h4 className="text-2xl font-black text-[#0d1b2a] mb-2 uppercase tracking-tight">Success!</h4>
                                        <p className="text-[#0d1b2a]/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                            Your LLC setup request is received.<br />A specialist will contact you shortly.
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
                                            <h3 className="text-2xl font-black text-[#0d1b2a] uppercase tracking-tight mb-2">
                                                Set Up Your LLC
                                            </h3>
                                            <p className="text-[#0d1b2a]/50 text-sm font-medium">
                                                Enter your details below to get a customized quote for your Mainland LLC.
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
                                                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#0d1b2a] placeholder:text-[#0d1b2a]/40 rounded-xl outline-none focus:border-[#C28667] focus:ring-1 focus:ring-[#C28667] transition-all text-sm font-medium"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#0d1b2a] placeholder:text-[#0d1b2a]/40 rounded-xl outline-none focus:border-[#C28667] focus:ring-1 focus:ring-[#C28667] transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#0d1b2a] placeholder:text-[#0d1b2a]/40 rounded-xl outline-none focus:border-[#C28667] focus:ring-1 focus:ring-[#C28667] transition-all text-sm font-medium"
                                            />
                                            <div className="space-y-1.5 pb-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#0d1b2a]/40 ml-1">
                                                    WhatsApp Number
                                                </label>
                                                <PhoneInput
                                                    international
                                                    defaultCountry="AE"
                                                    value={formData.whatsapp}
                                                    onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                    className="phone-input-custom text-[#0d1b2a] w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#C28667] focus-within:ring-1 focus-within:ring-[#C28667] transition-all text-sm font-medium"
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
                                                    <>Set Up LLC <ArrowRight size={16} /></>
                                                )}
                                            </button>
                                            <p className="text-center text-[10px] text-[#0d1b2a]/40 font-bold uppercase tracking-widest mt-4">
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