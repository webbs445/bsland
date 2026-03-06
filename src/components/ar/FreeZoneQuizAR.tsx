'use client';
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight, ArrowLeft, Trophy, RotateCcw,
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

const quizSteps = [
    {
        id: 1,
        question: "ما هو نشاط عملك الرئيسي؟",
        options: [
            { label: "تقنية / تجارة إلكترونية", value: "tech", icon: Laptop },
            { label: "تجارة / عامة", value: "trading", icon: Package },
            { label: "إعلام / تسويق", value: "media", icon: Megaphone },
            { label: "لوجستيات / شحن", value: "logistics", icon: Truck },
            { label: "خدمات مهنية", value: "consulting", icon: Briefcase },
        ],
    },
    {
        id: 2,
        question: "ما هي ميزانيتك الأولية للتأسيس؟",
        options: [
            { label: "أقل من 20,000 درهم", value: "low", icon: Wallet },
            { label: "20,000 – 30,000 درهم", value: "mid", icon: CreditCard },
            { label: "30,000 – 45,000 درهم", value: "high", icon: Landmark },
            { label: "45,000+ درهم", value: "premium", icon: Gem },
        ],
    },
    {
        id: 3,
        question: "هل تحتاج إلى مكتب فعلي الآن؟",
        options: [
            { label: "نعم، أحتاج إلى مكتب/مساحة", value: "physical", icon: Building2 },
            { label: "لا، المكتب المرن (Flexi-desk) يكفي", value: "flexi", icon: LayoutGrid },
        ],
    },
    {
        id: 4,
        question: "كم عدد التأشيرات التي تحتاجها في السنة الأولى؟",
        options: [
            { label: "1 (بمفردي)", value: "1", icon: User },
            { label: "2–3", value: "2-3", icon: Users },
            { label: "4–5", value: "4-5", icon: UsersRound },
            { label: "5+", value: "5+", icon: Building2 },
        ],
    },
];

const introSteps = [
    { icon: Activity, label: "النشاط" },
    { icon: BadgeDollarSign, label: "الميزانية" },
    { icon: Home, label: "المكتب" },
    { icon: ClipboardList, label: "التأشيرات" },
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
        results.push({ name: "مدينة الشارقة للإعلام (SHAMS)", match: 95, cost: "من 22,500 درهم", visas: "2", why: "مثالية للأنشطة الإبداعية والتقنية مع باقات اقتصادية متكاملة." });
    if (["trading", "tech", "consulting"].includes(activity) && ["mid", "high"].includes(budget))
        results.push({ name: "إيفزا (IFZA)", match: 88, cost: "من 24,000 درهم", visas: "3", why: "قيمة ممتازة تشمل 3 تأشيرات وخيارات مكاتب مرنة تتناسب مع احتياجاتك." });
    if (["consulting"].includes(activity) && ["low", "mid"].includes(budget) && visas === "1")
        results.push({ name: "مجمّع رأس الخيمة (RAK ICC)", match: 92, cost: "من 16,000 درهم", visas: "1-2", why: "الخيار الأكثر توفيرًا، مثالي للمستشارين المستقلين." });
    if (["tech", "trading"].includes(activity) && ["low", "mid"].includes(budget))
        results.push({ name: "المنطقة الحرة (SPC)", match: 85, cost: "من 18,000 درهم", visas: "2", why: "متخصصة في التجارة الإلكترونية وبتكلفة دخول اقتصادية معقولة." });
    if (["premium", "high"].includes(budget))
        results.push({ name: "مركز دبي للسلع المتعددة (DMCC)", match: 90, cost: "من 35,000 درهم", visas: "3+", why: "المنطقة الحرة الأكثر شهرة في العالم مع أقوى دعم يتيح خيارات بنوك قوية للشركات ذات الميزانية العالية." });
    if (activity === "logistics")
        results.push({ name: "دبي الجنوب (Dubai South)", match: 93, cost: "من 28,000 درهم", visas: "2-3", why: "مصممة للخدمات اللوجستية لقربها من مطار آل مكتوم." });

    if (results.length === 0) {
        results.push({ name: "إيفزا (IFZA)", match: 85, cost: "من 24,000 درهم", visas: "3", why: "منطقة متعددة الاستخدامات مناسبة لمعظم الأعمال التجارية." });
        results.push({ name: "مدينة الشارقة للإعلام (SHAMS)", match: 78, cost: "من 22,500 درهم", visas: "2", why: "باقات متكاملة ميسورة التكلفة مع إمكانية التوسع والتطور." });
    }
    if (results.length === 1)
        results.push({ name: "إيفزا (IFZA)", match: 80, cost: "من 24,000 درهم", visas: "3", why: "منطقة تجارية شاملة تمنح 3 تأشيرات ضمن باقاتها." });

    return results.slice(0, 3).sort((a, b) => b.match - a.match);
}

export default function FreeZoneQuizAR() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [results, setResults] = useState<QuizResult[] | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', whatsapp: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

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

            const activityLabel = quizSteps[0].options.find(o => o.value === answers[1])?.label || answers[1];
            const budgetLabel = quizSteps[1].options.find(o => o.value === answers[2])?.label || answers[2];
            const officeLabel = quizSteps[2].options.find(o => o.value === answers[3])?.label || answers[3];
            const visasLabel = quizSteps[3].options.find(o => o.value === answers[4])?.label || answers[4];

            const profileStr = `[Free Zone Match Quiz AR] Recommend: ${selectedRecommendation || 'General'} | Activity: ${activityLabel} | Budget: ${budgetLabel} | Office: ${officeLabel} | Visas: ${visasLabel}`;

            await submitLeadAction({
                first_name: formData.firstName,
                last_name: formData.lastName,
                custom_service_enquired: "Business Setup (Arabic)",
                custom_client_profile_and_requirement: profileStr,
                email_id: formData.email,
                mobile_no: formData.whatsapp,
                country: countryName
            });
            setSubmitted(true);
        } catch (error) {
            console.error(error);
            setSubmitError("فشل إرسال الطلب. يرجى المحاولة مرة أخرى.");
        }
        finally { setIsSubmitting(false); }
    };

    return (
        <div className="max-w-2xl mx-auto" dir="rtl">
            <AnimatePresence mode="wait">
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
                                    <p className="text-white/40 text-[9px] font-black tracking-widest">الخطوة {i + 1}</p>
                                    <p className="text-white/70 text-[10px] font-black tracking-widest">{label}</p>
                                </div>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(204,134,103,0.45)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(1)}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-xs tracking-widest mx-auto"
                            style={{ background: 'linear-gradient(135deg, #CC8667, #b8734f)', color: '#0a1628', boxShadow: '0 8px 24px rgba(204,134,103,0.35)' }}
                        >
                            <ArrowLeft size={16} /> ابحث عن المنطقة الحرة المناسبة
                        </motion.button>
                        <p className="text-white/20 text-[9px] font-bold tracking-widest mt-5">لا يشترط البريد الإلكتروني · تستغرق العملية أقل من 60 ثانية</p>
                    </motion.div>
                )}

                {step > 0 && !results && (
                    <motion.div
                        key={`step-${step}`}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="flex gap-2 mb-10" dir="ltr">
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
                            السؤال {step} من {quizSteps.length}
                        </p>
                        <h3 className="font-header font-black text-white text-2xl md:text-3xl mb-8 tracking-tight leading-tight">
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

                {results && (
                    <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black tracking-widest mb-6 w-fit mx-auto"
                            style={{ background: 'rgba(204,134,103,0.12)', color: '#CC8667', border: '1px solid rgba(204,134,103,0.25)' }}>
                            <Trophy size={14} /> أفضل المناطق الحرة لك
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
                                            <h4 className="text-white font-black text-base tracking-tight">{r.name}</h4>
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest"
                                                style={i === 0
                                                    ? { background: '#CC8667', color: '#0a1628' }
                                                    : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                                                {r.match}% تطابق
                                            </span>
                                        </div>
                                        <p className="text-white/40 text-sm font-medium mb-2">{r.why}</p>
                                        <div className="flex gap-4 text-sm font-semibold">
                                            <span className="text-white/40">التكلفة: <span style={{ color: '#CC8667' }}>{r.cost}</span></span>
                                            <span className="text-white/40">التأشيرات: <span style={{ color: '#CC8667' }}>{r.visas}</span></span>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => openModal(r.name)}
                                        className="px-5 py-3 rounded-xl font-black text-[10px] tracking-widest flex items-center gap-2 shrink-0 transition-all"
                                        style={i === 0
                                            ? { background: 'linear-gradient(135deg, #CC8667, #b8734f)', color: '#0a1628', boxShadow: '0 6px 18px rgba(204,134,103,0.35)' }
                                            : { border: '1.5px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
                                    >
                                        <ArrowLeft size={13} /> احصل على تسعيرة
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={reset}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-white/12 text-white/40 hover:text-white/70 transition-all mx-auto">
                                <RotateCcw size={13} /> إعادة الاختبار
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(204,134,103,0.4)' }} whileTap={{ scale: 0.98 }}
                                onClick={() => openModal("All Matches (Consultation)")}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm mx-auto transition-all"
                                style={{ background: 'linear-gradient(135deg, #CC8667, #b8734f)', color: '#0a1628', boxShadow: '0 8px 24px rgba(204,134,103,0.3)' }}>
                                <ArrowLeft size={13} /> احجز استشارة مجانية
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {step === 0 && !results && (
                <div className="text-center mt-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-white/20 text-[9px] font-black tracking-widest">أو</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>
                    <button onClick={() => openModal("Direct Call Inquiry (Skipped Quiz)")} className="text-white/30 hover:text-white text-xs font-bold underline underline-offset-4 transition-colors">
                        احجز مكالمة تنويرية لمدة 15 دقيقة والتحدث مع خبير ←
                    </button>
                </div>
            )}

            {mounted && createPortal(
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#070E1A]/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                            dir="rtl"
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
                                    className="absolute top-4 left-4 p-2 text-brand-navy/40 hover:text-brand-navy hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
                                            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl" style={{ background: '#C28667', boxShadow: '0 20px 40px rgba(194,134,103,0.4)' }}>
                                                <CheckCircle2 className="w-10 h-10 text-white" />
                                            </div>
                                            <h4 className="text-2xl font-black text-brand-navy mb-2 tracking-tight">تم بنجاح!</h4>
                                            <p className="text-brand-navy/60 text-xs font-bold tracking-widest leading-relaxed">
                                                تم استلام نتائجك وطلب التسعيرة.<br />سيتصل بك أحد الخبراء قريبًا.
                                            </p>
                                            <button onClick={() => setIsModalOpen(false)} className="mt-8 text-sm font-bold tracking-widest hover:underline" style={{ color: '#C28667' }}>إغلاق</button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <div className="mb-8 p-1">
                                                <h3 className="text-xl font-black text-brand-navy tracking-tight mb-2">احصل على تسعيرتك الخاصة</h3>
                                                <p className="text-brand-navy/50 text-xs font-medium">
                                                    {selectedRecommendation?.includes("Direct")
                                                        ? "تحدث مع خبيرنا لتجهيز ترتيباتك المخصصة وتأسيس أعمالك."
                                                        : `طلب تفاصيل للخيارات المقترحة وباقات المكاتب في ${selectedRecommendation}`}
                                                </p>
                                            </div>
                                            <form onSubmit={handleModalSubmit} className="space-y-4">
                                                {submitError && (
                                                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-medium border border-red-100 text-center">
                                                        {submitError}
                                                    </div>
                                                )}
                                                <div className="flex gap-3">
                                                    <input type="text" placeholder="الاسم الأول" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium" />
                                                    <input type="text" placeholder="الاسم الأخير" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium" />
                                                </div>
                                                <input type="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="text-left w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium" dir="ltr" />
                                                <div className="space-y-1.5 pb-2 text-right">
                                                    <label className="text-[10px] font-black tracking-widest text-brand-navy/40 ml-1">رقم الواتساب</label>
                                                    <div dir="ltr">
                                                        <PhoneInput
                                                            international defaultCountry="AE"
                                                            value={formData.whatsapp}
                                                            onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                            className="phone-input-custom text-brand-navy w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-brand-copper focus-within:ring-1 focus-within:ring-brand-copper transition-all text-sm font-medium"
                                                            placeholder="رقم الواتساب"
                                                        />
                                                    </div>
                                                </div>
                                                <button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-xl font-black tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2" style={{ background: '#C28667', color: '#fff', boxShadow: '0 10px 30px rgba(194,134,103,0.3)', opacity: isSubmitting ? 0.7 : 1 }}>
                                                    {isSubmitting ? 'جاري المعالجة...' : <><ArrowLeft size={16} /> اطلب عرض السعر الآن</>}
                                                </button>
                                                <p className="text-center text-[10px] text-brand-navy/40 font-bold tracking-widest mt-4">آمن 100٪ • استجابة سريعة</p>
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
