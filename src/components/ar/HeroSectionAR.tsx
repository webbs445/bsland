'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Building2, Banknote, ArrowLeft, Phone, CheckCircle2, MessageCircle } from 'lucide-react';
import { submitLeadAction } from '@/app/actions/lead';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';

const highlights = [
    { icon: Globe, text: "حرية التجارة", color: "text-blue-500" },
    { icon: Building2, text: "مكاتب مرنة", color: "text-purple-500" },
    { icon: Banknote, text: "0% ضرائب", color: "text-amber-500" },
];

export default function HeroSectionAR() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+971',
        whatsapp: '',
        lookingTo: ''
    });
    const [tickerIndex, setTickerIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const tickerMessages = [
        "78٪ من المستثمرين الجدد يستخدمون دليلنا قبل اختيار المنطقة الحرة.",
        "أكثر من 5,000 شركة تأسست بنجاح",
        "متوسط وقت التأسيس: 3-5 أيام عمل",
        "الإقامة الذهبية تم الحصول عليها من قبل المستثمرين في الإمارات",
        "شركات المناطق الحرة معفاة من الضرائب",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTickerIndex((prev) => (prev + 1) % tickerMessages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Auto-detect visitor's country calling code
    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data?.country_calling_code) {
                    setFormData(prev => ({ ...prev, countryCode: data.country_calling_code }));
                }
            })
            .catch(() => { /* silently fall back to +971 */ });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const serviceMap: Record<string, string> = {
                'تأسيس شركة ذات مسؤولية محدودة لحماية المسؤولية': 'Business Setup',
                'تأسيس شركة في منطقة حرة': 'Business Setup',
                'مقارنة التكاليف والخيارات': 'Business Setup',
                'الحصول على رخصة تجارية / رخصة تجارة إلكترونية': 'Business Setup',
                'أحتاج إلى توجيه خبير — لست متأكدًا بعد': 'Business Setup'
            };

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
                custom_service_enquired: serviceMap[formData.lookingTo] || "Business Setup (Arabic)",
                custom_client_profile_and_requirement: `[Arabic Hero] Services Looking For: ${formData.lookingTo}`,
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

    return (
        <section className="relative min-h-[92vh] bg-brand-navy overflow-hidden flex items-center" dir="rtl">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(194,134,103,0.1) 0%, transparent 70%)'
                    }}
                />
                {/* Abstract grid */}
                <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-hero" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--color-brand-copper)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-hero)" />
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Right Content (formerly Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white text-right"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-brand-copper/20 rounded-full px-4 py-2 mb-8 shadow-sm">
                            <span className="w-2 h-2 bg-brand-copper rounded-full animate-pulse" />
                            <span className="text-[10px] font-black tracking-widest text-white/80">شريك معتمد للدائرة الاقتصادية والمناطق الحرة</span>
                        </div>

                        <h1
                            className="mb-6 font-header text-white"
                            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.2 }}
                        >
                            أعمالك في دبي{' '}
                            <span
                                className="inline-block"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-brand-copper), #E8C97A)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                تأسيس، تنظيم، حماية كاملة.
                            </span>
                        </h1>

                        <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-xl font-medium">
                            ركز أنت على رؤيتك، ونحن نتولى كل توقيع وكل إجراء حكومي. بدءاً من استشارتك الأولى وحتى يومك الأول في العمل.
                        </p>

                        {/* Highlights Bar */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                            {highlights.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 shadow-lg">
                                    <item.icon className="w-4 h-4 text-brand-copper" />
                                    <span className="text-[10px] font-black tracking-widest text-white/80">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Live Ticker */}
                        <div className="h-14 mb-12 relative overflow-hidden bg-brand-copper/5 border-r-4 border-brand-copper rounded-l-xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={tickerIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 flex items-center px-6"
                                >
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <p className="text-sm font-bold text-white tracking-tight italic" dir="rtl">{tickerMessages[tickerIndex]}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/5">
                            {[
                                { value: "5,000+", label: "شركة تأسست" },
                                { value: "10+", label: "سنوات خبرة" },
                                { value: "4.9★", label: "تقييم جوجل" },
                                { value: "3-5", label: "أيام للتأسيس" },
                            ].map((stat, index) => (
                                <div key={index} className="text-right">
                                    <div className="text-2xl font-header font-black text-brand-copper tracking-tighter" dir="ltr">
                                        {stat.value}
                                    </div>
                                    <div className="text-[9px] font-bold tracking-widest text-white/30 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Left (formerly Right) - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-right"
                    >
                        <div className="relative">
                            {/* Decorative Glow */}
                            <div className="absolute -inset-4 bg-brand-copper/10 rounded-[40px] blur-3xl -z-10" />

                            <div id="hero-form" className="relative bg-[#1a2b45]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 sm:p-10 shadow-2xl overflow-hidden">
                                <div className="text-center mb-10 pb-6 border-b border-white/5">
                                    <h3 className="text-2xl font-header font-black text-white mb-2 tracking-tight">احصل على مساعدة الخبراء الآن</h3>
                                    <p className="text-brand-copper text-[10px] font-black tracking-widest">سيقوم مستشارك بالاتصال بك خلال 10 دقائق</p>
                                </div>

                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-16"
                                    >
                                        <div className="w-20 h-20 bg-brand-copper rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brand-copper/30">
                                            <CheckCircle2 className="w-10 h-10 text-brand-navy" />
                                        </div>
                                        <h4 className="text-2xl font-header font-black text-white mb-2 tracking-tight">النجاح!</h4>
                                        <p className="text-white/60 text-[10px] font-bold tracking-widest">تم استلام طلبك. سيقوم مستشارك بالاتصال بك خلال 10 دقائق.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4 text-right">
                                        <div className="flex gap-2">
                                            <div className="group relative w-1/2">
                                                <input
                                                    type="text"
                                                    placeholder="الاسم الأول"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-4 sm:px-6 bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <div className="group relative w-1/2">
                                                <input
                                                    type="text"
                                                    placeholder="الاسم الأخير"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-4 sm:px-6 bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="group relative">
                                            <input
                                                type="email"
                                                placeholder="البريد الإلكتروني"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full h-14 px-6 bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium"
                                                dir="ltr"
                                            />
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <label className="text-[10px] font-black tracking-widest text-white/50 ml-1">
                                                رقم الواتساب
                                            </label>
                                            <div dir="ltr">
                                                <PhoneInput
                                                    international
                                                    defaultCountry="AE"
                                                    value={formData.whatsapp}
                                                    onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                    className="phone-input-custom-hero w-full h-14 px-6 bg-white/5 border border-white/10 rounded-xl focus-within:border-brand-copper transition-all text-sm font-medium text-white text-left"
                                                    placeholder="رقم الواتساب"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black tracking-widest text-white/50 ml-1">أنا أتطلع إلى:</label>
                                            <select
                                                value={formData.lookingTo}
                                                onChange={(e) => setFormData({ ...formData, lookingTo: e.target.value })}
                                                required
                                                className="w-full h-14 px-6 bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium appearance-none cursor-pointer text-right"
                                            >
                                                <option value="" disabled className="bg-brand-navy">اختر واحداً</option>
                                                <option value="تأسيس شركة ذات مسؤولية محدودة لحماية المسؤولية" className="bg-brand-navy">تأسيس شركة ذات مسؤولية محدودة (Mainland LLC)</option>
                                                <option value="تأسيس شركة في منطقة حرة" className="bg-brand-navy">تأسيس شركة في منطقة حرة</option>
                                                <option value="مقارنة التكاليف والخيارات" className="bg-brand-navy">مقارنة التكاليف والخيارات</option>
                                                <option value="الحصول على رخصة تجارية / رخصة تجارة إلكترونية" className="bg-brand-navy">الحصول على رخصة تجارية / تجارة إلكترونية</option>
                                                <option value="أحتاج إلى توجيه خبير — لست متأكدًا بعد" className="bg-brand-navy">أحتاج إلى توجيه خبير — لست متأكدًا بعد</option>
                                            </select>
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 16px 40px rgba(255,190,163,0.45)' }}
                                            whileTap={{ scale: 0.97, y: 0 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                            className="relative overflow-hidden w-full h-16 mt-6 rounded-xl font-black text-[16px] tracking-widest flex items-center justify-center gap-2 shadow-2xl group"
                                            style={{ background: 'linear-gradient(135deg, #d4956f 0%, #C28667 50%, #a86c4f 100%)', color: '#ffffff' }}
                                        >
                                            {/* Shimmer sweep */}
                                            <span className="absolute inset-0 translate-x-[100%] group-hover:translate-x-[-100%] transition-transform duration-700 bg-gradient-to-l from-transparent via-white/40 to-transparent pointer-events-none" />
                                            {isSubmitting ? 'جاري المعالجة...' : (
                                                <><span>احصل على خطة التأسيس</span> <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" /></>
                                            )}
                                        </motion.button>
                                    </form>
                                )}

                                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white/40 text-[9px] font-black tracking-widest border-t border-white/5 pt-8">
                                    <a href="tel:+97145531546" className="flex items-center gap-2 hover:text-white transition-colors group">
                                        <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 group-hover:bg-brand-copper/20 transition-colors">
                                            <Phone className="w-2.5 h-2.5 text-brand-copper flex-shrink-0" />
                                        </div>
                                        <span dir="ltr">Call: +971 52 233 0011</span>
                                    </a>
                                    <div className="w-px h-3 bg-white/10 hidden sm:block"></div>
                                    <a href="https://wa.me/971522330011" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                                        <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 group-hover:bg-[#25D366]/20 transition-colors">
                                            <MessageCircle className="w-2.5 h-2.5 text-[#25D366] flex-shrink-0" />
                                        </div>
                                        <span>راسلنا على الواتساب</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Partner Logos */}
                        <div className="mt-12 text-center">
                            <p className="text-white/40 text-[9px] font-black tracking-widest mb-6">شركاؤنا المفضلون في المناطق الحرة</p>
                            <div className="flex flex-wrap justify-center gap-8 grayscale opacity-20 hover:opacity-100 transition-all duration-700">
                                {['DMCC', 'IFZA', 'JAFZA', 'SHAMS', 'RAK'].map((partner) => (
                                    <div key={partner} className="text-xs font-black tracking-tighter text-white border-b-2 border-brand-copper/20 pb-1" dir="ltr">
                                        {partner}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div >
        </section >
    );
}
