// pages/UmrahPage.js
import React, { useState, useEffect, useRef } from 'react'

function UmrahPage() {
    const [selectedCard, setSelectedCard] = useState(null)
    const scrollPositionRef = useRef(0)

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
        const preventScroll = (e) => {
            if (selectedCard) {
                e.preventDefault()
                e.stopPropagation()
                return false
            }
        }

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
                        <h2 className="text-3xl md:text-4xl font-bold text-amber-600">
                            Rites of Umrah
                        </h2>
                        <p className="text-gray-600 mt-2">
                            The essential rituals that complete your Umrah pilgrimage
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
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                        Sacred <span className="text-amber-600">Umrah</span> Guide
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
                        Learn the steps and significance of performing Umrah, the lesser pilgrimage that can be undertaken anytime.
                    </p>
                </div>

                <div className="mt-8">
                    <div className="animate-fade-in">
                        {renderCards(umrahCards)}
                        <Modal card={selectedCard} onClose={() => setSelectedCard(null)} />
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        May your pilgrimage be accepted and your journey blessed
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UmrahPage