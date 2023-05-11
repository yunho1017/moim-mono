import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { TOP_NAVIGATION_HEIGHT } from "../constant";

export const Wrapper = styled.div<{ visibleTopSubNavigation: boolean }>`
  position: relative;
  background-color: ${props =>
    props.theme.getTopAreaElementPalette("background").color};
  width: 100%;
  ${props =>
    props.visibleTopSubNavigation
      ? css`
          border-bottom: ${px2rem(1)} solid
            ${props.theme.colorV2.colorSet.grey50};
        `
      : css`
          box-shadow: ${props.theme.shadow.whiteElevated2};
        `}
`;

export const InnerWrapper = styled.div`
  height: ${px2rem(TOP_NAVIGATION_HEIGHT)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const JoinedSubMoimOpenButton = styled.div`
  position: absolute;
  top: ${px2rem(23)};
  left: 0;
  z-index: ${props => props.theme.zIndexes.default};
`;
