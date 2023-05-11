import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import AlertModal from "common/components/alertDialog";

interface IProps {
  open: boolean;
  message?: React.ReactNode;
  onClose: () => void;
}

function NoRightAlertComponent({ open, message, onClose }: IProps) {
  const intl = useIntl();

  return (
    <AlertModal
      open={open}
      onClose={onClose}
      content={message || <FormattedMessage id="no_right_alert_dialog_body" />}
      rightButtons={[
        {
          text: intl.formatMessage({ id: "ok_button" }),
          onClick: onClose,
        },
      ]}
    />
  );
}

export default NoRightAlertComponent;
