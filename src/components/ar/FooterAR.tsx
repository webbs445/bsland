'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Instagram,
    Linkedin,
    Mail,
    ArrowLeft,
    ShieldCheck,
    X,
    CheckCircle2,
    Building2,
    Globe,
    FileText,
    CreditCard,
    Calculator,
    IdCard, Heart
} from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

export default function FooterAR() {
    const currentYear = new Date().getFullYear();

    const services = [
        { id: 'mainland', label: 'تأسيس شركة في البر الرئيسي', icon: Building2 },
        { id: 'freezone', label: 'تأسيس شركة في المنطقة الحرة', icon: Globe },
        { id: 'golden-visa', label: 'الإقامة الذهبية', icon: IdCard },
        { id: 'pro', label: 'خدمات تخليص المعاملات', icon: FileText },
        { id: 'banking', label: 'حساب بنكي للشركات', icon: CreditCard },
        { id: 'tax', label: 'الضرائب والمحاسبة', icon: Calculator },
    ];

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<'services' | 'form'>('services');
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', whatsapp: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const openModal = () => {
        setStep('services');
        setSelectedService(null);
        setSubmitted(false);
        setIsModalOpen(true);
    };

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
                } catch (e) { console.error(e); }
            }
            await submitLeadAction({
                first_name: formData.firstName,
                last_name: formData.lastName,
                custom_service_enquired: "Business Setup (Arabic)",
                custom_client_profile_and_requirement: `[Footer CTA AR] Service: ${selectedService || 'General'}`,
                email_id: formData.email,
                mobile_no: formData.whatsapp,
                country: countryName
            });
            setSubmitted(true);
        } catch (error) { console.error(error); }
        finally { setIsSubmitting(false); }
    };

    return (
        <footer className="bg-[#070E1A] text-white pt-32 pb-12 relative overflow-hidden" dir="rtl">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-brand-copper/50 to-transparent opacity-30" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-copper/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-[50vh] bg-gradient-to-t from-brand-navy via-[#070E1A] to-transparent pointer-events-none z-0" />

            {/* Giant Background Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden flex justify-center opacity-[0.02] pointer-events-none z-0 select-none">
                <span className="text-[10vw] font-black tracking-tighter whitespace-nowrap">
                    Best Solution
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

                {/* Top Massive CTA Area */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-24 pb-16 border-b border-white/10 relative">
                    <div className="max-w-2xl relative z-10">
                        <span className="text-brand-copper text-xs font-bold tracking-[0.1em] mb-4 block">جاهز للبدء؟</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2]">
                            ابدأ رحلتك<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>في دبي.</span>
                        </h2>
                    </div>
                    <button
                        onClick={openModal}
                        className="group flex items-center gap-4 bg-brand-copper hover:bg-white text-white hover:text-brand-navy px-6 py-4 md:px-8 md:py-5 rounded-full font-black tracking-widest transition-all duration-300 shadow-[0_0_40px_rgba(194,134,103,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] flex-shrink-0 relative z-10 text-xs md:text-sm"
                    >
                        تحدث إلى خبير
                        <div className="w-8 h-8 rounded-full bg-[#070E1A]/10 flex items-center justify-center group-hover:bg-[#070E1A]/20 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                    </button>
                </div>

                {/* Main Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20 relative z-10">
                    {/* Brand Col */}
                    <div className="lg:col-span-4">
                        <img src="/logo.webp" alt="بيست سوليوشن" className="h-10 md:h-12 w-auto brightness-0 invert mb-8 drop-shadow-lg" />
                        <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                            نحن لا نقوم فقط بتخليص المعاملات؛ بل نبني الأسس. يثق بنا أكثر من 2,500 رائد أعمال للتنقل في بيئة الشركات الإمارتية بسرعة وشفافية وخبرة استثنائية.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            {/* Facebook */}
                            <a href="https://www.facebook.com/bestsolutionHQ/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#C28667] hover:border-[#C28667] hover:text-white transition-all text-white/50 backdrop-blur-sm">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>
                            {/* Instagram */}
                            <a href="https://www.instagram.com/bestsolutionhq/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#C28667] hover:border-[#C28667] hover:text-white transition-all text-white/50 backdrop-blur-sm">
                                <Instagram className="w-5 h-5 transition-colors" />
                            </a>
                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/company/bestsolutionhq/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#C28667] hover:border-[#C28667] hover:text-white transition-all text-white/50 backdrop-blur-sm">
                                <Linkedin className="w-5 h-5 transition-colors" />
                            </a>
                            {/* YouTube */}
                            <a href="https://www.youtube.com/bestsolutionhq/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#C28667] hover:border-[#C28667] hover:text-white transition-all text-white/50 backdrop-blur-sm">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="lg:col-span-3 lg:col-start-6">
                        <h4 className="text-xs font-black tracking-[0.1em] text-white mb-6">خدماتنا</h4>
                        <ul className="space-y-4">
                            {services.map((item) => (
                                <li key={item.label}>
                                    <button
                                        onClick={() => { setSelectedService(item.id); setStep('form'); setSubmitted(false); setIsModalOpen(true); }}
                                        className="text-white/50 hover:text-brand-copper text-sm font-medium transition-colors text-right w-full"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact / Offices */}
                    <div className="lg:col-span-4 lg:col-start-9">
                        <h4 className="text-xs font-black tracking-[0.1em] text-white mb-6">مكاتبنا</h4>
                        <div className="space-y-8">
                            {/* Dubai Office */}
                            <div className="group">
                                <p className="text-[10px] font-bold tracking-widest text-brand-copper mb-2">المقر الرئيسي في دبي</p>
                                <p className="text-sm text-white/60 leading-relaxed mb-3">مكتب 906، برج كابيتال جولدن<br />الخليج التجاري، دبي، الإمارات</p>
                                <a href="tel:+971522330011" className="text-lg font-black tracking-tight text-white group-hover:text-brand-copper transition-colors block mb-2" dir="ltr">+971 52 233 0011</a>
                                <a href="mailto:info@best-solution.ae" className="text-xs font-medium text-white/40 group-hover:text-white transition-colors flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@best-solution.ae</a>
                            </div>

                            <div className="h-px w-full bg-white/10" />

                            {/* Egypt Office */}
                            <div className="group">
                                <p className="text-[10px] font-bold tracking-widest text-brand-copper mb-2">مكتب مصر</p>
                                <p className="text-sm text-white/60 leading-relaxed mb-3">هايد بارك التجمع الخامس<br />القاهرة، مصر</p>
                                <a href="mailto:info@best-solution.ae" className="text-xs font-medium text-white/40 group-hover:text-white transition-colors flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@best-solution.ae</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal Bar */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-[10px] font-bold tracking-widest text-white/30 text-center md:text-right">
                            © {currentYear} شركة بيست سوليوشن لتأسيس الأعمال
                        </p>
                        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-copper" />
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.1em] text-white/50">
                            <ShieldCheck className="w-4 h-4 text-brand-copper" />
                            شريك معتمد
                        </div>
                    </div>

                    <div className="flex gap-6 text-[10px] font-bold tracking-widest">
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.1em] text-white/50">
                            <Heart className="w-4 h-4 text-brand-copper" />
                            الشريك الأكثر ثقة
                        </div>
                    </div>
                </div>

            </div>

            {/* Services Popup Modal */}
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
                                    className="absolute top-4 left-4 right-auto p-2 text-brand-navy/40 hover:text-brand-navy hover:bg-slate-100 rounded-full transition-colors"
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
                                                تم استلام طلبك.<br />سيتواصل معك أحد خبرائنا قريباً.
                                            </p>
                                            <button onClick={() => setIsModalOpen(false)} className="mt-8 text-sm font-bold tracking-widest hover:underline" style={{ color: '#C28667' }}>إغلاق النافذة</button>
                                        </motion.div>
                                    ) : step === 'services' ? (
                                        <motion.div key="services" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <div className="mb-8">
                                                <h3 className="text-2xl font-black text-brand-navy tracking-tight mb-2">كيف يمكننا مساعدتك؟</h3>
                                                <p className="text-brand-navy/50 text-sm font-medium">اختر خدمة للحصول على عرض أسعار مخصص من خبرائنا.</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {services.map((svc) => (
                                                    <button
                                                        key={svc.id}
                                                        onClick={() => { setSelectedService(svc.label); setStep('form'); }}
                                                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-right transition-all duration-200 hover:border-brand-copper hover:bg-brand-copper/5 group ${selectedService === svc.label
                                                            ? 'border-brand-copper bg-brand-copper/5'
                                                            : 'border-slate-100 bg-slate-50'
                                                            }`}
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
                                                className="mt-4 w-full text-center text-xs font-bold text-brand-navy/40 hover:text-brand-navy tracking-widest transition-colors flex items-center justify-center gap-1"
                                            >
                                                <span>لست متأكداً؟ أوصلني بخبير</span> <ArrowLeft size={16} />
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                            <div className="flex items-center gap-3 mb-8">
                                                <button onClick={() => setStep('services')} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-brand-navy/40 hover:text-brand-navy">
                                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                                </button>
                                                <div>
                                                    <h3 className="text-xl font-black text-brand-navy tracking-tight">{selectedService}</h3>
                                                    <p className="text-brand-navy/50 text-xs font-medium">أدخل بياناتك وسنتواصل معك.</p>
                                                </div>
                                            </div>
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="flex gap-3">
                                                    <input type="text" placeholder="الاسم الأول" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium" />
                                                    <input type="text" placeholder="الاسم الأخير" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium" />
                                                </div>
                                                <input type="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full h-14 px-5 bg-slate-50 border border-slate-200 text-brand-navy placeholder:text-brand-navy/40 rounded-xl outline-none focus:border-brand-copper focus:ring-1 focus:ring-brand-copper transition-all text-sm font-medium text-left" dir="ltr" />
                                                <div className="space-y-1.5 pb-2">
                                                    <label className="text-[10px] font-black tracking-widest text-brand-navy/40 ml-1 block text-right">رقم الواتساب</label>
                                                    <div dir="ltr">
                                                        <PhoneInput
                                                            international defaultCountry="AE"
                                                            value={formData.whatsapp}
                                                            onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                            className="phone-input-custom text-brand-navy w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-brand-copper focus-within:ring-1 focus-within:ring-brand-copper transition-all text-sm font-medium text-left"
                                                            placeholder="رقم الواتساب"
                                                        />
                                                    </div>
                                                </div>
                                                <button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-xl font-black tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2" style={{ background: '#C28667', color: '#fff', boxShadow: '0 10px 30px rgba(194,134,103,0.3)', opacity: isSubmitting ? 0.7 : 1 }}>
                                                    {isSubmitting ? 'جارِ المعالجة...' : <>احصل على استشارة الآن <ArrowLeft size={16} /></>}
                                                </button>
                                                <p className="text-center text-[10px] text-brand-navy/40 font-bold tracking-widest mt-4">آمن 100% • استجابة سريعة</p>
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
        </footer>
    );
}
