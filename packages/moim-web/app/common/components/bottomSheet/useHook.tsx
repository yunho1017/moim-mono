import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { DraggableEventHandler } from "react-draggable";
import { px2remValue, rem2px } from "app/common/helpers/rem";
import { useRegisterWindowResizeCallback } from "common/hooks/useWindowSize";
import { sheetHeaderHeight } from "./styledComponent";

export const remHeaderHeight = px2remValue(sheetHeaderHeight);
const FULL_SCREEN_OFFSET = 100;

export interface IRefHandler {
  isExpended: boolean;
}

export type IProps = React.PropsWithChildren<{
  open: boolean;
  header?: React.ReactNode;
  bottom?: React.ReactNode;
  minHeight?: number;
  disableExpand?: boolean;
  disablePortal?: boolean;
  disableHandle?: boolean;
  handleStyle?: FlattenInterpolation<any>;
  keepContentMount?: boolean;
  onCloseRequest(): void;
  onExpanded?(expanded: boolean): void;
}>;

export function useProps(props: IProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    open,
    minHeight: pxMinHeight = 0,
    disableHandle,
    onCloseRequest,
    onExpanded,
  } = props;
  const [initialYPosition, setInitialYPosition] = React.useState(0);
  const [isFullScreen, setFullScreenState] = React.useState(false);
  const [needScroll, setNeedScroll] = React.useState(false);
  const [innerHeight, setInnerHeight] = React.useState(0);
  const remMinHeight = React.useMemo(() => {
    const maxHeight = Math.round((innerHeight / 4) * 3);
    setNeedScroll(pxMinHeight > maxHeight);
    return px2remValue(pxMinHeight > maxHeight ? maxHeight : pxMinHeight);
  }, [innerHeight, pxMinHeight]);
  const minHeight = React.useMemo(
    () => rem2px(remMinHeight + (!disableHandle ? remHeaderHeight : 0)),
    [disableHandle, remMinHeight],
  );
  const startYValue = React.useRef(0);

  const innerChildContainerRecommendHeight = React.useMemo(
    () => rem2px(remMinHeight - remHeaderHeight - 2),
    [remMinHeight],
  );

  const calcYPosition = React.useCallback(() => {
    const windowHeight = innerHeight;
    if (!open) {
      setInitialYPosition(windowHeight);
      setFullScreenState(false);
      onExpanded?.(false);
    } else {
      setInitialYPosition(
        open && isFullScreen
          ? 0
          : pxMinHeight
          ? windowHeight - minHeight
          : Math.round(windowHeight / 2),
      );
    }
  }, [innerHeight, open, onExpanded, isFullScreen, pxMinHeight, minHeight]);

  useRegisterWindowResizeCallback(({ height }) => {
    const intHeight = Math.round(height);
    setInnerHeight(intHeight);
    setInitialYPosition(
      open && isFullScreen
        ? 0
        : pxMinHeight
        ? intHeight - minHeight
        : Math.round(intHeight / 2),
    );
  });

  const handleDragStart: DraggableEventHandler = React.useCallback(
    (_, data) => {
      startYValue.current = data.y;
    },
    [],
  );

  const handleDragEnd: DraggableEventHandler = React.useCallback(
    (_, data) => {
      const isUserWantFullScreen =
        startYValue.current - data.y > FULL_SCREEN_OFFSET;
      const isUserCloseFullScreen =
        startYValue.current - data.y < -FULL_SCREEN_OFFSET;
      if (isUserWantFullScreen) {
        setFullScreenState(true);
        onExpanded?.(true);
      } else if (isUserCloseFullScreen) {
        setFullScreenState(false);
        onExpanded?.(false);
        if (!isFullScreen) {
          onCloseRequest();
        }
      }
    },
    [isFullScreen, onCloseRequest, onExpanded],
  );

  React.useLayoutEffect(() => {
    setInnerHeight(Math.round(window.innerHeight));
  }, []);

  return {
    ...props,
    needScroll,
    innerHeight,
    isFullScreen,
    initialYPosition,
    innerChildContainerRecommendHeight,
    calcYPosition,
    handleDragStart,
    handleDragEnd,
  };
}
