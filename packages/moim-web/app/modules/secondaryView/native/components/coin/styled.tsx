import styled, { css } from "styled-components";
import { rgba } from "polished";
import {
  H8Bold,
  H4Bold,
  B4Regular,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import ArrowIconBase from "@icon/18-rightarrow-g.svg";

export const getCoinTopWrapperStyle = (hexCode?: string) => css`
  background-color: ${hexCode ? rgba(hexCode, 0.1) : rgba(1, 5, 5, 0.02)};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled(H4Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const AppBarTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const MoimName = styled(B4Regular)`
  padding: 0 ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const ArrowIcon = styled(ArrowIconBase).attrs({
  size: "xs",
  touch: 18,
})``;
