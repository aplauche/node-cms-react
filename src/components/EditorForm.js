import React, { useEffect, useContext, useRef } from "react";
import { useParams, Link, withRouter, useHistory } from "react-router-dom";
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

function EditorForm({ contentType, formState, dispatch }) {
  const handleRemoveImage = () => {
    dispatch({ type: "removeImage" });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    fetch(`https://node-cms-backend.herokuapp.com/image-upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((images) => {
        console.log(images);
        dispatch({ type: "imageUpload", data: images[0].url });
      });
  };

  // Editor JS functions
  const instanceRef = useRef(null);

  async function handleEditorJSSave() {
    const savedData = await instanceRef.current.save();
    dispatch({ type: "contentChange", data: savedData });
  }

  return (
    <form>
      <FormGroup>
        <SiloLabel htmlFor="title">{contentType} Title</SiloLabel>
        <SiloInput
          id="title"
          type="text"
          value={formState.data.title || ""}
          onChange={(e) =>
            dispatch({ type: "titleChange", data: e.target.value })
          }
        ></SiloInput>
      </FormGroup>
      <FormGroup>
        <SiloLabel>Main Content</SiloLabel>
        <SiloEditor>
          {formState.isLoaded && (
            <EditorJs
              instanceRef={(instance) => (instanceRef.current = instance)}
              tools={{
                image: {
                  class: Image,
                  config: {
                    endpoints: {
                      byFile:
                        "https://node-cms-backend.herokuapp.com/editorjs-image-upload",
                    },
                  },
                },
                paragraph: {
                  class: Paragraph,
                  inlineToolbar: true,
                },
                header: {
                  class: Header,
                  inlineToolbar: true,
                },
              }}
              data={formState.data.content}
              onChange={handleEditorJSSave}
              placeholder="Start creating your content..."
            />
          )}
        </SiloEditor>
      </FormGroup>
      <FormGroup>
        {!formState.data.featuredImage ? (
          <>
            <SiloFileUploadLabel htmlFor="file-upload">
              Click To Choose Featured Image
            </SiloFileUploadLabel>
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </>
        ) : (
          <>
            <img src={formState.data.featuredImage} />
            <button onClick={handleRemoveImage}>Remove Image</button>
          </>
        )}
      </FormGroup>
      <FormGroup>
        <SiloLabel htmlFor="title">SEO Meta Title</SiloLabel>
        <SiloInput
          id="seotitle"
          type="text"
          value={formState.data.seoTitle || ""}
          onChange={(e) =>
            dispatch({ type: "seoTitleChange", data: e.target.value })
          }
        ></SiloInput>
      </FormGroup>
      <FormGroup>
        <SiloLabel htmlFor="body">SEO Meta Description</SiloLabel>
        <SiloTextArea
          id="seobody"
          value={formState.data.seoDesc || ""}
          rows="6"
          onChange={(e) =>
            dispatch({ type: "seoDescChange", data: e.target.value })
          }
        ></SiloTextArea>
      </FormGroup>
    </form>
  );
}

export default EditorForm;
