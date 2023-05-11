import * as React from "react";
import { FormattedMessage } from "react-intl";
import MenuList from "./components/menuList";
import {
  TitleSection,
  Title,
  RightArrow,
  IconWrapper,
  MyCartIcon,
  MyOrdersIcon,
  StyledCartAlertBadge,
  StyledCouponAlertBadge,
  CouponIcon,
  WishlistIcon,
} from "./styled";

import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentUser from "common/hooks/useCurrentUser";
import useGroupTexts from "common/hooks/useGroupTexts";
import useVisibleMyCart from "app/modules/layout/components/topNavigation/hooks/useVisibleMyCart";
import { useActions, useStoreState } from "app/store";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import { IMenu } from "./type";
import { ActionCreators } from "app/actions/secondaryView";
import useEnableCoupon from "app/modules/layout/components/topNavigation/hooks/useEnableCoupon";

export function useVisibleMyShoppingSection() {
  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser();
  const { targetUserId } = useStoreState(state => ({
    targetUserId: state.profileData.targetUserId,
  }));

  return React.useMemo(
    () =>
      currentGroup?.seller_id && currentUser && currentUser.id === targetUserId,
    [currentUser?.id, currentGroup?.id, targetUserId],
  );
}

export default function MyShoppingSection() {
  const { redirect } = useNativeSecondaryView();
  const visibleMyCart = useVisibleMyCart();
  const enableCoupon = useEnableCoupon();
  const myShoppingTitleText = useGroupTexts("my_shopping_menu_title");
  const myShoppingOrdersText = useGroupTexts("my_shopping_orders_menu_title");
  const myShoppingWishlistText = useGroupTexts(
    "my_shopping_wishlist_menu_title",
  );
  const { openFromProfile } = useActions({
    openFromProfile: ActionCreators.openNativeSecondaryViewFromProfile,
  });

  const handleRedirectMyShopping = React.useCallback(() => {
    openFromProfile(false);
    redirect(
      new MoimURL.CommerceMyShopping({
        tab: "payments",
      }).toString(),
    );
  }, [redirect]);

  const handleRedirectMyCart = React.useCallback(() => {
    openFromProfile(false);
    redirect(new MoimURL.CommerceMyCarts().toString());
  }, [redirect]);

  const handleRedirectCoupon = React.useCallback(() => {
    openFromProfile(false);
    redirect(new MoimURL.CommerceMyBenefitCoupons().toString());
  }, [redirect]);

  const handleRedirectWishlist = React.useCallback(() => {
    openFromProfile(false);
    redirect(new MoimURL.CommerceMyWishlist().toString());
  }, [redirect]);

  const menus = React.useMemo(() => {
    const elements: IMenu[] = [
      {
        key: "my-orders",
        label: myShoppingOrdersText?.singular,
        icon: (
          <IconWrapper>
            <MyOrdersIcon />
          </IconWrapper>
        ),
        handler: handleRedirectMyShopping,
      },
    ];

    if (visibleMyCart) {
      elements.push({
        key: "my-cart",
        label: <FormattedMessage id="profile_show_my_shopping_cart" />,
        icon: (
          <IconWrapper>
            <MyCartIcon />
            <StyledCartAlertBadge />
          </IconWrapper>
        ),
        handler: handleRedirectMyCart,
      });
    }
    if (enableCoupon) {
      elements.push({
        key: "coupon",
        label: <FormattedMessage id="profile_show_my_shopping_coupon" />,
        icon: (
          <IconWrapper>
            <CouponIcon />
            <StyledCouponAlertBadge />
          </IconWrapper>
        ),
        handler: handleRedirectCoupon,
      });
    }

    elements.push({
      key: "wishlist",
      label: myShoppingWishlistText?.singular,
      icon: (
        <IconWrapper>
          <WishlistIcon />
        </IconWrapper>
      ),
      handler: handleRedirectWishlist,
    });

    return elements;
  }, [
    visibleMyCart,
    myShoppingOrdersText,
    myShoppingWishlistText,
    enableCoupon,
    handleRedirectMyCart,
    handleRedirectMyShopping,
    handleRedirectWishlist,
  ]);

  return (
    <>
      <TitleSection onClick={handleRedirectMyShopping}>
        <Title>{myShoppingTitleText?.singular}</Title>
        <RightArrow />
      </TitleSection>
      {(visibleMyCart || enableCoupon) && <MenuList menus={menus} />}
    </>
  );
}
