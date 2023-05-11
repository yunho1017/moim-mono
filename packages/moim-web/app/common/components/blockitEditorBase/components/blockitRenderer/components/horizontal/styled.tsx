import styled, { FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../helper/blockitStyleHelpers";

export const CommonWrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
  align?: Moim.Blockit.IBlockAlignment;
}>`
  width: 100%;
  padding: ${px2rem(4)} ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const Inner = styled.div`
  margin-top: ${px2rem(-2)};
  margin-bottom: ${px2rem(-2)};
  margin-left: ${px2rem(-4)};
`;

export const Item = styled.div`
  display: inline-flex;
  margin-left: ${px2rem(4)};

  margin-top: ${px2rem(2)};
  margin-bottom: ${px2rem(2)};
`;
