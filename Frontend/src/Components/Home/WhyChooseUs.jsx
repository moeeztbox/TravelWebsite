'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    Clock,
    Users,
    Star,
    Award,
    CheckCircle
} from "lucide-react";

export default function WhyChooseUs() {

    const trustIndicators = [
        {
            icon: Award,
            title: "Government Certified",
            subtitle: "Licensed by Ministry of Religious Affairs"
        },
        {
            icon: Shield,
            title: "100% Visa Guarantee",
            subtitle: "Saudi Arabia approved agents"
        },
        {
            icon: Users,
            title: "Expert Team",
            subtitle: "15+ years of experience"
        },
        {
            icon: Clock,
            title: "24/7 Support",
            subtitle: "Multilingual assistance"
        },
        {
            icon: Star,
            title: "Premium Service",
            subtitle: "Quality accommodations"
        }
    ];

    return (
        <main className="py-12 lg:py-12 bg-[#F5F7FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
                        Why Choose{' '}
                        <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                            Al Buraq?
                        </span>
                    </h1>

                    {/* Decorative Line */}
                    <motion.div
                        className="flex items-center justify-center gap-4 mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent w-16"></div>
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent w-16"></div>
                    </motion.div>

                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Your trusted partner for sacred journeys to the Holy Land
                    </p>
                </motion.div>

                {/* Trust Indicators Row */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {trustIndicators.map((item, index) => (
                        <motion.div
                            key={index}
                            className="text-center group cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Icon Container */}
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                                <item.icon className="w-8 h-8 text-amber-700" />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-800 transition-colors duration-300">
                                {item.title}
                            </h3>

                            {/* Subtitle */}
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {item.subtitle}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Secondary Features Row */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    {[
                        {
                            icon: CheckCircle,
                            title: "IATA Certified",
                            subtitle: "Official travel agent"
                        },
                        {
                            icon: CheckCircle,
                            title: "Ministry Approved",
                            subtitle: "Licensed organizer"
                        },
                        {
                            icon: CheckCircle,
                            title: "Near Haram",
                            subtitle: "Premium locations"
                        },
                        {
                            icon: CheckCircle,
                            title: "Full Support",
                            subtitle: "Complete assistance"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                            viewport={{ once: true }}
                        >
                            {/* Icon Container */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-all duration-300">
                                <item.icon className="w-6 h-6 text-emerald-600" />
                            </div>

                            {/* Title */}
                            <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                                {item.title}
                            </h3>

                            {/* Subtitle */}
                            <p className="text-xs text-gray-600">
                                {item.subtitle}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </main>
    );
}