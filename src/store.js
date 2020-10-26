import React, {
  useState,
  useContext,
  useReducer,
  useEffect,
  createContext,
} from "react";
import { useImmerReducer } from "use-immer";

export const Context = createContext();

function GlobalContextProvider(props) {
  const initialState = {
    loggedIn: Boolean(window.sessionStorage.getItem("token")),
    flash: [],
    token: window.sessionStorage.getItem("token"),
    user: {},
  };

  const reducer = (draft, action) => {
    switch (action.type) {
      case "login":
        draft.token = action.token;
        draft.loggedIn = true;
        break;
      case "register":
        draft.token = action.token;
        draft.loggedIn = true;
        break;
      case "logout":
        draft.loggedIn = false;
        draft.token = "";
        break;
      case "flash":
        draft.flash.push(action.value);
        break;
    }
  };

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const initialContext = { appState: state, appDispatch: dispatch };

  return (
    <Context.Provider value={initialContext}>{props.children}</Context.Provider>
  );
}

export default GlobalContextProvider;
