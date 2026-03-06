'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, Sparkles, ArrowLeft, CheckCircle2, LayoutGrid, X, ShieldCheck, Clock, BadgeCheck, Banknote, Globe2, HeartHandshake } from 'lucide-react';
import { ACTIVITIES_CATEGORIES } from './FreeZoneDataAR';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

export default function FreeZoneActivitiesAR() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState(ACTIVITIES_CATEGORIES[0].name);
    const [selectedInquiry, setSelectedInquiry] = useState<{ activity: string; zone: string } | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const tabsRef = useRef<HTMLDivElement>(null);

    const filteredCategories = ACTIVITIES_CATEGORIES.map(cat => {
        if (!searchQuery) return { ...cat, isMatch: true };
        const matchesCat = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchedActs = cat.activities.filter((a: string) => a.toLowerCase().includes(searchQuery.toLowerCase()));
        const activities = matchesCat ? cat.activities : matchedActs;
        return { ...cat, activities, isMatch: matchesCat || matchedActs.length > 0 };
    }).filter((cat: any) => cat.isMatch);

    const searchResultCategory = searchQuery && filteredCategories.length > 0 ? {
        name: `نتائج البحث`,
        activities: filteredCategories.flatMap((cat: any) => cat.activities),
        bestZones: filteredCategories[0]?.bestZones ?? [],
        color: filteredCategories[0]?.color ?? 'from-brand-navy to-brand-copper',
        icon: Search,
    } : null;

    const activeCategory = searchQuery
        ? searchResultCategory
        : ACTIVITIES_CATEGORIES.find((c: any) => c.name === activeTab);

    const scrollToForm = () => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });

    const handleInquiry = (activity: string, zone: string) => {
        setSelectedInquiry({ activity, zone });
        setSubmitted(false);
        setSubmitError(null);
    };

    const handleSubmit = async () => {
        if (!selectedInquiry) return;
        setIsSubmitting(true);
        setSubmitError(null);

        let countryCode = '';
        if (phone) {
            try {
                const parsed = parsePhoneNumber(phone);
                if (parsed && parsed.country) {
                    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                    countryCode = regionNames.of(parsed.country) || parsed.country;
                }
            } catch (e) {
                console.error("Could not parse phone country code", e);
            }
        }

        try {
            const result = await submitLeadAction({
                first_name: firstName,
                last_name: lastName,
                custom_service_enquired: "Business Setup (Arabic)",
                custom_client_profile_and_requirement: `[Free Zone Finder Form AR] Activity: ${selectedInquiry.activity} | Location: ${selectedInquiry.zone}`,
                email_id: email,
                mobile_no: phone,
                country: countryCode
            });

            if (result && !result.success) {
                console.error("Submission error:", result.error);
            }

            setSubmitted(true);
        } catch (error) {
            console.error("Form submission failed:", error);
            setSubmitError("حدث خطأ ما. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (tabsRef.current && !searchQuery) {
            const activeBtn = tabsRef.current.querySelector('[data-active="true"]') as HTMLElement;
            if (activeBtn) {
                activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [activeTab, searchQuery]);

    return (
        <section id="activities" className="py-16 md:py-24 px-4 md:px-6 bg-white relative overflow-hidden" dir="rtl">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#14253E_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold tracking-[0.1em] text-[#c28867]"
                    >
                        أداة البحث عن الأنشطة المرخصة
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-3xl md:text-5xl font-bold font-header text-gray-900"
                    >
                        ابحث عن النشاط التجاري المناسب لك
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        ابحث عبر أكثر من 3000 نشاط معتمد من الدائرة الاقتصادية والمناطق الحرة للعثور على التطابق التام لنموذج عملك.
                    </motion.p>
                </div>

                <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8">
                        <ActivityBrowser
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            activeCategory={activeCategory}
                            filteredCategories={filteredCategories}
                            selectedInquiry={selectedInquiry}
                            handleInquiry={handleInquiry}
                            tabsRef={tabsRef}
                            isMobile={false}
                        />
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-24">
                        <AnimatePresence mode="wait">
                            {selectedInquiry ? (
                                <InquiryForm
                                    key="inquiry"
                                    selectedInquiry={selectedInquiry}
                                    setSelectedInquiry={setSelectedInquiry}
                                    submitted={submitted}
                                    setSubmitted={setSubmitted}
                                    isSubmitting={isSubmitting}
                                    submitError={submitError}
                                    firstName={firstName} setFirstName={setFirstName}
                                    lastName={lastName} setLastName={setLastName}
                                    email={email} setEmail={setEmail}
                                    phone={phone} setPhone={setPhone}
                                    handleSubmit={handleSubmit}
                                />
                            ) : (
                                <CTACard key="cta" scrollToForm={scrollToForm} />
                            )}
                        </AnimatePresence>
                        <ProTip />
                    </div>
                </div>

                <div className="lg:hidden">
                    <ActivityBrowser
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        activeCategory={activeCategory}
                        filteredCategories={filteredCategories}
                        selectedInquiry={selectedInquiry}
                        handleInquiry={handleInquiry}
                        tabsRef={tabsRef}
                        isMobile={true}
                    />

                    <AnimatePresence>
                        {selectedInquiry && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedInquiry(null)}
                                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                                />
                                <motion.div
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '100%' }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                                    className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
                                >
                                    <div className="flex justify-center pt-3 pb-1">
                                        <div className="w-10 h-1 bg-slate-200 rounded-full" />
                                    </div>
                                    <div className="px-6 pb-8 pt-2">
                                        <InquiryForm
                                            key="inquiry-mobile"
                                            selectedInquiry={selectedInquiry}
                                            setSelectedInquiry={setSelectedInquiry}
                                            submitted={submitted}
                                            setSubmitted={setSubmitted}
                                            isSubmitting={isSubmitting}
                                            submitError={submitError}
                                            firstName={firstName} setFirstName={setFirstName}
                                            lastName={lastName} setLastName={setLastName}
                                            email={email} setEmail={setEmail}
                                            phone={phone} setPhone={setPhone}
                                            handleSubmit={handleSubmit}
                                            isMobileSheet
                                        />
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
                <div className="lg:hidden h-20" />
            </div>
        </section>
    );
}

function ActivityBrowser({ searchQuery, setSearchQuery, activeTab, setActiveTab, activeCategory, filteredCategories, selectedInquiry, handleInquiry, tabsRef, isMobile }: any) {
    return (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 md:p-8 shadow-sm relative overflow-hidden">
            <div className="relative mb-5 md:mb-8">
                <input
                    type="text"
                    placeholder="ابحث عن الأنشطة (مثال: التجارة، الاستشارات)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pr-12 pl-6 py-3.5 md:py-4 text-brand-navy font-medium placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-copper/20 transition-all text-sm"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/20" size={18} />
            </div>

            {!searchQuery && (
                <div
                    ref={tabsRef}
                    className={`pb-4 mb-5 md:mb-8 border-b border-slate-100 gap-2 ${isMobile
                        ? 'flex overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x snap-mandatory'
                        : 'flex flex-wrap'
                        }`}
                >
                    {ACTIVITIES_CATEGORIES.map((cat: any) => {
                        const isActive = activeTab === cat.name;
                        return (
                            <button
                                key={cat.name}
                                data-active={isActive}
                                onClick={() => setActiveTab(cat.name)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap font-bold text-xs transition-all flex-shrink-0 snap-start ${isActive
                                    ? 'bg-brand-navy text-white shadow-md'
                                    : 'bg-white text-brand-navy/50 hover:bg-slate-100 hover:text-brand-navy border border-slate-200'
                                    }`}
                            >
                                <cat.icon size={13} className={isActive ? 'text-brand-copper' : 'text-brand-navy/30'} />
                                {cat.name}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className="min-h-[300px] md:min-h-[400px]">
                <AnimatePresence mode="wait">
                    {activeCategory ? (
                        <motion.div
                            key={activeCategory.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-5 md:space-y-8"
                        >
                            <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 md:gap-4 mb-4">
                                    <div className={`w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${activeCategory.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                        <activeCategory.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-base md:text-xl font-header font-black text-brand-navy tracking-tight">
                                            {searchQuery ? `تم العثور على ${activeCategory.activities.length} نتيجة` : activeCategory.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black tracking-widest mt-1">
                                            <CheckCircle2 size={11} /> {searchQuery ? `مطابقة البحث لـ "${searchQuery}"` : 'أنشطة مرخصة ومعتمدة'}
                                        </div>
                                    </div>
                                </div>
                                {!searchQuery && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[9px] font-black tracking-widest text-brand-navy/30 ml-1 w-full md:w-auto">أفضل المناطق:</span>
                                        {activeCategory.bestZones.map((zone: string) => (
                                            <button
                                                key={zone}
                                                onClick={() => handleInquiry(activeCategory.name, zone)}
                                                className={`px-3 py-1.5 border rounded-lg text-xs font-bold transition-all ${selectedInquiry?.zone === zone
                                                    ? 'bg-brand-copper border-brand-copper text-white shadow-md'
                                                    : 'bg-slate-50 border-slate-200 text-brand-navy/60 hover:border-brand-copper hover:text-brand-copper'
                                                    }`}
                                                dir="ltr"
                                            >
                                                {zone}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="font-black text-[9px] tracking-widest text-brand-navy/30 mb-3">الأنشطة الفرعية الشائعة</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                                    {activeCategory.activities.map((act: string, i: number) => (
                                        <div
                                            key={i}
                                            onClick={() => handleInquiry(act, activeCategory.bestZones[0])}
                                            className={`flex items-center justify-between p-3.5 md:p-4 border rounded-xl transition-all group cursor-pointer ${selectedInquiry?.activity === act
                                                ? 'bg-white border-brand-copper shadow-md ring-1 ring-brand-copper/20'
                                                : 'bg-white border-slate-100 hover:border-brand-copper/40 hover:shadow-md active:scale-[0.98]'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${selectedInquiry?.activity === act ? 'bg-brand-copper/20' : 'bg-slate-50 group-hover:bg-brand-copper/10'
                                                    }`}>
                                                    <CheckCircle2 size={13} className={selectedInquiry?.activity === act ? 'text-brand-copper' : 'text-emerald-500'} />
                                                </div>
                                                <span className={`font-semibold text-xs md:text-sm transition-colors leading-tight ${selectedInquiry?.activity === act ? 'text-brand-navy font-bold' : 'text-brand-navy/70 group-hover:text-brand-navy'
                                                    }`}>{act}</span>
                                            </div>
                                            <ChevronLeft size={14} className={`flex-shrink-0 transition-all ${selectedInquiry?.activity === act ? 'text-brand-copper -translate-x-1' : 'text-brand-navy/20 group-hover:text-brand-copper group-hover:-translate-x-1'
                                                }`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-center py-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                            <Search size={32} className="text-brand-navy/10 mb-4" />
                            <p className="text-brand-navy font-bold text-sm">لم يتم العثور على نشاط مطابق</p>
                            <p className="text-brand-navy/40 text-xs max-w-xs mt-1">تحدث معنا وسيقوم خبراؤنا بربط نموذج عملك بأحد الأنشطة المتاحة.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function InquiryForm({ selectedInquiry, setSelectedInquiry, submitted, setSubmitted, isSubmitting, submitError, firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone, handleSubmit, isMobileSheet }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, x: isMobileSheet ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isMobileSheet ? 0 : -20 }}
            className={`bg-white ${isMobileSheet ? '' : 'rounded-3xl p-8 border border-brand-copper/20 shadow-xl shadow-brand-copper/5'} relative`}
        >
            {!isMobileSheet && (
                <button onClick={() => setSelectedInquiry(null)} className="absolute top-4 left-4 p-2 text-brand-navy/20 hover:text-brand-navy transition-colors">
                    <X size={18} />
                </button>
            )}

            {!submitted ? (
                <>
                    <div className="mb-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-copper/10 rounded-full text-brand-copper text-[9px] font-black uppercase tracking-widest mb-3">
                            استفسار سريع
                        </div>
                        <h3 className="text-lg md:text-xl font-header font-black text-brand-navy tracking-tight mb-1" dir="ltr">
                            Setup in {selectedInquiry.zone}
                        </h3>
                        <p className="text-brand-navy/40 text-xs">
                            بخصوص: <span className="text-brand-navy font-bold">{selectedInquiry.activity}</span>
                        </p>
                    </div>

                    <div className="space-y-3">
                        {submitError && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-xl text-xs text-center font-medium">
                                {submitError}
                            </div>
                        )}
                        <div className="flex gap-2">
                            <input
                                value={firstName}
                                onChange={(e: any) => setFirstName(e.target.value)}
                                placeholder="الاسم الأول"
                                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-copper transition-all text-sm outline-none text-brand-navy"
                            />
                            <input
                                value={lastName}
                                onChange={(e: any) => setLastName(e.target.value)}
                                placeholder="الاسم الأخير"
                                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-copper transition-all text-sm outline-none text-brand-navy"
                            />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                            placeholder="البريد الإلكتروني"
                            className="text-left w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-copper transition-all text-sm outline-none text-brand-navy"
                            dir="ltr"
                        />
                        <div dir="ltr">
                            <PhoneInput
                                international
                                defaultCountry="AE"
                                value={phone}
                                onChange={(value: any) => setPhone(value?.toString() || '')}
                                className="phone-input-custom w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus-within:border-brand-copper transition-all text-sm font-bold text-brand-navy"
                                placeholder="رقم الواتساب"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? 'جاري المعالجة...' : (
                                <>اطلب دليل التأسيس <ArrowLeft size={15} /></>
                            )}
                        </button>

                        {isMobileSheet && (
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="w-full text-center text-brand-navy/30 text-xs font-bold py-2"
                            >
                                إلغاء
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-10">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
                        <CheckCircle2 size={32} className="text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-header font-black text-brand-navy mb-2 tracking-tight">تم الإرسال بنجاح!</h3>
                    <p className="text-brand-navy/40 text-xs max-w-[200px]">
                        سيتواصل معك أحد متخصصي التأسيس بخصوص <span className="font-bold text-brand-navy" dir="ltr">{selectedInquiry.zone}</span> قريباً.
                    </p>
                    <button
                        onClick={() => { setSelectedInquiry(null); setSubmitted(false); }}
                        className="mt-6 text-brand-copper font-black text-[9px] uppercase tracking-widest hover:underline"
                    >
                        العودة للأداة
                    </button>
                </div>
            )}
        </motion.div>
    );
}

function CTACard({ scrollToForm }: { scrollToForm: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-brand-navy rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
        >
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-copper/10 rounded-full -ml-16 -mt-16 blur-3xl pointer-events-none" />
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center mb-5">
                    <Sparkles size={22} className="text-brand-copper" />
                </div>
                <h3 className="text-xl font-header font-black tracking-tight mb-2">لا تستطيع إيجاد نشاطك؟</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-6 font-medium">العديد من نماذج الأعمال الحديثة يمكن أن تتطلب أنشطة متعددة. خبراؤنا هنا لمساعدتك واختيار النشاط الأنسب لك.</p>
                <div className="space-y-5 mb-7">
                    {[
                        { icon: ShieldCheck, text: "تجنب أخطاء التراخيص المكلفة", sub: "النشاط الخطأ يعني الرسوم الضائعة" },
                        { icon: Clock, text: "تأسيس خلال 2-5 أيام، وليس أسابيع", sub: "نحن نعرف كافّة التفاصيل والإجراءات" },
                        { icon: BadgeCheck, text: "شريك معتمد من الدوائر الحكومية", sub: "وصول مباشر وحصري إلى الدوائر المحلية" },
                        { icon: Banknote, text: "أسعار شفافة وشاملة", sub: "بدون رسوم حكومية مخفية أو إضافات" },
                        { icon: Globe2, text: "أكثر من 3000 نشاط في النظام", sub: "ندير جميع إجراءات الشركات المتعددة الأنشطة" },
                        { icon: HeartHandshake, text: "مندوب علاقات عامة (PRO) خاص بك", sub: "شخص واحد من أجل إتمام كل المعاملات" },
                    ].map(({ icon: Icon, text, sub }, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(194,134,103,0.15)', border: '1px solid rgba(194,134,103,0.2)' }}>
                                <Icon size={13} className="text-brand-copper" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black tracking-tight text-white">{text}</div>
                                <div className="text-[9px] font-medium text-white/30 mt-0.5">{sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={scrollToForm} className="btn-primary w-full text-sm flex items-center justify-center gap-2">
                احصل على استشارة مجانية <ArrowLeft size={16} />
            </button>
        </motion.div>
    );
}

function ProTip() {
    return (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
                <LayoutGrid size={16} className="text-brand-copper" />
                <h4 className="text-brand-navy font-black text-xs tracking-widest">معلومة مهمة</h4>
            </div>
            <p className="text-brand-navy/50 text-[10px] font-medium leading-relaxed">
                اختيارك للنشاط التجاري يحدد في أي المناطق الحرة يمكنك العمل. انقر على أي نشاط لمعرفة السعر.
            </p>
        </div>
    );
}
