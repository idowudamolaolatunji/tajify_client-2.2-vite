import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import profilePhoto from "../assets/images/pngs/Profile-img-skills.png";
import "../pages/blogHome/main.css";
import { LiaAngleDownSolid } from "react-icons/lia";
import {
  FaHome,
  FaGlobe,
  FaShoppingCart,
  FaBook,
  FaMicrophone,
} from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { BsBell } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { useAuthContext } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";
import Notification from "./notification/Notification";
import LogoImage from "./../assets/images/TAJIFY-LOGO-removebg-preview.png";
import Logo from "./../assets/images/TAJIFY-LOGO-removebg-preview.png";
import LogoW from "./../assets/images/TAJIFY-LOGO-removebg-preview.png";
import { Avatar } from "@chakra-ui/react";

const lists = ["Blogs", "Gigs", "Course", "Market", "Explore"];

function SubHeader() {
  const { user, userProfilePicture } = useAuthContext();

  const [mobileNav, setMobileNav] = useState(false);
  const [fix, setFix] = useState(false);

  function setFixed() {
    //console.log(window.scrollY)
    if (
      document.body.scrollTop >= 200 ||
      document.documentElement.scrollTop >= 200
    ) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", setFixed);
  }, []);

  const handleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <nav
      className={
        fix || mobileNav
          ? "bg-white fixed z-20 w-full shadow lg:py-1 opacity-85 border-gray-200 transition-all duration-300"
          : "bg-white absolute w-full border-gray-200 lg:py-1 transition-all duration-300"
      }
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 ">
        <Link to="/" className="lg:flex lg:items-center">
          <img
            src={fix || mobileNav ? Logo : Logo}
            className="p-2 lg:ml-8 lg:mr-3 h-32 object-contain drop-shadow-md"
            alt="Tajify logo"
          />
        </Link>
        <div className="flex items-center md:order-2">
          {user && (
            <>
              <div className="profile__banee--container">
                <NotificationIcon />
              </div>
              <div className="profile__banee--container">
                <Profile />
              </div>
            </>
          )}
          {!user && (
            // <Link to="/signup" className="nav__button">
            //   Get Started
            // </Link>
            <div className="flex nav__buttons">
              <Link
                to="/coming-soon"
                className=" creator-navbar py-2 pl-3 pr-4 text-[#ff0066] ml-3 mr-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
              >
                Become a Creator
              </Link>
              <Link to="/signup" className="nav__buttons--home">
                Get Started
              </Link>
            </div>
          )}
          <a>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 text-md text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              onClick={handleMobileNav}
            >
              {/* <span className="sr-only">Open main menu</span> */}
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </a>
        </div>
        <div
          className={
            !mobileNav
              ? "items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              : "items-center justify-between w-full md:flex md:w-auto md:order-1"
          }
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-5 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            <li>
              <NavLink
                to="/"
                className={
                  fix || mobileNav
                    ? "element block py-2 pl-3 pr-4 text-gray-600 ml-3 mr-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                    : "block py-2 pl-3 pr-4 text-gray-600  ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                }
              >
                <FaHome className="ml-5" />
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/writer"
                className={
                  fix || mobileNav
                    ? "element block py-2 pl-3 pr-4 text-gray-600 rounded ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                    : "block py-2 pl-3 pr-4 text-gray-600  ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                }
              >
                <IoMdCreate className="ml-5" />
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/coming-soon"
                className={
                  fix || mobileNav
                    ? "element block py-2 pl-3 pr-4 text-gray-600 rounded ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                    : "block py-2 pl-3 pr-4 text-gray-600 rounded ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                }
              >
                <FaMicrophone className="ml-3 microphone" />
                Gigs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/coming-soon"
                className={
                  fix || mobileNav
                    ? "element block py-2 pl-3 pr-4 text-gray-600 rounded ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                    : "block py-2 pl-3 pr-4 text-gray-600 rounded ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                }
              >
                <FaBook className="ml-5" />
                Course
              </NavLink>
            </li>
            <li>
              <a
                href="https://tajify.com/market/"
                className={
                  fix || mobileNav
                    ? "element block py-2 pl-3 pr-4 text-gray-600 rounded ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                    : "block py-2 pl-3 pr-4 text-gray-600 rounded ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                }
              >
                <FaShoppingCart className="ml-5" />
                Market
              </a>

              {/* <NavLink
                to="https://tajify.com/market/"
                className={
                  fix || mobileNav
                    ? "element block py-2 pl-3 pr-4 text-gray-600 rounded ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                    : "block py-2 pl-3 pr-4 text-gray-600 rounded ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                }
              >
                <FaShoppingCart className="ml-5" />
                Market
              </NavLink> */}
            </li>
            <li>
              <NavLink
                to="/coming-soon"
                className={
                  fix || mobileNav
                    ? "element block py-2 pl-3 pr-4 text-gray-600 rounded ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                    : "block py-2 pl-3 pr-4 text-gray-600  ml-3 mr-3 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 "
                }
              >
                <FaGlobe className="ml-5" />
                Explore
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function NotificationIcon() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileBoxRef = useRef(null); // Create a ref for the profile box

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Function to handle clicks outside of the profile box
    const handleOutsideClick = (event) => {
      if (
        profileBoxRef.current &&
        !profileBoxRef.current.contains(event.target)
      ) {
        // Clicked outside the profile box, close the dropdown
        setIsDropdownOpen(false);
      }
    };

    // Add an event listener to the document body
    document.body.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Empty dependency array means this effect runs once after mounting

  return (
    <div className="header__profile--box" onClick={toggleDropdown}>
      <BsBell className="navbar__icons" />
      {isDropdownOpen && <Notification toggleDropdown={toggleDropdown} />}
    </div>
  );
}

function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileBoxRef = useRef(null); // Create a ref for the profile box
  const { user, creators } = useAuthContext();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Function to handle clicks outside of the profile box
    const handleOutsideClick = (event) => {
      if (
        profileBoxRef.current &&
        !profileBoxRef.current.contains(event.target)
      ) {
        // Clicked outside the profile box, close the dropdown
        setIsDropdownOpen(false);
      }
    };

    // Add an event listener to the document body
    document.body.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Empty dependency array means this effect runs once after mounting

  return (
    <div className="header__profile--box" ref={profileBoxRef}>
      <Link to="/profile">
        <div className="">
        {user.image ? (
            <img className="user__navbar--image" src={user.image} alt="" />
          ) : (
            <Avatar />
          )}
        </div>
      </Link>
      <p className="profile__name">{user.username}</p>
      <LiaAngleDownSolid className="navbar__icons" onClick={toggleDropdown} />
      {isDropdownOpen && <DropdownMenu toggleDropdown={toggleDropdown} />}
    </div>
  );
}

export default SubHeader;

{
  /* <div className="absolute w-[200px] h-[200px]  top-16 right-0 bg-black p-4"></div>; */
}
