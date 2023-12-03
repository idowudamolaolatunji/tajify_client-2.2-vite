import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import creator4 from "../../assets/images/pngs/writers-1.png";
import Category from "../../pages/Categories/index";
import { HOST_URL } from "../../assets/js/help_func";
import CategoryBlogs from "../../pages/Categories/categoriesComponents/CategoryBlogs";

const BlogsCategoryPage = () => {
  const { category } = useParams(); // This retrieves the Category from the URL parameter

  const [blogsCategory, setBlogsCategory] = useState([]);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        const response = await axios.get(
          // HOST_URL() + "/blogs/category/${category}"
          `${HOST_URL()}/blogs/category/${category}`
          // `http://localhost:3005/api/blogs/category/${category}`
          // `https://api.tajify.com/api/blogs/category/${category}`
        );
        if (response.data.data.blogs) {
          console.log(response);
          setBlogsCategory(response.data.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogsByCategory();
  }, []);

  return (
    <div>
      <ul>
        <Category />
      {/* <CategoryBlogs /> */}

        <h2>{category.toUpperCase()} Blogs</h2>
        {blogsCategory.map((blog) => (
          <li key={blog._id}>
            {/* <img src={blog.image} alt={`Image for ${blog.title}`} /> */}
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsCategoryPage;
