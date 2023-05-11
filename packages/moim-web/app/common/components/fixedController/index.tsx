import * as React from "react";
import throttle from "lodash/throttle";
import memoize from "lodash/memoize";
import getDocumentScrollElement from "common/helpers/getDocumentScrollElement";
import getParentScrollElement from "common/helpers/getParentScrollElement";

type StatusType = "fixed" | "normal";

const memoizedGetScrollElement = memoize(getDocumentScrollElement);

interface IProps {
  wrapperRef: React.RefObject<any>;
  calculateDirection?: "top" | "bottom";
  beforeStatus: StatusType;
  afterStatus: StatusType;
  fixedPosition?: number;
  children(fixed: boolean): React.ReactNode;
}

export default function FixedController({
  wrapperRef,
  beforeStatus,
  afterStatus,
  fixedPosition,
  calculateDirection = "top",
  children,
}: IProps) {
  const [status, setStatus] = React.useState<StatusType>("normal");

  const handleScroll = React.useMemo(
    () =>
      throttle(() => {
        requestAnimationFrame(() => {
          const scrollElement = memoizedGetScrollElement(
            wrapperRef?.current || null,
          );
          if (fixedPosition === undefined || !scrollElement) {
            return;
          }
          const position =
            calculateDirection === "top"
              ? fixedPosition
              : scrollElement.scrollHeight -
                scrollElement.clientHeight -
                fixedPosition;

          if (scrollElement.scrollTop < position) {
            setStatus(beforeStatus);
          } else {
            setStatus(afterStatus);
          }
        });
      }),
    [afterStatus, beforeStatus, calculateDirection, fixedPosition, wrapperRef],
  );

  React.useLayoutEffect(() => {
    const scrollElement = wrapperRef.current
      ? getParentScrollElement(wrapperRef.current)
      : window;

    handleScroll();
    scrollElement?.addEventListener("scroll", handleScroll);
    return () => {
      scrollElement?.removeEventListener("scroll", handleScroll);
    };
    // NOTE: should keep wrapperRef.current dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleScroll, wrapperRef.current]);

  return <>{children(status === "fixed")}</>;
}
