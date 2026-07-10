// pages/TravelGuidePage.js
import React, { useState, useEffect, useRef } from 'react'
import { Map, Navigation, Globe } from "lucide-react";
import gsap from "gsap";
import { useScrollLock } from '../../Hooks/useScrollLock'
import travelPreparationImage from "../../assets/Images/Guide/Travel Guide/travel-preparation.jpg";
import flightTransportImage from "../../assets/Images/Guide/Travel Guide/flight-transport.jpg";
import accommodationGuideImage from "../../assets/Images/Guide/Travel Guide/accommodation-guide.jpg";
import healthSafetyImage from "../../assets/Images/Guide/Travel Guide/health-safety.jpg";
import communicationConnectivityImage from "../../assets/Images/Guide/Travel Guide/communication-connectivity.jpg";
import culturalEtiquetteImage from "../../assets/Images/Guide/Travel Guide/cultural-etiquette.jpg";
import budgetPlanningImage from "../../assets/Images/Guide/Travel Guide/budget-planning.jpg";

function TravelPage() {
    const [selectedCard, setSelectedCard] = useState(null)
    useScrollLock(Boolean(selectedCard))

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
            <p>Good preparation starts weeks — ideally months — before you travel. Missing or incorrect paperwork is one of the most common, and most avoidable, causes of stress at the airport, so double-check everything on this list well ahead of time.</p>
            <ul>
                <li><strong>Passport:</strong> Must be valid for at least 6 months from your travel date, with at least two blank pages for visa stamps. If it's close to expiring, renew it before applying for your visa — a rejected application because of an expiring passport can delay your whole trip.</li>
                <li><strong>Visa:</strong> Apply through an authorized travel agent or the official Nusuk platform well in advance. Umrah visas are usually tied to your travel dates and flight, so avoid last-minute itinerary changes once it's issued.</li>
                <li><strong>Vaccination certificates:</strong> Saudi Arabia requires proof of certain vaccinations for pilgrims (commonly meningitis/ACWY, and seasonally influenza). Requirements can change, so confirm the latest guidance with your travel agent or the Saudi embassy close to your departure date.</li>
                <li><strong>Travel insurance:</strong> Comprehensive coverage is strongly recommended, ideally including medical treatment, trip cancellation, and lost luggage. Many Umrah packages already include this — it's worth confirming exactly what's covered.</li>
                <li><strong>Photocopies and digital backups:</strong> Keep photocopies of your passport, visa, and insurance in a separate bag from the originals, and save digital scans on your phone or email as a backup in case anything is lost.</li>
            </ul>

            <h3>Packing Essentials</h3>
            <ul>
                <li><strong>Comfortable walking shoes:</strong> You will walk far more than you expect — inside the Haram, between your hotel and the mosque, and during Sa'i. Choose shoes that are already broken in, not brand new ones.</li>
                <li><strong>Modest clothing:</strong> Abayas for women, thobes for men, plus a few changes of breathable clothing suited to a hot, dry climate.</li>
                <li><strong>Spare Ihram garments (for Umrah):</strong> Pack at least one extra set, since these can get soiled or torn during travel.</li>
                <li><strong>Personal hygiene items:</strong> Unscented soap and toiletries are useful, since scented products are restricted while in Ihram.</li>
                <li><strong>Medications and a small first-aid kit:</strong> Bring enough prescription medication for the whole trip plus a little extra in case of delays, along with basics like pain relievers, rehydration salts, and blister plasters.</li>
                <li><strong>Prayer mat and a pocket-sized Quran:</strong> Useful for prayers outside the mosque, such as at the airport or hotel.</li>
                <li><strong>Power adapters and chargers:</strong> Saudi Arabia generally uses the same three-pin (Type G) sockets as the UK, but check this against your home country's plug type.</li>
                <li><strong>A small daypack:</strong> Handy for carrying water, snacks, and essentials during long days at the Haram.</li>
            </ul>

            <h3>Financial Preparation</h3>
            <p>Carry a mix of sufficient Saudi Riyals in cash and at least one internationally accepted credit or debit card, since card acceptance varies between smaller shops and larger establishments. Keep your emergency funds physically separate from your everyday spending money — for example, some cash in your hotel safe and some on your person — so a single lost wallet doesn't leave you stranded. It's also wise to inform your bank of your travel dates in advance, so your card isn't unexpectedly blocked for suspicious activity while you're abroad.</p>
        `,
            image: travelPreparationImage
        },
        {
            title: "FLIGHT & TRANSPORT",
            description: "Booking flights, airport procedures, and transportation options in Saudi Arabia.",
            detailedContent: `
            <h3>Flight Booking Tips</h3>
            <ul>
                <li>Book direct flights to Jeddah (King Abdulaziz International Airport) or Madinah when possible, to minimize the fatigue of long layovers before your pilgrimage even begins.</li>
                <li>Consider airlines with good pilgrim services and experience — many major carriers offer extra baggage allowances or dedicated check-in counters during Umrah and Hajj season.</li>
                <li>Book roughly 2–3 months in advance for better prices; fares rise sharply closer to Ramadan and other peak pilgrimage periods, so early booking can save a significant amount.</li>
                <li>Check baggage allowances carefully, including any rules on Zamzam water, which many airlines allow as extra checked baggage (often around 5–10 kg) on the return leg — this varies by airline, so confirm before you fly.</li>
                <li>If your itinerary includes both Makkah and Madinah, consider flying into one city and out of the other to avoid unnecessary backtracking.</li>
            </ul>

            <h3>Airport Procedures</h3>
            <ol>
                <li>Arrive at the airport 3–4 hours before departure for international flights — pilgrim season airports can be extremely busy, and check-in queues move slowly.</li>
                <li>Complete immigration and customs formalities, including biometric registration (fingerprints and photograph) on arrival, which is standard for all pilgrims entering Saudi Arabia.</li>
                <li>Keep all documents — passport, visa printout, vaccination certificate, and boarding pass — easily accessible in one folder or pouch rather than buried in your luggage.</li>
                <li>Follow any current health protocols (such as mask requirements or health declarations), which can change from season to season, so check shortly before departure.</li>
            </ol>

            <h3>Transportation in Saudi Arabia</h3>
            <ul>
                <li><strong>Airport to Hotel:</strong> Pre-booked transfers arranged through your travel agent are the most stress-free option after a long flight; licensed airport taxis are also available, but agree on the fare (or confirm the meter is used) before starting the journey.</li>
                <li><strong>Between Cities:</strong> The Haramain High-Speed Railway connects Makkah, Madinah, Jeddah, and King Abdullah Economic City in a few comfortable hours — often faster and more relaxing than a long bus journey. Domestic flights and intercity buses are also widely available.</li>
                <li><strong>Local Travel:</strong> Metered taxis, ride-sharing apps (Uber and Careem are both widely used), and many hotels' own shuttle buses to the Haram are all convenient for getting around within a city.</li>
                <li><strong>Walking:</strong> If your hotel is within the immediate vicinity of the Haram, walking is often faster than any vehicle during peak prayer times, when the surrounding roads become extremely congested.</li>
            </ul>
        `,
            image: flightTransportImage
        },
        {
            title: "ACCOMMODATION GUIDE",
            description: "Choosing the right hotels and understanding accommodation options near holy sites.",
            detailedContent: `
            <h3>Hotel Selection Criteria</h3>
            <ul>
                <li><strong>Proximity to the Haram:</strong> Walking distance is highly preferred, both for convenience and because it lets you reach the mosque quickly for all five daily prayers, not just the main ones.</li>
                <li><strong>Room amenities and comfort:</strong> After long days of worship, a comfortable, clean room genuinely makes a difference — check for reliable air conditioning, good bedding, and a functioning bathroom.</li>
                <li><strong>Hotel services and facilities:</strong> Look for amenities like a reliable breakfast, laundry service, and 24-hour reception, especially useful for older or first-time travelers.</li>
                <li><strong>Group packages vs individual bookings:</strong> Group packages (booked through a travel agent alongside your flights) are often better value and simpler to manage, while individual bookings give you more flexibility to choose your exact hotel and dates.</li>
            </ul>

            <h3>Makkah Accommodation</h3>
            <p>Hotels near Masjid al-Haram — particularly those in the Clock Tower complex and surrounding towers — offer unmatched convenience, letting you return to your room for rest between prayers. These rooms book up quickly and are typically the most expensive, so reserve as early as possible, especially during Ramadan and peak Umrah season. Hotels a short taxi or shuttle ride away offer a more budget-friendly alternative without sacrificing too much convenience.</p>

            <h3>Madinah Accommodation</h3>
            <p>Hotels surrounding Masjid an-Nabawi (the Prophet's Mosque) provide easy access for daily prayers and for visiting significant nearby sites, such as Jannat al-Baqi. Madinah is generally a smaller, more walkable city than Makkah, so even hotels a few streets back from the mosque are usually still an easy walk away, often at a noticeably lower price than a room with a direct view of the Haram.</p>

            <h3>Booking Tips</h3>
            <ul>
                <li>Book through reputable, licensed travel agents who specialize in Umrah and Hajj packages, rather than unfamiliar third-party websites.</li>
                <li>Read recent reviews specifically from other pilgrims, since their priorities (proximity to the Haram, prayer-time noise, crowd levels) differ from a typical tourist's.</li>
                <li>Confirm the cancellation and refund policy in writing before paying, especially for bookings made many months in advance.</li>
                <li>Verify the actual walking distance from the Haram yourself using a map, rather than relying on a hotel's own marketing description of "a few minutes away."</li>
                <li>If travelling with elderly or disabled family members, ask specifically about elevator access, ground-floor rooms, and accessible bathrooms.</li>
            </ul>
        `,
            image: accommodationGuideImage
        },
        {
            title: "HEALTH & SAFETY",
            description: "Staying healthy during your journey and important safety precautions to follow.",
            detailedContent: `
            <h3>Health Precautions</h3>
            <ul>
                <li><strong>Stay hydrated:</strong> The desert climate is deceptively dehydrating, even when you don't feel especially hot. Drink water (or Zamzam, freely available throughout the Haram) regularly rather than waiting until you feel thirsty.</li>
                <li><strong>Sun protection:</strong> Use sunscreen and wear a hat or use an umbrella during midday hours, particularly if travelling in the warmer months.</li>
                <li><strong>Carry your medications:</strong> Keep prescription medicines in their original, labeled packaging, along with a copy of the prescription, to avoid any issues at customs.</li>
                <li><strong>Know your nearest medical facilities:</strong> Both Makkah and Madinah have hospitals and clinics well-equipped for pilgrims, including facilities inside the Haram complex for minor issues — ask your hotel reception as soon as you check in.</li>
                <li><strong>Pace yourself:</strong> Especially for elderly pilgrims or those with health conditions, it's fine to rest between rituals rather than pushing through exhaustion.</li>
            </ul>

            <h3>Safety Measures</h3>
            <ul>
                <li><strong>Keep valuables in your hotel safe</strong> rather than carrying passports, extra cash, or jewelry to the Haram, where large crowds make pickpocketing more likely.</li>
                <li><strong>Carry your hotel's contact card</strong> (name, address, and phone number in both English and Arabic) at all times, so you can find your way back or ask for directions if separated from your group.</li>
                <li><strong>Use a money belt or a bag worn across the body</strong> for essential documents and cash, rather than a back pocket or loose tote bag.</li>
                <li><strong>Save emergency numbers</strong> in your phone before you travel: Saudi Arabia's general emergency number is 911 in Makkah and Madinah (999 in other regions), alongside your embassy's local contact number.</li>
                <li><strong>Agree on a meeting point</strong> with your family or group in case anyone gets separated in the crowds — a specific, well-known landmark works better than a vague "meet near the entrance."</li>
            </ul>

            <h3>Crowd Management</h3>
            <p>During peak times — Ramadan, Hajj season, and Friday prayers especially — the Haram can become extremely crowded. Stay patient, move slowly and deliberately rather than pushing through gaps, and always follow the instructions of security personnel, who are specifically trained to manage pilgrim safety during these periods. If you feel unsafe or trapped in a crowd, try to move gradually toward the edges rather than against the flow of people.</p>

            <h3>Food Safety</h3>
            <p>Eat at reputable, busy restaurants — a steady stream of local customers is usually a good sign of fresh food and proper hygiene. Drink bottled or filtered water rather than tap water, and be cautious with street food and buffet items that may have been sitting out for a long time, especially in hot weather. If you have specific dietary needs or allergies, learn a few key phrases in Arabic (or keep them written down) to communicate clearly with restaurant staff.</p>
        `,
            image: healthSafetyImage
        },
        {
            title: "COMMUNICATION & CONNECTIVITY",
            description: "Staying connected with family and accessing important information during your trip.",
            detailedContent: `
            <h3>Mobile Connectivity</h3>
            <ul>
                <li>Get a local Saudi SIM card at the airport on arrival — providers like STC, Mobily, and Zain all offer pilgrim-friendly data packages, and airport kiosks make this an easy first stop.</li>
                <li>Alternatively, check whether your home network offers an affordable international roaming plan for Saudi Arabia, which can be more convenient (though usually pricier) than switching SIM cards.</li>
                <li>Download any essential apps and offline maps before you travel, while you still have reliable home Wi-Fi, so you're not relying on the airport network the moment you land.</li>
                <li>Keep your old SIM card safe rather than discarding it, so you can easily switch back to your home number once you return.</li>
            </ul>

            <h3>Essential Apps</h3>
            <ul>
                <li><strong>Nusuk:</strong> The official Saudi government app for Hajj and Umrah services, covering visas, permits for entering the Haram at certain times, and general pilgrim guidance.</li>
                <li><strong>Google Translate:</strong> Extremely useful for reading signs and menus — its camera translation feature works well on printed Arabic text.</li>
                <li><strong>Maps:</strong> Helpful for navigating both cities; download the Makkah and Madinah areas for offline use in case of patchy signal inside crowded areas.</li>
                <li><strong>Weather:</strong> Useful for checking expected temperatures, since conditions can swing from very hot afternoons to noticeably cooler evenings.</li>
            </ul>

            <h3>Internet Access</h3>
            <p>Most hotels offer free Wi-Fi, though speed and reliability can vary, especially during peak pilgrim season when many guests are connected at once. Public Wi-Fi is also commonly available in shopping malls, airports, and larger restaurants. A local SIM card with a data plan is generally the most reliable way to stay connected throughout the day, particularly while inside the Haram itself.</p>

            <h3>Emergency Contacts</h3>
            <p>Before you travel, write down (and also save digitally) a short list of essential numbers: your home country's embassy or consulate in Saudi Arabia, your travel agent's 24-hour contact line, your hotel's front desk, and the local emergency services number (911 in Makkah and Madinah, 999 elsewhere in the Kingdom). Share this list with a family member back home too, so someone outside the country also knows how to reach the right people if needed.</p>
        `,
            image: communicationConnectivityImage
        },
        {
            title: "CULTURAL ETIQUETTE",
            description: "Understanding local customs, traditions, and respectful behavior in Saudi Arabia.",
            detailedContent: `
            <h3>Dress Code</h3>
            <ul>
                <li><strong>Women:</strong> An abaya (a loose, full-length outer garment) is expected in public places, along with a headscarf; this is generally not required inside your own hotel room.</li>
                <li><strong>Men:</strong> Modest clothing is expected — shoulders and knees covered — and shorts should generally be avoided in public areas, especially near the Haram.</li>
                <li>Beyond specific rules, dressing modestly and simply, avoiding flashy or overly casual clothing, is a sign of respect for the spiritual purpose of your visit and for local customs.</li>
                <li>Comfortable, breathable fabrics are worth prioritizing over strict fashion, given the heat and the amount of walking involved.</li>
            </ul>

            <h3>Social Etiquette</h3>
            <ul>
                <li>Greet others with "As-salamu alaykum" ("Peace be upon you") — a warm, universally understood greeting among Muslims that's always well received.</li>
                <li>Respect prayer times: many shops, restaurants, and businesses briefly close during each of the five daily prayers, so plan errands and meals around these short pauses rather than being caught by surprise.</li>
                <li>Always ask permission before taking photos of individuals, particularly women, as a matter of courtesy and cultural respect.</li>
                <li>Be patient in queues and crowded spaces — pushing or cutting in line is considered particularly disrespectful in and around the holy sites.</li>
                <li>Public displays of affection between couples are culturally frowned upon and best avoided.</li>
            </ul>

            <h3>Religious Sensitivity</h3>
            <p>Show respect for all Islamic traditions and holy sites, even practices that may differ from what you're used to at home — Muslims from many different cultures and schools of thought pray side by side here. Always follow the instructions of mosque staff and security personnel at religious and historical sites, who are there to help preserve both safety and the sanctity of these locations. Lowering your voice, avoiding unnecessary phone use, and remaining mindful of others in prayer are all simple but meaningful signs of respect.</p>

            <h3>Shopping & Bargaining</h3>
            <p>Bargaining is a normal and expected part of shopping in traditional souks (markets), though fixed-price shops and larger malls generally do not negotiate. Approach bargaining as a friendly, good-natured exchange rather than a confrontation — a smile and a little patience go a long way, and vendors will often start higher than their real minimum price, expecting some back-and-forth. It's perfectly fine to walk away if a price doesn't feel right; often, this alone will prompt a better offer.</p>
        `,
            image: culturalEtiquetteImage
        },
        {
            title: "BUDGET PLANNING",
            description: "Managing expenses and creating a realistic budget for your spiritual journey.",
            detailedContent: `
            <h3>Major Expense Categories</h3>
            <p>Every pilgrim's budget looks a little different, but most trips break down roughly like this:</p>
            <ul>
                <li><strong>Flights:</strong> Typically 25-35% of your total budget — this share is usually largest for solo travelers and shrinks slightly for larger groups who can access group fares.</li>
                <li><strong>Accommodation:</strong> Usually the biggest single cost, at around 30-40% of your total budget, heavily influenced by how close your hotel is to the Haram.</li>
                <li><strong>Food & Transportation:</strong> Roughly 15-20% of your budget, covering daily meals, local transport, and any intercity travel between Makkah and Madinah.</li>
                <li><strong>Shopping & Miscellaneous:</strong> Around 10-15%, covering souvenirs, gifts for family back home, and day-to-day incidentals.</li>
            </ul>

            <h3>Cost-Saving Tips</h3>
            <ul>
                <li>Travel during off-peak seasons (outside Ramadan and the months immediately surrounding Hajj) for noticeably lower flight and hotel prices.</li>
                <li>Book package deals through established travel agents, who can often secure better group rates on flights and hotels than booking each piece separately.</li>
                <li>Share accommodation with family or friends where possible — a family room is usually cheaper per person than several individual rooms.</li>
                <li>Use public transportation, such as the Haramain High-Speed Railway or local buses, instead of private taxis for longer trips between cities.</li>
                <li>Set a daily spending guideline for food and extras, so shopping and dining don't quietly consume more of your budget than planned.</li>
            </ul>

            <h3>Emergency Fund</h3>
            <p>Always set aside 10-15% of your total budget as an emergency fund, kept separate from your day-to-day spending money. This covers the unexpected — a missed connection, a medical need, an extra night's accommodation, or simply the peace of mind of knowing you won't be stuck if plans change. It's best kept as a mix of cash and an accessible card, rather than all in one form or one place.</p>

            <h3>Currency Exchange</h3>
            <p>Exchange currency at authorized exchange centers in your home country or in Saudi Arabia, rather than at airport kiosks, which typically offer noticeably worse rates. Banks and licensed money exchangers in city centers usually offer the most competitive rates. It's a good idea to arrive with a small amount of Saudi Riyals already exchanged for your first day's expenses — taxis, snacks, tips — before you have time to find a good exchange counter.</p>
        `,
            image: budgetPlanningImage
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
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden overscroll-none"
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