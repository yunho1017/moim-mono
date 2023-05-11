import * as React from "react";
import * as qs from "query-string";
// hooks
import { useActions } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useHomeUrl } from "common/hooks/useRedirectDefaultChannel";
import useRedirect from "common/hooks/useRedirect";
// helpers
import { MoimURL } from "common/helpers/url";
import getWildDomainName from "common/helpers/getWildDomain";
import * as CookieHandler from "common/helpers/cookieHandler";
import { selectHubMoimIdWithoutState } from "common/helpers/selectHubMoimId";
// constants
import { GROUP_INVITE_CODE, VISITED_MOIM_IDS } from "common/constants/keys";
// components
import { getMoimTokenToCookie } from "common/helpers/authentication";
import { getChannel } from "app/actions/channel";
import getChannelUrl from "common/helpers/getChannelUrl";

const getVisitedMoimCookie = (): string[] =>
  JSON.parse(CookieHandler.get(VISITED_MOIM_IDS) ?? "[]");

const isVisitedMoim = (moimId: Moim.Id) => {
  const storedMoimIds = new Set(getVisitedMoimCookie());
  return storedMoimIds.has(moimId);
};

const setVisitedMoimCookie = (moimId: Moim.Id) => {
  const storedMoimIds = new Set(getVisitedMoimCookie());
  CookieHandler.set(
    VISITED_MOIM_IDS,
    JSON.stringify(Array.from(storedMoimIds.add(moimId))),
    {
      domain: getWildDomainName(),
      expires: 365, // 365 days
    },
  );
};

function HomeRedirector() {
  const redirect = useRedirect();
  const group = useCurrentGroup();
  const hubGroupId = selectHubMoimIdWithoutState(group);
  const cookieCanPass = hubGroupId ? getMoimTokenToCookie(hubGroupId) : null;
  const homeUrl = useHomeUrl();

  const { dispatchGetChannel } = useActions({
    dispatchGetChannel: getChannel,
  });

  const getTabChannelData = React.useCallback(async () => {
    const tab = group?.user_mobile_top_tabs?.[0] ?? group?.mobile_top_tabs?.[0];

    if (tab?.type === "home") {
      return;
    }

    const channelId = tab?.channelId?.startsWith("A")
      ? tab.items?.[0]?.type === "home"
        ? undefined
        : tab.items?.[0]?.channelId
      : tab?.channelId;

    if (!channelId) return;

    const result = await dispatchGetChannel({ channelId });

    if (!result || result.data.type === "category") return;

    redirect(
      getChannelUrl({
        id: result.data.id,
        type: result.data.type,
      }),
    );
  }, [
    dispatchGetChannel,
    redirect,
    group?.mobile_top_tabs,
    group?.user_mobile_top_tabs,
  ]);

  const doRedirect = React.useCallback(() => {
    if (group) {
      const params = qs.parse(location.search);
      const inviteCode = params.refu as string;

      if (inviteCode) {
        CookieHandler.set(
          GROUP_INVITE_CODE(group.is_hub ? group.id : group.parent!),
          inviteCode,
          {
            domain: getWildDomainName(),
            expires: 7,
          },
        );
      }

      if (
        !cookieCanPass &&
        !isVisitedMoim(group.id) &&
        group.config.landing &&
        !params.skipLanding
      ) {
        switch (group.config.landing.type) {
          case "cover": {
            redirect(
              new MoimURL.CoverPage().toString() + `?${qs.stringify(params)}`,
            );

            break;
          }
          case "url": {
            location.href = `group.config.landing.url?${qs.stringify(params)}`;

            break;
          }
        }
      } else {
        if (group.navigation_config?.showTopTabOnWeb) {
          getTabChannelData();
        }

        redirect(homeUrl);
      }

      setVisitedMoimCookie(group.id);
    }
  }, [homeUrl, group, cookieCanPass, redirect, getTabChannelData]);

  React.useEffect(() => {
    doRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default HomeRedirector;
