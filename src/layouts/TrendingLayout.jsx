import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";

import catIcon from "../assets/cat.svg";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "../components/hero.css";

const TrendingLayout = ({ data }) => {
  const swiperRef = useRef(null);

  return (
    <div className="trending mt-5">
      <div className="flex items-center justify-between mb-2">
        <Heading>Trending</Heading>

        <div className="nevi-icons nevi-small" aria-hidden={false}>
          <button
            className="nevi-btn"
            aria-label="Previous trending"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaAngleLeft />
          </button>
          <button
            className="nevi-btn"
            aria-label="Next trending"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={false} 
        onSwiper={(s) => (swiperRef.current = s)}
        breakpoints={{
          0: { slidesPerView: 3 },
          800: { slidesPerView: 4 },
          1320: { slidesPerView: 6 },
        }}
      >
        {data &&
          data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="item flex flex-col items-center overflow-hidden px-1 md:px-2">
                <Link
                  to={`/anime/${item.id}`}
                  className="poster group w-full h-0 pb-[150%] bg-lightbg relative overflow-hidden rounded-md"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    style={{
                      background: `linear-gradient(to bottom, rgba(31,79,112,0.6), rgba(76,52,140,0.5), rgba(0,0,0,0.7))`,
                      backdropFilter: "blur(4px)",
                    }}
                  ></div>

                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <img
                      src={catIcon}
                      alt="view icon"
                      className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg"
                    />
                  </div>

                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    src={item.poster}
                    alt={item.title}
                  />

                  <div className="rank p-1 text-sm md:text-base md:p-2 font-extrabold absolute top-0 bg-[#89bcf8] text-center text-black z-30">
                    0{item.rank}
                  </div>
                </Link>
                <Link
                  to={`/anime/${item.id}`}
                  title={item.title}
                  className="title text-base font-semibold text-center truncate w-full mt-1 transition-colors duration-300 hover:text-[var(--primary)]"
                >
                  {item.title}
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TrendingLayout;
