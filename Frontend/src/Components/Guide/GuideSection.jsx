import React, { useState } from 'react'

function GuideSection() {
    const [activeSection, setActiveSection] = useState('umrah')

    const umrahCards = [
        {
            title: "UMRAH: INTRODUCTION",
            description: "Umrah is a pilgrimage to Mecca that can be performed at any time of the year, unlike Hajj which has specific dates.",
            image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop"
        },
        {
            title: "HOW TO PERFORM UMRAH",
            description: "Follow the prescribed steps in order: Enter Ihram, perform Tawaf, perform Sa'i, and complete with Halq or Taqsir.",
            image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop"
        },
        {
            title: "TAWAF",
            description: "Circumambulate the Kaaba seven times in a counter-clockwise direction, starting from the Black Stone.",
            image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&h=600&fit=crop"
        },
        {
            title: "SA'I",
            description: "Walk seven times between the hills of Safa and Marwah, commemorating Hajar's search for water.",
            image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop"
        },
        {
            title: "HALQ & TAQSIR",
            description: "Men either shave their head (Halq) or trim their hair (Taqsir). Women trim a fingertip length of hair.",
            image: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?w=800&h=600&fit=crop"
        },
        {
            title: "IHRAM",
            description: "Enter the sacred state by wearing specific garments and making intention at the Miqat boundary.",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
        },
        {
            title: "VIOLATIONS & PENALTIES",
            description: "Certain actions are prohibited in Ihram. Violations may require expiation through sacrifice or fasting.",
            image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=600&fit=crop"
        }
    ]

    const hajjCards = [
        {
            title: "HAJJ: INTRODUCTION",
            description: "Hajj is the annual pilgrimage and one of the five pillars of Islam, obligatory for those who are able.",
            image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop"
        },
        {
            title: "HOW TO PERFORM HAJJ",
            description: "Hajj involves multiple rituals over several days during Dhul-Hijjah, following the footsteps of Prophet Ibrahim.",
            image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop"
        },
        {
            title: "DAY OF ARAFAT",
            description: "Stand in prayer and supplication at Mount Arafat on the 9th of Dhul-Hijjah, the most important day of Hajj.",
            image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&h=600&fit=crop"
        },
        {
            title: "STONING THE JAMARAT",
            description: "Throw pebbles at three pillars representing Satan, symbolizing the rejection of evil and temptation.",
            image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop"
        },
        {
            title: "SACRIFICE (QURBANI)",
            description: "Sacrifice an animal commemorating Prophet Ibrahim's willingness to sacrifice his son for Allah.",
            image: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=800&h=600&fit=crop"
        },
        {
            title: "IHRAM REQUIREMENTS",
            description: "Enter Ihram before crossing the Miqat, wearing special garments and abstaining from certain activities.",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
        },
        {
            title: "VIOLATIONS & PENALTIES",
            description: "Breaking Ihram restrictions requires compensation through sacrifice, charity, or fasting depending on severity.",
            image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=600&fit=crop"
        }
    ]

    const journeyCards = [
        {
            title: "PASSPORT & DOCUMENTS",
            description: "Ensure your passport is valid for at least 6 months. Obtain necessary visa and keep copies of all documents.",
            image: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&h=600&fit=crop"
        },
        {
            title: "VISA APPLICATION",
            description: "Apply for Umrah or Hajj visa through authorized travel agents. Submit required documents and photographs.",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
        },
        {
            title: "VACCINATIONS",
            description: "Complete required vaccinations (Meningitis, COVID-19, etc.) and carry vaccination certificates.",
            image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop"
        },
        {
            title: "FLIGHT & ACCOMMODATION",
            description: "Book flights and hotels near Haram in advance. Consider proximity to the holy sites for convenience.",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
        },
        {
            title: "PACKING ESSENTIALS",
            description: "Pack Ihram garments, modest clothing, comfortable footwear, medications, and personal care items.",
            image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop"
        },
        {
            title: "MONEY & CURRENCY",
            description: "Exchange currency to Saudi Riyal. Carry credit cards and inform your bank of travel plans.",
            image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&h=600&fit=crop"
        },
        {
            title: "IMMIGRATION & CUSTOMS",
            description: "Complete immigration forms, declare goods at customs, and follow Saudi Arabia's entry regulations.",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
        },
        {
            title: "LEARN BASIC ARABIC",
            description: "Familiarize yourself with essential Arabic phrases for prayers, directions, and basic communication.",
            image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=600&fit=crop"
        }
    ]

    const renderCards = (cards) => {
        return (
            <div className="space-y-6">
                {/* Row 1: Cards 0-1 (2 cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cards.slice(0, 2).map((card, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-lg leading-tight">
                                        {card.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Row 2: Cards 2-4 (3 cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.slice(2, 5).map((card, index) => (
                        <div
                            key={index + 2}
                            className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-lg leading-tight">
                                        {card.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Row 3: Cards 5-6 (2 cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cards.slice(5, 7).map((card, index) => (
                        <div
                            key={index + 5}
                            className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-lg leading-tight">
                                        {card.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Row 4: Card 7 if it exists (1 card centered for journey prep) */}
                {cards.length > 7 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={cards[7].image}
                                    alt={cards[7].title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-lg leading-tight">
                                        {cards[7].title}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {cards[7].description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const renderContent = () => {
        const content = {
            umrah: {
                title: "Rites of Umrah",
                cards: umrahCards,
                gradient: "from-emerald-600 to-teal-600"
            },
            hajj: {
                title: "Rites of Hajj",
                cards: hajjCards,
                gradient: "from-purple-600 to-indigo-600"
            },
            journey: {
                title: "Journey Preparation",
                cards: journeyCards,
                gradient: "from-orange-600 to-amber-600"
            }
        }

        const current = content[activeSection]

        return (
            <div className="animate-fade-in">
                <div className="mb-8 text-center">
                    <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent mb-4`}>
                        {current.title}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {activeSection === 'umrah' && "Learn the steps and significance of performing Umrah, the lesser pilgrimage that can be undertaken anytime."}
                        {activeSection === 'hajj' && "Discover the rituals and requirements of Hajj, one of the five pillars of Islam performed during specific dates."}
                        {activeSection === 'journey' && "Prepare for your spiritual journey with essential travel tips, documentation, and practical advice."}
                    </p>
                </div>
                {renderCards(current.cards)}
            </div>
        )
    }

    const getButtonClasses = (section) => {
        const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50"

        const variants = {
            umrah: {
                active: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl scale-105 focus:ring-emerald-200",
                inactive: "bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-emerald-200 hover:border-emerald-300 focus:ring-emerald-100"
            },
            hajj: {
                active: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl scale-105 focus:ring-purple-200",
                inactive: "bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-purple-200 hover:border-purple-300 focus:ring-purple-100"
            },
            journey: {
                active: "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xl scale-105 focus:ring-orange-200",
                inactive: "bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-orange-200 hover:border-orange-300 focus:ring-orange-100"
            }
        }

        return `${baseClasses} ${activeSection === section ? variants[section].active : variants[section].inactive}`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                        Sacred <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Pilgrimage</span> Guide
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
                        Your comprehensive companion for the spiritual journey of a lifetime
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    <button
                        onClick={() => setActiveSection('umrah')}
                        className={getButtonClasses('umrah')}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🕌</span>
                            <span>Umrah Guide</span>
                        </div>
                    </button>

                    <button
                        onClick={() => setActiveSection('hajj')}
                        className={getButtonClasses('hajj')}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🌙</span>
                            <span>Hajj Guide</span>
                        </div>
                    </button>

                    <button
                        onClick={() => setActiveSection('journey')}
                        className={getButtonClasses('journey')}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xl">✈️</span>
                            <span>Journey Prep</span>
                        </div>
                    </button>
                </div>

                {/* Content Section */}
                <div className="mt-8">
                    {renderContent()}
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        May your pilgrimage be accepted and your journey blessed
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GuideSection