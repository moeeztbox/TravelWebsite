import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO & Founder",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    role: "Marketing Head",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Michael Lee",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: 4,
    name: "Ayesha Khan",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Project Manager",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 6,
    name: "Fatima Noor",
    role: "Content Strategist",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    id: 7,
    name: "James Carter",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    id: 8,
    name: "Hina Rauf",
    role: "HR Manager",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 bg-[#f5f6f8] relative">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 relative inline-block">
            Our <span className="text-yellow-600">Team</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Meet the passionate people who drive our company forward.
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={25}
            slidesPerView={4}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-10"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="bg-white border-1 border-black rounded-2xl  overflow-hidden w-[95%] mx-auto">
                  {/* Image */}
                  <div className="border-b border-gray-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full border-b-1 border-black h-72 object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-yellow-600 font-medium mt-1">
                      {member.role}
                    </p>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-4 mt-4">
                      <a
                        href="#"
                        className="text-gray-500 hover:text-yellow-600 transition"
                      >
                        <FaTwitter size={18} />
                      </a>
                      <a
                        href="#"
                        className="text-gray-500 hover:text-yellow-600 transition"
                      >
                        <FaFacebookF size={18} />
                      </a>
                      <a
                        href="#"
                        className="text-gray-500 hover:text-yellow-600 transition"
                      >
                        <FaInstagram size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Arrows */}
          <div className="custom-prev w-12 absolute -left-20 top-1/2 -translate-y-1/2 bg-yellow-500 text-white p-3 rounded-full cursor-pointer hover:bg-yellow-600 transition">
            <span className="p-1.5">&#10094;</span>
          </div>
          <div className="custom-next w-12 absolute -right-20 top-1/2 -translate-y-1/2 bg-yellow-500 text-white p-3 rounded-full cursor-pointer hover:bg-yellow-600 transition">
            <span className="p-2">&#10095;</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
