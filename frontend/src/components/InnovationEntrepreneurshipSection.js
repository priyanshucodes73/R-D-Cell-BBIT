import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import React from "react";

SwiperCore.use([Autoplay, EffectFade]);

const slides = [
  { type: "image", src: "/slide-bg-1.jpg", alt: "Innovation Slide 1" },
  {
    type: "video",
    src: "/innovation-video.mp4",
    alt: "Innovation Video",
    poster: "/slide-bg-2.jpg",
  },
  { type: "image", src: "/slide-bg-3.jpg", alt: "Innovation Slide 3" },
];

export default function InnovationEntrepreneurshipSection() {
  return (
    <section className="relative w-full min-h-[350px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Swiper Slider */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full absolute inset-0"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            {slide.type === "image" ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover min-h-[350px] md:min-h-[500px]"
                draggable="false"
              />
            ) : (
              <video
                src={slide.src}
                poster={slide.poster}
                className="w-full h-full object-cover min-h-[350px] md:min-h-[500px]"
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/70 z-10" />
      {/* Centered Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 py-12 w-full">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
          Innovation & <span className="text-yellow-400">Entrepreneurship</span>
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-white/90 mb-6">
          Firmly established as a rapidly rising hub of excellence for
          innovation and entrepreneurship, BBIT actively nurtures and empowers
          creative ideas across diverse fields, transforming them into valuable
          and viable business opportunities.
        </p>
        <a
          href="#"
          className="inline-block bg-yellow-400 text-blue-900 font-bold px-6 py-2 rounded shadow hover:bg-yellow-300 transition text-lg"
        >
          Read More
        </a>
      </div>
    </section>
  );
}
