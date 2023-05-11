// vendor
import * as React from "react";
import memoize from "lodash/memoize";

import getDocumentScrollElement from "common/helpers/getDocumentScrollElement";

const memoizedGetScrollElement = memoize(getDocumentScrollElement);

function useMaintainScroll() {
  const refThis = React.useRef<HTMLDivElement>(null);
  const [currentScrollState, setCurrentScrollState] = React.useState<
    null | number
  >(null);

  React.useLayoutEffect(() => {
    if (currentScrollState) {
      const scrollElement = memoizedGetScrollElement(refThis.current);
      requestAnimationFrame(() => {
        scrollElement.scrollTop =
          scrollElement.scrollHeight - currentScrollState;
      });
      setCurrentScrollState(null);
    }
  }, [currentScrollState]);

  return {
    refThis,
    currentScrollState,
    setCurrentScrollState,
  };
}

export default useMaintainScroll;
