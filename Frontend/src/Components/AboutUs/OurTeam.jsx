import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import img1 from "../../Assets/Images/aboutus images/about-hero.jpg";

const teamMembers = [
  { name: "Moeez Jamil", role: "Frontend Developer", image: img1 },
  { name: "Ali Ahmed", role: "Backend Developer", image: img1 },
  { name: "Sara Khan", role: "UI/UX Designer", image: img1 },
  { name: "John Doe", role: "Project Manager", image: img1 },
  { name: "Emma Watson", role: "QA Engineer", image: img1 },
];

const OurTeam = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Our Team</h2>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 0, // no delay
            disableOnInteraction: false,
          }}
          speed={3000} // ✅ speed for smooth continuous motion
          className="mySwiper"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurTeam;
