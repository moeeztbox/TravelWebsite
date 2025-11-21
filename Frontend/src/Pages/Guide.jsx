import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../Components/Guide/HeroSection'

function Guide() {
  const guideCards = [
    {
      title: "Umrah Guide",
      description: "Complete spiritual guidance for your Umrah journey with step-by-step rituals and prayers.",
      link: "/umrah-guide",
      icon: "🕋",
      color: "blue",
      background: "https://images.unsplash.com/photo-1547999451-7c004b13a7a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Ziyarat Guide",
      description: "Explore holy sites and historical landmarks in Makkah and Madinah with detailed insights.",
      link: "/ziyarat-guide",
      icon: "🕌",
      color: "green",
      background: "https://images.unsplash.com/photo-1591696205602-2f950c417dad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Travel Guide",
      description: "Essential travel information, preparation tips, and journey planning for pilgrims.",
      link: "/travel-guide",
      icon: "✈️",
      color: "amber",
      background: "https://images.unsplash.com/photo-1488085061387-422e29b40054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ]

  const colorStyles = {
    blue: {
      border: 'border-blue-200',
      hover: 'hover:border-blue-300',
      text: 'text-blue-600',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      overlay: 'bg-blue-900/10'
    },
    green: {
      border: 'border-green-200',
      hover: 'hover:border-green-300',
      text: 'text-green-600',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      overlay: 'bg-green-900/10'
    },
    amber: {
      border: 'border-amber-200',
      hover: 'hover:border-amber-300',
      text: 'text-amber-600',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      overlay: 'bg-amber-900/10'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      {/* Guide Cards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Sacred <span className="text-amber-600">Travel</span> Guides
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Expert guidance for Umrah, Ziyarat, and travel preparation to ensure your spiritual journey is seamless.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guideCards.map((card, index) => {
              const styles = colorStyles[card.color]

              return (
                <Link
                  key={index}
                  to={card.link}
                  className="group block"
                >
                  <div className={`
                    relative bg-white rounded-xl border-2 ${styles.border} ${styles.hover}
                    transition-all duration-500 ease-out h-full overflow-hidden
                    group-hover:shadow-lg group-hover:scale-105
                  `}>
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={card.background}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 ${styles.overlay} transition-opacity duration-300 group-hover:opacity-30`} />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/80" />

                    {/* Content */}
                    <div className="relative z-10 p-8 pb-6">
                      <div className={`w-16 h-16 rounded-2xl ${styles.iconBg} flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-md`}>
                        <span className={`text-2xl ${styles.iconColor}`}>{card.icon}</span>
                      </div>

                      {/* Content */}
                      <h3 className={`text-2xl font-semibold text-gray-900 mb-4 tracking-tight ${styles.text}`}>
                        {card.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-base">
                        {card.description}
                      </p>
                    </div>

                    {/* Footer with subtle CTA */}
                    <div className="relative z-10 px-8 py-6 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${styles.text}`}>
                          Explore Guide
                        </span>
                        <div className={`w-8 h-8 rounded-full ${styles.iconBg} flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-sm`}>
                          <svg className={`w-4 h-4 ${styles.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Subtle Call to Action */}
          <div className="text-center mt-16 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Need personalized guidance?{' '}
              <Link
                to="/contact-us"
                className="text-gray-700 hover:text-gray-900 font-medium underline underline-offset-4 transition-colors duration-200"
              >
                Speak with our experts
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Guide