import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import { LuHome } from "react-icons/lu";
import { PiNotePencilFill } from "react-icons/pi";
import { MdConnectedTv } from "react-icons/md";
import { BiNetworkChart } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillGridFill, BsFillBellFill, BsChevronDown } from "react-icons/bs";
// import LogoImg from '../assets/imgs/pngs/TAJIFY-LOGO.png';
import LogoImg from "../assets/images/pngs/logo-complete.png";
// from "../assets/imgs/pngs/avatar.png";
import { useAuthContext } from "../context/AuthContext";

import "../assets/css/header.css";
import DropdownMenu from "./DropdownMenu";

function MainGreenHeader() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const profileBoxRef = useRef(null);
	const { user } = useAuthContext();

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (profileBoxRef.current && !profileBoxRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};
		document.body.addEventListener("click", handleOutsideClick);
		return () => {
			document.body.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	return (
		<header className="main-header">
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
						<li className="navbar__item">
							<LuHome className="navbar--icon" />
							Home
						</li>
					</NavLink>

					<NavLink to="/writer">
						<li className="navbar__item">
							<PiNotePencilFill className="navbar--icon" />
							Blogs
						</li>
					</NavLink>

					<NavLink to="/coming-soon">
						<li className="navbar__item">
							<MdConnectedTv className="navbar--icon" />
							Channels
						</li>
					</NavLink>

					<NavLink to="/coming-soon">
						<li className="navbar__item">
							<BiNetworkChart className="navbar--icon" />
							DigiWorks
						</li>
					</NavLink>

					<a href="https://tajify.com/market/">
						<li className="navbar__item">
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
							<Link
								to="/coming-soon"
								className=" nav__button creator "
							>
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
							<BsFillBellFill className="navbar--others-icon" />
							<span className="navbar--profile">
								<img
									className="navbar--profile-img"
									src={user?.image}
									alt={user?.image}
								/>
								<Link to="/profile">
									<p className="author">{user?.fullName || user?.username}</p>
								</Link>

								<BsChevronDown onClick={toggleDropdown} />
								{isDropdownOpen && <DropdownMenu toggleDropdown={toggleDropdown} />}
							</span>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}

export default MainGreenHeader;