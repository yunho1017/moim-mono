import * as React from "react";
import { useIntl } from "react-intl";
// components
import AlertDialog from "common/components/alertDialog";
import { IButton } from "common/components/modalLayout/alert/types";

import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { userBlock } from "app/actions/app";

interface IProps {
  open: boolean;
  userId: string;
  onClose(): void;
}

const UserBlockDialog: React.FC<IProps> = ({ open, userId, onClose }) => {
  const cancelToken = useCancelToken();
  const { dispatchUserBlock } = useActions({
    dispatchUserBlock: userBlock,
  });
  const intl = useIntl();

  const handleClickBlockButton = React.useCallback(() => {
    dispatchUserBlock(userId, cancelToken.current.token);
    onClose();
  }, [dispatchUserBlock, onClose, userId]);
  const positiveButton: IButton = {
    text: intl.formatMessage({ id: "button_block" }),
    onClick: handleClickBlockButton,
  };
  const negativeButton: IButton = {
    text: intl.formatMessage({ id: "button_cancel" }),
    onClick: onClose,
  };

  return (
    <AlertDialog
      open={open}
      title={intl.formatMessage({
        id: "dialog_block_user_title",
      })}
      content={intl.formatMessage({
        id: "dialog_block_user_body",
      })}
      rightButtons={[negativeButton, positiveButton]}
      onClose={onClose}
    />
  );
};

export default UserBlockDialog;
