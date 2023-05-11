import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import CheckIconBase from "@icon/24-checkmark-w.svg";
import RightArrowIcon from "@icon/18-rightarrow-g.svg";

export const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: ${px2rem(-18)};
  margin-bottom: ${px2rem(-16)};
`;

export const ColorGridItem = styled.div`
  margin-right: ${px2rem(18)};
  margin-bottom: ${px2rem(16)};
`;

export const ColorBox = styled.div.attrs<{ color: string }>({
  role: "button",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  border-radius: ${px2rem(2)};
  background-color: ${props => props.color};
`;

export const CheckIcon = styled(CheckIconBase).attrs({
  size: "m",
  touch: 24,
})``;

export const RightArrowButton = styled(RightArrowIcon).attrs({
  size: 18,
  touch: 18,
  role: "button",
})``;

export const CurrentColorBox = styled.div<{ color: string }>`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  border-radius: ${px2rem(2)};
  background-color: ${props => props.color};
`;

export const DialogColorSelectorWrapper = styled.div`
  padding: 0 ${px2rem(20)};
`;
