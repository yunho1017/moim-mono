import * as React from "react";
import MobileTopSubNavigation from "./mobile";
import DesktopTopNavigation from "./desktop";

import useIsMobile from "common/hooks/useIsMobile";

const TopSubNavigation: React.FC = () => {
  const isMobile = useIsMobile();

  const inner = React.useMemo(() => {
    if (isMobile) {
      return <MobileTopSubNavigation />;
    }

    return <DesktopTopNavigation />;
  }, [isMobile]);

  return <>{inner}</>;
};

export default TopSubNavigation;
