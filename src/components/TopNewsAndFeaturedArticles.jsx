import React, { useEffect, useState } from "react";
import TopNews from "./TopNews";

import MostSearchedAndFeaturedArticles from './MostSearchedAndFeaturedArticles';
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { HOST_URL } from "../assets/js/help_func";



// const All_BLOGS_URL = "https://api.tajify.com/api/blogs"; // Updated API URL
const All_BLOGS_URL = `${HOST_URL()}/blogs`; // Updated API URL

function TopNewsAndFeaturedArticles() {

  const { token } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

   

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(All_BLOGS_URL, {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data.blogs) {
        
          // const truncatedPosts = response.data.data.blogs
          // .slice(0, 3)
          // .map((post) => ({
          //   ...post,
          //   content: truncateText(post.content, 20),
          // }));

          setPosts(response.data.data.blogs);
        } else {
          console.error("Error fetching posts");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    // This code will run after the component has rendered
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

    return (
        <section className="section">
            <div className="section__container topnews-and-article">
                <TopNews posts={posts} isLoading={isLoading} setIsLoading={setIsLoading} />
                <MostSearchedAndFeaturedArticles />
            </div>
        </section>
    )
}

export default TopNewsAndFeaturedArticles;
