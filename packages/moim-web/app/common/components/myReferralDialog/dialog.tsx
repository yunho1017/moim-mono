import * as React from "react";

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
import { useCloseMyReferralDialog } from "./hooks";

export default function MyReferralDialog() {
  const close = useCloseMyReferralDialog();
  const { open } = useStoreState(state => ({
    open: state.myReferralDialog.open,
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
            titleElement={""}
          />
        </AppBarWrapper>
        <Inner />
      </Wrapper>
    </BasicResponsiveDialog>
  );
}
