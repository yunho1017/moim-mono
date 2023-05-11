import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";

export interface IRefHandler {
  isMobile: boolean;
}

const IsMobileViewport = React.forwardRef<IRefHandler>((_props, ref) => {
  const isMobile = useIsMobile();
  React.useImperativeHandle(ref, () => ({
    isMobile,
  }));

  return null;
});

export default IsMobileViewport;
