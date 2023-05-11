import * as React from "react";
import getParentScrollElement from "common/helpers/getParentScrollElement";

export default function useParentScrollElement(
  elementRef: React.RefObject<HTMLElement | null>,
) {
  const [scrollElement, setScrollElement] = React.useState<HTMLElement | null>(
    null,
  );
  React.useEffect(() => {
    if (elementRef.current) {
      setScrollElement(getParentScrollElement(elementRef.current));
    }
  }, [elementRef.current]);
  return scrollElement;
}
