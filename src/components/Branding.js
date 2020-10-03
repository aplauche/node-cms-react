import React from "react";
import styled from "@emotion/styled";

const BrandingDiv = styled("div")`
  width: 100%;
  height: 70px;
  background: linear-gradient(45deg, #a6c0fe, #f68084);
  padding: 0px 20px;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 40px;

  & img {
    width: 40px;
    height: 40px;
    margin-right: 24px;
  }

  & h1 {
    color: white;
    font-weight: 300;
  }
`;
function Branding() {
  return (
    <BrandingDiv>
      <img src="/images/silo-logo.svg" alt="silo logo" />
      <h1>SILO</h1>
    </BrandingDiv>
  );
}

export default Branding;
