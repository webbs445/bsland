'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe, Building2, Banknote, ArrowRight, Phone, CheckCircle2, MessageCircle,
    ChevronLeft, Briefcase, Monitor, ShoppingCart, Truck, UtensilsCrossed,
    Megaphone, BarChart3, HelpCircle, Wallet, CreditCard, Gem, Trophy,
    Flag, Globe2, Plane, UserCircle, Users, UserCheck, FileCheck, RotateCcw,
    Zap
} from 'lucide-react';
import { submitLeadAction } from '@/app/actions/lead';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { getUTMParams } from '@/hooks/useUTMParams';

// ─── Static Data ──────────────────────────────────────────────────────────────

const highlights = [
    { icon: Globe, text: "Trade Freely", color: "text-blue-500" },
    { icon: Building2, text: "Flexible Office", color: "text-purple-500" },
    { icon: Banknote, text: "0% Tax", color: "text-amber-500" },
];

const termToDropdown: Record<string, string> = {
    'llc': 'Set up an LLC for liability protection',
    'limited liability': 'Set up an LLC for liability protection',
    'free zone': 'Start a Free Zone company',
    'freezone': 'Start a Free Zone company',
    'compare': 'Compare costs and options',
    'trade license': 'Get a trade license / e-commerce license',
    'e-commerce license': 'Get a trade license / e-commerce license',
    'ecommerce license': 'Get a trade license / e-commerce license',
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
        if (lowerTerm.includes(keyword)) { dropdownMatch = option; break; }
    }
    return { service, dropdownMatch };
}

// ─── Quiz Data ────────────────────────────────────────────────────────────────

const quizQuestions = [
    {
        id: 'businessType',
        question: 'What type of business are you setting up?',
        subtitle: 'Choose the category closest to your activity',
        options: [
            { value: 'trading', label: 'Trading / Import & Export', icon: Truck },
            { value: 'tech', label: 'Tech / Software / SaaS', icon: Monitor },
            { value: 'consulting', label: 'Consulting / Services', icon: Briefcase },
            { value: 'ecommerce', label: 'E-Commerce / Retail', icon: ShoppingCart },
            { value: 'finance', label: 'Finance / Investment', icon: BarChart3 },
            { value: 'media', label: 'Marketing & Media', icon: Megaphone },
            { value: 'food', label: 'Food & Hospitality', icon: UtensilsCrossed },
            { value: 'other', label: 'Other / Not Sure', icon: HelpCircle },
        ],
    },
    {
        id: 'market',
        question: 'Where will most of your customers be?',
        subtitle: 'Your market determines the best license type',
        options: [
            { value: 'uae_local', label: 'Primarily UAE (local clients)', icon: Flag },
            { value: 'uae_mix', label: 'UAE + International mix', icon: Globe2 },
            { value: 'international', label: 'Mostly international', icon: Plane },
            { value: 'online', label: 'Online / Global', icon: Globe },
        ],
    },
    {
        id: 'visas',
        question: 'How many UAE visas will you need?',
        subtitle: 'Visa quota depends on your office and free zone',
        options: [
            { value: '1', label: 'Just myself (1 visa)', icon: UserCircle },
            { value: '2-5', label: 'Small team  (2–5)', icon: Users },
            { value: '6-15', label: 'Growing team (6–15)', icon: UserCheck },
            { value: '15+', label: 'Large team (15+)', icon: Building2 },
        ],
    },
    {
        id: 'budget',
        question: "What's your annual setup budget?",
        subtitle: 'Includes license, visa & office costs per year',
        options: [
            { value: 'budget', label: 'Under AED 15,000', icon: Wallet },
            { value: 'mid', label: 'AED 15,000 – 40,000', icon: CreditCard },
            { value: 'premium', label: 'AED 40,000 – 100,000', icon: Gem },
            { value: 'enterprise', label: 'AED 100,000+', icon: Trophy },
        ],
    },
];

interface Estimate {
    type: string;
    icon: React.ElementType;
    color: string;
    costRange: string;
    setupTime: string;
    matchScore: number;
    tagline: string;
    lookingTo: string;
}

function computeEstimate(answers: Record<string, string>): Estimate {
    const { market, visas, budget } = answers;

    if (market === 'uae_local' || visas === '15+') {
        return {
            type: 'Mainland LLC',
            icon: Building2,
            color: '#C28667',
            costRange: 'AED 15,000 – 45,000',
            setupTime: '3–5 days',
            matchScore: 93,
            tagline: 'Full UAE market access · No trading restrictions',
            lookingTo: 'Set up an LLC for liability protection',
        };
    }
    if (budget === 'enterprise') {
        return {
            type: 'Mainland LLC',
            icon: Building2,
            color: '#C28667',
            costRange: 'AED 40,000 – 120,000',
            setupTime: '3–5 days',
            matchScore: 91,
            tagline: 'Full market access · Unlimited visa quota',
            lookingTo: 'Set up an LLC for liability protection',
        };
    }
    if (budget === 'budget') {
        return {
            type: 'Free Zone Company',
            icon: Globe,
            color: '#4A90D9',
            costRange: 'AED 5,750 – 12,900',
            setupTime: '2–4 days',
            matchScore: 96,
            tagline: 'Lowest cost · 100% ownership · 0% tax',
            lookingTo: 'Start a Free Zone company',
        };
    }
    if (answers.businessType === 'finance') {
        return {
            type: 'Free Zone Company',
            icon: FileCheck,
            color: '#7C3AED',
            costRange: 'AED 25,000 – 60,000',
            setupTime: '3–7 days',
            matchScore: 90,
            tagline: 'DIFC / DMCC · Regulated finance hub',
            lookingTo: 'Start a Free Zone company',
        };
    }
    return {
        type: 'Free Zone Company',
        icon: Globe,
        color: '#4A90D9',
        costRange: 'AED 12,900 – 28,000',
        setupTime: '2–4 days',
        matchScore: 89,
        tagline: '100% foreign ownership · 0% tax · Fast setup',
        lookingTo: 'Start a Free Zone company',
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
    // Quiz state
    const [phase, setPhase] = useState<'quiz' | 'reveal' | 'contact' | 'success'>('quiz');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
    const [estimate, setEstimate] = useState<Estimate | null>(null);
    const [revealing, setRevealing] = useState(false);

    // Contact form state
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', whatsapp: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Left column state
    const [tickerIndex, setTickerIndex] = useState(0);
    const [utmService, setUtmService] = useState<string | null>(null);

    const tickerMessages = [
        "78% of new investors use our guide before choosing a free zone.",
        "Over 5,000+ companies formed successfully",
        "Average setup time: 3-5 business days",
        "Golden Visa acquired by investors in UAE",
        "Free Zone companies are tax exempt",
    ];

    useEffect(() => {
        const { service } = getUTMData();
        setUtmService(service);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTickerIndex((prev) => (prev + 1) % tickerMessages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Auto-detect visitor country
    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data?.country_calling_code) {
                    // store for phone prefill if needed
                }
            })
            .catch(() => { });
    }, []);

    const handleQuizSelect = (questionId: string, value: string) => {
        const newAnswers = { ...quizAnswers, [questionId]: value };
        setQuizAnswers(newAnswers);

        setTimeout(() => {
            if (questionIndex < quizQuestions.length - 1) {
                setQuestionIndex(q => q + 1);
            } else {
                // Last question answered — compute and reveal
                const est = computeEstimate(newAnswers);
                setEstimate(est);
                setRevealing(true);
                setPhase('reveal');
                setTimeout(() => setRevealing(false), 1800);
            }
        }, 260);
    };

    const handleBack = () => {
        if (phase === 'contact') { setPhase('reveal'); return; }
        if (phase === 'reveal') { setPhase('quiz'); setQuestionIndex(quizQuestions.length - 1); return; }
        if (questionIndex > 0) setQuestionIndex(q => q - 1);
    };

    const handleRetake = () => {
        setQuizAnswers({});
        setEstimate(null);
        setQuestionIndex(0);
        setPhase('quiz');
        setRevealing(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!estimate) return;
        const utmParams = getUTMParams();
        setIsSubmitting(true);
        try {
            let countryName = 'United Arab Emirates';
            if (formData.whatsapp) {
                try {
                    const parsed = parsePhoneNumber(formData.whatsapp);
                    if (parsed?.country) {
                        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                        countryName = regionNames.of(parsed.country) || parsed.country;
                    }
                } catch { /* fallback */ }
            }

            const profileSummary = [
                `Business: ${quizAnswers.businessType}`,
                `Market: ${quizAnswers.market}`,
                `Visas: ${quizAnswers.visas}`,
                `Budget: ${quizAnswers.budget}`,
                `Recommendation: ${estimate.type}`,
                `Estimated Cost: ${estimate.costRange}`,
            ].join(' | ');

            const result = await submitLeadAction({
                first_name: formData.firstName,
                last_name: formData.lastName,
                custom_service_enquired: 'Business Setup',
                custom_client_profile_and_requirement: `[Smart Calculator] ${profileSummary}`,
                email_id: formData.email,
                mobile_no: formData.whatsapp,
                country: countryName,
                ...utmParams,
            });

            if (result.success) {
                setPhase('success');
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

    const currentQuestion = quizQuestions[questionIndex];
    const quizProgress = ((questionIndex + (phase !== 'quiz' ? 1 : 0)) / quizQuestions.length) * 100;

    return (
        <section className="relative min-h-[92vh] bg-brand-navy overflow-hidden flex items-center">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(194,134,103,0.1) 0%, transparent 70%)' }}
                />
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

                    {/* ── Left Column (unchanged) ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-brand-copper/20 rounded-full px-4 py-2 mb-8 shadow-sm">
                            <span className="w-2 h-2 bg-brand-copper rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Authorized DED & Free Zone Channel Partner</span>
                        </div>

                        <h1
                            className="mb-6 font-header text-white"
                            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.05 }}
                        >
                            {utmService ? (
                                <>{utmService} in Dubai{' '}<span className="inline-block" style={{ background: 'linear-gradient(135deg, var(--color-brand-copper), #E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Made Simple.</span></>
                            ) : (
                                <>Your Business License in Dubai{' '}<span className="inline-block" style={{ background: 'linear-gradient(135deg, var(--color-brand-copper), #E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Set Up & Protected.</span></>
                            )}
                        </h1>

                        <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-xl font-medium">
                            {utmService
                                ? `Looking for ${utmService.toLowerCase()} in Dubai? We handle every signature, every submission, every government interaction — so you don't have to.`
                                : 'You focus on your vision. We handle every signature, every submission, every government interaction. From first consultation to your first day of business.'}
                        </p>

                        {/* Highlights Bar */}
                        <style>{`
                            @keyframes pillShimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
                            @keyframes pillGlow { 0%, 100% { box-shadow: 0 0 15px rgba(194,134,103,0.15), 0 0 30px rgba(194,134,103,0.05); } 50% { box-shadow: 0 0 20px rgba(194,134,103,0.35), 0 0 50px rgba(194,134,103,0.12); } }
                            @keyframes borderFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                            @keyframes iconPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(194,134,103,0.3); } 50% { box-shadow: 0 0 0 8px rgba(194,134,103,0); } }
                        `}</style>
                        <div className="grid grid-cols-3 gap-5 mb-10">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                                    whileHover={{ scale: 1.06, y: -4 }}
                                    className="relative group flex flex-col items-center gap-3 rounded-2xl px-5 py-6 cursor-default overflow-hidden"
                                    style={{ animation: `pillGlow 3s ease-in-out infinite`, animationDelay: `${index * 0.7}s` }}
                                >
                                    <div className="absolute inset-0 rounded-2xl p-[1.5px]" style={{ background: 'linear-gradient(90deg, rgba(194,134,103,0.1), rgba(194,134,103,0.6), rgba(232,201,122,0.5), rgba(194,134,103,0.6), rgba(194,134,103,0.1))', backgroundSize: '200% 100%', animation: `borderFlow 4s ease-in-out infinite`, animationDelay: `${index * 0.8}s` }}>
                                        <div className="w-full h-full rounded-2xl bg-[#0d1d35]" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-11 h-11 rounded-xl bg-brand-copper/10 border border-brand-copper/25 flex items-center justify-center" style={{ animation: `iconPulse 2.5s ease-in-out infinite`, animationDelay: `${index * 0.5}s` }}>
                                            <item.icon className="w-5 h-5 text-brand-copper" />
                                        </div>
                                    </div>
                                    <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.15em] text-white/90">{item.text}</span>
                                    <span className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" style={{ animation: `pillShimmer 3.5s ease-in-out infinite`, animationDelay: `${index * 0.6}s` }} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Live Ticker */}
                        <div className="h-14 mb-12 relative overflow-hidden bg-brand-copper/5 border-l-4 border-brand-copper rounded-r-xl">
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
                                        <p className="text-sm font-bold text-white tracking-tight italic">{tickerMessages[tickerIndex]}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Free Zone Partners Marquee */}
                        <div className="pt-8 border-t border-white/5">
                            <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em] mb-5">Free Zones We Service</p>
                            <style>{`
                                @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                                .fz-pill { position: relative; overflow: hidden; }
                                .fz-pill::before { content: ''; position: absolute; inset: 0; border-radius: 9999px; padding: 1px; background: linear-gradient(135deg, rgba(194,134,103,0.4), rgba(255,255,255,0.05), rgba(194,134,103,0.2)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
                                .fz-pill::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(194,134,103,0.15), transparent); animation: fzShimmer 4s ease-in-out infinite; }
                                @keyframes fzShimmer { 0%, 100% { left: -100%; } 50% { left: 100%; } }
                            `}</style>
                            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]">
                                <div className="flex items-center gap-3 w-max" style={{ animation: 'scrollLeft 35s linear infinite' }}>
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
                                            { name: 'Dubai Economy', logo: '/logo/Dubai-Economy.webp' },
                                            { name: 'DWTC', logo: '/logo/Dubai-World-Trade-Center.webp' },
                                            { name: 'UAQ', logo: '/logo/UAQ.webp' },
                                        ].map(({ name, logo }) => (
                                            <span key={`fz-${i}-${name}`} className="fz-pill group flex-shrink-0 px-4 py-2 rounded-full bg-white/[0.03] whitespace-nowrap backdrop-blur-sm hover:bg-brand-copper/[0.08] transition-all duration-400 cursor-default">
                                                <span className="relative z-10 flex items-center gap-2">
                                                    <img src={logo} alt={name} className="h-6 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ filter: 'brightness(0) invert(1)' }} />
                                                </span>
                                            </span>
                                        ))
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Right Column — Smart Calculator Form ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-brand-copper/10 rounded-[40px] blur-3xl -z-10" />

                            <div id="hero-form" className="relative bg-[#1a2b45]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-7 sm:p-9 shadow-2xl overflow-hidden">

                                {/* ── Success ── */}
                                {phase === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-14"
                                    >
                                        <div className="w-20 h-20 bg-brand-copper rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brand-copper/30">
                                            <CheckCircle2 className="w-10 h-10 text-brand-navy" />
                                        </div>
                                        <h4 className="text-2xl font-header font-black text-white mb-2 tracking-tight uppercase">You're All Set!</h4>
                                        <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                                            Your advisor will contact you<br />within 10 minutes with your full breakdown.
                                        </p>
                                        {estimate && (
                                            <div className="mt-6 px-4 py-3 rounded-xl border inline-block" style={{ background: `${estimate.color}15`, borderColor: `${estimate.color}40` }}>
                                                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: estimate.color }}>{estimate.type} · {estimate.costRange}</p>
                                            </div>
                                        )}
                                    </motion.div>

                                ) : (
                                    <>
                                        {/* Header & Progress */}
                                        <div className="mb-5">
                                            <div className="flex items-center justify-between mb-3">
                                                {(phase !== 'quiz' || questionIndex > 0) ? (
                                                    <button type="button" onClick={handleBack} className="flex items-center gap-1 text-white/30 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
                                                        <ChevronLeft className="w-3.5 h-3.5" /> Back
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <Zap className="w-3.5 h-3.5 text-brand-copper" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-copper">Smart Setup Calculator</span>
                                                    </div>
                                                )}
                                                <span className="text-[9px] font-black uppercase tracking-widest text-white/25">
                                                    {phase === 'quiz' ? `${questionIndex + 1} / ${quizQuestions.length}` : phase === 'reveal' ? 'Your estimate' : 'Almost done'}
                                                </span>
                                            </div>
                                            <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ background: 'linear-gradient(90deg, #C28667, #E8C97A)' }}
                                                    initial={false}
                                                    animate={{ width: phase === 'contact' ? '100%' : phase === 'reveal' ? '100%' : `${quizProgress}%` }}
                                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                />
                                            </div>
                                        </div>

                                        <AnimatePresence mode="wait">

                                            {/* ── Phase: Quiz ── */}
                                            {phase === 'quiz' && (
                                                <motion.div
                                                    key={`quiz-${questionIndex}`}
                                                    initial={{ opacity: 0, x: 25 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -25 }}
                                                    transition={{ duration: 0.28 }}
                                                >
                                                    <h3 className="text-lg font-header font-black text-white tracking-tight mb-0.5">{currentQuestion.question}</h3>
                                                    <p className="text-white/35 text-[11px] font-medium mb-4">{currentQuestion.subtitle}</p>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {currentQuestion.options.map(({ value, label, icon: Icon }) => {
                                                            const isSelected = quizAnswers[currentQuestion.id] === value;
                                                            return (
                                                                <motion.button
                                                                    key={value}
                                                                    type="button"
                                                                    onClick={() => handleQuizSelect(currentQuestion.id, value)}
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.97 }}
                                                                    className="flex items-center gap-2.5 px-3 py-3 rounded-xl border text-left transition-all duration-200"
                                                                    style={{
                                                                        background: isSelected ? 'rgba(194,134,103,0.15)' : 'rgba(255,255,255,0.03)',
                                                                        borderColor: isSelected ? '#C28667' : 'rgba(255,255,255,0.08)',
                                                                    }}
                                                                >
                                                                    <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" style={{ background: isSelected ? 'rgba(194,134,103,0.2)' : 'rgba(255,255,255,0.05)' }}>
                                                                        <Icon className="w-3.5 h-3.5" style={{ color: isSelected ? '#C28667' : 'rgba(255,255,255,0.4)' }} />
                                                                    </div>
                                                                    <span className="text-[11px] font-semibold leading-tight" style={{ color: isSelected ? '#fff' : 'rgba(255,255,255,0.6)' }}>{label}</span>
                                                                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 ml-auto flex-shrink-0 text-brand-copper" />}
                                                                </motion.button>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="mt-4 flex items-center justify-center gap-4 text-white/20 text-[9px] font-black uppercase tracking-widest">
                                                        <span>No obligation</span><span>·</span><span>~2 minutes</span><span>·</span><span>100% free</span>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* ── Phase: Reveal ── */}
                                            {phase === 'reveal' && estimate && (
                                                <motion.div
                                                    key="reveal"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    {revealing ? (
                                                        <div className="py-10 flex flex-col items-center gap-4">
                                                            <div className="flex gap-1.5">
                                                                {[0, 1, 2].map(i => (
                                                                    <motion.div
                                                                        key={i}
                                                                        className="w-2 h-2 rounded-full bg-brand-copper"
                                                                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                                                                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Calculating your profile…</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {/* Profile chips */}
                                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                                {Object.values(quizAnswers).map((val, i) => (
                                                                    <span key={i} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-[10px] font-bold text-white/50 capitalize">{val.replace(/_/g, ' ')}</span>
                                                                ))}
                                                            </div>

                                                            {/* Recommendation card */}
                                                            <motion.div
                                                                initial={{ scale: 0.95, opacity: 0 }}
                                                                animate={{ scale: 1, opacity: 1 }}
                                                                transition={{ delay: 0.1 }}
                                                                className="rounded-2xl p-5 mb-4 border"
                                                                style={{ background: `${estimate.color}12`, borderColor: `${estimate.color}35` }}
                                                            >
                                                                <div className="flex items-center justify-between mb-3">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: estimate.color }}>
                                                                            <estimate.icon className="w-5 h-5 text-white" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">Best Match</p>
                                                                            <h4 className="font-header font-black text-white text-base tracking-tight">{estimate.type}</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="font-header font-black text-2xl" style={{ color: estimate.color }}>{estimate.matchScore}%</div>
                                                                        <p className="text-white/25 text-[8px] font-black uppercase tracking-widest">match</p>
                                                                    </div>
                                                                </div>
                                                                <p className="text-white/40 text-[11px] font-medium mb-3">{estimate.tagline}</p>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="bg-white/5 rounded-lg px-3 py-2">
                                                                        <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-0.5">Est. Cost Range</p>
                                                                        <p className="font-header font-black text-white text-sm">{estimate.costRange}</p>
                                                                    </div>
                                                                    <div className="bg-white/5 rounded-lg px-3 py-2">
                                                                        <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-0.5">Setup Time</p>
                                                                        <p className="font-header font-black text-white text-sm">{estimate.setupTime}</p>
                                                                    </div>
                                                                </div>
                                                            </motion.div>

                                                            <p className="text-center text-white/35 text-[11px] font-medium mb-4">
                                                                Enter your details to get a <strong className="text-white/60">full itemized breakdown</strong> from an expert advisor.
                                                            </p>

                                                            <div className="flex gap-2">
                                                                <motion.button
                                                                    type="button"
                                                                    onClick={() => setPhase('contact')}
                                                                    whileHover={{ scale: 1.02, boxShadow: '0 12px 35px rgba(255,190,163,0.4)' }}
                                                                    whileTap={{ scale: 0.97 }}
                                                                    className="relative overflow-hidden flex-1 h-13 rounded-xl font-black text-[13px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 group"
                                                                    style={{ background: 'linear-gradient(135deg, #d4956f 0%, #C28667 50%, #a86c4f 100%)', color: '#fff' }}
                                                                >
                                                                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                                                                    Get Full Breakdown <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                                </motion.button>
                                                                <button
                                                                    type="button"
                                                                    onClick={handleRetake}
                                                                    className="px-4 h-13 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                                                >
                                                                    <RotateCcw className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </motion.div>
                                            )}

                                            {/* ── Phase: Contact Form ── */}
                                            {phase === 'contact' && estimate && (
                                                <motion.div
                                                    key="contact"
                                                    initial={{ opacity: 0, x: 25 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -25 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {/* Mini estimate reminder */}
                                                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border mb-5" style={{ background: `${estimate.color}10`, borderColor: `${estimate.color}30` }}>
                                                        <estimate.icon className="w-4 h-4 flex-shrink-0" style={{ color: estimate.color }} />
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: estimate.color }}>{estimate.type}</p>
                                                            <p className="text-white/40 text-[10px] font-medium">{estimate.costRange} · {estimate.setupTime}</p>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-lg font-header font-black text-white tracking-tight mb-0.5">Get your full breakdown</h3>
                                                    <p className="text-brand-copper text-[10px] font-black uppercase tracking-widest mb-5">Advisor will contact you in 10 minutes</p>

                                                    <form onSubmit={handleSubmit} className="space-y-3">
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                placeholder="First Name"
                                                                value={formData.firstName}
                                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                                required
                                                                className="w-1/2 h-12 px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Last Name"
                                                                value={formData.lastName}
                                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                                required
                                                                className="w-1/2 h-12 px-4 bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium"
                                                            />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            placeholder="Email Address"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            required
                                                            className="w-full h-12 px-5 bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium"
                                                        />
                                                        <div className="space-y-1">
                                                            <label className="text-[9px] font-black uppercase tracking-widest text-white/25 ml-1">WhatsApp Number</label>
                                                            <PhoneInput
                                                                international
                                                                defaultCountry="AE"
                                                                value={formData.whatsapp}
                                                                onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                                className="phone-input-custom-hero w-full h-12 px-5 bg-white/5 border border-white/10 rounded-xl focus-within:border-brand-copper transition-all text-sm font-medium text-white"
                                                                placeholder="WhatsApp Number"
                                                            />
                                                        </div>
                                                        <motion.button
                                                            type="submit"
                                                            disabled={isSubmitting}
                                                            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 16px 40px rgba(255,190,163,0.45)' }}
                                                            whileTap={{ scale: 0.97, y: 0 }}
                                                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                                            className="relative overflow-hidden w-full h-14 mt-1 rounded-xl font-black text-[15px] uppercase tracking-[0.18em] flex items-center justify-center gap-2 shadow-2xl group"
                                                            style={{ background: 'linear-gradient(135deg, #d4956f 0%, #C28667 50%, #a86c4f 100%)', color: '#fff' }}
                                                        >
                                                            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                                                            {isSubmitting ? 'Processing…' : (
                                                                <><span>{utmService ? `Get My ${utmService} Plan` : 'Send My Breakdown'}</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
                                                            )}
                                                        </motion.button>
                                                    </form>
                                                </motion.div>
                                            )}

                                        </AnimatePresence>

                                        {/* Footer links */}
                                        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white/30 text-[9px] font-black uppercase tracking-widest border-t border-white/5 pt-5">
                                            <a href="tel:+971522330011" className="flex items-center gap-2 hover:text-white transition-colors group">
                                                <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 group-hover:bg-brand-copper/20 transition-colors">
                                                    <Phone className="w-2.5 h-2.5 text-brand-copper" />
                                                </div>
                                                <span>+971 52 233 0011</span>
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

                        {/* Trust Indicators */}
                        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {[
                                { value: "5,000+", label: "Companies Formed" },
                                { value: "23+", label: "Years Experience" },
                                { value: "4.8★", label: "Google Rating" },
                                { value: "3-5", label: "Days Setup" },
                            ].map((stat, index) => (
                                <div key={index}>
                                    <div className="text-xl font-header font-black text-brand-copper tracking-tighter">{stat.value}</div>
                                    <div className="text-[8px] font-bold uppercase tracking-widest text-white/30 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
