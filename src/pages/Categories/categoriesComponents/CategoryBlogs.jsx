import React from "react";
import Article from "../../../components/Article";
import AvatarImg from "../../../assets/images/pngs/avatar.png";
import Webdes from "../../../assets/images/pngs/webdev-design.png";
import { RiArrowDownDoubleFill } from "react-icons/ri";

function CategoryBlogs() {
  return (
    <section className="section trending-article__section">
      <div className="section__container">
        <div className="article__cards">
          <Article AvatarImg={AvatarImg} />
        </div>
        <span className="button-more">
          <RiArrowDownDoubleFill />
        </span>

        <div className="related__article">
          <h4 className="related__article--heading">Related Posts</h4>
          <div className="category__related--article-card">
            <Article AvatarImg={AvatarImg} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryBlogs;
