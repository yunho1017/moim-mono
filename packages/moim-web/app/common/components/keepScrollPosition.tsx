import * as React from "react";
import throttle from "lodash/throttle";
import { isBrowser } from "common/helpers/envChecker";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  throttleTime?: number;
}

export default React.forwardRef<HTMLDivElement, IProps>(
  function KeepScrollPosition(
    props: IProps,
    forwardRef: React.MutableRefObject<HTMLDivElement | null>,
  ) {
    const { children, throttleTime = 150, onScroll, ...rests } = props;
    const scrollPosition: React.MutableRefObject<
      undefined | [number, number]
    > = React.useRef();
    const scrollElement: React.RefObject<HTMLDivElement> = React.useRef(null);
    const handleScroll: React.MutableRefObject<
      undefined | ((event: React.UIEvent<HTMLDivElement>) => void)
    > = React.useRef();
    if (isBrowser()) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useLayoutEffect(() => {
        forwardRef.current = scrollElement.current;
        handleScroll.current = throttle(
          (event: React.UIEvent<HTMLDivElement>) => {
            if (scrollElement.current) {
              const { scrollLeft, scrollTop } = scrollElement.current;
              scrollPosition.current = [scrollLeft, scrollTop];
            }
            if (onScroll) {
              onScroll(event);
            }
          },
          throttleTime,
        );
      }, [forwardRef, onScroll, throttleTime]);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useLayoutEffect(() => {
        if (scrollPosition.current && scrollElement.current) {
          const [scrollLeft, scrollTop] = scrollPosition.current;
          scrollElement.current.scrollLeft = scrollLeft;
          scrollElement.current.scrollTop = scrollTop;
        }
      });
    }
    return (
      <div {...rests} onScroll={handleScroll.current} ref={scrollElement}>
        {children}
      </div>
    );
  },
);
