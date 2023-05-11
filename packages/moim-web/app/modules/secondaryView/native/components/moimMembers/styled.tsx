import styled from "styled-components";
import {
  B1Regular,
  H10Bold,
  H8Bold,
  H4Bold,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import ArrowIconBase from "@icon/18-rightarrow-g.svg";
import PositionIconBase from "@icon/24-addposition-b.svg";
import { useHoverStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled(H4Bold)`
  padding: ${px2rem(8)} ${px2rem(16)} ${px2rem(24)};
  border-bottom: ${props =>
    ` ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50}`};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const HeaderTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const HeaderSubTitle = styled(B1Regular)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Section = styled.div`
  border-bottom: ${props =>
    `${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50}`};
  padding-bottom: ${px2rem(16)};
`;

export const SectionHeader = styled.div`
  height: ${px2rem(42)};
  padding: ${px2rem(0)} ${px2rem(7)} ${px2rem(0)} ${px2rem(16)};
  display: flex;
  align-items: center;
`;

export const HeaderText = styled(H8Bold)`
  flex: 1;
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const PositionTitle = styled(H10Bold)<{ color: string }>`
  color: ${props => props.color};
`;

export const ArrowIcon = styled(ArrowIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const PositionItemWrapper = styled.div`
  padding-left: ${px2rem(16)};
  ${useHoverStyle};
`;

export const PositionIcon = styled(PositionIconBase).attrs(props => ({
  size: "s",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
