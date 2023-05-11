import useRedirect from "./useRedirect";
import { useCallback, useMemo } from "react";
import useCurrentGroup from "./useCurrentGroup";
import getChannelUrl from "common/helpers/getChannelUrl";
import { MoimURL } from "common/helpers/url";

function useRedirectDefaultChannel() {
  const redirect = useRedirect();
  const homeUrl = useHomeUrl();
  const redirectDefaultChannel = useCallback(() => {
    redirect(homeUrl);
  }, [redirect, homeUrl]);
  return redirectDefaultChannel;
}

export default useRedirectDefaultChannel;

export function useHomeUrl() {
  const currentGroup = useCurrentGroup();
  return useMemo(() => {
    let redirectUrl: string | undefined = new MoimURL.MoimAppHome().toString();

    if (window.__homeChannel) {
      redirectUrl = getChannelUrl({
        id: window.__homeChannel.data.id,
        type: window.__homeChannel.data.type,
      });
    }
    if (currentGroup) {
      switch (currentGroup.home.web.type) {
        case "channel":
          redirectUrl = getChannelUrl(currentGroup.home.web.ref);
          break;
        case "cover":
          redirectUrl = new MoimURL.CoverPage().toString();
          break;
      }
    }
    return redirectUrl ?? new MoimURL.MoimAppHome().toString();
  }, [currentGroup]);
}
