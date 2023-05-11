import * as React from "react";

import { Wrapper } from "./styledComponents";

interface IProps {
  dismissTimeout?: number;
}

const ScrollBar: React.FC<IProps> = ({ dismissTimeout = 1000, children }) => {
  const [timeoutEventId, setTimeoutEventId] = React.useState<NodeJS.Timeout>();
  const [onScrolling, setScrollStatus] = React.useState(false);

  const handleTimeout = React.useCallback(() => {
    setScrollStatus(false);
  }, []);

  const handleScroll = React.useCallback(() => {
    setScrollStatus(true);
    if (timeoutEventId) {
      clearTimeout(timeoutEventId);
    }
    // do something.

    setTimeoutEventId(setTimeout(handleTimeout, dismissTimeout));
  }, [dismissTimeout, handleTimeout, timeoutEventId]);

  return (
    <Wrapper isScrolling={onScrolling} onScroll={handleScroll}>
      {children}
    </Wrapper>
  );
};

export default ScrollBar;
