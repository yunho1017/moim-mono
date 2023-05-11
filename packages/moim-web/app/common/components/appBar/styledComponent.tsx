import styled, { css, FlattenInterpolation } from "styled-components";
import { HEAD_TITLE_ALIGNMENT } from "./useHooks";
import { px2rem } from "common/helpers/rem";
import { H8Bold, B4Regular } from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { MENU_WIDTH, GNB_HEIGHT } from "./constants";
import { BG_LEVEL_BACKGROUND_CLASS_NAME } from "../designSystem/BGLevel";
export interface IScrollParallaxContainer {
  opacity?: number;
}
export const ScrollParallaxWrapper = styled.div<IScrollParallaxContainer>`
  width: 100%;
  padding: ${px2rem(16)} ${px2rem(16)} ${px2rem(38)};
  opacity: ${props => props.opacity};
`;

export const AppBarWrapper = styled.div<{
  fixedWidth?: number;
  wrapperStyle?: FlattenInterpolation<any>;
}>`
  display: flex;
  align-items: center;
  width: ${props => (props.fixedWidth ? px2rem(props.fixedWidth) : "100%")};
  height: ${px2rem(GNB_HEIGHT)};
  ${props => props.wrapperStyle};
`;

export const stickyWrapperStyle = css<{
  overrideStickyStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;
  height: ${px2rem(GNB_HEIGHT)};
  z-index: ${props => props.theme.zIndexes.gnbSticky};
  ${props => props.overrideStickyStyle};
`;
export const StickyWrapper = styled.div.attrs({
  className: BG_LEVEL_BACKGROUND_CLASS_NAME,
})<{
  overrideStickyStyle?: FlattenInterpolation<any>;
}>`
  ${stickyWrapperStyle}
`;

export const Wrapper = styled.div<{
  isSticky?: boolean;
  isParallaxVisible?: boolean;
  wrapperStickedStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;

  ${props =>
    props.isSticky
      ? css`
          margin-top: ${px2rem(MENU_WIDTH)};

          ${StickyWrapper} {
            position: fixed;
            top: 0;
            z-index: ${props.theme.zIndexes.gnbSticky};
            will-change: scroll-position;
            ${props.isParallaxVisible ? null : props.wrapperStickedStyle};
          }
        `
      : null};
`;

export const LeftWrapper = styled.div<{ sideElementWidth?: number }>`
  display: flex;
  align-items: center;
  height: 100%;
  width: ${props =>
    props.sideElementWidth
      ? `${px2rem(props.sideElementWidth)}`
      : "fit-content"};
  min-width: ${px2rem(16)};
`;

export const CenterWrapper = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
`;

export const RightWrapper = styled.div<{ sideElementWidth?: number }>`
  display: flex;
  align-items: center;
  height: 100%;
  width: ${props =>
    props.sideElementWidth
      ? `${px2rem(props.sideElementWidth)}`
      : "fit-content"};
`;

export const TitleContainer = styled.div<{
  alignment?: HEAD_TITLE_ALIGNMENT;
  opacity?: number;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.alignment === "Center" ? "center" : "flex-start"};
  text-align: ${props => (props.alignment === "Center" ? "center" : "start")};
  opacity: ${props => props.opacity};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  transition: opacity 200ms ease-in-out;
`;

const SingleLine = css`
  width: 100%;
  ${useSingleLineStyle};
  white-space: pre;
`;

export const MainTitle = styled(H8Bold)`
  ${SingleLine};
`;
export const SubTitle = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${SingleLine};
`;
