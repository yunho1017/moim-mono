import * as React from "react";
import { InView } from "react-intersection-observer";
import {
  closeAppDownloadPromoteBanner,
  isAppDownloadPromoteBannerUntilHide,
  setAppDownloadPromoteBannerIsInViewed,
  getAppDownloadPromoteBannerIsInViewed,
} from "../utils";

import { useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { useGetDestinationLink } from "../useHooks";
import useKeepAliveAxiosInstance from "common/helpers/keepAliveAxios";
import StickyTopBannerContents from "./contents";

const StickyTopBanner: React.FC = () => {
  const [isScrollVisible, setScrollVisible] = React.useState(true);
  const isUntilHide = isAppDownloadPromoteBannerUntilHide();
  const [visibility, setVisibility] = React.useState(true);
  const { promoteData, currentGroupId } = useStoreState(state => ({
    promoteData: state.promote.appDownloadPromote.banner,
    currentGroupId: state.app.currentGroupId,
  }));
  const getKeepAliveAxiosInstance = useKeepAliveAxiosInstance();
  const isMobile = useIsMobile();
  const destinationLink = useGetDestinationLink(promoteData);

  const handleCloseTemporarily = React.useCallback(() => {
    closeAppDownloadPromoteBanner();
    setVisibility(false);
  }, []);

  const handleClickOpenApp = React.useCallback(() => {
    if (promoteData && destinationLink) {
      getKeepAliveAxiosInstance().post(
        `/groups/${currentGroupId}/app_promotions/${promoteData.id}/action`,
        {
          action: "clickCount",
        },
      );
      window.open(destinationLink, "_blank");
    }
  }, [currentGroupId, getKeepAliveAxiosInstance, destinationLink, promoteData]);

  const handleInViewChange = React.useCallback(
    (inView: boolean) => {
      const isInViewed = getAppDownloadPromoteBannerIsInViewed();
      if (inView && !isInViewed && promoteData) {
        getKeepAliveAxiosInstance().post(
          `/groups/${currentGroupId}/app_promotions/${promoteData.id}/action`,
          {
            action: "viewCount",
          },
        );
        setAppDownloadPromoteBannerIsInViewed();
      }
    },
    [currentGroupId, getKeepAliveAxiosInstance, promoteData],
  );

  const handleScroll = React.useCallback(e => {
    const scrollElement = e.target.scrollingElement;
    if (scrollElement) {
      setScrollVisible(scrollElement.scrollTop === 0);
    }
  }, []);

  React.useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (
    !isMobile ||
    !promoteData ||
    isUntilHide ||
    !visibility ||
    !isScrollVisible
  ) {
    return null;
  }

  return (
    <InView threshold={1} onChange={handleInViewChange}>
      <StickyTopBannerContents
        titleTexts={promoteData.textSet.title}
        openButtonTexts={promoteData.textSet.openAppBtn}
        closeButtonTexts={promoteData.textSet.closeBtn}
        appIcon={promoteData.appIcon?.mobile}
        backgroundColor={promoteData.backgroundColor}
        onClickDismiss={handleCloseTemporarily}
        onClickOpenApp={handleClickOpenApp}
      />
    </InView>
  );
};

export default React.memo(StickyTopBanner);
