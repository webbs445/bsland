'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, LayoutGrid, BadgeCheck, Search, ArrowLeft, Phone, CheckCircle2, X, Building2, Globe, FileText, CreditCard, Calculator, IdCard } from 'lucide-react';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

export default function WhyChooseUsAR() {
    const features = [
        {
            icon: BadgeCheck,
            title: "شريك معتمد من الحكومة",
            description: "ندخل مكاتب الدائرة الاقتصادية والمناطق الحرة لتقديم الطلبات نيابة عنك — لأنهم صرحوا لنا بذلك. لا وسطاء. لا تأخير. شراكة مباشرة."
        },
        {
            icon: LayoutGrid,
            title: "لن تضطر أبداً لزيارة دائرة حكومية",
            description: "نقوم بإعداد ومراجعة وتقديم كل مستند. من حجز الاسم التجاري إلى الترخيص النهائي — لن تقف في أي طابور أو تتابع أي موظف حكومي."
        },
        {
            icon: ShieldCheck,
            title: "أصولك الشخصية محمية قانونياً",
            description: "نرشدك إلى الهيكل الذي يعزل ثروتك الشخصية عن مخاطر العمل. سواء كان ذلك عبر شركة ذات مسؤولية محدودة، منطقة حرة، أو رخصة مهنية — الحماية تأتي أولاً دائمًا."
        },
        {
            icon: Zap,
            title: "ترخيص خلال يومين، وليس أسابيع",
            description: "شراكتنا كوكيل معتمد تعني معالجة ذات أولوية لطلباتك. بينما ينتظر الآخرون، يمر طلبك عبر قنوات سريعة مخصصة."
        },
        {
            icon: Search,
            title: "السعر الذي نحدده هو السعر الذي تدفعه",
            description: "نوضح لك كل درهم تدفعه مسبقاً. الرسوم الحكومية، رسوم الخدمات، تكاليف التأشيرات — كلها شفافة قبل البدء. لا توجد رسوم خفية. مضمون."
        }
    ];

    const services = [
        { id: 'mainland', label: 'تأسيس شركة في البر الرئيسي', icon: Building2 },
        { id: 'freezone', label: 'تأسيس شركة في منطقة حرة', icon: Globe },
        { id: 'golden-visa', label: 'الإقامة الذهبية', icon: IdCard },
        { id: 'pro', label: 'خدمات العلاقات العامة (PRO)', icon: FileText },
        { id: 'banking', label: 'الخدمات المصرفية للشركات', icon: CreditCard },
        { id: 'tax', label: 'الضرائب والمحاسبة', icon: Calculator },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<'services' | 'form'>('services');
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', whatsapp: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => { setMounted(true); }, []);

    const openModal = () => {
        setStep('services');
        setSelectedService(null);
        setFormData({ firstName: '', lastName: '', email: '', whatsapp: '' });
        setSubmitted(false);
        setSubmitError(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
            await submitLeadAction({
                first_name: formData.firstName,
                last_name: formData.lastName,
                custom_service_enquired: "Business Setup (Arabic)",
                custom_client_profile_and_requirement: `[Why Choose Us AR] Service: ${selectedService || 'General Inquiry'} | CTA: Start Your Business Today`,
                email_id: formData.email,
                mobile_no: formData.whatsapp,
                country: countryName
            });
            setSubmitted(true);
        } catch (error) {
            console.error(error);
            setSubmitError("فشل في تقديم الطلب. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 px-8 bg-brand-navy text-white overflow-hidden" dir="rtl">
            <div className="max-w-7xl mx-auto border-t border-white/5 pt-16 mt-8">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sm font-bold tracking-[0.1em] text-[#c28867]"
                        >
                            لماذا بيست سوليوشن®؟
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 text-4xl md:text-5xl font-bold font-header text-white"
                        >
                            نحن لا نقدم النصيحة فحسب، بل نتصرف نيابة عنك بالكامل
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 mb-12 text-lg text-white/70 max-w-lg"
                        >
                            كل مخاوفك المتعلقة بتأسيس أعمالك في دبي؟ لقد قمنا بحلها بالفعل — أكثر من 2,500 مرة للآلاف من الشركات.
                        </motion.p>

                        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
                            <div className="absolute inset-0 bg-brand-copper/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                            <Image
                                src="/team.webp"
                                alt="فريق إدارة بيست سوليوشن"
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-copper/20 blur-3xl rounded-full z-0"></div>
                            <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full z-20 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] font-black tracking-widest text-white">المقر الرئيسي بدبي</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-8 group"
                            >
                                <div className="flex-shrink-0 w-14 h-14 bg-brand-copper/10 border border-brand-copper/20 rounded-2xl flex items-center justify-center group-hover:bg-brand-copper transition-all duration-500">
                                    <feature.icon className="w-7 h-7 text-brand-copper group-hover:text-brand-navy transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-header font-black text-white mb-3 tracking-tight group-hover:text-brand-copper transition-colors">{feature.title}</h3>
                                    <p className="text-sm text-white/50 font-medium leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        {/* CTA Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="pt-3 border-t border-[#c28667] mt-10"
                        >
                            <p className="text-sm text-white/40 tracking-widest font-bold mb-6">
                                هل أنت مستعد للبدء؟
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={openModal}
                                    className="group inline-flex items-center justify-center gap-3 bg-brand-copper hover:bg-brand-copper/90 text-white font-black tracking-widest text-sm px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(194,136,103,0.3)]"
                                >
                                    ابدأ مشروعك اليوم
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                                </button>
                                <a
                                    href="tel:+971522330011"
                                    className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold tracking-widest text-sm px-8 py-4 rounded-2xl transition-all duration-300"
                                    dir="ltr"
                                >
                                    <Phone className="w-4 h-4 text-brand-copper" />
                                    <span>اتصل بمستشار</span>
                                </a>
                            </div>
                        </motion.div>
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
                                            <h4 className="text-2xl font-black text-brand-navy mb-2 tracking-tight">النجاح!</h4>
                                            <p className="text-brand-navy/60 text-xs font-bold tracking-widest leading-relaxed">
                                                تم استلام طلبك.<br />سيقوم أحد الخبراء بالاتصال بك قريباً.
                                            </p>
                                            <button onClick={() => setIsModalOpen(false)} className="mt-8 text-sm font-bold tracking-widest hover:underline" style={{ color: '#C28667' }}>إغلاق النافذة</button>
                                        </motion.div>
                                    ) : step === 'services' ? (
                                        <motion.div key="services" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                            <div className="mb-8 p-1">
                                                <h3 className="text-2xl font-black font-header text-brand-navy tracking-tight mb-2">كيف يمكننا مساعدتك؟</h3>
                                                <p className="text-brand-navy/50 text-sm font-medium">حدد الخدمة المطلوبة للحصول على عرض أسعار مخصص من خبرائنا.</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-2">
                                                {services.map((svc) => (
                                                    <button
                                                        key={svc.id}
                                                        onClick={() => { setSelectedService(svc.label); setStep('form'); }}
                                                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-right transition-all duration-200 hover:border-brand-copper hover:bg-brand-copper/5 group ${selectedService === svc.label ? 'border-brand-copper bg-brand-copper/5' : 'border-slate-100 bg-slate-50'}`}
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                                                            <svc.icon className="w-5 h-5 text-brand-copper" />
                                                        </div>
                                                        <span className="text-xs font-black tracking-wide text-brand-navy leading-tight">{svc.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => { setSelectedService('استفسار عام'); setStep('form'); }}
                                                className="mt-6 w-full text-center text-xs font-bold text-brand-navy/40 hover:text-brand-navy tracking-widest transition-colors flex items-center justify-center gap-2"
                                            >
                                                <span>لست متأكداً؟ أوصلني بخبير</span>
                                                <ArrowLeft size={14} />
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <div className="flex items-center gap-3 mb-8">
                                                <button onClick={() => setStep('services')} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-brand-navy/40 hover:text-brand-navy">
                                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                                </button>
                                                <div>
                                                    <h3 className="text-xl font-header font-black text-brand-navy tracking-tight">{selectedService}</h3>
                                                    <p className="text-brand-navy/50 text-xs font-medium mt-1">أدخل تفاصيلك وسنتواصل معك قريباً.</p>
                                                </div>
                                            </div>
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                {submitError && (
                                                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-medium border border-red-100 text-center">{submitError}</div>
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
                                                    {isSubmitting ? 'جاري المعالجة...' : <>ابدأ مشروعك الآن <ArrowLeft size={16} /></>}
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
        </section>
    );
}
