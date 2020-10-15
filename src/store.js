import React, { useState, useContext, useReducer, createContext } from "react";
import { useImmerReducer } from "use-immer";

export const Context = createContext();

function GlobalContextProvider(props) {
  const initialState = {
    loggedIn: false,
    flash: [],
  };

  const reducer = (draft, action) => {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        break;
      case "logout":
        draft.loggedIn = false;
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
