import { px2rem } from "common/helpers/rem";
import styled, { css, FlattenInterpolation } from "styled-components";
import { marginToPadding } from "../../helper/blockitStyleHelpers";
import { H6 as H6Base } from "../../texts";

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  padding: ${px2rem(8)} 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const InputContainer = styled.div`
  width: 100%;
  padding: ${px2rem(4)} ${px2rem(16)};
`;

export const H6 = styled(H6Base)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const NoSidePaddingStyle = css`
  padding-left: 0;
  padding-right: 0;
`;
