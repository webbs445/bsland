'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Globe, FileCheck, ArrowRight, ArrowLeft,
    CheckCircle2, RotateCcw, Briefcase, Users, DollarSign,
    Shield, TrendingUp, Star, Package, Laptop, BarChart3,
    ShoppingCart, Factory, Palette, Ship, Flag, Globe2,
    Plane, User, Handshake, Landmark, GitBranch, MonitorOff,
    Armchair, Home, Warehouse, UserCircle, UserCheck, Building,
    Wallet, CreditCard, Gem, Trophy,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Option {
    value: string;
    label: string;
    Icon: React.ElementType;
}
interface Question {
    id: string;
    question: string;
    subtitle: string;
    options: Option[];
}
interface FreeZone {
    key: string;
    name: string;
    full: string;
    best_for: string[];
    tagline: string;
    cost: string;
    visas: string;
    color: string;
}
interface Result {
    type: string;
    primary: string;
    icon: React.ElementType;
    color: string;
    score: number;
    why: string;
    pros: string[];
    cons: string[];
    freeZoneRecs: FreeZone[];
    cta: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const questions: Question[] = [
    {
        id: "business_type",
        question: "What type of business do you plan to run?",
        subtitle: "This helps us match you with the right license category",
        options: [
            { value: "trading", label: "Trading / Import & Export", Icon: Package },
            { value: "tech", label: "Tech / Software / Startup", Icon: Laptop },
            { value: "consulting", label: "Consulting / Professional Services", Icon: Briefcase },
            { value: "finance", label: "Finance / Investment / Crypto", Icon: BarChart3 },
            { value: "ecommerce", label: "E-commerce / Online Business", Icon: ShoppingCart },
            { value: "manufacturing", label: "Manufacturing / Industrial", Icon: Factory },
            { value: "media", label: "Media / Marketing / Creative", Icon: Palette },
            { value: "logistics", label: "Logistics / Freight / Shipping", Icon: Ship },
        ],
    },
    {
        id: "target_market",
        question: "Where will most of your customers be?",
        subtitle: "Your primary market affects which setup is most beneficial",
        options: [
            { value: "uae_local", label: "Primarily UAE (local clients, government)", Icon: Flag },
            { value: "uae_mix", label: "UAE + International mix", Icon: Globe2 },
            { value: "international", label: "Mostly international (export focused)", Icon: Plane },
            { value: "online_global", label: "Online / Global (no specific region)", Icon: Globe },
        ],
    },
    {
        id: "ownership",
        question: "What ownership structure do you want?",
        subtitle: "UAE law now allows 100% foreign ownership in most cases",
        options: [
            { value: "full_foreign", label: "100% foreign ownership (no local partner)", Icon: User },
            { value: "local_partner", label: "I'm open to a local UAE partner", Icon: Handshake },
            { value: "holding", label: "Just a holding company / asset protection", Icon: Landmark },
            { value: "branch", label: "Branch of an existing foreign company", Icon: Building },
        ],
    },
    {
        id: "office",
        question: "What are your office requirements?",
        subtitle: "Office type affects your license type and annual costs",
        options: [
            { value: "no_office", label: "No physical office needed (virtual OK)", Icon: MonitorOff },
            { value: "cowork", label: "Shared / co-working space", Icon: Armchair },
            { value: "small_office", label: "Small dedicated office", Icon: Home },
            { value: "large_office", label: "Large office / warehouse / facility", Icon: Warehouse },
        ],
    },
    {
        id: "visa_needs",
        question: "How many visas will you need?",
        subtitle: "Visa quota depends on your office type and free zone",
        options: [
            { value: "just_me", label: "Just myself (1 visa)", Icon: UserCircle },
            { value: "small_team", label: "Small team (2–5 visas)", Icon: Users },
            { value: "medium_team", label: "Growing team (6–15 visas)", Icon: UserCheck },
            { value: "large_team", label: "Large team (15+ visas)", Icon: Building2 },
        ],
    },
    {
        id: "budget",
        question: "What is your annual setup & running budget?",
        subtitle: "Includes license, visa, and office costs",
        options: [
            { value: "budget", label: "Budget-friendly (under AED 15,000/yr)", Icon: Wallet },
            { value: "mid", label: "Mid-range (AED 15,000 – 40,000/yr)", Icon: CreditCard },
            { value: "premium", label: "Premium (AED 40,000 – 100,000/yr)", Icon: Gem },
            { value: "enterprise", label: "Enterprise (AED 100,000+/yr)", Icon: Trophy },
        ],
    },
];

const freeZoneData: Record<string, Omit<FreeZone, 'key'>> = {
    dmcc: { name: "DMCC", full: "Dubai Multi Commodities Centre", best_for: ["trading", "finance", "ecommerce"], tagline: "World's #1 Free Zone", cost: "From AED 12,000/yr", visas: "Up to 6 per desk", color: "#059669" },
    difc: { name: "DIFC", full: "Dubai International Financial Centre", best_for: ["finance"], tagline: "Middle East's financial hub", cost: "From AED 25,000/yr", visas: "Flexible", color: "#7C3AED" },
    jafza: { name: "JAFZA", full: "Jebel Ali Free Zone", best_for: ["trading", "logistics", "manufacturing"], tagline: "World's largest port-based free zone", cost: "From AED 15,000/yr", visas: "Up to 10 per unit", color: "#4A90D9" },
    dubai_silicon: { name: "Dubai Silicon Oasis", full: "Dubai Silicon Oasis", best_for: ["tech"], tagline: "Technology & innovation hub", cost: "From AED 10,000/yr", visas: "Up to 6 per flexi-desk", color: "#DC2626" },
    twofour54: { name: "twofour54", full: "twofour54 Abu Dhabi", best_for: ["media"], tagline: "UAE's top media free zone", cost: "From AED 9,000/yr", visas: "Up to 3 per package", color: "#EA580C" },
    shams: { name: "SHAMS", full: "Sharjah Media City", best_for: ["media", "ecommerce", "consulting"], tagline: "Most affordable free zone", cost: "From AED 5,750/yr", visas: "Up to 3 per package", color: "#D97706" },
    ifza: { name: "IFZA", full: "International Free Zone Authority", best_for: ["consulting", "ecommerce", "tech"], tagline: "Flexible, affordable, fast", cost: "From AED 7,900/yr", visas: "Up to 6 per package", color: "#2563EB" },
};

// ─── Recommendation engine ────────────────────────────────────────────────────
function getRecommendation(answers: Record<string, string>): Result {
    const { business_type, target_market, ownership, office, visa_needs, budget } = answers;

    if (ownership === "holding" || (target_market === "international" && office === "no_office" && budget === "budget")) {
        return {
            type: "offshore", primary: "Offshore Company", icon: FileCheck, color: "#EA580C", score: 95,
            why: "Your priorities — asset protection, minimal overheads, and international operations — perfectly match an offshore structure.",
            pros: ["Lowest setup and running costs", "Complete privacy & confidentiality", "No audit or accounting requirements", "Hold international bank accounts", "No physical office needed"],
            cons: ["Cannot trade inside the UAE", "No UAE residence visa", "Limited banking options in UAE", "Not suitable for local business"],
            freeZoneRecs: [], cta: "Set Up Offshore Company",
        };
    }

    if (target_market === "uae_local" || ownership === "branch" || office === "large_office" || visa_needs === "large_team" || budget === "enterprise") {
        return {
            type: "mainland", primary: "Mainland Company (LLC)", icon: Building2, color: "#C28667", score: 92,
            why: "With UAE local clients, large team requirements, or government work in your plans, a Mainland license gives you unrestricted market access.",
            pros: ["Trade freely anywhere in the UAE", "Eligible for government contracts", "No restrictions on office location", "Unlimited visa quota (tied to office)", "Full UAE market access"],
            cons: ["Higher setup cost than free zones", "Subject to DED regulations", "Requires registered UAE office", "More complex setup process"],
            freeZoneRecs: [], cta: "Set Up Mainland Company",
        };
    }

    let recommended: FreeZone[] = Object.entries(freeZoneData)
        .filter(([, fz]) => fz.best_for.includes(business_type))
        .map(([key, fz]) => ({ key, ...fz }));

    if (budget === "budget") {
        const affordable = recommended.filter(fz => ["shams", "ifza", "dubai_silicon", "twofour54"].includes(fz.key));
        recommended = affordable.length > 0 ? affordable : [{ key: "shams", ...freeZoneData.shams }, { key: "ifza", ...freeZoneData.ifza }];
    }

    if (recommended.length === 0) recommended = [{ key: "ifza", ...freeZoneData.ifza }, { key: "dmcc", ...freeZoneData.dmcc }];

    return {
        type: "freezone", primary: "Free Zone Company", icon: Globe, color: "#4A90D9", score: 88,
        why: `A Free Zone company is ideal for your ${business_type} business — especially with international focus, 100% ownership, and flexible office options.`,
        pros: ["100% foreign ownership", "0% import/export duties within zone", "Fast & simple setup (3–7 days)", "Flexible office options (virtual to large)", "Tax-efficient structure"],
        cons: ["Cannot trade directly in UAE mainland (need distributor)", "Operations restricted to free zone or international", "Different zones have different regulations", "Some zones have limited banking options"],
        freeZoneRecs: recommended.slice(0, 3), cta: "Set Up Free Zone Company",
    };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SetupQuiz({ onComplete }: { onComplete?: (type: string) => void }) {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [result, setResult] = useState<Result | null>(null);
    const [animDir, setAnimDir] = useState(1);

    const question = questions[currentQ];
    const progress = (currentQ / questions.length) * 100;
    const selectedAnswer = answers[question?.id];

    const handleSelect = (value: string) => {
        const newAnswers = { ...answers, [question.id]: value };
        setAnswers(newAnswers);
        setTimeout(() => {
            if (currentQ < questions.length - 1) {
                setAnimDir(1);
                setCurrentQ(q => q + 1);
            } else {
                setResult(getRecommendation(newAnswers));
            }
        }, 280);
    };

    const handleBack = () => {
        if (currentQ > 0) { setAnimDir(-1); setCurrentQ(q => q - 1); }
    };

    const handleReset = () => { setAnswers({}); setResult(null); setCurrentQ(0); };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {!result ? (
                <div>
                    {/* Progress */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white/50 text-sm font-medium">Question {currentQ + 1} of {questions.length}</span>
                            <span className="text-[#C28667] text-sm font-black">{Math.round(progress)}% complete</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: "linear-gradient(90deg, #C28667, #d4957a)" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQ}
                            initial={{ opacity: 0, x: animDir * 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: animDir * -40 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-header font-black text-white text-2xl md:text-3xl mb-2 tracking-tight uppercase leading-tight">
                                {question.question}
                            </h3>
                            <p className="text-white/40 text-sm font-medium mb-7">{question.subtitle}</p>

                            <div className="grid sm:grid-cols-2 gap-3">
                                {question.options.map((opt) => {
                                    const isSelected = selectedAnswer === opt.value;
                                    return (
                                        <motion.button
                                            key={opt.value}
                                            onClick={() => handleSelect(opt.value)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200"
                                            style={{
                                                background: isSelected ? "rgba(194,134,103,0.15)" : "rgba(255,255,255,0.04)",
                                                borderColor: isSelected ? "#C28667" : "rgba(255,255,255,0.08)",
                                            }}
                                        >
                                            <div
                                                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    background: isSelected ? "rgba(194,134,103,0.2)" : "rgba(255,255,255,0.06)",
                                                    color: isSelected ? "#C28667" : "rgba(255,255,255,0.5)",
                                                }}
                                            >
                                                <opt.Icon size={17} />
                                            </div>
                                            <span className="text-white font-semibold text-sm leading-snug flex-1">{opt.label}</span>
                                            {isSelected && <CheckCircle2 size={17} className="flex-shrink-0" style={{ color: "#C28667" }} />}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {currentQ > 0 && (
                        <button
                            onClick={handleBack}
                            className="mt-6 flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm font-semibold"
                        >
                            <ArrowLeft size={15} /> Back
                        </button>
                    )}
                </div>
            ) : (
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

                        {/* Result hero */}
                        <div
                            className="rounded-2xl p-6 mb-5 border"
                            style={{ background: `${result.color}15`, borderColor: `${result.color}40` }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: result.color }}>
                                        <result.icon size={28} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">Our Recommendation</p>
                                        <h3 className="font-header font-black text-white text-2xl tracking-tight uppercase">{result.primary}</h3>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                    <div className="font-header font-black text-3xl" style={{ color: result.color }}>{result.score}%</div>
                                    <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">match score</p>
                                </div>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">{result.why}</p>
                        </div>

                        {/* Pros & Cons */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-5">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <h4 className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <CheckCircle2 size={14} /> Advantages
                                </h4>
                                <ul className="space-y-2">
                                    {result.pros.map((p, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-white/60 text-xs font-medium leading-relaxed">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <h4 className="text-rose-400 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Shield size={14} /> Considerations
                                </h4>
                                <ul className="space-y-2">
                                    {result.cons.map((c, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-white/60 text-xs font-medium leading-relaxed">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Free Zone Matches */}
                        {result.freeZoneRecs.length > 0 && (
                            <div className="mb-5">
                                <h4 className="text-white font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Star size={13} style={{ color: "#C28667" }} /> Recommended Free Zones for You
                                </h4>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {result.freeZoneRecs.map((fz, i) => (
                                        <motion.div
                                            key={fz.key}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-white/5 border border-white/10 rounded-xl p-4"
                                        >
                                            {i === 0 && (
                                                <span className="inline-block text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2"
                                                    style={{ background: `${fz.color}25`, color: fz.color }}>
                                                    Best Match
                                                </span>
                                            )}
                                            <h5 className="font-header font-black text-white text-sm mb-0.5">{fz.name}</h5>
                                            <p className="text-white/30 text-[10px] font-medium mb-3">{fz.tagline}</p>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-[10px] text-white/40">
                                                    <DollarSign size={11} style={{ color: fz.color }} /> {fz.cost}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-white/40">
                                                    <Users size={11} style={{ color: fz.color }} /> {fz.visas}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => {
                                    if (onComplete) {
                                        onComplete(result.type);
                                    } else {
                                        document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="flex-1 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-90"
                                style={{ background: result.color, color: result.type === "mainland" ? "#0A1628" : "#fff" }}
                            >
                                {result.cta} <ArrowRight size={15} />
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <RotateCcw size={14} /> Retake Quiz
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
