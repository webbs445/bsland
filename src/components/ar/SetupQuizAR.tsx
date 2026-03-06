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
        question: "ما هو نوع العمل الذي تخطط لإدارته؟",
        subtitle: "يساعدنا هذا في مطابقتك مع فئة الترخيص الصحيحة",
        options: [
            { value: "trading", label: "التجارة / الاستيراد والتصدير", Icon: Package },
            { value: "tech", label: "التقنية / البرمجيات / الشركات الناشئة", Icon: Laptop },
            { value: "consulting", label: "الاستشارات / الخدمات المهنية", Icon: Briefcase },
            { value: "finance", label: "المالية / الاستثمار / العملات الرقمية", Icon: BarChart3 },
            { value: "ecommerce", label: "التجارة الإلكترونية / الأعمال عبر الإنترنت", Icon: ShoppingCart },
            { value: "manufacturing", label: "التصنيع / الصناعة", Icon: Factory },
            { value: "media", label: "الإعلام / التسويق / الإبداع", Icon: Palette },
            { value: "logistics", label: "اللوجستيات / الشحن", Icon: Ship },
        ],
    },
    {
        id: "target_market",
        question: "أين سيكون معظم عملائك؟",
        subtitle: "يؤثر سوقك الأساسي على نوع التأسيس الأكثر فائدة لك",
        options: [
            { value: "uae_local", label: "بشكل أساسي في الإمارات (عملاء محليون، حكومة)", Icon: Flag },
            { value: "uae_mix", label: "مزيج بين المحلي والدولي", Icon: Globe2 },
            { value: "international", label: "معظمهم دوليون (التركيز على التصدير)", Icon: Plane },
            { value: "online_global", label: "عبر الإنترنت / عالمي (بدون منطقة محددة)", Icon: Globe },
        ],
    },
    {
        id: "ownership",
        question: "ما هو هيكل الملكية الذي تريده؟",
        subtitle: "يسمح قانون الإمارات الآن بملكية أجنبية بنسبة 100% في معظم الحالات",
        options: [
            { value: "full_foreign", label: "ملكية أجنبية 100% (بدون شريك محلي)", Icon: User },
            { value: "local_partner", label: "أنا منفتح على شراكة محلية في الإمارات", Icon: Handshake },
            { value: "holding", label: "مجرد شركة قابضة / حماية الأصول", Icon: Landmark },
            { value: "branch", label: "فرع لشركة أجنبية قائمة", Icon: Building },
        ],
    },
    {
        id: "office",
        question: "ما هي متطلبات مكتبك؟",
        subtitle: "تؤثر نوعية المكتب على نوع الترخيص والتكاليف السنوية",
        options: [
            { value: "no_office", label: "لا حاجة لمكتب فعلي (مكتب افتراضي مقبول)", Icon: MonitorOff },
            { value: "cowork", label: "مساحة عمل مشتركة / مرنة", Icon: Armchair },
            { value: "small_office", label: "مكتب خاص صغير", Icon: Home },
            { value: "large_office", label: "مكتب كبير / مستودع / منشأة", Icon: Warehouse },
        ],
    },
    {
        id: "visa_needs",
        question: "كم عدد التأشيرات التي ستحتاجها؟",
        subtitle: "تعتمد حصة التأشيرات على نوع المكتب والمنطقة الحرة",
        options: [
            { value: "just_me", label: "نفسي فقط (تأشيرة واحدة)", Icon: UserCircle },
            { value: "small_team", label: "فريق صغير (2-5 تأشيرات)", Icon: Users },
            { value: "medium_team", label: "فريق متنامي (6-15 تأشيرة)", Icon: UserCheck },
            { value: "large_team", label: "فريق كبير (15+ تأشيرة)", Icon: Building2 },
        ],
    },
    {
        id: "budget",
        question: "ما هي الميزانية السنوية المتوقعة للتأسيس والتشغيل؟",
        subtitle: "تشمل الترخيص والتأشيرة وتكاليف المكتب",
        options: [
            { value: "budget", label: "اقتصادية (أقل من 15,000 درهم/سنويًا)", Icon: Wallet },
            { value: "mid", label: "متوسطة (15,000 - 40,000 درهم/سنويًا)", Icon: CreditCard },
            { value: "premium", label: "ممتازة (40,000 - 100,000 درهم/سنويًا)", Icon: Gem },
            { value: "enterprise", label: "شركات ضخمة (أكثر من 100,000 درهم/سنويًا)", Icon: Trophy },
        ],
    },
];

const freeZoneData: Record<string, Omit<FreeZone, 'key'>> = {
    dmcc: { name: "مركز دبي للسلع المتعددة", full: "مركز دبي للسلع المتعددة (DMCC)", best_for: ["trading", "finance", "ecommerce"], tagline: "المنطقة الحرة رقم 1 في العالم", cost: "من 12,000 درهم/سنة", visas: "حتى 6 لكل مكتب مرن", color: "#059669" },
    difc: { name: "مركز دبي المالي", full: "مركز دبي المالي العالمي (DIFC)", best_for: ["finance"], tagline: "المركز المالي للشرق الأوسط", cost: "من 25,000 درهم/سنة", visas: "مرنة", color: "#7C3AED" },
    jafza: { name: "جافزا", full: "المنطقة الحرة لجبل علي", best_for: ["trading", "logistics", "manufacturing"], tagline: "أكبر منطقة حرة قائمة على المنافذ", cost: "من 15,000 درهم/سنة", visas: "حتى 10 لكل وحدة", color: "#4A90D9" },
    dubai_silicon: { name: "واحة دبي للسيليكون", full: "واحة دبي للسيليكون", best_for: ["tech"], tagline: "مركز التكنولوجيا والابتكار", cost: "من 10,000 درهم/سنة", visas: "حتى 6 لكل مساحة", color: "#DC2626" },
    twofour54: { name: "twofour54", full: "twofour54 أبوظبي", best_for: ["media"], tagline: "أهم منطقة حرة للإعلام في الإمارات", cost: "من 9,000 درهم/سنة", visas: "حتى 3 لكل باقة", color: "#EA580C" },
    shams: { name: "مدينة الشارقة للإعلام (SHAMS)", full: "مدينة الشارقة للإعلام", best_for: ["media", "ecommerce", "consulting"], tagline: "المنطقة الحرة الأفضل من حيث التكلفة", cost: "من 5,750 درهم/سنة", visas: "حتى 3 لكل باقة", color: "#D97706" },
    ifza: { name: "إيفزا (IFZA)", full: "المنطقة الحرة الدولية (IFZA)", best_for: ["consulting", "ecommerce", "tech"], tagline: "مرنة، بأسعار معقولة وسريعة", cost: "من 7,900 درهم/سنة", visas: "حتى 6 لكل باقة", color: "#2563EB" },
};

// ─── Recommendation engine ────────────────────────────────────────────────────
function getRecommendation(answers: Record<string, string>): Result {
    const { business_type, target_market, ownership, office, visa_needs, budget } = answers;

    if (ownership === "holding" || (target_market === "international" && office === "no_office" && budget === "budget")) {
        return {
            type: "offshore", primary: "شركة خارجية (أوفشور)", icon: FileCheck, color: "#EA580C", score: 95,
            why: "أولوياتك - حماية الأصول وتقليل النفقات والعمليات الدولية - تتناسب تمامًا مع الهيكل الخارجي (أوفشور).",
            pros: ["أقل تكاليف الإعداد والتشغيل", "الخصوصية والسرية الكاملة", "لا توجد متطلبات لتدقيق الحسابات", "إمكانية فتح حسابات بنكية دولية", "لا حاجة لمكتب فعلي"],
            cons: ["لا يُسمح بممارسة التجارة داخل الإمارات", "لا تمنح تأشيرة إقامة في الإمارات", "خيارات مصرفية محدودة داخل الإمارات", "غير مناسبة للأعمال التجارية المحلية"],
            freeZoneRecs: [], cta: "تأسيس شركة خارجية (Offshore)",
        };
    }

    if (target_market === "uae_local" || ownership === "branch" || office === "large_office" || visa_needs === "large_team" || budget === "enterprise") {
        return {
            type: "mainland", primary: "شركة البر الرئيسي (LLC)", icon: Building2, color: "#C28667", score: 92,
            why: "مع وجود عملاء محليين، متطلبات فريق العمل الكبير، أو المشاريع الحكومية، يمنحك ترخيص البر الرئيسي حرية الوصول للسوق بدون قيود.",
            pros: ["تداول بحرية كاملة في أي مكان في الإمارات", "مؤهل للحصول على العقود الحكومية", "لا توجد قيود على موقع المكتب", "حصة تأشيرات غير محدودة (مرتبطة بالمكتب)", "وصول كامل للسوق الإماراتي المحلي"],
            cons: ["تكلفة التأسيس أعلى من المناطق الحرة", "يخضع للوائح دائرة التنمية الاقتصادية", "يتطلب وجود مكتب مسجل في الإمارات", "عملية التأسيس أكثر تعقيدًا"],
            freeZoneRecs: [], cta: "تأسيس شركة البر الرئيسي",
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
        type: "freezone", primary: "شركة في منطقة حرة", icon: Globe, color: "#4A90D9", score: 88,
        why: `شركة المنطقة الحرة هي الأمثل لعملك في مجال ${business_type} — خاصة مع التركيز الدولي، والملكية بنسبة 100%، وخيارات المكاتب المرنة.`,
        pros: ["ملكية أجنبية 100%", "إعفاء الجمارك على أنشطة الاستيراد والتصدير ضمن المنطقة", "تأسيس سريع ومبسط (3 إلى 7 أيام)", "مرونة في خيارات المكاتب (الافتراضية إلى الكبيرة)", "هيكلة مالية معفية من الكثير من الضرائب"],
        cons: ["لا يمكن المتاجرة المباشرة في البر الرئيسي بدون موزع معتمد", "تقتصر العمليات على المنطقة الحرة أو للأسواق الدولية", "لكل منطقة حرة لوائح خاصة بها", "بعض المناطق الحرة لديها خيارات محدودة في البنوك المحلية"],
        freeZoneRecs: recommended.slice(0, 3), cta: "تأسيس شركة في منطقة حرة",
    };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SetupQuizAR({ onComplete }: { onComplete?: (type: string) => void }) {
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
        <div className="w-full max-w-3xl mx-auto" dir="rtl">
            {!result ? (
                <div>
                    {/* Progress */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white/50 text-sm font-medium">السؤال {currentQ + 1} من {questions.length}</span>
                            <span className="text-[#C28667] text-sm font-black">{Math.round(progress)}% اكتمل</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden" dir="ltr">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: "linear-gradient(90deg, #d4957a, #C28667)" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQ}
                            initial={{ opacity: 0, x: animDir * -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: animDir * 40 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-header font-black text-white text-2xl md:text-3xl mb-2 tracking-tight leading-tight">
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
                                            className="flex items-center gap-4 p-4 rounded-xl border text-right transition-all duration-200"
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
                            <ArrowRight size={15} /> عودة
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
                                        <p className="text-white/40 text-xs font-black tracking-widest mb-1">توصيتنا لك</p>
                                        <h3 className="font-header font-black text-white text-2xl tracking-tight">{result.primary}</h3>
                                    </div>
                                </div>
                                <div className="text-left flex-shrink-0 mr-4">
                                    <div className="font-header font-black text-3xl" style={{ color: result.color }}>{result.score}%</div>
                                    <p className="text-white/30 text-[10px] font-black tracking-widest">نسبة التطابق</p>
                                </div>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">{result.why}</p>
                        </div>

                        {/* Pros & Cons */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-5">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <h4 className="text-emerald-400 font-black text-xs tracking-widest mb-3 flex items-center gap-2">
                                    <CheckCircle2 size={14} /> المميزات
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
                                <h4 className="text-rose-400 font-black text-xs tracking-widest mb-3 flex items-center gap-2">
                                    <Shield size={14} /> اعتبارات
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
                                <h4 className="text-white font-black text-xs tracking-widest mb-3 flex items-center gap-2">
                                    <Star size={13} style={{ color: "#C28667" }} /> المناطق الحرة الموصى بها
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
                                                <span className="inline-block text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full mb-2"
                                                    style={{ background: `${fz.color}25`, color: fz.color }}>
                                                    أفضل تطابق
                                                </span>
                                            )}
                                            <h5 className="font-header font-black text-white text-sm mb-0.5">{fz.name}</h5>
                                            <p className="text-white/30 text-[10px] font-medium mb-3">{fz.tagline}</p>
                                            <div className="space-y-1.5 direction-rtl">
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
                                className="flex-1 py-3.5 rounded-xl font-black text-sm tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-90"
                                style={{ background: result.color, color: result.type === "mainland" ? "#0A1628" : "#fff" }}
                            >
                                <ArrowLeft size={15} /> {result.cta}
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3.5 rounded-xl font-black text-sm tracking-widest flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <RotateCcw size={14} /> إعادة الاختبار
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
