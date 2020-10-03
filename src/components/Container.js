import React from "react";
import styled from "@emotion/styled";

const ContainerDiv = styled("div")`
  max-width: ${(props) => (props.width ? props.width : "1000px")};
  margin: ${(props) => (props.margin ? props.margin : "0 auto")};
  padding: ${(props) => (props.padding ? props.padding : "0 20px")};
`;

function Container(props) {
  return (
    <ContainerDiv
      width={props.width}
      padding={props.padding}
      margin={props.margin}
    >
      {props.children}
    </ContainerDiv>
  );
}

export default Container;
