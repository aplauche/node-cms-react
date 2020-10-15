import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Context } from "../store";
import SidebarLayout from "./SidebarLayout";
import Button from "../components/Button";

const DashboardDiv = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 40px;
`;

const DashboardItemDiv = styled("div")`
  padding: 30px 20px;
  margin: 20px 0px;
  background: white;
  border-radius: 10px;
  font-size: 20px;
  color: #333;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);

  &:hover {
    background: linear-gradient(45deg, #a6c0fe, #f68084);
    color: white;
  }
`;

function Home() {
  const { appState, appDispatch } = useContext(Context);

  function handleLogin() {
    appDispatch({ type: "login" });
  }

  if (!appState.loggedIn) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={handleLogin}>login</Button>
      </div>
    );
  }

  return (
    <SidebarLayout title="Home">
      <DashboardDiv style={{ marginTop: "30px", marginBottom: "40px" }}>
        <div>
          <h1>Create</h1>
          <hr />
          <DashboardItemDiv>Add New Post</DashboardItemDiv>
          <DashboardItemDiv>Add New Page</DashboardItemDiv>
        </div>
        <div>
          <h1>Manage</h1>
          <hr />
          <Link to={"/posts"}>
            <DashboardItemDiv>Manage Posts</DashboardItemDiv>
          </Link>
          <Link to={"/pages"}>
            <DashboardItemDiv>Manage Pages</DashboardItemDiv>
          </Link>
        </div>
      </DashboardDiv>
    </SidebarLayout>
  );
}

export default Home;
