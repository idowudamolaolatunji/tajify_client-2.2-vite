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
  AiFillCheckCircle,
  AiFillExclamationCircle,
} from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import AvatarImg from "../../assets/images/pngs/avatar.png";
import { BsPinterest } from "react-icons/bs";
// import { PiHandsClappingThin } from "react-icons/pi";
// import { FiShare } from "react-icons/fi";
import { IoShareOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { BsSave } from "react-icons/bs";
import axios from "axios";
import "../../pages/blogDetails/blogDetails.css";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Cookies from "js-cookie";
import { useAuthContext } from "../../context/AuthContext";
// import Loader from "../../components/Loader";
import LoaderSpiner from "../../components/LoaderSpinner";
import Comments from "../../components/comments/Comments";
import Notification from "../../components/notification/Notification";
import { HOST_URL } from "../../assets/js/help_func";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ArticleSocialInfo from "../../components/ArticleSocialInfo";
import Premium from "../../components/Premium";
import BlogNavbar from "../../components/Navbar";

/////////////////////////////////////////////////////////
import Alert from '../../components/Alert';
import { dateConverter } from '../../utils/helper';


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
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [creator, setCreator] = useState([]);
  const [userId, setUserId] = useState(id);
  const [creatorslug, setCreatorSlug] = useState();
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [premium, setPremium] = useState(false);
  const [truncatedContent, setTruncatedContent] = useState("");

  /////////////////////////////////////////////////////////////
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [followerStatus, setFollowerStatus] = useState('');
  const [postCreator, setpostCreator] = useState(null);


  function handleReset() {
    setIsError(false);
    setMessage('')
    setIsSuccess(false);
    setMessage();
  }

  // HANDLE ON FETCH FAILURE
  function handleFailure(mess) {
    setIsError(true);
    setMessage(mess)
    setTimeout(() => {
        setIsError(false);
        setMessage('')
    }, 2000);
  }



  const USER_URL = `${HOST_URL()}/users/${id}`;
  const FOLLOW_USER_URL = `${HOST_URL()}/users/${userId}/request-follow`;
  const RELATED_BLOGS = `${HOST_URL()}/blogs/related-posts/${id}`;

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
        console.log(response.data.data.user);
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

  console.log(post.creator)

  // FOLLOW A USER
  async function handleFollow() {
    try {

      handleReset();
      const res = await fetch(`http://localhost:3005/api/users/${post.creator._id}/request-follow`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      if(!res.ok) throw new Error('Something went wrong!');

      const data = await res.json();
      if(data.status !== 'success') {
        throw new Error(data.message);
      }
      console.log(data);
      

    } catch (err) {
      handleFailure(err.message)
    }
  };

  
  //////////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchCurrPost() {
      try {
        const res = await fetch(`http://localhost:3005/api/blogs/${post._id}`, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
          }
        });
        const data = await res.json();
        if(data.data.blog.likes.includes(user._id)) {
          setLiked(true)
        }
        setLikes(data.data.blog.likes.length || 0)
        console.log(data)
      } catch(err) {
        console.error(err.message)
      }
    }
    fetchCurrPost()
  }, [post]);


  useEffect(() => {
    async function fetchCreator() {
      try {
        const res = await fetch(`http://localhost:3005/api/users/${post.creator._id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(!res.ok) throw new Error('Something went wrong!');
        const data = await res.json();
        if(data.status !== 'success') {
          throw new Error(data.message);
        }
        const creator = data.data.user;
        if(creator.followerRequestsReceived.includes(user._id)) {
          setFollowerStatus('request sent');
        }
        if(creator.followerRequestsSent.includes(user._id)) {
          setFollowerStatus('follow back');
        }
        if(creator.following.includes(user._id)) {
          setFollowerStatus('following')
        }
        if(creator.followers.includes(user._id)) {
          setFollowerStatus('follower')
        }
        setpostCreator(creator);
      } catch(err) {
        console.log(err)
      }
    }
    fetchCreator();
  }, [post]);

  console.log(followerStatus);

  
  const toggleLike = async () => {
    setLiked(!liked);


    try {
      if (liked) {
        const res = await fetch(`http://localhost:3005/api/blogs/unlike-post/${post._id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if(!res.ok) throw new Error('Something went wrong!');
        const data = await res.json();
        if(data.status !== 'success') throw new Error(data.message);
        setLikes(prev => prev - 1);
      } else {
        const res = await fetch(`http://localhost:3005/api/blogs/like-post/${post._id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if(!res.ok) throw new Error('Something went wrong!');
        const data = await res.json();
        if(data.status !== 'success') throw new Error(data.message);
        setLikes(prev => prev + 1);
      }

    } catch(err) {
      console.error(err.message)
    }
  };

  const referralUrlWithWWW = post.creator?.referralUrl ? `www.tajify.com/${post.creator.referralUrl}` : '';


  function copyInput() {
    navigator.clipboard.writeText(`https://${referralUrlWithWWW}`);
    setShowAlert(true);
    setMessage('Link Copied!')
    setTimeout(() => {
      setShowAlert(false);
      setMessage('')
    }, 2000);
  }

  ///////////////////////////////////////////////////////


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
          // Truncate the content and store it in state
          const maxLength = 200; // You can adjust the desired length
          const truncated = truncateText(
            response.data.data.blog.content,
            maxLength
          );
          setTruncatedContent(truncated);

          // Set post state
          setPost({
            ...blogData,
            content: truncatedContent,
          });
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



  // Set id and price as cookies
  Cookies.set("singleBlogId", post._id);
  Cookies.set("singleBlogPrice", post.subscriptionFee);

  console.log(creator);
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

  useEffect(() => {
    fetchRelatedBlogs();
  }, []);

  useEffect(() => {
    fetchData();
  }, [id, user, userId, token]);

  {
    return (
      <>
      <div className="blog__container">
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
                              {/* 7 min &nbsp;
                              {new Date(post.date).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })} */}
                              {dateConverter(post.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={followerStatus === null && handleFollow}
                        className={`mobile__button w-[166px] h-[40px] text-[#F06] border border-[#F06] hover:bg-[#F06] hover:text-white font-bold active:bg-[#F06] px-78 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${followerStatus === 'request sent' ? 'request-sent' : ''} `}>
                        {followerStatus === 'request sent' ? 'Request Sent!' : followerStatus === 'follow back' ? 'Accept Request!' : followerStatus === 'following' ? 'Following' : followerStatus === 'follower' ? 'Follower' : 'Follow' }
                      </button>
                    </div>
                    <div className="img__and__details__2">
                      <div className="blog__metrics">
                        {/* <PiHandsClappingThin className="writer__icons" />
                        <span>4.5k</span> */}
                        <div className="reaction">
                          {liked ? (
                            <AiFillHeart
                              // onClick={toggleLike}
                              className="writer__icons post--like"
                            />
                          ) : (
                            <AiOutlineHeart
                              className="writer__icons"
                              style={{ color: "#F06" }}
                              // onClick={toggleLike}
                            />
                          )}
                          
                          {/* <span className="">{likes} likes</span> */}
                          <span className="">{likes} Like{likes !== 1 ? 's' : ''}</span>
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
                    src={post?.image}
                    alt={`Image for ${post?.title}`}
                    className="align-middle w-full object-cover transition duration-300 ease-linear mb-5"
                  />
                </div>
              </div>

              <div className="paragraph__container">
                <div className="">
                  {premium ? (
                    // <p>
                    //   {truncatedContent}
                    // </p>
                    <p
                      className="details__paragraph "
                      dangerouslySetInnerHTML={{ __html: JSON.parse(truncatedContent) }}
                    />
                  ) : (
                    // <p dangerouslySetInnerHTML={{ __html: post.content }} />
                    <p dangerouslySetInnerHTML={{ __html: JSON.parse(post?.content) }} />
                    // <p>{post?.content}</p>
                  )}
                  {premium && (
                    <div className="subscription__fee flex items-center justify-evenly">
                      This blog post is premium and cost{" "}
                      <Currency
                        quantity={post.subscriptionFee}
                        currency="NGN"
                      />
                      <Link to="/online-payment">
                        <button className="mobile__button w-[166px] h-[40px] bg-[#F06] text-center text-white flex items-center cursor-pointer justify-center rounded-lg p-21 px-78">
                          Subscribe
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="membership">
                <div className="referal__link">
                 
                  <h2 className="link--text">
                    Join Tajify with my referral link <FiCopy style={{ cursor: 'pointer', color: '#555' }} onClick={copyInput} />
                    {/* <a
                      href={`https://${referralUrlWithWWW}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {referralUrlWithWWW}
                    </a> */}
                  
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
                        <button 
                          onClick={followerStatus === null && handleFollow}
                          className={`mobile__button w-[166px] h-[40px] bg-[#F06] text-center text-white flex items-center cursor-pointer justify-center rounded-lg p-21 px-78 ${followerStatus === 'request sent' ? 'request-sent' : ''} `}>
                          {followerStatus === 'request sent' ? 'Request Sent!' : followerStatus === 'follow back' ? 'Accept Request!' : followerStatus === 'following' ? 'Following' : followerStatus === 'follower' ? 'Follower' : 'Follow' }
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
                          src={post.creator?.image}
                          alt={`author image: ${AvatarImg}`}
                          className="article-author__image"
                        />
                        <span className="author">
                          <Link to={`/${post.author}/blogs`}>
                            <h4 className="article__author">{post?.author}</h4>
                          </Link>
                          <p className="article__time">{post?.time}</p>
                        </span>
                        <HiOutlineDotsVertical
                          style={{ cursor: "pointer", marginLeft: "auto" }}
                        />
                      </div>
                      <h3 className="article__heading">{post?.title}</h3>
                      <div
                        className="article__text"
                        dangerouslySetInnerHTML={{ __html: post?.content }}
                      ></div>

                      <ArticleSocialInfo 
                        avatarImg={AvatarImg}
                        postId={post._id}
                        totalLikes={post.likesCounts}
                      />
                    </div>
                  </div>
                ))}
              </figure>
            </div>
          </div>
        </div>
        <Footer />
      </div>


        <Alert alertType={`${showAlert && "success" }`}>
            {showAlert && (
              <AiFillCheckCircle className="alert--icon" />
            )}
            <p>{message}</p>
        </Alert>

      </>
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
