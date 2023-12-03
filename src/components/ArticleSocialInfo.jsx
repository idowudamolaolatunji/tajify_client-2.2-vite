// import { AiOutlineHeart } from 'react-icons/ai';
// import { LiaComments } from 'react-icons/lia'

// function ArticleSocialInfo({ avatarImg, articleComments, articleViews, articleLikes }) {
//     return (
//         <div className="article__social--info">
//             <div className="social--info">
//                 <span className="views--images">
//                     <img src={avatarImg} alt={'auticle views'} />
//                     <img src={avatarImg} alt={'auticle views'} />
//                     <img src={avatarImg} alt={'auticle views'} />
//                     <img src={avatarImg} alt={'auticle views'} />
//                 </span>
//                 <p className="article__social--figure">+ {articleViews} views</p>
//             </div>
//             <div className="social--info">
//                 <AiOutlineHeart />
//                 <p className="article__social--figure">
//                     {articleLikes} likes
//                 </p>
//             </div>
//             <div className="social--info">
//                 <LiaComments />
//                 <p className="article__social--figure">
//                     {articleComments} comments
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default ArticleSocialInfo;

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import { Link } from "react-router-dom";

function ArticleSocialInfo({
  avatarImg,
  articleComments,
  articleViews,
  initialLikes,
  postId,
}) {
  //   const [likes, setLikes] = useState(initialLikes);
  const [likes, setLikes] = useState(5);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

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

    // Example using fetch:

    // fetch("http://localhost:3005/api/blogs/like-post/:blogId", {
    fetch("https://api.tajify.com/api/blogs/like-post/:blogId", {
      method: "POST",
      body: JSON.stringify({ articleId: "your_article_id", liked: !liked }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Like status updated successfully
        } else {
          // Handle error
        }
      })
      .catch((error) => {
        // Handle error
      });
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const addComment = (comment) => {
    // Simulate adding a new comment on the client side
    setComments([...comments, comment]);

    // Make an API request to the server to add the comment
    // You'll need to implement this part on your Node.js server
  };

  return (
    <div className="article__social--info">
      <div className="social--info">
        <span className="views--images">
          <img src={avatarImg} alt={"article views"} />
          <img src={avatarImg} alt={"article views"} />
          <img src={avatarImg} alt={"article views"} />
          <img src={avatarImg} alt={"article views"} />
        </span>
        <p className="article__social--figure">+ {articleViews} views</p>
      </div>
      <div className="social--info">
        {liked ? (
          <AiFillHeart onClick={toggleLike} style={{ color: "red" }} />
        ) : (
          <AiOutlineHeart onClick={toggleLike} />
        )}
        <p className="article__social--figure">{likes} likes</p>
      </div>
      <Link to={`/details/${postId}?commentBar=true`}>
        <div className="social--info">
          <LiaComments />
          <p className="article__social--figure">{articleComments} comments</p>
        </div>
      </Link>
    </div>
  );
}

export default ArticleSocialInfo;
