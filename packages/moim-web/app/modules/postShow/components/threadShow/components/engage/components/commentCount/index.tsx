import * as React from "react";

// helpers
import actionCountFormat from "common/helpers/actionCountFormat";
// components
import { WriteCommentButton, Text, MessgaeIcon } from "./styledComponent";

interface IProps {
  count: number;
  onClick(): void;
}

const CommentCount: React.FC<IProps> = ({ count, onClick }) => {
  return (
    <WriteCommentButton onClick={onClick}>
      <MessgaeIcon />
      {count > 0 && <Text>{actionCountFormat(count)}</Text>}
    </WriteCommentButton>
  );
};

export default CommentCount;
