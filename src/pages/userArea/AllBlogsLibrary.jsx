import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

// import "../../assets/css/main.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiArrowDownDoubleFill } from "react-icons/ri";
// import AvatarImg from "../../../assets/images/pngs/avatar.png";
import ArticleSocialInfo from "../../components/ArticleSocialInfo";
import { HOST_URL } from "../../assets/js/help_func";
import { useAuthContext } from "../../context/AuthContext";

const BOUGHT_BLOGS = `${HOST_URL()}/blogs/bought-blogs`; // Updated API URL

function AllBlogsLibrary() {
  const { token } = useAuthContext();

  const [data, setData] = useState([]);

  const fetchBlogsByCategory = async () => {
    try {
      const result = await axios.get(BOUGHT_BLOGS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.data?.boughtProducts) {
        console.log(result.data?.boughtProducts);

        setData(result.data?.boughtProducts);
      } else {
        console.error("Error fetching posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBlogsByCategory();
  }, []);

  return (
    <div>
      <div className="header__style"></div>

      <section className="trending-article__section">
        <div className="section__container">
          <div className="article__cards">
            {data.map((post) => (
              <figure className="article__figure">
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
                      {/* {premium && (
                        <div className="premium">
                          <Premium />
                          <div className="subscription__fee">
                            <Currency
                              quantity={post.subscriptionFee}
                              currency="NGN"
                            />
                          </div>
                        </div>
                      )} */}
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
                    //   avatarImg={AvatarImg}
                    // articleComments={articleComments}
                    // articleViews={articleViews}
                    // articleLikes={articleLikes}
                    // postId={post._id}
                    />
                  </div>
                </div>
              </figure>
            ))}
          </div>
          <span className="button-more">
            <RiArrowDownDoubleFill />
          </span>
        </div>
      </section>
    </div>
  );
}

export default AllBlogsLibrary;
