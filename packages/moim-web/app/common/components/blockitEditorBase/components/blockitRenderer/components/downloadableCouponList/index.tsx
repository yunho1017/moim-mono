import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useActions, useStoreState } from "app/store";
import {
  downloadCoupon as downloadCouponAction,
  bufferedBatchCoupon,
} from "app/actions/commerce";
import { withPlacement } from "common/components/richEditor/components/blockitRenderer/hoc/withPlacement";
import InViewTrigger from "common/components/richEditor/components/blockitRenderer/components/inViewTrigger";
import CouponItem from "./couponItem";
import { Wrapper, InnerContainer, Inner } from "./styled";

interface IProps
  extends Omit<Moim.Blockit.Commerce.IDownloadableCouponList, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const DownloadableCouponList: React.FC<IProps> = ({ resources }) => {
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const { batchCoupon, downloadCoupon } = useActions({
    batchCoupon: bufferedBatchCoupon,
    downloadCoupon: downloadCouponAction,
  });
  const coupons = useStoreState(state =>
    resources.map(id => state.entities.commerce_coupons[id]),
  );

  const handleOnView = React.useCallback(() => {
    if (isLoading === undefined) {
      setLoadStatus(true);
      batchCoupon(resources).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [batchCoupon, isLoading, resources]);

  const handleClickDownload = React.useCallback(
    async (id: Moim.Id) => downloadCoupon(id, true),
    [downloadCoupon],
  );

  const couponElements = React.useMemo(
    () =>
      coupons.map((coupon, index) => (
        <CouponItem
          key={`downloadable-coupon-block-${coupon?.id ?? `skeleton-${index}`}`}
          isLoading={Boolean(isLoading)}
          coupon={coupon}
          onClickDownload={handleClickDownload}
        />
      )),
    [coupons, handleClickDownload, isLoading],
  );

  return (
    <Wrapper>
      <InnerContainer>
        <InViewTrigger onVisible={handleOnView} />
        <Inner>{couponElements}</Inner>
      </InnerContainer>
    </Wrapper>
  );
};

export default withPlacement(React.memo(DownloadableCouponList));
