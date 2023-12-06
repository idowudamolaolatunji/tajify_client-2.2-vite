import React, { useEffect, useState } from "react";
import News from "./News";

import LoaderSpinner from "../components/LoaderSpinner.jsx";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";


// THIS IS THE SPINNER
function Spinner() {
  return (
    <div style={{ margin: "20px auto" }}>
      <LoaderSpinner />
    </div>
  );
}


function TopNews({ posts, isLoading, setIsLoading }) {
  const [displayedPosts, setDisplayedPosts] = useState([])	
  
  // THIS TRUNCATES THE TEXT TO THE AMOUNT WE WANT
	const truncateText = (text, maxLength) => {
		const words = text.split(" ");
		let truncatedText = words.slice(0, maxLength).join(" ");

		if (words.length > maxLength) {
			truncatedText += " ...";
		}

		return truncatedText;
	};

	// THIS IS THE BLOG RANDOM SHUFFLE FUNCTION
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

  // THIS IS THE FUNCTION THAT TRUNCATES THE BLOG
	function truncatedPostsFunc(data) {
		const shuffledBlogs = shuffleArray(data);
		return shuffledBlogs.slice(0, 3).map((data) => ({
			...data,
			content: truncateText(data.content, 25),
		}));
	}

  // THIS IS THE NEW BLOGS RENDER FUNCTION
  function NewTopBlogs({ blogPost }) {
    return (
      <>
        {isLoading ? <Spinner /> : <News blogPost={blogPost} />}
        <div className="ads__box--big">&nbsp;</div>
      </>
    );
  }

	return (
		<div className="topnews">
			<h3 className="heading__tetariary">Top news</h3>
			<div className="news__cards">
        {isLoading ? <Spinner /> : <News posts={truncatedPostsFunc(posts)} />}
        <div className="ads__box--big">&nbsp;</div>
        {isLoading ? <Spinner /> : <News posts={truncatedPostsFunc(posts)} />}
        <div className="ads__box--big">&nbsp;</div>
        {isLoading ? <Spinner /> : <News posts={truncatedPostsFunc(posts)} />}
      </div>

			{/* <span style={{ display: "flex", justifyContent: "center" }} onClick={handleAdd}>
        <MdKeyboardDoubleArrowDown style={{ color: "#FF0066", fontSize: "2.4rem" }} />
			</span> */}
		</div>
	);
}

export default TopNews;
