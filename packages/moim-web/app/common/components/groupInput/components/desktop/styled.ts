import styled, { css } from "styled-components";
// helper
import { px2rem } from "common/helpers/rem";
import { TOOLBAR_HEIGHT } from "../../styledComponent";

export const Wrapper = styled.div<{ isExpand: boolean }>`
  display: flex;
  flex-direction: row;
  min-height: ${px2rem(42)};
  border-radius: ${px2rem(4)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey300};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  ${props =>
    props.isExpand &&
    css`
      display: block;
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
    margin-left: ${px2rem(6)};
  }

  &:hover {
    border-radius: ${px2rem(2)};
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;

export const ToolbarContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const ToolbarWrapper = styled.div<{ showTextStyle: boolean }>`
  width: 100%;
  height: ${px2rem(TOOLBAR_HEIGHT)};
  display: flex;
  padding: 0 ${px2rem(5)} 0 ${px2rem(16)};

  ${props =>
    props.showTextStyle
      ? css`
          padding: 0 ${px2rem(5)} 0 ${px2rem(8)};

          justify-content: space-between;
        `
      : css`
          padding: 0 ${px2rem(5)} 0 0;

          ${ToolbarLeft} {
            display: none;
          }
          justify-content: flex-end;
        `}
`;

export const ToolbarLeft = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const ToolbarRight = styled.div`
  display: inline-flex;
  align-items: center;
`;
