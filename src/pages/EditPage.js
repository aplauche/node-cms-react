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
    urlId: useParams().id,
    data: {
      title: "",
      content: {},
      seoTitle: "",
      seoDesc: "",
    },
    isLoaded: false,
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

  useEffect(() => {
    console.log(state);
    async function fetchpage() {
      try {
        const res = await fetch(
          `https://node-cms-backend.herokuapp.com/pages/${state.urlId}`,
          {
            headers: {
              Authorization: `bearer ${appState.token}`,
            },
          }
        );
        const pageData = await res.json();
        console.log(pageData);

        dispatch({ type: "dataLoaded", pageData: pageData[0] });
      } catch (err) {
        console.log(err);
      }
    }

    fetchpage();
  }, []);

  function handleSubmit() {
    async function saveEdits() {
      try {
        const res = await fetch(
          `https://node-cms-backend.herokuapp.com/pages/${state.urlId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${appState.token}`,
            },
            body: JSON.stringify(state.data),
          }
        );
        history.push("/pages");
        appDispatch({ type: "flash", value: "Page Saved!" });
      } catch (err) {
        console.log(err);
      }
    }

    saveEdits();
  }

  return (
    <SidebarLayout title={state.data.title} addNew="pages">
      {!state.isLoaded ? (
        <div>Loading...</div>
      ) : (
        <>
          <EditorForm
            formState={state}
            dispatch={dispatch}
            contentType="Pages"
          />
          <Button onClick={handleSubmit}>Save Page</Button>
        </>
      )}
    </SidebarLayout>
  );
}

export default EditPage;
