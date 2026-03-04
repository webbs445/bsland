'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Zap, LayoutGrid, BadgeCheck, Search } from 'lucide-react';
import Image from 'next/image';

export default function WhyChooseUs() {
    const features = [
        {
            icon: BadgeCheck,
            title: "Authorized Government Channel Partner",
            description: "We walk into DED and Free Zone offices to submit on your behalf — because they've authorized us to. No middlemen. No delays. Direct partnership."
        },
        {
            icon: LayoutGrid,
            title: "You'll Never Step Inside a Government Office",
            description: "We prepare, review, and submit every document. From trade name to final license — you never stand in a queue or chase a clerk."
        },
        {
            icon: ShieldCheck,
            title: "Your Personal Assets Stay Legally Protected",
            description: "We guide you to the structure that ring-fences your personal wealth from business risk. LLC, FZE, or Professional — protection always comes first."
        },
        {
            icon: Zap,
            title: "Licensed in 2 Days, Not Weeks",
            description: "Our channel partnership means priority processing. While others wait, your application moves through dedicated fast-track channels."
        },
        {
            icon: Search,
            title: "The Price We Quote Is the Price You Pay",
            description: "Every dirham explained upfront. Government fees, service charges, visa costs — all transparent before you commit. Zero hidden fees. Guaranteed."
        }
    ];

    return (
        <section className="py-24 px-8 bg-brand-navy text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sm font-bold uppercase tracking-[0.2em] text-[#c28867]"
                        >
                            Why Best Solution®
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 text-4xl md:text-5xl font-bold text-white uppercase"
                        >
                            We Don't Just Advise , We Act On Your Behalf
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 mb-12 text-lg text-white/70 max-w-lg"
                        >
                            Every concern you have about setting up in Dubai? We've already solved it — 2,500 times.
                        </motion.p>

                        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
                            <div className="absolute inset-0 bg-brand-copper/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                            <Image
                                src="/team.webp"
                                alt="Best Solution Management Team"
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Decorative Elements */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-copper/20 blur-3xl rounded-full z-0"></div>
                            <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full z-20 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Dubai Headquarters</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-8 group"
                            >
                                <div className="flex-shrink-0 w-14 h-14 bg-brand-copper/10 border border-brand-copper/20 rounded-2xl flex items-center justify-center group-hover:bg-brand-copper transition-all duration-500">
                                    <feature.icon className="w-7 h-7 text-brand-copper group-hover:text-brand-navy transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-header font-black text-white mb-3 tracking-tight group-hover:text-brand-copper transition-colors uppercase">{feature.title}</h3>
                                    <p className="text-sm text-white/50 font-medium leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
