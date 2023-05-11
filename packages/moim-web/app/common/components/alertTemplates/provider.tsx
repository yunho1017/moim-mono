import * as React from "react";
import { positions, Provider } from "react-alert";
// components
import AlertTemplates from "./";
import AlertOpener from "./alerts/alertOpener";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";
import useIsMobile from "common/hooks/useIsMobile";

import { TOP_NAVIGATION_HEIGHT } from "app/modules/layout/components/topNavigation/constant";

export type IProps = React.PropsWithChildren<{}>;

function AlertProvider({ children }: React.PropsWithChildren<{}>) {
  const isMobile = useIsMobile();
  const visibleTopNavigation = useVisibleTopNavigation();
  return (
    <Provider
      template={AlertTemplates}
      position={isMobile ? positions.TOP_LEFT : positions.BOTTOM_LEFT}
      offset="0"
      containerStyle={{
        zIndex: 99999,
        ...(visibleTopNavigation && isMobile
          ? { top: TOP_NAVIGATION_HEIGHT }
          : undefined),
      }}
    >
      {children}
      <AlertOpener />
    </Provider>
  );
}

export default AlertProvider;
