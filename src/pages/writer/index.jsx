import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ads from "../../components/Ads";
import Filter from "../../components/Filter";
import TrendyNews from "../../components/TrendyNews";
import Writers from "../../components/Writers";
import BlogCategory from "../../components/BlogCategory";
import LatestNews from "../../components/LatestNews";
import { BiTime } from "react-icons/bi";
import "../../index.css";
import "../../pages/blogHome/main.css";
import MainHeader from "../../components/MainHeader";
import TopCreators from "../../components/TopCreators";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import LoaderSpinner from "../../components/LoaderSpinner";
import { HOST_URL } from "../../assets/js/help_func";
import CategoryHead from "../Categories/categoriesComponents/CategoryHead";

// const All_BLOGS_URL = "https://api.tajify.com/api/blogs"; // Updated API URL
const All_BLOGS_URL = `${HOST_URL()}/blogs`; // Updated API URL

const Writer = () => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);


  // FETCH ALL BLOGS
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(All_BLOGS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data.blogs) {
          // Handle the fetched data and set it in state

          setPosts(response.data.data.blogs.slice(0, 6));
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
  }, [token]);

  useEffect(() => {
    // This code will run after the component has rendered
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <WriterContainer>
      {/* <div className="index__page"> */}
      <div>
        <div className="header__style">
          <Navbar />
        </div>

        {loading ? (
          <div className="loader__container">
            <LoaderSpinner />
          </div>
        ) : posts ? (
          <div className="custom__alignment">
            <div className=" custom__width ">
              {/* <div className="writers-body flex justify-between text-center items-center h-[90px] mt-[33px] mb-[33px] "> */}
              <div className="writers-body">
                <div
                  style={{
                    clipPath: "polygon(0 0, 78% 0, 100% 100%, 0% 100%)",
                  }}
                  className=" polygon__button"
                >
                  <span className="span__white">Top News</span>
                </div>

                <div className="marque__div">
                  <Marquee>
                    {posts.map((post) => (
                      <span className="span__style marque__span">
                        {post.title}
                      </span>
                    ))}
                  </Marquee>
                </div>
                <div
                  className="mobile__ad ads__box--xl"
                  style={{ width: "60%", height: "12rem" }}
                >
                  &nbsp;
                </div>
              </div>

              <div className="mobile__ad__and--editor flex justify-between items-end mb-10">
                <div
                  className="mobile__ads__box--xl ads__box--xl ads__box--sm"
                  // style={{ width: "80%", height: "12rem" }}
                  style={{ height: "12rem" }}
                >
                  &nbsp;
                </div>
                <div>
                  <Link to="/editor">
                    <button
                      className="mobile__button w-[166px] h-[40px] text-[#F06] border border-[#F06] hover:bg-[#F06] hover:text-white font-bold active:bg-[#F06] px-78 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Add Post
                    </button>
                  </Link>
                </div>
              </div>
              {/* <Feeds /> */}
              <Filter />
              <TrendyNews posts={posts} />
              <TopCreators />
              <div className="ads__box--xl">&nbsp;</div>
              {/* <div className="blog_category">
                <div className="wrapper__header--div">
                  <div className="header-box"></div>
                  <div className="section__header--title">Blog Categories</div>
                </div>

                <CategoryHead />
              </div> */}
              {/* <Writers /> */}
              <BlogCategory />
              <div className="custom__width">
                <LatestNews />
              </div>
            </div>
          </div>
        ) : (
          <p>No post found</p>
        )}
      </div>
    </WriterContainer>
  );
};

export default Writer;

const WriterContainer = styled.div`
  margin-bottom: 80px;

  .custom__width {
    max-width: 120rem;
    height: 100%;
    margin: 0 auto;
    padding: 0 2.8rem;
  }

  .writers-body {
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    height: 90px;
    margin-top: 33px;
    margin-bottom: 33px;
    // flex justify-between text-center items-center h-[90px] mt-[33px] mb-[33px]
  }

  .polygon__button {
    width: 145px;
    height: 44px;
    background-color: #4caf50;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blog_category {
    margin-top: 40px;
    .icon-container--tabs-right {
      right: 0px !important;
      bottom: 25px !important;
      width: 32px !important;
      height: 34px !important;
    } 
  }

  .wrapper__header--div {
    display: flex;
    align-items: end;
    max-width: 158px;
    margin-left: 30px;
  }
  .header-box {
    width: 11px;
    height: 29px;
    color: black;
    margin-right: 11px;
    background-color: #4caf50;
  }

  .bold__text {
    color: #f06;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .span__white {
    color: white;
  }

  // .custom__alignment {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }

  // .index__page {
  //   .header {
  //     background-color: #008001;
  //     max-width: 100%;
  //     color: #fff;
  //   }
  //   .navbar__icons {
  //     color: #fff;
  //   }

  //   .navbar__list--link:visited {
  //     color: #fff;
  //   }

  //   .nav__button {
  //     color: #fff;
  //   }
  // }

  .header__style {
    .navbar__icons {
      color: #fff;
    }
    .profile__name {
      color: #fff;
    }
    .header {
      background: #008001;
      .navbar__list--link {
        color: #fff;
      }
    }
    .navbar__list--link {
      color: #fff;
    }
    .header__logo-2 {
      color: #fff;
    }
    .nav__button {
      color: #fff;
      border: 1px solid;
      box-shadow: none;
    }
  }

  .sidebar {
    position: absolute;
    top: 999px;
    right: 9%;
    width: 229px;
  }

  .ads__first {
    width: 728px;
    background: #d9d9d9;
    height: 90px;
    .custom__style {
      width: 100%;
    }
  }

  .marque__span {
    margin: 0 10px;
  }

  .ads__second {
    width: 920px;
    height: 122px;
    background: #d9d9d9;
    display: flex;
    justify-content: space-between;
    .custom__style {
      width: 100%;
      // margin-bottom: 30px;
    }
  }

  // .ads__second__ {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   max-width: 1235px;
  // }

  .ads__second__ {
    height: 111px;
    max-width: 1239px;
    align-items: center;
    margin-top: 136px;
    display: flex;
    justify-content: space-between;
    .custom__style {
      width: 100%;
    }
  }
  .ads__second__1 {
    width: 831px;
    height: 111px;
    background: #d9d9d9;
    display: flex;
    justify-content: space-between;
    .custom__style {
      width: 100%;
    }
  }

  .span__style {
    font-size: 13px;
    font-weight: 500;
    color: #000;
    width: 362px;
    height: 20px;
  }

  .categories {
    width: 134px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    justify-content: center;
    padding-bottom: 20px;
    h4 {
      color: #008001;
      font-size: 16px;
      font-weight: 600;
      line-height: normal;
    }
  }

  .bold__text {
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
  }

  .section__header--title {
    color: #f06;
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .marque__div {
    max-width: 300px;
  }

  @media screen and (max-width: 600px) {
    .mobile__ad {
      display: none;
    }

    .mobile__ads__box--xl {
      width: 95%;
    }

    .mobile__ad__and--editor {
      display: block;
    }

    .mobile__button {
      width: 95%;
      margin-top: 30px;
    }
    .marque__div {
      max-width: 238px;
    }
  }
`;

/*

  @media screen and (max-width: 900px) {
    .writers-body {
      display: inline-block;
    }
  }

  @media screen and (max-width: 1200px) {
    .ads__second {
      max-width: 637px;
    }

    .ads__second__1 {
      max-width: 495px;
    }

    .recommended__sidebar {
      max-width: 236px;
    }

    .ads__first {
      width: 488px;
    }
    .custom__width {
      .featured__container {
        height: 100%;
      }
    }

    .main__news {
      max-width: 254px;
    }

    .featured__articles {
      max-width: 321px;
    }

    .news__flex {
      max-width: 563px;
    }
  }

*/
