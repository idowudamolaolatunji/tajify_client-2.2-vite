import React, { useState, useEffect } from "react";
import creator4 from "../assets/images/pngs/creator-4.png";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Avatar } from "@chakra-ui/react";
import { HOST_URL } from "../assets/js/help_func";

function TopCreators() {
	const { token } = useAuthContext();

	const [creators, setCreators] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch the list of creators from your API
		fetch(`${HOST_URL()}/users/creator/top-creators`)
			// fetch(ALL_USERS_URL)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				const users = data.data.allTopCreators;
				setCreators(users);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
				console.error("Error fetching creators:", error);
			});
	}, []);

	console.log(creators);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<section className="section top-creator__section mb-10">
			<div className="section__container">
				<h3 className="heading__tetariary">Top creators</h3>
				<div
					className="top-creators__cards"
					style={{
						gridTemplateColumns: `repeat(${creators.length || 0}, 1fr)`,
					}}
				>
					{Array.isArray(creators) && creators.length > 0 ? (
						creators.map((creator) => {
							return (
								<Link to={`/${creator.username}/blogs`}>
									<figure className="card__figure">
										{creator.image ? (
											<img
												className="card__figure--image"
												src={creator.image}
												// alt={title}
											/>
										) : (
											<div className="card__figure--image">
												<Avatar
													size="md"
													name={creator.name} // You can customize the name displayed on the avatar
													// Add any other Chakra UI Avatar props as needed
												/>
											</div>
										)}

										<p className="card__figure--title">{creator.username}</p>
									</figure>
								</Link>
							);
						})
					) : (
						<div>No creators found.</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default TopCreators;
