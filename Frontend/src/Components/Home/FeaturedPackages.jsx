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

// Package data
const PACKAGES = [
    {
        id: 1,
        title: "Essential Umrah",
        subtitle: "Perfect for First-Time Pilgrims",
        price: "PKR 185,000",
        duration: "10 Days",
        badge: "Most Popular",
        image: "https://images.unsplash.com/photo-1575101261474-5cb5653bb416?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        duration: "21 Days",
        badge: "Premium Choice",
        image: "https://plus.unsplash.com/premium_photo-1676208761578-0523b6e3f233?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        duration: "12 Days",
        badge: "Family Friendly",
        image: "https://images.unsplash.com/photo-1588994538331-5cc9ba0284c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        highlights: [
            { icon: Users, text: "Family Focused" },
            { icon: Shield, text: "Child Safety" },
            { icon: Calendar, text: "Flexible Dates" },
            { icon: Hotel, text: "Family Rooms" }
        ]
    },
    {
        id: 3,
        title: "Family Umrah",
        subtitle: "Designed for Families with Children",
        price: "PKR 320,000",
        duration: "12 Days",
        badge: "Family Friendly",
        image: "https://images.unsplash.com/photo-1588994538331-5cc9ba0284c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        highlights: [
            { icon: Users, text: "Family Focused" },
            { icon: Shield, text: "Child Safety" },
            { icon: Calendar, text: "Flexible Dates" },
            { icon: Hotel, text: "Family Rooms" }
        ]
    },
    {
        id: 3,
        title: "Family Umrah",
        subtitle: "Designed for Families with Children",
        price: "PKR 320,000",
        duration: "12 Days",
        badge: "Family Friendly",
        image: "https://images.unsplash.com/photo-1588994538331-5cc9ba0284c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        highlights: [
            { icon: Users, text: "Family Focused" },
            { icon: Shield, text: "Child Safety" },
            { icon: Calendar, text: "Flexible Dates" },
            { icon: Hotel, text: "Family Rooms" }
        ]
    },
    {
        id: 3,
        title: "Family Umrah",
        subtitle: "Designed for Families with Children",
        price: "PKR 320,000",
        duration: "12 Days",
        badge: "Family Friendly",
        image: "https://images.unsplash.com/photo-1588994538331-5cc9ba0284c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        highlights: [
            { icon: Users, text: "Family Focused" },
            { icon: Shield, text: "Child Safety" },
            { icon: Calendar, text: "Flexible Dates" },
            { icon: Hotel, text: "Family Rooms" }
        ]
    },
];

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Sub-components
const SectionHeader = () => (
    <motion.div
        className="text-center mb-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
    >
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
            Featured <span className="text-[#C9A227]">Packages</span>
        </h2>

        <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent w-24" />
            <div className="w-1.5 h-1.5 bg-[#C9A227] rounded-full" />
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent w-24" />
        </div>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Carefully curated packages for every pilgrim's sacred journey
        </p>
    </motion.div>
);

const PackageCard = ({ pkg, index, isHovered, onHover }) => {
    const IconComponent = pkg.highlights[0]?.icon;
    const secondIcon = pkg.highlights[1]?.icon;

    return (
        <motion.div
            className="group relative h-full"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => onHover(pkg.id)}
            onMouseLeave={() => onHover(null)}
        >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl border border-gray-100 hover:border-[#C9A227]/30 transition-all duration-500 hover:scale-101 h-full">

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="bg-gradient-to-r from-[#C9A227] to-[#DAB83D] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                            {pkg.badge}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 bg-gradient-to-b from-white to-[#C9A227]/5 flex flex-col h-[calc(100%-12rem)]">

                    {/* Title & Subtitle */}
                    <div className="mb-3">
                        <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                            {pkg.title}
                        </h3>
                        <p className="text-xs font-medium">
                            {pkg.subtitle}
                        </p>
                    </div>

                    {/* Price & Duration */}
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-xl font-bold bg-gradient-to-r from-[#C9A227] to-[#DAB83D] bg-clip-text text-transparent">
                            {pkg.price}
                        </span>
                        <div className="flex items-center gap-1 text-gray-600 text-xs">
                            <Calendar className="w-3 h-3 text-[#C9A227]" />
                            <span>{pkg.duration}</span>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 gap-1.5 mb-4 text-sm flex-grow">
                        {pkg.highlights.slice(0, 2).map((highlight, idx) => {
                            const Icon = highlight.icon;
                            return (
                                <div key={idx} className="flex items-center gap-2 text-gray-600">
                                    <Icon className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                                    <span>{highlight.text}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Book Now Button */}
                    <motion.button
                        className="w-full bg-gradient-to-r from-[#C9A227] to-[#DAB83D] text-white font-semibold py-3 px-5 rounded-lg text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>

                </div>
            </div>
        </motion.div>
    );
};

const CustomPackageCTA = () => (
    <motion.div
        className="text-center mt-10"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
    >
        <p className="text-gray-600 mb-6 text-lg">
            Need a custom package? We're here to help create your perfect journey.
        </p>
        <motion.button
            className="bg-gradient-to-r from-white to-[#C9A227]/10 border-2 border-[#C9A227] text-[#C9A227] hover:bg-gradient-to-r hover:from-[#C9A227] hover:to-[#DAB83D] hover:text-white hover:border-[#DAB83D] px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Request Custom Package
        </motion.button>
    </motion.div>
);

const FeaturedPackages = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <section className="relative bg-white overflow-hidden">

            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201,162,39,0.12) 1px, transparent 0)`,
                    backgroundSize: "60px 60px"
                }}
            />

            {/* Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-50" />

            {/* Main Content */}
            <div className="py-12 md:py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <SectionHeader />

                    {/* Package Cards Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {PACKAGES.map((pkg, index) => (
                            <PackageCard
                                key={pkg.id}
                                pkg={pkg}
                                index={index}
                                isHovered={hoveredCard === pkg.id}
                                onHover={setHoveredCard}
                            />
                        ))}
                    </motion.div>

                    <CustomPackageCTA />

                </div>
            </div>
        </section>
    );
};

export default FeaturedPackages;