import React, { useEffect, useState } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import PostItem from "../components/PostItem";
import SidebarLayout from "./SidebarLayout";
import SearchBar from "../components/SearchBar";
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

function BlogList(props) {
  const [state, setState] = useImmer({
    urlId: useParams().id,
    post: {
      id: "",
      title: "",
      body: "",
      date: "",
      seoTitle: "",
      seoDesc: "",
    },
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/posts/${state.urlId}`);
        const postData = await res.json();

        console.log(postData);

        setState((draft) => {
          draft.post = postData;
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchPost();
  }, []);

  function handleTitleChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.post.title = val;
    });
  }

  function handleSEOTitleChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.post.seoTitle = val;
    });
  }

  function handleSEODescChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.post.seoDesc = val;
    });
  }

  function handleBodyChange(e) {
    const val = e.target.value;
    setState((draft) => {
      draft.post.body = val;
    });
  }

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

  return (
    <SidebarLayout title={state.post.title}>
      <form action="/posts" method="POST">
        <FormGroup>
          <SiloLabel htmlFor="title">Post Title</SiloLabel>
          <SiloInput
            id="title"
            type="text"
            value={state.post.title}
            onChange={handleTitleChange}
          ></SiloInput>
        </FormGroup>
        <FormGroup>
          <SiloLabel htmlFor="body">Post Content</SiloLabel>
          <SiloTextArea
            id="body"
            value={state.post.body}
            rows="15"
            onChange={handleBodyChange}
          ></SiloTextArea>
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
            value={state.post.seoTitle}
            onChange={handleSEOTitleChange}
          ></SiloInput>
        </FormGroup>
        <FormGroup>
          <SiloLabel htmlFor="body">SEO Meta Description</SiloLabel>
          <SiloTextArea
            id="seobody"
            value={state.post.seoDesc}
            rows="6"
            onChange={handleSEODescChange}
          ></SiloTextArea>
        </FormGroup>
      </form>
      <Button onClick={handleSubmit}>Save Post</Button>
    </SidebarLayout>
  );
}

export default BlogList;
