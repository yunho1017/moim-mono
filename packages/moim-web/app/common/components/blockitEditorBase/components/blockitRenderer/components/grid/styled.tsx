import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../helper/blockitStyleHelpers";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  gridWrapperStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
  backgroundColor?: string;
  borderColor?: string;
}>`
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
  ${props => props.gridWrapperStyle};

  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.theme.getColorByAlias(props.backgroundColor)};
    `};
  ${props =>
    props.borderColor &&
    css`
      border-radius: ${px2rem(2)};
      border: 1px solid ${props.theme.getColorByAlias(props.borderColor)};
    `};
`;

export const GridContainer = styled.div<{
  enableGrid: boolean;
  maxColumn: number;
}>`
  width: 100%;
  height: 100%;
  ${props =>
    props.enableGrid &&
    css`
      display: grid;
      grid-template-columns: repeat(${props.maxColumn}, 1fr);
      grid-column-gap: ${px2rem(8)};
      grid-row-gap: ${px2rem(16)};
    `};
`;

export const ChildrenStyle = css`
  background-color: transparent;
`;

export const ChildGridStyle = css<{
  backgroundColor?: string;
  borderColor?: string;
}>`
  ${props => {
    if (props.backgroundColor || props.borderColor) {
      return css`
        padding: ${px2rem(8)} 0;
        @media ${MEDIA_QUERY.ONLY_MOBILE} {
          margin: ${px2rem(8)} 0;
        }
      `;
    }
  }}
`;
