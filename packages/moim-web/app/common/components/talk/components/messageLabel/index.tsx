import * as React from "react";
import { Wrapper, Title, Status } from "./styledComponents";

interface IProps {
  title?: string;
  hasNew?: boolean;
}

function MessageLabel(props: IProps) {
  return (
    <Wrapper>
      {props.title && <Title>{props.title}</Title>}
      {props.hasNew && <Status>New</Status>}
    </Wrapper>
  );
}

export default MessageLabel;
