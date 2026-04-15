'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Building2, Banknote, ArrowRight, Phone, CheckCircle2, MessageCircle } from 'lucide-react';
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

export default function HeroSection() {
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
    const [utmService, setUtmService] = useState<string | null>(null);

    useEffect(() => {
        const { service, dropdownMatch } = getUTMData();
        setUtmService(service);
        if (dropdownMatch) {
            setFormData(prev => ({ ...prev, lookingTo: dropdownMatch }));
        }
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

            const serviceMap: Record<string, string> = {
                'llc': 'Business Setup', 'freezone': 'Business Setup',
                'compare': 'Business Setup', 'license': 'Business Setup',
                'guidance': 'Business Setup'
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
                custom_service_enquired: serviceMap[formData.lookingTo] || "Business Setup",
                custom_client_profile_and_requirement: `Services Looking For: ${formData.lookingTo}`,
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
        <section className="relative min-h-[92vh] bg-brand-navy overflow-hidden flex items-center">
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
                    {/* Left Content */}
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
                                <>
                                    {utmService} in Dubai{' '}
                                    <span
                                        className="inline-block"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--color-brand-copper), #E8C97A)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        Made Simple.
                                    </span>
                                </>
                            ) : (
                                <>
                                    Your Business License in Dubai{' '}
                                    <span
                                        className="inline-block"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--color-brand-copper), #E8C97A)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        Set Up & Protected.
                                    </span>
                                </>
                            )}
                        </h1>

                        <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-xl font-medium">
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
                        <div className="grid grid-cols-3 gap-5 mb-10">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                                    whileHover={{ scale: 1.06, y: -4 }}
                                    className="relative group flex flex-col items-center gap-3 rounded-2xl px-5 py-6 cursor-default overflow-hidden"
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
                                            className="w-11 h-11 rounded-xl bg-brand-copper/10 border border-brand-copper/25 flex items-center justify-center"
                                            style={{
                                                animation: `iconPulse 2.5s ease-in-out infinite`,
                                                animationDelay: `${index * 0.5}s`,
                                            }}
                                        >
                                            <item.icon className="w-5 h-5 text-brand-copper" />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.15em] text-white/90">
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

                        {/* Free Zone Partners — dual row marquee */}
                        <div className="pt-8 border-t border-white/5">
                            <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em] mb-5">Free Zones We Service</p>
                            <style>{`
                                @keyframes scrollLeft {
                                    0% { transform: translateX(0); }
                                    100% { transform: translateX(-50%); }
                                }
                                @keyframes scrollRight {
                                    0% { transform: translateX(-50%); }
                                    100% { transform: translateX(0); }
                                }
                                .fz-pill {
                                    position: relative;
                                    overflow: hidden;
                                }
                                .fz-pill::before {
                                    content: '';
                                    position: absolute;
                                    inset: 0;
                                    border-radius: 9999px;
                                    padding: 1px;
                                    background: linear-gradient(135deg, rgba(194,134,103,0.4), rgba(255,255,255,0.05), rgba(194,134,103,0.2));
                                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                                    -webkit-mask-composite: xor;
                                    mask-composite: exclude;
                                }
                                .fz-pill::after {
                                    content: '';
                                    position: absolute;
                                    top: 0; left: -100%;
                                    width: 100%; height: 100%;
                                    background: linear-gradient(90deg, transparent, rgba(194,134,103,0.15), transparent);
                                    animation: fzShimmer 4s ease-in-out infinite;
                                }
                                @keyframes fzShimmer {
                                    0%, 100% { left: -100%; }
                                    50% { left: 100%; }
                                }
                            `}</style>
                            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]">
                                <div
                                    className="flex items-center gap-3 w-max"
                                    style={{ animation: 'scrollLeft 35s linear infinite' }}
                                >
                                    {[...Array(2)].map((_, i) => (
                                        ['DMCC', 'IFZA', 'RAKEZ', 'Meydan', 'Dubai South', 'ADGM', 'SHAMS', 'SPC', 'Ajman Nuventure', 'SRTIP', 'Masdar', 'Innovation City'].map((name) => (
                                            <span
                                                key={`fz-${i}-${name}`}
                                                className="fz-pill flex-shrink-0 px-5 py-2.5 rounded-full bg-white/[0.03] text-[10px] font-black uppercase tracking-[0.15em] text-white/60 whitespace-nowrap backdrop-blur-sm hover:text-brand-copper hover:bg-brand-copper/[0.08] transition-all duration-400 cursor-default"
                                            >
                                                <span className="relative z-10 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-copper/50" />
                                                    {name}
                                                </span>
                                            </span>
                                        ))
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Decorative Glow */}
                            <div className="absolute -inset-4 bg-brand-copper/10 rounded-[40px] blur-3xl -z-10" />

                            <div id="hero-form" className="relative bg-[#1a2b45]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 sm:p-10 shadow-2xl overflow-hidden">
                                <div className="text-center mb-10 pb-6 border-b border-white/5">
                                    <h3 className="text-2xl font-header font-black text-white mb-2 tracking-tight uppercase">{utmService ? `Get ${utmService} Help` : 'Get Expert Help Now'}</h3>
                                    <p className="text-brand-copper text-[10px] font-black uppercase tracking-widest">Your advisor will contact you in 10 minutes</p>
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
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="flex gap-2">
                                            <div className="group relative w-1/2">
                                                <input
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-4 sm:px-6 bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <div className="group relative w-1/2">
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    className="w-full h-14 px-4 sm:px-6 bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="group relative">
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full h-14 px-6 bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">
                                                WhatsApp Number
                                            </label>
                                            <PhoneInput
                                                international
                                                defaultCountry="AE"
                                                value={formData.whatsapp}
                                                onChange={(value) => setFormData({ ...formData, whatsapp: value?.toString() || '' })}
                                                className="phone-input-custom-hero w-full h-14 px-6 bg-white/5 border border-white/10 rounded-xl focus-within:border-brand-copper transition-all text-sm font-medium text-white"
                                                placeholder="WhatsApp Number"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">I'm looking to:</label>
                                            <select
                                                value={formData.lookingTo}
                                                onChange={(e) => setFormData({ ...formData, lookingTo: e.target.value })}
                                                required
                                                className="w-full h-14 px-6 bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:border-brand-copper transition-all text-sm font-medium appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled className="bg-brand-navy">Select one</option>
                                                <option value="Set up an LLC for liability protection" className="bg-brand-navy">Set up an LLC for liability protection</option>
                                                <option value="Start a Free Zone company" className="bg-brand-navy">Start a Free Zone company</option>
                                                <option value="Compare costs and options" className="bg-brand-navy">Compare costs and options</option>
                                                <option value="Get a trade license / e-commerce license" className="bg-brand-navy">Get a trade license / e-commerce license</option>
                                                <option value="I need expert guidance — not sure yet" className="bg-brand-navy">I need expert guidance — not sure yet</option>
                                            </select>
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 16px 40px rgba(255,190,163,0.45)' }}
                                            whileTap={{ scale: 0.97, y: 0 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                            className="relative overflow-hidden w-full h-16 mt-6 rounded-xl font-black text-[16px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-2xl group"
                                            style={{ background: 'linear-gradient(135deg, #d4956f 0%, #C28667 50%, #a86c4f 100%)', color: '#ffffff' }}
                                        >
                                            {/* Shimmer sweep */}
                                            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                                            {isSubmitting ? 'Processing...' : (
                                                <><span>{utmService ? `Get My ${utmService} Plan` : 'Get My Setup Plan'}</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
                                            )}
                                        </motion.button>
                                    </form>
                                )}

                                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white/40 text-[9px] font-black uppercase tracking-widest border-t border-white/5 pt-8">
                                    <a href="tel:+971522330011" className="flex items-center gap-2 hover:text-white transition-colors group">
                                        <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 group-hover:bg-brand-copper/20 transition-colors">
                                            <Phone className="w-2.5 h-2.5 text-brand-copper" />
                                        </div>
                                        <span>Call: +971 52 233 0011</span>
                                    </a>
                                    <div className="w-px h-3 bg-white/10 hidden sm:block"></div>
                                    <a href="https://wa.me/971522330011" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                                        <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 group-hover:bg-[#25D366]/20 transition-colors">
                                            <MessageCircle className="w-2.5 h-2.5 text-[#25D366]" />
                                        </div>
                                        <span>WhatsApp Us</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Trust Indicators — below form */}
                        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {[
                                { value: "5,000+", label: "Companies Formed" },
                                { value: "23+", label: "Years Experience" },
                                { value: "4.8★", label: "Google Rating" },
                                { value: "3-5", label: "Days Setup" },
                            ].map((stat, index) => (
                                <div key={index}>
                                    <div className="text-xl font-header font-black text-brand-copper tracking-tighter">
                                        {stat.value}
                                    </div>
                                    <div className="text-[8px] font-bold uppercase tracking-widest text-white/30 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div >
        </section >
    );
}