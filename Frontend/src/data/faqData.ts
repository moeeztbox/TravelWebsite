// Central data source for the FAQ page: categories, per-category sidebar
// items, and the FAQ question/answer content shown for each selection.

import type { FaqCategory, FaqSidebarItems, FaqEntry, FaqData } from "../types/faq";

export const CATEGORIES: FaqCategory[] = [
  { id: "general", label: "General Questions" },
  { id: "umrah", label: "Umrah" },
  { id: "international-tours", label: "International Tours" },
  { id: "domestic-tours", label: "Domestic Tours" },
];

export const SIDEBAR_ITEMS: FaqSidebarItems = {
  umrah: [
    "Visa Questions",
    "Payments",
    "Hotels",
    "Transportation",
    "Flights",
    "Support & Safety",
    "General Umrah",
  ],
  "international-tours": [
    "Packages",
    "Visa Questions",
    "Flights",
    "Hotels",
    "Transportation",
    "Payments",
    "Support & Safety",
  ],
  "domestic-tours": [
    "Packages",
    "Hotels",
    "Transportation",
    "Payments",
    "Support & Safety",
  ],
};

// FAQ list powering the General Questions view.
export const GENERAL_FAQS: FaqEntry[] = [
  {
    question: "What services do you offer?",
    answer:
      "Al Buraq Global Travel & Tours offers Umrah packages, international tour packages, domestic tour packages, visa assistance (including study visas), flight ticketing, hotel bookings, and ground transportation, all supported by a dedicated customer service team.",
  },
  {
    question: "How can I book a package or service?",
    answer:
      "You can book by visiting our office, calling our helpline, messaging us on WhatsApp, or filling out the booking form on our website. Our team will guide you through the remaining steps.",
  },
  {
    question: "Can I book online or do I need to visit your office?",
    answer:
      "Both options are available. You can complete most of the booking process online, and our team can also assist you in person at our office if you prefer face-to-face guidance.",
  },
  {
    question: "Where is your office located?",
    answer:
      "Plaza # 54 – Block A, Eden city commercial area, Dha phase 8, Lahore Cantt.",
  },
  {
    question: "What are your business hours?",
    answer:
      "Our office is open from Monday to Saturday from 10:00am to 08:00am. Our support line remains available for urgent queries outside these hours.",
  },
  {
    question: "Why should I choose Al Buraq Global Travel & Tours?",
    answer:
      "We offer end-to-end travel solutions, transparent pricing, experienced staff, reliable visa assistance, and dedicated support before, during, and after your trip.",
  },
  {
    question: "Are your packages customizable?",
    answer:
      "Yes, most of our Umrah, international, and domestic packages can be tailored to your budget, hotel preference, travel dates, and group size.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, bank transfer, and debit/credit card payments.",
  },
  {
    question: "Do you offer installment or payment plans?",
    answer:
      "Yes, installment plans are available for selected packages. Please speak with our team about the deposit amount and payment schedule.",
  },
  {
    question: "How do I know my booking is confirmed?",
    answer:
      "Once your payment and documents are processed, you will receive a written confirmation along with your booking reference number via email or WhatsApp.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, cancellations and rescheduling are possible subject to our cancellation policy and any applicable airline or hotel charges.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Refunds are processed according to how far in advance you cancel and any non-refundable costs already incurred (flights, visas, hotels). Please ask our team for the specific policy applicable to your package.",
  },
  {
    question: "Are there any hidden charges in your packages?",
    answer:
      "No, our package prices are transparent. Any optional add-ons or extra services are clearly communicated before you confirm your booking.",
  },
  {
    question: "Is my personal information and payment data secure?",
    answer:
      "Yes, we handle all personal and payment information with strict confidentiality and secure processing practices.",
  },
  {
    question: "Can I book for my family or a group?",
    answer:
      "Yes, we regularly arrange bookings for families and groups, including shared rooms, group discounts, and coordinated travel schedules.",
  },
  {
    question:
      "How can I stay updated about your latest packages and offers?",
    answer:
      "You can follow our social media pages, subscribe to our newsletter, or contact our office directly for the latest packages and seasonal offers.",
  },
];

export const FAQ_DATA: FaqData = {
  umrah: {
    "Visa Questions": [
      {
        question: "What documents are required to apply for an Umrah visa?",
        answer:
          "A valid passport (minimum six months validity), recent passport-sized photographs and Airline tickets, are typically required. Our team will provide the exact checklist.",
      },
      {
        question: "How long does the Umrah visa application process take?",
        answer:
          "Processing generally takes a few working days, though this can vary depending on the season and embassy processing times.",
      },
      {
        question: "Who is eligible to apply for an Umrah visa?",
        answer:
          "Muslims of any nationality who meet passport, age, and health requirements set by the Saudi authorities are eligible to apply.",
      },
      {
        question:
          "Can Al Buraq Global Travel & Tours handle the complete Umrah visa process?",
        answer:
          "Yes, we manage the entire visa application process on your behalf, from document collection to visa issuance.",
      },
      {
        question: "Is a passport with at least six months of validity required?",
        answer: "Yes, your passport must be valid for at least six months from your travel date.",
      },
      {
        question:
          "What should I do if my passport expires before my Umrah journey?",
        answer:
          "You should renew your passport before applying. Our team can advise you on time so renewal doesn't delay your visa application.",
      },
      {
        question:
          "Can I apply for an Umrah visa without booking an Umrah package?",
        answer: "Yes you can apply for an Umrah visa with confirmed air tickets.",
      },
      {
        question: "What happens if my Umrah visa application is rejected?",
        answer:
          "Our team will review the reason for rejection and assist you with reapplication where possible.",
      },
      {
        question:
          "Are there any age restrictions for obtaining an Umrah visa?",
        answer:
          "There is generally no strict upper age limit, though very elderly travelers may need additional documentation or health clearance.",
      },
      {
        question: "Can children apply for an Umrah visa with their parents?",
        answer:
          "Yes, children can be included on their parents' or guardians' visa application.",
      },
      {
        question: "Can women perform Umrah without a Mahram?",
        answer:
          "According to Saudi government policies women can do Umrah without mehram but according to islam women cannot do umrah witout mehram until certain issues. So its your choice.",
      },
      {
        question:
          "How early should I apply for my Umrah visa before my departure date?",
        answer:
          "We recommend applying at least 15 days before your intended departure date.",
      },
      {
        question:
          "Does an Umrah visa allow me to travel to other cities within Saudi Arabia?",
        answer: "Yes you can travel to other cities within Saudia Arabia.",
      },
      {
        question: "Are Umrah visa fees included in your package price?",
        answer:
          "Yes, visa fees are typically included in our Umrah package price unless stated otherwise.",
      },
      {
        question:
          "Will your team assist me throughout the visa application process until my visa is approved?",
        answer:
          "Yes, our team supports you from document submission through to visa approval.",
      },
    ],
    Payments: [
      {
        question: "What payment methods are accepted for Umrah bookings?",
        answer:
          "We accept bank transfers, debit/credit cards, and cash payments at our office. A booking deposit confirms your reservation, with the remaining balance due before departure.",
      },
      {
        question: "Are installment plans available for Umrah?",
        answer:
          "Yes, we offer 0% interest installment plans over 2-6 months for Umrah packages, making it easier to plan your trip financially.",
      },
      {
        question: "Can I get a refund if I cancel my Umrah booking?",
        answer:
          "Refunds follow our standard Cancellation and Refund Policy, with the refundable amount depending on how close to the travel date you cancel and whether flights or hotels have already been confirmed.",
      },
    ],
    Hotels: [
      {
        question:
          "How close are your hotels to Masjid al-Haram in Makkah?",
        answer:
          "We offer hotels at varying distances from Masjid al-Haram, from walking distance options to more budget-friendly hotels a short shuttle ride away.",
      },
      {
        question:
          "How close are your hotels to Masjid an-Nabawi in Madinah?",
        answer:
          "Similarly, we offer a range of hotels in Madinah, from those close to Masjid an-Nabawi to more economical options nearby.",
      },
      {
        question: "What hotel categories do you offer for Umrah packages?",
        answer:
          "We offer economy, 3-star, 4-star, and 5-star hotel categories to suit different budgets and comfort preferences.",
      },
      {
        question: "Can I choose between 3-star, 4-star, and 5-star hotels?",
        answer:
          "Yes, you can select your preferred hotel category when customizing your Umrah package.",
      },
      {
        question: "Are hotel accommodations included in all Umrah packages?",
        answer:
          "Yes, hotel accommodation in both Makkah and Madinah is included in all our standard Umrah packages.",
      },
      {
        question: "Are the hotel rooms private or shared?",
        answer:
          "Both private and shared room options are available depending on your package and preference.",
      },
      {
        question: "Can I request a family room for my Umrah trip?",
        answer: "Yes, family rooms can be arranged upon request, subject to availability.",
      },
      {
        question:
          "Are separate accommodations available for men and women when required?",
        answer:
          "Yes, we can arrange separate accommodations where required for solo or group travelers.",
      },
      {
        question:
          "Are breakfast, lunch, and dinner included with the hotel stay?",
        answer:
          "Meal inclusions vary by package; some include breakfast only, while others offer full board. Please check your selected package for details.",
      },
      {
        question: "Do your hotels provide free Wi-Fi?",
        answer: "Yes, most of our partner hotels offer complimentary Wi-Fi.",
      },
      {
        question: "Are all hotel rooms air-conditioned?",
        answer: "Yes, all our partner hotel rooms are air-conditioned.",
      },
      {
        question:
          "Are housekeeping and room cleaning services provided daily?",
        answer: "Yes, daily housekeeping is standard at our partner hotels.",
      },
      {
        question: "What amenities are available in the hotel rooms?",
        answer:
          "Standard amenities typically include air conditioning, private bathroom, Wi-Fi, and daily housekeeping; premium hotels may offer additional facilities.",
      },
      {
        question:
          "Are your hotels suitable for elderly pilgrims and families with children?",
        answer:
          "Yes, we select hotels that are comfortable and accessible for elderly pilgrims and families traveling with children.",
      },
      {
        question:
          "Is transportation available between the hotel and Haram if the hotel is farther away?",
        answer:
          "Yes, shuttle or shared transportation is arranged for hotels that are not within walking distance of the Haram.",
      },
      {
        question:
          "Why should I choose Al Buraq Global Travel & Tours for my Umrah hotel accommodations?",
        answer:
          "We work with trusted, vetted hotel partners and prioritize comfort, cleanliness, and proximity, ensuring a smooth and spiritually focused stay.",
      },
    ],
    Transportation: [
      {
        question:
          "Is airport pick-up and drop-off included in your Umrah package?",
        answer:
          "Yes, airport pick-up and drop-off is included in our economy Umrah packages.",
      },
      {
        question: "Do you provide transportation between Makkah and Madinah?",
        answer:
          "Yes, we arrange comfortable intercity transportation between Makkah and Madinah.",
      },
      {
        question: "What type of vehicles do you use for Umrah transportation?",
        answer:
          "We use air-conditioned buses, coasters, or private vehicles depending on group size and package type.",
      },
      {
        question: "Are your transportation vehicles air-conditioned?",
        answer: "Yes, all our transportation vehicles are air-conditioned.",
      },
      {
        question:
          "Do you offer private transportation for individuals and families?",
        answer:
          "Yes, private transportation options are available upon request for individuals and families.",
      },
      {
        question: "Is transportation available throughout my entire Umrah journey?",
        answer:
          "Yes, from airport arrival to departure, transportation is arranged for all scheduled movements during your trip.",
      },
      {
        question: "Are your drivers experienced and professionally licensed?",
        answer:
          "Yes, our drivers are experienced, professionally licensed, and familiar with routes in Saudi Arabia.",
      },
      {
        question: "How will I know the transportation schedule during my trip?",
        answer:
          "Your tour coordinator will share the transportation schedule with you upon arrival and keep you updated of any changes.",
      },
      {
        question: "Can I arrange additional transportation during my stay?",
        answer:
          "Yes, additional transportation can be arranged for an extra charge; please coordinate with our on-ground team.",
      },
      {
        question:
          "Is luggage transportation included between the airport, hotels, and cities?",
        answer:
          "Yes, luggage transportation is included between the airport, hotels, and intercity transfers.",
      },
      {
        question:
          "Do you provide transportation for Ziyarat tours in Makkah and Madinah?",
        answer:
          "Yes, Ziyarat tour transportation can be included or arranged as an add-on for your package.",
      },
      {
        question: "Are there any additional charges for transportation services?",
        answer:
          "Standard transportation is included in your package price; additional or customized transportation may carry extra charges.",
      },
      {
        question: "Can families and groups travel together in the same vehicle?",
        answer:
          "Yes, we try to accommodate families and groups traveling together in the same vehicle wherever possible.",
      },
      {
        question:
          "Will your team coordinate all transportation arrangements during my Umrah journey?",
        answer:
          "Yes, our on-ground team coordinates all transportation arrangements throughout your journey.",
      },
      {
        question:
          "Who should I contact if I need immediate transportation assistance during my Umrah trip?",
        answer:
          "You will be provided with an emergency contact number for our on-ground team before departure.",
      },
    ],
    Flights: [
      {
        question: "Are round-trip flight tickets included in your Umrah packages?",
        answer: "Yes, round-trip flight tickets are included in our Umrah packages.",
      },
      {
        question: "Which airlines do you use for Umrah flights?",
        answer:
          "We work with a number of reputable airlines; the specific airline depends on your chosen package and travel dates.",
      },
      {
        question: "Can I choose my preferred airline for my Umrah journey?",
        answer:
          "Where possible, we try to accommodate airline preferences, though this may affect the package price.",
      },
      {
        question: "Are direct flights available for Umrah packages?",
        answer:
          "Direct flights are available on selected routes and packages, subject to availability.",
      },
      {
        question: "Can I depart from my preferred city?",
        answer:
          "We offer departures from major cities; please check with our team for availability from your preferred city.",
      },
      {
        question: "What baggage allowance is included with my flight ticket?",
        answer:
          "Baggage allowance depends on the airline; typically 20-30 kg checked baggage plus hand luggage. Exact details will be confirmed with your ticket.",
      },
      {
        question: "Can I purchase additional baggage if required?",
        answer:
          "Yes, additional baggage can usually be purchased directly with the airline or through our team.",
      },
      {
        question: "When will I receive my Umrah flight ticket?",
        answer: "Your ticket is issued once your full payment is completed.",
      },
      {
        question: "Can I change my travel dates after my ticket has been issued?",
        answer:
          "Date changes may be possible depending on airline policy and may involve additional charges.",
      },
      {
        question: "What happens if my flight is delayed or canceled?",
        answer:
          "We coordinate with the airline to rebook or reschedule and keep you informed throughout the process.",
      },
      {
        question: "Can I upgrade my ticket to Business or First Class?",
        answer:
          "Yes, upgrades are available for an additional charge, subject to availability.",
      },
      {
        question: "Are meals provided during the flight?",
        answer:
          "Yes, meals are typically provided on board, in line with the airline's standard service.",
      },
      {
        question: "Will your team assist me with airport check-in and boarding?",
        answer:
          "Yes, our team provides guidance and assistance with check-in and boarding procedures.",
      },
      {
        question: "Can families and groups be seated together on the flight?",
        answer:
          "We request seating together for families and groups wherever the airline allows.",
      },
      {
        question: "What travel documents do I need before boarding my flight?",
        answer:
          "You will need your passport, visa, ticket, and any required health documents. Our team will confirm the full list before departure.",
      },
      {
        question:
          "Are airport taxes and airline charges included in the package price?",
        answer:
          "Yes, standard airport taxes and airline charges are included in the package price.",
      },
      {
        question:
          "Can I extend my stay in Saudi Arabia by changing my return ticket?",
        answer:
          "Return date changes may be possible depending on your visa validity and airline policy; please discuss this with our team in advance.",
      },
    ],
    "Support & Safety": [
      {
        question: "Do you provide a dedicated guide throughout the Umrah journey?",
        answer:
          "Yes, a dedicated guide or coordinator accompanies most of our Umrah groups throughout the journey.",
      },
      {
        question: "How can I contact your team while I am in Saudi Arabia?",
        answer:
          "You will be given a local emergency contact number and WhatsApp contact for our on-ground team.",
      },
      {
        question: "Do you provide emergency contact numbers before departure?",
        answer: "Yes, you will receive emergency contact details before you leave.",
      },
      {
        question:
          "Will your team assist me with hotel or transportation issues during my stay?",
        answer:
          "Yes, our on-ground team is available to resolve any hotel or transportation issues promptly.",
      },
      {
        question: "Do you provide guidance on performing Umrah rituals?",
        answer:
          "Yes, our guides provide orientation and step-by-step guidance on performing Umrah rituals correctly.",
      },
      {
        question:
          "How will I receive important updates or schedule changes during my journey?",
        answer:
          "Updates are shared via WhatsApp, SMS, or in person by your tour coordinator.",
      },
      {
        question:
          "Can my family contact your support team while I am performing Umrah?",
        answer:
          "Yes, your family can reach our support team for updates or in case of an emergency.",
      },
      {
        question:
          "What health precautions should I take before and during my Umrah trip?",
        answer:
          "We recommend staying hydrated, getting required vaccinations, carrying necessary medication, and following local health guidelines; consult your doctor for personalized advice.",
      },
      {
        question:
          "How does Al Buraq Global Travel & Tours ensure a safe and comfortable Umrah experience?",
        answer:
          "We work with vetted hotels and transport providers, provide on-ground support, and maintain contact with pilgrims throughout the journey to ensure safety and comfort.",
      },
      {
        question:
          "Who should I contact if I need immediate assistance during my Umrah journey?",
        answer:
          "Please contact the emergency number provided to you before departure for immediate assistance.",
      },
    ],
    "General Umrah": [
      {
        question: "What is Umrah?",
        answer:
          "Umrah is a non-obligatory Islamic pilgrimage to Makkah that can be performed at any time of the year, involving rituals such as Tawaf and Sa'i.",
      },
      {
        question: "What is the difference between Hajj and Umrah?",
        answer:
          "Hajj is an obligatory pilgrimage performed during specific dates in the Islamic calendar, while Umrah is a voluntary pilgrimage that can be performed year-round with fewer rituals.",
      },
      {
        question: "Who is eligible to perform Umrah?",
        answer:
          "Any Muslim who is physically able and holds a valid Umrah visa can perform Umrah.",
      },
      {
        question: "When is the best time to perform Umrah?",
        answer:
          "Umrah can be performed year-round; however, months outside Ramadan and Hajj season are typically less crowded and more budget-friendly.",
      },
      {
        question: "How long does an Umrah trip usually last?",
        answer:
          "Umrah trips typically last between 7-90 days, though shorter and longer packages are also available.",
      },
      {
        question: "What is included in your Umrah packages?",
        answer:
          "Our packages typically include visa processing, round-trip flights, hotel accommodation, ground transportation, and on-ground support.",
      },
      {
        question: "How far in advance should I book my Umrah package?",
        answer:
          "We recommend booking at least 15 days in advance, especially during peak seasons.",
      },
      {
        question: "What types of Umrah packages do you offer?",
        answer:
          "We offer economy, standard, and premium Umrah packages with varying hotel categories and services.",
      },
      {
        question:
          "Can I customize my Umrah package according to my requirements?",
        answer:
          "Yes, packages can be customized in terms of hotel category, duration, and travel dates.",
      },
      {
        question: "What should I pack for my Umrah journey?",
        answer:
          "Essentials include Ihram clothing, comfortable footwear, personal toiletries, medication, and required travel documents. Our team can share a detailed packing checklist.",
      },
      {
        question: "Can elderly people perform Umrah safely?",
        answer:
          "Yes, with proper planning, suitable accommodation, and assistance, elderly pilgrims can perform Umrah safely and comfortably.",
      },
      {
        question: "Can children accompany their parents for Umrah?",
        answer:
          "Yes, children can accompany their parents, subject to visa and health documentation requirements.",
      },
      {
        question:
          "Can I perform Umrah with my family or as part of a group?",
        answer:
          "Yes, we regularly organize family and group Umrah trips with shared accommodation and coordinated schedules.",
      },
      {
        question: "Do you organize Ziyarat tours in Makkah and Madinah?",
        answer:
          "Yes, Ziyarat tours to historical and religious sites in Makkah and Madinah can be included in your package.",
      },
      {
        question:
          "Will I receive guidance or an orientation session before departure?",
        answer:
          "Yes, we provide a pre-departure orientation covering rituals, documents, and travel tips.",
      },
      {
        question:
          "Can I extend my stay in Saudi Arabia after completing Umrah?",
        answer:
          "This may be possible depending on your visa validity; please discuss extension options with our team in advance.",
      },
      {
        question:
          "Why should I choose Al Buraq Global Travel & Tours for my Umrah pilgrimage?",
        answer:
          "We offer transparent pricing, trusted hotel and transport partners, complete visa handling, and dedicated on-ground support throughout your spiritual journey.",
      },
      {
        question:
          "How can I book an Umrah package with Al Buraq Global Travel & Tours?",
        answer:
          "You can book by visiting our office, calling our helpline, or filling out the inquiry form on our website.",
      },
    ],
  },
  "international-tours": {
    Packages: [
      {
        question: "What is included in your international tour packages?",
        answer:
          "Our packages typically include flights, hotel accommodation, ground transportation, and select sightseeing activities.",
      },
      {
        question:
          "Which countries do you offer international tour packages for?",
        answer:
          "We offer packages for a wide range of popular international destinations; please contact our team for the current list.",
      },
      {
        question: "What types of international tour packages do you provide?",
        answer:
          "We offer group tours, private tours, honeymoon packages, and fully customized itineraries.",
      },
      {
        question:
          "Can I customize an international tour package according to my preferences?",
        answer:
          "Yes, our packages can be tailored to your preferred destinations, hotel category, and duration.",
      },
      {
        question: "What is the duration of your international tour packages?",
        answer:
          "Duration varies by destination, typically ranging from 7-30 days.",
      },
      {
        question: "Do your packages include flights, hotels, and transportation?",
        answer:
          "Yes, these three components are included in our standard international tour packages.",
      },
      {
        question: "Are sightseeing tours included in the package price?",
        answer:
          "Select sightseeing tours are included; additional excursions can be added for an extra charge.",
      },
      {
        question: "Do your packages include meals during the tour?",
        answer:
          "Meal inclusions vary by package; please check your specific itinerary for details.",
      },
      {
        question: "Are visa processing services included in the package?",
        answer:
          "Visa processing can be included or offered as an add-on service, depending on the package.",
      },
      {
        question:
          "Can I book an international tour for my family or a private group?",
        answer:
          "Yes, we arrange private and family tours with customized itineraries.",
      },
      {
        question:
          "Do you offer honeymoon or couples' international tour packages?",
        answer: "Yes, we offer specially curated honeymoon and couples' packages.",
      },
      {
        question:
          "Are there special packages available during holidays and peak travel seasons?",
        answer:
          "Yes, we offer seasonal and holiday packages; please check with our team for current offers.",
      },
      {
        question: "Can I add or remove destinations from my selected package?",
        answer:
          "Yes, destinations can generally be added or removed when customizing your package.",
      },
      {
        question:
          "Do you offer luxury and budget-friendly international tour packages?",
        answer:
          "Yes, we offer packages across a range of budgets, from economy to luxury.",
      },
      {
        question: "How far in advance should I book an international tour package?",
        answer:
          "We recommend booking at least 4-8 weeks in advance, especially during peak seasons.",
      },
      {
        question:
          "What happens if I need to reschedule or cancel my international tour?",
        answer:
          "Rescheduling and cancellation are possible subject to our policy and any supplier charges already incurred.",
      },
      {
        question:
          "Why should I choose Al Buraq Global Travel & Tours for my international vacation?",
        answer:
          "We offer personalized itineraries, transparent pricing, trusted partners, and dedicated support throughout your journey.",
      },
      {
        question:
          "How can I book an international tour package with Al Buraq Global Travel & Tours?",
        answer:
          "You can book by visiting our office, calling our helpline, or submitting an inquiry through our website.",
      },
    ],
    "Visa Questions": [
      {
        question: "Which countries do you provide visa assistance for?",
        answer:
          "We provide visa assistance for a wide range of popular tourist destinations. Please contact our team for the current list of countries.",
      },
      {
        question: "What documents are required to apply for a tourist visa?",
        answer:
          "Typically required documents include a valid passport, photographs, bank statements, travel itinerary, and hotel bookings. Requirements vary by country.",
      },
      {
        question: "How long does the tourist visa application process take?",
        answer:
          "Processing times vary by country, generally ranging from a few days to several weeks.",
      },
      {
        question:
          "Can Al Buraq Global Travel & Tours handle the complete visa application process?",
        answer:
          "Yes, we assist with document preparation, application submission, and follow-up throughout the visa process.",
      },
      {
        question: "Is a passport with at least six months of validity required?",
        answer:
          "Yes, most countries require passport validity of at least six months beyond your travel date.",
      },
      {
        question:
          "Can I apply for a visa without booking an international tour package?",
        answer:
          "In some cases, standalone visa assistance is available; please check with our team for the specific country.",
      },
      {
        question: "What happens if my tourist visa application is rejected?",
        answer:
          "We will review the rejection reason with you and advise on next steps, including reapplication where possible.",
      },
      {
        question: "Can I reapply if my visa application is refused?",
        answer:
          "Yes, reapplication is generally possible after addressing the reasons for refusal.",
      },
      {
        question:
          "How early should I apply for my tourist visa before my departure date?",
        answer:
          "We recommend applying at least 4-8 weeks before your intended travel date.",
      },
      {
        question:
          "Do visa requirements vary depending on the country I plan to visit?",
        answer:
          "Yes, visa requirements differ significantly by country and by your nationality.",
      },
      {
        question:
          "Do I need to provide proof of financial support or bank statements?",
        answer:
          "Yes, most tourist visa applications require recent bank statements as proof of financial support.",
      },
      {
        question:
          "Will you assist me in preparing and reviewing my visa documents?",
        answer:
          "Yes, our team reviews your documents before submission to reduce the risk of errors or rejection.",
      },
      {
        question:
          "Are visa application fees included in your international tour package?",
        answer:
          "This varies by package; please confirm with our team whether visa fees are included or charged separately.",
      },
      {
        question:
          "Can I apply for visas for multiple countries at the same time?",
        answer:
          "Yes, applications for multiple countries can generally be processed in parallel.",
      },
      {
        question:
          "Will you assist me if additional documents are requested by the embassy?",
        answer:
          "Yes, we will guide you in preparing and submitting any additional documents requested by the embassy.",
      },
      {
        question:
          "Who should I contact if I have questions about my visa application or travel requirements?",
        answer:
          "Please contact your assigned visa consultant or our main office for any visa-related questions.",
      },
    ],
    Flights: [
      {
        question:
          "Are round-trip flight tickets included in your international tour packages?",
        answer:
          "Yes, round-trip flight tickets are included in our standard international tour packages.",
      },
      {
        question: "Which airlines do you use for international tours?",
        answer:
          "We work with a number of reputable international airlines depending on the destination and package.",
      },
      {
        question: "Can I choose my preferred airline?",
        answer:
          "Where possible, we accommodate airline preferences, which may affect the overall package price.",
      },
      {
        question: "Are direct flights available for international destinations?",
        answer:
          "Direct flights are available on selected routes, subject to availability.",
      },
      {
        question: "Can I choose my preferred departure city?",
        answer:
          "We offer departures from major cities; please confirm availability from your preferred city with our team.",
      },
      {
        question: "What baggage allowance is included with my flight ticket?",
        answer:
          "Baggage allowance depends on the airline, typically 20-30 kg checked baggage plus hand luggage.",
      },
      {
        question: "Can I purchase additional baggage if required?",
        answer: "Yes, additional baggage can be purchased through the airline or our team.",
      },
      {
        question: "When will I receive my flight ticket before departure?",
        answer:
          "Tickets are typically issued a few days before departure, once payment and documentation are complete.",
      },
      {
        question: "Can I change my travel dates after my ticket has been booked?",
        answer:
          "Date changes may be possible depending on the airline's fare rules and may involve additional charges.",
      },
      {
        question: "What happens if my flight is delayed or canceled?",
        answer:
          "We coordinate with the airline to rebook or reschedule your flight and keep you informed throughout.",
      },
      {
        question: "Can I upgrade my ticket to Business or First Class?",
        answer:
          "Yes, upgrades are available for an additional charge, subject to availability.",
      },
      {
        question: "Are meals included during the flight?",
        answer:
          "Yes, meals are typically included as part of the airline's standard service.",
      },
      {
        question:
          "Will your team assist me with airport check-in and boarding procedures?",
        answer: "Yes, our team provides guidance for check-in and boarding.",
      },
      {
        question: "Can families or groups be seated together on the same flight?",
        answer:
          "We request seating together for families and groups wherever the airline allows.",
      },
      {
        question:
          "What travel documents do I need before boarding my international flight?",
        answer:
          "You will need your passport, visa, ticket, and any destination-specific health or customs documents.",
      },
      {
        question:
          "Are airport taxes and airline charges included in the package price?",
        answer:
          "Yes, standard airport taxes and airline charges are included in the package price.",
      },
      {
        question:
          "Can I extend my stay abroad by changing my return flight ticket?",
        answer:
          "Return date changes may be possible depending on airline policy and your visa validity; please discuss this in advance with our team.",
      },
    ],
    Hotels: [
      {
        question:
          "Are hotel accommodations included in your international tour packages?",
        answer:
          "Yes, hotel accommodation is included in our standard international tour packages.",
      },
      {
        question: "What types of hotels are included in your tour packages?",
        answer:
          "We offer a range from budget to luxury hotels, depending on your selected package.",
      },
      {
        question: "Can I choose my preferred hotel before booking?",
        answer:
          "Yes, where available, you can select your preferred hotel from our partner options.",
      },
      {
        question: "Are 3-star, 4-star, and 5-star hotel options available?",
        answer:
          "Yes, all three categories are available depending on the destination and package.",
      },
      {
        question: "Are hotel rooms private or shared?",
        answer:
          "Private rooms are standard; shared rooms can be arranged for group or budget travelers upon request.",
      },
      {
        question: "Can I request a family room or connecting rooms?",
        answer:
          "Yes, family or connecting rooms can be requested, subject to hotel availability.",
      },
      {
        question:
          "Are breakfast, lunch, and dinner included with the hotel stay?",
        answer:
          "Meal inclusions vary by package; breakfast is commonly included, with full-board options available on request.",
      },
      {
        question: "Do the hotels provide free Wi-Fi?",
        answer: "Yes, most of the hotels provide complimentary Wi-Fi.",
      },
      {
        question: "Are your partner hotels located near major tourist attractions?",
        answer:
          "Yes, we prioritize hotels that are conveniently located near major attractions and transport links.",
      },
      {
        question: "What amenities are included in the hotel rooms?",
        answer:
          "Standard amenities include air conditioning, private bathroom, and Wi-Fi; premium hotels may include additional facilities such as pools or gyms.",
      },
      {
        question: "Can I upgrade my hotel after confirming my booking?",
        answer: "Yes, upgrades are possible subject to availability and an additional charge.",
      },
      {
        question: "Are luxury hotel options available for premium tour packages?",
        answer: "Yes, luxury hotel options are available for our premium packages.",
      },
      {
        question: "Are your hotels suitable for families with children?",
        answer: "Yes, we select family-friendly hotels for group and family bookings.",
      },
      {
        question: "Can I extend my hotel stay before or after my tour?",
        answer: "Yes, hotel stay extensions can be arranged for an additional cost.",
      },
      {
        question: "Is early check-in or late check-out available upon request?",
        answer:
          "Early check-in or late check-out can be requested and is subject to hotel availability and possible extra charges.",
      },
      {
        question:
          "Are there any additional hotel charges that are not included in the package?",
        answer:
          "Personal expenses such as minibar use, spa services, or laundry are typically not included and are payable directly to the hotel.",
      },
      {
        question: "Are all taxes and service charges included in the hotel booking?",
        answer:
          "Standard taxes and service charges are included in the package price unless otherwise specified.",
      },
    ],
    Transportation: [
      {
        question:
          "Is airport pick-up and drop-off included in your international tour packages?",
        answer:
          "Yes, airport pick-up is included in our standard international tour packages but we provide drop-off on your demand with extra charges.",
      },
      {
        question: "Do you provide transportation throughout the entire tour?",
        answer:
          "Yes, transportation is arranged for all scheduled activities throughout your tour.",
      },
      {
        question: "What type of vehicles do you use for international tours?",
        answer:
          "We use air-conditioned cars, vans, or coaches depending on group size and destination.",
      },
      {
        question: "Are your transportation vehicles air-conditioned and comfortable?",
        answer:
          "Yes, all vehicles used are air-conditioned and maintained for passenger comfort.",
      },
      {
        question:
          "Do you offer private transportation for individuals, families, or groups?",
        answer:
          "Yes, private transportation options are available for individuals, families, and groups.",
      },
      {
        question: "Are your drivers experienced and professionally licensed?",
        answer:
          "Yes, our drivers are experienced, licensed, and familiar with local routes.",
      },
      {
        question: "Can I choose my preferred vehicle for the tour?",
        answer:
          "Vehicle preference can often be accommodated for an additional charge, subject to availability.",
      },
      {
        question: "Do you provide luxury transportation options?",
        answer: "Yes, luxury vehicle options are available for premium packages.",
      },
      {
        question:
          "Is transportation available for all sightseeing activities included in the itinerary?",
        answer:
          "Yes, transportation is arranged for all sightseeing activities listed in your itinerary.",
      },
      {
        question: "Can I customize my transportation schedule during the tour?",
        answer:
          "Yes, schedule adjustments can be discussed with your tour coordinator, subject to availability.",
      },
      {
        question: "Can families or large groups travel together in the same vehicle?",
        answer:
          "Yes, we aim to keep families and groups together in the same vehicle wherever possible.",
      },
      {
        question: "What safety measures do you follow during transportation?",
        answer:
          "We use well-maintained vehicles, licensed drivers, and standard safety protocols including seatbelt use and route planning.",
      },
      {
        question:
          "Can I request transportation for destinations outside the planned itinerary?",
        answer:
          "Yes, additional transportation outside the itinerary can be arranged for an extra charge.",
      },
      {
        question:
          "Will your tour coordinator assist with all transportation arrangements during the trip?",
        answer:
          "Yes, your tour coordinator manages all transportation logistics throughout the trip.",
      },
      {
        question:
          "Who should I contact if I experience any transportation-related issues during my international tour?",
        answer:
          "Please contact your tour coordinator or the emergency contact number provided before departure.",
      },
    ],
    Payments: [
      {
        question: "What payment methods do you accept for international tour bookings?",
        answer: "We accept cash, bank transfer, and debit/credit card payments.",
      },
      {
        question: "Is an advance payment required to confirm my booking?",
        answer: "Yes, an advance deposit is required to confirm your booking.",
      },
      {
        question:
          "How much deposit is required to reserve an international tour package?",
        answer:
          "The deposit amount varies by destination and package; please confirm the exact figure with our sales team.",
      },
      {
        question: "When is the final payment due before departure?",
        answer: "Final payment is typically due 1 week before departure.",
      },
      {
        question: "Can I pay online using a debit or credit card?",
        answer: "Yes, online payments via debit or credit card are accepted.",
      },
      {
        question: "Do you accept bank transfers for international tour bookings?",
        answer: "Yes, bank transfers are accepted for international tour bookings.",
      },
      {
        question: "Will I receive an official payment receipt after every transaction?",
        answer: "Yes, an official receipt is issued for every payment made.",
      },
      {
        question: "Are there any hidden charges in your international tour packages?",
        answer:
          "No, our package pricing is transparent, and any optional extras are clearly communicated in advance.",
      },
      {
        question: "Does the package price include flights, hotels, and transportation?",
        answer:
          "Yes, our standard international tour packages include flights, hotel accommodation, and ground transportation.",
      },
      {
        question: "Are visa application fees included in the package price?",
        answer:
          "This varies by package; please confirm with our team whether visa fees are included.",
      },
      {
        question:
          "Are sightseeing tickets and attraction entry fees included in the package?",
        answer:
          "Sightseeing and entry fees included vary by itinerary; please check your specific package details.",
      },
      {
        question: "Can I pay on behalf of my family members or friends?",
        answer:
          "Yes, you can make payments on behalf of family members or friends included in the same booking.",
      },
      {
        question: "Can I modify my payment plan after confirming my booking?",
        answer: "Modifications may be possible; please discuss this with our accounts team.",
      },
      {
        question: "What is your cancellation and refund policy for international tours?",
        answer:
          "Refunds are calculated based on the cancellation date and any non-refundable costs already incurred, such as flights or visas. Please ask our team for the specific policy.",
      },
      {
        question: "How long does it take to receive a refund after canceling my booking?",
        answer: "Refunds are typically processed within 15-30 working days of approval.",
      },
      {
        question: "Is my online payment information secure?",
        answer:
          "Yes, all online payments are processed through secure channels to protect your information.",
      },
      {
        question:
          "Are there any additional charges if I make changes to my booking after payment?",
        answer:
          "Changes made after payment may incur administrative or supplier charges depending on the nature of the change.",
      },
      {
        question:
          "Who should I contact if I have questions regarding payments, invoices, or refunds?",
        answer:
          "Please contact our accounts department or your assigned booking consultant for payment-related queries.",
      },
    ],
    "Support & Safety": [
      {
        question: "Do you provide 24/7 customer support during international tours?",
        answer:
          "Yes, our support team is available around the clock during your international tour for any urgent needs.",
      },
      {
        question: "How can I contact your support team while I am traveling abroad?",
        answer:
          "You will be provided with an emergency contact number and WhatsApp contact before departure.",
      },
      {
        question:
          "Will a tour guide or tour manager accompany the group during the trip?",
        answer: "Yes, group tours are typically accompanied by a tour guide or tour manager.",
      },
      {
        question: "Do you provide emergency contact numbers before the trip begins?",
        answer: "Yes, emergency contact numbers are shared before your trip begins.",
      },
      {
        question:
          "Will your team assist me with hotel or transportation issues during my trip?",
        answer:
          "Yes, our team will help resolve any hotel or transportation issues that arise during your trip.",
      },
      {
        question:
          "How will I receive important travel updates or itinerary changes during the tour?",
        answer:
          "Updates are communicated via WhatsApp, SMS, or directly through your tour guide.",
      },
      {
        question: "Can my family contact your support team while I am traveling abroad?",
        answer:
          "Yes, your family can reach our support team for updates or assistance while you are traveling.",
      },
      {
        question: "What should I do if I lose my luggage during the trip?",
        answer:
          "Please inform your tour guide and the airline immediately; our team will assist you in filing a report and following up on recovery.",
      },
      {
        question:
          "Who should I contact if I need immediate assistance during my international tour?",
        answer: "Please use the emergency contact number provided to you before departure.",
      },
    ],
  },
  "domestic-tours": {
    Packages: [
      {
        question: "What domestic destinations do you offer tours for?",
        answer:
          "We offer domestic tour packages to popular local destinations, including cultural, coastal, and mountain getaways, with options for weekend trips and extended holidays.",
      },
      {
        question: "Can I customize a domestic tour package?",
        answer:
          "Yes, we can adjust the itinerary, hotel category, and duration of any domestic tour to suit your group size and preferences.",
      },
      {
        question: "Are domestic tours suitable for families with children?",
        answer:
          "Yes, many of our domestic packages are family-friendly, with relaxed itineraries and accommodations that welcome children.",
      },
    ],
    Hotels: [
      {
        question: "Are hotel accommodations included in your domestic tour packages?",
        answer:
          "Yes, hotel accommodation is included in our standard domestic tour packages.",
      },
      {
        question: "What types of hotels do you offer in your tour packages?",
        answer:
          "We offer a range of hotels from budget to luxury, depending on the destination and package.",
      },
      {
        question: "Can I choose my preferred hotel before booking?",
        answer:
          "Yes, where available, you can select your preferred hotel from our partner options.",
      },
      {
        question: "Are 3-star, 4-star, and 5-star hotel options available?",
        answer: "Yes, all three categories are available depending on the destination.",
      },
      {
        question: "Are hotel rooms shared or private?",
        answer:
          "Private rooms are standard; shared rooms can be arranged for group or budget travelers upon request.",
      },
      {
        question: "Can I request a family room for my trip?",
        answer: "Yes, family rooms can be arranged upon request, subject to availability.",
      },
      {
        question:
          "Are breakfast, lunch, and dinner included with the hotel stay?",
        answer:
          "Meal inclusions vary by package; breakfast is commonly included, with full-board options on request.",
      },
      {
        question: "Do the hotels provide free Wi-Fi?",
        answer: "Yes, most of our partner hotels provide complimentary Wi-Fi.",
      },
      {
        question: "Do the hotel rooms include air conditioning and basic amenities?",
        answer:
          "Yes, our partner hotel rooms include air conditioning and standard amenities.",
      },
      {
        question: "Are hotels located near major tourist attractions?",
        answer: "Yes, we prioritize hotels conveniently located near major attractions.",
      },
      {
        question: "Can I upgrade my hotel after confirming my booking?",
        answer: "Yes, upgrades are possible subject to availability and an additional charge.",
      },
      {
        question: "Do you offer luxury hotel options for premium packages?",
        answer: "Yes, luxury hotel options are available for our premium domestic packages.",
      },
      {
        question: "Are your hotels suitable for families with children?",
        answer: "Yes, we select family-friendly hotels for group and family bookings.",
      },
      {
        question: "Can I extend my hotel stay before or after my tour?",
        answer: "Yes, hotel stay extensions can be arranged for an additional cost.",
      },
      {
        question: "Is early check-in or late check-out available upon request?",
        answer:
          "Early check-in or late check-out can be requested, subject to hotel availability.",
      },
      {
        question: "Are there any additional hotel charges that I should be aware of?",
        answer:
          "Personal expenses such as minibar use or laundry are not included and are payable directly to the hotel.",
      },
      {
        question:
          "Why does Al Buraq Global Travel & Tours choose these hotels for its domestic tour packages?",
        answer:
          "We select hotels based on comfort, location, cleanliness, and value to ensure a pleasant experience for our travelers.",
      },
    ],
    Transportation: [
      {
        question: "Is transportation included in all domestic tour packages?",
        answer:
          "Yes, ground transportation is included in all our standard domestic tour packages.",
      },
      {
        question: "What type of vehicles do you use for domestic tours?",
        answer: "We use air-conditioned cars, vans, or coaches depending on group size.",
      },
      {
        question: "Are your vehicles air-conditioned and comfortable?",
        answer: "Yes, all vehicles used are air-conditioned and well-maintained.",
      },
      {
        question: "Do you provide private transportation for families or groups?",
        answer: "Yes, private transportation options are available for families and groups.",
      },
      {
        question: "Are your drivers experienced and professionally licensed?",
        answer:
          "Yes, our drivers are experienced, licensed, and familiar with local routes.",
      },
      {
        question:
          "Is airport, railway station, or bus terminal pick-up and drop-off available?",
        answer:
          "Yes, pick-up and drop-off from airports, railway stations, or bus terminals is available.",
      },
      {
        question:
          "Do you provide transportation to all sightseeing destinations included in the package?",
        answer:
          "Yes, transportation is arranged for all sightseeing destinations listed in your itinerary.",
      },
      {
        question: "Can I choose my preferred vehicle for the tour?",
        answer:
          "Vehicle preference can often be accommodated for an additional charge, subject to availability.",
      },
      {
        question: "Do you offer luxury transportation options?",
        answer: "Yes, luxury vehicle options are available for premium packages.",
      },
      {
        question: "Is transportation available throughout the entire tour?",
        answer: "Yes, transportation is arranged for the full duration of your tour.",
      },
      {
        question: "Can I customize my transportation schedule?",
        answer:
          "Yes, schedule adjustments can be discussed with your tour coordinator, subject to availability.",
      },
      {
        question:
          "Are fuel charges, toll taxes, and parking fees included in the package price?",
        answer:
          "Yes, standard fuel, toll, and parking charges are included in the package price.",
      },
      {
        question: "Is luggage transportation included during the trip?",
        answer: "Yes, luggage handling is included as part of your transportation service.",
      },
      {
        question: "Can large families or groups travel together in the same vehicle?",
        answer:
          "Yes, we aim to keep families and groups together in the same vehicle wherever possible, or arrange multiple vehicles as needed.",
      },
      {
        question: "What safety measures do you follow during transportation?",
        answer:
          "We use well-maintained vehicles, licensed drivers, and standard safety protocols during all trips.",
      },
      {
        question:
          "Will the driver also act as a tour guide, or is a separate guide provided?",
        answer:
          "This depends on the package; some tours include a separate guide, while others rely on the driver for basic route information.",
      },
      {
        question:
          "Can I request transportation for destinations outside the planned itinerary?",
        answer:
          "Yes, additional transportation outside the itinerary can be arranged for an extra charge.",
      },
      {
        question:
          "Who should I contact if I face any transportation-related issues during my domestic tour?",
        answer:
          "Please contact your tour coordinator or the emergency contact number provided before departure.",
      },
    ],
    Payments: [
      {
        question: "What payment methods do you accept for domestic tour bookings?",
        answer: "We accept cash, bank transfer, and debit/credit card payments.",
      },
      {
        question: "Is an advance payment required to confirm my booking?",
        answer: "Yes, an advance deposit is required to confirm your booking.",
      },
      {
        question: "How much deposit is required to reserve a domestic tour package?",
        answer:
          "The deposit amount varies by package; please confirm the exact figure with our sales team.",
      },
      {
        question: "When is the final payment due before the tour begins?",
        answer: "Final payment is typically due 4-7 days before the tour begins.",
      },
      {
        question: "Can I pay online using a debit or credit card?",
        answer: "Yes, online payments via debit or credit card are accepted.",
      },
      {
        question: "Do you accept bank transfers for domestic tour bookings?",
        answer: "Yes, bank transfers are accepted for domestic tour bookings.",
      },
      {
        question: "Will I receive a payment receipt after every transaction?",
        answer: "Yes, an official receipt is issued for every payment made.",
      },
      {
        question: "Are there any hidden charges in your domestic tour packages?",
        answer:
          "No, our pricing is transparent, and any optional extras are communicated clearly in advance.",
      },
      {
        question:
          "Are hotel accommodations and transportation included in the package price?",
        answer: "Yes, both are standard inclusions in our domestic tour package price.",
      },
      {
        question: "Are entry tickets to tourist attractions included in the package?",
        answer: "This varies by itinerary; please check your specific package for details.",
      },
      {
        question: "Can I pay on behalf of my family members or friends?",
        answer:
          "Yes, you can make payments on behalf of family members or friends included in the same booking.",
      },
      {
        question: "What is your cancellation and refund policy for domestic tours?",
        answer:
          "Refunds are calculated based on the cancellation date and any non-refundable costs already incurred. Please ask our team for the specific policy.",
      },
      {
        question: "How long does it take to receive a refund after canceling a booking?",
        answer: "Refunds are typically processed within 7-14 working days of approval.",
      },
      {
        question:
          "Will I receive a refund if the tour is canceled due to unforeseen circumstances?",
        answer:
          "In cases of cancellation due to unforeseen circumstances such as weather, we will work with you on rescheduling or a refund according to our policy.",
      },
      {
        question: "Is my online payment information secure?",
        answer:
          "Yes, all online payments are processed through secure channels to protect your information.",
      },
      {
        question:
          "Who should I contact if I have questions regarding payments, invoices, or refunds?",
        answer:
          "Please contact our accounts department or your assigned booking consultant.",
      },
    ],
    "Support & Safety": [
      {
        question: "Do you provide 24/7 customer support during the tour?",
        answer: "Yes, our support team is available around the clock during your domestic tour.",
      },
      {
        question: "How can I contact your support team during my trip?",
        answer:
          "You will be provided with an emergency contact number and WhatsApp contact before your trip.",
      },
      {
        question: "Will a tour guide accompany us throughout the journey?",
        answer: "Yes, a tour guide or coordinator typically accompanies group domestic tours.",
      },
      {
        question: "What happens if the tour is delayed due to weather or road conditions?",
        answer:
          "We will adjust the itinerary as needed and keep you informed of any changes due to weather or road conditions.",
      },
      {
        question: "Are your tours safe for families with children?",
        answer: "Yes, our tours are designed with family safety and comfort in mind.",
      },
      {
        question: "Are your drivers experienced and licensed?",
        answer: "Yes, our drivers are experienced and properly licensed.",
      },
      {
        question: "Do you provide emergency contact numbers before the trip begins?",
        answer: "Yes, emergency contact numbers are shared before your trip begins.",
      },
      {
        question: "How will I receive updates if there are changes to the tour itinerary?",
        answer:
          "Updates are communicated via WhatsApp, SMS, or directly through your tour guide.",
      },
      {
        question: "Can my family contact your support team during my trip if needed?",
        answer:
          "Yes, your family can reach our support team for updates or assistance during your trip.",
      },
      {
        question: "What should I do if I have a complaint during the tour?",
        answer:
          "Please raise it with your tour guide or coordinator immediately so it can be addressed promptly; you can also contact our office directly.",
      },
      {
        question:
          "How does Al Buraq Global Travel & Tours ensure a safe and comfortable travel experience?",
        answer:
          "We work with vetted hotels and transport providers, licensed drivers, and on-ground support to ensure safety and comfort throughout your trip.",
      },
      {
        question:
          "Who should I contact if I need immediate assistance during my domestic tour?",
        answer: "Please use the emergency contact number provided to you before departure.",
      },
    ],
  },
};
