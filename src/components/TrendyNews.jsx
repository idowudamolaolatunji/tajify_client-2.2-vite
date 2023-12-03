import React, { useEffect } from "react";
import styled from "styled-components";
import Feeds1 from "../assets/images/pngs/feeds1.png";
import Ads from "./Ads";
import Ai from "../assets/images/pngs/Ai.png";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiTime } from "react-icons/bi";

const TrendyNews = ({ posts }) => {
  return (
    <TrendyContainer>
      <div className="trendy__container trendy">
        <div className="main__news">
          {posts.length > 0 && (
            <Link to={`/details/${posts[0]._id}`}>
              <div className="trendy__img">
                <img
                  src={posts[0].image}
                  className="align-middle object-cover transition duration-300 ease-linear"
                />
              </div>
            </Link>
          )}
          {posts.length > 0 && (
            <>
              <h1 className="bold__textt">{posts[0].title}</h1>
              <div dangerouslySetInnerHTML={{ __html: posts[0].content }}></div>
              <Link to={`/details/${posts[0]._id}`}>
                <span className="read__more">Read more</span>
              </Link>
            </>
          )}
        </div>

        <div className="featured__news">
          {posts.map((post) => (
            <div key={post._id} className="featured__news_1">
              <Link to={`/details/${post._id}`}>
                <div className="featured__news_img">
                  {/* <img src={Feeds1} className="news__img" /> */}
                  <img src={post.image} className="news__img" />
                </div>
              </Link>
              <div className="featured__news_contents">
                <p className="bold__text">{post.title}</p>
                <div className="span__light">1 hour ago</div>
              </div>
            </div>
          ))}
        </div>

        <div className="main__side-bar">
          <div className="ads__sidebar">
            <Ads />
          </div>
          <div className="categories__sidebar ">
            <div className="custom__style bg-[#D9D9D9] w-[728px] h-[90px] flex flex-wrap justify-center items-center">
              <div className="categories">
                <h4>Categories</h4>
              </div>
              <div className="categories__list">
                <div className="category__h5">
                  <h5>Culture</h5>
                  <Link to="/category/culture">
                    <BsChevronRight className="text-gray-600 mr-2" />
                  </Link>
                </div>
                <div className="category__h5">
                  <h5>Sport</h5>
                  <Link to="/category/sport">
                    <BsChevronRight className="text-gray-600 mr-2" />
                  </Link>
                </div>
                <div className="category__h5">
                  <h5>Health</h5>
                  <Link to="/category/health">
                    <BsChevronRight className="text-gray-600 mr-2" />
                  </Link>
                </div>
                <div className="category__h5">
                  <h5>Entertainment</h5>
                  <Link to="/category/entertainment">
                    <BsChevronRight className="text-gray-600 mr-2" />
                  </Link>
                </div>
                <div className="category__h5">
                  <h5>Technology</h5>
                  <Link to="/category/technology">
                    <BsChevronRight className="text-gray-600 mr-2" />
                  </Link>
                </div>
                <div className="category__h5">
                  <h5>Travel</h5>
                  <Link to="/category/travel">
                    <BsChevronRight className="text-gray-600 mr-2" />
                  </Link>
                </div>
                <div className="category__h5">
                  <h5>Finance</h5>
                  <Link to="/category/finance">
                    <BsChevronRight className="text-gray-600 mr-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center flex justify-center mt-5 mb-10">
        <button className="read___more">View More</button>
      </div>
    </TrendyContainer>
  );
};

export default TrendyNews;

const TrendyContainer = styled.div`
  .trendy__container {
    display: flex;
    gap: 1.8rem;
  }

  .categories__sidebar {
    .custom__style {
      width: 100%;
      height: 36rem;
      margin-bottom: 3rem;
      padding: 2.4rem;
    }
  }

  .bold__text {
    color: #f06;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .bold__textt {
    color: #f06;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
  }

  .read___more {
    color: #0081a7;
    font-size: 0.8rem;
    font-style: italic;
    font-weight: 400;
  }
  .featured__news {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }
  .featured__news_1 {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 0.4rem;
    overflow: hidden;
  }

  .main__news {
    max-width: 44rem;
    p {
      margin: 15px 0;
      color: #000;
      line-height: 1.6;
      font-size: 1.4rem;
      font-style: normal;
    }
  }

  .__h1 {
    font-size: 2.5rem;
  }

  .read__more {
    color: #008001;
  }

  .news__img {
    width: 12rem;
    height: 9.2rem;
  }

  .span__light {
    margin-top: 2rem;
    color: #464646;
    font-size: 1.4rem;
    font-style: italic;
    font-weight: 400;
  }

  .categories {
    width: 134px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    justify-content: center;
    padding-bottom: 2rem;
    h4 {
      color: #008001;
      font-size: 1.6rem;
      font-weight: 600;
      line-height: normal;
    }
  }

  .categories__list {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.2rem;
    width: 100%;
    margin-top: 2rem;
    h5 {
      color: #000;
      font-size: 1.35rem;
      font-weight: 600;
      line-height: normal;
    }
  }

  .category__h5 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .ads__sidebar {
    height: 24.4rem;
    margin-bottom: 2rem;
    background: #d9d9d9;
    .custom__style {
      width: 100%;
      height: 24.4rem;
      margin-bottom: 3rem;
    }
  }

  .trendy__img {
    height: 30rem;
    margin-bottom: 2.6rem;
    .align-middle {
      height: 100%;
      object-fit: cover;
    }
  }

  .ads__sidebar__1 {
    .custom__style {
      width: 100%;
      height: 17rem;
    }
  }
  .recommended__sidebar {
    max-width: 100%;
    background-color: #eee;
    padding: 1rem;
    .custom__style {
      width: 100%;
    }
  }
  .recommended__news_1 {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .recommended__news_img {
    height: 8rem;
    border-radius: 10px;
    overflow: hidden;
  }
  .news__img {
    width: 100%;
    object-fit: cover;
  }
  .recommended__news_contents {
    width: 100%;
  }
  .normal__text {
    font-size: 9.23px;
    margin: 5px 0;
  }
`;

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Feeds1 from "../assets/images/pngs/feeds1.png";
// import Ads from "./Ads";
// import Ai from "../assets/images/pngs/Ai.png";
// import { BsChevronRight } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext";
// import axios from "axios";

// // const All_BLOGS_URL = "https://api.tajify.com/api/blogs"; // Updated API URL
// const All_BLOGS_URL = "http://localhost:3005/api/blogs"; // Updated API URL

// const TrendyNews = () => {
//   const { token } = useAuthContext();
//   const [loading, setLoading] = useState(false);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     setLoading(true);

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(All_BLOGS_URL, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data.data.blogs) {
//           // Handle the fetched data and set it in state
//           // setPosts(response);
//           setPosts(response.data.data.blogs);
//         } else {
//           console.error("Error fetching posts");
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error("Error:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   useEffect(() => {
//     // This code will run after the component has rendered
//     window.scrollTo(0, 0); // Scroll to the top of the page
//   }, []);

//   console.log(posts)
//   return (
//     <TrendyContainer>
//       <div className="trendy__container trendy">
//         <div className="main__news">
//           {/* <Link to="/details"> */}
//           <Link to={`/details/${posts._id}`}>
//             <div className="trendy__img">
//               <img
//                 src={Feeds1}
//                 className="align-middle object-cover transition duration-300 ease-linear"
//               />
//             </div>
//           </Link>
//           <h1 className="bold__text">
//             The Radical Strategy Behind Trump’s Promise to ‘Go After’.....
//           </h1>
//           <p>
//             When Donald Trump responded to his latest indictment by promising to
//             appoint a special prosecutor if he’s reelected to “go after”
//             President Joe Biden and his family, he signaled that a second......{" "}
//             <Link to="/details">
//               <span className="read__more">Read more</span>
//             </Link>
//           </p>
//         </div>
//           <div className="featured__news">
//         {posts.map((post) => (
//             <Link to={`/details/${post._id}`}>
//               <div key={post._id} className="featured__news_1">
//                 <div className="featured__news_img">
//                   <img src={Feeds1} className="news__img" />
//                 </div>
//                 <div className="featured__news_contents">
//                   <p className="bold__text">{post.title}</p>
//                   <div className="span__light">1 hour ago</div>
//                 </div>
//               </div>
//             </Link>
//         ))}
//           </div>

//         {/* <div className="featured__news_1">
//             <div className="featured__news_img">
//               <img src={Feeds1} className="news__img" />
//             </div>
//             <div className="featured__news_contents">
//               <p className="bold__text">
//                 Five things to know about EFCC acting chairman
//               </p>
//               <div className="span__light">1 hour ago</div>
//             </div>
//           </div>
//           <div className="featured__news_1">
//             <div className="featured__news_img">
//               <img src={Feeds1} className="news__img" />
//             </div>
//             <div className="featured__news_contents">
//               <p className="bold__text">
//                 Five things to know about EFCC acting chairman
//               </p>
//               <div className="span__light">1 hour ago</div>
//             </div>
//           </div>
//           <div className="featured__news_1">
//             <div className="featured__news_img">
//               <img src={Feeds1} className="news__img" />
//             </div>
//             <div className="featured__news_contents">
//               <p className="bold__text">
//                 Five things to know about EFCC acting chairman
//               </p>
//               <div className="span__light">1 hour ago</div>
//             </div>
//           </div>
//           <div className="featured__news_1">
//             <div className="featured__news_img">
//               <img src={Feeds1} className="news__img" />
//             </div>
//             <div className="featured__news_contents">
//               <p className="bold__text">
//                 Five things to know about EFCC acting chairman
//               </p>
//               <div className="span__light">1 hour ago</div>
//             </div>
//           </div>
//           <div className="featured__news_1">
//             <div className="featured__news_img">
//               <img src={Feeds1} className="news__img" />
//             </div>
//             <div className="featured__news_contents">
//               <p className="bold__text">
//                 Five things to know about EFCC acting chairman
//               </p>
//               <div className="span__light">1 hour ago</div>
//             </div>
//           </div>
//           </div> */}

//         <div className="main__side-bar">
//           <div className="ads__sidebar">
//             <Ads />
//           </div>
//           <div className="categories__sidebar ">
//             <div className="custom__style bg-[#D9D9D9] w-[728px] h-[90px] flex flex-wrap justify-center items-center">
//               <div className="categories">
//                 <h4>Categories</h4>
//               </div>
//               <div className="categories__list">
//                 <div className="category__h5">
//                   <h5>Fashion</h5>
//                   <BsChevronRight className="text-gray-600 mr-2" />
//                 </div>

//                 <div className="category__h5">
//                   <h5>Sport</h5>
//                   <BsChevronRight className="text-gray-600 mr-2" />
//                 </div>
//                 <div className="category__h5">
//                   <h5>Education</h5>
//                   <BsChevronRight className="text-gray-600 mr-2" />
//                 </div>
//                 <div className="category__h5">
//                   <h5>Entertainment</h5>
//                   <BsChevronRight className="text-gray-600 mr-2" />
//                 </div>
//                 <div className="category__h5">
//                   <h5>Technology</h5>
//                   <BsChevronRight className="text-gray-600 mr-2" />
//                 </div>
//                 <div className="category__h5">
//                   <h5>Travel</h5>
//                   <BsChevronRight className="text-gray-600 mr-2" />
//                 </div>
//                 <div className="category__h5">
//                   <h5>Others</h5>
//                   <BsChevronRight className="text-gray-600 mr-2" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="text-center flex justify-center mt-5 mb-10">
//         <button className="read___more">View More</button>
//       </div>
//     </TrendyContainer>
//   );
// };

// export default TrendyNews;

// const TrendyContainer = styled.div`
//   .trendy__container {
//     display: flex;
//     gap: 1.8rem;
//   }

//   .categories__sidebar {
//     .custom__style {
//       width: 100%;
//       height: 36rem;
//       margin-bottom: 3rem;
//       padding: 2.4rem;
//     }
//   }

//   .bold__text {
//     color: #000;
//     font-size: 2rem;
//     font-style: normal;
//     font-weight: 600;
//     line-height: normal;
//   }

//   .read___more {
//     color: #0081a7;
//     font-size: 0.8rem;
//     font-style: italic;
//     font-weight: 400;
//   }
//   .featured__news {
//     display: flex;
//     flex-direction: column;
//     gap: 1.8rem;
//   }
//   .featured__news_1 {
//     display: flex;
//     align-items: center;
//     gap: 1.6rem;
//     box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.1);
//     border-radius: 0.4rem;
//     overflow: hidden;
//   }

//   .main__news {
//     max-width: 44rem;
//     p {
//       font-size: 1.6rem;
//       font-style: normal;
//       font-weight: 500;
//     }
//   }

//   .__h1 {
//     font-size: 2.5rem;
//   }

//   .news__img {
//     width: 12rem;
//     height: 9.2rem;
//   }

//   .span__light {
//     margin-top: 2rem;
//     color: #464646;
//     font-size: 1.4rem;
//     font-style: italic;
//     font-weight: 400;
//   }

//   .categories {
//     width: 134px;
//     display: flex;
//     align-items: center;
//     border-bottom: 1px solid;
//     justify-content: center;
//     padding-bottom: 2rem;
//     h4 {
//       color: #008001;
//       font-size: 1.6rem;
//       font-weight: 600;
//       line-height: normal;
//     }
//   }

//   .categories__list {
//     display: inline-flex;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 2.2rem;
//     width: 100%;
//     margin-top: 2rem;
//     h5 {
//       color: #000;
//       font-size: 1.35rem;
//       font-weight: 600;
//       line-height: normal;
//     }
//   }

//   .category__h5 {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//   }

//   .ads__sidebar {
//     height: 24.4rem;
//     margin-bottom: 2rem;
//     background: #d9d9d9;
//     .custom__style {
//       width: 100%;
//       height: 24.4rem;
//       margin-bottom: 3rem;
//     }
//   }

//   .trendy__img {
//     height: 30rem;
//     margin-bottom: 2.6rem;
//     .align-middle {
//       height: 100%;
//       object-fit: cover;
//     }
//   }

//   .ads__sidebar__1 {
//     .custom__style {
//       width: 100%;
//       height: 17rem;
//     }
//   }
// `;
