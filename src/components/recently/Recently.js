import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectCoverflow,
} from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../grid.css";
import "./recently.css";
import { getLocal } from "../../handle/Local";
import { Link } from "react-router-dom";
import useWidth from "../customHook/useWidth";

const Recently = () => {
  const items = getLocal();

  const width = useWidth();
  SwiperCore.use([Navigation, Autoplay, Pagination, EffectCoverflow]);

  let slide;

  if (width >= 1024) {
    slide = 4.5;
  } else if (width >= 768 && width < 1024) {
    slide = 3.5;
  } else if (width >= 400 && width < 768) {
    slide = 2.5;
  } else {
    slide = 2;
  }

  if (items.length > 0) {
    return (
      <div className="grid wide">
        <div className="rencently">
          <h1 className="rencently-title">Recently</h1>
          <div className="recently-list">
            <Swiper
              navigation
              grabCursor={true}
              spaceBetween={10}
              slidesPerView={slide}
              autoplay
            >
              {items &&
                items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/anime/${item.id}`}>
                      <div className="recently-item">
                        <img
                          src={item.img}
                          className="recently-item__img"
                        ></img>
                        <h3
                          style={{ color: `${item.color}` }}
                          className="recently-item__title"
                        >
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default Recently;
