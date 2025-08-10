import React from 'react';
import {
    Phone,
    Mail,
    MessageSquare,
    ArrowRight,
    Star,
    Users,
    CheckCircle,
    Clock
} from 'lucide-react';

export default function InquiryCTA() {
    const handleContactClick = () => {
        // Replace with your navigation logic
        console.log('Navigate to contact page');
    };

    const handleCallClick = () => {
        window.open('tel:+923012345678', '_self');
    };

    return (
        <section className="relative bg-black overflow-hidden min-h-[50vh] flex items-center">
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
                    background: `linear-gradient(6deg, 
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
                <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="absolute top-[40%] left-[5%] w-1.5 h-1.5 bg-blue-300 rounded-full opacity-60"></div>
                <div className="absolute top-[65%] left-[12%] w-1 h-1 bg-blue-500 rounded-full"></div>
                
                {/* Gold sparkles */}
                <div className="absolute top-[25%] right-[12%] w-1 h-1 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-[45%] right-[8%] w-2 h-2 bg-yellow-300 rounded-full opacity-60"></div>
                <div className="absolute top-[70%] right-[15%] w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
            </div>

            <div className="w-full relative z-10 py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        {/* Header */}
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                            <span className="text-white">Ready to Begin Your </span>
                            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                Sacred Journey?
                            </span>
                        </h2>

                        {/* Decorative Line */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16"></div>
                        </div>

                        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            Get personalized assistance from our pilgrimage experts. Free consultation and custom packages await.
                        </p>

                        {/* Quick Stats as Bullets */}
                        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-yellow-400" />
                                <span className="text-yellow-400 font-semibold">15K+</span>
                                <span className="text-gray-300">Satisfied Pilgrims</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-500 rounded-full hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-400 font-semibold">24h</span>
                                <span className="text-gray-300">Response Time</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-500 rounded-full hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-green-400" />
                                <span className="text-green-400 font-semibold">4.9★</span>
                                <span className="text-gray-300">Average Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                        <button 
                            onClick={handleContactClick}
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 hover:scale-105 shadow-lg hover:shadow-xl group"
                        >
                            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-lg">Get Free Consultation</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>

                        <button 
                            onClick={handleCallClick}
                            className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 hover:scale-105 group"
                        >
                            <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                            <span>Call Now: +92-301-2345678</span>
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-900/40 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-yellow-400" />
                                What You Get
                            </h3>
                            <div className="space-y-2 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                    <span className="text-sm">Free personalized consultation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                    <span className="text-sm">Custom package recommendations</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                    <span className="text-sm">Transparent pricing & guidance</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-blue-400" />
                                Quick Contact
                            </h3>
                            <div className="space-y-2 text-gray-300">
                                <div className="text-blue-400 font-medium">info@alburaq.com</div>
                                <div className="text-yellow-400 font-medium">WhatsApp: +92-301-2345678</div>
                                <div className="text-gray-400 text-sm">Available 24/7 for your convenience</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent opacity-60" />
                </div>
            </div>
        </section>
    );
}