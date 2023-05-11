import styled, { css } from "styled-components";
import { H10BoldStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;

export const TextWrapper = styled.div<{ isSingleLine: boolean }>`
  width: 100%;
  text-align: center;
  padding: ${props => (props.isSingleLine ? px2rem(4) : px2rem(8))}};
  ${H10BoldStyle};
  ${props =>
    props.isSingleLine &&
    css`
      height: ${px2rem(27)};

      > span {
        display: inline-block;
        width: 100%;
        ${useSingleLineStyle}
      }
    `};
`;

export const ImageWrapper = styled.div<{ containerWidth?: number }>`
  padding: ${px2rem(4)} ${px2rem(16)} 0;
  ${props => {
    if (props.containerWidth) {
      const w = props.containerWidth - 32;
      return css`
        > img {
          width: ${px2rem(w)};
          height: ${px2rem(w)};
        }
      `;
    }
  }}
`;

export const ItemContainer = styled.div<{
  withImage: boolean;
  adjustHeight?: number;
  selected?: boolean;
  itemStyle?: Moim.Blockit.IBlockitStyle;
}>`
  position: relative;
  width: 100%;
  height: ${({ adjustHeight }) =>
    adjustHeight ? px2rem(adjustHeight) : "100%"};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: border 200ms ease-in-out;
    ${props =>
      !props.withImage &&
      css`
        border: ${px2rem(props.itemStyle?.border?.width || 1)} solid
          ${props.theme.getColorByAlias(
            props.itemStyle?.border?.color,
            props.theme.colorV2.colorSet.grey50,
          )};
        border-radius: ${px2rem(props.itemStyle?.border?.radius || 0)};
      `};
    ${props =>
      props.selected &&
      css`
        border: ${px2rem(2)} solid ${props.theme.colorV2.accent};
      `};
  }

  &:hover {
    &::after {
      border: 1px solid ${props => props.theme.colorV2.colorSet.grey300};
    }
  }
`;
