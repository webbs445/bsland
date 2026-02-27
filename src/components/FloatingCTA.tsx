'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight, X, Phone } from 'lucide-react';

const WHATSAPP_NUMBER = '971522330011';
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'm interested in setting up a business in Dubai. Can you help me?");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const PHONE_NUMBER = 'tel:+97145531546';

export default function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToForm = () => {
        document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Desktop Floating WhatsApp Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3"
                    >
                        {/* Expanded Menu */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className="flex flex-col gap-3 items-end"
                                >
                                    <a
                                        href={WHATSAPP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-2xl shadow-2xl shadow-[#25D366]/30 text-[11px] font-black uppercase tracking-widest hover:bg-[#1da851] transition-all"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Chat on WhatsApp
                                    </a>
                                    <a
                                        href={PHONE_NUMBER}
                                        className="flex items-center gap-3 bg-brand-navy text-white px-5 py-3 rounded-2xl shadow-2xl shadow-brand-navy/30 text-[11px] font-black uppercase tracking-widest hover:bg-brand-copper transition-all"
                                    >
                                        <Phone className="w-4 h-4" />
                                        +971 4 553 1546
                                    </a>
                                    <button
                                        onClick={scrollToForm}
                                        className="flex items-center gap-3 bg-brand-copper text-brand-navy px-5 py-3 rounded-2xl shadow-2xl shadow-brand-copper/30 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                        Get Free Consultation
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main Toggle Button */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-transform"
                        >
                            {/* Pulse ring */}
                            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
                            <AnimatePresence mode="wait">
                                {isExpanded ? (
                                    <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                                        <X className="w-7 h-7 text-white" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                                        <MessageCircle className="w-7 h-7 text-white" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Sticky Bottom Bar */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand-navy border-t border-white/10 p-4 flex gap-3"
                    >
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                        <button
                            onClick={scrollToForm}
                            className="flex-1 flex items-center justify-center gap-2 bg-brand-copper text-brand-navy py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg"
                        >
                            <ArrowRight className="w-4 h-4" />
                            Get Started
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
