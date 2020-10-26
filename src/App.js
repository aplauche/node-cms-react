import React, { useContext, useEffect, useReducer } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import BlogList from "./pages/BlogList";
import PageList from "./pages/PageList";
import EditPost from "./pages/EditPost";
import EditPage from "./pages/EditPage";
import AddPage from "./pages/AddPage";
import FlashMessages from "./components/FlashMessages";
import Home from "./pages/Home";
import GlobalContextProvider from "./store";
import EditUser from "./pages/EditUser";
import { Context } from "./store";
import RegisterPage from "./pages/RegisterPage";
import Axios from "axios";

function App() {
  const history = useHistory();

  const { appState, appDispatch } = useContext(Context);

  // HANDLE EXPIRED TOKENS
  // useEffect(() => {
  //   if (appState.loggedIn) {
  //     // send the axios request
  //     const ourRequest = Axios.CancelToken.source();
  //     async function fetchResults() {
  //       try {
  //         const res = await Axios.post(
  //           "/checkToken",
  //           { token: appState.token },
  //           { cancelToken: ourRequest.token }
  //         );
  //         // if server sends back false
  //         if (!res.data) {
  //           appDispatch({ type: "logout" });
  //           appDispatch({
  //             type: "flash",
  //             value: "your session has expired, please log in again",
  //           });
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     fetchResults();
  //     return () => ourRequest.cancel();
  //   }
  // }, []);

  useEffect(() => {
    if (appState.loggedIn) {
      // just logged in
      window.sessionStorage.setItem("token", appState.token);
    } else {
      // just logged out
      window.sessionStorage.removeItem("token");
    }
  }, [appState.loggedIn]);

  return (
    <>
      <FlashMessages />
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            {appState.loggedIn ? <Redirect to="/" /> : <RegisterPage />}
          </Route>
          {!appState.loggedIn && <Redirect to="/login" />}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/posts">
            <BlogList />
          </Route>
          <Route exact path="/pages">
            <PageList />
          </Route>
          <Route exact path="/pages/add">
            <AddPage />
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
    </>
  );
}

export default App;
