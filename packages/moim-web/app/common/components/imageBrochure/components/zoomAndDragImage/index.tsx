import * as React from "react";
import Draggable from "react-draggable";

import { IProps, useProps } from "./useHook";
const DEFAULT_ZOOM_RATE = 1;

const ZNDImage = (props: IProps) => {
  const {
    onClick,
    adjustZoomOffset,
    style,
    canClick,
    inZoom,
    isGrab,
    position,
    gestureBinder,
    handleClick,
    handleKeyDown,
    handleDragStart,
    handleDrag,
    handleDragEnd,
    onClickDragWrapper,
    ...rest
  } = useProps(props);

  React.useLayoutEffect(() => {
    window.addEventListener("keydown", handleKeyDown, false);
    window.addEventListener("keyup", handleKeyDown, false);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, false);
      window.removeEventListener("keyup", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  const scale = React.useMemo(() => {
    if (!inZoom) {
      return DEFAULT_ZOOM_RATE;
    }

    return DEFAULT_ZOOM_RATE + (adjustZoomOffset ?? 0);
  }, [inZoom, adjustZoomOffset]);

  const newStyle: React.CSSProperties = {
    cursor: isGrab
      ? "grab"
      : canClick && inZoom
      ? "zoom-out"
      : canClick && !inZoom
      ? "zoom-in"
      : "auto",
    transform: `scale(${scale})`,
    transition: "transform 150ms ease 0s",
    ...style,
  };

  return (
    <Draggable
      axis="both"
      disabled={!inZoom}
      position={position}
      scale={scale}
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragEnd}
    >
      <div
        {...gestureBinder()}
        title="CTRL 또는 META(⌘) 키를 누르고 확대 할 수 있습니다."
        onClick={onClickDragWrapper}
      >
        <img
          {...rest}
          onClick={handleClick}
          style={newStyle}
          draggable={false}
        />
      </div>
    </Draggable>
  );
};

export default ZNDImage;
