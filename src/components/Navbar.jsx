import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { LuHome } from "react-icons/lu";
import { PiNotePencilFill } from "react-icons/pi";
import { MdConnectedTv } from "react-icons/md";
import { BiNetworkChart } from "react-icons/bi";
import { GiHamburgerMenu, GiShoppingBag } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsFillGridFill,
  BsFillBellFill,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import LogoImg from "../assets/images/pngs/logo-complete.png";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const GET_USER_OBJ_URL = `${HOST_URL()}/users/getMyObj`;

import "../assets/css/header.css";
import DropdownMenu from "./DropdownMenu";
import { SlNote } from "react-icons/sl";
import { HOST_URL } from "../assets/js/help_func";

function BlogNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);

  const profileBoxRef = useRef(null);
  const { user, token } = useAuthContext();
  const [userImage, setUserImage] = useState();

  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setIsShowMobileMenu(!isShowMobileMenu);
  };

  const getCurrentUserUpdatedObj = async (id) => {
    try {
      const userObj = await axios.get(GET_USER_OBJ_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userObj.data.data.user?.image) {
        console.log(userObj.data.data.user?.image);
        setUserImage(userObj.data.data.user?.image);
      } else {
        console.error("Error fetching user object");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(userImage);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileBoxRef.current &&
        !profileBoxRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Render first upon every page reload
  useEffect(() => {
    getCurrentUserUpdatedObj();
  }, []);

  return (
    <>
      <header className="main-header main">
        <span className="logo__box">
          <Link to="/">
            <img src={LogoImg} alt={LogoImg} />
          </Link>
        </span>

        <span className="header__input">
          <input type="search" placeholder="Search..." />
          <AiOutlineSearch className="header__input-icon" />
        </span>

        <nav className="main-navbar">
          <ul className="navbar__list">
            <NavLink to="/">
              <li
                className={`navbar__item ${
                  location.pathname === "/" ? "nav-active" : ""
                }`}
              >
                <LuHome className="navbar--icon" />
                Home
              </li>
            </NavLink>

            <NavLink to="/writer">
              <li
                className={`navbar__item ${
                  location.pathname === "/writer" ? "nav-active" : ""
                }`}
              >
                <PiNotePencilFill className="navbar--icon" />
                Blogs
              </li>
            </NavLink>

            <NavLink to="/coming-soon">
              <li
                className={`navbar__item ${
                  location.pathname === "/channels" ? "nav-active" : ""
                }`}
              >
                <MdConnectedTv className="navbar--icon" />
                Channels
              </li>
            </NavLink>

            <NavLink to="/coming-soon">
              <li
                className={`navbar__item ${
                  location.pathname === "/digiworks" ? "nav-active" : ""
                }`}
              >
                <BiNetworkChart className="navbar--icon" />
                DigiWorks
              </li>
            </NavLink>

            <a href="https://tajify.com/market/">
              <li
                className={`navbar__item ${
                  location.pathname === "/market" ? "nav-active" : ""
                }`}
              >
                <GiShoppingBag className="navbar--icon" />
                Market
              </li>
            </a>
            <li className="navbar__item">
              <BsFillGridFill className="navbar--icon" />
              More
            </li>
          </ul>

          <div className="navbar--others">
            {!user ? (
              <>
                <Link to="/coming-soon" className=" nav__button creator ">
                  Become a Creator
                </Link>

                <Link
                  to="/signup"
                  className="nav__button signup"
                  style={{ color: "#ff0066", fontWeight: "500" }}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link to="/blogs/dashboard/create-blog">
                  <SlNote className="navbar--others-icon" />
                </Link>
                <BsFillBellFill className="navbar--others-icon" />
                <span className="navbar--profile">
                  <img
                    className="navbar--profile-img"
                    src={userImage}
                    alt={userImage}
                  />
                  <Link to="/profile">
                    <p className="author">{user?.fullName || user?.username}</p>
                  </Link>

                  {isDropdownOpen ? (
                    <BsChevronUp
                      style={{ color: "#ff0066" }}
                      onClick={toggleDropdown}
                    />
                  ) : (
                    <BsChevronDown onClick={toggleDropdown} />
                  )}
                  {isDropdownOpen && (
                    <DropdownMenu toggleDropdown={toggleDropdown} />
                  )}
                </span>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* MOBILE HEADER */}

      <header className="main-header main-mobile">
        <Link to="/">
          <span className="logo__box">
            <img src={LogoImg} alt={LogoImg} />
          </span>
        </Link>

        <nav className="navbar--others">
          {!user ? (
            <>
              <Link
                to="/signup"
                className="nav__button signup"
                style={{ color: "#ff0066", fontWeight: "500" }}
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/editor">
                <SlNote className="navbar--others-icon" />
              </Link>
              <BsFillBellFill className="navbar--others-icon" />
              <span className="navbar--profile">
                <img
                  className="navbar--profile-img"
                  src={user?.image}
                  alt={user?.image}
                />

                <Link to="/profile">
                  <p className="profile-user">
                    {user?.fullName || user?.username}
                  </p>
                </Link>

                {isDropdownOpen ? (
                  <BsChevronUp
                    style={{ color: "#ff0066" }}
                    onClick={toggleDropdown}
                  />
                ) : (
                  <BsChevronDown onClick={toggleDropdown} />
                )}
                {isDropdownOpen && (
                  <DropdownMenu toggleDropdown={toggleDropdown} />
                )}
              </span>
            </>
          )}

          <GiHamburgerMenu
            className="navbar--others-icon"
            style={isShowMobileMenu ? { color: "#ff0066" } : ""}
            onClick={toggleMobileMenu}
          />
          {isShowMobileMenu && (
            <ul className="mobile-navbar__list">
              <NavLink to="/">
                <li
                  className={`navbar__item ${
                    location.pathname === "/" ? "nav-active" : ""
                  }`}
                >
                  <LuHome className="navbar--icon" />
                  Home
                </li>
              </NavLink>

              <NavLink to="/writer">
                <li
                  className={`navbar__item ${
                    location.pathname === "/writer" ? "nav-active" : ""
                  }`}
                >
                  <PiNotePencilFill className="navbar--icon" />
                  Blogs
                </li>
              </NavLink>

              <NavLink to="/coming-soon">
                <li
                  className={`navbar__item ${
                    location.pathname === "/channel" ? "nav-active" : ""
                  }`}
                >
                  <MdConnectedTv className="navbar--icon" />
                  Channels
                </li>
              </NavLink>

              <NavLink to="/coming-soon">
                <li
                  className={`navbar__item ${
                    location.pathname === "/digiwork" ? "nav-active" : ""
                  }`}
                >
                  <BiNetworkChart className="navbar--icon" />
                  DigiWorks
                </li>
              </NavLink>

              <a href="https://tajify.com/market/">
                <li
                  className={`navbar__item ${
                    location.pathname === "/market" ? "nav-active" : ""
                  }`}
                >
                  <GiShoppingBag className="navbar--icon" />
                  Market
                </li>
              </a>

              <li className="navbar__item">
                <BsFillGridFill className="navbar--icon" />
                More
              </li>

              {!user && (
                <Link to="/coming-soon">
                  <li className="navbar__item">Become a Creator</li>
                </Link>
              )}
            </ul>
          )}
        </nav>
      </header>
    </>
  );
}

export default BlogNavbar;
