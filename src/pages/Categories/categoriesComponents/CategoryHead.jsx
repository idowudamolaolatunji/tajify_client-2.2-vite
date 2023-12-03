import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

function CategoryHead() {
  const [swiper, setSwiper] = React.useState();
  const [start, setStart] = useState(0);

  const nexto = () => {
    // @ts-ignore
    swiper.slideNext();
  };

  const prev = () => {
    // @ts-ignore
    swiper.slidePrev();
  };

  const handleSlideChange = (e) => {
    const activeSlideIndex = e.realIndex;
    console.log(e.realIndex);
    setStart(activeSlideIndex);
  };

  const breakpoints = {
    320: { slidesPerView: 2 },
    425: { slidesPerView: 3 },
    550: { slidesPerView: 4 },
    768: { slidesPerView: 4.5 },
    1024: { slidesPerView: 5.5 },
  };

  return (
    <section className="section__tabs category-head__section">
      <div
        className="icon-container--tabs-left shadow cursor-pointer"
        onClick={prev}
      >
        <MdArrowBackIos color="white" />
      </div>
      <div
        className="icon-container--tabs-right shadow cursor-pointer"
        onClick={nexto}
      >
        <MdArrowForwardIos color="white" />
      </div>

      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        breakpoints={breakpoints}
        grabCursor={true}
        spaceBetween={30}
        className="mySwiper"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        onSwiper={(s) => {
          //console.log("initialize swiper", s);
          // @ts-ignore
          setSwiper(s);
        }}
      >
        <div>
          <ul className="tags tags__container">
            <SwiperSlide>
              <Link to="/category/sport">
                <li className="tag">Sport</li>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/travel">
                <li className="tag">Travel</li>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/health">
                <li className="tag">Health</li>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/finance">
                <li className="tag">Finance</li>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/future">
                <li className="tag">Future</li>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/culture">
                <li className="tag">culture</li>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/lifestyle">
                <li className="tag">Lifestyle</li>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/category/technology">
                <li className="tag">Technology</li>
              </Link>
            </SwiperSlide>
          </ul>
        </div>
      </Swiper>
    </section>
  );
}

export default CategoryHead;
