import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
import { InView } from "react-intersection-observer";

const Wrapper = styled.div<{ overrideStyle?: FlattenInterpolation<any> }>``;

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  overrideStyle?: FlattenInterpolation<any>;
}

export interface IRefHandler {
  self: React.RefObject<HTMLDivElement>;
}

const TargetScrollItem = React.forwardRef<IRefHandler, IProps>(
  ({ overrideStyle, children, ...rest }, ref) => {
    const [initialScroll, setInitialScroll] = React.useState(true);
    const [isInView, setInView] = React.useState(false);
    const refSelf = React.useRef<HTMLDivElement>(null);

    const scrollToTarget = React.useCallback(() => {
      requestAnimationFrame(() => {
        document.scrollingElement?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      });
    }, []);

    const checkIsScroll = React.useCallback(() => {
      const scrollHeight = Math.abs(
        document.scrollingElement?.getBoundingClientRect().y || 0,
      );
      const diffScrollCursor =
        document.scrollingElement?.scrollTop !== scrollHeight;
      if (!isInView || initialScroll || diffScrollCursor) {
        setTimeout(() => {
          scrollToTarget();
          if (diffScrollCursor) {
            checkIsScroll();
          }
        }, 500);
      }
    }, [initialScroll, isInView, scrollToTarget]);

    const handleInViewChange = React.useCallback(
      (inView: boolean) => {
        setInView(inView);
        if (!inView) {
          checkIsScroll();
        }
      },
      [checkIsScroll],
    );

    React.useLayoutEffect(() => {
      if (initialScroll) {
        scrollToTarget();
        setInitialScroll(false);
      }
    }, [initialScroll, scrollToTarget]);

    React.useImperativeHandle(ref, () => ({
      self: refSelf,
    }));

    return (
      <InView onChange={handleInViewChange} threshold={0.75}>
        <Wrapper ref={refSelf} overrideStyle={overrideStyle} {...rest}>
          {children}
        </Wrapper>
      </InView>
    );
  },
);

export default TargetScrollItem;
