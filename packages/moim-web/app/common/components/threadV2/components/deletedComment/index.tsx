import * as React from "react";
import { Avatar, Message, Wrapper, DeletedIcon } from "./styled";
import { FormattedMessage } from "react-intl";

// TODO: TBD component
// Reference: https://vteam.slack.com/archives/C04R3P9JL/p1589416777141800
const DeletedComment = () => (
  <Wrapper>
    <Avatar>
      <DeletedIcon />
    </Avatar>
    <Message>
      <FormattedMessage id="post_show/deleted_comment" />
    </Message>
  </Wrapper>
);

export default DeletedComment;
