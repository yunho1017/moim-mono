import * as React from "react";

import { FormattedMessage } from "react-intl";
import AppBar from "common/components/appBar";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";
import {
  CloseButton,
  AppBarWrapper,
  CloseButtonWrapper,
} from "common/components/basicResponsiveDialog/styled";
import Inner from "./";
import { Wrapper } from "./styled";

import { useStoreState } from "app/store";
import { useCloseSNSShareDialog } from "./utils";

export default function SNSShareDialog() {
  const close = useCloseSNSShareDialog();
  const { open } = useStoreState(state => ({
    open: state.SNSShareDialog.open,
  }));

  return (
    <BasicResponsiveDialog open={open} onClose={close}>
      <Wrapper>
        <AppBarWrapper>
          <AppBar
            titleAlignment="Center"
            leftButton={
              <CloseButtonWrapper>
                <CloseButton onClick={close} />
              </CloseButtonWrapper>
            }
            titleElement={<FormattedMessage id="social_sharing/page_title" />}
          />
        </AppBarWrapper>
        <Inner />
      </Wrapper>
    </BasicResponsiveDialog>
  );
}
