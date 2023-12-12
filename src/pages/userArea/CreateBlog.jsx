import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { useDisclosure } from "@chakra-ui/react";

import AllCards from "./AllCards";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { HOST_URL } from "../../assets/js/help_func";

const GET_MY_BLOG_URL = `${HOST_URL()}/blogs/creator/myBlogs`;

const CreateBlog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [myblogs, setMyBlogs] = useState([]);
  // const [myblogsId, setMyblogsId] = useState([]);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // useEffect(() => {
  //   const getData = async (id) => {
  //     setLoading(true);
  //     const result = await getRequest("market/myblogs");
  //     if (result === result.data.products) {
  //       console.log(result.data.products);
  //       setMyProducts(result.data.products);
  //       // setMyProductsId(result.data.products._id);
  //     } else {
  //       toast.error("Oops, Check your network connection!");
  //       console.log("check your network connection")
  //     }
  //     setLoading(false);
  //   };
  //   getData(user.id);
  // }, []);

  // GET ALL PRODUCTS THE LOGGED IN USER
  useEffect(() => {
    const getData = async (id) => {
      setLoading(true);
      try {
        const result = await axios.get(GET_MY_BLOG_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // if (result && result.data && result.data.products) {
        if (result.data.blogs) {
          console.log(result.data.blogs);
          setMyBlogs(result.data.blogs);
        } else {
          toast.error("Oops, Check your network connection!");
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
  }, []);

  console.log(myblogs)

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
          {myblogs &&
            myblogs.map((i) => <AllCards myblogs={i} myblogsId={i._id} />)}
        </div>
      </Dashboard>
    </>
  );
};

export default CreateBlog;
