import React, { useContext, useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import PageList from "./pages/PageList";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import GlobalContextProvider from "./store";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/posts">
            <BlogList />
          </Route>
          <Route exact path="/pages">
            <PageList />
          </Route>
          <Route path="/posts/edit/:id">
            <EditPost />
          </Route>
        </Switch>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
