import React from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import Branding from "./Branding";

const SidebarDiv = styled("aside")`
  width: 250px;
  min-height: 100vh;
  background: #292929;
`;

function Sidebar() {
  const location = useLocation();

  return (
    <SidebarDiv>
      <Branding />
      <SidebarItem
        text="Posts"
        image="/images/blog-icon.svg"
        active={location.pathname == "/posts" && true}
        target={"/posts"}
      />
      <SidebarItem
        text="Pages"
        image="/images/pages-icon.svg"
        active={location.pathname == "/pages" && true}
        target={"/pages"}
      />
      <SidebarItem
        text="Profile"
        image="/images/users-icon.svg"
        active={location.pathname == "/profile" && true}
        target={"/profile"}
      />
    </SidebarDiv>
  );
}

export default Sidebar;
