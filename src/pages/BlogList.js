import React from "react";
import PostItem from "../components/PostItem";
import Header from "../components/Header";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import SidebarLayout from "./SidebarLayout";

import styled from "@emotion/styled";

function BlogList() {
  return (
    <SidebarLayout>
      <Sidebar />
      <div class="main">
        <Header />
        <Container width="800px" padding="50px 20px">
          <SearchBar />
          <PostItem title="blog post 1" date="10-03-2020" published={true} />
          <PostItem title="blog post 2" date="10-06-2020" published={false} />
          <PostItem title="blog post 3" date="10-03-2020" published={true} />
          <PostItem title="blog post 4" date="10-06-2020" published={false} />
        </Container>
      </div>
    </SidebarLayout>
  );
}

export default BlogList;
