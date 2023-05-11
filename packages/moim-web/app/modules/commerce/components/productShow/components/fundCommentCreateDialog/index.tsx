import * as React from "react";
import { useIntl } from "react-intl";
import { SimpleDialogGroupInput } from "common/components/groupInput";

export interface IRef {
  open(): void;
}

interface IProps {
  contents: Moim.Blockit.Blocks[];
  onPost(
    contents: Moim.Blockit.Blocks[],
    files: Moim.Blockit.IFileBlock[],
  ): void;
  onClose?(): void;
}

const FundCommentCreateDialog = React.forwardRef<IRef | null, IProps>(
  ({ contents, onPost, onClose }, ref) => {
    const intl = useIntl();
    const [open, setOpen] = React.useState(false);
    const handleOpen = React.useCallback(() => {
      setOpen(true);
    }, []);
    const handleClose = React.useCallback(() => {
      setOpen(false);
      onClose?.();
    }, [onClose]);

    React.useImperativeHandle(ref, () => ({
      open: handleOpen,
    }));

    return (
      <SimpleDialogGroupInput
        id="fund_comment_editor_dialog"
        open={open}
        contents={contents}
        titleElement={intl.formatMessage({
          id: "dialog_write_comment_title",
        })}
        cancelAlertMessage={intl.formatMessage({
          id: "dialog_write_comment_leave_alert",
        })}
        postAlertMessage={intl.formatMessage({
          id: "funding_show/comment_create_dialog_post_message",
        })}
        uploadLoadingAlertMessage={intl.formatMessage({
          id: "product_show_qna_question_create_dialog_upload_working_message",
        })}
        onPost={onPost}
        onClose={handleClose}
        onCancel={handleClose}
      />
    );
  },
);

export default FundCommentCreateDialog;
