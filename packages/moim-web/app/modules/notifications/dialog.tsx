import * as React from "react";
import { FormattedMessage } from "react-intl";
import Notifications from "./";
import { CloseButton, Title, DialogWrapper, Popover, Dialog } from "./styled";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import AppBar from "common/components/appBar";

import useNotificationsDialog from "common/hooks/useNotificationsDialog";
import useIsMobile from "common/hooks/useIsMobile";

export default function NotificationsPage() {
  const isMobile = useIsMobile();
  const {
    open,
    anchorElement,
    anchorOrigin,
    transformOrigin,
    closeNotificationsDialog,
  } = useNotificationsDialog();

  const contentsElement = React.useMemo(
    () => (
      <CustomAppBarModalLayout
        appBar={
          <AppBar
            leftButton={<CloseButton onClick={closeNotificationsDialog} />}
            titleElement={
              <Title>
                <FormattedMessage id="notifications/page_title" />
              </Title>
            }
            titleAlignment="Center"
          />
        }
        hasAppBarBorder={false}
      >
        <DialogWrapper>
          <Notifications />
        </DialogWrapper>
      </CustomAppBarModalLayout>
    ),
    [closeNotificationsDialog],
  );
  if (isMobile) {
    return (
      <Dialog open={open} onClose={closeNotificationsDialog} fullScreen={true}>
        {contentsElement}
      </Dialog>
    );
  }
  return (
    <Popover
      open={open}
      onClose={closeNotificationsDialog}
      anchorEl={anchorElement?.current}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      {contentsElement}
    </Popover>
  );
}
