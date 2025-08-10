import React, { useRef, useState, useEffect, useCallback } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { 
  UserPlus, 
  Upload, 
  FileEdit, 
  CheckSquare, 
  Monitor, 
  CreditCard, 
  Globe, 
  ThumbsUp, 
  Package, 
  FileText 
} from "lucide-react";

const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  const [hasAnimated, setHasAnimated] = useState(false);

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
      
      {/* Blueish and Gold Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg, 
                      rgba(30, 58, 138, 0.2) 0%, 
                      rgba(59, 130, 246, 0.05) 15%, 
                      rgba(0, 0, 0, 0.02) 50%, 
                      rgba(251, 191, 36, 0.05) 85%, 
                      rgba(245, 158, 11, 0.08) 100%)`
        }}
      />
      
      {/* Blue and Gold Sparkles - Static (no animations) */}
      <div className="absolute inset-0 opacity-20">
        {/* Blue sparkles on left side */}
        <div className="absolute top-[18%] left-[14%] w-1 h-1 bg-blue-400 rounded-full"></div>
        <div className="absolute top-[31%] left-[27%] w-1.5 h-1.5 bg-blue-300 rounded-full opacity-60"></div>
        <div className="absolute top-[47%] left-[8%] w-1 h-1 bg-blue-500 rounded-full"></div>
        <div className="absolute top-[64%] left-[23%] w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>
        <div className="absolute bottom-[22%] left-[11%] w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
        <div className="absolute top-[71%] left-[19%] w-1 h-1 bg-blue-500 rounded-full opacity-50"></div>
        <div className="absolute top-[39%] left-[6%] w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
        
        {/* Gold sparkles on right side */}
        <div className="absolute top-[26%] right-[19%] w-1 h-1 bg-yellow-400 rounded-full"></div>
        <div className="absolute top-[43%] right-[31%] w-2 h-2 bg-yellow-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-[28%] right-[17%] w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
        <div className="absolute top-[13%] right-[9%] w-1 h-1 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute bottom-[15%] right-[24%] w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
        <div className="absolute top-[58%] right-[12%] w-1 h-1 bg-yellow-500 rounded-full opacity-40"></div>
        <div className="absolute top-[81%] right-[28%] w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-8 lg:px-10 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
            <span className="block text-white mb-1 sm:mb-2">Your Sacred</span>
            <span className="block text-white">Journey Begins</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent w-12 sm:w-16 md:w-20"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400/60 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent w-12 sm:w-16 md:w-20"></div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
            Navigate through these essential phases to complete your Hajj application with peace and preparation
          </p>
        </div>
      </motion.div>
      
      {/* Desktop/Tablet Timeline with Line */}
      <motion.div 
        ref={ref} 
        className="relative max-w-7xl mx-auto pb-20 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
        onViewportEnter={() => setHasAnimated(true)}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        {data.map((item, index) => (
          <motion.div 
            key={index} 
            className="flex justify-start pt-6 md:pt-20 md:gap-10"
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <div className="sticky flex flex-col md:flex-row z-30 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div 
                className="h-12 absolute left-2 md:left-2 w-12 rounded-full bg-gray-900/80 backdrop-blur-sm border border-yellow-500/40 flex items-center justify-center shadow-xl shadow-black/50 hover:scale-110 hover:border-yellow-500/80 transition-all duration-300 cursor-pointer"
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-inner" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl lg:text-5xl font-bold text-white/90 hover:text-white transition-colors duration-300">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                {item.title}
              </h3>
              <div className="bg-gray-900/60 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-6 hover:border-yellow-400/60 hover:bg-gray-900/80 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-2xl hover:shadow-yellow-400/10">
                <div className="text-gray-200 leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </motion.div>
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
      </motion.div>
      
      {/* Mobile Timeline - Simple Cards */}
      <motion.div 
        className="block sm:hidden max-w-sm mx-auto pb-12 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <div className="bg-gray-900/60 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 hover:border-yellow-400/60 hover:bg-gray-900/80 transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
                  <span className="text-black text-xs font-bold">{index + 1}</span>
                </div>
                <h3 className="text-white font-semibold text-base">{item.title}</h3>
              </div>
              <div className="text-gray-200 text-sm leading-relaxed">
                {item.content}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default function HajjTimelineDemo() {
  const phases = [
    {
      number: "01",
      title: "Registration & Documentation",
      description: "Create account, upload documents, and complete your application form",
      details: [
        "Register on the platform",
        "Upload passport & certificates", 
        "Fill personal information",
        "Document verification"
      ],
      icon: UserPlus
    },
    {
      number: "02",
      title: "Category Selection & Payment",
      description: "Choose your preferred Hajj category and fund your digital wallet",
      details: [
        "Select Hajj category",
        "Top up E-wallet",
        "Review pricing options"
      ],
      icon: CreditCard
    },
    {
      number: "03", 
      title: "Package Selection",
      description: "Browse service providers and select your ideal Hajj package",
      details: [
        "Browse service providers",
        "Compare packages",
        "Select accommodation level",
        "Choose travel services"
      ],
      icon: Globe
    },
    {
      number: "04",
      title: "Booking Confirmation",
      description: "Finalize your booking, make payment, and review your complete itinerary",
      details: [
        "Confirm package selection",
        "Complete payment process",
        "Review final itinerary",
        "Receive booking confirmation"
      ],
      icon: CheckSquare
    }
  ];

  const data = phases.map(phase => ({
    title: `Phase ${phase.number}`,
    content: (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-900/40 backdrop-blur-sm border border-yellow-500/30 rounded-lg hover:border-yellow-400/50 hover:bg-gray-900/60 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-2xl hover:shadow-yellow-400/10">
          <phase.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-400 flex-shrink-0 mt-1" strokeWidth={1.5} />
          <div className="flex-1">
            <h4 className="text-yellow-400 font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{phase.title}</h4>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">{phase.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2">
              {phase.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  }));
  
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}