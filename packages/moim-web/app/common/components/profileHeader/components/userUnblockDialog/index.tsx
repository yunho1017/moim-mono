import * as React from "react";
import { useIntl } from "react-intl";
// components
import AlertDialog from "common/components/alertDialog";
import { IButton } from "common/components/modalLayout/alert/types";

import { useActions } from "app/store";
import { userUnblock } from "app/actions/app";
import useCancelToken from "common/hooks/useCancelToken";

interface IProps {
  open: boolean;
  userId: string;
  onClose(): void;
}

const UserUnblockDialog: React.FC<IProps> = ({ open, userId, onClose }) => {
  const cancelToken = useCancelToken();
  const { dispatchUserUnblock } = useActions({
    dispatchUserUnblock: userUnblock,
  });
  const intl = useIntl();

  const handleClickUnblockButton = React.useCallback(() => {
    dispatchUserUnblock(userId, cancelToken.current.token);
    onClose();
  }, [dispatchUserUnblock, onClose, userId]);
  const positiveButton: IButton = {
    text: intl.formatMessage({ id: "button_unblock" }),
    onClick: handleClickUnblockButton,
  };
  const negativeButton: IButton = {
    text: intl.formatMessage({ id: "button_cancel" }),
    onClick: onClose,
  };

  return (
    <AlertDialog
      open={open}
      title={intl.formatMessage({
        id: "dialog_unblock_user_title",
      })}
      content={intl.formatMessage({
        id: "dialog_unblock_user_body",
      })}
      rightButtons={[negativeButton, positiveButton]}
      onClose={onClose}
    />
  );
};

export default UserUnblockDialog;
