import React, { useContext, useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import PageList from "./pages/PageList";
import EditPost from "./pages/EditPost";
import EditPage from "./pages/EditPage";
import FlashMessages from "./components/FlashMessages";
import Home from "./pages/Home";
import GlobalContextProvider from "./store";
import EditUser from "./pages/EditUser";
import { Context } from "./store";

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
          <Route exact path="/profile">
            <EditUser />
          </Route>
          <Route path="/posts/edit/:id">
            <EditPost />
          </Route>
          <Route path="/pages/edit/:id">
            <EditPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
