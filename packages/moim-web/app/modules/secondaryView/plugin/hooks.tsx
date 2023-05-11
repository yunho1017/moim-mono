import usePrevious from "common/hooks/usePrevious";
import useMatchRoute from "common/hooks/useMatchRoute";
import { usePluginSecondaryView } from "app/common/hooks/useSecondaryView";

export function useProps() {
  const { history, location, close } = usePluginSecondaryView();
  const browserHistoryMatchRouter = useMatchRoute();
  const prevBrowserHistoryMatchRouter = usePrevious<Moim.Route.IMatchRoute>(
    browserHistoryMatchRouter,
  );

  return {
    history,
    location,
    close,
    browserHistoryMatchRouter,
    prevBrowserHistoryMatchRouter,
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function useEffects(_hookProps: ReturnType<typeof useProps>) {}
