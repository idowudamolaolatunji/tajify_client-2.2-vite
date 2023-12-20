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

import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { formatLikes } from "../utils/helper";

function ArticleSocialInfo({
  avatarImg,
  articleComments,
  postId,
  totalLikes,
}) {
  //   const [likes, setLikes] = useState(initialLikes);
  const [likes, setLikes] = useState(totalLikes);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const { user, token } = useAuthContext();

  useEffect(() => {
    async function fetchCurrPost() {
      try {
        const res = await fetch(`https://api.tajify.com/api/blogs/${postId}`, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
          }
        });
        const data = await res.json();
        if(data.data.blog.likes.includes(user._id)) {
          setLiked(true)
        }
      } catch(err) {
        console.error(err.message)
      }
    }
    fetchCurrPost()
  }, [])

  
  const toggleLike = async () => {
    // Toggle liked state
    setLiked(!liked);

    try {
      if (liked) {
        const res = await fetch(`https://api.tajify.com/api/blogs/unlike-post/${postId}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if(!res.ok) throw new Error('Something went wrong!');
        const data = await res.json();
        if(data.status !== 'success') throw new Error(data.message);
        setLikes(prevLikes => prevLikes - 1);
      } else {
        const res = await fetch(`https://api.tajify.com/api/blogs/like-post/${postId}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if(!res.ok) throw new Error('Something went wrong!');
        const data = await res.json();
        if(data.status !== 'success') throw new Error(data.message);
        setLikes(prevLikes => prevLikes + 1);
      }
  
      // Toggle liked state
      // setLiked(!liked);

    } catch(err) {
      console.error(err.message)
    }
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
  const likeArr = String(likes).split('');

  return (
    <div className="article__social--info">
      <div className="social--info">
        <span className="views--images">
          <img src={avatarImg} alt={"article views"} />
          <img src={avatarImg} alt={"article views"} />
          <img src={avatarImg} alt={"article views"} />
          <img src={avatarImg} alt={"article views"} />
        </span>
        <p className="article__social--figure">+ {''} views</p>
      </div>
      <div className="social--info">
        {liked ? (
          <AiFillHeart onClick={toggleLike} className="post--like" />
        ) : (
          <AiOutlineHeart onClick={toggleLike} />
        )}
        <p className="article__social--figure">{formatLikes(likes)}</p>
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
