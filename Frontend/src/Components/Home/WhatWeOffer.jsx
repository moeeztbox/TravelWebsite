    import React from 'react';
    import { Plane, Hotel, FileText, Users, Car, Headphones } from 'lucide-react';

    export default function WhatWeOffer() {
        const services = [
            {
                id: 1,
                icon: FileText,
                title: "Visa Processing",
                description: "Complete visa documentation with 100% success guarantee"
            },
            {
                id: 2,
                icon: Plane,
                title: "Flight Arrangements",
                description: "Direct flights and convenient travel schedules"
            },
            {
                id: 3,
                icon: Hotel,
                title: "Premium Accommodations",
                description: "Selected hotels near Haram with modern amenities"
            },
            {
                id: 4,
                icon: Car,
                title: "Transportation",
                description: "Reliable ground transportation throughout your journey"
            },
            {
                id: 5,
                icon: Users,
                title: "Expert Guidance",
                description: "Experienced guides for your spiritual journey"
            },
            {
                id: 6,
                icon: Headphones,
                title: "24/7 Support",
                description: "Round-the-clock assistance in multiple languages"
            }
        ];

    return (
        <section className="relative py-24 bg-[#F5F7FA]">
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            
            {/* Header */}
            <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                    <span className="text-gray-800">What We </span>
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                        Offer
                    </span>
                </h2>
                <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                    Complete services for your sacred journey
                </p>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group flex flex-col items-center text-center"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <service.icon className="w-8 h-8 text-white" />
                            </div>
                            
                            {/* Content */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
    }