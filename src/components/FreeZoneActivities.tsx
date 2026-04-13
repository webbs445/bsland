'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Sparkles, ArrowRight, CheckCircle2, LayoutGrid, X, ShieldCheck, Clock, BadgeCheck, Banknote, Globe2, HeartHandshake } from 'lucide-react';
import { ACTIVITIES_CATEGORIES } from './FreeZoneData';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { submitLeadAction } from '@/app/actions/lead';

export default function FreeZoneActivities() {
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
    const [showBrowser, setShowBrowser] = useState(false);
    const tabsRef = useRef<HTMLDivElement>(null);

    const filteredCategories = ACTIVITIES_CATEGORIES.map(cat => {
        if (!searchQuery) return { ...cat, isMatch: true };
        const matchesCat = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchedActs = cat.activities.filter((a: string) => a.toLowerCase().includes(searchQuery.toLowerCase()));
        // If category name matches, show all its activities; otherwise show only matched ones
        const activities = matchesCat ? cat.activities : matchedActs;
        return { ...cat, activities, isMatch: matchesCat || matchedActs.length > 0 };
    }).filter((cat: any) => cat.isMatch);

    // When searching, merge ALL matched activities into a single virtual category
    const searchResultCategory = searchQuery && filteredCategories.length > 0 ? {
        name: `Search Results`,
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
                custom_service_enquired: "Business Setup",
                custom_client_profile_and_requirement: `[Free Zone Finder Form] Activity: ${selectedInquiry.activity} | Location: ${selectedInquiry.zone}`,
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
            setSubmitError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Scroll active tab into view when it changes
    useEffect(() => {
        if (tabsRef.current && !searchQuery) {
            const activeBtn = tabsRef.current.querySelector('[data-active="true"]') as HTMLElement;
            if (activeBtn) {
                activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [activeTab, searchQuery]);

    return (
        <section id="activities" className="py-16 md:py-24 px-4 md:px-6 bg-white relative overflow-hidden">
            {/* Dot grid background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#14253E_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold uppercase tracking-[0.2em] text-[#c28867]"
                    >
                        Licensed Activity Finder
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-3xl md:text-5xl font-bold text-gray-900"
                    >
                        Find Your Perfect Business Activity
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Search through 3,000+ DED and Free Zone approved activities to find the exact match for your business model.
                    </motion.p>
                </div>

                {/* ─── DESKTOP: Side-by-side grid ─── */}
                <div className="hidden lg:block">
                    <AnimatePresence mode="wait">
                        {!showBrowser ? (
                            <motion.div
                                key="explore-btn"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex justify-center"
                            >
                                <button
                                    onClick={() => setShowBrowser(true)}
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-navy text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                                >
                                    <Search size={18} className="text-brand-copper group-hover:scale-110 transition-transform" />
                                    Explore Activities
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="browser"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-12 gap-8 items-start"
                            >
                                {/* Left — Activity Browser */}
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
                                        onClose={() => setShowBrowser(false)}
                                    />
                                </div>

                                {/* Right — Inquiry / CTA */}
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

                                    {/* Pro tip */}
                                    <ProTip />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ─── MOBILE: Stacked layout with bottom sheet ─── */}
                <div className="lg:hidden">
                    <AnimatePresence mode="wait">
                        {!showBrowser ? (
                            <motion.div
                                key="explore-btn-mobile"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex justify-center"
                            >
                                <button
                                    onClick={() => setShowBrowser(true)}
                                    className="group inline-flex items-center gap-3 px-7 py-3.5 bg-brand-navy text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
                                >
                                    <Search size={16} className="text-brand-copper" />
                                    Explore Activities
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="browser-mobile"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
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
                                    onClose={() => setShowBrowser(false)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>



                    {/* Mobile bottom sheet for inquiry form */}
                    <AnimatePresence>
                        {selectedInquiry && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedInquiry(null)}
                                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                                />

                                {/* Sheet */}
                                <motion.div
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '100%' }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                                    className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
                                >
                                    {/* Drag handle */}
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

                {/* Mobile bottom padding so sticky CTA doesn't overlap last item */}
                <div className="lg:hidden h-20" />
            </div>
        </section>
    );
}

// ─── Sub-components ────────────────────────────────────────────────

function ActivityBrowser({ searchQuery, setSearchQuery, activeTab, setActiveTab, activeCategory, filteredCategories, selectedInquiry, handleInquiry, tabsRef, isMobile, onClose }: any) {
    return (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 md:p-8 shadow-sm relative overflow-hidden">
            {/* Close button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-5 md:right-5 z-10 p-2 rounded-xl bg-white border border-slate-200 text-brand-navy/40 hover:text-brand-navy hover:border-slate-300 transition-all shadow-sm"
                >
                    <X size={16} />
                </button>
            )}
            {/* Search */}
            <div className="relative mb-5 md:mb-8">
                <input
                    type="text"
                    placeholder="Search activities (e.g. Trading, Consulting)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-3.5 md:py-4 text-brand-navy font-medium placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-copper/20 transition-all text-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/20" size={18} />
            </div>

            {/* Category tabs — horizontal scroll on mobile, wrap on desktop */}
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

            {/* Content */}
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
                            {/* Category header */}
                            <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 md:gap-4 mb-4">
                                    <div className={`w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${activeCategory.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                        <activeCategory.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-base md:text-xl font-header font-black text-brand-navy uppercase tracking-tight">
                                            {searchQuery ? `${activeCategory.activities.length} Activities Found` : activeCategory.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest mt-1">
                                            <CheckCircle2 size={11} /> {searchQuery ? `Matching "${searchQuery}"` : 'Authority Regulated'}
                                        </div>
                                    </div>
                                </div>
                                {!searchQuery && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 mr-1 w-full md:w-auto">Top Jurisdictions:</span>
                                        {activeCategory.bestZones.map((zone: string) => (
                                            <button
                                                key={zone}
                                                onClick={() => handleInquiry(activeCategory.name, zone)}
                                                className={`px-3 py-1.5 border rounded-lg text-xs font-bold transition-all ${selectedInquiry?.zone === zone
                                                    ? 'bg-brand-copper border-brand-copper text-white shadow-md'
                                                    : 'bg-slate-50 border-slate-200 text-brand-navy/60 hover:border-brand-copper hover:text-brand-copper'
                                                    }`}
                                            >
                                                {zone}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Activities grid — 1 col on mobile, 2 col on sm+ */}
                            <div>
                                <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-brand-navy/30 mb-3">Common Sub-Activities</h4>
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
                                            <ChevronRight size={14} className={`flex-shrink-0 transition-all ${selectedInquiry?.activity === act ? 'text-brand-copper translate-x-1' : 'text-brand-navy/20 group-hover:text-brand-copper group-hover:translate-x-1'
                                                }`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-center py-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                            <Search size={32} className="text-brand-navy/10 mb-4" />
                            <p className="text-brand-navy font-bold text-sm">No Exact Match Found</p>
                            <p className="text-brand-navy/40 text-xs max-w-xs mt-1">Our experts can map your business model to 3,000+ available activities.</p>
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
            initial={{ opacity: 0, x: isMobileSheet ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isMobileSheet ? 0 : 20 }}
            className={`bg-white ${isMobileSheet ? '' : 'rounded-3xl p-8 border border-brand-copper/20 shadow-xl shadow-brand-copper/5'} relative`}
        >
            {!isMobileSheet && (
                <button onClick={() => setSelectedInquiry(null)} className="absolute top-4 right-4 p-2 text-brand-navy/20 hover:text-brand-navy transition-colors">
                    <X size={18} />
                </button>
            )}

            {!submitted ? (
                <>
                    <div className="mb-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-copper/10 rounded-full text-brand-copper text-[9px] font-black uppercase tracking-widest mb-3">
                            Fast-Track Inquiry
                        </div>
                        <h3 className="text-lg md:text-xl font-header font-black text-brand-navy uppercase tracking-tight mb-1">
                            Setup in {selectedInquiry.zone}
                        </h3>
                        <p className="text-brand-navy/40 text-xs">
                            Inquiring about: <span className="text-brand-navy font-bold">{selectedInquiry.activity}</span>
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
                                placeholder="First Name"
                                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-copper transition-all text-sm outline-none text-brand-navy"
                            />
                            <input
                                value={lastName}
                                onChange={(e: any) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-copper transition-all text-sm outline-none text-brand-navy"
                            />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-copper transition-all text-sm outline-none text-brand-navy"
                        />
                        <PhoneInput
                            international
                            defaultCountry="AE"
                            value={phone}
                            onChange={(value: any) => setPhone(value?.toString() || '')}
                            className="phone-input-custom w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus-within:border-brand-copper transition-all text-sm font-bold text-brand-navy"
                            placeholder="WhatsApp Number"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="btn-primary w-full mt-2"
                        >
                            {isSubmitting ? 'Processing...' : (
                                <>Request Setup Guide <ArrowRight size={15} /></>
                            )}
                        </button>

                        {isMobileSheet && (
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="w-full text-center text-brand-navy/30 text-xs font-bold py-2"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-10">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
                        <CheckCircle2 size={32} className="text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-header font-black text-brand-navy mb-2 uppercase">Guide Sent!</h3>
                    <p className="text-brand-navy/40 text-xs max-w-[200px]">
                        A specialist will reach you about <span className="font-bold text-brand-navy">{selectedInquiry.zone}</span> licensing.
                    </p>
                    <button
                        onClick={() => { setSelectedInquiry(null); setSubmitted(false); }}
                        className="mt-6 text-brand-copper font-black text-[9px] uppercase tracking-widest hover:underline"
                    >
                        Back to Finder
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-copper/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center mb-5">
                    <Sparkles size={22} className="text-brand-copper" />
                </div>
                <h3 className="text-xl font-header font-black uppercase tracking-tight mb-2">Can't find your activity?</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-6 font-medium">Many modern business models span multiple categories. Our experts will find the perfect match for you.</p>
                <div className="space-y-5 mb-7">
                    {[
                        { icon: ShieldCheck, text: "Avoid costly DED & MOHRE rejections", sub: "Wrong activity = wasted fees, refiled forms" },
                        { icon: Clock, text: "Setup in 2–5 days, not weeks", sub: "We know every shortcut in the system" },
                        { icon: BadgeCheck, text: "Authorized Channel Partner", sub: "Direct access to DED, IFZA, DMCC & more" },
                        { icon: Banknote, text: "Transparent, all-inclusive pricing", sub: "No hidden government fee surprises" },
                        { icon: Globe2, text: "3,000+ activities mapped for you", sub: "Multi-activity & custom combos handled" },
                        { icon: HeartHandshake, text: "Dedicated PRO officer assigned", sub: "One contact for every signature & stamp" },
                    ].map(({ icon: Icon, text, sub }, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(194,134,103,0.15)', border: '1px solid rgba(194,134,103,0.2)' }}>
                                <Icon size={13} className="text-brand-copper" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-tight text-white">{text}</div>
                                <div className="text-[9px] font-medium text-white/30 mt-0.5">{sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={scrollToForm} className="btn-primary w-full">
                Get Free Consultation <ArrowRight size={16} />
            </button>
        </motion.div>
    );
}

function ProTip() {
    return (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
                <LayoutGrid size={16} className="text-brand-copper" />
                <h4 className="text-brand-navy font-black text-xs uppercase tracking-widest">Pro Tip</h4>
            </div>
            <p className="text-brand-navy/50 text-[10px] font-medium leading-relaxed">
                Selecting the right activity determines which Free Zones you can operate in. Click any activity or jurisdiction to get a tailored quote.
            </p>
        </div>
    );
}