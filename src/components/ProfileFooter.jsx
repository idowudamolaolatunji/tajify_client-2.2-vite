import React from "react";
import { Link } from "react-router-dom";

const ProfileFooter = () => {
    return (
      <footer className="">
        <div className="links__style ">
          <ul className="writer__footer__list">
            <li>
              <Link to="/help">Help Center</Link>
            </li>
            <li className="about__border">
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
          <div className="copyright">
            <div className="tajify__logo">Tajify</div>
            <span>Copyright 2023</span>
          </div>
        </div>
      </footer>
    );
};

export default ProfileFooter;
