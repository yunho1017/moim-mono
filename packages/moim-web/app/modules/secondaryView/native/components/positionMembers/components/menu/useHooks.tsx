// vendor
import * as React from "react";
import { useIntl } from "react-intl";
import { MoimURL } from "common/helpers/url";
import makeShareUrl from "common/helpers/makeShareUrl";
import useOpenState from "common/hooks/useOpenState";
// action
import { dismissPosition as dismissPositionAction } from "app/actions/position";
// component
import { IProps } from ".";
import { useActions } from "app/store";
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";

export function useProps(props: IProps) {
  const intl = useIntl();
  const { positionId } = props;
  const {
    isOpen: dismissAlertIsOpen,
    open: dismissAlertOpen,
    close: dismissAlertClose,
  } = useOpenState();
  const { positionDismiss } = useActions({
    positionDismiss: dismissPositionAction,
  });

  const shareUrl = React.useMemo(
    () =>
      makeShareUrl(
        positionId
          ? new MoimURL.PositionMembers({
              positionId,
            }).toString()
          : new MoimURL.NotFound().toString(),
      ),
    [positionId],
  );

  return {
    ...props,
    intl,
    shareUrl,
    positionDismiss,
    dismissAlertIsOpen,
    dismissAlertOpen,
    dismissAlertClose,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    intl,
    positionId,
    userId,
    shareUrl,
    positionDismiss,
    onCloseRequest,
    dismissAlertClose,
  } = props;
  const openShareDialog = useOpenSNSShareDialog(shareUrl);

  const handleShareClick = React.useCallback(() => {
    openShareDialog();
    onCloseRequest();
  }, [openShareDialog, onCloseRequest]);

  const handleConfirmDismissSelf = React.useCallback(() => {
    if (positionId && userId) {
      positionDismiss(
        {
          positionId,
          dismiss: { users: [userId] },
        },
        {
          succeed: intl.formatMessage({
            id: "position_settings/dismissal_position/toast_success",
          }),
          failed: intl.formatMessage({
            id: "position_settings/dismissal_position/toast_failure",
          }),
        },
      );

      onCloseRequest();
      dismissAlertClose();
    }
  }, [
    positionId,
    userId,
    positionDismiss,
    intl,
    onCloseRequest,
    dismissAlertClose,
  ]);

  return {
    ...props,
    handleShareClick,
    handleConfirmDismissSelf,
  };
}
