import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Context } from "../store";

const PostItemDiv = styled("div")`
  color: gray;
  padding: 20px 40px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .post-item-title {
    color: #333;
    font-weight: 700;
  }
  & .post-item-date {
    color: #777;
    font-weight: 400;
  }
  & .post-item-published {
    color: #fff;
    background: ${(props) => (props.published === true ? "#b2b7ed" : "#666")};
    border-radius: 5px;
    font-size: 10px;
    text-align: center;
    text-transform: uppercase;
    padding: 4px 8px;
  }
`;

function PostItem(props) {
  const { id, slug, contentType, title, date, published } = props;
  const { appState, appDispatch } = useContext(Context);

  function handleDeletePost() {
    props.deleteCallback(id, slug);
  }

  return (
    <PostItemDiv published={published}>
      <p className="post-item-title">{title}</p>
      <p className="post-item-date">{date}</p>

      <span className="post-item-published">
        {published ? "live" : "draft"}
      </span>
      <div>
        <Link to={`${contentType}/edit/${slug}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDeletePost}>Delete</button>
      </div>
    </PostItemDiv>
  );
}

export default PostItem;
