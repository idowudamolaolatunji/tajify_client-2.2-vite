import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import AllCards from "./AllCards";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Currency from "react-currency-formatter";
import { useDisclosure } from "@chakra-ui/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

import { HOST_URL } from "../../assets/js/help_func";

const GET_MY_BLOG_URL = `${HOST_URL()}/blogs/creator/myBlogs`;
const MySwal = withReactContent(Swal);

const CreateBlog = () => {
  const { user, token } = useAuthContext();
  const [myBlogIdToDelete, setMyBlogIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myblogs, setMyBlogs] = useState([]);

  // GET ALL BLOGS THE LOGGED IN USER
  useEffect(() => {
    const getData = async (id) => {
      setLoading(true);
      try {
        const response = await axios.get(GET_MY_BLOG_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log(response.data.data.blogs);
          const truncatedPosts = response.data.data.blogs
          .map((post) => ({
            ...post,
            content: truncateText(post.content, 6),
          }));
          // setMyBlogs(response.data.data.blogs);
          setMyBlogs(truncatedPosts);
        }
      } catch (error) {
        // Handle the error appropriately, e.g., log or show an error message
        console.error("Error fetching data:", error);
        toast.error("Oops, Check your network connection!");
      } finally {
        setLoading(false);
      }
    };

    getData(user.id);
    window.scrollTo(0, 0);
  }, []);

  console.log(myblogs);

  //   Function to delete a product
  const handleDelete = async (blogId) => {
    try {
      setLoading(true);

      // Display confirmation modal
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#008001",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        const response = await fetch(`${HOST_URL()}/blogs/${blogId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 204) {
          toast.success("Blog deleted successfully!!");
          setMyBlogs((prevBlogs) =>
            prevBlogs.filter((blog) => blog._id !== blogId)
          );
          console.log("Blog deleted successfully!");
        } else {
          toast.error("Failed to delete a Blog!");
          console.error("Failed to delete Blog:", response.data);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the SweetAlert modal
      MySwal.close();
      setLoading(false);
    }
  };

  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    let truncatedText = words.slice(0, maxLength).join(" ");

    if (words.length > maxLength) {
      truncatedText += " ...";
    }

    return truncatedText;
  };

  return (
    <>
      {loading}
      <Dashboard>
        <div className="top-row flex justify-between">
          <h1 className="text-[12px]">All My Blogs</h1>

          <div>
            <Link to="/editor">
              <button className="bg-[#ff0066]  text-white px-4 py-2 rounded">
                Add Blogs
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-4 py-4 gap-4">
          {!myblogs ? (
            <p>You do not have any blogs yet.</p>
          ) : (
            myblogs.map((blog) => (
              // <AllCards key={blog._id} myblogs={blog} myblogsId={blog._id} />
              <div className="flex flex-col gap-[6px]">
                {/* <Link
                to={
                  blogtype == "simple"
                    ? `/products/${blogIdslug}`
                    : `/v-products/${blogIdid}`
                }
              > */}
                <div className="flex flex-col items-start py-[13px] px-[10px] gap-[6px] isolate relative w-[154px] max-sm:w-[130px] bg-white rounded-[10px] my-2 transition-all hover:shadow-lg hover:-translate-y-1">
                  <img
                    src={blog.image}
                    alt=""
                    className="w-[130px] h-[130px] max-sm:w-[80px]  max-sm:h-[80px] object-cover"
                  />
                  <div className="product-txt-div flex flex-col gap-[6px]">
                    <p className="text-md max-sm:text-xs h-[40px]">
                      {/* {blog.title} */}
                      {blog.title}
                    </p>
                    <div className="article__author-info">
                      <img
                        src={blog.creator.image}
                        alt={'author'}
                        className="article-author__image"
                      />
                      <span className="author">
                        <h4 className="article__author">{blog.author}</h4>
                      </span>
                    
                    </div>
                    <p className="font-bold text-base max-sm:text-sm">
                      <Currency
                        quantity={blog.subscriptionFee}
                        currency="NGN"
                      />
                    </p>
                  </div>
                </div>
                {/* </Link> */}

                <div className="flex justify-evenly w-[157px]">
                  <Link to={`/edit-blog/${blog._id}`}>
                  <button
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className=" bg-[#FF0066] py-4 px-4 h-[30px] text-md rounded-md font-semibold text-white flex items-center gap-2"
                    >
                    Edit
                  </button>
                    </Link>
                  <button
                    onClick={() => {
                      setMyBlogIdToDelete(blog._id);
                      handleDelete(blog._id);
                    }}
                    disabled={loading}
                    className=" bg-[#008001] py-4 px-4 h-[30px] text-md rounded-md font-semibold text-white flex items-center gap-2"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Dashboard>
    
    </>
  );
};

export default CreateBlog;
