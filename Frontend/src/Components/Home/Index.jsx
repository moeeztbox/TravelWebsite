import React from 'react';
import { Star, Heart, MapPin, Phone, Mail, Globe, Shield, Users, Award, Quote, Camera, CheckCircle } from 'lucide-react';
import Reviews from "./Reviews"

export default function ReviewsParallax() {
  return (
    <main>
      <article>
        {/* Section 1 - Featured Customer Story */}
        <section className="sticky top-0">
          <Reviews />
        </section>

        {/* Section 2 - Multiple Reviews Grid */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 text-black grid place-content-center h-screen sticky top-0 rounded-tr-3xl rounded-tl-3xl overflow-hidden ">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.2) 1px, transparent 0)`,
                backgroundSize: '45px 45px'
              }}
            />
          </div>

          <div className="text-center px-6 max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[110%] mb-4">
                <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  15,000+
                </span>
                <br />
                Happy Pilgrims
              </h1>
              <p className="text-gray-600 text-xl">Stories that inspire faith</p>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Review 1 */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-yellow-200 hover:border-yellow-400 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    MH
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">Muhammad Hassan</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "Exceptional service from start to finish. The visa process was so smooth, and our guide in Makkah was incredibly knowledgeable."
                </p>
              </div>

              {/* Review 2 */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-blue-200 hover:border-blue-400 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold">
                    AK
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">Ayesha Khan</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "My first Umrah was perfect thanks to Al-Noor. The hotel was so close to Haram, and the 24/7 support gave me peace of mind."
                </p>
              </div>

              {/* Review 3 */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-yellow-200 hover:border-yellow-400 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                    AR
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">Ali Rahman</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "Professional, reliable, and caring. They made our family Hajj journey unforgettable. Highly recommended!"
                </p>
              </div>

              {/* Review 4 */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-blue-200 hover:border-blue-400 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center text-black font-bold">
                    SK
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">Saima Khan</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "Everything was arranged perfectly. The food, accommodation, and transportation exceeded our expectations."
                </p>
              </div>

              {/* Review 5 */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-yellow-200 hover:border-yellow-400 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    IH
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">Imran Hussain</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "Al-Noor made my elderly parents' Hajj dream come true. Special care and attention throughout the journey."
                </p>
              </div>

              {/* Review 6 */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-blue-200 hover:border-blue-400 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold">
                    ZA
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">Zainab Ali</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "Best decision ever! The group was wonderful, guides were helpful, and every arrangement was top-notch."
                </p>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">4.9/5</div>
                <div className="text-gray-400">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">15,000+</div>
                <div className="text-gray-400">Happy Pilgrims</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">100%</div>
                <div className="text-gray-400">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Video Testimonials Style */}
        <section className="bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 text-black grid place-content-center h-screen sticky top-0 rounded-tr-3xl rounded-tl-3xl overflow-hidden ">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.2) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          <div className="text-center px-6 max-w-6xl mx-auto relative z-10">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Camera className="w-8 h-8 text-yellow-600" />
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[110%] mb-4">
                Captured <br />
                <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  Moments
                </span>
                <br />of Faith
              </h1>
              <p className="text-gray-600 text-xl">Pilgrims sharing their sacred experiences</p>
            </div>

            {/* Video-Style Testimonials */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Video Testimonial 1 */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-black">Dr. Ahmed Rashid</h4>
                    <p className="text-black/70 text-sm">Islamabad • Hajj 2024</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-black fill-black" />
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <blockquote className="text-gray-800 leading-relaxed italic text-lg mb-4">
                    "The organization was flawless. Every prayer time, every meal, every transport - perfectly coordinated. Al-Noor truly understands the spiritual significance of this journey."
                  </blockquote>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>📍 Makkah, Saudi Arabia</span>
                    <span>⭐ Verified Review</span>
                  </div>
                </div>
              </div>

              {/* Video Testimonial 2 */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-white">Mariam Siddique</h4>
                    <p className="text-white/80 text-sm">Lahore • Umrah 2024</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-white fill-white" />
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <blockquote className="text-gray-800 leading-relaxed italic text-lg mb-4">
                    "As a solo female traveler, I felt completely safe and supported. The female guide was amazing, and the group became like family."
                  </blockquote>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>📍 Madinah, Saudi Arabia</span>
                    <span>⭐ Verified Review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Achievement */}
            <div className="mt-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 max-w-md mx-auto">
              <div className="text-center">
                <Award className="w-10 h-10 text-black mx-auto mb-2" />
                <h3 className="text-xl font-bold text-black mb-1">Excellence Award 2024</h3>
                <p className="text-black/80">Best Hajj & Umrah Service Provider</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Social Proof & Trust Badges */}
        <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-black grid place-content-center h-screen sticky top-0  overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 3px 3px, rgba(0,0,0,0.3) 1px, transparent 0)`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          <div className="text-center px-6 max-w-5xl mx-auto relative z-10">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-black" />
                <Users className="w-8 h-8 text-black" />
                <Globe className="w-8 h-8 text-black" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[110%] mb-6">
                Trusted by <br />
                <span className="text-black/80">
                  Thousands
                </span>
                <br />Across Pakistan
              </h1>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-black/20">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">15+</div>
                <p className="text-yellow-400 font-semibold">Years Experience</p>
              </div>
              
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-black/20">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">15K+</div>
                <p className="text-yellow-400 font-semibold">Happy Pilgrims</p>
              </div>
              
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-black/20">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">100%</div>
                <p className="text-yellow-400 font-semibold">Visa Success</p>
              </div>
              
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-black/20">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">4.9★</div>
                <p className="text-yellow-400 font-semibold">Google Rating</p>
              </div>
            </div>

            {/* Final Review Quote */}
            <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-8 max-w-3xl mx-auto border border-black/20">
              <Quote className="w-12 h-12 text-yellow-400/50 mx-auto mb-4" />
              <blockquote className="text-2xl sm:text-3xl font-bold text-yellow-400 leading-relaxed mb-6">
                "Al-Noor Travels doesn't just organize trips - they facilitate spiritual transformations."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                  HM
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-yellow-400 text-lg">Hafiz Muhammad</h4>
                  <p className="text-yellow-400/80">Religious Scholar • Karachi</p>
                </div>
              </div>
            </div>

            <p className="text-black/80 mt-8 text-lg font-medium">
              Join thousands of satisfied pilgrims • Start your journey today
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}