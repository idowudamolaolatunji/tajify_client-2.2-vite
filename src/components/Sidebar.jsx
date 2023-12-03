import React from "react";
import styled from "styled-components";
import Ads from "./Ads";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div className="ads__sidebar__1">
        <Ads />
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .ads__sidebar {
    .custom__style {
      width: 100%;
      height: 244px;
      margin-bottom: 30px;
    }
  }

  .ads__sidebar__1 {
    .custom__style {
      width: 100%;
      height: 244px;
    }
  }
  .categories__sidebar {
    .custom__style {
      width: 100%;
      height: 358px;
      margin-bottom: 30px;
      padding: 23px;
    }
  }
  .recommended__sidebar {
    .custom__style {
      width: 100%;
      height: 282px;
      margin-bottom: 30px;
    }
  }

 
`;
