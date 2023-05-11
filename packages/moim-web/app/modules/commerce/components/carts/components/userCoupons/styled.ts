import styled from "styled-components";
import RightArrowIconBase from "@icon/18-rightarrow-g.svg";
import { px2rem } from "common/helpers/rem";
import { B4Regular, H9Bold } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 ${px2rem(22)} 0 ${px2rem(16)};
`;

export const TitleWrapper = styled.div`
  padding: ${px2rem(12)} 0;
  flex: 1;
  min-width: 0;

  display: flex;
  align-items: center;
  gap: ${px2rem(8)};
`;

export const Title = styled(H9Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  flex: 1;
  min-width: 0;
`;

export const DiscountAmount = styled(H9Bold)`
  color: ${props => props.theme.color.red700};
  flex: 1;
  min-width: 0;
  text-align: right;
`;

export const UserCouponCount = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const RightArrowIcon = styled(RightArrowIconBase).attrs(props => ({
  size: "xs",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey100,
}))``;
