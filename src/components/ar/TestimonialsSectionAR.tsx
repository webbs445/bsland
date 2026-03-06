'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Harris Maheen',
        company: 'Abzter',
        role: 'CEO',
        text: 'عملية إصدار رخصة شركتنا كانت سلسة وشفافة للغاية. نصحنا الخبراء في كل خطوة، نوصي بهم بشدة.',
        image: '/clients/Abzter-_-Haris-Maheen.webp',
        rating: 5
    },
    {
        name: 'Chandra Mohan',
        company: 'Gulf Trading Group',
        role: 'Business Development Manager',
        text: 'لا توجد رسوم خفية، ولا مفاجآت. لقد حصلنا على كل ما وعدونا به في الوقت المحدد بدقة.',
        image: '/clients/chandra-mohan_Prism-Advertising.webp',
        rating: 5
    },
    {
        name: 'Michael Doherty',
        company: 'Doherty Capital',
        role: 'CEO',
        text: 'بخبرتي لأكثر من 25 عامًا في الأعمال، تبرز بيست سوليوشن بشكل لافت. منذ اليوم الأول أدركت أن أعمالي في أيدٍ أمينة.',
        image: '/clients/Michael-Doherty.webp',
        rating: 5
    },
    {
        name: 'Hadi Hamedi',
        company: 'Soft & Miller International',
        role: 'CEO',
        text: 'أصبح كل شيء منظمًا واحترافيًا وخاليًا من التوتر بعد الانضمام إلى بيست سوليوشن وتوكيلهم بأعمال شركتنا.',
        image: '/clients/Hameed.webp',
        rating: 5
    },
    {
        name: 'Carlos Freyre',
        company: 'Emirates Fashion House',
        role: 'Owner',
        text: 'أفضل شركة خدمات لتأسيس شركتك في دبي. سريعون ومسؤولون ومتاحون دائمًا.',
        image: '/clients/Carlos-Freyre.webp',
        rating: 5
    },
    {
        name: 'Nassem Richani',
        company: 'Bonne Apartments',
        role: 'Business Head Manager',
        text: 'تم الانتهاء من الفحص الطبي لكبار الشخصيات والهوية في يوم واحد. ومنذ ذلك الحين، تتعامل بيست سوليوشن مع جميع خدمات تخليص المعاملات الخاصة بنا.',
        image: '/clients/Nassem-Bonne-apart.webp',
        rating: 5
    }
];

export default function TestimonialsSectionAR() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-white to-[#FFF5F0] overflow-hidden" dir="rtl">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-[#c28867]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#c28867]/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold tracking-[0.1em] text-[#c28867]"
                    >
                        قصص نجاح عملائنا
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-4xl md:text-5xl font-bold text-gray-900"
                    >
                        ماذا يقول عملاؤنا
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        انضم إلى آلاف رواد الأعمال الراضين الذين وثقوا بنا لتأسيس أعمالهم وإدارتها.
                    </motion.p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
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
                            <div className="absolute top-6 left-6 opacity-10">
                                <Quote size={60} className="text-[#c28867] transform rotate-180" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4 justify-start">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className="fill-[#c28867] text-[#c28867]"
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 leading-relaxed mb-6 relative z-10 text-right">
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
                                    <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
                                </motion.div>
                                <div className="text-right">
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    <p className="text-sm font-semibold text-[#c28867]" dir="ltr">{testimonial.company}</p>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c28867]/5 to-transparent rounded-br-3xl pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
