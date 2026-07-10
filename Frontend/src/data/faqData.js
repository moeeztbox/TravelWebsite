// Central data source for the FAQ page: categories, per-category sidebar
// items, and the FAQ question/answer content shown for each selection.

export const CATEGORIES = [
  { id: "general", label: "General Questions" },
  { id: "hajj", label: "Hajj" },
  { id: "umrah", label: "Umrah" },
  { id: "international-tours", label: "International Tours" },
  { id: "domestic-tours", label: "Domestic Tours" },
  { id: "study-visa", label: "Study Visa" },
];

export const SIDEBAR_ITEMS = {
  hajj: [
    "Visa Questions",
    "Payments",
    "Hotels",
    "Transportation",
    "Flights",
    "Support & Safety",
    "General Hajj",
  ],
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
  "study-visa": [
    "University Admission",
    "Visa Questions",
    "Documentation",
    "Payments",
    "Scholarships",
    "Support",
  ],
};

// Unchanged - this is the original FAQ list that has always powered the
// General Questions view.
export const GENERAL_FAQS = [
  {
    question: "What is the difference between Hajj and Umrah?",
    answer:
      "Hajj is the major pilgrimage performed during specific dates (8-12 Dhul Hijjah), while Umrah can be performed any time throughout the year. Hajj is one of the five pillars of Islam and mandatory for those who are physically and financially able, whereas Umrah is a recommended but not obligatory pilgrimage.",
  },
  {
    question: "How far in advance should I book my pilgrimage?",
    answer:
      "For Hajj, we recommend booking 6-12 months in advance due to limited quotas. For Umrah, booking 2-3 months ahead ensures better accommodation options and competitive prices, though last-minute bookings are often possible.",
  },
  {
    question: "What age restrictions apply for Hajj and Umrah?",
    answer:
      "There are no specific age restrictions, but children under 18 must be accompanied by a guardian. Elderly pilgrims should consult their doctors before traveling. We provide special assistance for senior citizens and families with young children.",
  },
  {
    question: "What documents do I need for Hajj/Umrah visa?",
    answer:
      "You need a valid passport (minimum 6 months validity), recent passport-sized photos, vaccination certificates (meningitis, COVID-19), marriage certificate (for couples), and birth certificates (for children). Our team will guide you through the complete documentation process.",
  },
  {
    question: "How long does visa processing take?",
    answer:
      "Typically 7-15 working days for Umrah visas and 15-30 days for Hajj visas. Our fast-track service can reduce this to 3-7 days for urgent cases with additional fees.",
  },
  {
    question: "What if my visa gets rejected?",
    answer:
      "We offer a 100% money-back guarantee on visa rejection. Our expert team has a 99.8% success rate, and we pre-screen all applications to minimize rejection risks.",
  },
  {
    question: "What is included in your packages?",
    answer:
      "Our packages include visa processing, flights, accommodation near Haram, local transportation, meals, guided tours, 24/7 support, and religious guidance. Specific inclusions vary by package tier (Economy, Standard, Premium, VIP).",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes, we offer flexible payment options including installments over 6-12 months with 0% interest. You can pay via bank transfer, debit/credit cards, or visit our office for cash payments.",
  },
  {
    question: "Can I customize my package?",
    answer:
      "Absolutely! We offer customizable packages to suit your preferences for accommodation level, flight timings, group size, and additional services like private transportation or extended stays.",
  },
  {
    question: "How close are your hotels to the Haram?",
    answer:
      "Our hotels are strategically located within 200-800 meters walking distance from both Masjid al-Haram in Makkah and Masjid an-Nabawi in Madinah. Premium packages offer closer accommodations.",
  },
  {
    question: "What airline do you use for flights?",
    answer:
      "We partner with reputable airlines including Saudi Airlines, PIA, Emirates, and Qatar Airways. Flight options depend on your package selection and departure city.",
  },
  {
    question: "Are meals provided during the journey?",
    answer:
      "Yes, we provide halal meals throughout your stay. Breakfast and dinner are typically included, with options for lunch depending on your package. Special dietary requirements can be accommodated with advance notice.",
  },
  {
    question: "Do you provide guides during the pilgrimage?",
    answer:
      "Yes, our experienced religious guides accompany all groups. They provide step-by-step guidance for rituals, historical insights, and ensure you complete your pilgrimage correctly according to Islamic teachings.",
  },
  {
    question: "What support is available in case of emergencies?",
    answer:
      "We have 24/7 emergency support with local representatives in Saudi Arabia. Our team assists with medical emergencies, lost documents, accommodation issues, and any other urgent needs.",
  },
  {
    question: "Can you help with special needs or disabilities?",
    answer:
      "Yes, we provide special assistance for elderly pilgrims, wheelchair users, and those with medical conditions. This includes priority boarding, accessible accommodations, and dedicated support staff.",
  },
];

export const FAQ_DATA = {
  hajj: {
    "Visa Questions": [
      {
        question: "How do I apply for a Hajj visa?",
        answer:
          "Hajj visas are issued exclusively through the official Nusuk platform and Saudi-approved Hajj operators like us. We handle the full application on your behalf once your Hajj package is confirmed.",
      },
      {
        question: "What documents are required for a Hajj visa?",
        answer:
          "You'll need a valid passport (at least 6 months validity beyond your travel dates), recent passport photos, a meningitis vaccination certificate, and proof of your confirmed Hajj package booking. Married couples should also provide a marriage certificate.",
      },
      {
        question: "When should I apply for my Hajj visa?",
        answer:
          "Hajj visa applications typically open a few months before the season and close once the national quota is filled, so we recommend booking your package at least 6-8 months in advance to secure your visa slot.",
      },
    ],
    Payments: [
      {
        question: "What payment methods do you accept for Hajj packages?",
        answer:
          "We accept bank transfers, debit/credit cards, and in-office cash payments. A deposit secures your booking, with the balance payable according to an installment schedule agreed at the time of booking.",
      },
      {
        question: "Can I pay for my Hajj package in installments?",
        answer:
          "Yes, we offer interest-free installment plans of up to 10 months for Hajj packages, letting you spread the cost ahead of the pilgrimage season.",
      },
      {
        question: "Is my Hajj payment refundable if I need to cancel?",
        answer:
          "Refunds are handled per our Cancellation and Refund Policy. Since Hajj visa and hotel allocations are booked in bulk against fixed national quotas, cancellation charges are generally higher closer to the travel date.",
      },
    ],
    Hotels: [
      {
        question: "How close are Hajj hotels to the Haramain?",
        answer:
          "Depending on your package tier, our Makkah and Madinah hotels are located between 200 meters and 2 kilometers from Masjid al-Haram and Masjid an-Nabawi, with shuttle service provided for hotels farther from the mosques.",
      },
      {
        question: "Are Hajj hotel rooms shared or private?",
        answer:
          "Standard packages include shared rooms (triple or quad occupancy), while Premium and VIP packages offer private double or single rooms. Room configuration is confirmed at the time of booking.",
      },
      {
        question: "What facilities are included in Hajj accommodation?",
        answer:
          "All our Hajj hotels provide air conditioning, daily housekeeping, halal meals, and 24/7 front-desk support, with Premium and VIP tiers adding extras like Haram-view rooms and executive lounges.",
      },
    ],
    Transportation: [
      {
        question:
          "How do I travel between Makkah, Madinah, and Mina/Arafat during Hajj?",
        answer:
          "We provide air-conditioned coach transportation for all inter-city transfers and for the Mina, Muzdalifah, and Arafat rituals, coordinated by our on-ground team throughout the Hajj days.",
      },
      {
        question: "Is airport transfer included in the Hajj package?",
        answer:
          "Yes, all Hajj packages include return airport transfers in Saudi Arabia between the Jeddah/Madinah airport and your hotel.",
      },
      {
        question:
          "Do you provide transportation for elderly or disabled pilgrims during the rituals?",
        answer:
          "Yes, we arrange wheelchair-accessible transport and priority seating for elderly and disabled pilgrims during all Hajj movements, including the Jamarat and Arafat stages.",
      },
    ],
    Flights: [
      {
        question: "Which airlines do you use for Hajj travel?",
        answer:
          "We work with Saudi Airlines, PIA, Emirates, Qatar Airways, and other reputable carriers for Hajj flights, with specific airlines depending on your departure city and package.",
      },
      {
        question: "Are flights included in the Hajj package price?",
        answer:
          "Yes, return international flights are included in all our Hajj packages unless you select a land-only (flight-excluded) option for pilgrims already in Saudi Arabia.",
      },
      {
        question: "Can I choose my own flight dates for Hajj?",
        answer:
          "Hajj flight dates are largely fixed by group departure schedules and Saudi authority timings, but we try to accommodate reasonable requests for early arrival or delayed return where seats allow.",
      },
    ],
    "Support & Safety": [
      {
        question: "What safety measures are in place during Hajj?",
        answer:
          "Our teams monitor crowd density at all ritual sites, provide wristbands with emergency contact details, and maintain 24/7 coordination with Saudi civil defense and Hajj authorities throughout the pilgrimage.",
      },
      {
        question: "Is there emergency medical support during Hajj?",
        answer:
          "Yes, we have first-aid trained staff on-site and direct coordination with Saudi Ministry of Health facilities near Makkah, Madinah, Mina, and Arafat for any medical emergency.",
      },
      {
        question: "What if I get separated from my group during Hajj?",
        answer:
          "Every pilgrim receives a group ID card and wristband with our 24/7 helpline number. Our field coordinators are trained to quickly reunite separated pilgrims with their group.",
      },
    ],
    "General Hajj": [
      {
        question:
          "What is the difference between Hajj packages (Economy, Standard, Premium, VIP)?",
        answer:
          "Packages differ mainly in hotel proximity to the Haramain, room occupancy, and transportation comfort. Economy offers shared rooms farther from the mosques, while VIP provides private rooms within walking distance and premium services throughout.",
      },
      {
        question: "Do I need a Mahram to perform Hajj?",
        answer:
          "Saudi regulations require women traveling for Hajj to be accompanied by a Mahram (a close male relative) or travel as part of an authorized women's group, depending on current Ministry of Hajj rules. Our team can confirm the latest requirements when you book.",
      },
      {
        question: "How physically demanding is Hajj?",
        answer:
          "Hajj involves extended walking and standing, including the Tawaf, Sa'i, and the stoning ritual at Jamarat, so we recommend pilgrims build up general fitness beforehand. Wheelchairs and mobility assistance are available for those who need them.",
      },
    ],
  },
  umrah: {
    "Visa Questions": [
      {
        question: "How do I get an Umrah visa?",
        answer:
          "Umrah visas are issued electronically through the Nusuk platform once your package is confirmed with us. We handle the application, and most visas are approved within 7-15 working days.",
      },
      {
        question: "What documents are needed for an Umrah visa?",
        answer:
          "A passport valid for at least 6 months, a recent passport-sized photo, and a meningitis vaccination certificate are required. Children need a birth certificate and married couples should provide a marriage certificate.",
      },
      {
        question: "Can I get an Umrah visa on short notice?",
        answer:
          "Yes, our fast-track service can process Umrah visas in as little as 3-5 working days for an additional fee, subject to availability.",
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
        question: "How far are Umrah hotels from the Haram?",
        answer:
          "Umrah hotels range from 100 meters to about 1.5 kilometers from Masjid al-Haram and Masjid an-Nabawi depending on your package, with closer options available in our Premium and VIP tiers.",
      },
      {
        question: "Can I choose my own hotel for Umrah?",
        answer:
          "Yes, when customizing your package you can select from our list of partner hotels in Makkah and Madinah based on your preferred distance to the Haram and budget.",
      },
      {
        question: "Are meals included in Umrah hotel stays?",
        answer:
          "Most Umrah packages include daily breakfast, with half-board (breakfast and dinner) options available as an upgrade on Standard, Premium, and VIP packages.",
      },
    ],
    Transportation: [
      {
        question: "How do I travel between Makkah and Madinah for Umrah?",
        answer:
          "We arrange comfortable air-conditioned coach transfers between Makkah and Madinah as part of every Umrah package, with the journey typically taking around 4-5 hours by road.",
      },
      {
        question: "Is airport pickup included in Umrah packages?",
        answer:
          "Yes, return airport transfers in Saudi Arabia are included in all Umrah packages, from Jeddah or Madinah airport to your hotel and back.",
      },
      {
        question: "Can I request private transportation during Umrah?",
        answer:
          "Yes, private car or van transportation is available as an upgrade for pilgrims who prefer a more flexible, personal schedule during their Umrah journey.",
      },
    ],
    Flights: [
      {
        question: "Which airlines fly for Umrah packages?",
        answer:
          "We book Umrah flights with major carriers including Saudi Airlines, PIA, Emirates, and Qatar Airways, with options depending on your departure city and travel dates.",
      },
      {
        question: "Can I choose my Umrah travel dates freely?",
        answer:
          "Yes, unlike Hajj, Umrah can be performed at any time of the year, so you can select travel dates that suit your schedule, subject to flight and hotel availability.",
      },
      {
        question: "Is it cheaper to travel for Umrah during off-peak seasons?",
        answer:
          "Yes, flight and hotel prices for Umrah are generally lower outside Ramadan and school holiday periods, so traveling in off-peak months can reduce your overall package cost.",
      },
    ],
    "Support & Safety": [
      {
        question: "Is there local support during my Umrah trip?",
        answer:
          "Yes, our representatives are available in Makkah and Madinah throughout your stay to assist with rituals, hotel issues, or any unexpected needs.",
      },
      {
        question: "What happens if I feel unwell during Umrah?",
        answer:
          "Our team can direct you to nearby pharmacies, clinics, or hospitals and will assist with coordination if hospital care is needed. We recommend travel insurance for added protection.",
      },
      {
        question: "Do you provide guidance for first-time Umrah pilgrims?",
        answer:
          "Yes, our experienced guides accompany groups to walk first-timers through each ritual step by step, from Ihram to Tawaf and Sa'i, ensuring everything is performed correctly.",
      },
    ],
    "General Umrah": [
      {
        question: "How long does an Umrah trip usually take?",
        answer:
          "Most Umrah packages run 7-14 days, covering time in both Makkah and Madinah, though shorter express and longer extended-stay options are also available.",
      },
      {
        question: "What is included in a standard Umrah package?",
        answer:
          "A standard package typically includes visa processing, return flights, hotel accommodation, airport and inter-city transportation, and guided ritual assistance.",
      },
      {
        question: "Can I combine Umrah with sightseeing in Saudi Arabia?",
        answer:
          "Yes, several of our packages include optional Ziyarat tours to historical Islamic sites in Makkah and Madinah, and we can arrange extended stays for those wanting to explore further.",
      },
    ],
  },
  "international-tours": {
    Packages: [
      {
        question:
          "What international destinations do you offer tour packages for?",
        answer:
          "We offer curated tour packages to a range of international destinations, including popular spots across Asia, Europe, and the Middle East, with itineraries tailored for families, couples, and groups.",
      },
      {
        question: "Can international tour packages be customized?",
        answer:
          "Yes, we can tailor hotel category, itinerary length, sightseeing inclusions, and group size to match your preferences and budget.",
      },
      {
        question: "Do international packages include guided tours?",
        answer:
          "Most packages include a local guide for key attractions, with fully escorted options available for travelers who prefer a guide throughout the entire trip.",
      },
    ],
    "Visa Questions": [
      {
        question: "Do you assist with visas for international tours?",
        answer:
          "Yes, we provide complete visa application support for our international tour destinations, including document checklists, appointment booking, and submission guidance.",
      },
      {
        question: "What documents are typically needed for a tourist visa?",
        answer:
          "Requirements vary by country but generally include a valid passport, passport photos, bank statements, travel itinerary, and hotel bookings. Our team provides the exact checklist for your destination.",
      },
      {
        question: "How long does international tourist visa processing take?",
        answer:
          "Processing times vary by country, typically ranging from 5 to 20 working days, so we recommend applying at least 4-6 weeks before your travel date.",
      },
    ],
    Flights: [
      {
        question: "Are international flights included in tour packages?",
        answer:
          "Yes, return international flights are included in our standard tour packages, with airline options depending on your destination and departure city.",
      },
      {
        question: "Can I upgrade my flight class for an international tour?",
        answer:
          "Yes, business and premium economy upgrades are available for most international tour packages at an additional cost.",
      },
      {
        question:
          "Do you help with flight rebooking if my travel dates change?",
        answer:
          "Yes, our team can assist with rebooking, subject to airline fare rules and any applicable change fees.",
      },
    ],
    Hotels: [
      {
        question: "What star-rating hotels are used for international tours?",
        answer:
          "Our packages typically feature 3 to 5-star hotels depending on the tier selected, all vetted for location, cleanliness, and guest reviews.",
      },
      {
        question: "Can I request a specific hotel for my international tour?",
        answer:
          "Yes, if you have a preferred hotel we can check availability and adjust your package accordingly, subject to price differences.",
      },
      {
        question:
          "Are breakfasts included in international tour hotel stays?",
        answer:
          "Yes, daily breakfast is included in all our international tour packages, with half-board or full-board options available as upgrades on select itineraries.",
      },
    ],
    Transportation: [
      {
        question: "How do I get around during an international tour?",
        answer:
          "Ground transportation, including airport transfers and inter-city travel by private coach or car, is included throughout your itinerary.",
      },
      {
        question:
          "Is transportation between cities included in multi-city tours?",
        answer:
          "Yes, all inter-city transfers specified in your itinerary, whether by coach, train, or domestic flight, are arranged and included in the package price.",
      },
      {
        question:
          "Can I arrange private transportation for an international tour?",
        answer:
          "Yes, private car and driver options are available as an upgrade for travelers wanting a more flexible, personalized schedule.",
      },
    ],
    Payments: [
      {
        question: "What payment methods do you accept for international tours?",
        answer:
          "We accept bank transfers, debit/credit cards, and office cash payments, with a deposit required to confirm your booking and the balance due before departure.",
      },
      {
        question: "Can I pay for an international tour in installments?",
        answer:
          "Yes, installment plans are available for most international tour packages, typically spread over 3-6 months depending on the trip cost and departure date.",
      },
      {
        question: "What is your refund policy for international tours?",
        answer:
          "Refunds are processed according to our Cancellation and Refund Policy, with the refundable amount depending on supplier cancellation terms and how close to departure you cancel.",
      },
    ],
    "Support & Safety": [
      {
        question: "Is 24/7 support available during international tours?",
        answer:
          "Yes, our support team is reachable 24/7 during your trip for any assistance, from itinerary changes to emergencies.",
      },
      {
        question: "Do you recommend travel insurance for international tours?",
        answer:
          "Yes, we strongly recommend travel insurance for all international trips and can help arrange coverage for medical emergencies, trip cancellation, and lost luggage.",
      },
      {
        question:
          "What happens if there's a travel disruption during my international tour?",
        answer:
          "Our team monitors your itinerary and will assist with rebooking flights, adjusting hotel stays, or rearranging activities in the event of delays, cancellations, or other disruptions.",
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
        question: "What type of hotels are used for domestic tours?",
        answer:
          "We partner with well-reviewed 3 to 5-star hotels and resorts for domestic tours, selected for comfort, location, and value.",
      },
      {
        question: "Is breakfast included in domestic tour hotel stays?",
        answer:
          "Yes, daily breakfast is included in all domestic tour packages, with meal upgrades available on request.",
      },
      {
        question: "Can I request a specific room type for a domestic tour?",
        answer:
          "Yes, you can request room preferences such as twin, double, or family rooms when booking, subject to hotel availability.",
      },
    ],
    Transportation: [
      {
        question: "Is transportation included in domestic tour packages?",
        answer:
          "Yes, all domestic tour packages include ground transportation for sightseeing and inter-city travel as outlined in the itinerary.",
      },
      {
        question: "Do you provide private transportation for domestic tours?",
        answer:
          "Yes, private car and driver services are available as an upgrade for travelers who prefer a more flexible schedule.",
      },
      {
        question:
          "How comfortable is the transportation used for domestic tours?",
        answer:
          "We use air-conditioned coaches or private vehicles depending on group size, all maintained to a high standard for comfort on longer journeys.",
      },
    ],
    Payments: [
      {
        question: "What payment options are available for domestic tours?",
        answer:
          "We accept bank transfers, debit/credit cards, and cash payments at our office, with a deposit confirming your booking.",
      },
      {
        question: "Can I pay for a domestic tour in installments?",
        answer:
          "Yes, short-term installment plans are available for domestic tour packages, typically spread over 2-3 months.",
      },
      {
        question: "What is the refund policy for domestic tours?",
        answer:
          "Refunds follow our standard Cancellation and Refund Policy, with amounts depending on how close to departure the cancellation is made.",
      },
    ],
    "Support & Safety": [
      {
        question: "Is support available during domestic tours?",
        answer:
          "Yes, our team remains reachable throughout your trip for any assistance or itinerary adjustments needed.",
      },
      {
        question: "Are domestic tour destinations safe for solo travelers?",
        answer:
          "Yes, our domestic tour destinations are selected with safety in mind, and our guides and local coordinators provide additional support for solo travelers.",
      },
      {
        question: "What safety measures are followed during domestic tours?",
        answer:
          "We use vetted transportation providers and accommodations, and our field staff are on hand throughout the trip to assist with any safety concerns.",
      },
    ],
  },
  "study-visa": {
    "University Admission": [
      {
        question: "Do you help with university admissions abroad?",
        answer:
          "Yes, we assist students in selecting suitable universities and programs, preparing applications, and meeting admission requirements for study destinations abroad.",
      },
      {
        question: "How do you choose the right university for me?",
        answer:
          "We consider your academic background, budget, preferred field of study, and career goals to recommend universities and programs that best match your profile.",
      },
      {
        question: "What is the typical timeline for university admission processing?",
        answer:
          "Admission processing timelines vary by university and country, generally taking 4-12 weeks from application submission to offer letter.",
      },
    ],
    "Visa Questions": [
      {
        question: "What documents are needed for a study visa application?",
        answer:
          "Typical requirements include a university offer letter, proof of funds, academic transcripts, passport, and language proficiency test results. Exact requirements vary by country.",
      },
      {
        question: "How long does a study visa take to process?",
        answer:
          "Study visa processing generally takes 4-8 weeks depending on the destination country, so we recommend applying as soon as you receive your university offer letter.",
      },
      {
        question: "What happens if my study visa is rejected?",
        answer:
          "We review the rejection reason with you and, where possible, assist with a re-application addressing the concerns raised, or explore alternative study destinations.",
      },
    ],
    Documentation: [
      {
        question:
          "What documentation do I need to prepare for a study visa application?",
        answer:
          "You'll need your passport, academic transcripts and certificates, university offer letter, financial statements, and often a statement of purpose. Our team provides a full checklist for your destination.",
      },
      {
        question: "Do you help translate or attest my academic documents?",
        answer:
          "Yes, we assist with document translation, attestation, and notarization services required for study visa applications.",
      },
      {
        question: "How far in advance should I start preparing my documents?",
        answer:
          "We recommend starting document preparation at least 3-4 months before your intended intake to allow time for attestation, translation, and any required testing.",
      },
    ],
    Payments: [
      {
        question:
          "How do I pay university tuition fees through your service?",
        answer:
          "We guide you through the official payment channels required by your university, whether that's a bank transfer, online portal payment, or a designated fee collection partner.",
      },
      {
        question: "Do you charge a service fee for study visa assistance?",
        answer:
          "Yes, our service fee covers university application support, visa guidance, and documentation assistance. The exact fee depends on your chosen destination and service package.",
      },
      {
        question: "Are payment plans available for study visa services?",
        answer:
          "Yes, we offer installment options for our study visa service fees, though university tuition payments follow the institution's own payment schedule.",
      },
    ],
    Scholarships: [
      {
        question: "Can you help me find scholarships for studying abroad?",
        answer:
          "Yes, we help identify merit-based, need-based, and university-specific scholarships you may be eligible for, and assist with preparing scholarship applications.",
      },
      {
        question: "Do scholarships cover the full cost of studying abroad?",
        answer:
          "Some scholarships cover full tuition and living costs, while others are partial. We'll help you understand what each scholarship covers so you can plan your budget accordingly.",
      },
      {
        question: "What are the eligibility requirements for scholarships?",
        answer:
          "Eligibility varies by scholarship but often includes minimum academic grades, language proficiency scores, and sometimes financial need. We'll match you with scholarships you qualify for.",
      },
    ],
    Support: [
      {
        question: "What support do you provide after my study visa is approved?",
        answer:
          "We assist with pre-departure briefings, accommodation guidance, and travel arrangements to help you settle in smoothly once your visa is approved.",
      },
      {
        question: "Do you provide support once I arrive in my study destination?",
        answer:
          "Yes, we offer guidance on initial settling-in steps such as bank account setup, local registration, and connecting with student support services at your university.",
      },
      {
        question: "Can I get help with accommodation near my university?",
        answer:
          "Yes, we can guide you toward on-campus housing options or trusted off-campus accommodation providers near your university.",
      },
    ],
  },
};
