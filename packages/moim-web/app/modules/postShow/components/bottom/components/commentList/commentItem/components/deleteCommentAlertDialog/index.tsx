import * as React from "react";
import { FormattedMessage } from "react-intl";
import AlertModal from "common/components/alertDialog";

import { useActions } from "app/store";
import { useIntlShort } from "common/hooks/useIntlShort";
import { deleteReply } from "app/actions/forum";

interface IProps {
  comment: Moim.Forum.IThread;
  isOpen: boolean;
  onClose(): void;
}

const DeleteCommentAlertDialog: React.FC<IProps> = ({
  comment,
  isOpen,
  onClose,
}) => {
  const intl = useIntlShort();
  const { dispatchDeleteReply } = useActions({
    dispatchDeleteReply: deleteReply,
  });

  const handleDelete = React.useCallback(() => {
    if (comment && comment.root_id) {
      dispatchDeleteReply(
        {
          forumId: comment.root_id,
          threadId: comment.parent_id,
          replyId: comment.id,
        },
        comment.groupId,
      );
    }
  }, [comment]);

  return (
    <AlertModal
      open={isOpen}
      content={
        <FormattedMessage id="post_show/comment_more_menu_delete_dialog_body" />
      }
      rightButtons={[
        {
          text: intl("cancel_button"),
          onClick: onClose,
        },
        {
          text: intl("delete_button"),
          onClick: handleDelete,
        },
      ]}
      onClose={onClose}
    />
  );
};

export default React.memo(DeleteCommentAlertDialog);
