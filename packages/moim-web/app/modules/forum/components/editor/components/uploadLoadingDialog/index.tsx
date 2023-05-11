import * as React from "react";
import { useIntl } from "react-intl";
// components
import AlertDialog from "common/components/alertDialog";
import { IButton } from "common/components/modalLayout/alert/types";

interface IProps {
  open: boolean;
  onPositiveClick(): void;
  onClose(): void;
}

const UploadLoadingDialog: React.FC<IProps> = ({
  open,
  onPositiveClick,
  onClose,
}) => {
  const intl = useIntl();
  const positiveButton: IButton = {
    text: intl.formatMessage({ id: "ok_button" }),
    onClick: onPositiveClick,
  };
  return (
    <AlertDialog
      open={open}
      title={intl.formatMessage({
        id: "post_editor/post_upload_process_working_dialog_title",
      })}
      content={intl.formatMessage({
        id: "post_editor/post_upload_process_working_dialog_body",
      })}
      rightButtons={[positiveButton]}
      onClose={onClose}
    />
  );
};

export default UploadLoadingDialog;
