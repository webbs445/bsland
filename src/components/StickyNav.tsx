'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'MainLand & Freezone', href: '#options' },
    { label: 'Find Activities', href: '#activity-finder' },
    { label: 'Contact', href: '#contact' },
];

export default function StickyNav() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={false}
            animate={scrolled ? 'scrolled' : 'top'}
            variants={{
                top: {
                    backgroundColor: 'rgba(10, 25, 50, 0)',
                    backdropFilter: 'blur(0px)',
                    boxShadow: 'none',
                    borderBottomColor: 'rgba(255,255,255,0)',
                },
                scrolled: {
                    backgroundColor: 'rgba(10, 25, 50, 0.92)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 40px rgba(0,0,0,0.3)',
                    borderBottomColor: 'rgba(255,255,255,0.06)',
                },
            }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 border-b"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
                {/* Logo */}
                <a href="#contact">
                    <img src="/whiteLogo.webp" alt="Best Solution" className="h-12 w-auto" />
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-10 text-sm font-black tracking-[0.2em] uppercase text-white/60">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="hover:text-brand-copper transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="hidden md:block">
                    <a
                        href="tel:+971522330011"
                        className="btn-primary"
                    >
                        Call Now
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-white p-2"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden bg-brand-navy/95 backdrop-blur-xl border-t border-white/5 px-6 pb-6 pt-4 space-y-4"
                >
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-white/60 hover:text-brand-copper text-[11px] font-black uppercase tracking-widest py-2 border-b border-white/5"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#hero-form"
                        onClick={() => setMobileOpen(false)}
                        className="btn-primary w-full mt-4 justify-center"
                    >
                        Get Started Free
                    </a>
                </motion.div>
            )}
        </motion.nav>
    );
}
