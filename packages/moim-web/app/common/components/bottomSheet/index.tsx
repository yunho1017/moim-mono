import * as React from "react";
import Draggable from "react-draggable";
import { createPortal } from "react-dom";
import { IRefHandler, IProps, useProps } from "./useHook";
import {
  BottomSheetRoot,
  Backdrop,
  Sheet,
  SheetHeader,
  SheetContent,
} from "./styledComponent";
import FreezeView from "../freezeView";

const BottomSheet = React.forwardRef<IRefHandler, IProps>((props, ref) => {
  const {
    open,
    children,
    header,
    isFullScreen,
    initialYPosition,
    disablePortal,
    handleStyle,
    needScroll,
    innerHeight,
    innerChildContainerRecommendHeight,
    calcYPosition,
    keepContentMount,
    disableExpand,
    disableHandle,
    handleDragStart,
    handleDragEnd,
    onCloseRequest,
  } = useProps(props);

  const element = React.useMemo(
    () => (
      <BottomSheetRoot open={open}>
        <FreezeView isFreeze={open}>
          <Backdrop onClick={onCloseRequest} />
        </FreezeView>
        <Draggable
          axis="y"
          disabled={disableExpand}
          defaultPosition={{ x: 0, y: innerHeight }}
          position={{ x: 0, y: initialYPosition }}
          handle={!disableHandle ? ".bottomSheetHandler" : undefined}
          scale={1}
          onStart={handleDragStart}
          onStop={handleDragEnd}
        >
          <Sheet isFullScreen={isFullScreen}>
            {!disableHandle && (
              <SheetHeader overrideStyle={handleStyle}>
                <div className="bottomSheetHandler"></div>
                {header}
              </SheetHeader>
            )}

            {open || keepContentMount ? (
              <SheetContent
                isFullScreen={isFullScreen}
                needScroll={needScroll}
                innerChildHeight={innerChildContainerRecommendHeight}
              >
                {children}
              </SheetContent>
            ) : null}
          </Sheet>
        </Draggable>
      </BottomSheetRoot>
    ),
    [
      disableExpand,
      disableHandle,
      open,
      innerHeight,
      isFullScreen,
      header,
      handleStyle,
      initialYPosition,
      children,
      needScroll,
      innerChildContainerRecommendHeight,
      handleDragStart,
      onCloseRequest,
      handleDragEnd,
      keepContentMount,
    ],
  );

  React.useImperativeHandle(ref, () => ({
    isExpended: isFullScreen,
  }));

  React.useEffect(() => {
    calcYPosition();
  }, [calcYPosition]);

  if (disablePortal) {
    return element;
  } else {
    return createPortal(element, document.body);
  }
});

export default BottomSheet;
export { IProps, IRefHandler };
