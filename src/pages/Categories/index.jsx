import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MainHeaderW from "../../components/MainHeaderW";
import Footer from "../../components/Footer";
import CategoryHead from "./categoriesComponents/CategoryHead";
import CategoryBlogs from "./categoriesComponents/CategoryBlogs";
import "./main.css";
import Navbar from "../../components/Navbar";

function Categories() {
  const { category } = useParams(); // This retrieves the Category from the URL parameter

  const [blogsCategory, setBlogsCategory] = useState([]);

  // useEffect(() => {
  //   const fetchBlogsByCategory = async () => {
  //     try {
  //       const response = await axios.get(
  //         // `https://api.tajify.com/api/blogs/category/${category}`
  //         `${HOST_URL()}/blogs/category/${category}`
  //       );
  //       if (response.data.data.blogs) {
  //         console.log(response);
  //         setBlogsCategory(response.data.data.blogs);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   };

  //   fetchBlogsByCategory();
  // }, []);
 

  return (
    <div>
      <div className="header__style">
        <Navbar />
      </div>
      <CategoryHead />
      {/* <CategoryBlogs blogsCategory={blogsCategory} /> */}
      <CategoryBlogs />
    </div>
  );
}

export default Categories;
