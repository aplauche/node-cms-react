import React from "react";
import styled from "@emotion/styled";

const SidebarItemDiv = styled("a")`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: left;
  align-items: center;

  &.active {
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

function SidebarItem(props) {
  const { active, image, text } = props;

  return (
    <SidebarItemDiv className={active ? "active" : ""}>
      <img src={image} alt={text} />
      <p>{text}</p>
    </SidebarItemDiv>
  );
}

export default SidebarItem;
