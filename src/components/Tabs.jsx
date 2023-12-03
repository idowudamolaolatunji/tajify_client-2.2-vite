import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";

import styled from "styled-components";
import { useParams } from "react-router-dom";

const Tabs = () => {
  return (
    <TabsContainer>
      <div className="custom__tabs ">
        <div className="custom__tab__container">
        {/* <Link to={`/details/${post._id}`}> */}

          <div className="custom__tab__bg ">News</div>
          <div className="custom__tab__bg__ ">Sport</div>
          <div className="custom__tab__bg__ ">Travel</div>
          <div className="custom__tab__bg__ ">Future</div>
          <div className="custom__tab__bg__ ">Culture</div>
          <div className="custom__tab__bg__ ">Style</div>
          <div className="custom__tab__bg__ ">Health</div>
        </div>
        <div className="icons ">
          <i className="cursor-pointer text-black h-6 w-6">
            <AiOutlineSearch />
          </i>
          <i className="cursor-pointer text-black h-6 w-6">
            <HiDotsVertical />
          </i>
        </div>
      </div>
    </TabsContainer>
  );
};

// export default Tabs;


// const Tabs = () => {
//   const { category } = useParams();
//   const [selectedCategory, setSelectedCategory] = useState("News"); // Initialize with the default category



//   const handleTabClick = (category) => {
//     setSelectedCategory(category);
//   };

//   useEffect(() => {
//     // Fetch blogs based on the selected category
//     const fetchBlogsByCategory = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3005/api/blogs/:${category}`);
//         // Handle the response data and update your component state with the fetched blogs
//         console.log(response.data.data.blogs); // For demonstration purposes, log the response
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogsByCategory();
//   }, [category]); // Fetch blogs whenever the selected category changes

//   return (
//     <TabsContainer>
//       <div className="custom__tabs">
//         <div className="custom__tab__container">
//           <div
//             className={`custom__tab__bg ${selectedCategory === "News" ? "active" : ""}`}
//             onClick={() => handleTabClick("News")}
//           >
//             News
//           </div>
//           <div
//             className={`custom__tab__bg ${selectedCategory === "Sport" ? "active" : ""}`}
//             onClick={() => handleTabClick("Sport")}
//           >
//             Sport
//           </div>
//           {/* Add more tabs for other categories */}
//         </div>
//         <div className="icons">
//           <i className="cursor-pointer text-black h-6 w-6">
//             <AiOutlineSearch />
//           </i>
//           <i className="cursor-pointer text-black h-6 w-6">
//             <HiDotsVertical />
//           </i>
//         </div>
//       </div>
//     </TabsContainer>
//   );
// };

export default Tabs;

const TabsContainer = styled.div`
  .custom__tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 1.6rem 0;
  }

  .custom__tab__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    color: white;
    gap: 10px;
    margin-right: 50px;
  }

  .custom__tab__bg {
    width: 119px;
    height: 40px;
    background-color: #f06;
    text-align: center;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    border-radius: 10px;
    padding: 10px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .custom__tab__bg__ {
    width: 119px;
    height: 40px;
    background-color: #4caf50;
    text-align: center;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    border-radius: 10px;
    padding: 10px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .icons {
    display: flex;
    align-items: center;
    width: 200px;
    justify-content: space-between;
    margin-left: 50px;
  }
`;
