import React from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import Branding from "./Branding";

const SidebarDiv = styled("aside")`
  width: 100%;
  min-height: 100vh;
  background: #292929;
`;

function Sidebar() {
  const location = useLocation();

  console.log(location);

  return (
    <SidebarDiv>
      <Branding />
      <SidebarItem
        text="Posts"
        image="/images/blog-icon.svg"
        active={location.pathname == "/manage/posts" && true}
        target={"/manage/posts"}
      />
      <SidebarItem
        text="Pages"
        image="/images/pages-icon.svg"
        active={location.pathname == "/manage/pages" && true}
        target={"/manage/pages"}
      />
      <SidebarItem
        text="Profile"
        image="/images/users-icon.svg"
        active={location.pathname == "/manage/profile" && true}
        target={"/manage/profile"}
      />
    </SidebarDiv>
  );
}

export default Sidebar;
