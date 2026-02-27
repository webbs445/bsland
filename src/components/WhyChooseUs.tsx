'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Zap, LayoutGrid, BadgeCheck, Search } from 'lucide-react';

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
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-copper mb-4">Why Best Solution®</div>
                        <h2 className="font-header font-black leading-[1.05] tracking-tighter uppercase mb-8"
                            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, lineHeight: 1.05 }}>
                            WE DON'T JUST ADVISE — <br /> <span style={{ background: 'linear-gradient(135deg, #C28667, #d4957a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>WE ACT ON YOUR BEHALF</span>
                        </h2>
                        <p className="text-white/60 font-medium mb-12 max-w-lg leading-relaxed">
                            Every concern you have about setting up in Dubai? We've already solved it — 2,500 times.
                        </p>

                        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl relative group">
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-copper rounded-full flex items-center justify-center text-brand-navy font-black text-xs uppercase animate-pulse">
                                New
                            </div>
                            <div className="text-brand-copper text-4xl font-header font-black italic mb-6">"Their transparent pricing won me over."</div>
                            <p className="text-white/60 text-sm font-medium italic mb-8">
                                "Every fee was explained before I paid a single dirham. The free zone setup was faster than expected. Finally, a company that does what they promise."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-brand-copper italic">S</div>
                                <div>
                                    <div className="text-white font-bold tracking-tight">Sarah K.</div>
                                    <div className="text-[9px] uppercase tracking-widest text-white/40">E-Commerce — United Kingdom</div>
                                </div>
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
