import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import {
  InnerLeftArrow,
  InnerRightArrow,
  NormalLeftArrow,
  NormalRightArrow,
} from "./arrows";
import {
  Wrapper,
  ArrowTopPlace,
  ArrowBottomPlace,
  ItemContainer,
} from "./styled";

interface IProps {
  children: React.ReactNode[];
  disableArrow?: boolean;
  arrowPlacement?: "top" | "bottom" | "inner";
  rightArrow?: React.ReactNode;
  leftArrow?: React.ReactNode;
  enableWheelScroll?: boolean;
  itemContainerStyle?: FlattenInterpolation<any>;
}

function onWheelEvent(
  apiObj: React.ContextType<typeof VisibilityContext>,
  ev: React.WheelEvent,
): void {
  const isTouchPad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isTouchPad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const HorizontalScroll: React.FC<IProps> = ({
  itemContainerStyle,
  disableArrow,
  arrowPlacement,
  rightArrow,
  leftArrow,
  enableWheelScroll,
  children,
}) => {
  const inner = React.useMemo(
    () => (
      <Wrapper showArrow={!disableArrow}>
        <ScrollMenu
          LeftArrow={
            disableArrow
              ? undefined
              : leftArrow ??
                (arrowPlacement === "inner" ? InnerLeftArrow : NormalLeftArrow)
          }
          RightArrow={
            disableArrow
              ? undefined
              : rightArrow ??
                (arrowPlacement === "inner"
                  ? InnerRightArrow
                  : NormalRightArrow)
          }
          onWheel={enableWheelScroll ? onWheelEvent : undefined}
        >
          {children.map((elm, idx) => (
            <ItemContainer
              key={`horizontal_item_${idx}`}
              itemId={`horizontal_item_${idx}`}
              overrideStyle={itemContainerStyle}
            >
              {elm}
            </ItemContainer>
          ))}
        </ScrollMenu>
      </Wrapper>
    ),
    [
      arrowPlacement,
      children,
      disableArrow,
      enableWheelScroll,
      itemContainerStyle,
      leftArrow,
      rightArrow,
    ],
  );

  switch (arrowPlacement) {
    case "bottom": {
      return <ArrowBottomPlace>{inner}</ArrowBottomPlace>;
    }

    case "top": {
      return <ArrowTopPlace>{inner}</ArrowTopPlace>;
    }

    default:
    case "inner": {
      return inner;
    }
  }
};

export default HorizontalScroll;
