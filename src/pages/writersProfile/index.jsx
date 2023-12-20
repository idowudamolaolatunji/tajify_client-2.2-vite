import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";
import AdsSecond from "../../components/Ads2";
import Profile from "../../components/Profile";
import "../../pages/blogHome/main.css";
import { Link } from "react-router-dom";
import BlogNavbar from "../../components/Navbar";
// import CategoryHead from "../Categories/categoriesComponents/CategoryHead";

const WritersProfile = () => {
  useEffect(() => {
    // This code will run after the component has rendered
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <WritersProfileContainer>
      <div className="blog__container">
        <BlogNavbar />
        <div className="section__container">
          <div className=" custom__width h-full mt-[33px] mb-[33px] ">
            <div className="add__post--1 ">
              <div className="add__post__button--div">
                <Link to="/editor">
                  {/* <button className="add__post ">Add Post</button> */}
                  <button 
                    // className="add__post--button w-[166px] h-[40px] text-[#F06] border border-[#F06] hover:bg-[#F06] hover:text-white font-bold active:bg-[#F06] px-78 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    className="add__post--button text-[#F06] border border-[#F06] hover:bg-[#F06] hover:text-white font-bold active:bg-[#F06] px-78 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  
                  >Add Post</button>
                </Link>
              </div>
              <div
                className="ads__box--xl"
                // style={{ width: "60%", height: "12rem" }}
              >
                &nbsp;
              </div>
            </div>
            <div className="">
              {/* <CategoryHead /> */}
              {/* <Tabs /> */}
            </div>
            <Profile />
          </div>
        </div>
      </div>
    </WritersProfileContainer>
  );
};

export default WritersProfile;

const WritersProfileContainer = styled.div`
  .custom__alignment {
    display: flex;
    align-items: center;
    justify-content: center;
    .custom__width {
      max-width: 160rem;
      padding: 46px;
    }
  }

  .add__post--button {
    width: 60%;
    height: 20%;
  }

  .ads__second {
    width: 728px;
    height: 90px;
    display: flex;
    justify-content: space-between;
    background-color: #d9d9d9d9;
    .custom__style {
      width: 100%;
      height: 100%;
    }
  }

  .blog__container {
    .header {
      background-color: #008001;
      max-width: 100%;
      color: #fff;
    }
  }

  .custom__tabs {
    padding: 10px;
    .custom__style {
      .custom__tab__bg {
        background: #4caf50;
      }
    }
  }

  .add__post {
    width: 166px;
    height: 40px;
    background-color: #f06;
    text-align: center;
    color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    border-radius: 6px;
    padding: 21px;
    padding-left: 26px;
    padding-right: 20px;
  }

  .ads__box--xl {
    width: 100%; 
    height: 12rem; 
  }

  .add__post__button--div {
    width: 20%;
  }

  .add__post--1 {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  @media screen and (max-width: 50.625em) {
   
    .add__post--1 {
        display: block;
        // width: 684px;
      }
    // }
    .add__post--button {
      width: 100%;
    }

     .add__post__button--div {
      width: 100%;
      margin-bottom: 20px;
  }

    .add__post__button-div {
      width: 0%;
    }

    .ads__box--xl {
      max-width: 100%;
      height: 12rem;
  }

//   .add__post__button--div {
//     width: 60%;
//     margin-bottom: 20px;
// }
 
  }
`;
