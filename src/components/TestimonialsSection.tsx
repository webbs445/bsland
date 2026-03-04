'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Harris Maheen',
        company: 'Abzter',
        role: 'CEO',
        text: 'Our mainland license process was smooth and transparent. Vipin guided us through every step. Highly recommended.',
        image: '/clients/Abzter-_-Haris-Maheen.webp',
        rating: 5
    },
    {
        name: 'Chandra Mohan',
        company: 'Gulf Trading Group',
        role: 'Business Development Manager',
        text: 'No hidden charges, no surprises. Exactly what was promised — delivered on time.',
        image: '/clients/chandra-mohan_Prism-Advertising.webp',
        rating: 5
    },
    {
        name: 'Michael Doherty',
        company: 'Doherty Capital',
        role: 'CEO',
        text: '25+ years in banking and corporate services, and Best Solution truly stands apart. From day one, I knew I was in safe hands.',
        image: '/clients/Michael-Doherty.webp',
        rating: 5
    },
    {
        name: 'Hadi Hamedi',
        company: 'Soft & Miller International',
        role: 'CEO',
        text: 'Everything became structured, professional, and stress-free after switching to Best Solution.',
        image: '/clients/Hameed.webp',
        rating: 5
    },
    {
        name: 'Carlos Freyre',
        company: 'Emirates Fashion House',
        role: 'Owner',
        text: 'La mejor compañía de servicios para crear tu empresa en Dubai. Rápidos, responsables y siempre disponibles.',
        image: '/clients/Carlos-Freyre.webp',
        rating: 5
    },
    {
        name: 'Nassem Richani',
        company: 'Bonne Apartments',
        role: 'Business Head Manager',
        text: 'VIP medical, EID & biometrics completed in ONE day. Since then, all PRO services are handled by Best Solution.',
        image: '/clients/Nassem-Bonne-apart.webp',
        rating: 5
    }
];

export default function TestimonialsSection() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-white to-[#FFF5F0] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 right-10 w-96 h-96 bg-[#c28867]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#c28867]/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold uppercase tracking-[0.2em] text-[#c28867]"
                    >
                        Client Success Stories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-4xl md:text-5xl font-bold text-gray-900"
                    >
                        What Our Clients Say
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Join thousands of satisfied entrepreneurs who trusted us with their business setup
                    </motion.p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-6 opacity-10">
                                <Quote size={60} className="text-[#c28867]" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className="fill-[#c28867] text-[#c28867]"
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                                "{testimonial.text}"
                            </p>

                            {/* Client Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="relative"
                                >
                                    <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-[#c28867]/20">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Online indicator */}
                                    <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
                                </motion.div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    <p className="text-sm font-semibold text-[#c28867]">{testimonial.company}</p>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-[#c28867]/5 to-transparent rounded-br-3xl" />
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
}
