import React from "react";
import { motion } from "framer-motion";

const AboutCEO = () => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-yellow-600 mb-4">
            Message From Our CEO
          </h2>
        </motion.div>

        {/* CEO Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* CEO Image - Left Side */}
          <motion.div
            className="lg:w-2/5 mr-20"
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt="Sarah Johnson - CEO"
              className="w-full h-96 lg:h-[500px] object-cover"
            />
          </motion.div>

          {/* CEO Message - Right Side */}
          <motion.div
            className="lg:w-3/5 flex flex-col justify-center"
            initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="text-yellow-500 mb-4 text-center">
                <svg
                  className="w-12 h-12 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  As Director of Operations, I am proud to work alongside our
                  exceptional team to ensure that every aspect of our business
                  runs with precision and excellence...
                </p>
                <p>
                  We've implemented robust systems and processes that allow us
                  to maintain the highest standards while scaling our operations
                  globally...
                </p>
                <p>
                  Through strategic planning and innovative solutions, we
                  optimize every facet of our operations to create sustainable
                  value...
                </p>
                <p>
                  Through strategic planning and innovative solutions, we
                  optimize every facet of our operations to create sustainable
                  value...
                </p>
                <p>
                  Through strategic planning and innovative solutions, we
                  optimize every facet of our operations to create sustainable
                  value...
                </p>
              </div>

              <div>
                <div className="font-bold text-gray-900 text-xl">
                  MUHAMMAD JAMIL
                </div>
                <div className="text-yellow-600">Director Operations</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutCEO;
