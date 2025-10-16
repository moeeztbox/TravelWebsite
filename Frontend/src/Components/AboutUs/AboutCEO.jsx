import { motion } from "framer-motion";
import ceoImg from "../../Assets/Images/aboutus images/about-hero.jpg"; // ✅ Replace with your CEO image path

const AboutCEO = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        {/* CEO Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src={ceoImg}
            alt="CEO"
            className="w-80 h-80 object-cover rounded-2xl shadow-xl"
          />
        </motion.div>

        {/* CEO Message */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Message from our CEO
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            "At our company, we believe in innovation, integrity, and impact.
            Every step we take is towards building a brighter future for our
            customers, our employees, and our community. Thank you for being a
            part of this journey."
          </p>
          <h3 className="mt-6 text-xl font-semibold text-blue-600">
            — John Doe, CEO
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCEO;
