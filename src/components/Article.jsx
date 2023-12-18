import { Link, useParams } from "react-router-dom";
import ArticleSocialInfo from "./ArticleSocialInfo";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { HOST_URL } from "../assets/js/help_func";
import Premium from "./Premium";

// const All_BLOGS_URL = "https://api.tajify.com/api/blogs";
const All_BLOGS_URL = `${HOST_URL()}/blogs`;

function Article({ image, AvatarImg, articleViews, articleLikes, articleComments }) {
	const { category } = useParams();
	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);

	const [trendingBlogs, setTrendingBlogs] = useState([]);

	console.log(category);

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

	const fetchTrendingBlogs = async () => {
		try {
			const response = await axios.get(All_BLOGS_URL);

			console.log(response);
			if (response.data.data.blogs) {
				const shuffledBlogs = shuffleArray(response.data.data.blogs);
				const truncatedPosts = shuffledBlogs.slice(0, 3).map((post) => ({
					...post,
				content: truncateText(post.content, 60),
				}));
				// setBlogsCategory(response.data.data.blogs);
				setTrendingBlogs(truncatedPosts);
			} else {
				console.error("Error fetching posts");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	console.log(trendingBlogs);

	useEffect(() => {
		fetchTrendingBlogs();
	}, []);

	const toggleComments = () => {
		setShowComments(!showComments);
	};

	const addComment = (comment) => {
		// Simulate adding a new comment on the client side
		setComments([...comments, comment]);
	};

	return (
		<figure className="article__figure">
			{trendingBlogs.map((post) => (
				<div key={post._id} className="lifestylee">
					<Link to={`/details/${post._id}`}>
						<div className="article__image--box">
							<img
								src={post.image}
								alt={`article on ${image}`}
								className="article__image"
							/>
						</div>
					</Link>

					<div className="article__content--box">
						<div className="article__author-info">
							<Link to={`/${post.author}/blogs`}>
								<img
									src={post.creator?.image}
									alt="author image"
									className="article-author__image"
								/>
							</Link>

							<span className="author">
								<Link to={`/${post.author}/blogs`}>
									<h4 className="article__author">{post.author}</h4>
								</Link>

								<p className="article__time">{post.time}</p>
							</span>
							<span className="author__others">
								<div className="premium">
									<Premium />
								</div>
								{/* <HiOutlineDotsVertical
									style={{ cursor: "pointer" }}
								/> */}
              				</span>
							
						</div>

						<Link to={`/details/${post._id}`}>
							<h3 className="article__heading">{post.title}</h3>
						</Link>
						<div
							className="article__text"
							dangerouslySetInnerHTML={{ __html: post.content }}
						>
							{/* {post.content} */}
						</div>

						<ArticleSocialInfo
							avatarImg={AvatarImg}
							articleComments={articleComments}
							postId={post._id}
							totalLikes={post.likesCounts}
						/>
					</div>
				</div>
			))}
		</figure>
	);
}

export default Article;
