import styled from "styled-components";
import RightArrowIconBase from "@icon/24-arrow-g.svg";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";

export const Wrapper = styled.label.attrs({ role: "button" })`
  display: flex;
  align-items: center;
  padding: ${px2rem(16)} 0;
`;

export const Title = styled(H8Bold)`
  flex: 1;
  text-align: left;
`;

export const RightArrowIcon = styled(RightArrowIconBase).attrs({
  touch: 24,
  size: "s",
})``;
