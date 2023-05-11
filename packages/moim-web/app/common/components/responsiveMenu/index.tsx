import * as React from "react";
import { FlattenInterpolation } from "styled-components";

import MenuPopover, {
  IProps as IMenuPopoverProps,
} from "./components/menuPopover";
import BottomSheet, {
  IProps as IBottomSheetProps,
} from "common/components/bottomSheet";
import useIsMobile from "common/hooks/useIsMobile";

interface IProps
  extends IMenuPopoverProps,
    Omit<IBottomSheetProps, "handleStyle"> {
  bottomSheetHandleStyle?: FlattenInterpolation<any>;
}

const ResponsiveMenu: React.FC<IProps> = ({
  open,
  anchorPosition,
  anchorElement,
  minHeight,
  transitionComponent,
  bottomSheetHandleStyle,
  paperOverrideStyle,
  anchorOrigin,
  transformOrigin,
  marginThreshold,
  onCloseRequest,
  children,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <BottomSheet
        open={open}
        minHeight={minHeight}
        handleStyle={bottomSheetHandleStyle}
        onCloseRequest={onCloseRequest}
      >
        {children}
      </BottomSheet>
    );
  } else {
    return (
      <MenuPopover
        open={open}
        anchorPosition={anchorPosition}
        anchorElement={anchorElement}
        transitionComponent={transitionComponent}
        paperOverrideStyle={paperOverrideStyle}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        marginThreshold={marginThreshold}
        onCloseRequest={onCloseRequest}
      >
        {children}
      </MenuPopover>
    );
  }
};

export default ResponsiveMenu;
