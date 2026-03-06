'use client';

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Globe, FileCheck,
    Info, ArrowLeft,
    CheckCircle2,
    Package, Laptop, Briefcase, BarChart3, ShoppingCart,
    Flag, Globe2, Plane, Wallet, CreditCard, Gem, X
} from "lucide-react";
import FreeZoneQuizAR from "./FreeZoneQuizAR";
import SetupQuizAR from "./SetupQuizAR";
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

// ─── Data & Constants ────────────────────────────────────────────────────────

const companyTypes = [
    { id: "mainland", label: "البر الرئيسي", icon: Building2, color: "#CC8667", desc: "وصول كامل للسوق الإماراتي" },
    { id: "freezone", label: "منطقة حرة", icon: Globe, color: "#4A90D9", desc: "ملكية أجنبية 100%" },
    { id: "offshore", label: "خارجية (أوفشور)", icon: FileCheck, color: "#EA580C", desc: "حماية الأصول" },
];

const freeZones = [
    { id: "shams", name: "مدينة الشارقة للإعلام (SHAMS)", license: 6885, renewal: 6885, visaCost: 6000, maxVisas: 3, color: "#D97706" },
    { id: "ifza", name: "إيفزا (IFZA)", license: 12900, renewal: 12900, visaCost: 3000, maxVisas: 6, color: "#2563EB" },
    { id: "meydan", name: "المنطقة الحرة بميدان", license: 12520, renewal: 12780, visaCost: 7480, maxVisas: 6, color: "#0F766E" },
    { id: "rakez", name: "راكز (RAKEZ)", license: 6010, renewal: 6010, visaCost: 4300, maxVisas: 6, color: "#B45309" },
    { id: "ajman", name: "منطقة عجمان الحرة", license: 4888, renewal: 4888, visaCost: 4500, maxVisas: 6, color: "#7C3AED" },
    { id: "spc", name: "المنطقة الحرة للمدينة الجامعية (SPC)", license: 6885, renewal: 6885, visaCost: 7155, maxVisas: 6, color: "#0369A1" },
    { id: "dwc", name: "دبي الجنوب (DWC)", license: 12540, renewal: 12540, visaCost: 7580, maxVisas: 6, color: "#374151" },
    { id: "dubai_silicon", name: "واحة دبي للسيليكون", license: 10000, renewal: 10000, visaCost: 3700, maxVisas: 6, color: "#DC2626" },
    { id: "dmcc", name: "مركز دبي للسلع المتعددة (DMCC)", license: 12000, renewal: 12000, visaCost: 3500, maxVisas: 6, color: "#059669" },
    { id: "jafza", name: "جافزا", license: 15000, renewal: 15000, visaCost: 3800, maxVisas: 10, color: "#4A90D9" },
    { id: "difc", name: "مركز دبي المالي (DIFC)", license: 25000, renewal: 25000, visaCost: 4500, maxVisas: 20, color: "#7C3AED" },
];

const officeTypes = {
    mainland: [
        { id: "flexi", label: "مكتب مرن", setupCost: 0, annualCost: 8000, desc: "مساحة عمل مشتركة" },
        { id: "small", label: "مكتب صغير", setupCost: 5000, annualCost: 35000, desc: "حتى 200 قدم مربع" },
    ],
    freezone: [
        { id: "virtual", label: "مكتب افتراضي", setupCost: 0, annualCost: 1500, desc: "عنوان فقط" },
        { id: "flexi", label: "مكتب مرن", setupCost: 0, annualCost: 5000, desc: "مساحة عمل مشتركة" },
    ],
    offshore: [
        { id: "registered", label: "عنوان مسجل", setupCost: 0, annualCost: 0, desc: "مشمول في الباقة" },
    ],
};

const timelines = {
    mainland: [
        { step: "الموافقة المبدئية", duration: "24 ساعة", desc: "تدقيق حكومي للنشاط والشركاء" },
        { step: "حجز الاسم التجاري", duration: "ساعة واحدة", desc: "تأمين اسم الكيان القانوني" },
        { step: "توقيع عقد التأسيس", duration: "24 ساعة", desc: "توقيع الميثاق من كاتب العدل/رقمياً" },
        { step: "إصدار الرخصة", duration: "ساعتان", desc: "الدفع وتسليم الرخصة رقمياً" },
    ],
    freezone: [
        { step: "إعداد البوابة", duration: "24 ساعة", desc: "التسجيل في نظام السلطة المحددة" },
        { step: "التحقق", duration: "48 ساعة", desc: "العناية الواجبة وفحص المستندات" },
        { step: "إصدار الرخصة", duration: "24 ساعة", desc: "الشهادة وتفعيل القنوات الإلكترونية" },
        { step: "معالجة التأشيرة", duration: "72 ساعة", desc: "الطبية والهوية والختم (إذا لزم الأمر)" },
    ],
    offshore: [
        { step: "الطلب", duration: "ساعتان", desc: "تقديم تفاصيل الهيكل المطلوب" },
        { step: "دخول السجل", duration: "48 ساعة", desc: "التسجيل مع راك أوفشور أو جافزا" },
        { step: "تسليم الشهادة", duration: "ساعة واحدة", desc: "شهادة التأسيس الرقمية" },
    ]
};



const GOV_FEES = { mainland: 5000, freezone: 1200, offshore: 800 };
const OFFSHORE_LICENSE = { setup: 8000, renewal: 5000 };
const MAINLAND_LICENSE = { setup: 15000, renewal: 12000 };
const VISA_GOVT_FEE = 1200;

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <p className="text-white/50 text-sm font-semibold mb-3">{children}</p>;
}

function OptionCard({ selected, onClick, color, children, disabled }: any) {
    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.01 } : {}}
            whileTap={!disabled ? { scale: 0.99 } : {}}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            className={`relative w-full text-right p-5 rounded-xl border transition-all duration-300 ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
            style={{
                background: selected ? `${color}10` : "rgba(255,255,255,0.03)",
                borderColor: selected ? color : "rgba(255,255,255,0.05)",
            }}
        >
            {selected && (
                <motion.div
                    layoutId="selected-indicator-ar"
                    className="absolute inset-0 rounded-xl border-2 pointer-events-none"
                    style={{ borderColor: color }}
                />
            )}
            {children}
        </motion.button>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IntelligenceSectionAR() {
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
        const fzGovFee = visaCount === 0 ? 0 : govFee;
        const visaSetup = visaCount * fzData.visaCost;
        const visaAnnual = visaCount * (fzData.visaCost * 0.6 + VISA_GOVT_FEE);
        return {
            setup: { license: fzData.license, visa: visaSetup, office: office.setupCost, gov: fzGovFee },
            annual: { license: fzData.renewal, visa: Math.round(visaAnnual), office: office.annualCost, gov: fzGovFee },
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
                custom_service_enquired: "Business Setup (Arabic)",
                custom_client_profile_and_requirement: `[Cost Calculator AR] Type: ${companyType} | Auth: ${authName} | Visas: ${visaCount} | View: ${calcView} | Total: AED ${displayedTotal.toLocaleString()}`,
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
        <section className="py-12 md:py-16 px-4 sm:px-8 bg-brand-navy text-white overflow-hidden relative" dir="rtl">
            {/* Decorative Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-copper/5 blur-[100px] pointer-events-none rounded-full" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold tracking-[0.2em] text-[#c28867]"
                    >
                        أدوات تفاعلية
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-4xl md:text-5xl font-bold font-header text-white"
                    >
                        لا تأخذ بكلام أي شخص — تأكد بنفسك.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
                    >
                        استخدم أدواتنا المجانية لحساب التكاليف، والتحقق من الأهلية، والاطلاع على العملية، ومقارنة الهياكل.
                    </motion.p>
                    <div className="flex flex-col sm:flex-row sm:inline-flex w-full sm:w-auto bg-white/5 p-1 rounded-xl border border-white/10 mb-4 mt-2 gap-1 sm:gap-0 font-header">
                        <button
                            onClick={() => setActiveTab("quiz")}
                            className={`px-5 py-3 sm:py-2.5 rounded-lg text-xs font-black tracking-widest transition-all w-full sm:w-auto ${activeTab === "quiz" ? 'bg-brand-copper text-brand-navy' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            اختبار التأسيس
                        </button>
                        <button
                            onClick={() => setActiveTab("calculator")}
                            className={`px-5 py-3 sm:py-2.5 rounded-lg text-xs font-black tracking-widest transition-all w-full sm:w-auto ${activeTab === "calculator" ? 'bg-brand-copper text-brand-navy' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            حاسبة التكاليف
                        </button>
                        <button
                            onClick={() => setActiveTab("freezone")}
                            className={`px-5 py-3 sm:py-2.5 rounded-lg text-xs font-black tracking-widest transition-all w-full sm:w-auto ${activeTab === "freezone" ? 'bg-brand-copper text-brand-navy' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            دليل المنطقة الحرة
                        </button>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-12 backdrop-blur-3xl shadow-2xl min-h-[500px]">
                    {activeTab === "freezone" ? (
                        <FreeZoneQuizAR />
                    ) : activeTab === "quiz" ? (
                        <SetupQuizAR onComplete={(type) => {
                            setCompanyType(type);
                            setActiveTab("calculator");
                        }} />
                    ) : (
                        <>
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
                                <div className="w-full lg:flex-[3] space-y-8">
                                    <div>
                                        <SectionLabel>هيكل التأسيس</SectionLabel>
                                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                            {companyTypes.map((ct) => (
                                                <OptionCard
                                                    key={ct.id}
                                                    selected={companyType === ct.id}
                                                    onClick={() => setCompanyType(ct.id)}
                                                    color={ct.color}
                                                >
                                                    <div className="flex flex-col items-center gap-3 text-center">
                                                        <ct.icon size={20} style={{ color: companyType === ct.id ? '#fff' : ct.color }} />
                                                        <div className="text-sm font-semibold text-white">{ct.label}</div>
                                                    </div>
                                                </OptionCard>
                                            ))}
                                        </div>
                                    </div>

                                    {companyType === "freezone" && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <SectionLabel>اختيار السلطة</SectionLabel>
                                            <div className="grid sm:grid-cols-2 gap-2">
                                                {freeZones.map((fz) => (
                                                    <button
                                                        key={fz.id}
                                                        onClick={() => setSelectedFZ(fz.id)}
                                                        className={`p-3 rounded-lg border text-right flex justify-between items-center transition-all ${selectedFZ === fz.id ? 'bg-white/10 border-brand-copper' : 'bg-white/5 border-white/5 opacity-50'}`}
                                                    >
                                                        <span className="text-sm font-semibold text-white truncate max-w-[70%]">{fz.name}</span>
                                                        <span className="text-sm font-semibold text-brand-copper whitespace-nowrap" dir="ltr">{fz.license.toLocaleString()} درهم</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    <div>
                                        <SectionLabel>تأشيرات ({visaCount})</SectionLabel>
                                        <input
                                            type="range" min="0" max="10" value={visaCount}
                                            onChange={(e) => setVisaCount(parseInt(e.target.value))}
                                            className="w-full h-1 bg-white/10 rounded-full appearance-none accent-brand-copper cursor-pointer mb-3"
                                            dir="ltr"
                                        />
                                        <div className="flex justify-between text-sm font-medium text-white/30">
                                            <span>0 تأشيرات</span>
                                            <span>معالجة ذات أولوية</span>
                                            <span>10+ تأشيرات</span>
                                        </div>
                                    </div>

                                </div>

                                <div className="w-full lg:flex-[2] lg:sticky lg:top-24">
                                    <div className="bg-[#1a2b45] border border-white/10 rounded-2xl p-6 shadow-2xl">
                                        <div className="flex border-b border-white/5 mb-6">
                                            <button onClick={() => setCalcView("setup")} className={`flex-1 pb-3 text-sm font-semibold transition-all ${calcView === "setup" ? 'text-brand-copper border-b-2 border-brand-copper' : 'text-white/30'}`}>تكلفة التأسيس</button>
                                            <button onClick={() => setCalcView("annual")} className={`flex-1 pb-3 text-sm font-semibold transition-all ${calcView === "annual" ? 'text-brand-copper border-b-2 border-brand-copper' : 'text-white/30'}`}>التجديد السنوي</button>
                                        </div>
                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-white/50">الرخصة التجارية</span>
                                                <span className="text-sm font-bold text-white" dir="ltr">{calc[calcView].license.toLocaleString()} درهم</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-white/50">تأشيرات ({visaCount})</span>
                                                <span className="text-sm font-bold text-white" dir="ltr">{calc[calcView].visa.toLocaleString()} درهم</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-white/50">حكومية وإدارية</span>
                                                <span className="text-sm font-bold text-white" dir="ltr">
                                                    {calc[calcView].gov === 0 ? 'مجاني' : `${calc[calcView].gov.toLocaleString()} درهم`}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="pt-6 border-t border-brand-copper/30 mb-6">
                                            <div className="text-sm font-semibold text-brand-copper mb-1.5 align-right">إجمالي {calcView === 'setup' ? 'الاستثمار' : 'الصيانة'}</div>
                                            <div className="text-3xl font-header font-black text-white tracking-tighter" dir="ltr">{displayedTotal.toLocaleString()} درهم</div>
                                            <div className="text-xs font-medium text-white/30 mt-1.5 align-right">100٪ شفافة · بدون رسوم خفية</div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setFormData({ firstName: '', lastName: '', email: '', whatsapp: '' });
                                                setSubmitted(false);
                                                setSubmitError(null);
                                                setIsModalOpen(true);
                                            }}
                                            className="btn-primary w-full justify-center flex font-header"
                                        >
                                            احصل على تسعيرة دقيقة <ArrowLeft className="mr-2 w-4 h-4" />
                                        </button>

                                        <div className="mt-6 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
                                            <Info size={12} className="text-brand-copper" />
                                            <p className="text-[10px] font-bold text-white/30 leading-none tracking-tight font-header">تقديرات فقط. عرضة للتحديثات الحكومية.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Roadmap — full width, always last */}
                            <div className="mt-8 pt-8 border-t border-white/5 overflow-hidden">
                                <SectionLabel>خريطة الطريق ({timelines[companyType as keyof typeof timelines].length} خطوات)</SectionLabel>
                                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
                                    {timelines[companyType as keyof typeof timelines].map((t, i, arr) => (
                                        <div key={i} className="flex flex-col relative min-w-[140px] flex-1 snap-start group text-right">
                                            {i < arr.length - 1 && (
                                                <div className="absolute top-3 right-6 w-[calc(100%+1rem)] h-px bg-white/10" />
                                            )}
                                            <div className="w-6 h-6 rounded-full border border-brand-copper/30 bg-[#0d1627] flex items-center justify-center text-[8px] font-black text-brand-copper group-hover:bg-brand-copper group-hover:text-brand-navy transition-all shrink-0 shadow-lg relative z-10 mb-3 ml-auto">
                                                {i + 1}
                                            </div>
                                            <div className="flex flex-col items-end gap-1.5 mb-1.5">
                                                <h4 className="text-sm font-semibold text-white leading-tight pl-4">{t.step}</h4>
                                                <div className="inline-flex items-center justify-center px-2 py-0.5 bg-brand-copper/10 text-brand-copper text-[10px] font-semibold rounded-full w-fit mb-0.5">{t.duration}</div>
                                            </div>
                                            <p className="text-[11px] font-medium text-white/40 leading-relaxed pl-2">{t.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Quote Modal */}
            {
                mounted && createPortal(
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
                                    className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
                                    style={{ borderTop: '4px solid #C28667' }}
                                >
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="absolute top-4 left-4 p-2 text-brand-navy/40 hover:text-brand-navy hover:bg-slate-100 rounded-full transition-colors z-10"
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
                                                    تم استلام طلب التسعيرة الخاص بك.<br />سيتصل بك أحد الخبراء قريبًا.
                                                </p>
                                                <button onClick={() => setIsModalOpen(false)} className="mt-8 text-sm font-bold tracking-widest hover:underline" style={{ color: '#C28667' }}>إغلاق النافذة</button>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                <div className="mb-8 p-1">
                                                    <h3 className="text-xl font-black text-brand-navy tracking-tight mb-2">احصل على تسعيرتك الدقيقة</h3>
                                                    <p className="text-brand-navy/50 text-xs font-medium">
                                                        لـ {companyType === 'freezone' ? (freeZones.find((f) => f.id === selectedFZ)?.name || '') : (companyTypes.find((f) => f.id === companyType)?.label || companyType)} بـ {visaCount} تأشيرة/تأشيرات
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
                                                        {isSubmitting ? 'جاري المعالجة...' : <><ArrowLeft size={16} /> إرسال طلب عرض السعر</>}
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
                )
            }
        </section >
    );
}
