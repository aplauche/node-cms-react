import React, { useEffect, useState } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";

import Button from "../components/Button";
import { useImmerReducer } from "use-immer";

import styled from "@emotion/styled";

const FormGroup = styled("div")`
  margin-bottom: 20px;
`;

const SiloLabel = styled("label")`
  color: #555;
  margin-bottom: 6px;
`;

const SiloInput = styled("input")`
  width: 100%;
  border: 1px solid #a6c0fe;
  display: block;
  padding: 8px;
  border-radius: 5px;
`;

const SiloTextArea = styled("textarea")`
  width: 100%;
  border: 1px solid #a6c0fe;
  display: block;
  resize: none;
  padding: 8px;
  border-radius: 5px;
`;

const SiloFileUploadLabel = styled("label")`
  width: 100%;
  border: 1px dashed #f68084;
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function EditUser(props) {
  const initialState = {
    urlId: useParams().id,
    user: {
      id: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      bio: "",
    },
  };

  const reducer = (draft, action) => {
    switch (action.type) {
      case "userLoaded":
        draft.user = action.userData;
        break;
      case "firstNameChange":
        draft.user.firstName = action.data;
        break;
      case "lastNameChange":
        draft.user.lastName = action.data;
        break;
      case "usernameChange":
        draft.user.username = action.data;
        break;
      case "bioChange":
        draft.user.bio = action.data;
        break;
    }
  };

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/user`);
        const userData = await res.json();

        console.log(userData);

        dispatch({ type: "userLoaded", userData: userData });
      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, []);

  function handleSubmit() {
    async function saveEdits() {
      try {
        const res = await fetch(`/user`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state.user),
        });
      } catch (err) {
        console.log(err);
      }
    }

    saveEdits();
  }

  return (
    <SidebarLayout title={state.user.email}>
      <form action="/users" method="POST">
        <FormGroup>
          <SiloLabel htmlFor="title">Username</SiloLabel>
          <SiloInput
            id="title"
            type="text"
            value={state.user.username}
            onChange={(e) =>
              dispatch({ type: "usernameChange", data: e.target.value })
            }
          ></SiloInput>
        </FormGroup>

        <FormGroup>
          <SiloLabel htmlFor="firstname">First Name</SiloLabel>
          <SiloInput
            id="firstname"
            type="text"
            value={state.user.firstName}
            onChange={(e) =>
              dispatch({ type: "firstNameChange", data: e.target.value })
            }
          ></SiloInput>
        </FormGroup>
        <FormGroup>
          <SiloLabel htmlFor="lastname">Last Name</SiloLabel>
          <SiloInput
            id="lastname"
            type="text"
            value={state.user.lastName}
            onChange={(e) =>
              dispatch({ type: "lastNameChange", data: e.target.value })
            }
          ></SiloInput>
        </FormGroup>
        <FormGroup>
          <SiloLabel htmlFor="bio">Author Bio</SiloLabel>
          <SiloTextArea
            id="bio"
            value={state.user.bio}
            rows="6"
            onChange={(e) =>
              dispatch({ type: "bioChange", data: e.target.value })
            }
          ></SiloTextArea>
        </FormGroup>
      </form>
      <Button onClick={handleSubmit}>Save User</Button>
    </SidebarLayout>
  );
}

export default EditUser;
