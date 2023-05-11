import usePrevious from "common/hooks/usePrevious";
import useMatchRoute from "common/hooks/useMatchRoute";
import { useNativeSecondaryView } from "app/common/hooks/useSecondaryView";
import useIsMobile from "common/hooks/useIsMobile";

export function useProps() {
  const isMobile = useIsMobile();
  const { history, location, close } = useNativeSecondaryView();
  const browserHistoryMatchRouter = useMatchRoute();
  const prevBrowserHistoryMatchRouter = usePrevious<Moim.Route.IMatchRoute>(
    browserHistoryMatchRouter,
  );

  return {
    isMobile,
    history,
    location,
    close,
    browserHistoryMatchRouter,
    prevBrowserHistoryMatchRouter,
  };
}
