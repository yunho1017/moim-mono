import * as React from "react";
import DialogComponent from "@material-ui/core/Dialog";
import useIsMobile from "common/hooks/useIsMobile";
import BottomSheet, {
  IRefHandler as IBottomSheetRefHandler,
} from "common/components/bottomSheet";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import AppBar from "common/components/appBar";
import { Dialog, CloseButton, EmptyHolder } from "./styled";

export { Dialog, FixedWidthDialog } from "./styled";

type IProps = React.PropsWithChildren<{
  open: boolean;
  dialogBase?: React.ComponentType<
    React.ComponentProps<typeof DialogComponent>
  >;
  bottomSheetRef?: React.RefObject<IBottomSheetRefHandler>;
  bottomSheetHeader?: React.ReactNode;
  useSameAppBarHeaderFromBottomSheet?: boolean;
  minHeight?: number;
  disableBottomSheetPortal?: boolean;
  onCloseRequest(): void;
  onExpanded?(expanded: boolean): void;
}> &
  Partial<React.ComponentProps<typeof AppBar>>;

function ResponsiveDialog({
  open,
  onCloseRequest,
  minHeight,
  children,
  bottomSheetRef,
  titleElement = "",
  bottomSheetHeader,
  useSameAppBarHeaderFromBottomSheet,
  dialogBase: DialogType = Dialog,
  disableBottomSheetPortal,
  leftButton,
  onExpanded,
  ...rest
}: IProps) {
  const isMobile = useIsMobile();
  const appBar = React.useMemo(
    () => (
      <AppBar
        ignoreMobileTitleAlignment={true}
        leftButton={
          useSameAppBarHeaderFromBottomSheet && isMobile ? (
            leftButton ?? <EmptyHolder />
          ) : (
            <CloseButton onClick={onCloseRequest} />
          )
        }
        titleElement={titleElement}
        {...rest}
      />
    ),
    [
      isMobile,
      onCloseRequest,
      rest,
      titleElement,
      leftButton,
      useSameAppBarHeaderFromBottomSheet,
    ],
  );

  return isMobile ? (
    <BottomSheet
      open={open}
      ref={bottomSheetRef}
      minHeight={minHeight}
      header={useSameAppBarHeaderFromBottomSheet ? appBar : bottomSheetHeader}
      disablePortal={disableBottomSheetPortal}
      onCloseRequest={onCloseRequest}
      onExpanded={onExpanded}
    >
      {children}
    </BottomSheet>
  ) : (
    <DialogType open={open} onClose={onCloseRequest}>
      <CustomAppBarModalLayout appBar={appBar} hasAppBarBorder={false}>
        {children}
      </CustomAppBarModalLayout>
    </DialogType>
  );
}

export default ResponsiveDialog;
