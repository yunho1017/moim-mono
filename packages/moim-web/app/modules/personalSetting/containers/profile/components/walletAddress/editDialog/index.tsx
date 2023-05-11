import * as React from "react";

import BasicResponsiveDialog from "common/components/basicResponsiveDialog";
import AppBar from "common/components/appBar";
import {
  Wrapper,
  AppBarWrapper,
  LeftButtonWrapper,
  RightButtonWrapper,
  CloseButton,
  RetryIcon,
} from "./styled";

interface IProps {
  open: boolean;
  onClose(): void;
}

export default function PhoneEditDialog({ open, onClose }: IProps) {
  return (
    <BasicResponsiveDialog open={open} onClose={onClose}>
      <AppBarWrapper>
        <AppBar
          leftButton={
            <LeftButtonWrapper>
              <CloseButton onClick={onClose} />
            </LeftButtonWrapper>
          }
          rightButton={
            <RightButtonWrapper>
              <RetryIcon onClick={onClose} />
            </RightButtonWrapper>
          }
          titleElement=""
        />
      </AppBarWrapper>
      <Wrapper></Wrapper>
    </BasicResponsiveDialog>
  );
}
