import * as React from "react";
import { useActions, useStoreState } from "app/store";
import { fetchMyCoupons } from "app/actions/commerce";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { getSellerSelector } from "app/selectors/commerce";
import { PermissionDeniedFallbackType } from "app/enums";
// components
import UnsignedChecker from "common/components/unsiginedChecker";
import CouponsComponent from "../../../../../components/benefits/coupons";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

const CouponsContainer: React.FC<IProps> = ({}) => {
  const currentGroup = useCurrentGroup();
  const [initialLoaded, setInitialLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { availableCoupons, endedCoupons, currency } = useStoreState(state => {
    const coupons = state.commercePage.myCoupons;
    return {
      currency: currentGroup?.seller_id
        ? getSellerSelector(state, currentGroup.seller_id)?.currency ?? "KRW"
        : "KRW",
      availableCoupons: coupons.active,
      endedCoupons: coupons.deactive,
    };
  });
  const { dispatchFetchMyCoupons } = useActions({
    dispatchFetchMyCoupons: fetchMyCoupons,
  });

  const handleLoadMoreActive = React.useCallback(() => {
    if (
      !isLoading &&
      currentGroup?.seller_id &&
      availableCoupons?.paging.after
    ) {
      setIsLoading(true);
      dispatchFetchMyCoupons(
        currentGroup.seller_id,
        "active",
        availableCoupons.paging.after,
      ).finally(() => {
        setIsLoading(false);
      });
    }
  }, [
    availableCoupons?.paging.after,
    currentGroup,
    dispatchFetchMyCoupons,
    isLoading,
  ]);

  const handleLoadMoreDeActive = React.useCallback(() => {
    if (!isLoading && currentGroup?.seller_id && endedCoupons?.paging.after) {
      setIsLoading(true);
      dispatchFetchMyCoupons(
        currentGroup.seller_id,
        "deactive",
        endedCoupons?.paging.after,
      ).finally(() => {
        setIsLoading(false);
      });
    }
  }, [
    currentGroup,
    dispatchFetchMyCoupons,
    isLoading,
    endedCoupons?.paging.after,
  ]);

  React.useEffect(() => {
    if (!isLoading && !initialLoaded && currentGroup?.seller_id) {
      setIsLoading(true);
      setInitialLoaded(true);
      Promise.all([
        dispatchFetchMyCoupons(currentGroup.seller_id, "active"),
        dispatchFetchMyCoupons(currentGroup.seller_id, "deactive"),
      ]).finally(() => {
        setIsLoading(false);
      });
    }
  }, [currentGroup, dispatchFetchMyCoupons, initialLoaded, isLoading]);

  return (
    <CouponsComponent
      isLoading={isLoading}
      currency={currency}
      availableCoupons={availableCoupons}
      endedCoupons={endedCoupons}
      onLoadMoreActiveCoupons={handleLoadMoreActive}
      onLoadMoreDeActiveCoupons={handleLoadMoreDeActive}
    />
  );
};

export default React.memo(props => (
  <UnsignedChecker fallbackType={PermissionDeniedFallbackType.SCREEN}>
    <CouponsContainer {...props} />
  </UnsignedChecker>
));
