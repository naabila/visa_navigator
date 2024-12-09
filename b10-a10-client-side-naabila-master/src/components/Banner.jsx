import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import required modules
import { Pagination } from 'swiper/modules';

// Local asset
import banner_1 from "../assets/b1.jpg";
import banner_2 from "../assets/b2.jpg";
import banner_3 from "../assets/b3.jpg";
import { Fade } from "react-awesome-reveal";

function Banner() {
  const slides = [
    {
      id: 1,
      title: "Explore Work Opportunities",
      subtitle: "Find visas that empower your career journey.",
      image: banner_1,
    },
    {
      id: 2,
      title: "Study Abroad with Ease",
      subtitle: "Discover education-based visas for your dream institutions.",
      image: banner_2,
    },
    {
      id: 3,
      title: "Travel the World",
      subtitle: "Secure your travel visa and start your next adventure.",
      image: banner_3,
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        
        className="h-[400px] md:h-[700px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[70vh] bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#000] bg-opacity-40"></div>

              {/* Text Content */}
              <Fade>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-[#fff]">{slide.title}</h2>
                <p className="mt-4 text-lg md:text-xl text-[#fff]">{slide.subtitle}</p>
              </div>
              </Fade>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
