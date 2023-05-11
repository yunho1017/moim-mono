import styled, { FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1Regular } from "common/components/designSystem/typos";
import RightArrowIcon from "@icon/18-rightarrow-g.svg";
import UpArrowIcon from "@icon/18-uparrow-g.svg";
import DownArrowIcon from "@icon/18-downarrow-g.svg";
import {
  useHoverStyle,
  useSelectedStyle,
  IHoverSelectedProps,
} from "common/components/designSystem/styles";

export const Wrapper = styled.li<
  IHoverSelectedProps & {
    overrideStyled?: FlattenInterpolation<any>;
  }
>`
  display: flex;
  align-items: center;
  ${useHoverStyle};
  ${props => props.selected && useSelectedStyle};
  ${props => props.overrideStyled};
`;

export const Color = styled.div<{ color: string }>`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  border-radius: ${px2rem(2)};
  margin-right: ${px2rem(12)};
  background-color: ${props => props.color};
`;

export const Name = styled(B1Regular)`
  flex: 1;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const RightContent = styled.div`
  display: flex;
  margin-left: auto;
`;

export const RightArrowButton = styled(RightArrowIcon).attrs({
  size: "s",
  touch: 42,
  role: "button",
})``;

export const WrapperWithHoverStyle = styled.div`
  ${useHoverStyle}
`;

export const UpArrowButton = styled(UpArrowIcon).attrs({
  size: "s",
  touch: 42,
  role: "button",
})``;

export const DownArrowButton = styled(DownArrowIcon).attrs({
  size: "s",
  touch: 42,
  role: "button",
})``;
