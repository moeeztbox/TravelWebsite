// pages/TravelGuidePage.js
import React, { useState, useEffect, useRef } from 'react'
import { Map, Navigation, Globe } from "lucide-react";
import gsap from "gsap";

function TravelPage() {
    const [selectedCard, setSelectedCard] = useState(null)
    const scrollPositionRef = useRef(0)

    // Hero Section Refs
    const containerRef = useRef(null);
    const iconSectionRef = useRef(null);
    const leftLineRef = useRef(null);
    const rightLineRef = useRef(null);
    const iconRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const badgeRef = useRef(null);

    // Hero Section Animation
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // Initial state
        gsap.set(
            [containerRef.current, iconSectionRef.current, titleRef.current, subtitleRef.current, badgeRef.current],
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
            .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4 }, 1.4)
            .to(badgeRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 1.75);
    }, []);

    // Modal scroll handling
    useEffect(() => {
        if (selectedCard) {
            scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollPositionRef.current}px`
            document.body.style.width = '100%'
        } else {
            document.body.style.overflow = 'unset'
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
            window.scrollTo(0, scrollPositionRef.current)
        }

        return () => {
            document.body.style.overflow = 'unset'
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
        }
    }, [selectedCard])

    useEffect(() => {
        if (!selectedCard) return;

        const preventScroll = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const opts = { passive: false };
        document.addEventListener('wheel', preventScroll, opts);
        document.addEventListener('touchmove', preventScroll, opts);

        return () => {
            document.removeEventListener('wheel', preventScroll, opts);
            document.removeEventListener('touchmove', preventScroll, opts);
        };
    }, [selectedCard])

    const HeroSection = () => {
        return (
            <div
                style={{
                    backgroundImage: `linear-gradient(135deg, 
                    rgba(15, 15, 15, 0.75) 0%, 
                    rgba(0, 0, 0, 0.7) 50%, 
                    rgba(10, 10, 10, 0.8) 100%), 
                    url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
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
                                className="absolute w-1 h-1 bg-blue-500 rounded-full animate-ping"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDuration: `${1.5 + Math.random() * 2}s`,
                                    animationDelay: `${Math.random()}s`,
                                    boxShadow: `0 0 6px rgba(59, 130, 246, 0.6), 0 0 12px rgba(59, 130, 246, 0.4)`,
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
                                    className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-8 xs:w-12 sm:w-16 md:w-20"
                                />
                                {/* Icon */}
                                <div ref={iconRef}>
                                    <Globe className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-500 flex-shrink-0" />
                                </div>
                                {/* Right line */}
                                <div
                                    ref={rightLineRef}
                                    className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-8 xs:w-12 sm:w-16 md:w-20"
                                />
                            </div>

                            {/* Title */}
                            <div ref={titleRef}>
                                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-white">
                                    Complete <span className="text-blue-400">Travel</span> Guide
                                </h1>
                            </div>

                            {/* Subtitle */}
                            <div ref={subtitleRef}>
                                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 xs:mb-6 sm:mb-8 leading-relaxed">
                                    Essential travel information, preparation tips, and journey planning for your spiritual pilgrimage
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const travelCards = [
        {
            title: "TRAVEL PREPARATION",
            description: "Essential steps to prepare for your journey to the holy lands, from documents to packing.",
            detailedContent: `
            <h3>Document Preparation</h3>
            <ul>
                <li><strong>Passport:</strong> Valid for at least 6 months from travel date</li>
                <li><strong>Visa:</strong> Apply through authorized agents well in advance</li>
                <li><strong>Vaccination:</strong> Meningitis and COVID-19 vaccination certificates</li>
                <li><strong>Travel Insurance:</strong> Comprehensive coverage recommended</li>
            </ul>
            
            <h3>Packing Essentials</h3>
            <ul>
                <li>Comfortable walking shoes</li>
                <li>Modest clothing (abayas for women, thobes for men)</li>
                <li>Personal hygiene items</li>
                <li>Medications and first aid kit</li>
                <li>Prayer mat and Quran</li>
                <li>Power adapters and chargers</li>
            </ul>
            
            <h3>Financial Preparation</h3>
            <p>Carry sufficient Saudi Riyals, credit cards, and keep emergency funds separate.</p>
        `,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "FLIGHT & TRANSPORT",
            description: "Booking flights, airport procedures, and transportation options in Saudi Arabia.",
            detailedContent: `
            <h3>Flight Booking Tips</h3>
            <ul>
                <li>Book direct flights to Jeddah or Madinah when possible</li>
                <li>Consider airlines with good pilgrim services</li>
                <li>Book 2-3 months in advance for better prices</li>
                <li>Check baggage allowances carefully</li>
            </ul>
            
            <h3>Airport Procedures</h3>
            <ol>
                <li>Arrive at airport 3-4 hours before departure</li>
                <li>Complete immigration and customs formalities</li>
                <li>Keep all documents easily accessible</li>
                <li>Follow COVID-19 protocols if applicable</li>
            </ol>
            
            <h3>Transportation in Saudi Arabia</h3>
            <ul>
                <li><strong>Airport to Hotel:</strong> Pre-booked transfers or taxis</li>
                <li><strong>Between Cities:</strong> High-speed trains, buses, or flights</li>
                <li><strong>Local Travel:</strong> Taxis, ride-sharing apps, or hotel shuttles</li>
            </ul>
        `,
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "ACCOMMODATION GUIDE",
            description: "Choosing the right hotels and understanding accommodation options near holy sites.",
            detailedContent: `
            <h3>Hotel Selection Criteria</h3>
            <ul>
                <li>Proximity to Haram (walking distance preferred)</li>
                <li>Room amenities and comfort level</li>
                <li>Hotel services and facilities</li>
                <li>Group packages vs individual bookings</li>
            </ul>
            
            <h3>Makkah Accommodation</h3>
            <p>Hotels near Masjid al-Haram offer convenience but book early as they fill quickly.</p>
            
            <h3>Madinah Accommodation</h3>
            <p>Hotels near Masjid an-Nabawi provide easy access for prayers and ziyarat.</p>
            
            <h3>Booking Tips</h3>
            <ul>
                <li>Book through reputable travel agents</li>
                <li>Read recent reviews from pilgrims</li>
                <li>Confirm cancellation policies</li>
                <li>Verify distance from Haram</li>
            </ul>
        `,
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "HEALTH & SAFETY",
            description: "Staying healthy during your journey and important safety precautions to follow.",
            detailedContent: `
            <h3>Health Precautions</h3>
            <ul>
                <li>Stay hydrated in the desert climate</li>
                <li>Use sunscreen and wear hats</li>
                <li>Carry necessary medications</li>
                <li>Know location of nearby hospitals/clinics</li>
            </ul>
            
            <h3>Safety Measures</h3>
            <ul>
                <li>Keep valuables in hotel safe</li>
                <li>Carry hotel contact information</li>
                <li>Use money belts for important documents</li>
                <li>Be aware of emergency numbers</li>
            </ul>
            
            <h3>Crowd Management</h3>
            <p>During peak times, be patient in crowds and follow security instructions carefully.</p>
            
            <h3>Food Safety</h3>
            <p>Eat at reputable restaurants and drink bottled water to avoid stomach issues.</p>
        `,
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "COMMUNICATION & CONNECTIVITY",
            description: "Staying connected with family and accessing important information during your trip.",
            detailedContent: `
            <h3>Mobile Connectivity</h3>
            <ul>
                <li>Get local SIM card at airport</li>
                <li>Consider international roaming plans</li>
                <li>Download essential apps before travel</li>
            </ul>
            
            <h3>Essential Apps</h3>
            <ul>
                <li><strong>Nusuk:</strong> Official app for Hajj and Umrah services</li>
                <li><strong>Google Translate:</strong> For language assistance</li>
                <li><strong>Maps:</strong> For navigation in cities</li>
                <li><strong>Weather:</strong> To check temperature and conditions</li>
            </ul>
            
            <h3>Internet Access</h3>
            <p>Most hotels offer free WiFi. Public WiFi is available in shopping malls and restaurants.</p>
            
            <h3>Emergency Contacts</h3>
            <p>Save important numbers: Embassy, travel agent, hotel, and local emergency services.</p>
        `,
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "CULTURAL ETIQUETTE",
            description: "Understanding local customs, traditions, and respectful behavior in Saudi Arabia.",
            detailedContent: `
            <h3>Dress Code</h3>
            <ul>
                <li><strong>Women:</strong> Abaya in public places (not required in hotel)</li>
                <li><strong>Men:</strong> Modest clothing, avoid shorts in public</li>
                <li>Respect local customs in dress and behavior</li>
            </ul>
            
            <h3>Social Etiquette</h3>
            <ul>
                <li>Greet with "As-salamu alaykum"</li>
                <li>Respect prayer times when businesses may close</li>
                <li>Ask permission before taking photos of people</li>
                <li>Be patient in queues and crowded places</li>
            </ul>
            
            <h3>Religious Sensitivity</h3>
            <p>Respect all Islamic traditions and holy sites. Follow instructions at mosques and historical sites.</p>
            
            <h3>Shopping & Bargaining</h3>
            <p>Bargaining is common in souks. Be respectful and friendly during negotiations.</p>
        `,
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "BUDGET PLANNING",
            description: "Managing expenses and creating a realistic budget for your spiritual journey.",
            detailedContent: `
            <h3>Major Expense Categories</h3>
            <ul>
                <li><strong>Flights:</strong> 25-35% of total budget</li>
                <li><strong>Accommodation:</strong> 30-40% of total budget</li>
                <li><strong>Food & Transportation:</strong> 15-20% of total budget</li>
                <li><strong>Shopping & Miscellaneous:</strong> 10-15% of total budget</li>
            </ul>
            
            <h3>Cost-Saving Tips</h3>
            <ul>
                <li>Travel in off-peak seasons</li>
                <li>Book package deals through agents</li>
                <li>Share accommodation with family/friends</li>
                <li>Use public transportation when possible</li>
            </ul>
            
            <h3>Emergency Fund</h3>
            <p>Always keep 10-15% of your budget as emergency fund for unexpected expenses.</p>
            
            <h3>Currency Exchange</h3>
            <p>Exchange currency at authorized exchange centers for better rates than airports.</p>
        `,
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        }
    ]
    const Modal = ({ card, onClose }) => {
        if (!card) return null

        const handleBackdropClick = (e) => {
            if (e.target === e.currentTarget) {
                onClose()
            }
        }

        const handleModalScroll = (e) => {
            e.stopPropagation()
        }

        return (
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
                onClick={handleBackdropClick}
                style={{ top: 0, left: 0, right: 0, bottom: 0 }}
            >
                <div
                    className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl my-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative h-48">
                        <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover"
                        />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200 shadow-lg"
                        >
                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="absolute bottom-6 left-6 right-6">
                            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                                {card.title}
                            </h2>
                            <p className="text-white/90 text-sm mt-1 drop-shadow">
                                {card.description}
                            </p>
                        </div>
                    </div>

                    <div
                        className="p-8 max-h-[calc(85vh-12rem)] overflow-y-auto"
                        onWheel={handleModalScroll}
                        onTouchMove={handleModalScroll}
                    >
                        <div
                            className="text-lg leading-relaxed space-y-6"
                            dangerouslySetInnerHTML={{
                                __html: card.detailedContent
                                    .replace(/<h3>/g, '<h3 class="text-2xl font-bold text-blue-600 mb-3">')
                                    .replace(/<p>/g, '<p class="text-gray-700 leading-relaxed mb-4">')
                                    .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 text-gray-700 mb-4">')
                                    .replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 text-gray-700 mb-4">')
                                    .replace(/<li>/g, '<li class="mb-1">')
                                    .replace(/<strong>/g, '<strong class="text-gray-800 font-semibold">')
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const renderCards = (cards) => {
        return (
            <div className="space-y-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {cards.slice(0, 2).map((card, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedCard(card)}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative h-80 border border-gray-200"
                        >
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-black/90 text-white px-4 py-2 rounded-full text-sm font-normal tracking-wide uppercase">
                                    {card.title}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4 transition-opacity duration-300">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                            Essential Travel Planning
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Comprehensive guides to ensure a smooth and comfortable journey
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cards.slice(2, 5).map((card, index) => (
                            <div
                                key={index + 2}
                                onClick={() => setSelectedCard(card)}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative h-80 border border-gray-200"
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-black/90 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                                        {card.title}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 transition-opacity duration-300">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {cards.slice(5, 7).map((card, index) => (
                        <div
                            key={index + 5}
                            onClick={() => setSelectedCard(card)}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative h-80 border border-gray-200"
                        >
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-black/90 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                                    {card.title}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4 transition-opacity duration-300">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <HeroSection />

            {/* Content Section */}
            <div className="py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                            Complete <span className="text-blue-600">Travel</span> Guide
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
                            Essential travel information, preparation tips, and journey planning for your spiritual pilgrimage
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="animate-fade-in">
                            {renderCards(travelCards)}
                            <Modal card={selectedCard} onClose={() => setSelectedCard(null)} />
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-500 text-sm">
                            May your journey be safe, comfortable, and spiritually rewarding
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TravelPage