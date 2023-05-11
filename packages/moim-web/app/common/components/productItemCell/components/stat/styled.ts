import styled from "styled-components";

import EngageLikeIconBase from "@icon/18-like-1.svg";
import EngageCommentIconBase from "@icon/18-message-1.svg";
import EngageWishIconBase from "@icon/18-wish-1.svg";
import EngageViewIconBase from "@icon/18-view-1.svg";

import { px2rem } from "common/helpers/rem";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { getFlexAlignStyle } from "../wrapper/styled";

export const EngageIcon = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EngageLabel = styled.span`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle};
`;

export const EngageLikeIcon = styled(EngageLikeIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey200,
}))``;
export const EngageWishIcon = styled(EngageWishIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey200,
}))``;
export const EngageCommentIcon = styled(EngageCommentIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey200,
}))``;
export const EngageViewIcon = styled(EngageViewIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey200,
}))``;

export const Engagement = styled.div<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(2)} 0;

  ${EngageLabel} + ${EngageIcon} {
    margin-left: ${px2rem(8)};
  }

  ${props =>
    props.horizontalAlign &&
    getFlexAlignStyle({
      direction: "row",
      horizontalAlign: props.horizontalAlign,
    })}
`;
