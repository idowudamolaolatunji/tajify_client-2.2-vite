import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import { Link } from "react-router-dom";

function News({ posts }) {
	return (
		<div className="news__cards">
			{posts.map((post) => (
				<div key={post._id} className="news__item">
					<div className="news__figure">
						<Link to={`/details/${post._id}`}>
							<div className="news__image--box">
								<img src={post.image} alt="title" className="news__image" />
							</div>
						</Link>
						<div className="news__content--box">
							<Link to={`/details/${post._id}`}>
								<h4 className="news__title">{post.title}</h4>
							</Link>
							<span className="news__date--box">
								<span>
									<AiOutlineCalendar />
									<p>
										{new Date(post.date).toLocaleString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
								</span>
								<span>
									<LiaComments />
									<p>{post.comments}</p>
								</span>
							</span>
							<div
								className="news__text"
								dangerouslySetInnerHTML={{ __html: post.content }}
							></div>
							{/* <p className="news__text">{post.content}</p> */}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default News;
