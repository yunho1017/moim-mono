import * as React from "react";
import { DraggableEventHandler } from "react-draggable";
import { usePinch } from "react-use-gesture";

export interface IProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  adjustZoomOffset?: number;
  onClickDragWrapper?: React.MouseEventHandler<HTMLDivElement>;
  onZoomChange?(inZoom: boolean): void;
}

export function useProps(props: IProps) {
  const { onClick, onZoomChange } = props;
  const [canClick, setClickable] = React.useState(false);
  const [inZoom, setZoom] = React.useState(false);
  const [isGrab, setGrab] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const changeZoomStatus = React.useCallback(
    (status: boolean) => {
      setZoom(status);
      onZoomChange?.(status);
    },
    [onZoomChange],
  );

  const gestureBinder = usePinch(({ vdva }) => {
    setPosition({ x: 0, y: 0 });
    changeZoomStatus(vdva[0] > 0);
  });

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      if (e.ctrlKey || e.metaKey) {
        setPosition({ x: 0, y: 0 });
        changeZoomStatus(!inZoom);
        onClick?.(e);
      }
    },
    [inZoom, changeZoomStatus, onClick],
  );
  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    setClickable(e.ctrlKey || e.metaKey);
  }, []);

  const handleDragStart = React.useCallback(() => {
    setGrab(true);
  }, []);
  const handleDrag: DraggableEventHandler = React.useCallback((_, data) => {
    setPosition({
      x: data.x,
      y: data.y,
    });
  }, []);
  const handleDragEnd = React.useCallback(() => {
    setGrab(false);
  }, []);

  React.useEffect(() => {
    if (props.adjustZoomOffset) {
      changeZoomStatus(true);
    }
  }, [props.adjustZoomOffset, changeZoomStatus]);

  return {
    ...props,
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
  };
}
