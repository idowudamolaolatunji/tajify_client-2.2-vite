import React from "react";
import styled from "styled-components";



const TabsArticle = () => {
  return (
    <TabsArticleContainer>
    <div className="custom__tab " >
      <div className="flex text-center custom__style items-center h-[90px] text-white gap-10 mr-[50px]">
        <div className="w-[119px] h-[40px] custom__tab__bg bg-[#F06] text-center flex items-center cursor-pointer justify-center rounded-lg p-10 px-24">
          News
        </div>
        <div className="w-[119px] h-[40px] bg-[#4CAF50] text-center flex items-center cursor-pointer justify-center rounded-lg p-10 px-24">
          Sport
        </div>
        <div className="w-[119px] h-[40px] bg-[#4CAF50] text-center flex items-center cursor-pointer justify-center rounded-lg p-10 px-24">
          Travel
        </div>
        <div className="w-[119px] h-[40px] bg-[#4CAF50] text-center flex items-center cursor-pointer justify-center rounded-lg p-10 px-24">
          Future
        </div>
        <div className="w-[119px] h-[40px] bg-[#4CAF50] text-center flex items-center cursor-pointer justify-center rounded-lg p-10 px-24">
          Culture
        </div>
        <div className="w-[119px] h-[40px] bg-[#4CAF50] text-center flex items-center cursor-pointer justify-center rounded-lg p-10 px-24">
          Style
        </div>
        <div className="w-[119px] h-[40px] bg-[#4CAF50] text-center flex items-center cursor-pointer justify-center rounded-lg p-10 px-24">
          Health
        </div>
      </div>
    </div> 
    </TabsArticleContainer> 
  );
};

export default TabsArticle;

const TabsArticleContainer = styled.div`

.custom__tab {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 10px;
}

`



