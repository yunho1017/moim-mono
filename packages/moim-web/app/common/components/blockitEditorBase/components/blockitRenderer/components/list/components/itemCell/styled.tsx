import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";

export const CommonTextsWrapStyle = css`
  padding: 0;
`;

export const Left = styled.div`
  height: 100%;
`;
export const Body = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${px2rem(12)};
`;
export const Right = styled.div`
  max-width: ${px2rem(104)};
  height: 100%;
  margin-left: ${px2rem(4)};
`;

export const Title = styled.div`
  min-height: ${px2rem(22)};
`;
export const Description = styled.div`
  margin-top: ${px2rem(2)};
  min-height: ${px2rem(16)};
`;

const LargeWrapStyle = css`
  padding: ${px2rem(12)} ${px2rem(16)};
`;
const MediumWrapStyle = css`
  padding: ${px2rem(14)} ${px2rem(16)};
`;
const SmallWrapStyle = css`
  padding: ${px2rem(9)} ${px2rem(16)};
`;

export const Wrapper = styled.div<{
  size: "large" | "medium" | "small";
  align: "left" | "right";
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  ${props => props.overrideStyle};

  ${props =>
    props.align === "right"
      ? css`
          flex-direction: row-reverse;
          * {
            text-align: right;
          }
          ${Body}, ${Right} {
            margin-left: 0;
            margin-right: ${px2rem(12)};
          }
        `
      : null};

  ${props => {
    switch (props.size) {
      case "large":
        return LargeWrapStyle;
      case "medium":
        return MediumWrapStyle;
      case "small":
        return SmallWrapStyle;
    }
  }}
`;
