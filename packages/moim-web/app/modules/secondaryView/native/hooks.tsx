import * as React from "react";
import { MatchRouting } from "app/enums";
import { MoimURL } from "common/helpers/url";
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

export function useEffects(hookProps: ReturnType<typeof useProps>) {
  const {
    close,
    isMobile,
    location,
    browserHistoryMatchRouter,
    prevBrowserHistoryMatchRouter,
  } = hookProps;

  const preventAutoCloseRoute = React.useMemo(
    () =>
      location &&
      (MoimURL.MoimMembers.isSameExact(location.pathname) ||
        MoimURL.Members.isSameExact(location.pathname) ||
        MoimURL.PositionMembers.isSameExact(location.pathname) ||
        MoimURL.CommerceMyCarts.isSameExact(location.pathname) ||
        MoimURL.CommercePaymentsShow.isSameExact(location.pathname) ||
        MoimURL.CommercePaymentsList.isSameExact(location.pathname) ||
        MoimURL.CommerceMyBenefitCoupons.isSameExact(location.pathname) ||
        MoimURL.CommerceMyBenefitCouponsFocus.isSameExact(location.pathname) ||
        MoimURL.CommerceMyBenefit.isSameExact(location.pathname) ||
        MoimURL.CommerceMyShopping.isSameExact(location.pathname) ||
        MoimURL.MyQuestList.isSameExact(location.pathname) ||
        MoimURL.ForumMembers.isSameExact(location.pathname) ||
        (!isMobile && MoimURL.UserBookmark.isSameExact(location.pathname))),
    [location, isMobile],
  );

  React.useLayoutEffect(() => {
    if (preventAutoCloseRoute || isMobile) return;

    if (
      prevBrowserHistoryMatchRouter &&
      browserHistoryMatchRouter.type !== prevBrowserHistoryMatchRouter?.type
    ) {
      close();
    }
    const isForumShow =
      MatchRouting.FORUM_SHOW === browserHistoryMatchRouter.type;
    const isChangeForum =
      browserHistoryMatchRouter.value?.forumId !==
      prevBrowserHistoryMatchRouter?.value?.forumId;
    if (isForumShow && isChangeForum) {
      close();
    }
  }, [
    close,
    preventAutoCloseRoute,
    browserHistoryMatchRouter,
    prevBrowserHistoryMatchRouter,
    isMobile,
  ]);
}
