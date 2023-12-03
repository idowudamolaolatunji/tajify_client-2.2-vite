import React, { useState } from "react";
import styled from "styled-components";
import { BsChevronDown } from "react-icons/bs";


const Filter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <FilterContainer>
      <div className="wrapper__div">
        <div className="header-box"></div>
        <div className="section__header--title">Trendy News</div>
      </div>
      <div className="filter_container">
        <span className="all__">All</span>
      <div className='filter-wrapper'>
        <span className="filter__">Filter</span>
        <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
          {/* Dropdown content */}
          <i className='dropdown mr-5 flex justify-center items-center w-6 h-5 cursor-pointer'> <BsChevronDown /> </i>
        </div>
      </div>
      
        {/* </div>  */}
      </div>
    </FilterContainer>
  );
};

export default Filter;

const FilterContainer = styled.div`
  max-width: 944px;
  display: flex;
  height: 40px;
  margin-bottom: 10px;
  justify-content: space-between;

  .wrapper__div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 136px;
  }
  .header-box {
    width: 11px;
    height: 29px;
    color: black;
    background-color: #4caf50;
  }

  .filter_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 136px;
  }

  .filter-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  .filter__ {
    margin-right: 10px;
  }

  .dropdown {
    position: relative;
    color: black;
    /* Other dropdown styling */
  }

  .dropdown.open {
    display: block;
  }
`;
