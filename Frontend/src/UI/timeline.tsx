"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface TimelineItem {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const updateHeight = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  useEffect(() => {
    updateHeight();
    
    const handleResize = () => updateHeight();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [updateHeight]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-black font-sans md:px-10 overflow-hidden relative"
      ref={containerRef}
    >
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,215,0,0.15) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
      
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 text-white font-semibold max-w-4xl">
            Changelog from my{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              journey
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-sm mb-4">
            I&apos;ve been working on Aceternity for the past 2 years. Here&apos;s
            a timeline of my journey.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-lg shadow-yellow-400/25" />
        </motion.div>
      </div>
      
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div 
                className="h-12 absolute left-2 md:left-2 w-12 rounded-full bg-gray-900/80 backdrop-blur-sm border border-yellow-500/40 flex items-center justify-center shadow-xl shadow-black/50"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  borderColor: 'rgba(255, 215, 0, 0.8)',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
                }}
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-inner" />
              </motion.div>
              <motion.h3 
                className="hidden md:block text-xl md:pl-20 md:text-4xl lg:text-5xl font-bold text-white/90 hover:text-white transition-colors duration-300"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05 + 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                {item.title}
              </motion.h3>
            </div>

            <motion.div 
              className="relative pl-20 pr-4 md:pl-4 w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05 + 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                {item.title}
              </h3>
              <div className="bg-gray-900/60 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-6 hover:border-yellow-400/60 hover:bg-gray-900/80 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-2xl hover:shadow-yellow-400/10">
                <div className="text-gray-200 leading-relaxed">
                  {item.content}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
        
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-gray-700/50 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-yellow-600 via-yellow-500 to-yellow-400 rounded-full shadow-lg shadow-yellow-400/30"
          />
        </div>
      </div>
    </div>
  );
};

// Demo component with sample data
export default function TimelineDemo() {
  const sampleData = [
    {
      title: "Getting Started",
      content: (
        <div className="space-y-4">
          <h4 className="text-yellow-400 font-semibold text-lg">Initial Setup</h4>
          <p className="text-gray-300 leading-relaxed">
            Started the project with a clear vision of creating something impactful. 
            Set up the initial architecture and began building the foundation.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full border border-yellow-500/30">
              Planning
            </span>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full border border-yellow-500/30">
              Architecture
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Development",
      content: (
        <div className="space-y-4">
          <h4 className="text-yellow-400 font-semibold text-lg">Core Features</h4>
          <p className="text-gray-300 leading-relaxed">
            Implemented the core functionality and began iterating on user feedback. 
            This phase involved extensive testing and refinement.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-black/40 p-3 rounded border border-yellow-500/20">
              <h5 className="text-yellow-300 font-medium mb-1">Frontend</h5>
              <p className="text-gray-400 text-sm">React & TypeScript</p>
            </div>
            <div className="bg-black/40 p-3 rounded border border-yellow-500/20">
              <h5 className="text-yellow-300 font-medium mb-1">Backend</h5>
              <p className="text-gray-400 text-sm">Node.js & Express</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Launch",
      content: (
        <div className="space-y-4">
          <h4 className="text-yellow-400 font-semibold text-lg">Going Live</h4>
          <p className="text-gray-300 leading-relaxed">
            Successfully launched the platform with all core features. 
            The response from the community exceeded expectations.
          </p>
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 p-4 rounded-lg border border-yellow-500/30">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-300 font-medium">Live & Running</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return <Timeline data={sampleData} />;
}