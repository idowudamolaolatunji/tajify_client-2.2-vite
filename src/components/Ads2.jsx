import React from 'react'
import styled from "styled-components";


const AdsSecond = () => {
  return (
    <AdsContainer className='custom__style'>
      ads
    </AdsContainer>
  )
}

export default AdsSecond

const AdsContainer = styled.div`
.custom__style {
  background: #d9d9d9;
  width: 728px;
  height: 90px;
}
`;

