import * as React from "react";
import { Wrapper, IconWrapper, Description } from "./styledComponents";

export default function DeletedItem() {
  return (
    <Wrapper>
      <IconWrapper />
      <Description>This comment is deleted</Description>
    </Wrapper>
  );
}
