import React from "react";
import styled from "@emotion/styled";

import SidebarItem from "./SidebarItem";
import Branding from "./Branding";

const SidebarDiv = styled("aside")`
  width: 100%;
  min-height: 100vh;
  background: #292929;
`;

function Sidebar() {
  return (
    <SidebarDiv>
      <Branding />
      <SidebarItem text="Posts" image="/images/blog-icon.svg" active={true} />
      <SidebarItem text="Pages" image="/images/pages-icon.svg" active={false} />
      <SidebarItem text="Users" image="/images/users-icon.svg" active={false} />
    </SidebarDiv>
  );
}

export default Sidebar;
