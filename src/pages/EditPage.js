import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import EditorJs from "react-editor-js";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";

import SidebarLayout from "./SidebarLayout";

import Button from "../components/Button";
import { useImmer } from "use-immer";

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

const SiloFileUploadLabel = styled("label")`
  width: 100%;
  border: 1px dashed #f68084;
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function EditPage(props) {
  const [state, setState] = useImmer({
    urlId: useParams().id,
    page: {
      id: "",
      title: "",
      content: {},
      date: "",
      seoTitle: "",
      seoDesc: "",
    },
    isLoaded: false,
  });

  useEffect(() => {
    console.log(state);
    async function fetchpage() {
      try {
        const res = await fetch(`/pages/${state.urlId}`);
        const pageData = await res.json();

        setState((draft) => {
          draft.page = pageData;
          draft.isLoaded = true;
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchpage();
  }, []);

  function handleTitleChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.page.title = val;
    });
  }

  function handleSEOTitleChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.page.seoTitle = val;
    });
  }

  function handleSEODescChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.page.seoDesc = val;
    });
  }

  // function handleBodyChange(e) {
  //   const val = e.target.value;
  //   setState((draft) => {
  //     draft.page.body = val;
  //   });
  // }

  function handleSubmit() {
    async function saveEdits() {
      try {
        const res = await fetch(`/pages/${state.urlId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state.page),
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
    setState((draft) => {
      draft.page.content = savedData;
    });
  }

  return (
    <SidebarLayout title={state.page.title}>
      <form action="/pages" method="POST">
        <FormGroup>
          <SiloLabel htmlFor="title">Page Title</SiloLabel>
          <SiloInput
            id="title"
            type="text"
            value={state.page.title || ""}
            onChange={handleTitleChange}
          ></SiloInput>
        </FormGroup>
        <FormGroup>
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
              data={state.page.content}
              onChange={handleEditorJSSave}
              placeholder="Start creating your content..."
            />
          )}
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
            value={state.page.seoTitle || ""}
            onChange={handleSEOTitleChange}
          ></SiloInput>
        </FormGroup>
        <FormGroup>
          <SiloLabel htmlFor="body">SEO Meta Description</SiloLabel>
          <SiloTextArea
            id="seobody"
            value={state.page.seoDesc || ""}
            rows="6"
            onChange={handleSEODescChange}
          ></SiloTextArea>
        </FormGroup>
      </form>
      <Button onClick={handleSubmit}>Save Page</Button>
    </SidebarLayout>
  );
}

export default EditPage;
