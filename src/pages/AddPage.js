import React, { useEffect, useContext, useRef } from "react";
import { useParams, Link, withRouter, useHistory } from "react-router-dom";
import { Context } from "../store";

import SidebarLayout from "./SidebarLayout";

import Button from "../components/Button";
import EditorForm from "../components/EditorForm";
import { useImmerReducer } from "use-immer";

function EditPage(props) {
  const { appState, appDispatch } = useContext(Context);

  const history = useHistory();

  const initialState = {
    data: {
      title: "",
      content: {},
      seoTitle: "",
      seoDesc: "",
      featuredImage: "",
    },
    isLoaded: true,
  };

  const reducer = (draft, action) => {
    switch (action.type) {
      case "dataLoaded":
        draft.data = action.pageData;
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
      case "imageUpload":
        draft.data.featuredImage = action.data;
        break;
      case "removeImage":
        draft.data.featuredImage = "";
        break;
    }
  };

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  function handleSubmit() {
    async function saveEdits() {
      try {
        const res = await fetch(
          `https://node-cms-backend.herokuapp.com/pages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",

              Authorization: `bearer ${appState.token}`,
            },

            body: JSON.stringify(state.data),
          }
        );
        history.push("/pages");
        appDispatch({ type: "flash", value: "Page Created!" });
      } catch (err) {
        console.log(err);
      }
    }

    saveEdits();
  }

  return (
    <SidebarLayout title={state.data.title}>
      <EditorForm contentType="Page" formState={state} dispatch={dispatch} />
      <Button onClick={handleSubmit}>Save Page</Button>
    </SidebarLayout>
  );
}

export default EditPage;
