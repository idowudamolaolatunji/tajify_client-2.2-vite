import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import profilePhoto from "../assets/images/pngs/Profile-img-skills.png";
import "../pages/blogHome/main.css";
import { LiaAngleDownSolid } from "react-icons/lia";
import { SlNote } from "react-icons/sl";
import { BsBell } from "react-icons/bs";
import { Avatar } from "@chakra-ui/react";
import { useAuthContext } from "../context/AuthContext";
import { FiBell } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";
import Notification from "./notification/Notification";

function ProfileHeader() {

  const { user } = useAuthContext();

  const activeLinkStyle = {
    fontWeight: "bold", // You can customize this style
    color: "blue", // Customize the text color for active links
    // Add more styles as needed
  };

  return (
    <header className="header header-green">
    <span className="header__logo">Tajify</span>
    <input type='text' className="header__input" />
    <nav className="navbar">
      <ui className="navbar__list">
            <li className="navbar__list--item">
              <Link to="/" className="navbar__list--link">
                Home
              </Link>
            </li>
            <li className="navbar__list--item">
              <Link to="/writer" className="navbar__list--link">
                Blogs
              </Link>
            </li>
            <li className="navbar__list--item">
              <Link to="/coming-soon" className="navbar__list--link">
                Channel
              </Link>
            </li>
            <li className="navbar__list--item">
              <Link to="/coming-soon" className="navbar__list--link">
                Course
              </Link>
            </li>
            <li className="navbar__list--item">
              <Link to="/coming-soon" className="navbar__list--link">
                Digiwork
              </Link>
            </li>
            <li className="navbar__list--item">
              <Link to="/coming-soon" className="navbar__list--link">
                Market
              </Link>
            </li>
         
      </ui>

      <span className="Navbar__others">

          {user && (
            <>
              <Link to="/editor">
                <SlNote className="navbar__icons" />
              </Link>
              <div className="profile__bane--container">
                <NotificationIcon />
              </div>
              <Profile />
            </>
          )}
          {!user && (
            <Link to="/signup" className="nav__button">
              Get Started
            </Link>
          )}
          </span>
    </nav>
  </header>
  );
}



export default ProfileHeader;




function NotificationIcon() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header__profile--box" onClick={toggleDropdown}>
      <BsBell className="navbar__icons" />
      {isDropdownOpen && <Notification toggleDropdown={toggleDropdown} />}
    </div>
  );
}

function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header__profile--box">
      <Link to="/profile">
      <div className="">
          <Avatar />
        </div>
      </Link>
      <p className="profile__name">Aselemi Divine</p>
      {/* <div className="outsideclick">

      </div> */}
      <LiaAngleDownSolid className="navbar__icons" onClick={toggleDropdown} />
      {isDropdownOpen && <DropdownMenu toggleDropdown={toggleDropdown} />}

    </div>
  );
}
