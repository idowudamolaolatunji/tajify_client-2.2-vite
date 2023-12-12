import React from "react";
import Footer from "../../components/Footer";
import { IoPerson } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi";
import { ImAddressBook } from "react-icons/im";
import { Link } from "react-router-dom";
import { BiLibrary } from "react-icons/bi";
import { BsCoin } from "react-icons/bs";
import { MdCreateNewFolder } from "react-icons/md";
import BlogNavbar from "../../components/Navbar";
const Dashboard = ({ children }) => {
  return (
    <>
      <BlogNavbar />

      <div className="cat-page-section-container px-[50px] max-md:px-2 mt-[50px]">
        <div className="cat-page-card-box max-w-[1440px] mx-auto">
          <div className="main-stuff mt-[21px] mb-[50px]">
            <div className="lg:grid lg:grid-cols-4 gap-8">
              <div className="filter-div lg:shadow-xl rounded-md p-4 lg:border-t-2 transition-all duration-300">
                <div className="max-[1000px]:hidden">
                  <ul className=" ml-2 mt-10 flex flex-col gap-3">
                  
                  

                    <Link to="/blogs/dashboard/library">
                      <li className=" border-b-[0.6px] py-2 items-center  flex gap-2">
                        <BiLibrary /> Library
                      </li>
                    </Link>


                    <Link to="/blogs/dashboard/create-blog">
                      <li className=" border-b-[0.6px] py-2 items-center flex gap-2">
                        <MdCreateNewFolder /> My Blogs
                      </li>
                    </Link>

                  </ul>
                </div>
              </div>
              <div className="products col-span-3 shadow-xl rounded-md px-4 lg:px-[46px]  border-t-2">
                <div className="toprow py-4"></div>
                <div className="">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[240px]">
      <Footer />

      </div>
    </>
  );
};

export default Dashboard;
