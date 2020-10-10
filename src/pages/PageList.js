import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import SidebarLayout from "./SidebarLayout";
import SearchBar from "../components/SearchBar";

import styled from "@emotion/styled";

function PageList() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function fetchPages() {
      try {
        const res = await fetch("/pages");
        const pagesData = await res.json();

        setPages(pages.concat(pagesData));
      } catch (err) {
        console.log(err);
      }
    }

    fetchPages();
  }, []);

  return (
    <SidebarLayout title="Pages">
      <SearchBar />
      {pages.map((item) => {
        return (
          <PostItem
            key={item.id}
            title={item.title}
            date={item.date}
            published={item.published}
          />
        );
      })}
    </SidebarLayout>
  );
}

export default PageList;
