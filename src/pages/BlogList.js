import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import SidebarLayout from "./SidebarLayout";
import SearchBar from "../components/SearchBar";

import styled from "@emotion/styled";

function BlogList(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/posts");
        const postsData = await res.json();

        setPosts(posts.concat(postsData));
      } catch (err) {
        console.log(err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <SidebarLayout title="Blog Posts">
      <SearchBar />
      {posts.map((item) => {
        return (
          <PostItem
            key={item.id}
            id={item.id}
            contentType="posts"
            title={item.title}
            date={item.date}
            published={item.published}
          />
        );
      })}
    </SidebarLayout>
  );
}

export default BlogList;
