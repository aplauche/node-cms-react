import React, { useEffect, useContext, useRef } from "react";
import { useParams, Link, withRouter, useHistory } from "react-router-dom";
import PostItem from "../components/PostItem";
import SidebarLayout from "./SidebarLayout";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { useImmerReducer } from "use-immer";
import { Context } from "../store";

import EditorForm from "../components/EditorForm";

function EditPost(props) {
  const { appState, appDispatch } = useContext(Context);

  const history = useHistory();
  const initialState = {
    urlId: useParams().id,
    data: {
      id: "",
      title: "",
      content: {},
      date: "",
      seoTitle: "",
      seoDesc: "",
    },
    isLoaded: false,
  };

  const reducer = (draft, action) => {
    switch (action.type) {
      case "postLoaded":
        draft.data = action.postData;
        draft.isLoaded = true;
        break;
      case "titleChange":
        draft.data.title = action.data;
        break;
      case "contentChange":
        draft.data.content = action.data;
        break;
      case "seoTitleChange":
        draft.data.seoTitle = action.data;
        break;
      case "seoDescChange":
        draft.data.seoDesc = action.data;
        break;
    }
  };

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    console.log(state);
    async function fetchpost() {
      try {
        const res = await fetch(
          `https://node-cms-backend.herokuapp.com/posts/${state.urlId}`,
          {
            headers: {
              Authorization: `bearer ${appState.token}`,
            },
          }
        );
        const postData = await res.json();

        console.log(postData);

        dispatch({ type: "postLoaded", postData: postData });
      } catch (err) {
        console.log(err);
      }
    }

    fetchpost();
  }, []);

  function handleSubmit() {
    async function saveEdits() {
      try {
        const res = await fetch(
          `https://node-cms-backend.herokuapp.com/posts/${state.urlId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${appState.token}`,
            },
            body: JSON.stringify(state.data),
          }
        );
        history.push("/posts");
        appDispatch({ type: "flash", value: "Post Saved!" });
      } catch (err) {
        console.log(err);
      }
    }

    saveEdits();
  }

  return (
    <SidebarLayout title={state.data.title} addNew="posts">
      {!state.isLoaded ? (
        <div>Loading...</div>
      ) : (
        <>
          <EditorForm
            formState={state}
            dispatch={dispatch}
            contentType="Posts"
          />
          <Button onClick={handleSubmit}>Save Post</Button>
        </>
      )}
    </SidebarLayout>
  );
}

export default EditPost;
