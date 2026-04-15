'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Building2, Banknote, ArrowRight, Phone, CheckCircle2, Check, MessageCircle, ChevronLeft, ChevronDown, Briefcase, Monitor, ShoppingCart, Truck, UtensilsCrossed, Megaphone, BarChart3, Heart, Bitcoin, HelpCircle, HardHat, Store, Warehouse, Users, Wifi, Building, TrendingUp, UserPlus, Landmark, ArrowLeftRight } from 'lucide-react';
import { submitLeadAction } from '@/app/actions/lead';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { getUTMParams } from '@/hooks/useUTMParams';

const highlights = [
    { icon: Globe, text: "Trade Freely", color: "text-blue-500" },
    { icon: Building2, text: "Flexible Office", color: "text-purple-500" },
    { icon: Banknote, text: "0% Tax", color: "text-amber-500" },
];


const dropdownOptions = [
    "Set up an LLC for liability protection",
    "Start a Free Zone company",
    "Compare costs and options",
    "Get a trade license / e-commerce license",
    "I need expert guidance — not sure yet",
] as const;

const termToDropdown: Record<string, string> = {
    'llc': dropdownOptions[0],
    'limited liability': dropdownOptions[0],
    'liability protection': dropdownOptions[0],
    'free zone': dropdownOptions[1],
    'freezone': dropdownOptions[1],
    'free zone company': dropdownOptions[1],
    'compare': dropdownOptions[2],
    'cost comparison': dropdownOptions[2],
    'trade license': dropdownOptions[3],
    'e-commerce license': dropdownOptions[3],
    'ecommerce license': dropdownOptions[3],
    'trading license': dropdownOptions[3],
};

function getUTMData(): { service: string | null; dropdownMatch: string | null } {
    if (typeof window === 'undefined') return { service: null, dropdownMatch: null };
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source')?.toLowerCase();
    const term = params.get('utm_term');
    if (source !== 'google' || !term) return { service: null, dropdownMatch: null };

    const normalized = term.replace(/[_+\-]+/g, ' ').trim();
    const service = normalized.replace(/\b\w/g, c => c.toUpperCase());

    const lowerTerm = normalized.toLowerCase();
    let dropdownMatch: string | null = null;
    for (const [keyword, option] of Object.entries(termToDropdown)) {
        if (lowerTerm.includes(keyword)) {
            dropdownMatch = option;
            break;
        }
    }

    return { service, dropdownMatch };
}

const businessCategories = [
    { label: 'Consulting & Professional Services', subtitle: 'Consulting, Recruitment, Business Accelerator', icon: Briefcase },
    { label: 'Technology & IT', subtitle: 'Technology, Telecommunications, Communications', icon: Monitor },
    { label: 'E-Commerce & Retail', subtitle: 'E-commerce, Retail, Apparel, Electronics', icon: ShoppingCart },
    { label: 'Trading & Import/Export', subtitle: 'Shipping, Machinery, Chemicals, Manufacturing', icon: Truck },
    { label: 'Food & Hospitality', subtitle: 'Food & Beverage, Hospitality, Recreation', icon: UtensilsCrossed },
    { label: 'Construction & Real Estate', subtitle: 'Construction, Engineering, Environmental', icon: HardHat },
    { label: 'Marketing, Media & Entertainment', subtitle: 'Marketing, Media, Entertainment, Publishing', icon: Megaphone },
    { label: 'Finance & Investment', subtitle: 'Finance, Banking, Private Equity, Insurance', icon: BarChart3 },
    { label: 'Healthcare & Sciences', subtitle: 'Healthcare, Biotechnology, Education', icon: Heart },
    { label: 'Web3, Crypto & Blockchain', subtitle: 'Web3/Crypto, Energy, Utilities', icon: Bitcoin },
    { label: 'Other / Not Sure', subtitle: "Tell us what you do and we'll find the right license", icon: HelpCircle },
];

const setupReasonOptions = [
    { label: 'New company formation', icon: Building2 },
    { label: 'Expansion plan (ie. new branch or franchise)', icon: TrendingUp },
    { label: 'Company relocation', icon: ArrowLeftRight },
    { label: 'Visa purposes only', icon: UserPlus },
];

const officeTypeOptions = [
    { label: 'Virtual Office', subtitle: 'Work from anywhere — lightest cost', icon: Wifi },
    { label: 'Physical Office', subtitle: 'Dedicated private office space', icon: Building },
    { label: 'Shop Front', subtitle: 'Retail or customer-facing space', icon: Store },
    { label: 'Business Centre', subtitle: 'Shared workspace and meeting rooms', icon: Users },
    { label: 'Warehouse', subtitle: 'Industrial or storage space', icon: Warehouse },
];

const jurisdictionOptions = [
    { label: 'Free Zone', subtitle: 'International clients, e-commerce, consulting, tech', icon: Globe },
    { label: 'Mainland', subtitle: 'Local UAE market, government contracts, retail', icon: Landmark },
    { label: 'Not Sure Yet', subtitle: "We'll compare both options for you", icon: HelpCircle },
];

export default function HeroSection() {
    const [step, setStep] = useState(1);
    const [businessType, setBusinessType] = useState('');
    const [customActivity, setCustomActivity] = useState('');
    const [setupReason, setSetupReason] = useState('');
    const [shareholders, setShareholders] = useState<number | null>(null);
    const [visas, setVisas] = useState<number | null>(null);
    const [officeType, setOfficeType] = useState('');
    const [jurisdiction, setJurisdiction] = useState('');
    const [livingInUAE, setLivingInUAE] = useState('');
    const [startTimeline, setStartTimeline] = useState('');
    const [showJurisdictionCompare, setShowJurisdictionCompare] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+971',
        whatsapp: '',
    });
    const [tickerIndex, setTickerIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [utmService, setUtmService] = useState<string | null>(null);

    useEffect(() => {
        const { service } = getUTMData();
        setUtmService(service);
    }, []);

    const tickerMessages = [
        "78% of new investors use our guide before choosing a free zone.",
        "Over 5,000+ companies formed successfully",
        "Average setup time: 3-5 business days", "Golden Visa accquired by investors in UAE",
        "Free Zone companies are tax exempt",];

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
        const utmParams = getUTMParams();
        setIsSubmitting(true);
        try {
            const countryMap: Record<string, string> = {
                '+971': 'United Arab Emirates', '+91': 'India', '+92': 'Pakistan', '+966': 'Saudi Arabia',
                '+44': 'United Kingdom', '+1': 'United States', '+20': 'Egypt', '+968': 'Oman',
                '+974': 'Qatar', '+965': 'Kuwait', '+973': 'Bahrain', '+880': 'Bangladesh',
                '+94': 'Sri Lanka', '+63': 'Philippines', '+7': 'Russia', '+33': 'France',
                '+49': 'Germany', '+86': 'China'
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

            const result = await submitLeadAction({
                first_name: formData.firstName,
                last_name: formData.lastName,
                custom_service_enquired: "Business Setup",
                custom_client_profile_and_requirement: `Business: ${businessType}${customActivity ? ` (${customActivity})` : ''} <br> Reason: ${setupReason} <br> Shareholders: ${shareholders ?? 'N/A'} <br> Visas: ${visas ?? 'N/A'} <br> Office: ${officeType} <br> Jurisdiction: ${jurisdiction} <br> In UAE: ${livingInUAE} <br> Start: ${startTimeline}`,
                email_id: formData.email,
                mobile_no: formData.whatsapp,
                country: countryName,
                ...utmParams,
            });
            if (result.success) {
                setSubmitted(true);
            } else {
                alert(result.error || 'Submission failed. Please check your details and try again.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative min-h-[auto] lg:min-h-[92vh] bg-brand-navy overflow-hidden flex items-center">
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

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-24 w-full">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/5 border border-brand-copper/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 mt-6 sm:mt-0 shadow-sm">
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-copper rounded-full animate-pulse" />
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/80">Authorized DED & Free Zone Channel Partner</span>
                        </div>

                        <h1
                            className="mb-4 sm:mb-6 font-header text-white"
                            style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.08 }}
                        >
                            {utmService ? (
                                <>
                                    Best Solution For {' '}
                                    <span
                                        className="inline-block"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--color-brand-copper), #E8C97A)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                      {utmService}.  Made Simple.
                                    </span>
                                </>
                            ) : (
                                <>
                                    Best Solution For Your Business {' '}
                                    <span
                                        className="inline-block"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--color-brand-copper), #E8C97A)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                      in Dubai.
                                    </span>
                                </>
                            )}
                        </h1>

                        <p className="text-sm sm:text-base lg:text-lg text-white/60 mb-6 sm:mb-10 leading-relaxed max-w-xl font-medium">
                            {utmService
                                ? `Looking for ${utmService.toLowerCase()} in Dubai? We handle every signature, every submission, every government interaction — so you don't have to.`
                                : 'You focus on your vision. We handle every signature, every submission, every government interaction. From first consultation to your first day of business.'}
                        </p>

                        {/* Highlights Bar */}
                        <style>{`
                            @keyframes pillShimmer {
                                0% { transform: translateX(-100%); }
                                100% { transform: translateX(100%); }
                            }
                            @keyframes pillGlow {
                                0%, 100% { box-shadow: 0 0 15px rgba(194,134,103,0.15), 0 0 30px rgba(194,134,103,0.05); }
                                50% { box-shadow: 0 0 20px rgba(194,134,103,0.35), 0 0 50px rgba(194,134,103,0.12); }
                            }
                            @keyframes borderFlow {
                                0% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                                100% { background-position: 0% 50%; }
                            }
                            @keyframes iconPulse {
                                0%, 100% { box-shadow: 0 0 0 0 rgba(194,134,103,0.3); }
                                50% { box-shadow: 0 0 0 8px rgba(194,134,103,0); }
                            }
                        `}</style>
                        <div className="grid grid-cols-3 gap-2 sm:gap-5 mb-6 sm:mb-10">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                                    whileHover={{ scale: 1.06, y: -4 }}
                                    className="relative group flex flex-col items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl px-3 py-4 sm:px-5 sm:py-6 cursor-default overflow-hidden"
                                    style={{
                                        animation: `pillGlow 3s ease-in-out infinite`,
                                        animationDelay: `${index * 0.7}s`,
                                    }}
                                >
                                    {/* Animated gradient border wrapper */}
                                    <div
                                        className="absolute inset-0 rounded-2xl p-[1.5px]"
                                        style={{
                                            background: 'linear-gradient(90deg, rgba(194,134,103,0.1), rgba(194,134,103,0.6), rgba(232,201,122,0.5), rgba(194,134,103,0.6), rgba(194,134,103,0.1))',
                                            backgroundSize: '200% 100%',
                                            animation: `borderFlow 4s ease-in-out infinite`,
                                            animationDelay: `${index * 0.8}s`,
                                        }}
                                    >
                                        <div className="w-full h-full rounded-2xl bg-[#0d1d35]" />
                                    </div>

                                    {/* Icon with pulse ring */}
                                    <div className="relative z-10">
                                        <div
                                            className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-brand-copper/10 border border-brand-copper/25 flex items-center justify-center"
                                            style={{
                                                animation: `iconPulse 2.5s ease-in-out infinite`,
                                                animationDelay: `${index * 0.5}s`,
                                            }}
                                        >
                                            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-copper" />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <span className="relative z-10 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white/90">
                                        {item.text}
                                    </span>

                                    {/* Continuous shimmer sweep */}
                                    <span
                                        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                                        style={{
                                            animation: `pillShimmer 3.5s ease-in-out infinite`,
                                            animationDelay: `${index * 0.6}s`,
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Live Ticker */}
                        <div className="h-12 sm:h-14 mb-8 sm:mb-12 relative overflow-hidden bg-brand-copper/5 border-l-4 border-brand-copper rounded-r-xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={tickerIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 flex items-center px-3 sm:px-6"
                                >
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                                        <p className="text-xs sm:text-sm font-bold text-white tracking-tight italic">{tickerMessages[tickerIndex]}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Free Zone Partners — dual row marquee */}
                        <div className="pt-6 sm:pt-8 border-t border-white/5 hidden sm:block">
                            <p className="text-white/20 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-5">Free Zones We Service</p>
                            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
                                <div className="fz-marquee">
                                    {[...Array(2)].map((_, i) => (
                                        [
                                            { name: 'DMCC', logo: '/logo/Dmcc.webp' },
                                            { name: 'IFZA', logo: '/logo/Ifza.webp' },
                                            { name: 'RAKEZ', logo: '/logo/rakez.webp' },
                                            { name: 'Meydan', logo: '/logo/meydan.webp' },
                                            { name: 'SHAMS', logo: '/logo/Shams.webp' },
                                            { name: 'SPC', logo: '/logo/SPC.webp' },
                                            { name: 'Ajman', logo: '/logo/Ajman.webp' },
                                            { name: 'SRTIP', logo: '/logo/Sharjah-Research-Technology-and-Innovation-Park.webp' },
                                            { name: 'DIFC', logo: '/logo/Difc.webp' },
                                            { name: 'DED', logo: '/logo/Dubai-Economy.webp' },
                                            { name: 'DWTC', logo: '/logo/Dubai-World-Trade-Center.webp' },
                                            { name: 'UAQ', logo: '/logo/UAQ.webp' },
                                        ].map(({ name, logo }) => (
                                            <div key={`fz-${i}-${name}`} className="fz-card">
                                                <img src={logo} alt={name} className="fz-card__logo" />
                                                <span className="fz-card__name">{name}</span>
                                            </div>
                                        ))
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Multi-step Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Decorative Glow */}
                            <div className="absolute -inset-4 bg-brand-copper/10 rounded-[40px] blur-3xl -z-10" />

                            <div id="hero-form" className="relative bg-[#1a2b45]/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-[32px] p-5 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">

                                <div className="text-center mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-white/5">
                                    <h3 className="text-lg sm:text-2xl font-header font-black text-white tracking-tight uppercase">Cost Calculator</h3>
                                    <p className="text-brand-copper text-[8px] sm:text-[10px] font-black uppercase tracking-widest mt-1">Free instant estimate for your business setup</p>
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
                                        <h4 className="text-2xl font-header font-black text-white mb-2 tracking-tight uppercase">Success!</h4>
                                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Your advisor will contact you in 10 minutes.</p>
                                    </motion.div>
                                ) : (
                                    <>
                                        {/* Creative Step Indicator */}
                                        <div className="mb-4 sm:mb-5">
                                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                                                {step > 1 ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(s => s - 1)}
                                                        className="flex items-center gap-1 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
                                                    >
                                                        <ChevronLeft className="w-3.5 h-3.5" /> Back
                                                    </button>
                                                ) : <span />}
                                                {/* Numbered step circles */}
                                                <div className="flex items-center">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <div key={s} className="flex items-center">
                                                            <div className={`relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[8px] sm:text-[9px] font-black transition-all duration-300 ${
                                                                s < step
                                                                    ? 'bg-brand-copper text-white'
                                                                    : s === step
                                                                    ? 'bg-brand-copper text-white shadow-[0_0_14px_rgba(194,134,103,0.7)] ring-2 ring-brand-copper/25 ring-offset-1 ring-offset-[#1a2b45]'
                                                                    : 'bg-white/5 text-white/20 border border-white/10'
                                                            }`}>
                                                                {s < step ? <Check className="w-2.5 h-2.5" /> : s}
                                                            </div>
                                                            {s < 5 && (
                                                                <div className={`w-3 sm:w-5 h-px transition-all duration-500 ${s < step ? 'bg-brand-copper' : 'bg-white/10'}`} />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Progress bar */}
                                            <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ background: 'linear-gradient(90deg, #C28667, #E8C97A)' }}
                                                    initial={false}
                                                    animate={{ width: `${(step / 5) * 100}%` }}
                                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                                />
                                            </div>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {/* Step 1 — Business Category */}
                                            {step === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {/* <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-brand-copper mb-1">Calculate Your Cost</p> */}
                                                    <h3 className="text-lg sm:text-xl font-header font-black text-white mb-1 tracking-tight">What type of business?</h3>
                                                    <p className="text-white/40 text-[11px] sm:text-xs mb-3">Select the category closest to your activity.</p>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[45vh] sm:max-h-none overflow-y-auto sm:overflow-visible">
                                                        {businessCategories.map(({ label, subtitle, icon: Icon }) => (
                                                            <button
                                                                key={label}
                                                                type="button"
                                                                onClick={() => { setBusinessType(label); if (label !== 'Other / Not Sure') setStep(2); }}
                                                                className={`group relative flex items-start gap-2 px-2.5 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                                                                    businessType === label
                                                                        ? 'border-brand-copper bg-gradient-to-br from-brand-copper/20 to-amber-500/5 text-white shadow-[0_0_18px_rgba(194,134,103,0.2)]'
                                                                        : 'border-white/8 bg-white/[0.03] text-white/60 hover:border-brand-copper/40 hover:bg-brand-copper/5 hover:text-white hover:scale-[1.02]'
                                                                }`}
                                                            >
                                                                <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors mt-0.5 ${
                                                                    businessType === label ? 'bg-brand-copper/25' : 'bg-white/5 group-hover:bg-brand-copper/10'
                                                                }`}>
                                                                    <Icon className="w-3 h-3 text-brand-copper" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <span className="text-[12px] font-bold leading-tight block">{label}</span>
                                                                    <span className="text-[10px] text-white/30 leading-tight block mt-0.5 truncate">{subtitle}</span>
                                                                </div>
                                                                {businessType === label && (
                                                                    <Check className="w-3 h-3 text-brand-copper absolute top-2 right-2 flex-shrink-0" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    {businessType === 'Other / Not Sure' && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -8 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.25 }}
                                                            className="mt-3 space-y-2"
                                                        >
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Describe your business activity</p>
                                                            <input
                                                                type="text"
                                                                autoFocus
                                                                placeholder="e.g. Online coaching, dropshipping, photography..."
                                                                value={customActivity}
                                                                onChange={(e) => setCustomActivity(e.target.value)}
                                                                className="w-full h-11 px-4 bg-white/5 border border-brand-copper/40 text-white placeholder:text-white/25 rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => { if (customActivity.trim()) setStep(2); }}
                                                                disabled={!customActivity.trim()}
                                                                className={`w-full h-11 rounded-xl font-black text-[12px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all duration-200 ${
                                                                    customActivity.trim()
                                                                        ? 'bg-brand-copper text-white hover:opacity-90'
                                                                        : 'bg-white/5 text-white/20 cursor-not-allowed'
                                                                }`}
                                                            >
                                                                Continue <ArrowRight className="w-4 h-4" />
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                    <div className="mt-3 flex items-center justify-center gap-4 text-white/20 text-[9px] font-black uppercase tracking-widest">
                                                        <span>No obligation</span><span>·</span><span>~2 min</span><span>·</span><span>100% free</span>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Step 2 — Setup Reason */}
                                            {step === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-brand-copper mb-1">{businessType}</p>
                                                    <h3 className="text-lg sm:text-xl font-header font-black text-white mb-1 tracking-tight">Why are you setting up in UAE?</h3>
                                                    <p className="text-white/40 text-[11px] sm:text-xs mb-4 sm:mb-5">Select your primary reason — we'll tailor your plan.</p>
                                                    <div className="flex flex-col gap-2 sm:gap-3">
                                                        {setupReasonOptions.map(({ label, icon: Icon }) => (
                                                            <button
                                                                key={label}
                                                                type="button"
                                                                onClick={() => { setSetupReason(label); setStep(3); }}
                                                                className={`group flex items-center gap-3 sm:gap-4 px-3 py-3 sm:px-5 sm:py-4 rounded-xl border text-left transition-all duration-300 ${
                                                                    setupReason === label
                                                                        ? 'border-brand-copper bg-gradient-to-r from-brand-copper/20 to-transparent text-white shadow-[0_0_20px_rgba(194,134,103,0.18)]'
                                                                        : 'border-white/8 bg-white/[0.03] text-white/50 hover:border-brand-copper/40 hover:bg-brand-copper/5 hover:text-white hover:translate-x-1'
                                                                }`}
                                                            >
                                                                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ${
                                                                    setupReason === label ? 'bg-brand-copper/25 shadow-[0_0_12px_rgba(194,134,103,0.3)]' : 'bg-white/5 group-hover:bg-brand-copper/10'
                                                                }`}>
                                                                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-copper" />
                                                                </div>
                                                                <span className="flex-1 text-[12px] sm:text-[13px] font-bold">{label}</span>
                                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                                                                    setupReason === label ? 'border-brand-copper bg-brand-copper' : 'border-white/20'
                                                                }`}>
                                                                    {setupReason === label && <Check className="w-2.5 h-2.5 text-white" />}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <p className="text-center text-white/20 text-[9px] font-black uppercase tracking-widest mt-5">Click any option to continue</p>
                                                </motion.div>
                                            )}

                                            {/* Step 3 — Team & Office */}
                                            {step === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-brand-copper mb-1">Team & Office</p>
                                                    <h3 className="text-lg sm:text-xl font-header font-black text-white mb-3 sm:mb-4 tracking-tight">Tell us about your setup</h3>
                                                    <div className="space-y-4">
                                                        {/* Shareholders */}
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">Owners / Shareholders</p>
                                                            <div className="flex gap-1.5 flex-wrap">
                                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                                                    <button
                                                                        key={n}
                                                                        type="button"
                                                                        onClick={() => setShareholders(n)}
                                                                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-black transition-all duration-200 ${
                                                                            shareholders === n
                                                                                ? 'bg-brand-copper text-white shadow-[0_0_14px_rgba(194,134,103,0.4)] scale-110'
                                                                                : 'bg-white/5 text-white/50 border border-white/8 hover:border-brand-copper/50 hover:text-white hover:scale-105'
                                                                        }`}
                                                                    >{n}</button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {/* Visas */}
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">Residence Visas Needed</p>
                                                            <div className="flex gap-1.5 flex-wrap">
                                                                {[0, 1, 2, 3, 4, 5, 6, 7].map(n => (
                                                                    <button
                                                                        key={n}
                                                                        type="button"
                                                                        onClick={() => setVisas(n)}
                                                                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-black transition-all duration-200 ${
                                                                            visas === n
                                                                                ? 'bg-brand-copper text-white shadow-[0_0_14px_rgba(194,134,103,0.4)] scale-110'
                                                                                : 'bg-white/5 text-white/50 border border-white/8 hover:border-brand-copper/50 hover:text-white hover:scale-105'
                                                                        }`}
                                                                    >{n}</button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {/* Office Type */}
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">Office Type</p>
                                                            <div className="flex flex-col gap-1.5">
                                                                {officeTypeOptions.map(({ label, subtitle, icon: Icon }) => (
                                                                    <button
                                                                        key={label}
                                                                        type="button"
                                                                        onClick={() => setOfficeType(label)}
                                                                        className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left transition-all duration-200 ${
                                                                            officeType === label
                                                                                ? 'border-brand-copper bg-gradient-to-r from-brand-copper/15 to-transparent text-white'
                                                                                : 'border-white/8 bg-white/[0.03] text-white/60 hover:border-brand-copper/40 hover:bg-brand-copper/5 hover:text-white'
                                                                        }`}
                                                                    >
                                                                        <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${officeType === label ? 'bg-brand-copper/25' : 'bg-white/5 group-hover:bg-brand-copper/10'}`}>
                                                                            <Icon className="w-3.5 h-3.5 text-brand-copper" />
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <span className="text-[11px] font-bold block">{label}</span>
                                                                            <span className="text-[9px] text-white/35 block">{subtitle}</span>
                                                                        </div>
                                                                        {officeType === label && <Check className="w-3.5 h-3.5 text-brand-copper flex-shrink-0" />}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(4)}
                                                        className="w-full h-12 mt-4 rounded-xl font-black text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-brand-copper text-white hover:opacity-90 transition-all duration-200"
                                                    >
                                                        Continue <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </motion.div>
                                            )}

                                            {/* Step 4 — Location & Timeline */}
                                            {step === 4 && (
                                                <motion.div
                                                    key="step4"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-brand-copper mb-1">Location & Timeline</p>
                                                    <h3 className="text-lg sm:text-xl font-header font-black text-white mb-3 sm:mb-4 tracking-tight">Where & when to start?</h3>
                                                    <div className="space-y-4">
                                                        {/* Jurisdiction */}
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">Preferred Jurisdiction</p>
                                                            <div className="flex flex-col gap-1.5">
                                                                {jurisdictionOptions.map(({ label, subtitle, icon: Icon }) => (
                                                                    <button
                                                                        key={label}
                                                                        type="button"
                                                                        onClick={() => setJurisdiction(label)}
                                                                        className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                                                                            jurisdiction === label
                                                                                ? 'border-brand-copper bg-gradient-to-r from-brand-copper/15 to-transparent text-white'
                                                                                : 'border-white/8 bg-white/[0.03] text-white/60 hover:border-brand-copper/40 hover:bg-brand-copper/5 hover:text-white'
                                                                        }`}
                                                                    >
                                                                        <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${jurisdiction === label ? 'bg-brand-copper/25' : 'bg-white/5 group-hover:bg-brand-copper/10'}`}>
                                                                            <Icon className="w-3 h-3 text-brand-copper" />
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <span className="text-[11px] font-bold block">{label}</span>
                                                                            <span className="text-[9px] text-white/40 block">{subtitle}</span>
                                                                        </div>
                                                                        {jurisdiction === label && <Check className="w-3.5 h-3.5 text-brand-copper flex-shrink-0" />}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowJurisdictionCompare(v => !v)}
                                                                className="mt-2 text-[9px] font-black uppercase tracking-widest text-brand-copper/70 hover:text-brand-copper transition-colors flex items-center gap-1"
                                                            >
                                                                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showJurisdictionCompare ? 'rotate-180' : ''}`} />
                                                                Compare Free Zone vs. Mainland
                                                            </button>
                                                            {showJurisdictionCompare && (
                                                                <div className="mt-2 rounded-xl border border-white/8 overflow-hidden">
                                                                    <table className="w-full text-[9px]">
                                                                        <thead>
                                                                            <tr className="bg-white/5">
                                                                                <th className="px-3 py-2 text-left font-black uppercase tracking-wider text-white/40"></th>
                                                                                <th className="px-3 py-2 text-center font-black uppercase tracking-wider text-brand-copper">Free Zone</th>
                                                                                <th className="px-3 py-2 text-center font-black uppercase tracking-wider text-white/60">Mainland</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y divide-white/5">
                                                                            {[
                                                                                ['Ownership', '100% foreign', '100% foreign*'],
                                                                                ['Trade in UAE', 'Limited', 'Full access'],
                                                                                ['Govt contracts', 'No', 'Yes'],
                                                                                ['Office required', 'Virtual OK', 'Physical needed'],
                                                                                ['Speed', '1–3 days', '3–7 days'],
                                                                                ['Corp tax', '0% qualifying', '9% on 375K+'],
                                                                            ].map(([label, fz, ml]) => (
                                                                                <tr key={label}>
                                                                                    <td className="px-3 py-1.5 text-white/40 font-bold">{label}</td>
                                                                                    <td className="px-3 py-1.5 text-center text-brand-copper font-bold">{fz}</td>
                                                                                    <td className="px-3 py-1.5 text-center text-white/50 font-bold">{ml}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* Living in UAE */}
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">Are you currently living in the UAE?</p>
                                                            <div className="flex gap-2">
                                                                {['Yes', 'No'].map(opt => (
                                                                    <button
                                                                        key={opt}
                                                                        type="button"
                                                                        onClick={() => setLivingInUAE(opt)}
                                                                        className={`flex-1 h-10 rounded-xl border text-sm font-black transition-all duration-200 ${
                                                                            livingInUAE === opt
                                                                                ? 'border-brand-copper bg-brand-copper/15 text-white shadow-[0_0_12px_rgba(194,134,103,0.2)]'
                                                                                : 'border-white/8 bg-white/[0.03] text-white/50 hover:border-brand-copper/50 hover:text-white'
                                                                        }`}
                                                                    >{opt}</button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {/* Timeline */}
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">When do you plan to start?</p>
                                                            <div className="grid grid-cols-2 gap-1.5">
                                                                {['This Month', 'Next Month', '3 Months', '6 Months'].map(opt => (
                                                                    <button
                                                                        key={opt}
                                                                        type="button"
                                                                        onClick={() => setStartTimeline(opt)}
                                                                        className={`h-10 rounded-xl border text-[11px] font-black transition-all duration-200 ${
                                                                            startTimeline === opt
                                                                                ? 'border-brand-copper bg-brand-copper/15 text-white shadow-[0_0_12px_rgba(194,134,103,0.2)]'
                                                                                : 'border-white/8 bg-white/[0.03] text-white/50 hover:border-brand-copper/50 hover:text-white'
                                                                        }`}
                                                                    >{opt}</button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(5)}
                                                        className="w-full h-12 mt-4 rounded-xl font-black text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-brand-copper text-white hover:opacity-90 transition-all duration-200"
                                                    >
                                                        Continue <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </motion.div>
                                            )}

                                            {/* Step 5 — Contact Details */}
                                            {step === 5 && (
                                                <motion.div
                                                    key="step5"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <h3 className="text-lg sm:text-xl font-header font-black text-white mb-1 tracking-tight">{utmService ? `Get ${utmService} Help` : 'Get Expert Help Now'}</h3>
                                                    <p className="text-brand-copper text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-4 sm:mb-5">Your advisor will contact you in 10 minutes</p>
                                                    {/* Summary pills of previous answers */}
                                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                                        {[businessType, setupReason, officeType || null, jurisdiction || null].filter(Boolean).map((val) => (
                                                            <span key={val} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-copper/10 border border-brand-copper/25 text-[9px] font-black text-brand-copper/80 uppercase tracking-wider">
                                                                <Check className="w-2.5 h-2.5" />{val}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <form onSubmit={handleSubmit} className="space-y-3">
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                placeholder="First Name"
                                                                value={formData.firstName}
                                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                                required
                                                                className="w-1/2 h-11 sm:h-13 px-3 sm:px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl outline-none focus:border-brand-copper transition-all text-xs sm:text-sm font-medium"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Last Name"
                                                                value={formData.lastName}
                                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                                required
                                                                className="w-1/2 h-11 sm:h-13 px-3 sm:px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl outline-none focus:border-brand-copper transition-all text-xs sm:text-sm font-medium"
                                                            />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            placeholder="Email Address"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            required
                                                            className="w-full h-11 sm:h-13 px-4 sm:px-5 bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl outline-none focus:border-brand-copper transition-all text-xs sm:text-sm font-medium"
                                                        />
                                                        <div className="space-y-1">
                                                            <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">WhatsApp Number</label>
                                                            <PhoneInput
                                                                international
                                                                defaultCountry="AE"
                                                                value={formData.whatsapp}
                                                                onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                                className="phone-input-custom-hero w-full h-11 sm:h-13 px-4 sm:px-5 bg-white/5 border border-white/10 rounded-xl focus-within:border-brand-copper transition-all text-xs sm:text-sm font-medium text-white"
                                                                placeholder="WhatsApp Number"
                                                            />
                                                        </div>
                                                        <motion.button
                                                            type="submit"
                                                            disabled={isSubmitting}
                                                            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 16px 40px rgba(255,190,163,0.45)' }}
                                                            whileTap={{ scale: 0.97, y: 0 }}
                                                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                                            className="relative overflow-hidden w-full h-12 sm:h-14 mt-2 rounded-xl font-black text-[13px] sm:text-[15px] uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center justify-center gap-2 shadow-2xl group"
                                                            style={{ background: 'linear-gradient(135deg, #d4956f 0%, #C28667 50%, #a86c4f 100%)', color: '#ffffff' }}
                                                        >
                                                            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                                                            {isSubmitting ? 'Processing...' : (
                                                                <><span>{utmService ? `Get My ${utmService} Plan` : 'Get My Setup Plan'}</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
                                                            )}
                                                        </motion.button>
                                                    </form>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-white/40 text-[8px] sm:text-[9px] font-black uppercase tracking-widest border-t border-white/5 pt-4 sm:pt-6">
                                            <a href="tel:+971522330011" className="flex items-center gap-2 hover:text-white transition-colors group">
                                                <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 group-hover:bg-brand-copper/20 transition-colors">
                                                    <Phone className="w-2.5 h-2.5 text-brand-copper" />
                                                </div>
                                                <span>Call: +971 52 233 0011</span>
                                            </a>
                                            <div className="w-px h-3 bg-white/10 hidden sm:block" />
                                            <a href="https://wa.me/971522330011" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                                                <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 group-hover:bg-[#25D366]/20 transition-colors">
                                                    <MessageCircle className="w-2.5 h-2.5 text-[#25D366]" />
                                                </div>
                                                <span>WhatsApp Us</span>
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Trust Indicators — below form */}
                        <div className="mt-6 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                            {[
                                { value: "5,000+", label: "Companies Formed" },
                                { value: "23+", label: "Years Experience" },
                                { value: "4.8★", label: "Google Rating" },
                                { value: "3-5", label: "Days Setup" },
                            ].map((stat, index) => (
                                <div key={index}>
                                    <div className="text-lg sm:text-xl font-header font-black text-white tracking-tighter">{stat.value}</div>
                                    <div className="text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-white/30 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div >
        </section >
    );
}
