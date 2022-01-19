import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectCoverflow,
} from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./slide.css";
import "../grid.css";

const slide = ({ anime }) => {
  const slider = anime.map((image) => ({
    id: image.id,
    banner: image.banner_image,
    name: image.titles.en,
  }));

  SwiperCore.use([Navigation, Autoplay, Pagination, EffectCoverflow]);
  return (
    <div className="grid wide">
      <Swiper
        navigation
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay
        effect="coverflow"
      >
        {slider.map((banner, index) => (
          <SwiperSlide key={index}>
            <Link to={`/anime/${banner.id}`}>
              <div
                style={{ backgroundImage: `url(${banner.banner})` }}
                className="slide-item"
              ></div>
              <h1 className="slide-name">{banner.name}</h1>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default slide;
