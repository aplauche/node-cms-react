import React from "react";
import styled from "@emotion/styled";

const SiloButton = styled("a")`
  color: white;
  background: linear-gradient(45deg, #a6c0fe, #f68084);
  padding: 10px 24px;
  border-radius: 20px;
`;

function Button(props) {
  return <SiloButton {...props}>{props.children}</SiloButton>;
}

export default Button;
