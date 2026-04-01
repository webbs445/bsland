'use client';
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight, ArrowRight, Trophy, RotateCcw,
    Laptop, Package, Megaphone, Truck, Briefcase,
    Wallet, CreditCard, Landmark, Gem,
    Building2, LayoutGrid,
    User, Users, UsersRound,
    Activity, BadgeDollarSign, Home, ClipboardList,
    CheckCircle2, X
} from "lucide-react";
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';
import { useUTMParams } from '@/hooks/useUTMParams';

const quizSteps = [
    {
        id: 1,
        question: "What is your main business activity?",
        options: [
            { label: "Tech / E-commerce", value: "tech", icon: Laptop },
            { label: "Trading / General", value: "trading", icon: Package },
            { label: "Media / Marketing", value: "media", icon: Megaphone },
            { label: "Logistics / Shipping", value: "logistics", icon: Truck },
            { label: "Professional Services", value: "consulting", icon: Briefcase },
        ],
    },
    {
        id: 2,
        question: "What's your initial setup budget?",
        options: [
            { label: "Under AED 20,000", value: "low", icon: Wallet },
            { label: "AED 20,000 – 30,000", value: "mid", icon: CreditCard },
            { label: "AED 30,000 – 45,000", value: "high", icon: Landmark },
            { label: "AED 45,000+", value: "premium", icon: Gem },
        ],
    },
    {
        id: 3,
        question: "Do you need a physical office immediately?",
        options: [
            { label: "Yes, I need a desk/office", value: "physical", icon: Building2 },
            { label: "No, flexi-desk is fine", value: "flexi", icon: LayoutGrid },
        ],
    },
    {
        id: 4,
        question: "How many visas do you need in Year 1?",
        options: [
            { label: "Just 1 (solo)", value: "1", icon: User },
            { label: "2–3", value: "2-3", icon: Users },
            { label: "4–5", value: "4-5", icon: UsersRound },
            { label: "5+", value: "5+", icon: Building2 },
        ],
    },
];

const introSteps = [
    { icon: Activity, label: "Activity" },
    { icon: BadgeDollarSign, label: "Budget" },
    { icon: Home, label: "Office" },
    { icon: ClipboardList, label: "Visas" },
];

type QuizResult = {
    name: string;
    match: number;
    cost: string;
    visas: string;
    why: string;
};

function computeResults(answers: Record<number, string>): QuizResult[] {
    const activity = answers[1];
    const budget = answers[2];
    const visas = answers[4];
    const results: QuizResult[] = [];

    if (["media", "tech"].includes(activity) && ["low", "mid"].includes(budget))
        results.push({ name: "SHAMS", match: 95, cost: "AED 22,500+", visas: "2", why: "Perfect for creative/tech activity with budget-friendly packaging" });
    if (["trading", "tech", "consulting"].includes(activity) && ["mid", "high"].includes(budget))
        results.push({ name: "IFZA", match: 88, cost: "AED 24,000+", visas: "3", why: "Great value with 3 visas included and flexible office options" });
    if (["consulting"].includes(activity) && ["low", "mid"].includes(budget) && visas === "1")
        results.push({ name: "RAK ICC", match: 92, cost: "AED 16,000+", visas: "1-2", why: "Most affordable option, perfect for solo consultants" });
    if (["tech", "trading"].includes(activity) && ["low", "mid"].includes(budget))
        results.push({ name: "SPC Free Zone", match: 85, cost: "AED 18,000+", visas: "2", why: "E-commerce specialized with affordable entry cost" });
    if (["premium", "high"].includes(budget))
        results.push({ name: "DMCC", match: 90, cost: "AED 35,000+", visas: "3+", why: "Most prestigious free zone with strongest banking support" });
    if (activity === "logistics")
        results.push({ name: "Dubai South", match: 93, cost: "AED 28,000+", visas: "2-3", why: "Purpose-built for logistics near Al Maktoum Airport" });

    if (results.length === 0) {
        results.push({ name: "IFZA", match: 85, cost: "AED 24,000+", visas: "3", why: "Versatile zone suitable for most business activities" });
        results.push({ name: "SHAMS", match: 78, cost: "AED 22,500+", visas: "2", why: "Affordable all-inclusive packages" });
    }
    if (results.length === 1)
        results.push({ name: "IFZA", match: 80, cost: "AED 24,000+", visas: "3", why: "Comprehensive trading zone with 3 visas included" });

    return results.slice(0, 3).sort((a, b) => b.match - a.match);
}

export default function FreeZoneQuiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [results, setResults] = useState<QuizResult[] | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', whatsapp: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);
    const utms = useUTMParams();

    useEffect(() => { setMounted(true); }, []);

    const currentQ = quizSteps[step - 1];

    const handleAnswer = (value: string) => {
        const newAnswers = { ...answers, [step]: value };
        setAnswers(newAnswers);
        if (step < quizSteps.length) {
            setStep(step + 1);
        } else {
            setResults(computeResults(newAnswers));
        }
    };

    const reset = () => { setStep(0); setAnswers({}); setResults(null); setSelectedRecommendation(null); setIsModalOpen(false); setSubmitted(false); };
    const scrollToForm = () => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });

    const openModal = (recommendationName: string | null = null) => {
        setSelectedRecommendation(recommendationName);
        setFormData({ firstName: '', lastName: '', email: '', whatsapp: '' });
        setSubmitted(false);
        setSubmitError(null);
        setIsModalOpen(true);
    };

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

            // Map answers back to readable labels
            const activityLabel = quizSteps[0].options.find(o => o.value === answers[1])?.label || answers[1];
            const budgetLabel = quizSteps[1].options.find(o => o.value === answers[2])?.label || answers[2];
            const officeLabel = quizSteps[2].options.find(o => o.value === answers[3])?.label || answers[3];
            const visasLabel = quizSteps[3].options.find(o => o.value === answers[4])?.label || answers[4];

            const profileStr = `[Free Zone Match Quiz] Recommend: ${selectedRecommendation || 'General'} | Activity: ${activityLabel} | Budget: ${budgetLabel} | Office: ${officeLabel} | Visas: ${visasLabel}`;

            await submitLeadAction({
                first_name: formData.firstName,
                last_name: formData.lastName,
                custom_service_enquired: "Business Setup",
                custom_client_profile_and_requirement: profileStr,
                email_id: formData.email,
                mobile_no: formData.whatsapp,
                country: countryName,
                ...utms
            });
            setSubmitted(true);
        } catch (error) {
            console.error(error);
            setSubmitError("Failed to submit inquiry. Please try again.");
        }
        finally { setIsSubmitting(false); }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">

                {/* Intro */}
                {step === 0 && !results && (
                    <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
                        <div className="grid grid-cols-4 gap-3 mb-10">
                            {introSteps.map(({ icon: Icon, label }, i) => (
                                <div key={i} className="rounded-2xl p-4 text-center flex flex-col items-center gap-2"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: 'rgba(204,134,103,0.12)', border: '1px solid rgba(204,134,103,0.2)' }}>
                                        <Icon size={18} style={{ color: '#ffffffff' }} />
                                    </div>
                                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Step {i + 1}</p>
                                    <p className="text-white/70 text-[9px] font-black uppercase tracking-widest">{label}</p>
                                </div>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(204,134,103,0.45)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(1)}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-white text-[10px] uppercase tracking-widest mx-auto"
                            style={{ background: 'linear-gradient(135deg, #CC8667, #b8734f)', color: '#0a1628', boxShadow: '0 8px 24px rgba(204,134,103,0.35)' }}
                        >
                            Find My Perfect Free Zone <ArrowRight size={16} />
                        </motion.button>
                        <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest mt-5">No email required · Under 60 seconds</p>
                    </motion.div>
                )}

                {/* Quiz steps */}
                {step > 0 && !results && (
                    <motion.div
                        key={`step-${step}`}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Progress */}
                        <div className="flex gap-2 mb-10">
                            {quizSteps.map((_, i) => (
                                <div key={i} className="h-1 flex-1 rounded-full transition-all duration-500"
                                    style={{
                                        background: i < step
                                            ? 'linear-gradient(90deg, #CC8667, #d4957a)'
                                            : i === step - 1
                                                ? 'rgba(204,134,103,0.4)'
                                                : 'rgba(255,255,255,0.08)'
                                    }} />
                            ))}
                        </div>

                        <p className="text-white/50 text-sm font-medium mb-3" style={{ color: '#CC8667' }}>
                            Question {step} of {quizSteps.length}
                        </p>
                        <h3 className="font-header font-black text-white text-2xl md:text-3xl mb-8 tracking-tight uppercase leading-tight">
                            {currentQ.question}
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            {currentQ.options.map((opt) => {
                                const Icon = opt.icon;
                                return (
                                    <motion.button
                                        key={opt.value}
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="flex flex-col items-center gap-3 p-5 rounded-xl text-center transition-all group"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1.5px solid rgba(255,255,255,0.08)',
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor = '#CC8667';
                                            (e.currentTarget as HTMLElement).style.background = 'rgba(204,134,103,0.08)';
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                                        }}
                                    >
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                                            style={{ background: 'rgba(204,134,103,0.10)', border: '1px solid rgba(204,134,103,0.18)' }}>
                                            <Icon size={20} style={{ color: '#CC8667' }} />
                                        </div>
                                        <span className="text-white font-semibold text-sm leading-tight">{opt.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Results */}
                {results && (
                    <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 w-fit mx-auto"
                            style={{ background: 'rgba(204,134,103,0.12)', color: '#CC8667', border: '1px solid rgba(204,134,103,0.25)' }}>
                            <Trophy size={14} /> Your Top Free Zone Matches
                        </div>

                        <div className="grid gap-4 mb-6">
                            {results.map((r, i) => (
                                <motion.div
                                    key={r.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4"
                                    style={{
                                        background: i === 0 ? 'rgba(204,134,103,0.10)' : 'rgba(255,255,255,0.04)',
                                        border: `1.5px solid ${i === 0 ? 'rgba(204,134,103,0.40)' : 'rgba(255,255,255,0.08)'}`,
                                    }}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            {i === 0 && <Trophy size={14} style={{ color: '#CC8667' }} />}
                                            <h4 className="text-white font-black text-base uppercase tracking-tight">{r.name}</h4>
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest"
                                                style={i === 0
                                                    ? { background: '#CC8667', color: '#0a1628' }
                                                    : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                                                {r.match}% Match
                                            </span>
                                        </div>
                                        <p className="text-white/40 text-sm font-medium mb-2">{r.why}</p>
                                        <div className="flex gap-4 text-sm font-semibold">
                                            <span className="text-white/40">Cost: <span style={{ color: '#CC8667' }}>{r.cost}</span></span>
                                            <span className="text-white/40">Visas: <span style={{ color: '#CC8667' }}>{r.visas}</span></span>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => openModal(r.name)}
                                        className="px-5 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center gap-2 shrink-0 transition-all"
                                        style={i === 0
                                            ? { background: 'linear-gradient(135deg, #CC8667, #b8734f)', color: '#0a1628', boxShadow: '0 6px 18px rgba(204,134,103,0.35)' }
                                            : { border: '1.5px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
                                    >
                                        Get Quote <ArrowRight size={13} />
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={reset}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-white/12 text-white/40 hover:text-white/70 transition-all mx-auto">
                                <RotateCcw size={13} /> Retake Quiz
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(204,134,103,0.4)' }} whileTap={{ scale: 0.98 }}
                                onClick={() => openModal("All Matches (Consultation)")}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm mx-auto transition-all"
                                style={{ background: 'linear-gradient(135deg, #CC8667, #b8734f)', color: '#0a1628', boxShadow: '0 8px 24px rgba(204,134,103,0.3)' }}>
                                Book Free Consultation <ArrowRight size={13} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* OR divider */}
            {step === 0 && !results && (
                <div className="text-center mt-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-white/20 text-[9px] font-black uppercase tracking-widest">OR</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>
                    <button onClick={() => openModal("Direct Call Inquiry (Skipped Quiz)")} className="text-white/30 hover:text-white text-xs font-bold underline underline-offset-4 transition-colors">
                        Book a free 15‑minute clarity call instead →
                    </button>
                </div>
            )}

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
                                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
                                style={{ borderTop: '4px solid #C28667' }}
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 text-brand-navy/40 hover:text-brand-navy hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
                                            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl" style={{ background: '#C28667', boxShadow: '0 20px 40px rgba(194,134,103,0.4)' }}>
                                                <CheckCircle2 className="w-10 h-10 text-white" />
                                            </div>
                                            <h4 className="text-2xl font-black text-brand-navy mb-2 uppercase tracking-tight">Match Secured!</h4>
                                            <p className="text-brand-navy/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                                Your quiz results and quote request are received.<br />A specialist will contact you shortly.
                                            </p>
                                            <button onClick={() => setIsModalOpen(false)} className="mt-8 text-sm font-bold tracking-widest uppercase hover:underline" style={{ color: '#C28667' }}>Close Window</button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                            <div className="mb-8">
                                                <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">Get Your Tailored Quote</h3>
                                                <p className="text-brand-navy/50 text-xs font-medium mt-1">
                                                    {selectedRecommendation?.includes("Direct")
                                                        ? "Speak with a specialist about your specific setup needs."
                                                        : `Requesting precise breakdown for ${selectedRecommendation}`}
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
        </div>
    );
}
