import React, { useState } from "react";
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
            badge: "Most Popular",
            badgeColor: "bg-blue-500",
            highlights: [
                { icon: Hotel, text: "Close to Haram" },
                { icon: Plane, text: "Direct Flights" },
                { icon: Shield, text: "Full Insurance" },
                { icon: Users, text: "Group Support" }
            ]
        },
        {
            id: 2,
            title: "Premium Hajj",
            subtitle: "Luxury Experience for Sacred Journey",
            price: "PKR 750,000",
            originalPrice: "PKR 850,000",
            duration: "21 Days",
            groupSize: "10-15 People",
            badge: "Premium Choice",
            badgeColor: "bg-yellow-500",
            highlights: [
                { icon: Star, text: "5-Star Luxury" },
                { icon: Car, text: "Private Transport" },
                { icon: Clock, text: "24/7 Support" },
                { icon: MapPin, text: "Premium Location" }
            ]
        },
        {
            id: 3,
            title: "Family Umrah",
            subtitle: "Designed for Families with Children",
            price: "PKR 320,000",
            originalPrice: "PKR 380,000",
            duration: "12 Days",
            groupSize: "Family Groups",
            badge: "Family Friendly",
            badgeColor: "bg-green-500",
            highlights: [
                { icon: Users, text: "Family Focused" },
                { icon: Shield, text: "Child Safety" },
                { icon: Calendar, text: "Flexible Dates" },
                { icon: Hotel, text: "Family Rooms" }
            ]
        },
        {
            id: 4,
            title: "Budget Umrah",
            subtitle: "Affordable Sacred Journey",
            price: "PKR 125,000",
            originalPrice: "PKR 155,000",
            duration: "7 Days",
            groupSize: "20-25 People",
            badge: "Best Value",
            badgeColor: "bg-purple-500",
            highlights: [
                { icon: Calendar, text: "Quick Trip" },
                { icon: Users, text: "Large Groups" },
                { icon: Plane, text: "Economy Class" },
                { icon: Shield, text: "Basic Coverage" }
            ]
        }
    ];

    return (
        <section className="relative bg-black overflow-hidden -mt-2 -mb-2">
            {/* Elegant Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div 
                    className="absolute inset-0" 
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,215,0,0.15) 1px, transparent 0)`,
                        backgroundSize: '60px 60px'
                    }} 
                />
            </div>
            
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
            
            {/* Blueish and Gold Gradient Overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(35deg, 
                                rgba(30, 58, 138, 0.08) 0%, 
                                rgba(59, 130, 246, 0.05) 15%, 
                                rgba(0, 0, 0, 0.02) 50%, 
                                rgba(251, 191, 36, 0.05) 85%, 
                                rgba(245, 158, 11, 0.08) 100%)`
                }}
            />
            
            {/* Blue and Gold Sparkles - Static */}
            <div className="absolute inset-0 opacity-20">
                {/* Blue sparkles on left side */}
                <div className="absolute top-[18%] left-[14%] w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="absolute top-[31%] left-[27%] w-1.5 h-1.5 bg-blue-300 rounded-full opacity-60"></div>
                <div className="absolute top-[47%] left-[8%] w-1 h-1 bg-blue-500 rounded-full"></div>
                <div className="absolute top-[64%] left-[23%] w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>
                <div className="absolute bottom-[22%] left-[11%] w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
                <div className="absolute top-[71%] left-[19%] w-1 h-1 bg-blue-500 rounded-full opacity-50"></div>
                <div className="absolute top-[39%] left-[6%] w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                
                {/* Gold sparkles on right side */}
                <div className="absolute top-[26%] right-[19%] w-1 h-1 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-[43%] right-[31%] w-2 h-2 bg-yellow-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-[28%] right-[17%] w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                <div className="absolute top-[13%] right-[9%] w-1 h-1 bg-yellow-400 rounded-full opacity-50"></div>
                <div className="absolute bottom-[15%] right-[24%] w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-[58%] right-[12%] w-1 h-1 bg-yellow-500 rounded-full opacity-40"></div>
                <div className="absolute top-[81%] right-[28%] w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                
                {/* Additional center sparkles for packages area */}
                <div className="absolute top-[35%] left-[45%] w-1 h-1 bg-yellow-400 rounded-full opacity-30"></div>
                <div className="absolute top-[55%] right-[45%] w-1.5 h-1.5 bg-blue-300 rounded-full opacity-40"></div>
                <div className="absolute top-[75%] left-[55%] w-1 h-1 bg-yellow-500 rounded-full opacity-50"></div>
            </div>

            {/* Content Wrapper */}
            <div className="py-12 md:py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                            <span className="text-white">Featured </span>
                            <span className="text-yellow-400">Packages</span>
                        </h2>

                        {/* Decorative Line */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-24" />
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-24" />
                        </div>

                        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                            Carefully curated packages for every pilgrim's sacred journey
                        </p>
                    </motion.div>

                    {/* Clean 2x2 Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                className="group relative"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: true, margin: "-30px" }}
                                onMouseEnter={() => setHoveredCard(pkg.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Card Container */}
                                <div className="relative bg-gray-900/60 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-400/60 hover:bg-gray-900/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/10 h-full">
                                    
                                    {/* Badge */}
                                    <div className="absolute -top-4 left-8">
                                        <div className={`${pkg.badgeColor} text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg`}>
                                            {pkg.badge}
                                        </div>
                                    </div>

                                    {/* Package Header */}
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{pkg.title}</h3>
                                        <p className="text-yellow-400 text-sm font-medium">{pkg.subtitle}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-3xl font-bold text-yellow-400">{pkg.price}</span>
                                            <span className="text-gray-400 line-through text-lg">{pkg.originalPrice}</span>
                                        </div>
                                    </div>

                                    {/* Duration & People */}
                                    <div className="flex items-center gap-6 mb-6 text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-yellow-400" />
                                            <span className="text-sm">{pkg.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-yellow-400" />
                                            <span className="text-sm">{pkg.groupSize}</span>
                                        </div>
                                    </div>

                                    {/* Features - Clean 2x2 Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-8">
                                        {pkg.highlights.map((highlight, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-gray-300">
                                                <highlight.icon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                                                <span className="text-sm">{highlight.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <motion.button
                                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span>View Details</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-300 mb-6 text-lg">
                            Need a custom package? We're here to help create your perfect journey.
                        </p>
                        <motion.button
                            className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Request Custom Package
                        </motion.button>
                    </motion.div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent opacity-60" />
                </div>
            </div>
        </section>
    );
};

export default FeaturedPackages;