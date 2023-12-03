import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "./../assets/images/TAJIFY-LOGO-removebg-preview.png";

const WriterFooter = () => {
  return (
    <WriterFooterContainer>
      <div className="custom__style bg-[#D9D9D9] w-[728px] h-[90px]">
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
            {/* <div className="tajify__logo"> */}
              <img
                className="p-2 lg:ml-8 lg:mr-3 h-32 object-contain drop-shadow-md"
                src={Logo}
                alt="tajify logo"
              />
            {/* </div> */}
            <span>Copyright 2023</span>
          </div>
        </div>
      </div>
    </WriterFooterContainer>
  );
};

export default WriterFooter;

const WriterFooterContainer = styled.div`
  .custom__style {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // .links__style {
  //   display: grid;
  //   align-items: center;
  //   justify-content: space-between;
  // }

  .links__style {
    background: #d9d9d9;
    padding: 0 15px;
  }

  .about__border {
    padding: 0 10px;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
  }

  .writer__footer__list {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 231px;
    margin-bottom: 20px;
    margin-top: 20px;
    li {
      font-size: 11.11px;
    }
  }

  .copyright {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 11.11px;
      font-weight: 500;
    }
  }
`;
