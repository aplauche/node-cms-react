import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Context } from "../store";
import Button from "../components/Button";
import { useImmer } from "use-immer";

const LoginWindow = styled("div")`
  width: 100%;
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
`;
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

function Register() {
  const [state, setState] = useImmer({
    email: "",
    password: "",
    loading: false,
  });

  const { appState, appDispatch } = useContext(Context);

  async function handleLogin() {
    setState((draft) => {
      draft.loading = true;
    });
    try {
      const response = await fetch(
        "https://node-cms-backend.herokuapp.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: state.email,
            password: state.password,
          }),
        }
      );
      const data = await response.json();
      if (data.token) {
        appDispatch({ type: "login", token: data.token });
      } else {
        appDispatch({ type: "flash", value: "An Error occured!" });
      }
      setState((draft) => {
        draft.loading = false;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRegister() {
    setState((draft) => {
      draft.loading = true;
    });
    try {
      const response = await fetch(
        "https://node-cms-backend.herokuapp.com/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: state.email,
            password: state.password,
          }),
        }
      );
      const data = await response.json();
      if (data.token) {
        appDispatch({ type: "register", token: data.token });
      } else {
        appDispatch({ type: "flash", value: "An Error occured!" });
      }
      setState((draft) => {
        draft.loading = false;
      });
    } catch (e) {
      console.log(e);
    }
  }

  function handleEmailChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.email = val;
    });
  }

  function handlePasswordChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.password = val;
    });
  }

  return (
    <LoginWindow>
      {state.loading ? (
        <div>loading...</div>
      ) : (
        <>
          <form>
            <FormGroup>
              <SiloLabel htmlFor="email">Email Address</SiloLabel>
              <SiloInput
                id="email"
                type="text"
                value={state.email || ""}
                onChange={handleEmailChange}
              />
            </FormGroup>

            <FormGroup>
              <SiloLabel htmlFor="password">Password</SiloLabel>
              <SiloInput
                id="password"
                type="password"
                value={state.password || ""}
                onChange={handlePasswordChange}
              />
            </FormGroup>
          </form>
          <Button
            style={{ margin: "20px 10px 20px 0px" }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            style={{ margin: "20px 10px 20px 0px" }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </>
      )}
    </LoginWindow>
  );
}

export default Register;
