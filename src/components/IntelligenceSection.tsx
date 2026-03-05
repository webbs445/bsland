'use client';

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Globe, FileCheck,
    Info, ArrowRight,
    CheckCircle2,
    Package, Laptop, Briefcase, BarChart3, ShoppingCart,
    Flag, Globe2, Plane, Wallet, CreditCard, Gem, X
} from "lucide-react";
import FreeZoneQuiz from "./FreeZoneQuiz";
import SetupQuiz from "./SetupQuiz";
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

// ─── Data & Constants ────────────────────────────────────────────────────────

const companyTypes = [
    { id: "mainland", label: "Mainland", icon: Building2, color: "#CC8667", desc: "Full UAE market access" },
    { id: "freezone", label: "Free Zone", icon: Globe, color: "#4A90D9", desc: "100% foreign ownership" },
    { id: "offshore", label: "Offshore", icon: FileCheck, color: "#EA580C", desc: "Asset protection" },
];

const freeZones = [
    { id: "shams", name: "SHAMS", license: 5750, renewal: 5750, visaCost: 3200, maxVisas: 3, color: "#D97706" },
    { id: "ifza", name: "IFZA", license: 7900, renewal: 7900, visaCost: 3200, maxVisas: 6, color: "#2563EB" },
    { id: "dubai_silicon", name: "Dubai Silicon Oasis", license: 10000, renewal: 10000, visaCost: 3500, maxVisas: 6, color: "#DC2626" },
    { id: "dmcc", name: "DMCC", license: 12000, renewal: 12000, visaCost: 3500, maxVisas: 6, color: "#059669" },
    { id: "jafza", name: "JAFZA", license: 15000, renewal: 15000, visaCost: 3800, maxVisas: 10, color: "#4A90D9" },
    { id: "difc", name: "DIFC", license: 25000, renewal: 25000, visaCost: 4500, maxVisas: 20, color: "#7C3AED" },
];

const officeTypes = {
    mainland: [
        { id: "flexi", label: "Flexi Desk", setupCost: 0, annualCost: 8000, desc: "Shared workspace" },
        { id: "small", label: "Small Office", setupCost: 5000, annualCost: 35000, desc: "Up to 200 sqft" },
    ],
    freezone: [
        { id: "virtual", label: "Virtual Office", setupCost: 0, annualCost: 1500, desc: "Address only" },
        { id: "flexi", label: "Flexi Desk", setupCost: 0, annualCost: 5000, desc: "Shared workspace" },
    ],
    offshore: [
        { id: "registered", label: "Registered Address", setupCost: 0, annualCost: 0, desc: "Included in package" },
    ],
};

const timelines = {
    mainland: [
        { step: "Initial Approval", duration: "24h", desc: "Government vetting of activity & partners" },
        { step: "Trade Name Reservation", duration: "1h", desc: "Securing your legal entity name" },
        { step: "MoA Signing", duration: "24h", desc: "Notary/Digital signing of the Charter" },
        { step: "License Issuance", duration: "2h", desc: "Payment and digital license delivery" },
    ],
    freezone: [
        { step: "Portal Setup", duration: "24h", desc: "Registration in specific Authority system" },
        { step: "Verification", duration: "48h", desc: "Due diligence and document check" },
        { step: "License Release", duration: "24h", desc: "Certificate and e-channel activation" },
        { step: "Visa Processing", duration: "72h", desc: "Medical, EID, and Stamping (if req)" },
    ],
    offshore: [
        { step: "Application", duration: "2h", desc: "Submission of required structure details" },
        { step: "Registry Entry", duration: "48h", desc: "Registration with RAK ICC or JAFZA" },
        { step: "Cert. Delivery", duration: "1h", desc: "Digital certificate of incorporation" },
    ]
};



const GOV_FEES = { mainland: 5000, freezone: 1200, offshore: 800 };
const OFFSHORE_LICENSE = { setup: 8000, renewal: 5000 };
const MAINLAND_LICENSE = { setup: 15000, renewal: 12000 };
const VISA_GOVT_FEE = 1200;

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mb-3">{children}</p>;
}

function OptionCard({ selected, onClick, color, children, disabled }: any) {
    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.01 } : {}}
            whileTap={!disabled ? { scale: 0.99 } : {}}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            className={`relative w-full text-left p-5 rounded-xl border transition-all duration-300 ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
            style={{
                background: selected ? `${color}10` : "rgba(255,255,255,0.03)",
                borderColor: selected ? color : "rgba(255,255,255,0.05)",
            }}
        >
            {selected && (
                <motion.div
                    layoutId="selected-indicator"
                    className="absolute inset-0 rounded-xl border-2 pointer-events-none"
                    style={{ borderColor: color }}
                />
            )}
            {children}
        </motion.button>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IntelligenceSection() {
    const [activeTab, setActiveTab] = useState<"quiz" | "calculator" | "freezone">("quiz");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', whatsapp: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => { setMounted(true); }, []);

    // Calculator State
    const [companyType, setCompanyType] = useState("freezone");
    const [selectedFZ, setSelectedFZ] = useState("ifza");
    const [visaCount, setVisaCount] = useState(1);
    const [officeType, setOfficeType] = useState("flexi");
    const [calcView, setCalcView] = useState<"setup" | "annual">("setup");

    // Logic: Calculator derived values
    const fzData = freeZones.find((f) => f.id === selectedFZ) || freeZones[1];
    const offices = officeTypes[companyType as keyof typeof officeTypes] || officeTypes.freezone;
    const office = offices.find((o) => o.id === officeType) || offices[0];

    const calc = useMemo(() => {
        const govFee = GOV_FEES[companyType as keyof typeof GOV_FEES];
        if (companyType === "offshore") {
            return {
                setup: { license: OFFSHORE_LICENSE.setup, visa: 0, office: office.setupCost, gov: govFee },
                annual: { license: OFFSHORE_LICENSE.renewal, visa: 0, office: office.annualCost, gov: govFee },
            };
        }
        if (companyType === "mainland") {
            const visaSetup = visaCount * (VISA_GOVT_FEE + 1800);
            const visaAnnual = visaCount * (VISA_GOVT_FEE + 800);
            return {
                setup: { license: MAINLAND_LICENSE.setup, visa: visaSetup, office: office.setupCost, gov: govFee },
                annual: { license: MAINLAND_LICENSE.renewal, visa: visaAnnual, office: office.annualCost, gov: govFee },
            };
        }
        const visaSetup = visaCount * (fzData.visaCost + VISA_GOVT_FEE);
        const visaAnnual = visaCount * (fzData.visaCost * 0.6 + VISA_GOVT_FEE);
        return {
            setup: { license: fzData.license, visa: visaSetup, office: office.setupCost, gov: govFee },
            annual: { license: fzData.renewal, visa: Math.round(visaAnnual), office: office.annualCost, gov: govFee },
        };
    }, [companyType, fzData, visaCount, office]);

    const setupTotal = Object.values(calc.setup).reduce((a, b) => a + b, 0);
    const annualTotal = Object.values(calc.annual).reduce((a, b) => a + b, 0);
    const displayedTotal = calcView === "setup" ? setupTotal : annualTotal;
    const activeColor = companyTypes.find((c) => c.id === companyType)?.color || "#CC8667";

    const handleModalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

            const authName = companyType === 'freezone' ? (freeZones.find((f) => f.id === selectedFZ)?.name || '') : companyType;

            await submitLeadAction({
                first_name: formData.firstName,
                last_name: formData.lastName,
                custom_service_enquired: "Business Setup",
                custom_client_profile_and_requirement: `[Cost Calculator] Type: ${companyType} | Auth: ${authName} | Visas: ${visaCount} | View: ${calcView} | Total: AED ${displayedTotal.toLocaleString()}`,
                email_id: formData.email,
                mobile_no: formData.whatsapp,
                country: countryName
            });
            setSubmitted(true);
        } catch (error) {
            console.error(error);
            setSubmitError("Failed to submit inquiry. Please try again.");
        }
        finally { setIsSubmitting(false); }
    };

    return (
        <section className="py-16 px-8 bg-brand-navy text-white overflow-hidden relative">
            {/* Decorative Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-copper/5 blur-[100px] pointer-events-none rounded-full" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold uppercase tracking-[0.2em] text-[#c28867]"
                    >
                        Interactive Tools
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-4xl md:text-5xl font-bold text-white"
                    >
                        Don't Take Anyone's Word For It — See For Yourself.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
                    >
                        Use our free tools to calculate costs, check eligibility, see the process, and compare structures.
                    </motion.p>
                    <div className="flex flex-col sm:flex-row sm:inline-flex w-full sm:w-auto bg-white/5 p-1 rounded-xl border border-white/10 mb-4 mt-2 gap-1 sm:gap-0">
                        <button
                            onClick={() => setActiveTab("quiz")}
                            className={`px-5 py-3 sm:py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all w-full sm:w-auto ${activeTab === "quiz" ? 'bg-brand-copper text-brand-navy' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            Setup Quiz
                        </button>
                        <button
                            onClick={() => setActiveTab("calculator")}
                            className={`px-5 py-3 sm:py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all w-full sm:w-auto ${activeTab === "calculator" ? 'bg-brand-copper text-brand-navy' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            Cost Calculator
                        </button>
                        <button
                            onClick={() => setActiveTab("freezone")}
                            className={`px-5 py-3 sm:py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all w-full sm:w-auto ${activeTab === "freezone" ? 'bg-brand-copper text-brand-navy' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            Free Zone Match
                        </button>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-12 backdrop-blur-3xl shadow-2xl min-h-[500px]">
                    {activeTab === "freezone" ? (
                        <FreeZoneQuiz />
                    ) : activeTab === "quiz" ? (
                        <SetupQuiz />
                    ) : (
                        <div className="grid lg:grid-cols-5 gap-10 items-start">
                            <div className="lg:col-span-3 space-y-8">
                                <div>
                                    <SectionLabel>Setup Structure</SectionLabel>
                                    <div className="grid grid-cols-3 gap-3">
                                        {companyTypes.map((ct) => (
                                            <OptionCard
                                                key={ct.id}
                                                selected={companyType === ct.id}
                                                onClick={() => setCompanyType(ct.id)}
                                                color={ct.color}
                                            >
                                                <div className="flex flex-col items-center gap-3 text-center">
                                                    <ct.icon size={20} style={{ color: companyType === ct.id ? '#fff' : ct.color }} />
                                                    <div className="text-[8px] font-black uppercase tracking-widest text-white">{ct.label}</div>
                                                </div>
                                            </OptionCard>
                                        ))}
                                    </div>
                                </div>

                                {companyType === "freezone" && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <SectionLabel>Choose Authority</SectionLabel>
                                        <div className="grid sm:grid-cols-2 gap-2">
                                            {freeZones.map((fz) => (
                                                <button
                                                    key={fz.id}
                                                    onClick={() => setSelectedFZ(fz.id)}
                                                    className={`p-3 rounded-lg border text-left flex justify-between items-center transition-all ${selectedFZ === fz.id ? 'bg-white/10 border-brand-copper' : 'bg-white/5 border-white/5 opacity-50'}`}
                                                >
                                                    <span className="text-[9px] font-black uppercase tracking-tight">{fz.name}</span>
                                                    <span className="text-[7px] font-bold text-brand-copper tracking-widest">AED {fz.license.toLocaleString()}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                <div>
                                    <SectionLabel>Visas ({visaCount})</SectionLabel>
                                    <input
                                        type="range" min="0" max="10" value={visaCount}
                                        onChange={(e) => setVisaCount(parseInt(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-full appearance-none accent-brand-copper cursor-pointer mb-3"
                                    />
                                    <div className="flex justify-between text-[7px] font-black uppercase tracking-widest text-white/20">
                                        <span>0 Visas</span>
                                        <span>Priority Processing</span>
                                        <span>10+ Visas</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 w-full">
                                    <SectionLabel>The Roadmap ({timelines[companyType as keyof typeof timelines].length} Steps)</SectionLabel>
                                    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
                                        {timelines[companyType as keyof typeof timelines].map((t, i, arr) => (
                                            <div key={i} className="flex flex-col relative min-w-[140px] flex-1 snap-start group">
                                                {/* Connector line */}
                                                {i < arr.length - 1 && (
                                                    <div className="absolute top-3 left-6 w-[calc(100%+1rem)] h-px bg-white/10" />
                                                )}
                                                {/* Step Circle */}
                                                <div className="w-6 h-6 rounded-full border border-brand-copper/30 bg-[#0d1627] flex items-center justify-center text-[8px] font-black text-brand-copper group-hover:bg-brand-copper group-hover:text-brand-navy transition-all shrink-0 shadow-lg relative z-10 mb-3">
                                                    {i + 1}
                                                </div>
                                                {/* Step Content */}
                                                <div className="flex flex-col gap-1.5 mb-1.5">
                                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-white leading-tight pr-4">{t.step}</h4>
                                                    <div className="inline-flex items-center justify-center px-1.5 py-0.5 bg-brand-copper/10 text-brand-copper text-[7px] font-black rounded-full tracking-widest w-fit mb-0.5">{t.duration}</div>
                                                </div>
                                                <p className="text-[8px] font-medium text-white/30 uppercase tracking-tighter leading-relaxed pr-2">{t.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 sticky top-24">
                                <div className="bg-[#1a2b45] border border-white/10 rounded-2xl p-6 shadow-2xl">
                                    <div className="flex border-b border-white/5 mb-6">
                                        <button onClick={() => setCalcView("setup")} className={`flex-1 pb-3 text-[8px] font-black uppercase tracking-widest transition-all ${calcView === "setup" ? 'text-brand-copper border-b-2 border-brand-copper' : 'text-white/20'}`}>Setup Cost</button>
                                        <button onClick={() => setCalcView("annual")} className={`flex-1 pb-3 text-[8px] font-black uppercase tracking-widest transition-all ${calcView === "annual" ? 'text-brand-copper border-b-2 border-brand-copper' : 'text-white/20'}`}>Annual Recurring</button>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Trade License</span>
                                            <span className="text-xs font-header font-black tracking-tight text-white">AED {calc[calcView].license.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Visas ({visaCount})</span>
                                            <span className="text-xs font-header font-black tracking-tight text-white">AED {calc[calcView].visa.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Gov & Admin</span>
                                            <span className="text-xs font-header font-black tracking-tight text-white">AED {calc[calcView].gov.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-brand-copper/30 mb-6">
                                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-copper mb-1.5">Total {calcView === 'setup' ? 'Investment' : 'Maintenance'}</div>
                                        <div className="text-3xl font-header font-black text-white tracking-tighter">AED {displayedTotal.toLocaleString()}</div>
                                        <div className="text-[8px] font-bold uppercase tracking-widest text-white/20 mt-1.5">100% Transparent · No hidden fees</div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setFormData({ firstName: '', lastName: '', email: '', whatsapp: '' });
                                            setSubmitted(false);
                                            setSubmitError(null);
                                            setIsModalOpen(true);
                                        }}
                                        className="btn-primary w-full"
                                    >
                                        Get Precise Quote <ArrowRight className="ml-2 w-3 h-3" />
                                    </button>

                                    <div className="mt-6 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
                                        <Info size={12} className="text-brand-copper" />
                                        <p className="text-[8px] font-bold text-white/30 uppercase leading-none tracking-tighter">Estimates only. Subject to government updates.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quote Modal */}
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
                                                Your quote request is received.<br />An expert will contact you shortly.
                                            </p>
                                            <button onClick={() => setIsModalOpen(false)} className="mt-8 text-sm font-bold tracking-widest uppercase hover:underline" style={{ color: '#C28667' }}>Close Window</button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                            <div className="mb-8">
                                                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">Get Your Precise Quote</h3>
                                                <p className="text-brand-navy/50 text-xs font-medium mt-1">
                                                    For {companyType === 'freezone' ? (freeZones.find((f) => f.id === selectedFZ)?.name || '') : (companyTypes.find((f) => f.id === companyType)?.label || companyType)} with {visaCount} Visa(s)
                                                </p>
                                            </div>
                                            <form onSubmit={handleModalSubmit} className="space-y-4">
                                                {submitError && (
                                                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-medium border border-red-100 text-center">
                                                        {submitError}
                                                    </div>
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
                                                    {isSubmitting ? 'Processing...' : <>Send Quote Request <ArrowRight size={16} /></>}
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
