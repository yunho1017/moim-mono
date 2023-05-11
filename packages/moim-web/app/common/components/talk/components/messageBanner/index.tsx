import * as React from "react";
import { Wrapper, Message, Close } from "./styledComponents";

interface IProps {
  message: string;
  closeMessage: string;
  onClickMessage(): void;
  onClickClose(): void;
}

function MessageBanner(props: IProps) {
  const { message, closeMessage, onClickClose, onClickMessage } = props;
  return (
    <Wrapper>
      <Message onClick={onClickMessage}>{message}</Message>
      <Close onClick={onClickClose}>{closeMessage}</Close>
    </Wrapper>
  );
}

export default MessageBanner;
