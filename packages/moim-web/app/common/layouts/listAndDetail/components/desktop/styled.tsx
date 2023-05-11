import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { bgLevel1Style } from "common/components/designSystem/BGLevel";

const DEFAULT_LEFT_WIDTH = 320;

export const Left = styled.div<{
  width?: number;
  disableRightBorder?: boolean;
}>`
  position: sticky;
  top: 0;
  width: ${props => px2rem(props.width || DEFAULT_LEFT_WIDTH)};

  border-right: ${px2rem(1)} solid
    ${props => props.theme.colorV2.colorSet.grey50};

  ${props => props.disableRightBorder && "border-right: none;"}
`;

export const Right = styled.div<{
  disableDetailWrapperBorder?: boolean;
}>`
  flex: 1;
  min-width: 0;
  max-width: ${px2rem(840)};
  padding: 0 ${px2rem(16)};

  & > div {
    width: 100%;
    max-width: ${px2rem(808)};
    min-width: ${px2rem(600)};
    min-height: ${px2rem(670)};
    margin-bottom: ${px2rem(44)};
    border-radius: ${px2rem(8)};
    ${props =>
      !props.disableDetailWrapperBorder &&
      css`
        ${bgLevel1Style}
      `};
  }
`;

export const Wrapper = styled.div<{ minHeight?: number }>`
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: space-between;

  ${Left} {
    ${props =>
      props.minHeight &&
      css`
        max-height: ${props.minHeight}px;
      `};
  }

  ${Right} {
    ${props =>
      props.minHeight &&
      css`
        min-height: ${props.minHeight}px;
      `};
  }
`;
