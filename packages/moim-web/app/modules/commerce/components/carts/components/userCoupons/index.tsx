import React from "react";
import { FormattedMessage } from "react-intl";
import CurrencyFormatter from "common/components/currencyFormatter";
import CouponListDialog from "./components/couponListDialog";
import {
  Wrapper,
  TitleWrapper,
  Title,
  DiscountAmount,
  UserCouponCount,
  RightArrowIcon,
} from "./styled";

import useOpenState from "common/hooks/useOpenState";
interface IProps {
  couponDiscount: number | undefined;
  userCoupons: Moim.Commerce.IUserCoupon[] | undefined;
  currency: string;
}

const UserCoupons: React.FC<IProps> = React.memo(
  ({ currency, userCoupons, couponDiscount }) => {
    const { close, open, isOpen } = useOpenState();
    return (
      <>
        <Wrapper role="button" onClick={userCoupons?.length ? open : undefined}>
          <TitleWrapper>
            <Title>
              <FormattedMessage id="cart_coupon_title" />
              {userCoupons?.length ? `(${userCoupons?.length})` : undefined}
            </Title>
            {couponDiscount ? (
              <DiscountAmount>
                -
                <CurrencyFormatter value={couponDiscount} currency={currency} />
              </DiscountAmount>
            ) : (
              <UserCouponCount>
                {userCoupons?.length && userCoupons.length > 0 ? (
                  <FormattedMessage id="cart_coupon_not_used" />
                ) : (
                  <FormattedMessage id="cart_coupon_empty" />
                )}
              </UserCouponCount>
            )}
          </TitleWrapper>
          {userCoupons?.length ? <RightArrowIcon /> : null}
        </Wrapper>

        <CouponListDialog
          isOpen={isOpen}
          currency={currency}
          couponDiscount={couponDiscount}
          userCoupons={userCoupons}
          onClose={close}
        />
      </>
    );
  },
);

export default React.memo(UserCoupons);
