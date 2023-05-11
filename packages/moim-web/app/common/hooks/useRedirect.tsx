import * as React from "react";
import { push } from "connected-react-router";
import { LocationDescriptorObject, Pathname, LocationState } from "history";
import { useActions } from "app/store";
import { MoimURL } from "common/helpers/url";
import {
  useNativeSecondaryView,
  usePluginSecondaryView,
} from "common/hooks/useSecondaryView";

const NATIVE_SECONDARY_ROUTE_PATH = [
  MoimURL.CommercePaymentsShow,
  MoimURL.CommercePaymentsList,
  MoimURL.CommerceMyBenefitCoupons,
  MoimURL.CommerceMyBenefitCouponsFocus,
  MoimURL.CommerceMyBenefit,
  MoimURL.CommerceMyWishlist,
  MoimURL.CommerceMyShopping,
  MoimURL.CommerceMyCarts,
  MoimURL.ProfileNftList,
  MoimURL.ProfileBadgeList,
  MoimURL.Members,
  MoimURL.MoimMembers,
  MoimURL.ConversationMembers,
  MoimURL.ForumMembers,
  MoimURL.PositionMembers,
  MoimURL.UserBookmark,
  MoimURL.MyQuestList,
  MoimURL.MyQuestListInActive,
  MoimURL.MyQuestListAchieved,
  MoimURL.CoinShow,
  MoimURL.CoinToBeExpired,
  MoimURL.Me,
];

const PLUGIN_SECONDARY_ROUTE_PATH = [MoimURL.PluginRightPanel];

function useRedirect() {
  const { redirect: nativeSecondPanelRedirect } = useNativeSecondaryView();
  const { redirect: pluginSecondPanelRedirect } = usePluginSecondaryView();
  const { interRedirect } = useActions({
    interRedirect: push,
  });

  const checkIsSecondPanelRoute = React.useCallback((pathname: string) => {
    if (
      PLUGIN_SECONDARY_ROUTE_PATH.find(route => route.isSameExact(pathname))
    ) {
      return "plugin";
    }

    if (
      NATIVE_SECONDARY_ROUTE_PATH.find(route => route.isSameExact(pathname))
    ) {
      return "native";
    }
    return "main";
  }, []);

  const openNewWindow = React.useCallback((url: string) => {
    try {
      const windInst = window.open(url, "_blank");
      if (!windInst) {
        alert("Please check your browser popup settings.");
        return;
      }
    } catch {
      alert("Please check your browser popup settings.");
    }
  }, []);

  const interRoute = React.useCallback(
    (location: LocationDescriptorObject<any> & { pathname: Pathname }) => {
      switch (checkIsSecondPanelRoute(location.pathname)) {
        case "plugin": {
          pluginSecondPanelRedirect(location);
          break;
        }
        case "native": {
          nativeSecondPanelRedirect(location);
          break;
        }
        case "main": {
          interRedirect(location);
          break;
        }
      }
    },
    [
      checkIsSecondPanelRoute,
      interRedirect,
      nativeSecondPanelRedirect,
      pluginSecondPanelRedirect,
    ],
  );

  /**
   *  NOTE: 여기서는 일절 query에 대한 제어를 피해주세요!
   */
  const redirect = React.useCallback(
    (url: string | LocationDescriptorObject<any>, state?: LocationState) => {
      if (typeof url === "string") {
        const nl = new URL(url, location.origin);
        if (nl.hostname === location.hostname) {
          interRoute({
            pathname: nl.pathname,
            search: nl.search,
            state,
          });
        } else {
          openNewWindow(nl.toString());
        }
      } else if (url.pathname) {
        interRoute(url as any);
      } else {
        console.error("[useRedirect] Unexpected url parameter", url, state);
      }
    },
    [interRoute, openNewWindow],
  );

  return redirect;
}

export function withRedirect<T extends RedirectHOCProps = RedirectHOCProps>(
  WrappedComponent: React.ComponentType<T>,
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithRedirect = (props: Omit<T, keyof RedirectHOCProps>) => {
    const redirect = useRedirect();

    return <WrappedComponent {...(props as T)} redirect={redirect} />;
  };

  ComponentWithRedirect.displayName = `withTheme(${displayName})`;

  return ComponentWithRedirect;
}

export interface RedirectHOCProps {
  redirect(
    url: string | LocationDescriptorObject<any>,
    state?: LocationState,
  ): void;
}
export default useRedirect;
