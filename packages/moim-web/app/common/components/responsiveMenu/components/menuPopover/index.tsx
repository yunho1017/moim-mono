import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import {
  PopoverPosition,
  PopoverOrigin,
  PopoverActions,
} from "@material-ui/core/Popover";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { FlattenInterpolation } from "styled-components";
import Popover from "common/components/designSystem/popover";

export interface IProps {
  open: boolean;
  anchorPosition?: PopoverPosition;
  anchorElement?: null | Element | ((element: Element) => Element);
  transitionComponent?: React.ComponentType<TransitionProps>;
  paperOverrideStyle?: FlattenInterpolation<any>;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  marginThreshold?: number;
  onCloseRequest(): void;
}

const MenuPopover: React.FC<IProps> = ({
  open,
  anchorPosition,
  anchorElement,
  transitionComponent,
  paperOverrideStyle,
  anchorOrigin,
  transformOrigin,
  marginThreshold,
  onCloseRequest,
  children,
}) => {
  const popoverAction = React.useRef<PopoverActions>(null);
  const aOrigin: PopoverOrigin | undefined = React.useMemo(
    () =>
      anchorOrigin ?? {
        vertical: "bottom",
        horizontal: "right",
      },
    [anchorOrigin],
  );

  const tOrigin: PopoverOrigin | undefined = React.useMemo(() => {
    return transformOrigin
      ? transformOrigin
      : Boolean(anchorElement)
      ? {
          vertical: "top",
          horizontal: "right",
        }
      : undefined;
  }, [anchorElement, transformOrigin]);

  const handleResize = React.useCallback(() => {
    popoverAction.current?.updatePosition();
  }, []);

  return (
    <Popover
      open={open}
      action={popoverAction}
      anchorReference={Boolean(anchorElement) ? "anchorEl" : "anchorPosition"}
      anchorPosition={anchorPosition}
      anchorEl={anchorElement}
      anchorOrigin={aOrigin}
      transformOrigin={tOrigin}
      TransitionComponent={transitionComponent}
      paperOverrideStyle={paperOverrideStyle}
      marginThreshold={marginThreshold}
      onClose={onCloseRequest}
    >
      <ReactResizeDetector
        handleWidth={true}
        handleHeight={true}
        onResize={handleResize}
      >
        {children}
      </ReactResizeDetector>
    </Popover>
  );
};

export default MenuPopover;
