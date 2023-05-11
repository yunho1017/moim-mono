import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import AlertDialog from "common/components/alertDialog";

import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";

import { deletePinnedPost } from "app/actions/forum";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";

import { IButton } from "common/components/modalLayout/alert/types";

interface IUnPinAlertDialogProps {
  open: boolean;
  rootId: Moim.Id;
  threadId: Moim.Id;
  onClose(): void;
}

export function UnPinAlertDialog({
  open,
  rootId,
  threadId,
  onClose,
}: IUnPinAlertDialogProps) {
  const intl = useIntl();
  const cancelToken = useCancelToken();
  const { dispatchDeletePinnedPost, dispatchOpenSnackbar } = useActions({
    dispatchDeletePinnedPost: deletePinnedPost,
    dispatchOpenSnackbar: SnackbarActionCreators.openSnackbar,
  });

  const handleUnPinPost = React.useCallback(async () => {
    const result = await dispatchDeletePinnedPost(
      { channelId: rootId, pinId: threadId },
      cancelToken.current.token,
    );

    if (result?.success) {
      dispatchOpenSnackbar({
        text: intl.formatMessage({
          id: "post_show/unpin_success_toast_message",
        }),
      });
    } else {
      dispatchOpenSnackbar({
        text: intl.formatMessage({
          id: "post_show/unpin_failure_toast_message",
        }),
      });
    }
    onClose();
  }, [
    cancelToken,
    rootId,
    dispatchDeletePinnedPost,
    dispatchOpenSnackbar,
    intl,
    onClose,
    threadId,
  ]);

  const alertButtons: IButton[] = React.useMemo(
    () => [
      {
        text: <FormattedMessage id="cancel_button" />,
        onClick: onClose,
      },
      {
        text: <FormattedMessage id="ok_button" />,
        onClick: handleUnPinPost,
      },
    ],
    [handleUnPinPost, onClose],
  );

  return (
    <AlertDialog
      open={open}
      title={intl.formatMessage({
        id: "post_show/post_more_menu_unpin/dialog_description",
      })}
      onClose={onClose}
      rightButtons={alertButtons}
    />
  );
}

interface IMaxCountPinAlertDialogProps {
  open: boolean;
  onClose(): void;
}

export function MaxCountPinAlertDialog({
  open,
  onClose,
}: IMaxCountPinAlertDialogProps) {
  const intl = useIntl();

  const alertButtons: IButton[] = React.useMemo(
    () => [
      {
        text: <FormattedMessage id="ok_button" />,
        onClick: onClose,
      },
    ],
    [onClose],
  );

  return (
    <AlertDialog
      open={open}
      title={intl.formatMessage({
        id: "post_show/post_more_menu_pin/dialog_max_alert",
      })}
      onClose={onClose}
      rightButtons={alertButtons}
    />
  );
}
