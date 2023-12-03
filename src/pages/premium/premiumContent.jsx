import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// import Navbar from "../../components/Navbar";
import AdsSecond from "../../components/Ads2";
import SubHeader from "../../components/SubHeader";
import TabsArticle from "../../components/TabsArticle";
import profilePhoto from "../../assets/images/pngs/Profile-img-skills.png";
import Lifestyle from "../../assets/images/pngs/profile-news.png";
import Creator from "../../assets/images/pngs/creator-1.png";
import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";
import { PiHandsClappingThin } from "react-icons/pi";
import { FiShare } from "react-icons/fi";
import { AiOutlineComment } from "react-icons/ai";
import { BsSave } from "react-icons/bs";
import axios from "axios";

// import "../../index.css";
import "../../pages/blogDetails/blogDetails.css";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import TreadingArticles from "../../components/TreadingArticles";
import { useAuthContext } from "../../context/AuthContext";
import LoaderSpiner from "../../components/LoaderSpinner";

const SINGLE_BLOGS_URL =
  // "http://localhost:3005/api/blogs/64edfe64306fb36f9a0d7fd3"; // Updated API URL
  "https://api.tajify.com/api/blogs/64edfe64306fb36f9a0d7fd3"; // Updated API URL

const PremiumContent = () => {
  const { token } = useAuthContext();
  const { id } = useParams(); // This retrieves the ID from the URL parameter
  const [content, setContent] = useState(""); // The full content of the blog
  const [displayedContent, setDisplayedContent] = useState(""); // The currently displayed content
  const [linesRead, setLinesRead] = useState(0);

  const maxLines = 1000; // Maximum lines allowed to be read for free

  // Simulated blog content (you would fetch this from your backend)
  const blogContent = `Lorem ipsum dolor sit amet,adfsdfv af dsfdfadf dfdfdf consectetur adipiscing elit.\n...`; // Include the full content here

  // Function to count the lines in the content
  const countLines = (text) => text.split("\n").length;

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0); // Scroll to the top of the page

    const fetchData = async () => {
      try {
        const response = await axios.get(SINGLE_BLOGS_URL, {
          // const response = await axios.get(`http://localhost:3005/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data.blog) {
          // Handle the fetched data and set it in state
          // setPosts(response.data);
          setPost(response.data.data.blog);
        } else {
          console.error("Error fetching posts");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleReadMore = () => {
    const remainingContent = blogContent.slice(linesRead);
    const newLinesRead = linesRead + countLines(remainingContent);

    if (newLinesRead > maxLines) {
      // User has reached the maximum allowed lines
      setDisplayedContent(""); // Lock the content
    } else {
      // Display the next portion of the content
      setDisplayedContent(remainingContent);
      setLinesRead(newLinesRead);
    }
  };

  return (
    <div className="blog__container">
      <SubHeader />

      {loading ? (
        <div className="loader__container">
          <LoaderSpiner />
        </div>
      ) : post ? ( // Check if post is not null before rendering
        <div className="blog-content">
          {displayedContent}
          {linesRead < maxLines && (
            <button onClick={handleReadMore}>Read More</button>
          )}
          {linesRead >= maxLines && (
            <div>
              <p>This is premium content.</p>
              <p>
                Please <a href="/payment">pay</a> to unlock the full content.
              </p>
            </div>
          )}
        </div>
      ) : (
        <p>No post found</p>
      )}

      <Footer />
    </div>
  );
};

export default PremiumContent;

// const BlogDetailsContainer = styled.div`

// `;
