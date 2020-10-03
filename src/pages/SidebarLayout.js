import React from "react";
import styled from "@emotion/styled";

const SidebarLayoutContainer = styled("div")`
  display: grid;
  grid-template-columns: 250px 1fr;
  width: 100%;
`;

function SidebarLayout(props) {
  return <SidebarLayoutContainer>{props.children}</SidebarLayoutContainer>;
}

export default SidebarLayout;
