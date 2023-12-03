// import React from "react";

// import SoftwareDev from '../assets/images/pngs/software-development.png'
// import GraphicsDes from '../assets/images/pngs/graphics-design.png'
// import EthicalHac from '../assets/images/pngs/ethical-hacking.png'
// import ContentCre from '../assets/images/pngs/content-creation.png'
// import DataAnaly from '../assets/images/pngs/data-analysis.png'
// import PopularCoursesCards from "./PopularCoursesCards";

// const coursesData = [
//     {
//         title: 'software development',
//         imagePath: SoftwareDev
//     },
//     {
//         title: 'graphic design',
//         imagePath: GraphicsDes
//     },
//     {
//         title: 'ethical hacking',
//         imagePath: EthicalHac
//     },
//     {
//         title: 'content creation',
//         imagePath: ContentCre
//     },
//     {
//         title: 'data analsis',
//         imagePath: DataAnaly
//     },
// ]
// console.log(coursesData.length)

// function MostPopularCourses() {
//     return (
//         <section className="course__section section">
//             <div className="section__container">
//                 <h2 className="heading__tetariary">Popular Courses</h2>
//                 <div className="course__cards" style={{gridTemplateColumns: `repeat(${coursesData.length}, 1fr)`}}>
//                     {coursesData.map(data => {
//                        return <PopularCoursesCards title={data.title} imagePath={data.imagePath} key={data.title} />
//                     })}
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default MostPopularCourses;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import sportImg from "../assets/images/pngs/explore-category-1.png";
import entertainmentImg from "../assets/images/pngs/explore-category-2.png";
import lifyStyleImg from "../assets/images/pngs/explore-category-3.png";
import growthImg from "../assets/images/pngs/explore-category-4.png";
import financeImg from "../assets/images/pngs/explore-category-5.png";
import healthImg from "../assets/images/pngs/explore-category-6.png";
import technologyImg from "../assets/images/pngs/explore-category-7.png";
import GraphicsDes from "../assets/images/pngs/graphics-design.png";
import EthicalHac from "../assets/images/pngs/ethical-hacking.png";
import ContentCre from "../assets/images/pngs/content-creation.png";
import DataAnaly from "../assets/images/pngs/data-analysis.png";
import PopularCoursesCards from "./PopularCoursesCards";
import SoftwareDev from "../assets/images/pngs/software-development.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const coursesData = [
  {
    title: "Software development",
    imagePath: SoftwareDev,
  },
  {
    title: "Graphic design",
    imagePath: GraphicsDes,
  },
  {
    title: "Ethical hacking",
    imagePath: EthicalHac,
  },
  {
    title: "Digital Marketing",
    imagePath: ContentCre,
  },
  {
    title: "Data analysis",
    imagePath: DataAnaly,
  }
];



function MostPopularCourses() {

    const breakpoints = {
        // Define breakpoints for different screen sizes
        320: {
          slidesPerView: 2,
        },
        550: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4, // Show 3 cards on tablets
        },
        1024: {
          slidesPerView: 5, // Show 6 cards on desktop
        },
      };

  return (
    <section className="section__container section">
    {/* <section className="course__section section"> */}
      {/* <div className="section__container"> */}
      <div className="popular__courses--2">
        <h2 className="heading__tetariary">Popular Courses</h2>
        <Swiper
          // install Swiper modules
          modules={[FreeMode]}
          freeMode={true}
          breakpoints={breakpoints}
          grabCursor={true}
          spaceBetween={10}
          className="mySwiper"
        >
        
          {coursesData.map((data) => (
            <div className="w-[800px]">

            <div
              className="course__cards "
              style={{
                  gridTemplateColumns: `repeat(${coursesData.length}, 4fr)`,
                
              }}
              >
              <SwiperSlide key={data.title}>
                <PopularCoursesCards
                  title={data.title}
                  imagePath={data.imagePath}
                  />
              </SwiperSlide>
            </div>
                  </div>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default MostPopularCourses;


