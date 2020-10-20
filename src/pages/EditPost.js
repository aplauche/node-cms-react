import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import PostItem from "../components/PostItem";
import SidebarLayout from "./SidebarLayout";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { useImmerReducer } from "use-immer";

import EditorJs from "react-editor-js";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";

import styled from "@emotion/styled";

const FormGroup = styled("div")`
  margin-bottom: 20px;
`;

const SiloLabel = styled("label")`
  color: #555;
  margin-bottom: 6px;
`;

const SiloInput = styled("input")`
  width: 100%;
  border: 1px solid #a6c0fe;
  display: block;
  padding: 8px;
  border-radius: 5px;
`;

const SiloTextArea = styled("textarea")`
  width: 100%;
  border: 1px solid #a6c0fe;
  display: block;
  resize: none;
  padding: 8px;
  border-radius: 5px;
`;

const SiloEditor = styled("div")`
  width: 100%;

  & #editor-js {
    border: 1px solid #a6c0fe;
    border-radius: 5px;
    background-color: white;
  }
  & .codex-editor__redactor {
    padding-bottom: 100px !important;
  }
`;

const SiloFileUploadLabel = styled("label")`
  width: 100%;
  border: 1px dashed #f68084;
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function EditPost(props) {
  const initialState = {
    urlId: useParams().id,
    post: {
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
        draft.post = action.postData;
        draft.isLoaded = true;
        break;
      case "titleChange":
        draft.post.title = action.data;
        break;
      case "contentChange":
        draft.post.content = action.data;
        break;
      case "seoTitleChange":
        draft.post.seoTitle = action.data;
        break;
      case "seoDescChange":
        draft.post.seoDesc = action.data;
        break;
    }
  };

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    console.log(state);
    async function fetchpost() {
      try {
        const res = await fetch(`/posts/${state.urlId}`);
        const postData = await res.json();

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
        const res = await fetch(`/posts/${state.urlId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state.post),
        });
      } catch (err) {
        console.log(err);
      }
    }

    saveEdits();
  }

  // Editor JS functions
  const instanceRef = useRef(null);

  async function handleEditorJSSave() {
    const savedData = await instanceRef.current.save();
    dispatch({ type: "contentChange", data: savedData });
  }

  return (
    <SidebarLayout title={state.post.title}>
      <form action="/posts" method="POST">
        <FormGroup>
          <SiloLabel htmlFor="title">Post Title</SiloLabel>
          <SiloInput
            id="title"
            type="text"
            value={state.post.title || ""}
            onChange={(e) =>
              dispatch({ type: "titleChange", data: e.target.value })
            }
          ></SiloInput>
        </FormGroup>
        <FormGroup>
          <SiloLabel>Main Content</SiloLabel>
          <SiloEditor>
            {state.isLoaded && (
              <EditorJs
                instanceRef={(instance) => (instanceRef.current = instance)}
                tools={{
                  image: Image,
                  paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                  },
                  header: {
                    class: Header,
                    inlineToolbar: true,
                  },
                }}
                data={state.post.content}
                onChange={handleEditorJSSave}
                placeholder="Start creating your content..."
              />
            )}
          </SiloEditor>
        </FormGroup>
        <FormGroup>
          <SiloFileUploadLabel htmlFor="file-upload">
            Click To Choose Featured Image
          </SiloFileUploadLabel>
          <input id="file-upload" type="file" style={{ display: "none" }} />
        </FormGroup>
        <FormGroup>
          <SiloLabel htmlFor="title">SEO Meta Title</SiloLabel>
          <SiloInput
            id="seotitle"
            type="text"
            value={state.post.seoTitle || ""}
            onChange={(e) =>
              dispatch({ type: "seoTitleChange", data: e.target.value })
            }
          ></SiloInput>
        </FormGroup>
        <FormGroup>
          <SiloLabel htmlFor="body">SEO Meta Description</SiloLabel>
          <SiloTextArea
            id="seobody"
            value={state.post.seoDesc || ""}
            rows="6"
            onChange={(e) =>
              dispatch({ type: "seoDescChange", data: e.target.value })
            }
          ></SiloTextArea>
        </FormGroup>
      </form>
      <Button onClick={handleSubmit}>Save Post</Button>
    </SidebarLayout>
  );
}

export default EditPost;
