import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { H8Bold, B4Regular } from "common/components/designSystem/typos";

import InfoIconBase from "@icon/24-info-b.svg";
import MenuIconBase from "@icon/24-menu-b.svg";
import MoreIconBase from "@icon/24-more-b.svg";

export const AppBarTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
export const ChannelName = styled(H8Bold)`
  margin-left: ${px2rem(4)};
`;

export const ChannelDescription = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-left: ${px2rem(8)};
`;

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoIcon = styled(InfoIconBase).attrs(props => ({
  size: "s",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const MoreIconWrapper = styled.div``;
export const MoreIcon = styled(MoreIconBase).attrs(props => ({
  size: "s",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const MenuIcon = styled(MenuIconBase).attrs(props => ({
  size: "s",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const AppBarStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border-bottom: ${props =>
    `${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50}`};
`;

export const FixedContainer = styled.header<{ top: number }>`
  z-index: 1;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    top: ${props => props.top}px;
    left: 0;
    right: 0;
    z-index: ${props => props.theme.zIndexes.gnbSticky + 1};
  }
`;

export const DMTitleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};

  & > * + * {
    margin-left: ${px2rem(4)};
  }
`;
