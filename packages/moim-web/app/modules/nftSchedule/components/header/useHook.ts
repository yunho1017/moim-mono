// vendor
import * as React from "react";
// helper
import { TopBannerContext } from "common/components/topBanner/context";
import { NFTScheduleShowContext } from "../../context";
import useIsMobile from "common/hooks/useIsMobile";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";

export function useProps() {
  const { containerRef, onBack } = React.useContext(NFTScheduleShowContext);
  const isMobile = useIsMobile();
  const [topBannerContext] = React.useContext(TopBannerContext);

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
    appBarTopPosition,
    onBack,
  };
}
