import React from "react";
import styled from "styled-components";
import CommerceCoupon, {
  CouponComponentStatusType,
} from "common/components/commerce/coupon";
import { useIntlShort } from "common/hooks/useIntlShort";
import { px2rem } from "common/helpers/rem";

const CouponWrapper = styled.div`
  width: 100%;

  & + & {
    margin-top: ${px2rem(16)};
  }
`;

export const UserCoupon: React.FC<{
  currency: string;
  userCoupon: Moim.Commerce.IUserCoupon;
  onSelectCoupon(couponId: string | null): void;
}> = React.memo(({ userCoupon, currency, onSelectCoupon }) => {
  const intl = useIntlShort();
  const handleClick = React.useCallback(() => {
    if (!userCoupon.unableReason) {
      onSelectCoupon(!userCoupon.used ? userCoupon.id : null);
    }
  }, [onSelectCoupon, userCoupon.used, userCoupon.id, userCoupon.unableReason]);

  const errorReason = React.useMemo(() => {
    switch (userCoupon.unableReason) {
      case "CART_COUPON_UNABLE_PERIOD":
        return intl("cart_coupon_unable_period");
      case "CART_COUPON_UNABLE_PRICE":
        return intl("cart_coupon_unable_price");
      case "UNABLE_AMOUNT_COUPON_WITH_THIS_CURRENCY":
        return intl("cart_coupon_unable_currency");
      case "CART_COUPON_UNABLE_PRODUCT":
      default:
        if (userCoupon.unableReason) {
          return intl("cart_coupon_unable_product");
        }
    }
  }, [userCoupon.unableReason]);

  const status = React.useMemo((): CouponComponentStatusType => {
    switch (userCoupon.unableReason) {
      case "CART_COUPON_UNABLE_PERIOD":
        if (
          userCoupon.coupon.startAt &&
          new Date().getTime() < userCoupon.coupon.startAt
        ) {
          return "scheduled";
        }

        return "expired";
      case "CART_COUPON_UNABLE_PRICE":
      case "CART_COUPON_UNABLE_PRODUCT":
      case "UNABLE_AMOUNT_COUPON_WITH_THIS_CURRENCY":
      default:
        if (userCoupon.unableReason) {
          return "disable";
        }
        return "active";
    }
  }, [userCoupon.unableReason, userCoupon.coupon.startAt]);

  return (
    <CouponWrapper>
      <CommerceCoupon
        disableScroll={true}
        checked={userCoupon.used}
        coupon={userCoupon.coupon}
        status={status}
        enableAt={userCoupon.coupon.startAt}
        expiredAt={userCoupon.coupon.endAt}
        errorReason={errorReason}
        currency={currency}
        onClick={handleClick}
      />
    </CouponWrapper>
  );
});
