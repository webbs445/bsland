'use client';

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Globe, FileCheck,
    Info, ArrowRight,
    CheckCircle2,
    Package, Laptop, Briefcase, BarChart3, ShoppingCart,
    Flag, Globe2, Plane, Wallet, CreditCard, Gem
} from "lucide-react";
import FreeZoneQuiz from "./FreeZoneQuiz";
import SetupQuiz from "./SetupQuiz";

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
                    <div className="inline-flex bg-white/5 p-1 rounded-xl border border-white/10 mb-4 mt-2">
                        <button
                            onClick={() => setActiveTab("quiz")}
                            className={`px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === "quiz" ? 'bg-brand-copper text-brand-navy' : 'text-white/40 hover:text-white'}`}
                        >
                            Setup Quiz
                        </button>
                        <button
                            onClick={() => setActiveTab("calculator")}
                            className={`px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === "calculator" ? 'bg-brand-copper text-brand-navy' : 'text-white/40 hover:text-white'}`}
                        >
                            Cost Calculator
                        </button>
                        <button
                            onClick={() => setActiveTab("freezone")}
                            className={`px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === "freezone" ? 'bg-brand-copper text-brand-navy' : 'text-white/40 hover:text-white'}`}
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

                                <div className="pt-6 border-t border-white/5">
                                    <SectionLabel>The Roadmap ({timelines[companyType as keyof typeof timelines].length} Steps)</SectionLabel>
                                    <div className="space-y-3">
                                        {timelines[companyType as keyof typeof timelines].map((t, i) => (
                                            <div key={i} className="flex gap-4 group">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-6 h-6 rounded-full border border-brand-copper/30 flex items-center justify-center text-[8px] font-black text-brand-copper group-hover:bg-brand-copper group-hover:text-brand-navy transition-all">
                                                        {i + 1}
                                                    </div>
                                                    {i < timelines[companyType as keyof typeof timelines].length - 1 && <div className="w-px h-full bg-white/5 mt-1.5" />}
                                                </div>
                                                <div className="pb-4">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h4 className="text-[9px] font-black uppercase tracking-widest text-white">{t.step}</h4>
                                                        <div className="px-1.5 py-0.5 bg-brand-copper/10 text-brand-copper text-[7px] font-black rounded-full tracking-widest">{t.duration}</div>
                                                    </div>
                                                    <p className="text-[9px] font-medium text-white/30 uppercase tracking-tighter leading-relaxed">{t.desc}</p>
                                                </div>
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

                                    <button onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary w-full">
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
        </section>
    );
}
