import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "../../Api/axios";
import { toast } from "react-toastify";
import { HOST_URL } from "../../assets/js/help_func";


const Comments = ({ toggleDropdown }) => {

  // const CommentForm = ({ blogId, token }) => {
  const { user, token } = useAuthContext();
  const { id } = useParams(); // This retrieves the ID from the URL parameter
  // const { blogId } = useParams(); // This retrieves the ID from the URL parameter
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentPost, setCommentPost] = useState([]);
  const [blogId, setBlogId] = useState(id);

  // const All_BLOGS_URL = `https://api.tajify.com/api/blogs/${id}`; // Updated API URL
  const All_BLOGS_URL = HOST_URL() + `/blogs/${id}`; // Updated API URL
  // const SPECIFIC_BLOG_URL = `https://api.tajify.com/api/blogs/get-comments/${blogId}`
  const SPECIFIC_BLOG_URL = HOST_URL() + `/blogs/get-comments/${blogId}`
  // const POST_SPECIFIC_BLOG_URL = `https://api.tajify.com/api/blogs/post-comment/${blogId}/${id}`
  const POST_SPECIFIC_BLOG_URL = HOST_URL() + `/blogs/post-comment/${blogId}/${id}`
  console.log(id)
  console.log(blogId)
  



  const renderComments = commentPost.map((comment) => (
    <article key={comment._id} style={{ zIndex: '2000000' }} className="p-6 text-base bg-white rounded-lg">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-lg dark:text-white font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={comment.user.image}
              alt={comment.user.name}
            />
            {comment.user.name}
          </p>
          <p className="text-lg mr-5">
            {comment.user.username}
          </p> 
          <p className="text-md">
            <time pubdate dateTime={comment.createdAt}>
              {new Date(comment.createdAt).toDateString()}
            </time>
          </p>
      
        </div>
        <button
          id={`dropdownComment${comment._id}Button`}
          data-dropdown-toggle={`dropdownComment${comment._id}`}
          className="inline-flex items-center p-2 text-sm font-medium text-center dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path
              d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
            />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        {/* Dropdown menu */}
        <div
          id={`dropdownComment${comment._id}`}
          className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby={`dropdownMenuIconHorizontalButton`}
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover-bg-gray-600 dark:hover-text-white"
              >
                Remove
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Report
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <p className="text-lg">{comment.text}</p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm hover:underline font-medium"
        >
          <svg
            className="mr-1.5 w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Reply
        </button>
      </div>
    </article>
  ));



  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(All_BLOGS_URL);

        if (response.data.data.blog._id) {
          // Handle the fetched data and set it in state
          setBlogId(response.data.data.blog._id);
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
  }, []);

  console.log(blogId);



// FUNCTION TO POST BLOG
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        POST_SPECIFIC_BLOG_URL,
        // `https://api.tajify.com/api/blogs/post-comment/${blogId}/${id}`,
        { text },
        // {blog},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Comment created successfully, you can handle this as needed (e.g., show a success message).
        toast.success("created successfully");
        console.log(response);
        console.log(
          "Comment created successfully:",
          response.data.data.comment
        );

        // Clear the comment input field
        setText("");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      toast.error("Unable to post comment, check your connection!");

      // Handle errors (e.g., show an error message to the user).
    }
  };

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0); // Scroll to the top of the page


    // FUNCTION TO GET COMMENTS
    const fetchData = async () => {
      try {
        const response = await axios.get(
          SPECIFIC_BLOG_URL,
          // `http://localhost:3005/api/blogs/get-comments/${blogId}/${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data.comment) {
          // Handle the fetched data and set it in state
          // setPosts(response.data);
          setCommentPost(response.data.data.comment);
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

  console.log(blogId);

  return (
    <div
      className="w-full  bg-opacity-90 top-0  overflow-y-auto overflow-x-hidden sticky-0"
      id="chec-div"
    >
      <div className=" bg-gray-50 h-screen overflow-y-auto p-8 fixed right-0 top-0 shadow-2xl">
        <div className="flex items-center justify-between">
          <p
            tabIndex={0}
            className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800"
          >
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
              Discussion (2)
            </h2>
          </p>
          <button
            role="button"
            aria-label="close modal"
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer"
            // onclick="notificationHandler(false)"
            onClick={toggleDropdown}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#4B5563"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#4B5563"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6"></div>
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-lg border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400"
                placeholder="Write a comment..."
                required
                onChange={(e) => setText(e.target.value)}
                defaultValue={""}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-[#008001] text-[#fff] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Post comment
            </button>
          </form>
          {/* <article className="p-6 text-base bg-white rounded-lg">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-lg  dark:text-white font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough"
                  />
                  Michael Gough
                </p>
                <p className="text-md ">
                  <time
                    pubdate
                    dateTime="2022-02-08"
                    title="February 8th, 2022"
                  >
                    Feb. 8, 2022
                  </time>
                </p>
              </div>
              <button
                id="dropdownComment1Button"
                data-dropdown-toggle="dropdownComment1"
                className="inline-flex items-center p-2 text-sm font-medium text-center  dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>
             
              <div
                id="dropdownComment1"
                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Remove
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Report
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
            <p className="text-lg">{commentPost.text}</p>
           
            <div className="flex items-center mt-4 space-x-4">
              <button
                type="button"
                className="flex items-center text-sm hover:underline  font-medium"
              >
                <svg
                  className="mr-1.5 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                </svg>
                Reply
              </button>
            </div>
          </article> */}
           {renderComments}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Comments;























































