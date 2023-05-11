import * as React from "react";

import {
  ModalWrapper,
  DefaultPaddingWrapper,
  ModalContents,
  FixedHeightSmallModalLayout,
  FixedHeightSmallModalContentWrapper,
  DynamicHeightSmallModalContentWrapper,
  CloseButton,
  Dialog,
  bottomSheetAppBarStyle,
  dynamicHeightWrapperStyle,
} from "./styled";
import useIsMobile from "common/hooks/useIsMobile";
import AppBar from "common/components/appBar";
import CustomAppBarModalLayout from "../customAppbar";
import BottomSheet from "common/components/bottomSheet";
import { DialogContainer } from "common/components/navigationModal";

export { FixedHeightSmallModalLayout };

export const SmallModalLayout = ({ children }: React.PropsWithChildren<{}>) => (
  <ModalWrapper>
    <DefaultPaddingWrapper>
      <ModalContents>{children}</ModalContents>
    </DefaultPaddingWrapper>
  </ModalWrapper>
);

interface IWithCustomAppBarProps
  extends React.PropsWithChildren<React.ComponentProps<typeof AppBar>> {
  onCloseRequest(): void;
}
function WithCustomAppBar({
  children,
  onCloseRequest,
  wrapperStyle,
  ...rest
}: React.PropsWithChildren<IWithCustomAppBarProps>) {
  return (
    <CustomAppBarModalLayout
      appBar={
        <AppBar
          leftButton={<CloseButton onClick={onCloseRequest} />}
          {...rest}
        />
      }
      hasAppBarBorder={false}
      wrapperStyle={wrapperStyle}
    >
      {children}
    </CustomAppBarModalLayout>
  );
}

interface ICommonProps
  extends React.PropsWithChildren<
    React.ComponentProps<typeof BottomSheet> &
      React.ComponentProps<typeof AppBar>
  > {
  useBottomSheetHeader?: boolean;
}

export function FixedHeightDialogContainer({
  onCloseRequest,
  children,
  open = true,
  ...rest
}: ICommonProps) {
  return (
    <Dialog open={open} onClose={onCloseRequest}>
      <FixedHeightSmallModalContentWrapper>
        <WithCustomAppBar onCloseRequest={onCloseRequest} {...rest}>
          {children}
        </WithCustomAppBar>
      </FixedHeightSmallModalContentWrapper>
    </Dialog>
  );
}

export function DynamicHeightDialogContainer({
  onCloseRequest,
  children,
  open = true,
  ...rest
}: ICommonProps) {
  return (
    <Dialog open={open} onClose={onCloseRequest}>
      <DynamicHeightSmallModalContentWrapper>
        <WithCustomAppBar
          onCloseRequest={onCloseRequest}
          wrapperStyle={dynamicHeightWrapperStyle}
          {...rest}
        >
          {children}
        </WithCustomAppBar>
      </DynamicHeightSmallModalContentWrapper>
    </Dialog>
  );
}

export function DynamicHeightResponsiveDialog({
  onCloseRequest,
  children,
  open = true,
  useBottomSheetHeader,
  ...rest
}: ICommonProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    if (!open) {
      return null;
    }
    return (
      <DialogContainer handleClose={onCloseRequest}>
        <BottomSheet
          open={open}
          onCloseRequest={onCloseRequest}
          handleStyle={bottomSheetAppBarStyle}
          header={
            useBottomSheetHeader && (
              <AppBar
                ignoreMobileTitleAlignment={true}
                leftButton={null}
                {...rest}
              />
            )
          }
        >
          {children}
        </BottomSheet>
      </DialogContainer>
    );
  }
  return (
    <DynamicHeightDialogContainer
      onCloseRequest={onCloseRequest}
      open={open}
      {...rest}
    >
      {children}
    </DynamicHeightDialogContainer>
  );
}

export function FixedHeightResponsiveDialog({
  onCloseRequest,
  children,
  open = true,
  ...rest
}: ICommonProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    if (!open) {
      return null;
    }
    return (
      <DialogContainer handleClose={onCloseRequest}>
        <BottomSheet open={open} onCloseRequest={onCloseRequest}>
          {children}
        </BottomSheet>
      </DialogContainer>
    );
  }
  return (
    <FixedHeightDialogContainer
      onCloseRequest={onCloseRequest}
      open={open}
      {...rest}
    >
      {children}
    </FixedHeightDialogContainer>
  );
}
