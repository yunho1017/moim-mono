import React from "react";
import NativeSecondaryViewDialog from "app/modules/secondaryView/native/components/dialog";
import CurrencyFormatter from "common/components/currencyFormatter";
import AppBar from "common/components/appBar";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import { CouponListEmpty } from "./empty";
import { UserCoupon } from "./item";
import {
  BackButton,
  CouponDiscountAmount,
  CouponUnusedButton,
  DialogTitle,
  TotalDiscountPriceRow,
  UserCouponCountRow,
  ListWrapper,
  Wrapper,
  TotalDiscountPriceTitle,
  UserCouponCountTitle,
} from "./styled";
import { useIntlShort } from "common/hooks/useIntlShort";
import { CartHandlerContext } from "../../../../context";
import FreezeView from "common/components/freezeView";

interface IProps {
  isOpen: boolean;
  couponDiscount?: number;
  userCoupons?: Moim.Commerce.IUserCoupon[];
  currency: string;
  onClose(): void;
}

const CouponListDialog: React.FC<IProps> = React.memo(
  ({ isOpen, couponDiscount, userCoupons, currency, onClose }) => {
    const intl = useIntlShort();
    const { calculateMyCart } = React.useContext(CartHandlerContext);
    const handleSelectCoupon = React.useCallback(
      (couponId: string | null) => {
        calculateMyCart({
          userCoupons: couponId ? [couponId] : [],
        });
      },
      [calculateMyCart],
    );

    const handleClickUnusedButton = React.useCallback(() => {
      handleSelectCoupon(null);
    }, [handleSelectCoupon]);

    const hasSelected = Boolean(userCoupons?.find(coupon => coupon.used));
    return (
      <NativeSecondaryViewDialog isOpen={isOpen}>
        <Wrapper>
          <AppBar
            leftButton={<BackButton onClick={onClose} />}
            titleElement={
              <DialogTitle>{intl("cart_coupon_list_title")}</DialogTitle>
            }
            titleAlignment="Left"
          />
          <TotalDiscountPriceRow>
            <TotalDiscountPriceTitle>
              {intl("cart_coupon_list_total_discount_title")}
            </TotalDiscountPriceTitle>
            <CouponDiscountAmount>
              <CurrencyFormatter value={couponDiscount} currency={currency} />
            </CouponDiscountAmount>
          </TotalDiscountPriceRow>
          <DefaultDivider />
          <UserCouponCountRow>
            <UserCouponCountTitle>
              {intl("cart_coupon_list_number_of_coupons", {
                n: userCoupons?.length ?? 0,
              })}
            </UserCouponCountTitle>
            {hasSelected && (
              <CouponUnusedButton
                onClick={handleClickUnusedButton}
                role="button"
              >
                {intl("cart_coupon_list_unselect")}
              </CouponUnusedButton>
            )}
          </UserCouponCountRow>
          <FreezeView isFreeze={false}>
            <ListWrapper>
              <Spacer value={12} />
              {userCoupons?.length ? (
                userCoupons?.map(userCoupon => (
                  <UserCoupon
                    key={userCoupon.id}
                    currency={currency}
                    userCoupon={userCoupon}
                    onSelectCoupon={handleSelectCoupon}
                  />
                ))
              ) : (
                <CouponListEmpty />
              )}
              <Spacer value={12} />
            </ListWrapper>
          </FreezeView>
        </Wrapper>
      </NativeSecondaryViewDialog>
    );
  },
);
export default React.memo(CouponListDialog);
