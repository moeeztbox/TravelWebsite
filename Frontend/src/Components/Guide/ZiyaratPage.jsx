// pages/ZiyaratPage.js
import React, { useState, useEffect, useRef } from 'react'
import { MapPin, Clock, Star, Navigation, ExternalLink } from "lucide-react";
import gsap from "gsap";

function ZiyaratPage() {
    // Hero Section Refs
    const containerRef = useRef(null);
    const iconSectionRef = useRef(null);
    const leftLineRef = useRef(null);
    const rightLineRef = useRef(null);
    const iconRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    // Hero Section Animation
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // Initial state
        gsap.set(
            [containerRef.current, iconSectionRef.current, titleRef.current, subtitleRef.current],
            { opacity: 0, y: 30 }
        );
        gsap.set([leftLineRef.current, rightLineRef.current], { scaleX: 0 });
        gsap.set(leftLineRef.current, { transformOrigin: "right center" });
        gsap.set(rightLineRef.current, { transformOrigin: "left center" });
        gsap.set(iconRef.current, { scale: 0, rotation: 180, opacity: 0 });

        // Faster GSAP sequence
        tl.to(containerRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0)
            .to(iconSectionRef.current, { opacity: 1, y: 0, duration: 0.45 }, 0.15)
            .to(leftLineRef.current, { scaleX: 1, duration: 0.5 }, 0.3)
            .to(rightLineRef.current, { scaleX: 1, duration: 0.5 }, 0.3)
            .to(
                iconRef.current,
                { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(1.8)" },
                0.75
            )
            .to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.05)
            .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4 }, 1.4);
    }, []);

    const HeroSection = () => {
        return (
            <div
                style={{
                    backgroundImage: `linear-gradient(135deg, 
                                        rgba(15, 15, 15, 0.75) 0%, 
                                        rgba(0, 0, 0, 0.7) 50%, 
                                        rgba(10, 10, 10, 0.8) 100%), 
                                        url('https://images.unsplash.com/photo-1547999451-7c004b13a7a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
                className="h-[85vh] flex items-center justify-center relative"
            >

                <div className="text-gray-800 w-full h-full relative flex items-center justify-center" style={{ zIndex: 2 }}>
                    {/* Sparkles - CSS animated, no GSAP */}
                    <div className="absolute inset-0 opacity-8 sm:opacity-12 pointer-events-none">
                        {Array.from({ length: 25 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-green-500 rounded-full animate-ping"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDuration: `${1.5 + Math.random() * 2}s`,
                                    animationDelay: `${Math.random()}s`,
                                    boxShadow: `0 0 6px rgba(34, 197, 94, 0.6), 0 0 12px rgba(34, 197, 94, 0.4)`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Main Content */}
                    <div
                        ref={containerRef}
                        className="relative z-10 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8"
                    >
                        <div className="text-center max-w-6xl mx-auto">
                            {/* Icon and Lines */}
                            <div
                                ref={iconSectionRef}
                                className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 mb-3 xs:mb-4 sm:mb-6"
                            >
                                {/* Left line */}
                                <div
                                    ref={leftLineRef}
                                    className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-8 xs:w-12 sm:w-16 md:w-20"
                                />
                                {/* Icon */}
                                <div ref={iconRef}>
                                    <MapPin className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-500 flex-shrink-0" />
                                </div>
                                {/* Right line */}
                                <div
                                    ref={rightLineRef}
                                    className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-8 xs:w-12 sm:w-16 md:w-20"
                                />
                            </div>

                            {/* Title */}
                            <div ref={titleRef}>
                                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-white">
                                    Sacred <span className="text-green-400">Ziyarat</span> Guide
                                </h1>
                            </div>

                            {/* Subtitle */}
                            <div ref={subtitleRef}>
                                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 xs:mb-6 sm:mb-8 leading-relaxed">
                                    Explore holy sites and historical landmarks in Makkah and Madinah with detailed insights and spiritual significance
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const ziyaratSites = [
        {
            id: 1,
            title: "Cave of Hira (Jabal al-Nour)",
            location: "Makkah, Saudi Arabia",
            description: "The sacred cave where Prophet Muhammad (PBUH) received the first revelation of the Quran from Angel Jibreel.",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            significance: "This mountain cave marks the beginning of Islam. The first verses of Quran 'Iqra' were revealed here, starting the prophethood of Muhammad (PBUH).",
            highlights: [
                "Site of first Quranic revelation",
                "Mountain climbing experience",
                "Spiritual reflection spot",
                "Historical Islamic landmark",
                "Panoramic views of Makkah"
            ],
            bestTime: "Early morning or late afternoon for comfortable climb",
            prayerReward: "Special place for reflection and connection with Islamic origins",
            coordinates: "21.4575° N, 39.8561° E",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.234567890123!2d39.854345675956!3d21.457678980486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c2044b10e3d36d%3A0x5b1b03582f5c4f8c!2sJabal%20al-Nour!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        },
        {
            id: 2,
            title: "Cave of Thawr",
            location: "Makkah, Saudi Arabia",
            description: "The cave where Prophet Muhammad (PBUH) and Abu Bakr (RA) took refuge during their migration to Madinah.",
            image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            significance: "Allah protected the Prophet and his companion here with miraculous events, including a spider weaving a web and pigeons laying eggs at the entrance.",
            highlights: [
                "Hijrah migration historical site",
                "Miracle of protection location",
                "Mountain cave refuge",
                "Islamic history landmark",
                "Spiritual significance"
            ],
            bestTime: "Morning hours for safe access",
            prayerReward: "Place to reflect on trust in Allah and divine protection",
            coordinates: "21.3500° N, 39.9500° E",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.345678901234!2d39.948456775956!3d21.350078980486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c2044b10e3d36d%3A0x5b1b03582f5c4f8c!2sCave%20of%20Thawr!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        },
        {
            id: 3,
            title: "Masjid al-Qiblatayn",
            location: "Madinah, Saudi Arabia",
            description: "The Mosque of the Two Qiblas where the direction of prayer was changed from Jerusalem to Makkah during Prophet's time.",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            significance: "This mosque preserves both prayer directions, marking the moment when Allah commanded Muslims to face the Kaaba instead of Jerusalem.",
            highlights: [
                "Two mihrabs (prayer niches)",
                "Historical change of Qibla",
                "Unique Islamic architecture",
                "Well-preserved historical site",
                "Educational significance"
            ],
            bestTime: "Between prayer times for peaceful visit",
            prayerReward: "Praying here connects with important Islamic history",
            coordinates: "24.4842° N, 39.5694° E",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.456789012345!2d39.5674567759416!3d24.484278978185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbe2ade54d50d%3A0x6c6b4a83b6b8b8b8!2sMasjid%20al-Qiblatayn!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        },
        {
            id: 4,
            title: "Jannat al-Mu'alla",
            location: "Makkah, Saudi Arabia",
            description: "The ancient cemetery of Makkah containing graves of many relatives and companions of Prophet Muhammad (PBUH).",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            significance: "Final resting place of Prophet's first wife Khadija (RA), his grandfather Abdul Muttalib, and other prominent early Muslims.",
            highlights: [
                "Grave of Khadija (RA)",
                "Burial place of Abdul Muttalib",
                "Ancient Islamic cemetery",
                "Historical significance",
                "Place for reflection"
            ],
            bestTime: "Early morning or evening for quiet reflection",
            prayerReward: "Opportunity to pray for early Muslims and remember the hereafter",
            coordinates: "21.4292° N, 39.8261° E",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.912345678901!2d39.824456775956!3d21.429278980486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c2044b10e3d36d%3A0x5b1b03582f5c4f8c!2sJannat%20al-Mu%27alla!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        },
        {
            id: 5,
            title: "Masjid al-Jummah",
            location: "Madinah, Saudi Arabia",
            description: "The site where Prophet Muhammad (PBUH) performed the first Friday prayer after migrating to Madinah.",
            image: "https://images.unsplash.com/photo-1564760298905-0ad8c79e08a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            significance: "This mosque marks the establishment of Jummah (Friday) prayers in Islam and the first congregational Friday prayer led by the Prophet.",
            highlights: [
                "First Jummah prayer site",
                "Historical Islamic landmark",
                "Modern mosque preservation",
                "Educational significance",
                "Peaceful atmosphere"
            ],
            bestTime: "Friday mornings or between prayer times",
            prayerReward: "Special significance for Friday prayers and Islamic history",
            coordinates: "24.4614° N, 39.6069° E",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.345678901234!2d39.6044567759416!3d24.461478978185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbe2ade54d50d%3A0x6c6b4a83b6b8b8b8!2sMasjid%20al-Jummah!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        },
        {
            id: 6,
            title: "Battle of Badr Site",
            location: "Between Makkah and Madinah",
            description: "The historical battlefield where the first major battle in Islamic history took place between Muslims and Quraysh.",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            significance: "Allah granted victory to the outnumbered Muslims here, demonstrating divine support and establishing Islamic strength.",
            highlights: [
                "First major Islamic battle",
                "Divine victory site",
                "Historical battlefield",
                "Martyrs' remembrance",
                "Educational historical site"
            ],
            bestTime: "Daytime for safe exploration",
            prayerReward: "Place to reflect on early Muslim struggles and divine help",
            coordinates: "23.7833° N, 38.7833° E",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.456789012345!2d38.7814567759416!3d23.783478978185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c2044b10e3d36d%3A0x5b1b03582f5c4f8c!2sBattle%20of%20Badr%20Site!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        },
        {
            id: 7,
            title: "Masjid al-Ghamama",
            location: "Madinah, Saudi Arabia",
            description: "The Cloud Mosque where Prophet Muhammad (PBUH) performed Eid prayers and prayed for rain during drought.",
            image: "https://images.unsplash.com/photo-1587132137056-ae4c067babf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            significance: "Named after the cloud that provided shade during Prophet's prayer. It marks important historical prayers and Islamic traditions.",
            highlights: [
                "Eid prayer historical site",
                "Rain prayer location",
                "Prophetic tradition site",
                "Historical mosque",
                "Islamic heritage preservation"
            ],
            bestTime: "Early morning or late afternoon",
            prayerReward: "Connection with Prophetic traditions and prayers",
            coordinates: "24.4686° N, 39.6114° E",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.234567890123!2d39.6094567759416!3d24.468678978185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbe2ade54d50d%3A0x6c6b4a83b6b8b8b8!2sMasjid%20al-Ghamama!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        }
    ]

    const ZiyaratSection = ({ site, index }) => {
        const isEven = index % 2 === 0;

        return (
            <section id={`ziyarat-${site.id}`} className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                        {/* Image and Map Section */}
                        <div className="lg:w-1/2 w-full space-y-6">
                            {/* Main Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                                <img
                                    src={site.image}
                                    alt={site.title}
                                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                                        {site.location}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm font-medium">{site.coordinates}</span>
                                </div>
                            </div>

                            {/* Embedded Map */}
                            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                                <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Navigation className="w-5 h-5" />
                                        <span className="font-semibold">Location Map</span>
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.title + ' ' + site.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-sm hover:text-green-200 transition-colors"
                                    >
                                        Open in Maps
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                                <div className="h-80 w-full">
                                    <iframe
                                        src={site.mapEmbed}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map of ${site.title}`}
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 text-center">
                                        📍 {site.coordinates} • {site.location}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="lg:w-1/2 w-full">
                            <div className="space-y-6">
                                {/* Title and Location */}
                                <div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                        {site.title}
                                    </h2>
                                    <div className="flex items-center gap-2 text-green-600 mb-4">
                                        <MapPin className="w-5 h-5" />
                                        <span className="text-lg font-semibold">{site.location}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {site.description}
                                </p>

                                {/* Significance */}
                                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                    <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                                        <Star className="w-5 h-5" />
                                        Spiritual Significance
                                    </h3>
                                    <p className="text-green-700 leading-relaxed">
                                        {site.significance}
                                    </p>
                                </div>

                                {/* Highlights */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Key Highlights</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {site.highlights.map((highlight, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-gray-700">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Practical Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Best Time to Visit</p>
                                            <p className="font-semibold text-gray-900">{site.bestTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Navigation className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Spiritual Importance</p>
                                            <p className="font-semibold text-gray-900">{site.prayerReward}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="flex gap-4 pt-4">
                                    <a
                                        href={`https://www.google.com/maps/dir//${encodeURIComponent(site.title + ' ' + site.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Navigation className="w-5 h-5" />
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <HeroSection />

            {/* Ziyarat Sections */}
            <main className="pt-4">
                {ziyaratSites.map((site, index) => (
                    <ZiyaratSection key={site.id} site={site} index={index} />
                ))}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Sacred Ziyarat Guide</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        May your visits to these holy sites bring you closer to Allah, increase your faith,
                        and provide spiritual enlightenment. Remember to maintain proper Islamic etiquette
                        and make sincere supplications at each location.
                    </p>
                    <div className="mt-8 pt-8 border-t border-gray-700">
                        <p className="text-gray-500 text-sm">
                            "And whoever honors the sacred rites of Allah - it is best for him in the sight of his Lord."
                            <br />(Quran 22:30)
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default ZiyaratPage