import React, { useEffect, useRef, useState } from "react";

import AdsSecond from "../../components/Ads2";
// import SubHeader from "../../components/SubHeader";
import Navbar from "../../components/Navbar";
import Currency from "react-currency-formatter";
import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import AvatarImg from "../../assets/images/pngs/avatar.png";
import { BsPinterest } from "react-icons/bs";
// import { PiHandsClappingThin } from "react-icons/pi";
// import { FiShare } from "react-icons/fi";
import { IoShareOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { BsSave } from "react-icons/bs";
import axios from "axios";
// import "../../index.css";
import "../../pages/blogDetails/blogDetails.css";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import TreadingArticles from "../../components/TreadingArticles";
import { useAuthContext } from "../../context/AuthContext";
import Profile from "../../components/Profile";
// import Loader from "../../components/Loader";
import LoaderSpiner from "../../components/LoaderSpinner";
import Comments from "../../components/comments/Comments";
import Notification from "../../components/notification/Notification";
// import CategoryHead from "../Categories/categoriesComponents/CategoryHead";
import CategoryBlogs from "../Categories/categoriesComponents/CategoryBlogs";
import { HOST_URL } from "../../assets/js/help_func";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ArticleSocialInfo from "../../components/ArticleSocialInfo";
import Premium from "../../components/Premium";
import BlogNavbar from "../../components/Navbar";


const BlogDetails = () => {
  const { user, token } = useAuthContext();
  const { id } = useParams(); // This retrieves the ID from the URL parameter

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const commentBar = queryParams.get("commentBar");

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(commentBar);
  const profileBoxRef = useRef(null); // Create a ref for the profile
  const [isFollowing, setIsFollowing] = useState(false);

  const [isShared, setIsShared] = useState(false);
  const [likes, setLikes] = useState(5);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [creator, setCreator] = useState([]);
  const [userId, setUserId] = useState(id);
  const [creatorslug, setCreatorSlug] = useState();
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [premium, setPremium] = useState(false);

  // const SINGLE_BLOGS_URL = `http://localhost:3005/api/blogs/${id}`;
  const USER_URL = `${HOST_URL()}/users/${id}`; // Replace with your actual API endpoint
  // const USER_URL = `https://api.tajify.com/api/users/username/${id}`; // Replace with your actual API endpoint
  const FOLLOW_USER_URL = `${HOST_URL()}/users/${userId}/request-follow`; // Replace with your actual API endpoint
  // const FOLLOW_USER_URL = "https://api.tajify.com/api/users/65158a3db5daafe0fef241b3/request-follow"; // Replace with your actual API
  const RELATED_BLOGS = `${HOST_URL()}/blogs/related-posts/${id}`; // Updated API URL

  console.log(id);
  console.log(userId);
  const SINGLE_BLOGS_URL = `${HOST_URL()}/blogs/${id}`;
  const SHARE_BLOGS_URL = `${HOST_URL()}/blogs/sharePost`;

  // AUTHORIZATION
  const headers = {
    // 'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // FUNCTION TO SHARE POST

  const handleShare = async () => {
    try {
      const response = await axios.post(SHARE_BLOGS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setIsShared(true);
      }
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  // FETCHING ALL USERS DATA
  const fetchData = async () => {
    try {
      const response = await axios.get(USER_URL);
      // const response = await axios.get(`https://api.tajify.com/api/users/${id}`);

      if (response.data.data.user) {
        // Handle the fetched data and set it in state
        // setPosts(response.data);
        console.log(response);
        setCreator(response.data.data.user);
        setCreatorSlug(response.data.data.user.slug);
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

  console.log(creatorslug);

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

  // FUNCTION TO TOGGLE LIKE
  const toggleLike = () => {
    // Simulate toggling the like on the client side
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }

    // Toggle liked state
    setLiked(!liked);

    // Make an API request to the server to update the like status
    // You'll need to implement this part on your Node.js server
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // FUNCTION TO HANDLE OUTSIDE CLICK
  useEffect(() => {
    // Function to handle clicks outside of the profile box
    const handleOutsideClick = (event) => {
      if (
        profileBoxRef.current &&
        !profileBoxRef.current.contains(event.target)
      ) {
        // Clicked outside the profile box, close the dropdown
        setIsDropdownOpen(false);
      }
    };

    // Add an event listener to the document body
    document.body.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Empty dependency array means this effect runs once after mounting

  // GETTING SINGLE BLOGS
  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0); // Scroll to the top of the page

    const fetchData = async () => {
      try {
        const response = await axios.get(SINGLE_BLOGS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data.blog) {
          // Handle the fetched data and set it in state
          setPost(response.data.data.blog);
          setPremium(response.data.data.blog.isPremium);
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
  }, [id, token]);

  // const premium = (post.isPremium)

  console.log(premium);
  //  Truncate text to either 1000 words or 10 lines
  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    let truncatedText = words.slice(0, maxLength).join(" ");

    if (words.length > maxLength) {
      truncatedText += " ...";
    }

    return truncatedText;
  };

  // GET RELATED BLOGS TO THE ONE THAT WILL MOUNTED ON THIS PAGE
  const fetchRelatedBlogs = async () => {
    try {
      const response = await axios.get(RELATED_BLOGS);

      if (response.data.data.randomlyRelatedBlogPosts) {
        const truncatedPosts = response.data.data.randomlyRelatedBlogPosts
          .slice(0, 3)
          .map((post) => ({
            ...post,
            content: truncateText(post.content, 60),
          }));
        // setBlogsCategory(response.data.data.blogs);
        setRelatedBlogs(truncatedPosts);
      } else {
        console.error("Error fetching posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(relatedBlogs);
  console.log(post.creator?.image);

  useEffect(() => {
    fetchRelatedBlogs();
  }, []);

  // FOR ALL CREATORS
  // useEffect(() => {
  //   // Fetch the list of creators from your API
  //   // fetch("http://localhost:3005/api/users")
  //   fetch("https://api.tajify.com/api/users")
  //     // fetch(`https://api.tajify.com/api/users/username/${id}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const users = data.data.users;
  //       setCreators(users);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //       console.error("Error fetching creators:", error);
  //     });
  // }, []);

  useEffect(() => {
    fetchData();
  }, [id, user, userId, token]);

  {
    return (
      <div className="blog__container">
        {/* <div className="header__style">
          <Navbar />
        </div> */}
        <BlogNavbar />


        {loading ? (
          <div className="loader__container">
            <LoaderSpiner />
          </div>
        ) : post ? ( // Check if post is not null before rendering
          <div key={post._id} className="blog__content">
            <div className="content__container">
              {/* <div className="ads__body">
              <div className="ads__second">
                <AdsSecond />
              </div>
            </div> */}
              <div className="ads__box--big width-100">&nbsp;</div>

              <div className="writers__stats">
                <div className="writers__stats__container">
                  <div className="img__and__details__container">
                    <h1 className="blog__title">{post.title}</h1>
                    <div className="img__and__details">
                      <div>
                        <div className="profile__comments">
                          <div className="profile__photo">
                            {/* <img src={creator.image} alt="Profile" className="" /> */}
                            <img
                              src={post.creator?.image}
                              alt="creator's image"
                              className=""
                            />
                          </div>
                          <div>
                            <Link to={`/${post.author}/blogs`}>
                              <p className="blog__author font-bold text-[#F06]">
                                {post.author}
                              </p>
                            </Link>
                            <p className="blog__info">
                              7 min &nbsp;
                              {new Date(post.date).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleFollowClick}
                        className="mobile__button w-[166px] h-[40px] text-[#F06] border border-[#F06] hover:bg-[#F06] hover:text-white font-bold active:bg-[#F06] px-78 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        {/* <button className="w-[166px] h-[40px] bg-[#F06] text-center text-white flex items-center cursor-pointer justify-center rounded-lg p-21 px-78"> */}
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                    <div className="img__and__details__2">
                      <div className="blog__metrics">
                        {/* <PiHandsClappingThin className="writer__icons" />
                        <span>4.5k</span> */}
                        <div className="reaction">
                          {liked ? (
                            <AiFillHeart
                              onClick={toggleLike}
                              className="writer__icons"
                              style={{ color: "red" }}
                            />
                          ) : (
                            <AiOutlineHeart
                              className="writer__icons"
                              style={{ color: "#F06" }}
                              onClick={toggleLike}
                            />
                          )}
                          {/* <span className="">{likes} likes</span> */}
                          <span className="">{likes}</span>
                        </div>
                        <div className="reaction">
                          {/* Render the comment icon and attach a click handler */}
                          <div onClick={toggleDropdown} className="reaction">
                            <AiOutlineComment
                              className="writer__icons"
                              style={{ color: "#F06" }}
                              onClick={toggleDropdown}
                            />

                            {/* Render the comment count */}

                            <span>2</span>
                          </div>
                        </div>
                        <div className="reaction">
                          <div className="reaction">
                            <IoShareOutline
                              className="writer__icons"
                              style={{ color: "#F06" }}
                              onClick={handleShare}
                            />
                            {isShared && <p>Post shared successfully!</p>}
                          </div>
                        </div>
                        {premium && (
                          <div className="premium">
                            <Premium />
                            <div className="subscription__fee">
                              <Currency
                                quantity={post.subscriptionFee}
                                currency="NGN"
                              />
                            </div>
                          </div>
                        )}

                        {isDropdownOpen && (
                          <Comments toggleDropdown={toggleDropdown} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blog__post--picture">
                <div className="main__news__img">
                  <img
                    src={post.image}
                    alt={`Image for ${post.title}`}
                    className="align-middle w-full object-cover transition duration-300 ease-linear mb-5"
                  />
                </div>
              </div>
              <div className="paragraph__container">
                <p
                  className="details__paragraph"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              <div className="membership">
                <div className="referal__link">
                  {/* <h2>
                    Join Tajify with my referral link — <a>{post.author}</a>
                  </h2> */}
                  <h2>
                    Join Tajify with my referral link —{" "}
                    <a
                      href={post.author}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.author}
                    </a>
                  </h2>

                  <h3 className="member">
                    As a Tajify member, a portion of your membership fee goes to
                    writers you read, and you get full access to every story…
                  </h3>
                  <span className="writer__link">{post.creator?.email}</span>
                </div>
                <div className="refferal__img">
                  <img
                    src={post.creator?.image}
                    className="align-middle mb-5"
                  />
                </div>
              </div>
              <div>
                <div className="profile__container-main">
                  <div className="profile__container">
                    <div className="profile__news_img">
                      <img src={post.creator?.image} className="profile__img" />
                    </div>
                  </div>
                  <div className="writers__container">
                    <div className="profile__socials">
                      <div className="profile__socials__1">
                        <h3 className="font-bold text-[#F06]">{post.author}</h3>
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
                      <div>
                        <button className="mobile__button w-[166px] h-[40px] bg-[#F06] text-center text-white flex items-center cursor-pointer justify-center rounded-lg p-21 px-78">
                          Follow
                        </button>
                      </div>
                    </div>
                    <p>{post.creator?.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No post found</p>
        )}

        <div className="content__container">
          <div className="related__article">
            <h4 className="related__article--heading">Related Posts</h4>
            <div className="category__related--article-card">
              <figure className="article__figure">
                {relatedBlogs.map((post) => (
                  <div key={post._id} className="lifestylee">
                    <Link to={`/details/${post._id}`}>
                      <div className="article__image--box">
                        <img
                          src={post.image}
                          alt="image"
                          className="article__image"
                        />
                      </div>
                    </Link>
                    <div className="article__content--box">
                      <div className="article__author-info">
                        <img
                          src={post.creator.image}
                          alt={`author image: ${AvatarImg}`}
                          className="article-author__image"
                        />
                        <span className="author">
                          <Link to={`/${post.author}/blogs`}>
                            <h4 className="article__author">{post.author}</h4>
                          </Link>
                          <p className="article__time">{post.time}</p>
                        </span>
                        <HiOutlineDotsVertical
                          style={{ cursor: "pointer", marginLeft: "auto" }}
                        />
                      </div>
                      <h3 className="article__heading">{post.title}</h3>
                      <div
                        className="article__text"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      ></div>

                      <ArticleSocialInfo avatarImg={AvatarImg} />
                    </div>
                  </div>
                ))}
              </figure>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
    {
      /* })
    ) : (
      <div>No creators found.</div>
    ); */
    }
  }
};

export default BlogDetails;

// const BlogDetailsContainer = styled.div`

// `;
