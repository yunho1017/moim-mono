import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouteMatch } from "react-router";
// components
import ChipSwitch, { IMenu } from "common/components/chipSwitch";
import CommerceCoupon from "common/components/commerce/coupon";
import CommerceCouponSkeleton from "common/components/commerce/coupon/skeleton";
import InfiniteScroller from "common/components/infiniteScroller/new";
import { DefaultLoader } from "common/components/loading";
import BoxInput from "common/components/designSystem/boxInput/preset/singleline";
import {
  Wrapper,
  HeadContainer,
  EmptyWrapper,
  RedeemInputContainer,
  InputWrapper,
  RegisterButton,
  ListContainer,
  BottomContainer,
  BottomTitle,
  BottomDescription,
  CouponWrapper,
} from "./styled";

interface IProps {
  isLoading: boolean;
  currency: string;
  availableCoupons: Moim.IPaginatedListResponse<
    Moim.Commerce.IAvailableStatusCoupon
  > | null;
  endedCoupons: Moim.IPaginatedListResponse<
    Moim.Commerce.IAvailableStatusCoupon
  > | null;
  onLoadMoreActiveCoupons(): void;
  onLoadMoreDeActiveCoupons(): void;
}
const CouponsComponent: React.FC<IProps> = ({
  isLoading,
  currency,
  availableCoupons,
  endedCoupons,
  onLoadMoreActiveCoupons,
  onLoadMoreDeActiveCoupons,
}) => {
  const { params } = useRouteMatch<Moim.IMatchParams>();

  const intl = useIntl();
  const [redeemCode, setRedeemCode] = React.useState("");
  const [currentStatus, setStatus] = React.useState<string>("active");
  const menus: IMenu[] = React.useMemo(
    () => [
      {
        key: "active",
        text: <FormattedMessage id="my_shopping_coupon_available_coupon" />,
        default: true,
      },
      {
        key: "deactive",
        text: <FormattedMessage id="my_shopping_coupon_unavailable_coupon" />,
      },
    ],
    [],
  );

  const activeCouponListElement = React.useMemo(() => {
    if (availableCoupons?.data.length === 0) {
      if (isLoading) {
        return (
          <EmptyWrapper>
            <DefaultLoader />
          </EmptyWrapper>
        );
      }
      return (
        <EmptyWrapper>
          <FormattedMessage id="my_shopping/benefit/coupons/empty_active_coupons" />
        </EmptyWrapper>
      );
    }

    return (
      <InfiniteScroller
        itemLength={availableCoupons?.data.length ?? 0}
        threshold={700}
        paging={availableCoupons?.paging}
        loader={<DefaultLoader />}
        loadMore={onLoadMoreActiveCoupons}
      >
        {availableCoupons?.data.map(coupon =>
          coupon ? (
            <CouponWrapper key={`active_${coupon.couponId}_${coupon.id}`}>
              <CommerceCoupon
                hasFocus={params.id ? params.id === coupon.id : undefined}
                coupon={coupon.coupon}
                status={coupon.status}
                enableAt={coupon.enableAt}
                expiredAt={coupon.expireAt}
                currency={currency}
                enableScrollIntoView={true}
              />
            </CouponWrapper>
          ) : (
            <CommerceCouponSkeleton />
          ),
        )}
      </InfiniteScroller>
    );
  }, [
    params.id,
    availableCoupons?.data,
    availableCoupons?.paging,
    currency,
    isLoading,
    onLoadMoreActiveCoupons,
  ]);

  const deactiveCouponListElement = React.useMemo(() => {
    if (endedCoupons?.data.length === 0) {
      if (isLoading) {
        return (
          <EmptyWrapper>
            <DefaultLoader />
          </EmptyWrapper>
        );
      }
      return (
        <EmptyWrapper>
          <FormattedMessage id="my_shopping/benefit/coupons/empty_deactive_coupons" />
        </EmptyWrapper>
      );
    }
    return (
      <InfiniteScroller
        itemLength={endedCoupons?.data.length ?? 0}
        threshold={700}
        paging={endedCoupons?.paging}
        loader={<DefaultLoader />}
        loadMore={onLoadMoreDeActiveCoupons}
      >
        {endedCoupons?.data.map(coupon =>
          coupon ? (
            <CouponWrapper key={`deactive_${coupon.couponId}_${coupon.id}`}>
              <CommerceCoupon
                coupon={coupon.coupon}
                status={coupon.status}
                enableAt={coupon.enableAt}
                expiredAt={coupon.expireAt}
                currency={currency}
              />
            </CouponWrapper>
          ) : (
            <CommerceCouponSkeleton />
          ),
        )}
      </InfiniteScroller>
    );
  }, [
    currency,
    endedCoupons?.data,
    endedCoupons?.paging,
    isLoading,
    onLoadMoreDeActiveCoupons,
  ]);

  const handleSubmitRedeem = React.useCallback(() => {
    alert(`아직 미구현 기능입니다.\n${redeemCode}`);
    setRedeemCode("");
  }, [redeemCode]);

  const redeemInputElement = React.useMemo(
    () =>
      false &&
      currentStatus === "active" && (
        <RedeemInputContainer>
          <InputWrapper>
            <BoxInput
              size="Large"
              value={redeemCode}
              placeholder={intl.formatMessage({
                id: "my_shopping_coupon_register_coupon_placeholder",
              })}
              onChange={setRedeemCode}
            />
          </InputWrapper>
          <RegisterButton onClick={handleSubmitRedeem}>
            <FormattedMessage id="button_register" />
          </RegisterButton>
        </RedeemInputContainer>
      ),
    [currentStatus, handleSubmitRedeem, intl, redeemCode],
  );

  return (
    <Wrapper>
      <HeadContainer>
        <ChipSwitch menus={menus} onClickChip={setStatus} />
      </HeadContainer>
      {redeemInputElement}
      <ListContainer>
        {currentStatus === "active"
          ? activeCouponListElement
          : deactiveCouponListElement}
      </ListContainer>
      <BottomContainer>
        <BottomTitle>
          <FormattedMessage id="my_shopping_coupon_guide_title" />
        </BottomTitle>
        <BottomDescription>
          <FormattedMessage id="my_shopping_coupon_guide_body" />
        </BottomDescription>
      </BottomContainer>
    </Wrapper>
  );
};

export default CouponsComponent;
