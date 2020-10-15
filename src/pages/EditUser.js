import React, { useEffect, useState } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";

import Button from "../components/Button";
import { useImmer } from "use-immer";

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
  const [state, setState] = useImmer({
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
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/user`);
        const userData = await res.json();

        console.log(userData);

        setState((draft) => {
          draft.user = userData;
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, []);

  function handleUsernameChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.user.username = val;
    });
  }

  function handleFirstNameChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.user.firstName = val;
    });
  }

  function handleLastNameChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.user.lastName = val;
    });
  }

  function handleBioChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.user.bio = val;
    });
  }

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
            onChange={handleUsernameChange}
          ></SiloInput>
        </FormGroup>

        <FormGroup>
          <SiloLabel htmlFor="firstname">First Name</SiloLabel>
          <SiloInput
            id="firstname"
            type="text"
            value={state.user.firstName}
            onChange={handleFirstNameChange}
          ></SiloInput>
        </FormGroup>
        <FormGroup>
          <SiloLabel htmlFor="lastname">Last Name</SiloLabel>
          <SiloInput
            id="lastname"
            type="text"
            value={state.user.lastName}
            onChange={handleLastNameChange}
          ></SiloInput>
        </FormGroup>
        <FormGroup>
          <SiloLabel htmlFor="bio">Author Bio</SiloLabel>
          <SiloTextArea
            id="bio"
            value={state.user.bio}
            rows="6"
            onChange={handleBioChange}
          ></SiloTextArea>
        </FormGroup>
      </form>
      <Button onClick={handleSubmit}>Save User</Button>
    </SidebarLayout>
  );
}

export default EditUser;
