import styled from "styled-components";
import RightArrowIconBase from "@icon/24-arrow-g.svg";

export const Wrapper = styled.label.attrs({ role: "button" })``;

export const Title = styled.span`
  display: block;
  text-align: left;
`;

export const IconImageWrapper = styled.div`
  position: relative;
`;

export const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RightArrowIcon = styled(RightArrowIconBase).attrs({
  touch: 24,
  size: "s",
})``;
