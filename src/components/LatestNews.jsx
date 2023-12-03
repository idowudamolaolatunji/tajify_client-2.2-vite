import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ai from "../assets/images/pngs/Ai.png";
import Ai2 from "../assets/images/pngs/Ai-2.png";
import { AiOutlineCalendar } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import { BiTime } from "react-icons/bi";
import Ads from "./Ads";
import WriterFooter from "../components/WriterFooter";
import axios from "axios";
import { Link } from "react-router-dom";
import { HOST_URL } from "../assets/js/help_func";

const All_BLOGS_URL = `${HOST_URL()}/blogs`; // Updated API URL
// const All_BLOGS_URL = HOST_URL() + "https://api.tajify.com/api/blogs"; // Updated API URL
// const All_BLOGS_URL = "http://localhost:3005/api/blogs"; // Updated API URL

const LatestNews = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(All_BLOGS_URL);

        if (response.data.data.blogs) {
          // Handle the fetched data and set it in state

          setPosts(response.data.data.blogs.slice(0, 10));
        } else {
          console.error("Error fetching posts");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <LatestNewsContainer>
      <div className="featured__container">
        <div className="lifestyle">
          <div className="wrapper__div">
            <div className="header-box"></div>
            <div className="section__header--title">Latest News</div>
          </div>

          <div className=" news__flex flex flex-wrap gap-5">
            {posts.map((post) => (
              <div key={post._id} className="main__news">
                <div className="news__img">
                  <Link to={`/details/${post._id}`}>
                    <img
                      src={post.image}
                      className="align-middle w-full object-cover transition duration-300 ease-linear mb-5"
                    />
                  </Link>
                </div>
                <h1 className="bold__text">{post.title}</h1>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <img
                      src={post.creator?.image}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                     
                      <Link to={`/${post.author}/blogs`}>

                        <p className="text-[10px] text-gray-800">
                          {post.author}
                        </p>
                      </Link>
                      <p className="text-gray-600 text-sm"></p>
                    </div>
                    <p className="mt-2 text-gray-700"></p>
                    <div className="mt-2 flex items-center">
                      <AiOutlineCalendar className="text-gray-600 mr-2" />
                      <span className="text-gray-600 text-[10px]">
                        {new Date(post.date).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <LiaComments className="text-gray-600 mr-2" />
                      <span className="text-gray-600 text-[10px]">23 Comm</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="main__news">
              <div className="news__img">
                <img
                  src={News4}
                  className="align-middle w-full object-cover transition duration-300 ease-linear mb-5"
                />
              </div>
              <h1 className="bold__text">
              {post.title} 
              </h1>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-[10px] text-gray-800">John Doe</p>
                    <p className="text-gray-600 text-sm"></p>
                  </div>
                  <p className="mt-2 text-gray-700"></p>
                  <div className="mt-2 flex items-center">
                    <AiOutlineCalendar className="text-gray-600 mr-2" />
                    <span className="text-gray-600 text-[10px]">
                    {new Date(post.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <LiaComments className="text-gray-600 mr-2" />
                    <span className="text-gray-600 text-[10px]">23 Comm</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="featured__articles">
          <div className="featured__articles__ads">
            <Ads />
          </div>
          <h3 className="featured__h3 ">Featured Articles</h3>
          <div className="my-6">
            <h4 className="featured__h4 my-6 ">
              The Great AI Disruption: Six Startling Predictions That Will Shape
              Our Lives and Test O...
            </h4>
            <div className="featured__news_1">
              <div className="featured__news_img">
                <img src={Ai} className="" />
              </div>
              <div className="featured__news_contents">
                <div className="span__light">
                  As we rapidly advance into an AI-driven world, our lives are
                  becoming more intertwined with artificial..read more...
                  <span className="read___more">View More</span>
                </div>
                <div className="mt-2 flex items-center">
                  <BiTime className="text-gray-600 mr-2" />
                  <span className="text-gray-600 font-bold text-[10px]">
                    03: 23pm
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="my-6">
            <h4 className="featured__h4 my-6 ">
              The Great AI Disruption: Six Startling Predictions That Will Shape
              Our Lives and Test O...
            </h4>
            <div className="featured__news_1">
              <div className="featured__news_img">
                <img src={Ai2} className="" />
              </div>
              <div className="featured__news_contents">
                <div className="span__light">
                  But I must explain to you how all this mistaken idea of
                  denouncing sure and praising pain was born and I will give you
                  a complete account.
                  <span className="read___more">View More</span>
                </div>
                <div className="mt-2 flex items-center">
                  <BiTime className="text-gray-600 mr-2" />
                  <span className="text-gray-600 font-bold text-[10px]">
                    03: 23pm
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="writer__foter">
            <WriterFooter />
          </div>
        </div>
      </div>
    </LatestNewsContainer>
  );
};

export default LatestNews;

const LatestNewsContainer = styled.div`
  .featured__container {
    display: flex;
    margin-top: 34px;
    margin-bottom: 10px;
  }

  .news__flex {
    width: 678px;
    display: flex;
    justify-content: space-between;
  }

  .featured__h3 {
    color: #008001;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
  }

  .featured__h4 {
    color: #f06;
    font-size: 20px;
    font-weight: 600;
    line-height: normal;
  }

  .wrapper__div {
    display: flex;
    align-items: end;
    max-width: 158px;
  }
  .header-box {
    width: 11px;
    height: 29px;
    color: black;
    margin-right: 11px;
    background-color: #4caf50;
  }

  .span__light {
    font-size: 11px;
  }

  .bold__text {
    color: #f06;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .section__header--title {
    color: #f06;
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .main__news {
    max-width: 315px;
    // margin-right: 23px;
    margin-top: 20px;
  }

  .featured__news_1 {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin-bottom: 32px;
  }

  .featured__news_img {
    margin-right: 10px;
    width: 310px;
    height: 109px;
    img {
      width: 100%;
      object-fit: cover;
      overflow: hidden;
    }
  }

  .news__img {
    width: 315px;
    // height: 127px;
    margin-right: 9px;
  }

  // .lifestyle {
  //   max-width: 689px;
  // }

  .main__news__img {
    max-width: 315px;
    margin-top: 20px;
  }

  .featured__articles {
    width: 361px;
    margin-top: 48px;
    margin-left: 30px;
    .featured__articles__ads {
      // width: 363px;
      margin-bottom: 41px;
      height: 252px;
      background: #d9d9d9;
      .custom__style {
        width: 100%;
        height: 100%;
        margin-bottom: 40px;
      }
    }
  }

  .featured__news_contents {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .read___more {
    color: #0081a7;
    font-size: 8px;
    font-style: italic;
  }

  .writer__foter {
    .custom__style {
      width: 363px;
      height: 135px;
      background: #d9d9d9;
    }
  }

  @media screen and (max-width: 768px) {
    .featured__container {
      display: grid;
    }
  }

  @media screen and (max-width: 668px) {
    .news__flex {
      display: grid;
      width: 90%;
    }
    .featured__articles {
      width: 100%;
      margin-left: 0px;
    }
    // .featured__articles {
    //   width: 326px;
    // }
    .main__news {
      max-width: 100%;
    }
    .news__img {
      width: 100%;
    }

    .writer__foter .custom__style {
      width: 100%;
    }

    .featured__news_1 {
      margin-bottom: 65px;
    }
  }

  @media screen and (max-width: 412px) {
    .featured__articles {
      width: 80%;
    }

    .main__news {
      max-width: 85%;
    }

    .news__img {
      width: 100%;
    }

    //   .lifestyle {
    //     width: 77%;
    // }
  }
`;
