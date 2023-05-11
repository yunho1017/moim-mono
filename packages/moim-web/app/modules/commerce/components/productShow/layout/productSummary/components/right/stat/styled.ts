import styled from "styled-components";
import EngageLikeIconBase from "@icon/18-like-1.svg";
import EngageCommentIconBase from "@icon/18-message-1.svg";
import EngageViewIconBase from "@icon/18-view-1.svg";
import { px2rem } from "common/helpers/rem";

import { B4RegularStyle } from "common/components/designSystem/typos";
import ProductSummaryElementWrapper from "../../wrapper";

export const EngageLabel = styled.span`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle};
`;
export const EngageIcon = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const EngageLikeIcon = styled(EngageLikeIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const EngageCommentIcon = styled(EngageCommentIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
export const EngageViewIcon = styled(EngageViewIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const EngagementWrapper = styled(ProductSummaryElementWrapper)`
  display: flex;
  align-items: center;
  padding: ${px2rem(4)} ${px2rem(16)};
  ${EngageLabel} + ${EngageIcon} {
    margin-left: ${px2rem(8)};
  }
`;
