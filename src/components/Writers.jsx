import React from "react";
import styled from "styled-components";
import Writers1 from "../assets/images/pngs/writers-1.png";
import Writers2 from "../assets/images/pngs/writers-2.png";
import Writers3 from "../assets/images/pngs/writers-3.png";
import Writers4 from "../assets/images/pngs/writers-4.png";
import { Link } from "react-router-dom";

import Ads from "./Ads";

const Writers = () => {
  return (
    <WritersContainer>
      <div className="writers__container__1">
        <div className="writers__container">
          <div className="writers__container__1 ">
            Top Writers
          </div>

          <div className="view__all">View All</div>
        </div>
        <div className="container__ ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              <div className="bg-white rounded-lg shadow-md h-[267px] w-[201px]">
            <Link to="/writers-profile">
                <img src={Writers1} alt="Image 1" className="w-full h-auto" />
            </Link>
              </div>
            <div className="bg-white rounded-lg shadow-md h-[267px] w-[201px]">
            <Link to="/writers-profile">
              <img src={Writers2} alt="Image 2" className="w-full h-auto" />
            </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md h-[267px] w-[201px]">
              <img src={Writers3} alt="Image 3" className="w-full h-auto" />
            </div>
            <div className="bg-white rounded-lg shadow-md h-[267px] w-[201px]">
              <img src={Writers4} alt="Image 4" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="ads__sidebar">
        <Ads />
      </div>
    </WritersContainer>
  );
};

export default Writers;

const WritersContainer = styled.div`
  max-width: 1235px;
  margin-top: 34px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: flex-end;

  .writers__container {
    display: flex;
    height: 40px;
    margin-top: 15px;
    margin-bottom: 10px;
    justify-content: space-between;
  }

  .writers__container__1 {
    max-width: 944px;
  }

  .view__all {
    margin-right: 10px;
  }

  .writers__container__1 {
    width: 119px;
    height: 40px;
    background-color: #4CAF50;
    text-align: center;
    font-size: 16px;
    color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    margin-top: 15px;
  }

  .container__ {
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }
  

  .ads__sidebar {
    height: 217px;
    width: 279px;
    .custom__style {
      width: 100%;
      height: 155px;
      margin-top: 59px;
    }
  }
`;
