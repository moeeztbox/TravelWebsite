import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Star,
    MapPin,
    Calendar,
    Users,
    Plane,
    Hotel,
    Car,
    Shield,
    Clock,
    CheckCircle,
    ArrowRight
} from "lucide-react";

const FeaturedPackages = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const packages = [
        {
            id: 1,
            title: "Essential Umrah",
            subtitle: "Perfect for First-Time Pilgrims",
            price: "PKR 185,000",
            originalPrice: "PKR 220,000",
            duration: "10 Days",
            groupSize: "15-20 People",
            rating: 4.8,
            reviews: 127,
            badge: "Most Popular",
            badgeColor: "bg-blue-500",
            features: [
                "3-star accommodation in Makkah & Madinah",
                "Direct flights with Saudi Airlines",
                "Visa processing included",
                "24/7 local guide support"
            ],
            highlights: [
                { icon: Hotel, text: "Close to Haram" },
                { icon: Plane, text: "Direct Flights" },
                { icon: Shield, text: "Full Insurance" },
                { icon: Users, text: "Group Support" }
            ],
            gradient: "from-blue-600 to-blue-800"
        },
        {
            id: 2,
            title: "Premium Hajj",
            subtitle: "Luxury Experience for Sacred Journey",
            price: "PKR 750,000",
            originalPrice: "PKR 850,000",
            duration: "21 Days",
            groupSize: "10-15 People",
            rating: 4.9,
            reviews: 89,
            badge: "Premium Choice",
            badgeColor: "bg-yellow-500",
            features: [
                "5-star luxury hotels near Haram",
                "VIP flight arrangements",
                "Private transportation",
                "Dedicated tour manager"
            ],
            highlights: [
                { icon: Star, text: "5-Star Luxury" },
                { icon: Car, text: "Private Transport" },
                { icon: Clock, text: "24/7 Support" },
                { icon: MapPin, text: "Premium Location" }
            ],
            gradient: "from-yellow-600 to-yellow-800"
        },
        {
            id: 3,
            title: "Family Umrah",
            subtitle: "Designed for Families with Children",
            price: "PKR 320,000",
            originalPrice: "PKR 380,000",
            duration: "12 Days",
            groupSize: "Family Groups",
            rating: 4.7,
            reviews: 156,
            badge: "Family Friendly",
            badgeColor: "bg-green-500",
            features: [
                "Family-friendly 4-star hotels",
                "Child-friendly meal options",
                "Flexible timing for families",
                "Educational programs for kids"
            ],
            highlights: [
                { icon: Users, text: "Family Focused" },
                { icon: Shield, text: "Child Safety" },
                { icon: Calendar, text: "Flexible Dates" },
                { icon: Hotel, text: "Family Rooms" }
            ],
            gradient: "from-green-600 to-green-800"
        },
        {
            id: 4,
            title: "Budget Umrah",
            subtitle: "Affordable Sacred Journey",
            price: "PKR 125,000",
            originalPrice: "PKR 155,000",
            duration: "7 Days",
            groupSize: "20-25 People",
            rating: 4.5,
            reviews: 203,
            badge: "Best Value",
            badgeColor: "bg-purple-500",
            features: [
                "2-star clean accommodation",
                "Economy flights",
                "Group transportation",
                "Basic meal plan"
            ],
            highlights: [
                { icon: Calendar, text: "Quick Trip" },
                { icon: Users, text: "Large Groups" },
                { icon: Plane, text: "Economy Class" },
                { icon: Shield, text: "Basic Coverage" }
            ],
            gradient: "from-purple-600 to-purple-800"
        },
        {
            id: 5,
            title: "Deluxe Umrah",
            subtitle: "Enhanced Comfort & Services",
            price: "PKR 425,000",
            originalPrice: "PKR 480,000",
            duration: "14 Days",
            groupSize: "12-18 People",
            rating: 4.8,
            reviews: 94,
            badge: "Premium",
            badgeColor: "bg-orange-500",
            features: [
                "4-star premium hotels",
                "Business class flights",
                "Private group transport",
                "Extended Ziyarat tours"
            ],
            highlights: [
                { icon: Star, text: "4-Star Hotels" },
                { icon: Car, text: "Private Bus" },
                { icon: MapPin, text: "Extended Tours" },
                { icon: Clock, text: "Longer Stay" }
            ],
            gradient: "from-orange-600 to-orange-800"
        },
    ];

    return (
        <section className="relative bg-black overflow-hidden -mt-2 -mb-2">
            {/* Background Image with Smoother Blending */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(135deg, 
    rgba(15, 15, 15, 0.75) 0%, 
    rgba(0, 0, 0, 0.8) 0%, 
    rgba(10, 10, 10, 0.85) 100%), 
    url('./src/Assets/Images/home images/home_hero.jpg')`

                }}
            ></div>

            {/* Content Wrapper */}
            <div className="py-12 md:py-16">

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

                {/* Gradient overlays matching your theme */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(225deg, 
                      rgba(251, 191, 36, 0.08) 0%, 
                      rgba(245, 158, 11, 0.05) 15%, 
                      rgba(0, 0, 0, 0.02) 50%, 
                      rgba(59, 130, 246, 0.05) 85%, 
                      rgba(30, 58, 138, 0.08) 100%)`
                    }}
                />

                {/* Sparkles matching your theme */}
                <div className="absolute inset-0 opacity-20">
                    {/* Blue sparkles */}
                    <div className="absolute top-[18%] left-[14%] w-1 h-1 bg-blue-400 rounded-full"></div>
                    <div className="absolute top-[31%] left-[27%] w-1.5 h-1.5 bg-blue-300 rounded-full opacity-60"></div>
                    <div className="absolute top-[47%] left-[8%] w-1 h-1 bg-blue-500 rounded-full"></div>
                    <div className="absolute top-[64%] left-[23%] w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>

                    {/* Gold sparkles */}
                    <div className="absolute top-[26%] right-[19%] w-1 h-1 bg-yellow-400 rounded-full"></div>
                    <div className="absolute top-[43%] right-[31%] w-2 h-2 bg-yellow-300 rounded-full opacity-60"></div>
                    <div className="absolute bottom-[28%] right-[17%] w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <div className="absolute top-[13%] right-[9%] w-1 h-1 bg-yellow-400 rounded-full opacity-50"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section - More Compact */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4">
                            <span className="block text-white mb-1">Featured</span>
                            <span className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                Packages
                            </span>
                        </h2>

                        {/* Decorative Line */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16"></div>
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16"></div>
                        </div>

                        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            Carefully curated packages for every pilgrim's sacred journey
                        </p>
                    </motion.div>

                    {/* Dynamic Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6 mb-12">
                        {packages.map((pkg, index) => {
                            // Dynamic grid spans for interesting layout
                            let gridClass = "";
                            if (index === 0) gridClass = "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-5"; // Large card
                            else if (index === 1) gridClass = "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-7"; // Large card  
                            else if (index === 2) gridClass = "col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-4"; // Medium card
                            else if (index === 3) gridClass = "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4"; // Medium card
                            else if (index === 4) gridClass = "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4"; // Medium card
                            else if (index === 5) gridClass = "col-span-1 sm:col-span-3 md:col-span-4 lg:col-span-12"; // Full width card

                            return (
                                <motion.div
                                    key={pkg.id}
                                    className={`relative group ${gridClass}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.08,
                                        ease: "easeOut"
                                    }}
                                    viewport={{ once: true, margin: "-30px" }}
                                    onMouseEnter={() => setHoveredCard(pkg.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Compact Card Container */}
                                    <div className="relative bg-gray-900/60 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-4 md:p-5 hover:border-yellow-400/60 hover:bg-gray-900/80 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-yellow-400/10 h-full">

                                        {/* Badge */}
                                        <div className={`absolute -top-2 left-4 ${pkg.badgeColor} px-3 py-1 rounded-full text-white text-xs font-semibold shadow-lg`}>
                                            {pkg.badge}
                                        </div>

                                        {/* Header - More Compact */}
                                        <div className="mb-4 mt-2">
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">{pkg.title}</h3>
                                            <p className="text-yellow-400 text-xs md:text-sm font-medium">{pkg.subtitle}</p>
                                        </div>

                                        {/* Price - Compact */}
                                        <div className="mb-4">
                                            <div className="flex items-end gap-2 mb-1">
                                                <span className="text-xl md:text-2xl font-bold text-yellow-400">{pkg.price}</span>
                                                <span className="text-gray-400 line-through text-sm">{pkg.originalPrice}</span>
                                            </div>
                                        </div>

                                        {/* Quick Info - Horizontal Layout for Compact */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-center gap-1 text-gray-300">
                                                <Calendar className="w-3 h-3 text-yellow-400" />
                                                <span className="text-xs">{pkg.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-300">
                                                <Users className="w-3 h-3 text-yellow-400" />
                                                <span className="text-xs">{pkg.groupSize}</span>
                                            </div>
                                        </div>

                                        {/* Highlights - 2x2 Grid for Compact */}
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {pkg.highlights.map((highlight, idx) => (
                                                <div key={idx} className="flex items-center gap-1 p-2 bg-gray-800/50 rounded text-center">
                                                    <highlight.icon className="w-3 h-3 text-yellow-400" />
                                                    <span className="text-gray-300 text-xs">{highlight.text}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features - Show only top 3 for compact */}
                                        <div className="space-y-2 mb-4">
                                            {pkg.features.slice(0, 3).map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-300 text-xs leading-tight">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Button - Compact */}
                                        <motion.button
                                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 flex items-center justify-center gap-2 group text-sm"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span>View Details</span>
                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA - Compact */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <motion.button
                            className="bg-gray-900/60 backdrop-blur-sm border-2 border-yellow-400 text-yellow-400 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View All Packages
                        </motion.button>

                        <p className="text-gray-400 mt-3 text-sm">
                            Can't find the perfect package?
                            <span className="text-yellow-400 hover:text-yellow-300 cursor-pointer ml-1">
                                Contact us for custom arrangements
                            </span>
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Accent Line matching your theme */}
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent opacity-60"></div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPackages;