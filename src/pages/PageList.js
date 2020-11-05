import React, { useContext, useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import SidebarLayout from "./SidebarLayout";
import SearchBar from "../components/SearchBar";
import { Context } from "../store.js";

import styled from "@emotion/styled";

function PageList() {
  const [pages, setPages] = useState([]);

  const { appState, appDispatch } = useContext(Context);

  useEffect(() => {
    async function fetchPages() {
      try {
        const res = await fetch(
          "https://node-cms-backend.herokuapp.com/pages",
          {
            headers: {
              Authorization: `bearer ${appState.token}`,
            },
          }
        );
        // add in authorization headers
        const pagesData = await res.json();

        setPages(pages.concat(pagesData));
      } catch (err) {
        // flash error, send to login
        console.log(err);
      }
    }

    fetchPages();
  }, []);

  function deleteCallback(id, slug) {
    async function deletePage() {
      try {
        const res = await fetch(
          `https://node-cms-backend.herokuapp.com/pages/${slug}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${appState.token}`,
            },
          }
        );
        appDispatch({ type: "flash", value: "Page Deleted!" });
        setPages(pages.filter((page) => page._id != id));
      } catch (err) {
        console.log(err);

        appDispatch({ type: "flash", value: "An Error Occured!" });
      }
    }

    deletePage();
  }

  return (
    <SidebarLayout title="Pages" addNew="pages">
      {/* <SearchBar /> */}
      {pages.map((item) => {
        return (
          <PostItem
            key={item._id}
            contentType="pages"
            id={item._id}
            slug={item.slug}
            title={item.title}
            date={item.createdAt}
            published={item.published}
            deleteCallback={deleteCallback}
          />
        );
      })}
    </SidebarLayout>
  );
}

export default PageList;
