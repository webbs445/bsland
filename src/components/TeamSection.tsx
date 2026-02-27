'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, Quote, Star } from 'lucide-react';

export default function TeamSection() {
    const team = [
        { name: "Essa Al Harthi", role: "Founder & CEO", initials: "EA", image: "/team/essa.webp" },
        { name: "Abdul Munim", role: "Partner", initials: "AM", image: "/team/6.webp" },
        { name: "Vipin Kumar", role: "General Manager", initials: "VK", image: "/team/Vipin.webp" },
        { name: "Abdulla Al Harthi", role: "Business Development Head", initials: "AH", image: "/team/8.webp" },
        { name: "Ahmed Al Marzooqi", role: "Operations Head", initials: "AAM" }
    ];

    const teamWithImages = useMemo(() => team.filter(m => m.image), [team]);
    const [activeIdx, setActiveIdx] = useState(0);

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % teamWithImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [teamWithImages.length]);

    const stats = [
        { label: "Years Expertise", value: "22+" },
        { label: "Businesses Set", value: "2.5K+" },
        { label: "Team Experts", value: "50+" },
        { label: "Partners", value: "10+" }
    ];

    return (
        <section className="py-24 px-6 bg-[#070E1A] text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-16 items-center">

                    {/* LEFT COLUMN: Visuals */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Featured Carousel */}
                        <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-white/5 border border-white/10 group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={teamWithImages[activeIdx].image}
                                    src={teamWithImages[activeIdx].image}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent opacity-90" />

                            {/* Dynamic Tag */}
                            <div className="absolute bottom-8 left-8">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    key={activeIdx}
                                    className="inline-block"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#CC8667] mb-1 block">{teamWithImages[activeIdx].role}</span>
                                    <h3 className="text-2xl font-black uppercase tracking-tight">{teamWithImages[activeIdx].name}</h3>
                                </motion.div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                                    <div className="text-xl font-bold text-[#CC8667] mb-0.5">{stat.value}</div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-white/30">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Content */}
                    <div className="lg:col-span-7">
                        <div className="mb-12">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#CC8667] mb-4 block">Leadership & Legacy</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
                                REAL PEOPLE. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">REAL RESULTS.</span>
                            </h2>
                            <p className="text-white/50 text-lg leading-relaxed max-w-lg">
                                Best Solution® isn't just a firm; it's a team of 50+ professionals navigating Dubai's complex landscape. Founded by an entrepreneur who walked in your shoes.
                            </p>
                        </div>

                        {/* Founder Quote */}
                        <div className="relative p-8 bg-[#111827] rounded-3xl mb-12 border border-white/5">
                            <Quote className="w-8 h-8 text-[#CC8667] mb-4 opacity-50" />
                            <p className="text-sm italic text-white/70 leading-relaxed mb-6">
                                "Mr. Essa Al Harthi began his career as a PRO officer in 2000. He understood the bureaucracy firsthand. He founded Best Solution® to make sure no entrepreneur goes through that alone."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CC8667] to-[#8a533a]" />
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest">Essa Al Harthi</div>
                                    <div className="text-[10px] text-white/40">Founder & CEO</div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Signals & Locations */}
                        <div className="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-white/10">
                            {/* Google Reviews */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
                                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                                        </g>
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 text-[#fbbc04]">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1">4.9/5 Rating • 300+ Reviews</div>
                                </div>
                            </div>

                            {/* Office Locations */}
                            <div className="flex gap-8">
                                <div>
                                    <div className="flex items-center gap-1.5 text-[#CC8667] mb-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Dubai Office</span>
                                    </div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest pl-5">
                                        The Onyx Tower 2, The Greens
                                    </div>
                                </div>
                                <div className="hidden sm:block w-px h-8 bg-white/10" />
                                <div>
                                    <div className="flex items-center gap-1.5 text-[#CC8667] mb-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Abu Dhabi Office</span>
                                    </div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest pl-5">
                                        Al Reem Island
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}