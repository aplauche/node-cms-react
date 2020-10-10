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
          <Route path="/manage/posts">
            <BlogList />
          </Route>
          <Route path="/manage/pages">
            <PageList />
          </Route>
          <Route path="/edit/post/:id">
            <EditPost />
          </Route>
        </Switch>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
