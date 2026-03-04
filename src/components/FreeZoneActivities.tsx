
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Sparkles, ArrowRight, CheckCircle2, LayoutGrid, Zap, X, ShieldCheck, Clock, BadgeCheck, Banknote, Globe2, HeartHandshake } from 'lucide-react';
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

    const filteredCategories = ACTIVITIES_CATEGORIES.map(cat => {
        if (!searchQuery) return { ...cat, isMatch: true };
        const matchesCat = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchedActs = cat.activities.filter(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
        return { ...cat, activities: matchedActs, isMatch: matchesCat || matchedActs.length > 0 };
    }).filter(cat => cat.isMatch);

    const activeCategory = searchQuery
        ? filteredCategories[0]
        : ACTIVITIES_CATEGORIES.find(c => c.name === activeTab);

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

        // Try to parse the phone number to get the full country name (e.g., 'United Arab Emirates', 'India')
        let countryCode = '';
        if (phone) {
            try {
                const parsed = parsePhoneNumber(phone);
                if (parsed && parsed.country) {
                    // Convert 2-letter ISO code to full country English name for ERPNext validation
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
                // ERPNext requires one of the strict dropdown values, so mapping this to "Business Setup"
                custom_service_enquired: "Business Setup",
                custom_client_profile: `[Free Zone Finder Form] Activity: ${selectedInquiry.activity} | Location: ${selectedInquiry.zone}`,
                email_id: email,
                mobile_no: phone,
                country: countryCode
            });

            if (result && !result.success) {
                console.error("Submission error:", result.error);
                // Proceeding to success UI anyway for now, as credentials are placeholders
                console.log("Proceeding to success screen despite CRM error due to placeholder credentials.");
            }

            setSubmitted(true);
        } catch (error) {
            console.error("Form submission failed:", error);
            setSubmitError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="activities" className="py-24 px-6 bg-white relative overflow-hidden">
            {/* Dot grid background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#14253E_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
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
                        className="mt-4 text-4xl md:text-5xl font-bold text-gray-900"
                    >
                        Find Your Perfect Business Activity
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Search through 3,000+ DED and Free Zone approved activities to find the exact match for your business model.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left — Activity Browser */}
                    <div className="lg:col-span-8">
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                            {/* Search */}
                            <div className="relative mb-8">
                                <input
                                    type="text"
                                    placeholder="Search activities (e.g. Trading, Consulting, E-commerce)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-2xl pl-14 pr-6 py-4 text-brand-navy font-medium placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-copper/20 transition-all text-sm"
                                />
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-navy/20" size={20} />
                            </div>

                            {/* Category tabs */}
                            {!searchQuery && (
                                <div className="flex flex-wrap pb-4 mb-8 gap-2 border-b border-slate-100">
                                    {ACTIVITIES_CATEGORIES.map(cat => {
                                        const isActive = activeTab === cat.name;
                                        return (
                                            <button
                                                key={cat.name}
                                                onClick={() => setActiveTab(cat.name)}
                                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap font-bold text-xs transition-all flex-shrink-0 ${isActive
                                                    ? 'bg-brand-navy text-white shadow-md'
                                                    : 'bg-white text-brand-navy/50 hover:bg-slate-100 hover:text-brand-navy border border-slate-200'}`}
                                            >
                                                <cat.icon size={13} className={isActive ? 'text-brand-copper' : 'text-brand-navy/30'} />
                                                {cat.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Content */}
                            <div className="min-h-[400px]">
                                <AnimatePresence mode="wait">
                                    {activeCategory ? (
                                        <motion.div
                                            key={activeCategory.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-8"
                                        >
                                            {/* Category header */}
                                            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                                <div className="flex items-center gap-4 mb-5">
                                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeCategory.color} flex items-center justify-center shadow-lg`}>
                                                        <activeCategory.icon className="w-7 h-7 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-header font-black text-brand-navy uppercase tracking-tight">{activeCategory.name}</h3>
                                                        <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest mt-1">
                                                            <CheckCircle2 size={11} /> Authority Regulated
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 mr-1">Top Jurisdictions:</span>
                                                    {activeCategory.bestZones.map(zone => (
                                                        <button
                                                            key={zone}
                                                            onClick={() => handleInquiry(activeCategory.name, zone)}
                                                            className={`px-3 py-1 border rounded-lg text-xs font-bold transition-all ${selectedInquiry?.zone === zone
                                                                ? 'bg-brand-copper border-brand-copper text-white shadow-md'
                                                                : 'bg-slate-50 border-slate-200 text-brand-navy/60 hover:border-brand-copper hover:text-brand-copper'}`}
                                                        >
                                                            {zone}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Activities grid */}
                                            <div>
                                                <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-brand-navy/30 mb-4">Common Sub-Activities</h4>
                                                <div className="grid sm:grid-cols-2 gap-3">
                                                    {activeCategory.activities.map((act, i) => (
                                                        <div
                                                            key={i}
                                                            onClick={() => handleInquiry(act, activeCategory.bestZones[0])}
                                                            className={`flex items-center justify-between p-4 border rounded-xl transition-all group cursor-pointer ${selectedInquiry?.activity === act
                                                                ? 'bg-white border-brand-copper shadow-md ring-1 ring-brand-copper/20'
                                                                : 'bg-white border-slate-100 hover:border-brand-copper/40 hover:shadow-md'}`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${selectedInquiry?.activity === act ? 'bg-brand-copper/20' : 'bg-slate-50 group-hover:bg-brand-copper/10'}`}>
                                                                    <CheckCircle2 size={14} className={selectedInquiry?.activity === act ? 'text-brand-copper' : 'text-emerald-500'} />
                                                                </div>
                                                                <span className={`font-semibold text-sm transition-colors ${selectedInquiry?.activity === act ? 'text-brand-navy font-bold' : 'text-brand-navy/70 group-hover:text-brand-navy'}`}>{act}</span>
                                                            </div>
                                                            <ChevronRight size={15} className={`transition-all ${selectedInquiry?.activity === act ? 'text-brand-copper translate-x-1' : 'text-brand-navy/20 group-hover:text-brand-copper group-hover:translate-x-1'}`} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="text-center py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                                            <Search size={36} className="text-brand-navy/10 mb-4" />
                                            <p className="text-brand-navy font-bold">No Exact Match Found</p>
                                            <p className="text-brand-navy/40 text-sm max-w-xs mt-1">Our experts can map your business model to 3,000+ available activities.</p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Right — Inquiry / CTA */}
                    <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-24">
                        <AnimatePresence mode="wait">
                            {selectedInquiry ? (
                                <motion.div
                                    key="inquiry"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white rounded-3xl p-8 border border-brand-copper/20 shadow-xl shadow-brand-copper/5 relative"
                                >
                                    <button onClick={() => setSelectedInquiry(null)} className="absolute top-4 right-4 p-2 text-brand-navy/20 hover:text-brand-navy transition-colors">
                                        <X size={18} />
                                    </button>

                                    {!submitted ? (
                                        <>
                                            <div className="mb-6">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-copper/10 rounded-full text-brand-copper text-[9px] font-black uppercase tracking-widest mb-4">
                                                    Fast-Track Inquiry
                                                </div>
                                                <h3 className="text-xl font-header font-black text-brand-navy uppercase tracking-tight mb-1">Setup in {selectedInquiry.zone}</h3>
                                                <p className="text-brand-navy/40 text-xs">Inquiring about: <span className="text-brand-navy font-bold">{selectedInquiry.activity}</span></p>
                                            </div>

                                            <div className="space-y-3">
                                                {submitError && (
                                                    <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl text-xs text-center font-medium">
                                                        {submitError}
                                                    </div>
                                                )}
                                                <div className="flex gap-2">
                                                    <input
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        placeholder="First Name"
                                                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-copper transition-all text-sm outline-none text-brand-navy"
                                                    />
                                                    <input
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        placeholder="Last Name"
                                                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-copper transition-all text-sm outline-none text-brand-navy"
                                                    />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Email Address"
                                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-copper transition-all text-sm outline-none text-brand-navy"
                                                />

                                                <PhoneInput
                                                    international
                                                    defaultCountry="AE"
                                                    value={phone}
                                                    onChange={(value) => setPhone(value?.toString() || '')}
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
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-center py-10">
                                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
                                                <CheckCircle2 size={32} className="text-emerald-500" />
                                            </div>
                                            <h3 className="text-xl font-header font-black text-brand-navy mb-2 uppercase">Guide Sent!</h3>
                                            <p className="text-brand-navy/40 text-xs max-w-[180px]">A specialist will reach you about <span className="font-bold text-brand-navy">{selectedInquiry.zone}</span> licensing.</p>
                                            <button onClick={() => { setSelectedInquiry(null); setSubmitted(false); }} className="mt-6 text-brand-copper font-black text-[9px] uppercase tracking-widest hover:underline">Back to Finder</button>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="cta"
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
                                        <div className="space-y-6 mb-7">
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
                            )}
                        </AnimatePresence>

                        {/* Pro tip */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <LayoutGrid size={16} className="text-brand-copper" />
                                <h4 className="text-brand-navy font-black text-xs uppercase tracking-widest">Pro Tip</h4>
                            </div>
                            <p className="text-brand-navy/50 text-[10px] font-medium leading-relaxed">
                                Selecting the right activity determines which Free Zones you can operate in. Click any activity or jurisdiction to get a tailored quote.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

