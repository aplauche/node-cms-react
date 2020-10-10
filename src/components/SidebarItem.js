import React from "react";
import styled from "@emotion/styled";
import { useLocation, Link } from "react-router-dom";

const SidebarItemDiv = styled("a")`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: left;
  align-items: center;

  &.active {
    background: #555;
  }

  &:hover {
    background: #555;
  }

  & img {
    width: 35px;
    height: 35px;
    margin-right: 16px;
  }

  & p {
    color: white;
    font-weight: 700;
  }
`;

function SidebarItem({ active, image, text, target }) {
  return (
    <Link to={target} style={{ textDecoration: "none" }}>
      <SidebarItemDiv className={active ? "active" : ""}>
        <img src={image} alt={text} />
        <p>{text}</p>
      </SidebarItemDiv>
    </Link>
  );
}

export default SidebarItem;
