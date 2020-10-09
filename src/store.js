import React, { useState, useContext, useReducer, createContext } from "react";

export const Context = createContext();

function GlobalContextProvider(props) {
  const initialState = {};

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return { ...state, ...action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const initialContext = { state, dispatch };

  return (
    <Context.Provider value={initialContext}>{props.children}</Context.Provider>
  );
}

export default GlobalContextProvider;
