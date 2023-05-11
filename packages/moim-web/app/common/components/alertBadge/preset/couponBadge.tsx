// vendor
import * as React from "react";
import { useStoreState, useActions } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { fetchMyCoupons } from "app/actions/commerce";
// component
import { CommonBadge } from "..";

interface IProps {
  className?: string;
}

function CouponAlertBadge({ className }: IProps) {
  const currentGroup = useCurrentGroup();
  const count = useStoreState(
    state => state.commercePage.myCoupons.active?.data.length,
  );

  const { dispatchFetchMyCoupons } = useActions({
    dispatchFetchMyCoupons: fetchMyCoupons,
  });

  const cartBadgeElement = React.useMemo(() => {
    if (!count) {
      return null;
    }

    if (count > 99) {
      return <CommonBadge className={className}>50+</CommonBadge>;
    }

    return <CommonBadge className={className}>{count}</CommonBadge>;
  }, [count, className]);

  React.useEffect(() => {
    if (currentGroup?.seller_id && count === undefined) {
      dispatchFetchMyCoupons(currentGroup.seller_id, "active");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroup?.seller_id]);

  return <>{cartBadgeElement}</>;
}

export default CouponAlertBadge;
