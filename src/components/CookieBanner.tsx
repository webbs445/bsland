'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Small delay so it doesn't flash on first paint
            const t = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(t);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        // GTM Consent Mode v2 — grant all
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
                analytics_storage: 'granted',
                functionality_storage: 'granted',
                personalization_storage: 'granted',
            });
        }
        setVisible(false);
    };

    const decline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        // GTM Consent Mode v2 — keep denied
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                functionality_storage: 'granted',
                personalization_storage: 'denied',
            });
        }
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 80 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[99998]"
                >
                    <div
                        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-5"
                        style={{ background: 'rgba(10,22,40,0.96)', backdropFilter: 'blur(20px)' }}
                    >
                        {/* Top glow accent */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-copper/60 to-transparent" />

                        {/* Close */}
                        <button
                            onClick={decline}
                            className="absolute top-3 right-3 p-1.5 rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Dismiss"
                        >
                            <X size={14} />
                        </button>

                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: 'rgba(194,134,103,0.15)', border: '1px solid rgba(194,134,103,0.25)' }}>
                                <Cookie size={18} style={{ color: '#C28667' }} />
                            </div>
                            <div>
                                <p className="text-white font-black text-sm uppercase tracking-wide mb-1">We use cookies</p>
                                <p className="text-white/50 text-xs leading-relaxed">
                                    We use cookies to enhance your experience and analyse site traffic. Your data stays private — no third-party advertising cookies.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={accept}
                                className="flex-1 h-10 rounded-xl font-black text-xs uppercase tracking-widest text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                                style={{ background: 'linear-gradient(135deg, #C28667, #a86c4f)' }}
                            >
                                <ShieldCheck size={13} /> Accept All
                            </button>
                            <button
                                onClick={decline}
                                className="flex-1 h-10 rounded-xl font-bold text-xs uppercase tracking-widest text-white/50 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
