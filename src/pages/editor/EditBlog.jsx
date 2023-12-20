import React, { useEffect, useState } from "react";
import "../../pages/blogDetails/blogDetails.css";
import axios from "axios";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAuthContext } from "../../context/AuthContext";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import { Textarea, FormControl, FormLabel } from "@chakra-ui/react";
// import Loader from "../../components/Loader";
import MainHeaderW from "../../components/MainHeaderW";
import LoaderSpinner from "../../components/LoaderSpinner";
import { HOST_URL } from "../../assets/js/help_func";
import { useParams } from "react-router-dom";

// const BLOG_POST_URL = "https://api.tajify.com/api/blogs"; // Replace with your actual API endpoint

const EditBlog = () => {
  const { token } = useAuthContext();
  const { id } = useParams(); // This retrieves the ID from the URL parameter
  const [post, setPost] = useState([]);

  const [title, setTitle] = useState(); // Blog post title
  const [content, setContent] = useState(""); // Blog post content
  const [category, setCategory] = useState(""); // Blog post category
  const [tags, setTags] = useState(""); // Blog post tags
  const [subscriptionFee, setSubscriptionFee] = useState(""); // Blog post tags
  const [isPremium, setIsPremium] = useState(""); // Blog post tags
  const [image, setImage] = useState(""); // Cloudinary image URL
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const EDIT_BLOG_POST_URL = `${HOST_URL()}/blogs/${id}`; // Replace with your actual API endpoint
  const SINGLE_BLOGS_URL = `${HOST_URL()}/blogs/${id}`;

  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const updateTextDescription = async (state) => {
    await setEditorState(state);

    const data = convertToRaw(editorState.getCurrentContent());
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET
      ); // Replace with your Cloudinary upload preset

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlvm6us0n/image/upload",
        formData
      );

      if (response.status === 200) {
        // Image uploaded successfully
        const imageUrl = response.data.secure_url;
        setImage(imageUrl);
      } else {
        console.error("Image upload failed:", response.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  //   PUBLISH THE EDITED BLOG
  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        EDIT_BLOG_POST_URL,
        JSON.stringify({
          title: title,
          content: JSON.stringify(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
          ),
          editable: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
          category: category,
          subscriptionFee: subscriptionFee,
          isPremium: isPremium,
          image: image,
          //   tags: tags.split(","),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        toast.success("Blog post updated successfully!!");
        console.log("Blog post updated successfully!");
        setLoading(false);
        setTitle("");
        setCategory("");
        setTags("");
        setIsPremium("");
        setSubscriptionFee("");
        setImage("");
      } else {
        toast.error("Failed to create a blog post!");
        console.error("Failed to create a blog post:", response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  //   FETCH THAT SINGLE BLOG TO BE EDITED
  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0); // Scroll to the top of the page

    const fetchData = async () => {
      try {
        const response = await axios.get(SINGLE_BLOGS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data.blog) {
          // Handle the fetched data and set it in state
          setPost(response.data.data.blog);
          setTitle(response.data.data.blog.title);
          setCategory(response.data.data.blog.category);
          setTags(response.data.data.blog.tags);
          setSubscriptionFee(response.data.data.blog.subscriptionFee);
          setImage(response.data.data.blog.image);
          setIsPremium(response.data.data.blog.isPremium);
          setContent(response.data.data.blog.content);
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(response.data.data.blog.editable))
            )
          );

          // Set post state
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

  console.log(content);

  return (
    <div className="blog__container">
      {/* <SubHeader /> */}
      <MainHeaderW />

      <div className="custom__width editor__width">
        <div className="display__col">
          <h1 className="text-[28px] text-green-600">Edit Blog</h1>
          <input
            type="title"
            placeholder="Blog Title"
            value={title}
            className="input__style"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex justify-center mt-8 mb-8">
            <div className="rounded-lg bg-gray-50 w-full">
              <div className="m-5">
                <div className="rounded-lg bg-gray-50 w-full">
                  <div className="m-4">
                    <label className="inline-block mb-2 text-gray-500">
                      {image
                        ? "Change photo"
                        : "Upload Image (jpg, png, svg, jpeg, Not more than 1mb)"}

                      <input
                        type="file"
                        name="image"
                        onChange={handleImage}
                        className="opacity-0"
                      />
                    </label>
                    {image ? (
                      <div className="img__preview--container">
                        <img className="img__preview" src={image} />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                          <div className="flex flex-col items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <input
                              type="file"
                              name="image"
                              // value={image}
                              onChange={handleImage}
                              className="opacity-0"
                            />
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              {image ? "Change photo" : "Select a photo"}
                            </p>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 px-4">
            <p className="fat mb-3 text-white">Content</p>
            <div className="w-[700px] border-2 ">
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={updateTextDescription}
              />
            </div>
          </div>

          <FormControl id="category" className="mt-6">
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 p-4 border border-gray-300  rounded-lg focus:ring-focus-ring focus:border-focus-ring block w-full appearance-none"
            >
              <option value="category-select">Select Blog Category</option>
              <option value="entertainment">Entertainment</option>
              <option value="sport">Sport</option>
              <option value="future">Future</option>
              <option value="culture">Culture</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="growth">Growth</option>
              <option value="finance">Finance</option>
              <option value="health">health</option>
              <option value="technology">technology</option>
            </select>
          </FormControl>
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            className="input__style"
            onChange={(e) => setTags(e.target.value)}
          />
          <FormControl id="premium">
            {/* <FormLabel style={{ fontSize: "1.3rem" }}>
              
            </FormLabel> */}
            <select
              value={isPremium}
              onChange={(e) => setIsPremium(e.target.value)}
              className="bg-gray-50 p-4 border border-gray-300 rounded-lg focus:ring-focus-ring focus:border-focus-ring block w-full appearance-none"
            >
              <option value="select-product">Is this blog Premium?</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </FormControl>
          <input
            type="text"
            placeholder="Put in Subscription fee if Premium"
            value={subscriptionFee}
            className="input__style"
            onChange={(e) => setSubscriptionFee(e.target.value)}
          />

          {loading ? (
            <LoaderSpinner />
          ) : (
            <div className="editor__button">
              <button
                onClick={handlePublish}
                className="w-[119px] mb-4 h-[40px] bg-[#4CAF50] text-white text-center flex items-center cursor-pointer justify-center rounded-lg p-10 px-24"
              >
                Publish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
