import React, { useState, useEffect, useRef } from 'react'

function GuideSection() {
    const [activeSection, setActiveSection] = useState('umrah')
    const [selectedCard, setSelectedCard] = useState(null)
    const scrollPositionRef = useRef(0)

    // Disable scrolling when modal is open and preserve scroll position
    useEffect(() => {
        if (selectedCard) {
            // Save current scroll position
            scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop

            // Disable scrolling
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollPositionRef.current}px`
            document.body.style.width = '100%'
        } else {
            // Re-enable scrolling and restore position
            document.body.style.overflow = 'unset'
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''

            // Restore scroll position
            window.scrollTo(0, scrollPositionRef.current)
        }

        return () => {
            // Cleanup: ensure scrolling is re-enabled
            document.body.style.overflow = 'unset'
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
        }
    }, [selectedCard])

    // Prevent scroll on modal background
    useEffect(() => {
        const preventScroll = (e) => {
            if (selectedCard) {
                e.preventDefault()
                e.stopPropagation()
                return false
            }
        }

        // Add event listeners with passive: false to allow preventDefault
        document.addEventListener('wheel', preventScroll, { passive: false })
        document.addEventListener('touchmove', preventScroll, { passive: false })
        document.addEventListener('scroll', preventScroll, { passive: false })

        return () => {
            document.removeEventListener('wheel', preventScroll)
            document.removeEventListener('touchmove', preventScroll)
            document.removeEventListener('scroll', preventScroll)
        }
    }, [selectedCard])

    const umrahCards = [
        {
            title: "UMRAH: INTRODUCTION",
            description: "Umrah is a pilgrimage to Mecca that can be performed at any time of the year, unlike Hajj which has specific dates.",
            detailedContent: `
                <h3>What is Umrah?</h3>
                <p>Umrah, often called the 'lesser pilgrimage', is a sacred journey to Makkah that Muslims can perform at any time of the year. Unlike Hajj, it is not obligatory but highly recommended.</p>
                
                <h3>Significance</h3>
                <ul>
                    <li>Spiritual purification and renewal</li>
                    <li>Forgiveness of sins</li>
                    <li>Following the tradition of Prophet Muhammad (PBUH)</li>
                    <li>Strengthening faith and connection with Allah</li>
                </ul>
                
                <h3>Key Facts</h3>
                <p>Umrah can be completed in a few hours and consists of four main rituals: Ihram, Tawaf, Sa'i, and Halq/Taqsir.</p>
            `,
            image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop"
        },
        {                                                                          
            title: "HOW TO PERFORM UMRAH",
            description: "Follow the prescribed steps in order: Enter Ihram, perform Tawaf, perform Sa'i, and complete with Halq or Taqsir.",
            detailedContent: `
                <h3>Step-by-Step Guide</h3>
                <ol>
                    <li><strong>Enter Ihram:</strong> Purify yourself and wear the prescribed garments at the Miqat</li>
                    <li><strong>Make Niyyah:</strong> Sincerely intend to perform Umrah for Allah's sake alone</li>
                    <li><strong>Recite Talbiyah:</strong> Continuously recite the Talbiyah prayer</li>
                    <li><strong>Perform Tawaf:</strong> Circumambulate the Kaaba seven times</li>
                    <li><strong>Pray at Maqam Ibrahim:</strong> Offer two rak'ahs behind Maqam Ibrahim</li>
                    <li><strong>Perform Sa'i:</strong> Walk seven times between Safa and Marwah</li>
                    <li><strong>Shave or Trim Hair:</strong> Complete Umrah by cutting hair</li>
                </ol>
                
                <h3>Important Notes</h3>
                <p>Maintain your Ihram until all rituals are completed. Women can wear any modest clothing that covers the body except face and hands.</p>
            `,
            image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop"
        },
        {
            title: "TAWAF",
            description: "Circumambulate the Kaaba seven times in a counter-clockwise direction, starting from the Black Stone.",
            detailedContent: `
                <h3>The Ritual of Tawaf</h3>
                <p>Tawaf involves circling the Kaaba seven times in a counter-clockwise direction, beginning and ending at the Black Stone (Hajar al-Aswad).</p>
                
                <h3>Steps for Tawaf</h3>
                <ol>
                    <li>Start at the Black Stone - kiss it, touch it, or gesture towards it</li>
                    <li>Circle the Kaaba keeping it to your left</li>
                    <li>Recite prayers and supplications during each circuit</li>
                    <li>Complete seven circuits</li>
                    <li>Offer two rak'ahs at Maqam Ibrahim</li>
                    <li>Drink Zamzam water</li>
                </ol>
                
                <h3>Prayers During Tawaf</h3>
                <p>There are no fixed prayers for Tawaf. You may recite any Quranic verses, make personal supplications, or praise Allah.</p>
            `,
            image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&h=600&fit=crop"
        },
        {
            title: "SA'I",
            description: "Walk seven times between the hills of Safa and Marwah, commemorating Hajar's search for water.",
            detailedContent: `
                <h3>The Ritual of Sa'i</h3>
                <p>Sa'i commemorates Hajar's desperate search for water for her son Ismail between the hills of Safa and Marwah.</p>
                
                <h3>Procedure</h3>
                <ol>
                    <li>Start at Safa, facing the Kaaba and making supplications</li>
                    <li>Walk towards Marwah (one trip)</li>
                    <li>From Marwah back to Safa (second trip)</li>
                    <li>Complete seven such trips (ending at Marwah)</li>
                    <li>Men should run between the green lights, women walk normally</li>
                </ol>
                
                <h3>Historical Significance</h3>
                <p>This ritual remembers Hajar's faith and trust in Allah, which was rewarded with the miracle of Zamzam spring.</p>
                
                <h3>Supplications</h3>
                <p>Recite the same prayers that Prophet Muhammad (PBUH) recited during Sa'i, or make personal supplications.</p>
            `,
            image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop"
        },
        {
            title: "HALQ & TAQSIR",
            description: "Men either shave their head (Halq) or trim their hair (Taqsir). Women trim a fingertip length of hair.",
            detailedContent: `
                <h3>Completion of Umrah</h3>
                <p>Halq (shaving) or Taqsir (trimming) marks the completion of Umrah and the end of Ihram restrictions.</p>
                
                <h3>For Men</h3>
                <ul>
                    <li><strong>Halq:</strong> Shaving the entire head (preferred)</li>
                    <li><strong>Taqsir:</strong> Trimming at least one inch of hair from all over the head</li>
                    <li>Shaving is considered better as it was the practice of Prophet Muhammad (PBUH)</li>
                </ul>
                
                <h3>For Women</h3>
                <ul>
                    <li>Only Taqsir is permitted</li>
                    <li>Trim approximately the length of a fingertip from the end of hair</li>
                    <li>Do not shave or cut hair short like men</li>
                </ul>
                
                <h3>Significance</h3>
                <p>This act symbolizes humility before Allah and the shedding of worldly attachments.</p>
            `,
            image: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?w=800&h=600&fit=crop"
        },
        {
            title: "IHRAM",
            description: "Enter the sacred state by wearing specific garments and making intention at the Miqat boundary.",
            detailedContent: `
                <h3>The State of Ihram</h3>
                <p>Ihram is both the sacred state a pilgrim enters and the special garments worn during pilgrimage.</p>
                
                <h3>Ihram Clothing</h3>
                <p><strong>For Men:</strong> Two unstitched white cloths (izar and rida)</p>
                <p><strong>For Women:</strong> Any modest clothing covering entire body except face and hands</p>
                
                <h3>Prohibitions in Ihram</h3>
                <ul>
                    <li>Cutting hair or nails</li>
                    <li>Using perfumes</li>
                    <li>Hunting</li>
                    <li>Sexual relations</li>
                    <li>Arguing or fighting</li>
                    <li>Wearing stitched clothing (men)</li>
                    <li>Covering head (men) or face (women)</li>
                </ul>
                
                <h3>Entering Ihram</h3>
                <p>Perform ghusl, wear Ihram garments, pray two rak'ahs, and make the intention at the Miqat.</p>
            `,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
        },
        {
            title: "VIOLATIONS & PENALTIES",
            description: "Certain actions are prohibited in Ihram. Violations may require expiation through sacrifice or fasting.",
            detailedContent: `
                <h3>Types of Violations</h3>
                <p>Violations in Ihram are categorized based on their severity and required expiation (fidyah).</p>
                
                <h3>Major Violations</h3>
                <ul>
                    <li><strong>Sexual intercourse:</strong> Invalidates pilgrimage, requires completion and sacrifice</li>
                    <li><strong>Hunting:</strong> Requires equivalent sacrifice of domestic animal</li>
                </ul>
                
                <h3>Minor Violations</h3>
                <ul>
                    <li><strong>Cutting hair/nails:</strong> Charity required</li>
                    <li><strong>Using perfume:</strong> Charity required</li>
                    <li><strong>Covering head (men):</strong> Fasting or charity</li>
                    <li><strong>Wearing stitched clothes (men):</strong> Fasting or charity</li>
                </ul>
                
                <h3>Expiation Options</h3>
                <p>Depending on the violation: feeding poor people, sacrificing animal, or fasting specific days.</p>
            `,
            image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=600&fit=crop"
        }
    ]

    const hajjCards = [
        {
            title: "HAJJ: INTRODUCTION",
            description: "Hajj is the annual pilgrimage and one of the five pillars of Islam, obligatory for those who are able.",
            detailedContent: `
                <h3>The Fifth Pillar</h3>
                <p>Hajj is the fifth pillar of Islam and obligatory once in a lifetime for every Muslim who is physically and financially capable.</p>
                
                <h3>Historical Significance</h3>
                <p>Hajj commemorates the actions of Prophet Ibrahim (AS), his wife Hajar, and their son Ismail (AS). The rituals follow their footsteps and tests of faith.</p>
                
                <h3>Timing</h3>
                <p>Hajj occurs annually during the first ten days of Dhul-Hijjah, the twelfth month of the Islamic calendar.</p>
                
                <h3>Types of Hajj</h3>
                <ul>
                    <li><strong>Hajj al-Tamattu':</strong> Umrah followed by Hajj (most common)</li>
                    <li><strong>Hajj al-Qiran:</strong> Umrah and Hajj combined</li>
                    <li><strong>Hajj al-Ifrad:</strong> Hajj only</li>
                </ul>
            `,
            image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop"
        },
        {
            title: "HOW TO PERFORM HAJJ",
            description: "Hajj involves multiple rituals over several days during Dhul-Hijjah, following the footsteps of Prophet Ibrahim.",
            detailedContent: `<p>Detailed content for Hajj performance...</p>`,
            image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop"
        },
        {
            title: "DAY OF ARAFAT",
            description: "Stand in prayer and supplication at Mount Arafat on the 9th of Dhul-Hijjah, the most important day of Hajj.",
            detailedContent: `<p>Detailed content for Day of Arafat...</p>`,
            image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&h=600&fit=crop"
        },
        {
            title: "STONING THE JAMARAT",
            description: "Throw pebbles at three pillars representing Satan, symbolizing the rejection of evil and temptation.",
            detailedContent: `<p>Detailed content for Stoning the Jamarat...</p>`,
            image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop"
        },
        {
            title: "SACRIFICE (QURBANI)",
            description: "Sacrifice an animal commemorating Prophet Ibrahim's willingness to sacrifice his son for Allah.",
            detailedContent: `<p>Detailed content for Sacrifice...</p>`,
            image: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=800&h=600&fit=crop"
        },
        {
            title: "IHRAM REQUIREMENTS",
            description: "Enter Ihram before crossing the Miqat, wearing special garments and abstaining from certain activities.",
            detailedContent: `<p>Detailed content for Ihram Requirements...</p>`,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
        },
        {
            title: "VIOLATIONS & PENALTIES",
            description: "Breaking Ihram restrictions requires compensation through sacrifice, charity, or fasting depending on severity.",
            detailedContent: `<p>Detailed content for Violations & Penalties...</p>`,
            image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=600&fit=crop"
        }
    ]

    const journeyCards = [
        {
            title: "PASSPORT & DOCUMENTS",
            description: "Ensure your passport is valid for at least 6 months. Obtain necessary visa and keep copies of all documents.",
            detailedContent: `
                <h3>Essential Documents</h3>
                <ul>
                    <li>Passport valid for at least 6 months</li>
                    <li>Umrah/Hajj visa</li>
                    <li>Vaccination certificates</li>
                    <li>Hotel bookings confirmation</li>
                    <li>Flight tickets</li>
                    <li>Travel insurance</li>
                    <li>Emergency contact information</li>
                </ul>
                
                <h3>Important Tips</h3>
                <ul>
                    <li>Make multiple copies of all documents</li>
                    <li>Keep digital copies in cloud storage</li>
                    <li>Carry passport photos for emergencies</li>
                    <li>Inform your embassy about your travel</li>
                </ul>
                
                <h3>Visa Requirements</h3>
                <p>Apply through authorized travel agents. Women under 45 must be accompanied by mahram. Processing can take several weeks.</p>
            `,
            image: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&h=600&fit=crop"
        },
        {
            title: "VISA APPLICATION",
            description: "Apply for Umrah or Hajj visa through authorized travel agents. Submit required documents and photographs.",
            detailedContent: `<p>Detailed content for Visa Application...</p>`,
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
        },
        {
            title: "VACCINATIONS",
            description: "Complete required vaccinations (Meningitis, COVID-19, etc.) and carry vaccination certificates.",
            detailedContent: `<p>Detailed content for Vaccinations...</p>`,
            image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop"
        },
        {
            title: "FLIGHT & ACCOMMODATION",
            description: "Book flights and hotels near Haram in advance. Consider proximity to the holy sites for convenience.",
            detailedContent: `<p>Detailed content for Flight & Accommodation...</p>`,
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
        },
        {
            title: "PACKING ESSENTIALS",
            description: "Pack Ihram garments, modest clothing, comfortable footwear, medications, and personal care items.",
            detailedContent: `<p>Detailed content for Packing Essentials...</p>`,
            image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop"
        },
        {
            title: "MONEY & CURRENCY",
            description: "Exchange currency to Saudi Riyal. Carry credit cards and inform your bank of travel plans.",
            detailedContent: `<p>Detailed content for Money & Currency...</p>`,
            image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&h=600&fit=crop"
        },
        {
            title: "IMMIGRATION & CUSTOMS",
            description: "Complete immigration forms, declare goods at customs, and follow Saudi Arabia's entry regulations.",
            detailedContent: `<p>Detailed content for Immigration & Customs...</p>`,
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
        },
        {
            title: "LEARN BASIC ARABIC",
            description: "Familiarize yourself with essential Arabic phrases for prayers, directions, and basic communication.",
            detailedContent: `<p>Detailed content for Learn Basic Arabic...</p>`,
            image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=600&fit=crop"
        }
    ]

    const renderCards = (cards) => {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Row 1: Cards 0-1 (2 cards) */}
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

            {/* Row 2: Cards 2-4 (3 cards) with "Rites of Umrah" title */}
            <div className="relative">
                {activeSection === 'umrah' && (
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-amber-600">
                            Rites of Umrah
                        </h2>
                        <p className="text-gray-600 mt-2">
                            The essential rituals that complete your Umrah pilgrimage
                        </p>
                    </div>
                )}
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

            {/* Row 3: Cards 5-6 (2 cards) */}
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

            {/* Row 4: Card 7 if it exists */}
            {cards.length > 7 && (
                <div className="grid grid-cols-1 gap-8">
                    <div className="flex justify-center">
                        <div
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative h-80 w-full lg:w-2/3 border border-gray-200"
                            onClick={() => setSelectedCard(cards[7])}
                        >
                            <img
                                src={cards[7].image}
                                alt={cards[7].title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-black/90 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                                    {cards[7].title}
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
                    </div>
                </div>
            )}
        </div>
    )
}

    const Modal = ({ card, onClose }) => {
    if (!card) return null

    // Handle modal background click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    // Allow scrolling within modal content
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
                {/* Header with image */}
                <div className="relative h-48">
                    <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200 shadow-lg"
                    >
                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Title */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                            {card.title}
                        </h2>
                        <p className="text-white/90 text-sm mt-1 drop-shadow">
                            {card.description}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div
                    className="p-8 max-h-[calc(85vh-12rem)] overflow-y-auto"
                    onWheel={handleModalScroll}
                    onTouchMove={handleModalScroll}
                >
                    <div 
                        className="text-lg leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ 
                            __html: card.detailedContent
                                .replace(/<h3>/g, '<h3 class="text-2xl font-bold text-amber-600 mb-3">')
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
    const renderContent = () => {
        const content = {
            umrah: {
                title: "Umrah Guide",
                cards: umrahCards,
            },
            hajj: {
                title: "Hajj Guide",
                cards: hajjCards,
            },
            journey: {
                title: "Journey Preparation",
                cards: journeyCards,
            }
        }

        const current = content[activeSection]

        return (
            <div className="animate-fade-in">
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-4">
                        {current.title}
                    </h2>
                    <p className="text-gray-600">
                        {activeSection === 'umrah' && "Learn the steps and significance of performing Umrah, the lesser pilgrimage that can be undertaken anytime."}
                        {activeSection === 'hajj' && "Discover the rituals and requirements of Hajj, one of the five pillars of Islam performed during specific dates."}
                        {activeSection === 'journey' && "Prepare for your spiritual journey with essential travel tips, documentation, and practical advice."}
                    </p>
                </div>
                {renderCards(current.cards)}
                <Modal card={selectedCard} onClose={() => setSelectedCard(null)} />
            </div>
        )
    }

    const getButtonClasses = (section) => {
        const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50"

        const variants = {
            umrah: {
                active: "bg-amber-600 text-white shadow-xl scale-105 focus:ring-amber-200",
                inactive: "bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-amber-300 focus:ring-amber-100"
            },
            hajj: {
                active: "bg-amber-600 text-white shadow-xl scale-105 focus:ring-amber-200",
                inactive: "bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-amber-300 focus:ring-amber-100"
            },
            journey: {
                active: "bg-amber-600 text-white shadow-xl scale-105 focus:ring-amber-200",
                inactive: "bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-amber-300 focus:ring-amber-100"
            }
        }

        return `${baseClasses} ${activeSection === section ? variants[section].active : variants[section].inactive}`
    }

    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                        Sacred <span className="text-amber-600">Pilgrimage</span> Guide
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