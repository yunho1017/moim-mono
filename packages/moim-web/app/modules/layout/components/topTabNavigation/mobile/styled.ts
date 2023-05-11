import styled from "styled-components";

import { px2rem } from "common/helpers/rem";
import { TOP_SUB_NAVIGATION_HEIGHT } from "../constant";
import { noScrollBarStyle } from "common/components/designSystem/styles";
import { SkeletonBox } from "common/components/skeleton";

export const TabWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${px2rem(TOP_SUB_NAVIGATION_HEIGHT)};
  padding: ${px2rem(0)} ${px2rem(4)};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  white-space: nowrap;
  overflow-x: auto;
  text-align: center;
  ${noScrollBarStyle}
`;

export const MainTabWrapper = styled(TabWrapper)`
  background-color: ${props =>
    props.theme.getTopAreaElementPalette("background").color};
  box-shadow: ${props => props.theme.shadow.whiteElevated2};
`;

export const SubTabWrapper = styled(TabWrapper)<{ isScrollVisible: boolean }>`
  height: ${props =>
    props.isScrollVisible ? px2rem(TOP_SUB_NAVIGATION_HEIGHT) : 0};
  transition: height 0.2s linear;
  box-shadow: inset 0 ${px2rem(6)} ${px2rem(6)} -1px rgba(10, 6, 0, 0.06);
`;

export const ItemSkeleton = styled(SkeletonBox)`
  margin: 0 ${px2rem(5)};
`;
