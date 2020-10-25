import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Context } from "../store";
import Button from "./Button";
import { useHistory } from "react-router-dom";

const HeaderDiv = styled("div")`
  height: 70px;
  background: #292929;
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;

  & .header-inner {
    max-width: 800px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    color: white;
  }
`;

function Header({ title, addNew }) {
  const { appState, appDispatch } = useContext(Context);
  const history = useHistory();

  function handleLogout() {
    appDispatch({ type: "logout" });
  }

  function handleAddNew() {
    history.push(`/${addNew}/add`);
  }

  return (
    <HeaderDiv>
      <div className="header-inner">
        <h2>{title}</h2>
        <div>
          {addNew && <Button onClick={handleAddNew}>Add New</Button>}

          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </HeaderDiv>
  );
}

export default Header;
