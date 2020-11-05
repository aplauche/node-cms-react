import React, { useEffect, useState, useContext } from "react";
import PostItem from "../components/PostItem";
import SidebarLayout from "./SidebarLayout";
import SearchBar from "../components/SearchBar";

import styled from "@emotion/styled";

import { Context } from "../store";

function BlogList(props) {
  const [posts, setPosts] = useState([]);

  const { appState, appDispatch } = useContext(Context);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://node-cms-backend.herokuapp.com/posts",
          {
            headers: {
              Authorization: `bearer ${appState.token}`,
            },
          }
        );
        const postsData = await res.json();

        setPosts(posts.concat(postsData));
      } catch (err) {
        console.log(err);
      }
    }

    fetchPosts();
  }, []);

  function deleteCallback(id, slug) {
    async function deletePost() {
      try {
        const res = await fetch(
          `https://node-cms-backend.herokuapp.com/posts/${slug}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${appState.token}`,
            },
          }
        );
        appDispatch({ type: "flash", value: "Post Deleted!" });
        setPosts(posts.filter((post) => post._id != id));
      } catch (err) {
        console.log(err);

        appDispatch({ type: "flash", value: "An Error Occured!" });
      }
    }

    deletePost();
  }

  return (
    <SidebarLayout title="Blog Posts" addNew="posts">
      {/* <SearchBar /> */}
      {posts.map((item) => {
        return (
          <PostItem
            key={item._id}
            id={item._id}
            contentType="posts"
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

export default BlogList;
