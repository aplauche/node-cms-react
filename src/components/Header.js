import React from "react";
import styled from "@emotion/styled";

const HeaderDiv = styled("div")`
  width: 100%;
  height: 70px;
  background: #292929;

  & .header-inner {
    max-width: 800px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    color: white;
  }
`;
const SiloButton = styled("a")`
  color: white;
  background: linear-gradient(45deg, #a6c0fe, #f68084);
  padding: 10px 24px;
  border-radius: 20px;
`;

function Header() {
  return (
    <HeaderDiv>
      <div className="header-inner">
        <h2>Blog</h2>
        <SiloButton>Add New</SiloButton>
      </div>
    </HeaderDiv>
  );
}

export default Header;
