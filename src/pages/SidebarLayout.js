import React, { useContext } from "react";
import styled from "@emotion/styled";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const SidebarLayoutContainer = styled("div")`
  display: grid;
  grid-template-columns: 250px 1fr;
  width: 100%;
  background: #f5f5f5;
`;

function SidebarLayout({ children, title, addNew }) {
  return (
    <SidebarLayoutContainer>
      <Sidebar />
      <div
        className="main"
        style={{ height: "100vh", overflow: "scroll", paddingTop: "70px" }}
      >
        <Header title={title} addNew={addNew} />
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            padding: "50px 20px",
          }}
        >
          {children}
        </div>
      </div>
    </SidebarLayoutContainer>
  );
}

export default SidebarLayout;
