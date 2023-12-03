import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineCalendar } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import Lifestyle from "../assets/images/pngs/lifestyle.png";
import profilePhoto3 from "../assets/images/profile-image.jfif";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { HOST_URL } from "../assets/js/help_func";

// const All_BLOGS_URL = "http://localhost:3005/api/blogs"; // Updated API URL
const All_BLOGS_URL = `${HOST_URL()}/api/blogs`// Updated API URL
// const All_BLOGS_URL = "https://api.tajify.com/api/blogs"; // Updated API URL
// const All_USERS_URL = "https://api.tajify.com/api/users"; // Updated API URL
const All_USERS_URL = `${HOST_URL()}/api/users`; // Updated API URL

const BlogCategory = ({ category }) => {
  const { token } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [creators, setCreators] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  Truncate text to either 1000 words or 10 lines
  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    let truncatedText = words.slice(0, maxLength).join(" ");

    if (words.length > maxLength) {
      truncatedText += " ...";
    }

    return truncatedText;
  };

  useEffect(() => {
    // Fetch the list of creators from your API
    // fetch("https://api.tajify.com/api/users")
    fetch(All_USERS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const users = data.data.users.slug;
        setCreators(users);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Error fetching creators:", error);
      });
  }, []);

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
          const truncatedPosts = response.data.data.blogs
            .slice(0, 3)
            .map((post) => ({
              ...post,
              content: truncateText(post.content, 60),
            }));
          setPosts(truncatedPosts);
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

  return (
    <BlogCategoryContainer>
      <div className="blog__category__container blogs">
        {/* Render your posts here */}
        {posts.map((post) => (
          <div key={post._id} className="lifestyle">
            <div className="wrapper__div">
              <div className="header-box"></div>
              <div className="bold__text">{post.category}</div>
            </div>
            <div className="main__news">
              <Link to={`/details/${post._id}`}>
                <img
                  src={post.image}
                  className="align-middle w-full object-cover transition duration-300 ease-linear mb-5"
                  alt="Sport"
                />
              </Link>
              <h1 className="bold__text">{post.title}</h1>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  {/* <Link to={`/writers-profile/${creators.slug}`}> */}
                  <img
                    src={profilePhoto3}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  {/* </Link> */}
                  <div>
                    <p className="text-[12px] text-gray-800">{post.author}</p>
                    {/* <p className="text-[12px] text-gray-800">{post.creator.username}</p> */}
                    <p className="text-gray-600 text-sm"></p>
                  </div>
                  <p className="mt-2 text-gray-700"></p>
                  <div className="mt-2 flex items-center">
                    <AiOutlineCalendar className="text-gray-600 mr-2" />
                    <span className="text-gray-600 text-[12px]">
                      {new Date(post.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <LiaComments className="text-gray-600 mr-2" />
                    <span className="text-gray-600 text-[12px]">23 Comm</span>
                  </div>
                </div>
                <div
                  className="span__light"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                >
                  {/* {post.content} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BlogCategoryContainer>
  );
};

export default BlogCategory;

const BlogCategoryContainer = styled.div`
  .blog__category__container {
    max-width: 120rem;
    display: flex;
    margin-top: 34px;
    margin-bottom: 10px;
    margin-top: 98px;
    justify-content: space-between;
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
    margin-top: 20px;
  }

  .bold__text {
    color: #F06;
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .main__news {
    max-width: 400px;
    margin-right: 23px;
    margin-top: 20px;
    margin-bottom: 27px;
  }

  .featured__news_1 {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin-bottom: 16px;
  }

  .featured__news {
    margin-right: 23px;
  }

  .featured__news_img {
    margin-right: 10px;
    img {
      width: 485px;
    }
  }

  .news__img {
    width: 330px;
    height: 127px;
    margin-right: 9px;
  }

  .lifestyle {
    width: 400px;
  }

  // .lifestyle {
  //   display: flex;
  //   flex-wrap: wrap; /* Allow cards to wrap to the next line */
  //   justify-content: space-between; /* Distribute cards evenly across the row */
  // }

  // /* Adjust card width based on screen size */
  // .main__news,
  // .featured__news {
  //   flex: 0 0 calc(50% - 12px); /* Initially 2 cards per row on screens above 768px */
  //   margin-bottom: 20px; /* Space between rows */
  // }

  @media (max-width: 768px) {
    .blog__category__container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .main__news,
    .featured__news {
      flex: 0 0 100%; /* 1 card per row */
    }
  }
`;












