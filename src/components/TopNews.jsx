import React, { useEffect, useState } from "react";
import News from "./News";
import news1 from "../assets/images/pngs/article1.png";
import news2 from "../assets/images/pngs/article2.png";
import news3 from "../assets/images/pngs/article3.png";
import news4 from "../assets/images/pngs/article4.png";
import news5 from "../assets/images/pngs/article5.png";
import news6 from "../assets/images/pngs/article6.png";
import news7 from "../assets/images/pngs/article7.png";

import LoaderSpinner from "../components/LoaderSpinner.jsx";

// const NewsData = [
//     {
//         title: 'Succession finale: jeremy strong keall’s struggles what comes next.',
//         date: '23rd September 2023',
//         comments: '6 comments',
//         text: 'But I must explain to you how all this mistaken idea of denouncing sure and praising pain was born and I will give you a complete account.... ',
//         imagePath: news1
//     },
//     {
//         title: 'Critic’s notebook: deep dives into justice from Shakespeare and Atticus finch.',
//         date: '23rd September 2023',
//         comments: '6 comments',
//         text: 'But I must explain to you how all this mistaken idea of denouncing sure and praising pain was born and I will give you a complete account.... ',
//         imagePath: news2
//     },
//     {
//         title: 'Trump administration officials, have used veto power over other companies, forcing them.',
//         date: '23rd September 2023',
//         comments: '6 comments',
//         text: 'But I must explain to you how all this mistaken idea of denouncing sure and praising pain was born and I will give you a complete account.... ',
//         imagePath: news3
//     },
//     {
//         title: 'Leslie Moonves Speaks on CBS Earnings Cabunsot About Harassment Allegations.',
//         date: '23rd September 2023',
//         comments: '6 comments',
//         text: 'But I must explain to you how all this mistaken idea of denouncing sure and praising pain was born and I will give you a complete account.... ',
//         imagePath: news4
//     },
// ]

// const NewsData2 = [
//     {
//         title: 'Robots or Job Training: Manuterges Grapple With How to Improve Their Econ....',
//         date: '23rd September 2023',
//         comments: '6 comments',
//         text: 'But I must explain to you how all this mistaken idea of denouncing sure and praising pain was born and I will give you a complete account.... ',
//         imagePath: news5
//     },
//     {
//         title: 'Moving From Buyer to Seller, Major League Soccer Revenue In The World Wide Claims....',
//         date: '23rd September 2023',
//         comments: '6 comments',
//         text: 'But I must explain to you how all this mistaken idea of denouncing sure and praising pain was born and I will give you a complete account.... ',
//         imagePath: news6
//     },
//     {
//         title: 'Group continues to sell and market memberships to Premier country club despite.',
//         date: '23rd September 2023',
//         comments: '6 comments',
//         text: 'But I must explain to you how all this mistaken idea of denouncing sure and praising pain was born and I will give you a complete account.... ',
//         imagePath: news7
//     },
// ];

import { MdKeyboardDoubleArrowDown } from "react-icons/md";
// import { Spinner } from "@chakra-ui/react";

function TopNews({ posts, isLoading }) {
	// const [isLoading, setIsLoading] = useState(false);

	function Spinner() {
		return (
			<div style={{ margin: "20px auto" }}>
				<LoaderSpinner />
			</div>
		);
	}

	//  Truncate text to either 1000 words or 10 lines
	const truncateText = (text, maxLength) => {
		const words = text.split(" ");
		let truncatedText = words.slice(0, maxLength).join(" ");

		if (words.length > maxLength) {
			truncatedText += " ...";
		}

		return truncatedText;
	};

	// BLOG RANDOM SHUFFLE FUNCTION
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function truncatedPostsFunc(data) {
		const shuffledBlogs = shuffleArray(data);
		return shuffledBlogs.slice(0, 3).map((data) => ({
			...data,
			content: truncateText(data.content, 25),
		}));
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
			{/* <span style={{ display: "flex", justifyContent: "center" }}>
        <MdKeyboardDoubleArrowDown style={{ color: "#FF0066", fontSize: "2.4rem" }} />
			</span> */}
		</div>
	);
}

export default TopNews;
