import React, { useState } from 'react';
import {
    Phone,
    Mail,
    MessageSquare,
    ArrowRight,
    Star,
    Users,
    CheckCircle,
    Clock
} from 'lucide-react';

export default function InquiryCTA() {
    const [formData, setFormData] = useState({
        firstName: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleCallClick = () => {
        window.open('tel:+923012345678', '_self');
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Thank you! We will contact you soon.');
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <section className="relative bg-white overflow-hidden py-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div 
                    className="absolute inset-0" 
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(180,140,60,0.3) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} 
                />
            </div>

            <div className="w-full relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Form */}
                        <div className="w-full">
                            <div className="bg-white border-1 border-gray-300 rounded-2xl p-8 shadow-xl">
                                {/* Row 1: First Name & Phone Number */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleChange('firstName', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                                            placeholder="+92-XXX-XXXXXXX"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Email */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                {/* Row 3: Message */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Inquiry
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => handleChange('message', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 resize-none"
                                        placeholder="Tell us about your travel plans or any questions you have..."
                                    />
                                </div>

                                {/* Action Buttons - Only Submit Inquiry remains */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button 
                                        onClick={handleSubmit}
                                        className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 hover:shadow-md group"
                                    >
                                        <MessageSquare className="w-5 h-5 transition-transform duration-200" />
                                        <span>Submit Inquiry</span>
                                        <ArrowRight className="w-5 h-5 transition-transform duration-200" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Title Content */}
                        <div className="text-center lg:text-left">
                            {/* Header */}
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-center">
                                <span className="text-gray-900">Ready to Begin Your </span>
                                <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                                    Sacred Journey?
                                </span>
                            </h2>

                            {/* Decorative Line */}
                            <div className="flex text-center items-center justify-center gap-4 mb-6">
                                <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-16"></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-16"></div>
                            </div>

                            {/* Contact Info with Call Now Button */}
                            <div className="bg-white rounded-xl p-6 border-1 border-gray-300 shadow-md mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center justify-center lg:justify-start gap-2">
                                    <Mail className="w-5 h-5 text-yellow-600" />
                                    Quick Contact
                                </h3>
                                <div className="space-y-2 text-gray-700 mb-4">
                                    <div className="text-yellow-600 font-medium">info@alburaq.com</div>
                                    <div className="text-yellow-600 font-medium">WhatsApp: +92-301-2345678</div>
                                    <div className="text-gray-600 text-sm">Available 24/7 for your convenience</div>
                                </div>
                                
                                {/* Call Now Button moved here */}
                                <button 
                                    onClick={handleCallClick}
                                    className="w-full bg-white border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-3 group"
                                >
                                    <Phone className="w-5 h-5 transition-transform duration-200" />
                                    <span>Call Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}