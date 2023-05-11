import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  pB2RegularStyle,
  B4RegularStyle,
  H10BoldStyle,
  H4BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import InfoGreyIconBase from "@icon/24-info-g.svg";
import RightArrowIconBase from "@icon/18-rightarrow-g.svg";

import Divider from "common/components/divider";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: ${px2rem(160)} ${px2rem(24)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  text-align: center;
  ${pB2RegularStyle}
`;

export const TotalAmountDashBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  padding: ${px2rem(8)} 0;
`;

export const TotalAmountHead = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: ${px2rem(5)};
  padding: 0 ${px2rem(16)};
`;

export const HeadGuideContainer = styled.div`
  width: 100%;
  min-width: 0;
  flex: 1;
  display: inline-flex;

  span {
    color: ${props => props.theme.colorV2.colorSet.grey600};
    ${B4RegularStyle}
  }

  span + span {
    margin-left: ${px2rem(4)};
  }
`;

export const InfoIcon = styled(InfoGreyIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const TotalAmountBody = styled.div`
  color: ${props => props.theme.color.cobalt800};
  padding: 0 ${px2rem(16)};
  ${H4BoldStyle};
`;

export const RightArrowIcon = styled(RightArrowIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const ToBeExpiredCreditDivider = styled(Divider).attrs(props => ({
  color: props.theme.colorV2.colorSet.grey10,
  height: px2rem(1),
}))``;

export const ToBeExpiredCredit = styled(Link)`
  ${B4RegularStyle};
  padding: 0 ${px2rem(16)};
  display: flex;
  gap: ${px2rem(4)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  align-items: center;
  justify-content: space-between;
  .left {
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

export const YearMonthLabel = styled.div`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(6)} ${px2rem(16)};
  margin-top: ${px2rem(8)};
  ${H10BoldStyle}
  font-weight: ${props => props.theme.font.bold};
`;

export const ListContainer = styled.div``;

export const CreditContent = styled.div`
  width: 100%;
  height: 100%;
  white-space: pre-line;
`;
