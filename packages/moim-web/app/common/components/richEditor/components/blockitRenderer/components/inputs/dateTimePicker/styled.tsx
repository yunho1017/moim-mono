import styled, { FlattenInterpolation } from "styled-components";
import { H6 as H6Base } from "../../texts";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../../helper/blockitStyleHelpers";

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  padding: ${px2rem(8)} 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: 0;
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const H6 = styled(H6Base)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const InputContainer = styled.div`
  width: 100%;
  padding: ${px2rem(4)} ${px2rem(16)};
`;
