import styled from "styled-components";
import BackIconBase from "@icon/24-back-b.svg";
import {
  useScrollStyle,
  useSingleLineStyle,
} from "common/components/designSystem/styles";
import {
  B3Regular,
  B4Regular,
  H8Bold,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DialogTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const BackButton = styled(BackIconBase).attrs(props => ({
  size: "s",
  touch: 44,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const TotalDiscountPriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px2rem(4)};

  padding: ${px2rem(12)} ${px2rem(16)};
`;

export const TotalDiscountPriceTitle = styled(H8Bold)`
  flex: 1;
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};

  ${useSingleLineStyle}
`;

export const UserCouponCountRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px2rem(4)};

  padding: ${px2rem(6)} ${px2rem(16)};
`;

export const UserCouponCountTitle = styled(B3Regular)`
  flex: 1;
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};

  ${useSingleLineStyle}
`;

export const CouponUnusedButton = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;
export const CouponDiscountAmount = styled(H8Bold)`
  color: ${props => props.theme.color.red700};
`;

export const ListWrapper = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  padding: 0 ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  ${useScrollStyle};
`;
