import React from "react";
import {
  BadgeCheck,
  Car,
  Landmark,
  Plane,
  Ticket,
  BedDouble,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Simple Button component (self-contained)
function Button({ children, variant = "primary", size = "md", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none";
  const variants = {
    primary: "bg-yellow-600 text-white hover:bg-yellow-700",
    secondary: "bg-white text-yellow-600 border border-yellow-600 hover:bg-yellow-50",
    ghost: "bg-transparent text-yellow-600 hover:underline",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]}`} {...props}>
      {children}
    </button>
  );
}

// Updated Section wrapper with image support
function Section({ id, title, icon: Icon, children, imageUrl, imagePosition = "right", index }) {
  return (
    <section id={id} className="scroll-mt-28 py-16" aria-labelledby={`${id}-title`}>
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-8 lg:gap-12`}>
          {/* Image Section */}
          {imageUrl && (
            <div className="w-full lg:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}
          
          {/* Content Section */}
          <div className={`w-full ${imageUrl ? 'lg:w-1/2' : 'max-w-4xl'} flex items-start gap-6`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 ring-1 ring-yellow-100 shrink-0">
              <Icon className="h-6 w-6" aria-hidden />
            </div>
            <div className="flex-1">
              <h2 id={`${id}-title`} className="text-3xl font-bold text-gray-900">{title}</h2>
              <div className="mt-4 text-gray-700 space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionList({ items }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((it, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-yellow-600" />
          <span className="text-gray-700">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function FAQ({ faqs }) {
  return (
    <div className="mt-6 space-y-4">
      {faqs.map((f, i) => (
        <details key={i} className="rounded-md border border-gray-100 bg-white p-4">
          <summary className="cursor-pointer font-medium">{f.q}</summary>
          <p className="mt-2 text-gray-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export default function Services() {
  const navigate = useNavigate();
  const transportDetails = {
    overview:
      "We provide safe, reliable and comfortable transport across Makkah, Madinah and surrounding ziyarat sites. Our fleet includes private cars, minivans, and full-size AC coaches. Drivers are experienced, licensed, and briefed on religious sensitivities and local routes.",
    highlights: [
      "Airport pick-up & drop-off (Jeddah/Riyadh/Medinah)",
      "Private and shared options",
      "Dedicated groups and family transport",
      "Wheelchair-accessible vehicles on request",
      "Professional drivers with English/Arabic speakers",
    ],
    sampleItinerary:
      "Day 1: Arrival at Jeddah — transfer to Makkah hotel. Day 2: Visit Haram and local ziyarat. Day 3: Transfer to Madinah with stops at significant sites. Day 4: Departure from Madinah airport.",
    faqs: [
      {
        q: "Can you provide infant seats and assisted boarding?",
        a: "Yes — request infant or booster seats at booking. We also provide assistance for elderly or guests with mobility needs.",
      },
      {
        q: "Are drivers available 24/7 for transfers?",
        a: "Airport transfers are scheduled; on-demand services are available for an additional fee depending on availability.",
      },
    ],
    imageUrl: "/Luxury_pilgrim_transport_bus_3dadbe50.png"
  };

  const visaDetails = {
    overview:
      "Visa processing for Umrah/Haj can be confusing. We assist with the entire visa lifecycle: eligibility checks, document preparation, submission to authorized agencies, follow-up, and final authorization. We monitor changes to regulations and keep you informed.",
    highlights: [
      "Document checklist & verification",
      "Application submission and tracking",
      "Priority processing options",
      "Group visa handling for travel agencies or large families",
    ],
    notes:
      "Visa timelines vary by nationality and season. We recommend starting the process at least 4–6 weeks ahead of travel for standard processing; priority options may shorten this.",
    faqs: [
      { q: "What documents are required?", a: "Passport with 6+ months validity, passport photos, vaccination certificates (if required), and previous travel history where applicable." },
      { q: "Can you handle group visas?", a: "Yes — we have processes to handle groups with a single coordinator for smoother applications." },
    ],
    imageUrl: "/Visa_documents_professional_photography_a0d3bfb0.png"
  };

  const ticketDetails = {
    overview:
      "We search multiple global and local carriers to find the best fares and routing for your Umrah/Haj travel. Whether you need round-trip, multi-city, or flexible tickets, our booking team negotiates to offer value and convenience.",
    highlights: ["Multi-city routing (e.g., Jeddah → Makkah → Madinah → Home)", "Flexible/changeable fares", "Group booking discounts", "Travel insurance add-ons"],
    pricingNotes:
      "Airfares change frequently; prices quoted are usually valid for a limited time. We recommend confirming and securing seats as early as possible, especially during high season (Ramadan, Hajj windows).",
    faqs: [
      { q: "Can I reserve before payment?", a: "We can hold limited reservations for a short window depending on airline rules; full payment is required to ticket." },
      { q: "Do you include travel insurance?", a: "We offer insurance as an add-on during booking and can recommend plans suited for pilgrims.", },
    ],
    imageUrl: "/Airline_tickets_and_boarding_2ed6da07.png"
  };

  const hotelsDetails = {
    overview:
      "We partner with hotels near Haram in Makkah and near Masjid an-Nabawi in Madinah, ranging from budget-friendly to premium hotels with Haram views. Choose proximity, room types, and meal plans when booking.",
    highlights: ["Near‑Haram options", "Breakfast and half-board choices", "Group & family rooms", "Special requests (adjacent rooms, baby cots)"],
    sample: "Example: 3 nights in Makkah (near Haram) + 3 nights in Madinah (near Prophet's Mosque) with daily breakfast and optional guided ziyarat tours.",
    faqs: [
      { q: "How close are the hotels to the Haram?", a: "We categorize hotels by walking distance: within 3 minutes, 5–10 minutes, and shuttle-access hotels. You can filter by walking time during booking." },
      { q: "Are rooms halal‑certified / family friendly?", a: "All partner hotels are family-friendly and respect religious practices; we confirm specifics at booking.", },
    ],
    imageUrl: "/Luxury_hotel_room_interior_1b56bb77.png"
  };

  const ziawratDetails = {
    overview:
      "Guided ziyarat packages connect you to the most important historical and spiritual sites in and around Makkah and Madinah. Our guides are knowledgeable in history and offer respectful, educational tours.",
    highlights: ["Licensed guides", "Small-group and private options", "Customizable durations", "Combination with transport and meals"],
    sampleStops:
      "Masjid al-Haram viewpoints, Mount Arafat vicinity, Jabal al-Nour, Quba Mosque, Qiblatain, Uhud — itineraries depend on the package length.",
    faqs: [
      { q: "Can we customize the ziyarat schedule?", a: "Yes — we design bespoke schedules according to your religious preferences and energy levels." },
      { q: "Are English-speaking guides available?", a: "Yes — we have multilingual guides; specify language requirements at booking." },
    ],
    imageUrl: "/Ziyarat_historical_Islamic_sites_b37dcfef.png"
  };

  const sections = [
    { id: "transport", title: "Transport", icon: Car, data: transportDetails },
    { id: "visa", title: "Visa", icon: BadgeCheck, data: visaDetails },
    { id: "ticket", title: "Ticket", icon: Ticket, data: ticketDetails },
    { id: "hotels", title: "Hotels", icon: BedDouble, data: hotelsDetails },
    { id: "ziawrat", title: "Ziawrat", icon: Landmark, data: ziawratDetails },
  ];

  return (
    <main className="min-h-screen bg-[#F5F7F8] text-gray-900">
      {/* Top Hero */}
      <header className="bg-yellow-600">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">Hassle‑free Haj &amp; Umrah Services</h1>
            <p className="mt-4 text-yellow-100/90 text-lg">Visas, flights, hotels, transport and guided ziyarat — planned with care so you can focus on your ibadah.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="inline-block">
                  <Button variant="secondary" size="md">{s.title}</Button>
                </a>
              ))}
              <a href="mailto:info@example.com" className="inline-block">
                <Button variant="ghost">Contact Us</Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky quick nav for desktop */}
      <div className="container mx-auto px-4 py-6">
        <div className="hidden md:flex items-start gap-6">
          {/* <nav className="sticky top-20 h-[60vh] w-48 shrink-0 rounded-md bg-white p-4 shadow">
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block rounded px-2 py-1 text-sm text-gray-700 hover:text-yellow-600">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav> */}

          <div className="flex-1">
            {/* Sections with alternating images */}
            {sections.map((s, index) => (
              <Section 
                key={s.id} 
                id={s.id} 
                title={s.title} 
                icon={s.icon}
                imageUrl={s.data.imageUrl}
                imagePosition={index % 2 === 0 ? "right" : "left"}
                index={index}
              >
                <p className="text-gray-700">{s.data.overview}</p>

                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900">What we provide</h3>
                  <div className="mt-3">
                    <SectionList items={s.data.highlights} />
                  </div>
                </div>

                {s.data.sampleItinerary && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900">Sample Itinerary</h3>
                    <p className="mt-2 text-gray-700">{s.data.sampleItinerary}</p>
                  </div>
                )}

                {s.data.pricingNotes && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900">Pricing & Notes</h3>
                    <p className="mt-2 text-gray-700">{s.data.pricingNotes}</p>
                  </div>
                )}

                {s.data.notes && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900">Important Notes</h3>
                    <p className="mt-2 text-gray-700">{s.data.notes}</p>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900">Frequently Asked Questions</h3>
                  <FAQ faqs={s.data.faqs} />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      // Prevent hash links / scroll-jumps and navigate explicitly.
                      e.preventDefault();
                      e.stopPropagation();
                      const map = {
                        transport: { path: "/booking", tab: "transport", label: "Book your transport" },
                        visa: { path: "/booking", tab: "visa", label: "Book your visa" },
                        ticket: { path: "/booking", tab: "flights", label: "Book your tickets" },
                        hotels: { path: "/booking", tab: "hotels", label: "Book your hotels" },
                        ziawrat: { path: "/ziyarat-guide", tab: "", label: "View ziyarat guide" },
                      };
                      const dest = map[s.id];
                      if (!dest) {
                        navigate("/services");
                        return;
                      }
                      if (dest.tab) navigate(`${dest.path}?tab=${dest.tab}`);
                      else navigate(dest.path);
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-yellow-600 text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    {s.id === "ticket"
                      ? "Book your tickets"
                      : s.id === "visa"
                        ? "Book your visa"
                        : s.id === "hotels"
                          ? "Book your hotels"
                          : s.id === "transport"
                            ? "Book your transport"
                            : "Continue"}
                  </button>
                </div>

                <div className="mt-12 border-t pt-8">
                  <h4 className="font-semibold">Related services</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-gray-700 ring-1 ring-gray-100">
                      <Clock className="h-4 w-4 text-gray-500" /> 24/7 Support
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-gray-700 ring-1 ring-gray-100">
                      <Plane className="h-4 w-4 text-gray-500" /> Flight Assistance
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-gray-700 ring-1 ring-gray-100">
                      <Landmark className="h-4 w-4 text-gray-500" /> Guided Ziyarat
                    </span>
                  </div>
                </div>
              </Section>
            ))}

            {/* Final CTA */}
            <div className="mt-12 rounded-xl bg-yellow-600 text-white p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">Ready to plan your journey?</h2>
                  <p className="mt-2 text-yellow-100/90">Tell us your travel window and preferences — we'll craft the perfect Haj/Umrah package.</p>
                </div>
                <div className="flex gap-3">
                  <a href="mailto:info@example.com">
                    <Button size="lg" variant="primary">Contact Us</Button>
                  </a>
                  <a href="/">
                    <Button size="lg" variant="secondary">Back to Home</Button>
                  </a>
                </div>
              </div>
            </div>

            <div className="h-24" />
          </div>
        </div>

        {/* Mobile nav (bottom) */}
        <div className="mt-8 md:hidden">
          <div className="overflow-x-auto">
            <div className="flex gap-3 py-2">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`}> 
                  <Button variant="secondary" size="sm">{s.title}</Button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8 text-sm text-gray-600">
          © {new Date().getFullYear()} Haj &amp; Umrah Services — All rights reserved. Email: info@example.com
        </div>
      </footer>
    </main>
  );
}