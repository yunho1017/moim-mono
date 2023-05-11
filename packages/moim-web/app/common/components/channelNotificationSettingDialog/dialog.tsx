import * as React from "react";

import { FormattedMessage } from "react-intl";
import AppBar from "common/components/appBar";
import { WithoutMinHeightResponsiveDialog } from "common/components/basicResponsiveDialog";
import {
  CloseButton,
  CloseButtonWrapper,
} from "common/components/basicResponsiveDialog/styled";
import Inner from "./";
import { Wrapper, AppBarWrapper } from "./styled";

import { useStoreState } from "app/store";
import { useCloseChannelNotificationSettingDialog } from "./hooks";

export default function ChannelNotificationSettingDialog() {
  const close = useCloseChannelNotificationSettingDialog();
  const { open, type } = useStoreState(state => ({
    open: state.channelNotificationSettingDialog.open,
    type: state.channelNotificationSettingDialog.type,
  }));

  return (
    <WithoutMinHeightResponsiveDialog open={open} onClose={close}>
      <Wrapper>
        <AppBarWrapper>
          <AppBar
            titleAlignment="Center"
            leftButton={
              <CloseButtonWrapper>
                <CloseButton onClick={close} />
              </CloseButtonWrapper>
            }
            titleElement={
              type === "dm" ? (
                <FormattedMessage id="channel_notification_settings/dm_page_title" />
              ) : (
                <FormattedMessage id="channel_notification_settings/page_title" />
              )
            }
          />
        </AppBarWrapper>
        <Inner />
      </Wrapper>
    </WithoutMinHeightResponsiveDialog>
  );
}
