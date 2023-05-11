import * as React from "react";
import { useLocation } from "react-router";
import {
  useSecondaryViewOpenState,
  useNativeSecondaryView,
} from "app/common/hooks/useSecondaryView";

export function useGetDestinationLink(
  promote: Moim.Promote.IAppDownload | null,
) {
  const location = useLocation();
  const { nativeOpenStatus } = useSecondaryViewOpenState();
  const { location: secondaryViewLocation } = useNativeSecondaryView();

  return React.useMemo(() => {
    if (!promote) {
      return null;
    }

    if (promote.targetUrl) {
      return promote.destinationUrl;
    }

    const destUrl = new URL(promote.destinationUrl);
    const innerUrl = destUrl.searchParams.get("link");
    if (innerUrl) {
      const linkParamUrl = new URL(innerUrl);
      linkParamUrl.pathname = nativeOpenStatus
        ? secondaryViewLocation?.pathname ?? location.pathname
        : location.pathname;
      linkParamUrl.search = nativeOpenStatus
        ? secondaryViewLocation?.search ?? location.search
        : location.search;
      destUrl.searchParams.set("link", linkParamUrl.toString());
    }
    return destUrl.toString();
  }, [
    promote,
    nativeOpenStatus,
    secondaryViewLocation?.pathname,
    secondaryViewLocation?.search,
    location.pathname,
    location.search,
  ]);
}
