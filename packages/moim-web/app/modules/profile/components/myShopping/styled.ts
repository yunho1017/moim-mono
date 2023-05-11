import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import RightIconBase from "@icon/18-rightarrow-g.svg";
import MyCartIconBase from "@icon/18-cart-2.svg";
import MyOrdersIconBase from "@icon/18-myshopping-2.svg";
import CouponIconBase from "@icon/18-coupon-2.svg";
import WishlistIconBase from "@icon/18-like-2.svg";
import { useOpacityHoverStyle } from "common/components/designSystem/styles";
import CouponAlertBadge from "common/components/alertBadge/preset/couponBadge";
import CartAlertBadge from "common/components/alertBadge/preset/cartBadge";

export const TitleSection = styled.div`
  width: 100%;
  padding: 0 ${px2rem(4)} 0 ${px2rem(16)};
  display: flex;
  align-items: center;
`;

export const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(11)} 0;
  margin-right: ${px2rem(3)};
  flex: 1;
  min-width: 0;
`;

export const StyledCartAlertBadge = styled(CartAlertBadge)`
  position: absolute;
  top: ${px2rem(-8)};
  left: ${px2rem(9)};
  box-shadow: 0 ${px2rem(2)} ${px2rem(4)} 0
    ${props => props.theme.colorV2.colorSet.grey200};
`;

export const StyledCouponAlertBadge = styled(CouponAlertBadge)`
  position: absolute;
  top: ${px2rem(-8)};
  left: ${px2rem(9)};
  box-shadow: 0 ${px2rem(2)} ${px2rem(4)} 0
    ${props => props.theme.colorV2.colorSet.grey200};
`;

export const IconWrapper = styled.div.attrs({ role: "button" })`
  display: inline-block;
  position: relative;
  & > span {
    ${useOpacityHoverStyle}
  }
`;

export const RightArrow = styled(RightIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const MyCartIcon = styled(MyCartIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const CouponIcon = styled(CouponIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const MyOrdersIcon = styled(MyOrdersIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const WishlistIcon = styled(WishlistIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
