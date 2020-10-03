import React from "react";

import styled from "@emotion/styled";

const SearchBarInput = styled("input")`
  max-width: 300px;
  width: 100%;
  border: none;
  border-bottom: 2px solid #a6c0fe;
  margin-bottom: 30px;
`;

function SearchBar() {
  return <SearchBarInput placeholder="Filter" />;
}

export default SearchBar;
