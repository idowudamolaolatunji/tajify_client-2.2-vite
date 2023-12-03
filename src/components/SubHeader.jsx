import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import profilePhoto from "../assets/images/pngs/Profile-img-skills.png";
import "../pages/blogHome/main.css";
import { LiaAngleDownSolid } from "react-icons/lia";
import { BsBell } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { useAuthContext } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";
import Notification from "./notification/Notification";
import LogoImage from "./../assets/images/TAJIFY-LOGO-removebg-preview.png";
import { Avatar } from "@chakra-ui/react";


const lists = ["Blogs", "Gigs", "Course", "Market", "Explore"];

function SubHeader() {
  const { user } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const activeLinkStyle = {
  //   fontWeight: "bold", // You can customize this style
  //   color: "blue", // Customize the text color for active links
  //   // Add more styles as needed
  // };

  return (
    <header className="header">
      <NavLink to="/">
        {/* <span className="header__logo">Tajify</span> */}
        <img src={LogoImage} alt="app logo" className="nav__logo" />
      </NavLink>
      <nav className="navbar">
        {/* <div className="max-w-screen-xl flex flex-wrap items-center justify-between ml-auto p-4"> */}
          <ul className="navbar__list">
              <li className="navbar__list--item">
                <NavLink
                  exact
                  to="/"
                  className="navbar__list--link"
                  // activeStyle={activeLinkStyle}
                >
                  Home
                </NavLink>
              </li>
              <li className="navbar__list--item">
                <NavLink
                  exact
                  to="/writer"
                  className="navbar__list--link"
                  // activeStyle={activeLinkStyle}
                >
                  Blogs
                </NavLink>
              </li>
              <li className="navbar__list--item">
                <NavLink
                  to="/coming-soon"
                  className="navbar__list--link"
                  // activeStyle={activeLinkStyle}
                >
                  Gigs
                </NavLink>
              </li>
              <li className="navbar__list--item">
                <NavLink
                  to="/coming-soon"
                  className="navbar__list--link"
                  // activeStyle={activeLinkStyle}
                >
                  Course
                </NavLink>
              </li>
              <li className="navbar__list--item">
              
                <a href="https://tajify.com/market/" className="navbar__list--link">Market</a>
                {/* <NavLink
                  to="https://tajify.com/market/"
                  className="navbar__list--link"
                  // activeStyle={activeLinkStyle}
                >
                  Market
                </NavLink> */}
              </li>
              <li className="navbar__list--item">
                <NavLink
                  to="/coming-soon"
                  className="navbar__list--link"
                  // activeStyle={activeLinkStyle}
                >
                  Explore
                </NavLink>
              </li>
          </ul>
          <div className="Navbar__others">
            {user && (
              <>
               <Link to="/editor">
                <SlNote className="navbar__icons" />
              </Link>
                <div className="profile__bane--container">
                  <NotificationIcon />
                </div>
                <div className="profile__bane--container">
                  <Profile />
                </div>
              </>
            )}
            {!user && (
              <Link to="/signup" className="nav__button">
                Get Started
              </Link>
            )}
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm bg-[#008001] rounded-lg md:hidden focus:outline-none focus:ring-2 "
            aria-controls="navbar-default"
            aria-expanded="false"
            // onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
      </nav>
    </header>
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
  const { user } = useAuthContext();
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
    <div className="header__profile--box" ref={profileBoxRef}>
      <Link to="/profile">
      <div className="">
          <Avatar />
        </div>
        
      </Link>
      <p className="profile__namee">{user.username}</p>
      <LiaAngleDownSolid className="navbar__icons" onClick={toggleDropdown} />
      {isDropdownOpen && <DropdownMenu toggleDropdown={toggleDropdown} />}
    </div>
  );
}

export default SubHeader;


