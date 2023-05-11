import * as React from "react";
import { useIntl } from "react-intl";
// components
import AlertDialog from "common/components/alertDialog";
import { IButton } from "common/components/modalLayout/alert/types";

interface IProps {
  open: boolean;
  onPositiveClick(): void;
  onNegativeClick(): void;
  onClose(): void;
}

const DiscardAlertDialog: React.FC<IProps> = ({
  open,
  onPositiveClick,
  onNegativeClick,
  onClose,
}) => {
  const intl = useIntl();
  const positiveButton: IButton = {
    text: intl.formatMessage({ id: "ok_button" }),
    onClick: onPositiveClick,
  };
  const negativeButton: IButton = {
    text: intl.formatMessage({ id: "cancel_button" }),
    onClick: onNegativeClick,
  };

  return (
    <AlertDialog
      open={open}
      title={intl.formatMessage({
        id: "alert_dialog_post_editor_changing_to_templated_channel_title",
      })}
      content={intl.formatMessage({
        id: "alert_dialog_post_editor_changing_to_templated_channel_body",
      })}
      rightButtons={[negativeButton, positiveButton]}
      onClose={onClose}
    />
  );
};

export default DiscardAlertDialog;
