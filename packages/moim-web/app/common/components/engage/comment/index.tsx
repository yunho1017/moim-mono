import * as React from "react";
import styled from "styled-components";
import { B4Regular } from "common/components/designSystem/typos";

import ReplyIconBase from "@icon/18-message-c.svg";

const Wrapper = styled(B4Regular)`
  display: flex;
  align-items: center;
`;

const CommentCountIcon = styled(ReplyIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

function Comment({ count }: { count?: number }) {
  return (
    <Wrapper>
      <CommentCountIcon />
      {count ? count : null}
    </Wrapper>
  );
}

export default Comment;
