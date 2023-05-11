import * as React from "react";
// components
import {
  Wrapper,
  CommentAreaHiddenWrapper,
  GroupInputWrapper,
  TopSnackBarWrapper,
  BottomSnackBarWrapper,
} from "./styled";
import GroupInput from "./components/groupInput";
import CommentList from "./components/commentList";
import { PostShowContext } from "../../context";
import NewCommentSnackbar from "./components/newCommentSnackbar";
import { Spacer } from "common/components/designSystem/spacer";

import { useIsEmptyCommentList } from "./components/commentList/hooks/useIsEmptyCommentList";
import { useVisibleCommentArea } from "../../hooks";

export default function Bottom() {
  const { post } = React.useContext(PostShowContext);
  const isEmptyCommentList = useIsEmptyCommentList();
  const visibleCommentArea = useVisibleCommentArea();

  if (!visibleCommentArea) {
    return <CommentAreaHiddenWrapper />;
  }

  return (
    <Wrapper>
      <TopSnackBarWrapper>
        <NewCommentSnackbar
          direction="top"
          forumId={post.parent_id}
          threadId={post.id}
          threadType={post.type}
        />
      </TopSnackBarWrapper>
      <CommentList />
      {!isEmptyCommentList && <Spacer value={16} />}
      <GroupInputWrapper>
        <BottomSnackBarWrapper>
          <NewCommentSnackbar
            direction="bottom"
            forumId={post.parent_id}
            threadId={post.id}
            threadType={post.type}
          />
        </BottomSnackBarWrapper>
        <GroupInput />
      </GroupInputWrapper>
    </Wrapper>
  );
}
