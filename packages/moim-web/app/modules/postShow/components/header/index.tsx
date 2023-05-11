import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import MobileHeader from "./mobile";
import DesktopHeader from "./desktop";

const ThreadShowHeader = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default ThreadShowHeader;
