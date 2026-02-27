'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight, ArrowRight, Trophy, RotateCcw,
    Laptop, Package, Megaphone, Truck, Briefcase,
    Wallet, CreditCard, Landmark, Gem,
    Building2, LayoutGrid,
    User, Users, UsersRound,
    Activity, BadgeDollarSign, Home, ClipboardList
} from "lucide-react";

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

    const reset = () => { setStep(0); setAnswers({}); setResults(null); };
    const scrollToForm = () => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });

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
                                        <Icon size={18} style={{ color: '#CC8667' }} />
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
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest mx-auto"
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

                        <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: '#CC8667' }}>
                            Question {step} of {quizSteps.length}
                        </p>
                        <h3 className="text-2xl font-black text-white mb-8 tracking-tight uppercase leading-tight">
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
                                        <span className="text-white font-bold text-[11px] uppercase tracking-tight leading-tight">{opt.label}</span>
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
                                        <p className="text-white/40 text-xs mb-2">{r.why}</p>
                                        <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-white/40">Cost: <span style={{ color: '#CC8667' }}>{r.cost}</span></span>
                                            <span className="text-white/40">Visas: <span style={{ color: '#CC8667' }}>{r.visas}</span></span>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={scrollToForm}
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
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest border border-white/12 text-white/40 hover:text-white/70 transition-all mx-auto">
                                <RotateCcw size={13} /> Retake Quiz
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(204,134,103,0.4)' }} whileTap={{ scale: 0.98 }}
                                onClick={scrollToForm}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest mx-auto transition-all"
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
                    <button onClick={scrollToForm} className="text-white/30 hover:text-white text-xs font-bold underline underline-offset-4 transition-colors">
                        Book a free 15‑minute clarity call instead →
                    </button>
                </div>
            )}
        </div>
    );
}
