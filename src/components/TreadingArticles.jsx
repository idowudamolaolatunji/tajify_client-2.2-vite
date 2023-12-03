import React, { useEffect, useState } from "react";
import Article from "./Article";
import AvatarImg from "./../assets/images/pngs/avatar.png";


const TreadingArticles = () => {
  return (
    <section className="section trending-article__section">
      <div className="section__container">
        <h2 className="heading__tetariary">Trending Articles</h2>
        <div className="article__cards">
          <Article AvatarImg={AvatarImg} />
        </div>
      </div>
    </section>
  );
};

export default TreadingArticles;
