import React, { useState } from 'react';
import {
    Plane,
    Hotel,
    FileText,
    Users,
    Car,
    MapPin,
    Shield,
    Clock,
    Phone,
    Globe,
    Heart,
    Star,
    CheckCircle,
    Headphones,
    CreditCard
} from 'lucide-react';

export default function WhatWeOffer() {
    const [hoveredService, setHoveredService] = useState(null);
    const [isVisible, setIsVisible] = useState({});

    const services = [
        {
            id: 1,
            icon: FileText,
            title: "Visa Processing",
            description: "Complete visa documentation and processing with 100% success guarantee",
            features: [
                "Government-approved processes",
                "Fast-track processing",
                "Document verification",
                "Saudi Arabia licensed agents"
            ],
            color: "from-blue-500 to-blue-600"
        },
        {
            id: 2,
            icon: Plane,
            title: "Flight Arrangements",
            description: "Direct flights and convenient travel schedules for your sacred journey",
            features: [
                "Direct & connecting flights",
                "Flexible departure dates",
                "Group booking discounts",
                "Seat preferences handled"
            ],
            color: "from-yellow-500 to-yellow-600"
        },
        {
            id: 3,
            icon: Hotel,
            title: "Premium Accommodations",
            description: "Carefully selected hotels near Haram with modern amenities and comfort",
            features: [
                "Close proximity to Haram",
                "Clean, comfortable rooms",
                "Halal dining options",
                "Prayer facilities available"
            ],
            color: "from-green-500 to-green-600"
        },
        {
            id: 4,
            icon: Car,
            title: "Transportation",
            description: "Reliable ground transportation throughout your pilgrimage journey",
            features: [
                "Airport transfers included",
                "Comfortable air-conditioned buses",
                "Makkah-Madinah transport",
                "Local area transportation"
            ],
            color: "from-purple-500 to-purple-600"
        },
        {
            id: 5,
            icon: Users,
            title: "Expert Guidance",
            description: "Experienced guides to help you through every step of your spiritual journey",
            features: [
                "Multilingual guides",
                "Religious guidance",
                "Local area expertise",
                "Group coordination"
            ],
            color: "from-orange-500 to-orange-600"
        },
        {
            id: 6,
            icon: Headphones,
            title: "24/7 Support",
            description: "Round-the-clock assistance in multiple languages for complete peace of mind",
            features: [
                "Urdu, English & Arabic support",
                "Emergency assistance",
                "WhatsApp support available",
                "On-ground help desk"
            ],
            color: "from-teal-500 to-teal-600"
        }
    ];

    // Intersection Observer for smooth animations
    React.useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('data-animate-id');
                    if (id) {
                        setTimeout(() => {
                            setIsVisible(prev => ({ ...prev, [id]: true }));
                        }, parseInt(entry.target.getAttribute('data-delay') || '0'));
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('[data-animate-id]').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative bg-black overflow-hidden -mt-2 -mb-2">
            <div className="h-1 bg-gradient-to-l from-yellow-500 via-yellow-400 to-transparent opacity-60"></div>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div 
                    className="absolute inset-0" 
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,215,0,0.15) 1px, transparent 0)`,
                        backgroundSize: '60px 60px'
                    }} 
                />
            </div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
            
            {/* Gradient Overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(135deg, 
                                rgba(30, 58, 138, 0.08) 0%, 
                                rgba(59, 130, 246, 0.05) 15%, 
                                rgba(0, 0, 0, 0.02) 50%, 
                                rgba(251, 191, 36, 0.05) 85%, 
                                rgba(245, 158, 11, 0.08) 100%)`
                }}
            />
            
            {/* Sparkles */}
            <div className="absolute inset-0 opacity-20">
                {/* Blue sparkles */}
                <div className="absolute top-[15%] left-[12%] w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="absolute top-[35%] left-[8%] w-1.5 h-1.5 bg-blue-300 rounded-full opacity-60"></div>
                <div className="absolute top-[55%] left-[15%] w-1 h-1 bg-blue-500 rounded-full"></div>
                <div className="absolute top-[75%] left-[10%] w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>
                
                {/* Gold sparkles */}
                <div className="absolute top-[20%] right-[15%] w-1 h-1 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-[40%] right-[10%] w-2 h-2 bg-yellow-300 rounded-full opacity-60"></div>
                <div className="absolute top-[65%] right-[18%] w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                <div className="absolute top-[85%] right-[12%] w-1 h-1 bg-yellow-400 rounded-full opacity-50"></div>
            </div>

            <div className="py-16 md:py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div 
                        className={`text-center mb-16 transition-all duration-700 ease-out ${
                            isVisible['header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        data-animate-id="header"
                        data-delay="0"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            <span className="text-white">What We </span>
                            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                Offer
                            </span>
                        </h2>

                        {/* Decorative Line */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-20"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-20"></div>
                        </div>

                        <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                            Comprehensive services designed to make your sacred journey seamless and spiritually fulfilling
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`group relative bg-gray-900/60 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-400/60 hover:bg-gray-900/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/10 ${
                                    isVisible[`service-${service.id}`] 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-8'
                                }`}
                                data-animate-id={`service-${service.id}`}
                                data-delay={index * 100}
                                style={{ 
                                    transitionDuration: '0.7s',
                                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                onMouseEnter={() => setHoveredService(service.id)}
                                onMouseLeave={() => setHoveredService(null)}
                            >
                                {/* Icon with Gradient Background */}
                                <div className="mb-6">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{service.description}</p>
                                </div>

                                {/* Features List */}
                                <div className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                            <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Trust Section */}
                    <div 
                        className={`bg-gray-900/40 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 md:p-12 text-center transition-all duration-700 ease-out ${
                            isVisible['trust-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        data-animate-id="trust-section"
                        data-delay="200"
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Shield className="w-8 h-8 text-yellow-400" />
                            <Heart className="w-6 h-6 text-red-500" />
                            <Globe className="w-8 h-8 text-blue-400" />
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Complete Peace of Mind
                        </h3>
                        
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            From the moment you book with us until you return home, every aspect of your journey is carefully managed by our experienced team.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">15+</div>
                                <div className="text-gray-400 text-sm">Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">15K+</div>
                                <div className="text-gray-400 text-sm">Happy Pilgrims</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">100%</div>
                                <div className="text-gray-400 text-sm">Visa Success</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">4.9★</div>
                                <div className="text-gray-400 text-sm">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}