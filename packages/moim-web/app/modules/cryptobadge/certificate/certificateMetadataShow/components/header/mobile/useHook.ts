// vendor
import * as React from "react";
// helper
import { TopBannerContext } from "common/components/topBanner/context";

import useIsMobile from "common/hooks/useIsMobile";
import useOpenState from "common/hooks/useOpenState";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";
import { CertificateShowContext } from "../../../../context";

export function useProps() {
  const { containerRef, onBack } = React.useContext(CertificateShowContext);
  const isMobile = useIsMobile();
  const [topBannerContext] = React.useContext(TopBannerContext);

  const refMenuButton = React.useRef(null);
  const {
    isOpen: openMenu,
    open: handleClickMenu,
    close: handleCloseRequestMenu,
  } = useOpenState();
  const [appBarTopPosition, setAppBarTopPosition] = React.useState(0);
  const visibleTopNavigation = useVisibleTopNavigation();

  const calcAppBarPosition = React.useCallback(() => {
    requestAnimationFrame(() => {
      if (containerRef?.current) {
        setAppBarTopPosition(
          containerRef?.current.getBoundingClientRect().y -
            document.documentElement.getBoundingClientRect().y,
        );
      }
    });
  }, [containerRef]);

  React.useLayoutEffect(() => {
    // NOTE: re-calc for promote sticky top banner
    window.addEventListener("scroll", calcAppBarPosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", calcAppBarPosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useLayoutEffect(() => {
    calcAppBarPosition();
  }, [
    visibleTopNavigation,
    topBannerContext.currentVisibleState,
    calcAppBarPosition,
  ]);

  return {
    isMobile,
    refMenuButton,

    appBarTopPosition,

    openMenu,
    handleClickMenu,
    handleCloseRequestMenu,
    onBack,
  };
}
