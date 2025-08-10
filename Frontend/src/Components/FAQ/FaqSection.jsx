import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, HelpCircle, CreditCard, Plane, Shield, Users } from 'lucide-react';

export default function ExtractedFAQSection() {
    const [openFAQ, setOpenFAQ] = useState(null);
    const categoryRefs = useRef([]);
    const faqRefs = useRef({});
    const answerRefs = useRef({});

    const faqCategories = [
        {
            id: 'general',
            title: 'General Information',
            icon: HelpCircle,
            faqs: [
                {
                    question: 'What is the difference between Hajj and Umrah?',
                    answer:
                        'Hajj is the major pilgrimage performed during specific dates (8-12 Dhul Hijjah), while Umrah can be performed any time throughout the year. Hajj is one of the five pillars of Islam and mandatory for those who are physically and financially able, whereas Umrah is a recommended but not obligatory pilgrimage.'
                },
                {
                    question: 'How far in advance should I book my pilgrimage?',
                    answer:
                        'For Hajj, we recommend booking 6-12 months in advance due to limited quotas. For Umrah, booking 2-3 months ahead ensures better accommodation options and competitive prices, though last-minute bookings are often possible.'
                },
                {
                    question: 'What age restrictions apply for Hajj and Umrah?',
                    answer:
                        'There are no specific age restrictions, but children under 18 must be accompanied by a guardian. Elderly pilgrims should consult their doctors before traveling. We provide special assistance for senior citizens and families with young children.'
                }
            ]
        },
        {
            id: 'visa',
            title: 'Visa & Documentation',
            icon: Shield,
            faqs: [
                {
                    question: 'What documents do I need for Hajj/Umrah visa?',
                    answer:
                        'You need a valid passport (minimum 6 months validity), recent passport-sized photos, vaccination certificates (meningitis, COVID-19), marriage certificate (for couples), and birth certificates (for children). Our team will guide you through the complete documentation process.'
                },
                {
                    question: 'How long does visa processing take?',
                    answer:
                        'Typically 7-15 working days for Umrah visas and 15-30 days for Hajj visas. Our fast-track service can reduce this to 3-7 days for urgent cases with additional fees.'
                },
                {
                    question: 'What if my visa gets rejected?',
                    answer:
                        'We offer a 100% money-back guarantee on visa rejection. Our expert team has a 99.8% success rate, and we pre-screen all applications to minimize rejection risks.'
                }
            ]
        },
        {
            id: 'packages',
            title: 'Packages & Pricing',
            icon: CreditCard,
            faqs: [
                {
                    question: 'What is included in your packages?',
                    answer:
                        'Our packages include visa processing, flights, accommodation near Haram, local transportation, meals, guided tours, 24/7 support, and religious guidance. Specific inclusions vary by package tier (Economy, Standard, Premium, VIP).'
                },
                {
                    question: 'Do you offer payment plans?',
                    answer:
                        'Yes, we offer flexible payment options including installments over 6-12 months with 0% interest. You can pay via bank transfer, debit/credit cards, or visit our office for cash payments.'
                },
                {
                    question: 'Can I customize my package?',
                    answer:
                        'Absolutely! We offer customizable packages to suit your preferences for accommodation level, flight timings, group size, and additional services like private transportation or extended stays.'
                }
            ]
        },
        {
            id: 'travel',
            title: 'Travel & Accommodation',
            icon: Plane,
            faqs: [
                {
                    question: 'How close are your hotels to the Haram?',
                    answer:
                        'Our hotels are strategically located within 200-800 meters walking distance from both Masjid al-Haram in Makkah and Masjid an-Nabawi in Madinah. Premium packages offer closer accommodations.'
                },
                {
                    question: 'What airline do you use for flights?',
                    answer:
                        'We partner with reputable airlines including Saudi Airlines, PIA, Emirates, and Qatar Airways. Flight options depend on your package selection and departure city.'
                },
                {
                    question: 'Are meals provided during the journey?',
                    answer:
                        'Yes, we provide halal meals throughout your stay. Breakfast and dinner are typically included, with options for lunch depending on your package. Special dietary requirements can be accommodated with advance notice.'
                }
            ]
        },
        {
            id: 'support',
            title: 'Support & Services',
            icon: Users,
            faqs: [
                {
                    question: 'Do you provide guides during the pilgrimage?',
                    answer:
                        'Yes, our experienced religious guides accompany all groups. They provide step-by-step guidance for rituals, historical insights, and ensure you complete your pilgrimage correctly according to Islamic teachings.'
                },
                {
                    question: 'What support is available in case of emergencies?',
                    answer:
                        'We have 24/7 emergency support with local representatives in Saudi Arabia. Our team assists with medical emergencies, lost documents, accommodation issues, and any other urgent needs.'
                },
                {
                    question: 'Can you help with special needs or disabilities?',
                    answer:
                        'Yes, we provide special assistance for elderly pilgrims, wheelchair users, and those with medical conditions. This includes priority boarding, accessible accommodations, and dedicated support staff.'
                }
            ]
        }
    ];

    useEffect(() => {
        // Simple fade-in animations without external libraries
        categoryRefs.current.forEach((ref, index) => {
            if (ref) {
                ref.style.opacity = '0';
                ref.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    ref.style.transition = 'all 0.6s ease-out';
                    ref.style.opacity = '1';
                    ref.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });

        Object.keys(faqRefs.current).forEach(categoryId => {
            faqRefs.current[categoryId].forEach((faqRef, faqIndex) => {
                if (faqRef) {
                    faqRef.style.opacity = '0';
                    faqRef.style.transform = 'translateX(-10px)';
                    setTimeout(() => {
                        faqRef.style.transition = 'all 0.4s ease-out';
                        faqRef.style.opacity = '1';
                        faqRef.style.transform = 'translateX(0)';
                    }, 200 + faqIndex * 50);
                }
            });
        });
    }, []);

    const toggleFAQ = (categoryId, faqIndex) => {
        const id = `${categoryId}-${faqIndex}`;
        const isOpening = openFAQ !== id;

        if (isOpening) {
            if (openFAQ !== null) {
                const prevAnswer = answerRefs.current[openFAQ];
                if (prevAnswer) {
                    prevAnswer.style.transition = 'all 0.3s ease-in-out';
                    prevAnswer.style.height = '0px';
                    prevAnswer.style.opacity = '0';
                }
                setTimeout(() => {
                    setOpenFAQ(id);
                    animateOpen(id);
                }, 300);
            } else {
                setOpenFAQ(id);
                setTimeout(() => animateOpen(id), 10);
            }
        } else {
            const currentAnswer = answerRefs.current[id];
            if (currentAnswer) {
                currentAnswer.style.transition = 'all 0.3s ease-in-out';
                currentAnswer.style.height = '0px';
                currentAnswer.style.opacity = '0';
            }
            setTimeout(() => setOpenFAQ(null), 300);
        }
    };

    const animateOpen = id => {
        const el = answerRefs.current[id];
        if (el) {
            el.style.height = '0px';
            el.style.opacity = '0';
            el.style.transition = 'all 0.4s ease-out';
            setTimeout(() => {
                el.style.height = el.scrollHeight + 'px';
                el.style.opacity = '1';
            }, 10);
        }
    };

    return (
        <div className="bg-black min-h-screen">
            <div className="text-white w-full relative">

                {/* Blueish and Gold Gradient Overlay with narrowed stops */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(70deg, 
                        rgba(30, 58, 138, 0.2) 0%, 
              rgba(59, 130, 246, 0.05) 15%, 
              rgba(0, 0, 0, 0.02) 50%, 
              rgba(251, 191, 36, 0.05) 85%, 
              rgba(245, 158, 11, 0.1) 100%)`,
                    }}
                ></div>

                {/* Additional smooth blending overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-30"></div>

                {/* Slightly lighter dark overlay (~15% opacity) */}
                <div className="absolute inset-0 bg- opacity-[0] pointer-events-none"></div>

                {/* Bottom overlay for smoother transitions */}
                <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-40"></div>
                </div>

                {/* Blue and Gold Sparkles */}
                <div className="absolute inset-0 opacity-30">
                    {/* Blue sparkles on left side */}
                    <div className="absolute top-[18%] left-[14%] w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute top-[31%] left-[27%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '1.8s' }}></div>
                    <div className="absolute top-[47%] left-[8%] w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '2.7s' }}></div>
                    <div className="absolute top-[64%] left-[23%] w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.9s' }}></div>
                    <div className="absolute bottom-[22%] left-[11%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '3.4s' }}></div>
                    <div className="absolute top-[71%] left-[19%] w-1 h-1 bg-blue-500 rounded-full animate-ping opacity-50" style={{ animationDelay: '1.1s' }}></div>
                    <div className="absolute top-[39%] left-[6%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '2.2s' }}></div>

                    {/* Gold sparkles on right side */}
                    <div className="absolute top-[26%] right-[19%] w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
                    <div className="absolute top-[43%] right-[31%] w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute bottom-[28%] right-[17%] w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '2.9s' }}></div>
                    <div className="absolute top-[13%] right-[9%] w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute bottom-[15%] right-[24%] w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '3.1s' }}></div>
                    <div className="absolute top-[58%] right-[12%] w-1 h-1 bg-yellow-500 rounded-full animate-ping opacity-40" style={{ animationDelay: '1.7s' }}></div>
                    <div className="absolute top-[81%] right-[28%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 lg:py-20">
                    <div className="max-w-5xl mx-auto">
                        {faqCategories.map((category, categoryIndex) => (
                            <div
                                key={category.id}
                                className="mb-6 lg:mb-8"
                                ref={el => (categoryRefs.current[categoryIndex] = el)}
                            >
                                {/* Category Header - Cleaner */}
                                <div className="flex items-center gap-3 mb-5 lg:mb-6 group">
                                    <div className="bg-yellow-400/10 p-2.5 sm:p-3 rounded-md border border-yellow-400/20 hover:bg-yellow-400/15 transition-all duration-300 hover:scale-105">
                                        <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 transition-transform duration-300" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white transition-all duration-300 group-hover:text-yellow-300">
                                        {category.title}
                                    </h2>
                                </div>

                                {/* FAQ Items - Cleaner design */}
                                <div className="space-y-3">
                                    {category.faqs.map((faq, faqIndex) => {
                                        const faqId = `${category.id}-${faqIndex}`;
                                        const isOpen = openFAQ === faqId;

                                        return (
                                            <div
                                                key={faqIndex}
                                                ref={el => {
                                                    if (!faqRefs.current[category.id]) {
                                                        faqRefs.current[category.id] = [];
                                                    }
                                                    faqRefs.current[category.id][faqIndex] = el;
                                                }}
                                                className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-lg overflow-hidden shadow-sm hover:border-yellow-400/30 hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/5"
                                            >
                                                <button
                                                    onClick={() => toggleFAQ(category.id, faqIndex)}
                                                    className="w-full text-left p-4 sm:p-5 lg:p-6 flex items-center justify-between group hover:bg-gray-800/20 transition-colors duration-300"
                                                >
                                                    <h3 className="text-base sm:text-lg lg:text-xl font-normal text-white pr-4 leading-relaxed group-hover:text-yellow-300 transition-colors duration-300">
                                                        {faq.question}
                                                    </h3>
                                                    <div className="flex-shrink-0 bg-yellow-400/10 p-1.5 rounded border border-yellow-400/20 group-hover:bg-yellow-400/15 transition-all duration-300">
                                                        <ChevronDown
                                                            className={`w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 transition-all duration-500 ease-out ${isOpen ? 'rotate-180' : ''
                                                                }`}
                                                        />
                                                    </div>
                                                </button>

                                                {/* Accordion Content */}
                                                <div
                                                    ref={el => (answerRefs.current[faqId] = el)}
                                                    style={{ overflow: 'hidden', height: 0, opacity: 0 }}
                                                >
                                                    <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
                                                        <div className="h-px bg-gradient-to-r from-yellow-400/30 via-yellow-400/10 to-transparent mb-3 sm:mb-4" />
                                                        <div className="bg-gray-800/30 p-3 sm:p-4 rounded border-l-2 border-yellow-400/60 transform transition-all duration-300 hover:bg-gray-800/40">
                                                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent opacity-60"></div>
                </div>
            </div>
        </div>
    );
}