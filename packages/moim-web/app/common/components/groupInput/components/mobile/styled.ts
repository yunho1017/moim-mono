import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { TOOLBAR_HEIGHT } from "../../styledComponent";
import DownCircleIconBase from "@icon/24-downcircle-g.svg";

export const DownCircleIcon = styled(DownCircleIconBase).attrs({
  size: "s",
  touch: 30,
})``;

export const Wrapper = styled.div<{ isExpand: boolean }>`
  display: flex;
  flex-direction: row;

  min-height: ${px2rem(40)};
  border-radius: ${px2rem(4)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey300};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  ${props =>
    props.isExpand &&
    css`
      flex-direction: column;
      ${ToolbarContainer} {
        width: 100%;
      }

      ${InputWrapper} {
        width: 100%;
      }
    `}
`;

export const InputWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

export const IconButton = styled.button.attrs({ tabIndex: -1 })<{
  disabled?: boolean;
}>`
  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
    `}
  & + & {
    margin-left: ${px2rem(8)};
  }
`;

export const ToolbarLeft = styled.div<{ showTextStyleTool?: boolean }>`
  flex: 1;
  min-width: 0;
  display: inline-flex;
  align-items: center;
  transition: opacity 500ms ease-in;
  ${props =>
    props.showTextStyleTool &&
    css`
      opacity: 0;
    `}
`;

export const ToolbarRight = styled.div<{ showTextStyleTool?: boolean }>`
  display: inline-flex;
  align-items: center;
  transition: opacity 500ms ease-in;
  ${props =>
    props.showTextStyleTool &&
    css`
      opacity: 0;
    `}
`;

export const ToolbarContainer = styled.div<{ isExpand: boolean }>`
  height: ${px2rem(TOOLBAR_HEIGHT)};
  display: flex;
  padding: 0 ${px2rem(5)} 0 ${px2rem(8)};
  justify-content: flex-end;
  align-items: center;
  position: relative;
  overflow: hidden;

  ${ToolbarLeft} {
    ${props =>
      !props.isExpand &&
      css`
        display: none;
      `}
  }
  ${ToolbarRight} {
    ${props =>
      !props.isExpand &&
      css`
        display: none;
      `}
  }
`;

export const TextStyleTools = styled.div<{ show: boolean }>`
  padding: 0 ${px2rem(8)};
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border-bottom-left-radius: ${px2rem(4)};
  border-bottom-right-radius: ${px2rem(4)};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: ${props => props.theme.zIndexes.default};
  animation-duration: 500ms;
  visibility: visible;
  transition: visibility 500ms;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
    z-index: ${props => props.theme.zIndexes.below};
  }

  ${props =>
    !props.show &&
    css`
      visibility: hidden;
    `}
`;
