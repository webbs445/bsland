'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah Mitchell',
        company: 'TechVenture Solutions',
        role: 'CEO',
        text: 'The team made our Dubai business setup incredibly smooth. From license to visa, everything was handled professionally. Highly recommend their services!',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop',
        rating: 5
    },
    {
        name: 'Mohammed Al-Rashid',
        company: 'Gulf Trading Group',
        role: 'Managing Director',
        text: 'Exceptional service and attention to detail. They guided us through every step of establishing our mainland company. Worth every dirham.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
        rating: 5
    },
    {
        name: 'Elena Petrova',
        company: 'Design Studio ME',
        role: 'Founder',
        text: 'As a first-time entrepreneur in Dubai, I was nervous about the process. They made it effortless and got my free zone license in just 3 days!',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop',
        rating: 5
    },
    {
        name: 'James Chen',
        company: 'Global Consulting Partners',
        role: 'Partner',
        text: 'Professional, efficient, and knowledgeable. Their expertise in UAE business law saved us time and money. Best business setup consultants in Dubai.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop',
        rating: 5
    },
    {
        name: 'Fatima Al-Mansouri',
        company: 'Emirates Fashion House',
        role: 'Owner',
        text: 'From company formation to bank account opening, they handled everything seamlessly. Their follow-up and customer service is outstanding.',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&auto=format&fit=crop',
        rating: 5
    },
    {
        name: 'David Kumar',
        company: 'Innovation Labs FZ',
        role: 'Co-Founder',
        text: 'They understood our unique requirements and provided tailored solutions. The golden visa processing was particularly impressive. Truly expert advisors.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop',
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

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#c28867] mb-2">4.9/5</div>
                        <div className="text-sm text-gray-600">Average Rating</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#c28867] mb-2">523+</div>
                        <div className="text-sm text-gray-600">Google Reviews</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#c28867] mb-2">5,000+</div>
                        <div className="text-sm text-gray-600">Happy Clients</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-[#c28867] mb-2">98%</div>
                        <div className="text-sm text-gray-600">Satisfaction Rate</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
