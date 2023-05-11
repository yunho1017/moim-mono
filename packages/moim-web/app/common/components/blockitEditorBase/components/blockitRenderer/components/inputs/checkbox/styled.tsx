import styled, { FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../../helper/blockitStyleHelpers";
import { B4RegularStyle } from "common/components/designSystem/typos";

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  display: inline-block;
  padding: ${px2rem(8)} ${px2rem(16)};
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-left: ${px2rem(8)};
  user-select: none;
  ${B4RegularStyle}
`;
