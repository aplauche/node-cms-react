import React, { useContext } from "react";
import styled from "@emotion/styled";

import Header from "../components/Header";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

import { Context } from "../store";

const SidebarLayoutContainer = styled("div")`
  display: grid;
  grid-template-columns: 250px 1fr;
  width: 100%;
`;

function SidebarLayout({ children, title }) {
  const { state, dispatch } = useContext(Context);

  return (
    <SidebarLayoutContainer>
      <Sidebar />
      <div className="main">
        <Header title={title} />
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            padding: "50px 20px",
          }}
        >
          <SearchBar />
          {children}
        </div>
      </div>
    </SidebarLayoutContainer>
  );
}

export default SidebarLayout;
