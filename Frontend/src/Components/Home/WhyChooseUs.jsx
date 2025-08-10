'use client';
import React from 'react';
import {
    Shield,
    Clock,
    Users,
    Star,
    Award,
    MapPin,
    Plane,
    Heart,
    CheckCircle,
    Globe,
    Headphones,
    CreditCard,
    UserCheck,
    Calendar,
    Phone
} from "lucide-react";

export default function WhyChooseUs() {

    const reasons = [
        {
            id: 1,
            icon: Users,
            title: "15+ Years of Excellence",
            description: "Trusted by over 15,000 pilgrims, we've been facilitating sacred journeys with unmatched dedication and expertise since 2008.",
            features: [
                "Established reputation in Pakistan",
                "Thousands of successful pilgrimages",
                "Expert team with deep knowledge",
                "Continuous service improvement"
            ],
            rotation: "rotate-3"
        },
        {
            id: 2,
            icon: Shield,
            title: "100% Visa Guarantee",
            description: "Our expert visa processing team ensures your journey begins smoothly. We handle all documentation with government-approved processes.",
            features: [
                "Saudi Arabia licensed agents",
                "Complete documentation support",
                "Fast-track visa processing",
                "Money-back guarantee on visa rejection"
            ],
            rotation: "-rotate-2"
        },
        {
            id: 3,
            icon: Clock,
            title: "24/7 Multilingual Support",
            description: "Round-the-clock assistance in Urdu, English, and Arabic. Your comfort and peace of mind are our top priorities throughout your journey.",
            features: [
                "Dedicated support hotline",
                "On-ground assistance in Saudi Arabia",
                "Emergency response team",
                "WhatsApp support available"
            ],
            rotation: "rotate-1"
        },
        {
            id: 4,
            icon: Star,
            title: "Premium Accommodations",
            description: "Stay in carefully selected hotels near Haram with modern amenities, ensuring comfort during your spiritual journey.",
            features: [
                "Hotels within walking distance of Haram",
                "Clean, comfortable rooms",
                "Halal dining options",
                "Prayer facilities in hotels"
            ],
            rotation: "-rotate-1"
        },
        {
            id: 5,
            icon: Award,
            title: "Government Certified",
            description: "Fully licensed by Pakistan's Ministry of Religious Affairs and Saudi Arabia's Ministry of Hajj and Umrah.",
            features: [
                "IATA certified travel agent",
                "Licensed Hajj Group Organizer",
                "Ministry of Religious Affairs approved",
                "ISO 9001:2015 quality certification"
            ],
            rotation: "rotate-2"
        }
    ];

    return (
        <main className="bg-black">
            <section className="text-white w-full relative">
                {/* Elegant Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,215,0,0.55) 1px, transparent 0)`,
                            backgroundSize: '60px 60px'
                        }}
                    />
                </div>

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-10" />

                {/* Blueish and Gold Gradient Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(135deg, 
                      rgba(30, 58, 138, 0.2) 0%, 
                      rgba(59, 130, 246, 0.05) 15%, 
                      rgba(0, 0, 0, 0.02) 50%, 
                      rgba(251, 191, 36, 0.05) 85%, 
                      rgba(245, 158, 11, 0.1) 100%)`
                    }}
                />

                {/* Blue and Gold Sparkles - Static (no animations) */}
                <div className="absolute inset-0 opacity-40 ">  {/* bumped parent opacity from 20% to 40% */}
                    {/* Blue sparkles on left side */}
                    <div className="absolute top-[18%] left-[14%] w-2 h-2 bg-blue-400 rounded-full drop-shadow-lg"></div>
                    <div className="absolute top-[31%] left-[27%] w-3 h-3 bg-blue-300 rounded-full opacity-90 drop-shadow-lg"></div>
                    <div className="absolute top-[47%] left-[8%] w-2 h-2 bg-blue-500 rounded-full drop-shadow-lg"></div>
                    <div className="absolute top-[64%] left-[23%] w-3 h-3 bg-blue-400 rounded-full opacity-70 drop-shadow-lg"></div>
                    <div className="absolute bottom-[22%] left-[11%] w-2.5 h-2.5 bg-blue-300 rounded-full drop-shadow-lg"></div>
                    <div className="absolute top-[71%] left-[19%] w-2 h-2 bg-blue-500 rounded-full opacity-80 drop-shadow-lg"></div>
                    <div className="absolute top-[39%] left-[6%] w-3 h-3 bg-blue-400 rounded-full drop-shadow-lg"></div>

                    {/* Gold sparkles on right side */}
                    <div className="absolute top-[26%] right-[19%] w-2 h-2 bg-yellow-400 rounded-full drop-shadow-lg"></div>
                    <div className="absolute top-[43%] right-[31%] w-3 h-3 bg-yellow-300 rounded-full opacity-90 drop-shadow-lg"></div>
                    <div className="absolute bottom-[28%] right-[17%] w-2.5 h-2.5 bg-yellow-500 rounded-full drop-shadow-lg"></div>
                    <div className="absolute top-[13%] right-[9%] w-2 h-2 bg-yellow-400 rounded-full opacity-80 drop-shadow-lg"></div>
                    <div className="absolute bottom-[15%] right-[24%] w-2.5 h-2.5 bg-yellow-300 rounded-full drop-shadow-lg"></div>
                    <div className="absolute top-[58%] right-[12%] w-2 h-2 bg-yellow-500 rounded-full opacity-70 drop-shadow-lg"></div>
                    <div className="absolute top-[81%] right-[28%] w-3 h-3 bg-yellow-400 rounded-full drop-shadow-lg"></div>
                </div>

                <div className="flex flex-col lg:flex-row lg:justify-between px-3 xs:px-4 sm:px-6 md:px-8 lg:px-16">

                    {/* Cards Section */}
                    <div className="grid gap-2 flex-1 lg:max-w-2xl">

                        {/* Mobile Heading - Shows only on small screens and only before first card */}
                        <div className="block lg:hidden text-center py-8 sm:py-12 px-4 sm:px-6">
                            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-[110%] mb-4 sm:mb-6">
                                Why Choose <br />
                                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                    Al Buraq
                                </span>
                                <span className="text-yellow-400">?</span>
                            </h1>

                            {/* Decorative Elements */}
                            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-12 sm:w-16"></div>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
                                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-12 sm:w-16"></div>
                            </div>

                            <p className="text-base sm:text-lg text-gray-300 max-w-xs sm:max-w-md mx-auto leading-relaxed px-2">
                                Your trusted partner for sacred journeys to the Holy Land
                            </p>
                        </div>
                        {reasons.map((reason, index) => (
                            <figure key={reason.id} className="sticky top-0 h-screen grid place-content-center">
                                <article className={`bg-gray-900/80 backdrop-blur-sm border border-yellow-500/30 min-h-[40vh] xs:min-h-[45vh] sm:min-h-[50vh] w-full max-w-[calc(100vw-24px)] xs:max-w-[calc(100vw-32px)] sm:max-w-[36rem] rounded-lg sm:rounded-xl ${reason.rotation} p-4 xs:p-6 sm:p-8 grid gap-4 sm:gap-6 shadow-2xl hover:border-yellow-400/60 hover:bg-gray-900/90 transition-all duration-500`}>

                                    {/* Header with Icon */}
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="bg-yellow-400/20 p-2.5 xs:p-3 sm:p-4 rounded-lg sm:rounded-xl border border-yellow-400/30 flex-shrink-0">
                                            <reason.icon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-yellow-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                                                {reason.title}
                                            </h1>
                                            <p className="text-gray-300 leading-relaxed text-sm xs:text-base md:text-lg">
                                                {reason.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Features Grid */}
                                    <div className="grid grid-cols-1 gap-2.5 xs:gap-3 sm:gap-4">
                                        {reason.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2.5 xs:gap-3 text-xs xs:text-sm sm:text-base text-gray-300 bg-gray-800/50 p-2.5 xs:p-3 sm:p-4 rounded-md sm:rounded-lg">
                                                <CheckCircle className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                                                <span className="leading-snug">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="h-0.5 sm:h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent rounded-full opacity-60"></div>
                                </article>
                            </figure>
                        ))}
                    </div>

                    {/* Right Side - Sticky Heading (Desktop Only) */}
                    <div className="hidden lg:grid sticky top-0 h-screen place-content-center flex-1">

                        <div className="text-center px-8">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight leading-[110%] mb-6">
                                Why Choose <br />
                                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                    Al Buraq
                                </span>
                                <span className="text-yellow-400">?</span>
                            </h1>

                            {/* Decorative Elements */}
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-20"></div>
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-20"></div>
                            </div>

                            <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
                                Your trusted partner for sacred journeys to the Holy Land
                            </p>

                            {/* Trust Badge */}
                            <div className="mt-8 inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-6 py-3">
                                <Shield className="w-5 h-5 text-yellow-400" />
                                <span className="text-yellow-400 font-medium">Trusted by 15,000+ Pilgrims</span>
                            </div>

                            {/* Additional Stats */}
                            <div className="grid grid-cols-2 gap-4 mt-8 max-w-sm mx-auto">
                                <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-yellow-400/20">
                                    <div className="text-2xl font-bold text-yellow-400">4.9★</div>
                                    <div className="text-sm text-gray-400">Rating</div>
                                </div>
                                <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-yellow-400/20">
                                    <div className="text-2xl font-bold text-yellow-400">100%</div>
                                    <div className="text-sm text-gray-400">Visa Success</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            {/* <footer className="group bg-slate-950">
                <h1 className="text-[12vw] md:text-[10vw] translate-y-20 leading-[100%] uppercase font-bold text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent transition-all ease-linear">
                    Al-Noor Travels
                </h1>
                <div className="bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full">
                    <p className="text-gray-400 text-center">Your Sacred Journey Begins Here</p>
                </div>
            </footer> */}
        </main>
    );
}