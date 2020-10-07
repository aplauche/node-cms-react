import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import Header from "../components/Header";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import SidebarLayout from "./SidebarLayout";

import styled from "@emotion/styled";

function BlogList() {
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
    <SidebarLayout>
      <Sidebar />
      <div className="main">
        <Header />
        <Container width="800px" padding="50px 20px">
          <SearchBar />
          {posts.map((item) => {
            return (
              <PostItem
                key={item.id}
                title={item.title}
                date={item.date}
                published={item.published}
              />
            );
          })}
        </Container>
      </div>
    </SidebarLayout>
  );
}

export default BlogList;
