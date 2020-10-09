import React, { useState, useContext, useReducer, createContext } from "react";

export const Context = createContext();

function GlobalContextProvider() {
  const initialProps = {};

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return { ...state, ...action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialProps);

  const initialContext = {
    state,
    dispatch,
  };

  return <Context.Provider value={initialContext} />;
}

export default GlobalContextProvider;
