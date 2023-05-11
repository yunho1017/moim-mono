import { useActions, useStoreState } from "app/store";

import { ActionCreators as NotificationActionCreators } from "app/actions/notification";

function useNotificationsDialog() {
  const { open, anchorElement, anchorOrigin, transformOrigin } = useStoreState(
    state => ({
      open: state.notification.notificationDialog.open,
      anchorElement: state.notification.notificationDialog.anchorElement,
      anchorOrigin: state.notification.notificationDialog.anchorOrigin,
      transformOrigin: state.notification.notificationDialog.transformOrigin,
    }),
  );

  const { openNotificationsDialog, closeNotificationsDialog } = useActions({
    openNotificationsDialog: NotificationActionCreators.openNotificationsDialog,
    closeNotificationsDialog:
      NotificationActionCreators.closeNotificationsDialog,
  });

  return {
    open,
    anchorElement,
    anchorOrigin,
    transformOrigin,
    openNotificationsDialog,
    closeNotificationsDialog,
  };
}

export default useNotificationsDialog;
