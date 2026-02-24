import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6 mt-16">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main heading - static, no animation */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] uppercase text-gray-900">
          coming <span className="font-medium text-yellow-400">soon</span>
        </h1>

        {/* Divider with yellow-400 dot */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-12 h-px bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>

        {/* Professional description */}
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-16">
          We're working on something exciting. Be the first to know when we launch.
        </p>

        {/* Notification form with black button */}
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 border border-gray-300 focus:border-blue-400 outline-none transition-colors text-gray-700 placeholder:text-gray-400 bg-white"
            />
            <button className="px-8 py-4 bg-black text-white font-medium tracking-wider uppercase text-sm hover:bg-gray-800 transition-colors duration-300">
              Notify me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;