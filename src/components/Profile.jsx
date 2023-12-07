import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileWriter from "../assets/images/pngs/Profile-img-writer.png";
import Feeds1 from "../assets/images/pngs/feeds1.png";
import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";
import axios from "axios";
import { AiOutlineCalendar } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import Ads from "./Ads";
import WriterFooter from "./WriterFooter";
import { useAuthContext } from "../context/AuthContext";
import AdsSecond from "./Ads2";
import { Link, Navigate, useParams } from "react-router-dom";
import CategoryHead from "../pages/Categories/categoriesComponents/CategoryHead";
import { HOST_URL } from "../assets/js/help_func";

// const ShareButton = ({ postUrl }) => {
//   const handleCopyClick = () => {
//     // Copy the post's URL to the clipboard
//     navigator.clipboard.writeText(postUrl);
//     alert("Copied to clipboard!");
//   };

//   return (
//     <div>
//       <button onClick={handleCopyClick}>Copy Link</button>
//     </div>
//   );
// };

// export default ShareButton;

const Profile = () => {
  const { id } = useParams(); // This retrieves the ID from the URL parameter
  const { user, token } = useAuthContext();
  const [error, setError] = useState(null);
  const [creator, setCreator] = useState([]);
  const [userId, setUserId] = useState(id);
  const [blogsByCreatorslug, setBlogsByCreatorSlug] = useState();
  const [blogData, setBlogData] = useState(null);
  const [creatorsBlog, setCreatorsBlog] = useState([]);
  const [truncatedContent, setTruncatedContent] = useState("");
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const creatorslug = blogsByCreatorslug;

  // ALL URL/API ENDPOINTS DEFINITIONS
  const USERS_BLOG_URL = `${HOST_URL()}/blogs/creator/${creatorslug}`; // Replace with your actual API endpoint
  const FOLLOW_USER_URL = `${HOST_URL()}/users/${userId}/request-follow`; // Replace with your actual API
  const All_BLOGS_URL = `${HOST_URL()}/blogs`;
  const USER_URL = `${HOST_URL()}/users/username/${id}`; // Replace with your actual API endpoint

  console.log(id);
  console.log(userId);
  console.log(creatorslug);

  // const USER_URL = `https://api.tajify.com/api/users/username/${id}`; // Replace with your actual API endpoint
  // const USERS_BLOG_URL = `https://api.tajify.com/api/blogs/creator/${creatorslug}`; // Replace with your actual API endpoint

  const headers = {
    // 'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // FETCH ALL TRENDING BLOGS
  const fetchTrendingBlogs = async () => {
    try {
      const response = await axios.get(All_BLOGS_URL);

      if (response.data.data.blogs) {
        // setBlogsCategory(response.data.data.blogs);
        setTrendingBlogs(response.data.data.blogs);
      } else {
        console.error("Error fetching posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // TRUNCATE TEXT
  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    let truncatedText = words.slice(0, maxLength).join(" ");

    if (words.length > maxLength) {
      truncatedText += " ...";
    }

    return truncatedText;
  };

  // FOLLOW A USER
  const handleFollowClick = async () => {
    try {
      // const response = await axios.post(FOLLOW_USER_URL, null, {
      const response = await axios.get(FOLLOW_USER_URL, { headers });
      console.log(headers);
      // Adjust the API endpoint as needed
      if (response.status === 200) {
        setIsFollowing(true);

        // Store the isFollowing state in localStorage
        localStorage.setItem("isFollowing", JSON.stringify(true));
      }
    } catch (error) {
      console.error("Error following user:", error.data);
    }
  };

  // GET A PARTICULAR USER/CREATOR BY HIS ID
  const fetchData = async () => {
    try {
      const response = await axios.get(USER_URL);
      // const response = await axios.get(`https://api.tajify.com/api/users/${id}`);

      if (response.data.data.user) {
        // Handle the fetched data and set it in state
        // setPosts(response.data);
        console.log(response);
        setCreator(response.data.data.user);
        setBlogsByCreatorSlug(response.data.data.user.slug);
        const listallrequest = response.data.data.user.followerRequestsReceived;
        const userid = user._id;
        console.log(userid);
        console.log(listallrequest);

        // function searchUserByUsername(username) {
        const filteredUsers = listallrequest.filter(
          (listallrequest) => user._id === listallrequest
        );
        //   return filteredUsers;
        // }
        console.log(filteredUsers);
        if (filteredUsers.length > 0) {
          console.log("User(s) found:");
          setIsFollowing(true);
          // filteredUsers.forEach((user) => {
          //   console.log(`Username: ${user.username}, Email: ${user.email}`);
          // });
        } else {
          console.log("No user found with the specified username.");
        }
        // setCreatorSlug(response.data.data.user.username);
        setUserId(response.data.data.user._id);
      } else {
        console.error("Error fetching user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //  FETCH ALL BLOGS BY THAT PARTICULAR USER/CREATOR
  useEffect(() => {
    // Fetch the blog data from the API endpoint
    fetch(USERS_BLOG_URL)
      .then((response) => response.json())
      .then((data) => {
        setBlogData(data.data.blogs);
        setCreatorsBlog(data.data.blogs);
        // Truncate the content and store it in state
        const maxLength = 100; // You can adjust the desired length
        const truncated = truncateText(data.data.blogs.content, maxLength);
        setTruncatedContent(truncated);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [creatorslug]);
  console.log(USERS_BLOG_URL);
  console.log(blogData);

  useEffect(() => {
    fetchData();
    fetchTrendingBlogs();
  }, [id, user, userId, token, blogsByCreatorslug]);

  return (
    <ProfileContainer>
      {/* CREATORS BASIC DETAILS FOR VIEWERS */}

      <div className="profile">
        <div className="profile__container__1">
          <div className="profile__container">
            <div className="profile__news_img">
              <img src={creator.image} className="profile__img" />
            </div>
          </div>

          <div className="writers__container">
            <div className="profile__socials">
              <div className="mobile__socials">
                <h3>{creator.username}</h3>
                <ul className="socials__icons">
                  <li>
                    <a href="#" className="social__icon--link">
                      <AiOutlineInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social__icon--link">
                      <AiFillFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social__icon--link">
                      <AiFillTwitterSquare />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social__icon--link">
                      <BsPinterest />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="follow__container">
                <button
                  onClick={handleFollowClick}
                  className="mobile__button w-[166px] h-[40px] text-[#F06] border border-[#F06] hover:bg-[#F06] hover:text-white font-bold active:bg-[#F06] px-78 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  {/* {isFollowing && "Unfollow"} */}
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
            <p>{creator.bio}</p>
          </div>
        </div>

        {/* <CategoryHead /> */}

        {/* RETUN THE FIRST OR BEST BLOG BY THE CREATOR */}
        <div className="main__news">
          <div className="main__news__img">
            {blogData ? (
              <img
                src={blogData[0]?.image}
                alt={blogData[0]?.title}
                className="align-middle object-cover transition duration-300 ease-linear mb-5"
              />
            ) : (
              <p>Loading blog image...</p>
            )}
          </div>
          {blogData ? (
            <div className="p-4 ">
              <h1 className="bold__text__pink">{blogData[0]?.title}</h1>
              <div className="flex r-profile-container profile__comments items-center justify-between">
                <img
                  src={blogData[0]?.creator.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="r-profile">
                  <p className="text-[12px] text-gray-800">
                    {blogData[0]?.author}
                  </p>
                  <p className="text-gray-600 text-sm"></p>
                </div>
                <p className="mr-profile"></p>
                <div className="mt-2 flex items-center">
                  <AiOutlineCalendar className="text-gray-600 mr-2" />
                  <span className="text-gray-600 text-[12px]">
                    {new Date(blogData[0]?.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="r-profile">
                  <LiaComments className="text-gray-600 mr-2" />
                  <span className="text-gray-600 text-[12px]">23 Comm</span>
                </div>
              </div>
              <p dangerouslySetInnerHTML={{ __html: blogData[0]?.content }}></p>
              <div>
                <p dangerouslySetInnerHTML={{ __html: truncatedContent }}></p>
                <button
                  onClick={() => setTruncatedContent(blogData[0]?.content)}
                >
                  Show More
                </button>
              </div>
            </div>
          ) : (
            <p>Loading blog content...</p>
          )}
        </div>

        {/* AN ADD BPX FOR THE CREATOR */}
        <div
          className="ads__box--xl"
          style={{ width: "100%", height: "12rem", margin: "1.4rem 0" }}
        >
          &nbsp;
        </div>

        {/* MAP AND RETURN ALL THE CREATORS BLOGS */}
        <div className="flex flex-wrap gap-16 mt-10">
          {creatorsBlog.map((post) => (
            <div key={post._id} className="main__news__1">
              <div className="img__container">
                <img
                  src={post?.image}
                  className="align-middle w-full object-cover transition duration-300 ease-linear mb-5"
                />
              </div>
              <Link to={`/details/${post._id}`}>
                <h1 className="bold__text__pink">{post.title}</h1>
              </Link>
              <div className="r-profile-info">
                <div className="flex items-center justify-between w-full">
                  <img
                    src={post.creator?.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-[12px] text-gray-800">{post.author}</p>
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ads__sidebar">
        <div className="wrapper__div">
          <div className="header-box"></div>
          <div className="bold__text">Most Popular News</div>
        </div>
        {trendingBlogs.map((post) => (
          <div key={post._id} className="featured__news">
            <div className="featured__news_1">
              <div className="featured__news_img">
                <img src={post?.image} className="news__img" />
              </div>
              <Link to={`/details/${post._id}`}>
                <div className="featured__news_contents">
                  <p className="bold__text__blog--title">{post.title}</p>
                  <div className="span__light">1 hour ago</div>
                </div>
              </Link>
            </div>
          </div>
        ))}
        <div className="profile__ads">
          <Ads />
        </div>
        <div className="writer__foter">
          <WriterFooter />
        </div>
      </div>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  //   max-width: 1235px;
  margin-top: 34px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;

  h3 {
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
  }

  .profile__container {
    display: flex;
    height: 18rem;
    margin-bottom: 10px;
    justify-content: space;
  }

  .profile__container__1 {
    display: flex;
    gap: 2.4rem;
  }

  .view__all {
    margin-right: 10px;
  }

  .ads__sidebar {
    height: 217px;
    width: 343px;
    .custom__style {
      width: 100%;
      height: 155px;
      margin-top: 59px;
    }
  }

  .bold__text {
    color: #000;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .bold__text__blog--title {
    color: #000;
    font-style: normal;
    font-size: 12px;
    font-weight: 600;
    line-height: normal;
  }

  .wrapper__div {
    display: flex;
    align-items: end;
    max-width: 209px;
    margin-bottom: 20px;
  }
  .header-box {
    width: 11px;
    height: 29px;
    color: black;
    margin-right: 11px;
    background-color: #4caf50;
  }

  .featured__news_1 {
    display: flex;
    // align-items: center;
    justify-content: space-between;
  }

  .featured__news_img {
    min-width: 62%;
    height: 92px;
    margin-bottom: 15px;
  }

  .span__light {
    font-size: 10px;
  }

  // .featured__news_img {
  //   width: 118px;
  //   height: 92px;
  //   margin-right: 23px;
  // }

  .profile__news_img {
    height: 18rem;
    overflow: hidden;
    border-radius: 2rem;
  }

  .profile__img {
    height: 100%;
  }

  .profile__container__1 .writers__container {
    height: 190px;
    margin: 0;
  }

  .featured__news_contents {
    .bold__text {
      color: #000;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 15px;
    }
  }

  .socials__icons {
    display: flex;
    gap: 1.2rem;
    margin-top: 10px;
  }

  .social__icon--link:link,
  .social__icon--link:visited {
    color: gray;
    text-decoration: none;
    font-size: 2.6rem;
  }

  .profile {
    max-width: 90rem;
    margin-right: 3rem;
  }

  .profile__socials {
    display: flex;
    margin-bottom: 20px;
  }

  .main__news__img {
    width: 100%;
    height: 30rem;
  }

  .news__img {
    object-fit: cover;
    width: 80%;
    height: 100%;
  }

  .main__news {
    margin-top: 2rem;
    margin-bottom: 27px;
    border-top: 2px solid #eee;
    border-bottom: 2px solid #eee;
  }

  .main__news__1 {
    max-width: 400px;
    // margin-right: 1.6rem;
    // margin-top: 20px;
  }

  .profile__comments {
    max-width: 380px;
    margin-top: 10px;
    margin-bottom: 18px;
  }

  .bold__text__pink {
    color: #f06;
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.3;
  }

  .profile__ads {
    .custom__style {
      height: 252px;
    }
  }
  .writer__foter {
    .custom__style {
      height: 95px;
    }
  }

  .ads__second {
    max-width: 728px;
    display: flex;
    margin-bottom: 33px;
    margin-top: 33px;
    .custom__style {
      width: 100%;
      margin-left: 118px;
    }
  }

  .r-profile-container {
    display: flex;
    gap: 1.2rem;
  }

  .r-profile {
    display: flex;
  }

  .main__news_img {
    width: 388px;
    height: 242px;
  }

  .align-middle {
    object-fit: cover;
  }

  .img__container {
    width: 40rem;
    height: 24rem;
    margin-bottom: 1rem;
  }

  .r-profile-info {
    display: flex;
  }

  @media screen and (max-width: 70.625em) {
    display: block;

    .writers__container {
      max-width: 400px;
    }
  }

  @media screen and (max-width: 50.625em) {
    .profile__container__1 {
      display: block;
    }
    .writers__container {
      max-width: 100%;
    }
    .profile__socials {
      display: block;
    }
    .follow__container {
      margin-top: 20px;
    }
    .main__news {
      margin-top: 10rem;
    }
    .ads__box--xl {
      width: 100%;
    }
    .mobile__socials {
      display: flex;
      justify-content: space-between;
    }
    .ads__sidebar {
      margin-top: 30px;
    }
  }
`;
