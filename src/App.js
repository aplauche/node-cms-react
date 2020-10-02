import React from "react";
import styled from "@emotion/styled";

const PostItem = styled("div")`
  color: gray;
  padding: 20px;
  box-shadow: 2px 4px 18px rgba(0, 0, 0, 0.4);
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  & > p {
    color: gray;
  }
`;

function App() {
  return (
    <div className="App">
      <PostItem>
        <p>This is a post</p>
      </PostItem>
    </div>
  );
}

export default App;
