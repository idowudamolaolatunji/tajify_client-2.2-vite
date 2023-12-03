// import Card from "./Card";

// import sportImg from "../assets/images/pngs/explore-category-1.png";
// import entertainmentImg from "../assets/images/pngs/explore-category-2.png";
// import lifyStyleImg from "../assets/images/pngs/explore-category-3.png";
// import growthImg from "../assets/images/pngs/explore-category-4.png";
// import financeImg from "../assets/images/pngs/explore-category-5.png";
// import healthImg from "../assets/images/pngs/explore-category-6.png";
// import technologyImg from "../assets/images/pngs/explore-category-7.png";
// import axios from "axios";
// import { useAuthContext } from "../context/AuthContext";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const categories = [
//   {
//     title: "sport",
//     imagePath: sportImg,
//     categoryField: 'sport'
//   },
//   {
//     title: "entertainment",
//     imagePath: entertainmentImg,
//     categoryField: 'entertainment'
//   },
//   {
//     title: "lifestyle",
//     imagePath: lifyStyleImg,
//     categoryField: 'lifestyle'
//   },
//   {
//     title: "travel",
//     imagePath: growthImg,
//     categoryField: 'travel'
//   },
//   {
//     title: "finance",
//     imagePath: financeImg,
//     categoryField: 'finance'
//   },
//   {
//     title: "health",
//     imagePath: healthImg,
//     categoryField: 'health'
//   },
//   {
//     title: "technology",
//     imagePath: technologyImg,
//     categoryField: 'technology'
//   },
// ];

// function ExploreCategories({ category }) {
//   const { token } = useAuthContext();
//   const [blogs, setBlogs] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   return (
//     <section className="section explore-category__section">
//       <div className="section__container explore-category">
//         <h3 className="heading__tetariary">Explore categories</h3>
//         <div
//           className="category__cards"
//           style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}
//         >

//           {categories.map((category) => {
//             return (
//               <Card
//                 key={category.title}
//                 title={category.title}
//                 imagePath={category.imagePath}
//                 // category={category.categoryField}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ExploreCategories;



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
import { Swiper, SwiperSlide, } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";


// SwiperCore.use([ Autoplay]);
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const categories = [
  {
    title: "sport",
    imagePath: sportImg,
    categoryField: 'sport',
  },
  {
    title: "entertainment",
    imagePath: entertainmentImg,
    categoryField: 'entertainment'
  },
  {
    title: "lifestyle",
    imagePath: lifyStyleImg,
    categoryField: 'lifestyle'
  },
  {
    title: "travel",
    imagePath: growthImg,
    categoryField: 'travel'
  },
  {
    title: "finance",
    imagePath: financeImg,
    categoryField: 'finance'
  },
  {
    title: "health",
    imagePath: healthImg,
    categoryField: 'health'
  },
  {
    title: "technology",
    imagePath: technologyImg,
    categoryField: 'technology'
  },
];
console.log(categories.length);



function ExploreCategories({ category }) {

  const breakpoints = {
    // Define breakpoints for different screen sizes
    320: {
      slidesPerView: 2,
    },
    425: {
      slidesPerView: 3,
    },
    550: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 5, // Show 3 cards on tablets
    },
    1024: {
      slidesPerView: 7, // Show 6 cards on desktop
    },
  };

  return (
    <section className="section__container section">
      {/* <section className="course__section section"> */}
      {/* <div className="section__container"> */}
      <div className="popular__courses--2">
        <h2 className="heading__tetariary">Popular Categories</h2>
        <Swiper
          // install Swiper modules
          modules={[FreeMode]}
          freeMode={true}
          breakpoints={breakpoints}
          grabCursor={true}
          spaceBetween={10}
          className="mySwiper"
          autoplay={{
            delay: 5000, // Change slide every 5 seconds (5000 milliseconds)
            disableOnInteraction: false, // Continue autoplay even when user interacts with the Swiper
          }}
        >

          {categories.map((data) => (
            <div className="w-[800px]">

              <div
                className="course__cards "
                style={{
                  gridTemplateColumns: `repeat(${categories.length}, 4fr)`,

                }}
              >
                <SwiperSlide key={data.title}>

                  <Card
                    key={data.title}
                    title={data.title}
                    imagePath={data.imagePath}
                    category={data.categoryField}
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

export default ExploreCategories;


