import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Context } from "../store";
import SidebarLayout from "./SidebarLayout";
import Button from "../components/Button";
import Register from "../components/Register";

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

const LoginContent = styled("div")`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & .login-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: auto;
    z-index: 2;

    & > div {
      width: 50%;
    }

    & h1 {
      color: white;
      font-size: 80px;
      font-weight: 900;
      margin: 0;
    }
  }
`;

function Home() {
  const { appState, appDispatch } = useContext(Context);

  if (!appState.loggedIn) {
    return (
      <LoginContent>
        <img
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            width: "70%",
            height: "80%",
          }}
          src="/images/large-circle.svg"
          alt=""
        />

        <img
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "30%",
            height: "80%",
          }}
          src="/images/small-circle.svg"
          alt=""
        />
        <img
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "60px",
            height: "auto",
          }}
          src="/images/home-logo.svg"
          alt=""
        />
        <section className="login-row">
          <div>
            <img src="/images/silo-logo.svg" alt="" />
            <h1>SILO</h1>
          </div>

          <Register></Register>
        </section>
      </LoginContent>
    );
  }

  return (
    <SidebarLayout title="Home">
      <DashboardDiv style={{ marginTop: "30px", marginBottom: "40px" }}>
        <div>
          <h1>Create</h1>
          <hr />
          <DashboardItemDiv>Add New Post</DashboardItemDiv>
          <Link to={"/pages/add"}>
            <DashboardItemDiv>Add New Page</DashboardItemDiv>
          </Link>
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
