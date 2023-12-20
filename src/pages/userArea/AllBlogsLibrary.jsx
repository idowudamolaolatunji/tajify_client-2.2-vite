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

const BOUGHT_BLOGS = `${HOST_URL()}/blogs/bought/bought-blogs`; // Updated API URL

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

      if (result.data.data.boughtBlogs) {
        console.log(result.data?.boughtBlogs);

        setData(result.data.data.boughtBlogs);
      } else {
        console.error("Error fetching posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(data)

  useEffect(() => {
    fetchBlogsByCategory();
  }, []);

  return (
    <div>
      <div className="header__style"></div>

      <section className="trending-article__section">
        <div className="section__container">
          <div className="article__cards flex">
            {data.map((data) => (
              <figure className="article__figure">
                <div key={data._id} className="lifestylee">
                {/* <div className="lifestylee"> */}
                  <Link to={`/details/${data._id}`}>
                    <div className="article__image--box">
                      <img
                        src={data.image}
                        alt="image" 
                        className="article__image"
                      />
                    </div>
                  </Link>
                  <div className="article__content--box">
                    <div className="article__author-info">
                      <img
                        src={data.creator.image}
                        alt="author image"
                        className="article-author__image"
                      />
                      <span className="author">
                        <h4 className="article__author">{data.author}</h4>
                        <p className="article__time">{data.time}</p>
                      </span>
                     
                      <HiOutlineDotsVertical
                        style={{ cursor: "pointer", marginLeft: "auto" }}
                      />
                    </div>
                    <h3 className="article__heading">{data.title}</h3>
                   

                    <ArticleSocialInfo
                   
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
