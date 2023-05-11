import * as React from "react";
import { CSSTransition } from "react-transition-group";
import "animate.css";

import { Wrapper, UpArrowIcon } from "./styled";

interface IProps {
  useWindowScroll?: boolean;
  scrollingTarget?: HTMLElement | null;
  disappearOffset?: number;
}

const ScrollToTop: React.FC<IProps> = ({
  useWindowScroll = false,
  scrollingTarget,
  disappearOffset,
}) => {
  const lastScrollPosRef = React.useRef<number>(0);
  const [visible, setVisibility] = React.useState(false);

  const handleScroll = React.useCallback(
    (e: any) => {
      const currentScrollY =
        (e.scrollY ||
          e.pageYOffset ||
          e.target.scrollTop ||
          e.target.scrollingElement?.scrollTop) ??
        0;
      const lastPos = lastScrollPosRef.current;
      if (
        (disappearOffset === undefined && lastPos - currentScrollY > 0) ||
        (disappearOffset !== undefined && disappearOffset >= currentScrollY)
      ) {
        setVisibility(false);
      } else {
        setVisibility(true);
      }

      lastScrollPosRef.current = currentScrollY;
    },
    [disappearOffset],
  );

  const handleToTop = React.useCallback(() => {
    requestAnimationFrame(() => {
      if (useWindowScroll) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        scrollingTarget?.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    });
  }, [scrollingTarget, useWindowScroll]);

  React.useLayoutEffect(() => {
    const target = useWindowScroll ? window : scrollingTarget;
    if (target) {
      target.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        target.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll, scrollingTarget, useWindowScroll]);

  return (
    <CSSTransition
      key="scroll-top"
      in={visible}
      unmountOnExit={true}
      timeout={300}
      classNames={{
        enter: "animate__slideInUp",
        exit: "animate__slideOutDown",
      }}
    >
      <Wrapper
        role="button"
        className="animate__animated"
        onClick={handleToTop}
      >
        <UpArrowIcon />
      </Wrapper>
    </CSSTransition>
  );
};

export default ScrollToTop;
