"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Building2,
    Globe,
    Briefcase,
    CheckCircle2,
    Clock,
    Users,
    TrendingUp,
    Shield,
    Zap,
    Star,
    MapPin,
    ChevronLeft,
    X
} from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

const options = [
    {
        id: 1,
        key: 'mainland',
        title: 'شركة ذات مسؤولية محدودة (رئيسية)',
        subtitle: 'وصول شامل إلى سوق الإمارات بالكامل',
        description:
            'البيع لأي عميل في الإمارات، والمشاركة في المناقصات الحكومية، وافتتاح متاجر فعلية. أصولك الشخصية مفصولة قانونيًا عن الشركة لحمايتك.',
        price: '20,000',
        priceNote: 'التكلفة المبدئية / في السنة',
        badge: 'الأكثر شيوعاً',
        icon: Building2,
        accentColor: '#14253E',
        features: [
            { icon: MapPin, text: 'العمل والتجارة في أي مكان في الإمارات' },
            { icon: Users, text: 'مؤهل للمشاركة في العقود الحكومية' },
            { icon: Shield, text: 'حماية المسؤولية الشخصية' },
            { icon: TrendingUp, text: 'أنشطة تجارية غير محدودة' },
        ],
        timeline: '7–14 يوم عمل',
        visas: 'غير محدود',
        ownership: '100% (منذ 2021)',
        bestFor: 'التجزئة، المأكولات والمشروبات، التجارة، الخدمات المحلية',
    },
    {
        id: 2,
        key: 'freezone',
        title: 'شركة في المنطقة الحرة',
        subtitle: 'ملكية أجنبية 100٪',
        description:
            '0٪ ضريبة شخصية وضريبة شركات (حسب المعايير)، تحويل أرباح كامل. مثالي للتجارة الإلكترونية، البرمجيات كخدمة، الاستشارات، والشركات التي تركز على التصدير والاستيراد.',
        price: '4,888',
        priceNote: 'تبدأ من شمس / إيفزا',
        badge: 'أفضل قيمة',
        icon: Globe,
        accentColor: '#CC8667',
        features: [
            { icon: Zap, text: 'التأسيس في أسرع وقت (48 ساعة)' },
            { icon: Shield, text: 'إعفاءات ضريبية للشركات والأفراد' },
            { icon: TrendingUp, text: 'تحويل كامل للأرباح 100%' },
            { icon: Globe, text: 'أكثر من 3,000 نشاط מسموح' },
        ],
        timeline: '2–5 أيام عمل',
        visas: '1–6 لكل رخصة',
        ownership: '100٪ أجنبية',
        bestFor: 'التجارة الإلكترونية، البرمجيات كخدمة، الاستشارات، التصدير',
    },
    {
        id: 3,
        key: 'professional',
        title: 'الرخصة المهنية',
        subtitle: 'للمستقلين والمتخصصين (Freelancers)',
        description:
            'مثالي للاستشاريين المستقلين ومتخصصي تكنولوجيا المعلومات ومقدمي الخدمات. هيكل بسيط، وأقل التكاليف الممكنة، ولا يشترط وجود شريك كفيل.',
        price: '12,500',
        priceNote: 'باقة شاملة',
        badge: null,
        icon: Briefcase,
        accentColor: '#4A90D9',
        features: [
            { icon: Star, text: 'أقل تكلفة للبدء' },
            { icon: Clock, text: 'أسرع إجراءات للمعالجة' },
            { icon: Briefcase, text: 'يشمل الأنشطة المهنية والخدمية' },
            { icon: Shield, text: 'لا يشترط وجود شريك كفيل' },
        ],
        timeline: '3–7 أيام عمل',
        visas: '1–3 لكل رخصة',
        ownership: 'ملكية كاملة 100%',
        bestFor: 'الاستشاريون، المستقلون، خدمات تكنولوجيا المعلومات',
    },
];

export default function SetupOptionsAR() {
    const [hovered, setHovered] = useState(options[1]);
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
                custom_service_enquired: "Business Setup (Arabic)",
                custom_client_profile_and_requirement: `[Setup Options AR] Selected Path: ${hovered.title}`,
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

    const renderDetailView = (opt: typeof options[0], isMobile = false) => (
        <div className={isMobile ? "p-6 sm:p-8" : "p-10"} dir="rtl">
            <h3 className={`font-black mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`} style={{ color: opt.accentColor }}>
                {opt.title}
            </h3>
            <p className="text-[#14253E]/60 leading-relaxed mb-8 text-sm lg:text-base">
                {opt.description}
            </p>
            <div className={`grid gap-3 lg:gap-4 mb-8 lg:mb-10 ${isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
                {opt.features.map(({ icon: FIcon, text }) => (
                    <div key={text} className="flex items-center gap-3 p-3 lg:p-4 rounded-xl lg:rounded-2xl" style={{ background: `${opt.accentColor}08` }}>
                        <FIcon size={16} className="shrink-0" style={{ color: opt.accentColor }} />
                        <span className="text-xs lg:text-sm font-semibold text-[#14253E] text-right">
                            {text}
                        </span>
                    </div>
                ))}
            </div>
            <div className={`grid gap-4 sm:gap-6 text-center mb-8 lg:mb-10 divide-y sm:divide-y-0 sm:divide-x-reverse sm:divide-x divide-gray-100 ${isMobile ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-3'}`}>
                <div className="pt-3 sm:pt-0 border-l border-gray-100 last:border-0 sm:border-t-0">
                    <div className="text-[10px] lg:text-xs tracking-widest text-[#14253E]/40 mb-1">المدة الزمنية</div>
                    <div className="font-bold text-[#14253E] text-sm lg:text-base">{opt.timeline}</div>
                </div>
                <div className="pt-3 sm:pt-0 border-l border-gray-100 last:border-0 sm:border-t-0">
                    <div className="text-[10px] lg:text-xs tracking-widest text-[#14253E]/40 mb-1">التأشيرات</div>
                    <div className="font-bold text-[#14253E] text-sm lg:text-base" dir="ltr">{opt.visas}</div>
                </div>
                <div className="pt-3 sm:pt-0 border-l border-gray-100 last:border-0 sm:border-t-0">
                    <div className="text-[10px] lg:text-xs tracking-widest text-[#14253E]/40 mb-1">الملكية</div>
                    <div className="font-bold text-[#14253E] text-sm lg:text-base" dir="ltr">{opt.ownership}</div>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setSubmitted(false);
                    setIsModalOpen(true);
                }}
                className="w-full h-14 rounded-2xl font-black tracking-widest text-xs lg:text-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{ background: opt.accentColor, color: '#fff', boxShadow: `0 15px 40px ${opt.accentColor}40` }}
            >
                ابدأ الآن مع {opt.title} <ArrowLeft size={16} />
            </button>
        </div>
    );

    return (
        <section className="relative py-16 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-white to-[#f7f8fa] overflow-hidden" dir="rtl">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(204,134,103,0.08),transparent_40%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold tracking-[0.1em] text-[#c28867]"
                    >
                        خيارات التأسيس المتاحة لك
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-4xl md:text-5xl font-bold text-gray-900"
                    >
                        ثلاثة مسارات للأعمال في دبي
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        كل شركة تختلف عن الأخرى. استكشف خياراتك واختر الهيكل الذي يناسب طموحاتك وميزانيتك.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

                    {/* RIGHT (Tabs/Accordion) */}
                    <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-5">
                        {options.map((opt) => {
                            const Icon = opt.icon;
                            const isActive = hovered.id === opt.id;

                            return (
                                <div key={opt.id} className="flex flex-col">
                                    <motion.div
                                        onHoverStart={() => setHovered(opt)}
                                        onClick={() => setHovered(opt)}
                                        whileHover={{ y: -3 }}
                                        animate={{ scale: isActive ? 1.02 : 1 }}
                                        transition={{ type: 'spring', stiffness: 250 }}
                                        className="relative rounded-3xl p-6 lg:p-7 cursor-pointer transition-all duration-300"
                                        style={{
                                            background: isActive ? `${opt.accentColor}10` : 'white',
                                            border: `1.5px solid ${isActive ? opt.accentColor + '40' : 'rgba(20,37,62,0.06)'}`,
                                            boxShadow: isActive
                                                ? `0 20px 60px ${opt.accentColor}20`
                                                : '0 4px 18px rgba(0,0,0,0.04)',
                                        }}
                                    >
                                        {opt.badge && (
                                            <div
                                                className="absolute -top-3 left-5 text-[9px] font-black tracking-widest px-3 py-1 rounded-full text-white"
                                                style={{ background: opt.accentColor }}
                                            >
                                                {opt.badge}
                                            </div>
                                        )}

                                        <div className="flex items-start gap-5">
                                            <div
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                                style={{
                                                    background: `${opt.accentColor}15`,
                                                }}
                                            >
                                                <Icon size={22} style={{ color: opt.accentColor }} />
                                            </div>

                                            <div className="flex-1 text-right">
                                                <h3
                                                    className="font-bold text-lg mb-1"
                                                    style={{ color: opt.accentColor }}
                                                >
                                                    {opt.title}
                                                </h3>

                                                <p className="text-xs text-[#14253E]/50 font-semibold mb-3 tracking-wide">
                                                    {opt.subtitle}
                                                </p>

                                                <div className="text-xl font-black text-[#14253E]" dir="ltr">
                                                    AED {opt.price}
                                                </div>
                                                <div className="text-[10px] text-[#14253E]/40 font-bold tracking-widest">
                                                    {opt.priceNote}
                                                </div>
                                            </div>

                                            <ChevronLeft
                                                size={18}
                                                style={{
                                                    color: opt.accentColor,
                                                    transform: `rotate(${isActive ? '-90deg' : '0deg'})`,
                                                    transition: 'transform 0.3s ease'
                                                }}
                                                className="lg:!rotate-0 lg:opacity-50 shrink-0 mt-3"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Mobile Accordion Details */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="lg:hidden overflow-hidden"
                                            >
                                                <div className="mt-4 rounded-3xl bg-white border border-[#14253E]/10 shadow-lg">
                                                    {renderDetailView(opt, true)}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* LEFT PANEL (Desktop) */}
                    <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-28">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={hovered.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-3xl bg-white border border-[#14253E]/10 shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden"
                            >
                                {renderDetailView(hovered, false)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
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
                            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#14253E]/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                            dir="rtl"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                                style={{ borderTop: `4px solid ${hovered.accentColor}` }}
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 left-4 p-2 text-[#14253E]/40 hover:text-[#14253E] hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                {submitted ? (
                                    <div className="text-center py-10">
                                        <div
                                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                                            style={{ background: hovered.accentColor, boxShadow: `0 20px 40px ${hovered.accentColor}40` }}
                                        >
                                            <CheckCircle2 className="w-10 h-10 text-white" />
                                        </div>
                                        <h4 className="text-2xl font-black text-[#14253E] mb-2 tracking-tight">النجاح!</h4>
                                        <p className="text-[#14253E]/60 text-xs font-bold tracking-widest leading-relaxed">
                                            تم إرسال دليل تأسيس {hovered.title} الخاص بك.<br />سيقوم أحد المتخصصين بالاتصال بك قريباً.
                                        </p>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="mt-8 text-sm font-bold tracking-widest hover:underline"
                                            style={{ color: hovered.accentColor }}
                                        >
                                            إغلاق النافذة
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-black text-[#14253E] tracking-tight mb-2">
                                                ابدأ في تأسيس {hovered.title}
                                            </h3>
                                            <p className="text-[#14253E]/50 text-sm font-medium">
                                                أدخل التفاصيل أدناه وسنرسل لك التفاصيل كاملة والأسعار الدقيقة.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4 text-right">
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="الاسم الأول"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#14253E] placeholder:text-[#14253E]/40 rounded-xl outline-none focus:border-[#CC8667] focus:ring-1 focus:ring-[#CC8667] transition-all text-sm font-medium"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="الاسم الأخير"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#14253E] placeholder:text-[#14253E]/40 rounded-xl outline-none focus:border-[#CC8667] focus:ring-1 focus:ring-[#CC8667] transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="البريد الإلكتروني"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-[#14253E] placeholder:text-[#14253E]/40 rounded-xl outline-none focus:border-[#CC8667] focus:ring-1 focus:ring-[#CC8667] transition-all text-sm font-medium text-left"
                                                dir="ltr"
                                            />
                                            <div className="space-y-1.5 pb-2">
                                                <label className="text-[10px] font-black tracking-widest text-[#14253E]/40 ml-1 block text-right">
                                                    رقم الواتساب
                                                </label>
                                                <div dir="ltr">
                                                    <PhoneInput
                                                        international
                                                        defaultCountry="AE"
                                                        value={formData.whatsapp}
                                                        onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                        className="phone-input-custom text-[#14253E] w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#CC8667] focus-within:ring-1 focus-within:ring-[#CC8667] transition-all text-sm font-medium text-left"
                                                        placeholder="رقم الواتساب"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-14 rounded-xl font-black tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                                                style={{
                                                    background: hovered.accentColor,
                                                    color: '#fff',
                                                    boxShadow: `0 10px 30px ${hovered.accentColor}30`,
                                                    opacity: isSubmitting ? 0.7 : 1
                                                }}
                                            >
                                                {isSubmitting ? 'جاري المعالجة...' : (
                                                    <>احصل على دليل التأسيس <ArrowLeft size={16} /></>
                                                )}
                                            </button>
                                            <p className="text-center text-[10px] text-[#14253E]/40 font-bold tracking-widest mt-4">
                                                آمن 100٪ • استجابة سريعة
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
