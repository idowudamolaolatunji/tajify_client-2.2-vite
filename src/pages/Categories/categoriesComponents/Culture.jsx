import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useParams } from "react-router-dom";
import CategoryHead from "./CategoryHead";
import CategoryBlogs from "./CategoryBlogs";
import "../main.css";
import Navbar from "../../../components/Navbar";
import AvatarImg from "../../../assets/images/pngs/avatar.png";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ArticleSocialInfo from "../../../components/ArticleSocialInfo";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { HOST_URL } from "../../../assets/js/help_func";


const BLOG_CATEGORY = `${HOST_URL()}/blogs/category/culture`; // Updated API URL
const RELATED_BLOGS = `${HOST_URL()}/blogs//related-posts/:currentBlogId`; // Updated API URL


function Culture() {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const [blogsCategory, setBlogsCategory] = useState([]);

  //  Truncate text to either 1000 words or 10 lines
  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    let truncatedText = words.slice(0, maxLength).join(" ");

    if (words.length > maxLength) {
      truncatedText += " ...";
    }

    return truncatedText;
  };

  const fetchBlogsByCategory = async () => {
    try {
      const response = await axios.get(
        BLOG_CATEGORY
      );

      console.log(response);
      if (response.data.data.blogs) {
        const truncatedPosts = response.data.data.blogs
          .slice(0, 3)
          .map((post) => ({
            ...post,
            content: truncateText(post.content, 60),
          }));
        // setBlogsCategory(response.data.data.blogs);
        setBlogsCategory(truncatedPosts);
      } else {
        console.error("Error fetching posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(blogsCategory);

  useEffect(() => {
    fetchBlogsByCategory();
  }, []);



  return (
    <div>
   <div className="header__style">
        <Navbar />

      </div>
      <CategoryHead />
      <section className="trending-article__section">
        <div className="section__container">
          <div className="article__cards">
          <div className="category-head-text">
           <h2 className="category__heading">Culture</h2>
           <span className="category__stats">
             <p>23M Posts</p>
             <p>100M Likes</p>
           </span>
         </div>
            <figure className="article__figure">
              {blogsCategory.map((post) => (
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
                        <h4 className="article__author">{post.author}</h4>
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

                    <ArticleSocialInfo
                      avatarImg={AvatarImg}
                      // articleComments={articleComments}
                      // articleViews={articleViews}
                      // articleLikes={articleLikes}
                      // postId={post._id}
                    />
                  </div>
                </div>
              ))}
            </figure>
          </div>
          <span className="button-more">
            <RiArrowDownDoubleFill />
          </span>

          <div className="related__article">
            <h4 className="related__article--heading">Related Posts</h4>
            <div className="category__related--article-card">
              <figure className="article__figure">
                {blogsCategory.map((post) => (
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
                          <h4 className="article__author">{post.author}</h4>
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
      </section>

    </div>
  );
}

export default Culture;
