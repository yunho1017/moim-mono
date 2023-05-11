import * as React from "react";
import memoize from "lodash/memoize";
import throttle from "lodash/throttle";
import { FlattenInterpolation } from "styled-components";

import getDocumentScrollElement from "common/helpers/getDocumentScrollElement";
import getParentScrollElement from "common/helpers/getParentScrollElement";
import useIsMobile from "app/common/hooks/useIsMobile";

export type HEAD_TITLE_ALIGNMENT = "Center" | "Left";

const memoizedGetScrollElement = memoize(getDocumentScrollElement);

export interface IProps {
  titleElement?: React.ReactNode;
  ignoreMobileTitleAlignment?: boolean;
  wrapperStyle?: FlattenInterpolation<any>;
  wrapperStickyStyle?: FlattenInterpolation<any>;
  wrapperStickedStyle?: FlattenInterpolation<any>;
  titleAlignment?: HEAD_TITLE_ALIGNMENT;
  subTitleElement?: React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  alwaysShowAppBarTitle?: boolean;
  enableScrollParallax?: boolean;
  titleContainerDisappearPosition?: number;
  parallaxDisappearPosition?: number;
  parallaxWrapperComponent?: string | React.ComponentType<any>;
  expendScrollParallaxElement?: React.ReactNode;
  useScrollDownHide?: boolean;
  onChangeParallaxVisible?: (visible: boolean) => void;
}

export const useProps = (props: IProps) => {
  const refThis = React.useRef<HTMLDivElement>(null);
  const refParallax = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [
    targetParallaxScrollHeight,
    setTargetParallaxScrollHeight,
  ] = React.useState(0);
  const [titleOpacity, setTitleOpacity] = React.useState(
    props.enableScrollParallax ? 0 : 1,
  );
  const [parallaxOpacity, setParallaxOpacity] = React.useState(
    props.enableScrollParallax ? 1 : 0,
  );
  const [sideElementWidth, setSideElementWidth] = React.useState(0);
  const titleAlignmentState = React.useMemo(
    () =>
      (isMobile && !props.ignoreMobileTitleAlignment
        ? "Left"
        : props.titleAlignment) || "Left",
    [isMobile, props.titleAlignment, props.ignoreMobileTitleAlignment],
  );

  const [parentWidth, setParentWidth] = React.useState(0);

  const [isParallaxVisible, setParallaxVisible] = React.useState(
    Boolean(props.enableScrollParallax && props.expendScrollParallaxElement),
  );
  const scrollElement = memoizedGetScrollElement(refThis.current);

  const handleParallaxVisibility = React.useCallback(
    (visible: boolean) => {
      setParallaxVisible(visible);
      props.onChangeParallaxVisible?.(visible);
    },
    [props.onChangeParallaxVisible],
  );

  const calcParallaxOpacity = React.useCallback(
    (scrollPos: number, throttleOffset: number) => {
      const titleDisappearOffset =
        props.titleContainerDisappearPosition ?? throttleOffset;
      let value = scrollPos / throttleOffset;
      value = parseFloat(value.toFixed(2));
      const rangeGuardValue = value > 1 ? 1 : value < 0 ? 0 : value;

      if (scrollPos >= titleDisappearOffset) {
        setTitleOpacity(rangeGuardValue);
      } else if (
        scrollPos < titleDisappearOffset &&
        titleOpacity > rangeGuardValue
      ) {
        setTitleOpacity(rangeGuardValue);
      }

      if (scrollPos >= throttleOffset) {
        setParallaxOpacity(1 - rangeGuardValue);
      } else if (
        scrollPos < throttleOffset &&
        parallaxOpacity < 1 - rangeGuardValue
      ) {
        setParallaxOpacity(1 - rangeGuardValue);
      }
    },
    [parallaxOpacity, props.titleContainerDisappearPosition, titleOpacity],
  );

  const handleScroll = React.useMemo(
    () =>
      throttle(() => {
        requestAnimationFrame(() => {
          if (!props.enableScrollParallax) {
            return;
          }
          if (!props.expendScrollParallaxElement) {
            handleParallaxVisibility(false);
          }
          const scrollHeight = targetParallaxScrollHeight;
          const scrollingElement = scrollElement;

          if (scrollingElement) {
            const scrollTop = scrollingElement.scrollTop;
            const offset = props.parallaxDisappearPosition ?? scrollHeight;

            calcParallaxOpacity(scrollTop, offset);
            if (scrollTop >= scrollHeight) {
              handleParallaxVisibility(false);
            } else {
              handleParallaxVisibility(true);
            }
          }
        });
      }, 120),
    [
      calcParallaxOpacity,
      handleParallaxVisibility,
      props.expendScrollParallaxElement,
      props.parallaxDisappearPosition,
      props.enableScrollParallax,
      scrollElement,
      targetParallaxScrollHeight,
    ],
  );

  const handleResize = React.useCallback((width: number) => {
    setParentWidth(width);
  }, []);

  const handleResizeSideWidth = React.useCallback(
    (width: number) => {
      if (titleAlignmentState === "Center") {
        setSideElementWidth(Math.max(sideElementWidth, width));
      }
    },
    [titleAlignmentState, sideElementWidth],
  );

  React.useLayoutEffect(() => {
    const parentScrollElement =
      getParentScrollElement(refThis?.current || null) ?? window;
    parentScrollElement.addEventListener("scroll", handleScroll);
    return () => {
      parentScrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  React.useLayoutEffect(() => {
    const targetParallax = refParallax.current;
    if (targetParallax) {
      setTargetParallaxScrollHeight(targetParallax.scrollHeight);
    }
  }, [refParallax]);

  return {
    ...props,
    titleOpacity,
    parallaxOpacity,
    handleScroll,
    isParallaxVisible,
    titleAlignmentState,
    parentWidth,
    refParallax,
    refThis,
    sideElementWidth,
    handleResize,
    handleResizeSideWidth,
  };
};
