import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B1RegularStyle,
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";

export type ChipShape = "round" | "rectangle";
export type ChipSize = "large" | "medium" | "small";

function chipShapeGenerator(shape: ChipShape, size: ChipSize) {
  if (shape === "round") {
    switch (size) {
      case "large": {
        return css`
          border-radius: ${px2rem(15)};
          padding: ${px2rem(6)} ${px2rem(16)};
          ${B3RegularStyle};
        `;
      }
      case "medium": {
        return css`
          border-radius: ${px2rem(10.5)};
          padding: ${px2rem(1)} ${px2rem(6)};
          ${B3RegularStyle};
        `;
      }
      case "small": {
        return css`
          border-radius: ${px2rem(10)};
          padding: ${px2rem(1)} ${px2rem(6)};
          ${B4RegularStyle};
        `;
      }
    }
  } else {
    switch (size) {
      case "large": {
        return css`
          border-radius: ${px2rem(2)};
          padding: ${px2rem(1)} ${px2rem(8)};
          ${B1RegularStyle};
        `;
      }
      case "medium": {
        return css`
          border-radius: ${px2rem(2)};
          padding: ${px2rem(1)} ${px2rem(6)};
          ${B3RegularStyle};
        `;
      }
      case "small": {
        return css`
          border-radius: ${px2rem(2)};
          padding: 0 ${px2rem(4)};
          ${B4RegularStyle};
        `;
      }
    }
  }
}

export interface IWrapperProps {
  shape: ChipShape;
  size: ChipSize;
  overrideStyle?: FlattenInterpolation<any>;
}

export const Wrapper = styled.div<IWrapperProps>`
  display: inline-flex;
  outline: 0;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  white-space: nowrap;
  text-decoration: none;

  cursor: ${props => (props.onClick ? "cursor" : "default")};
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  ${props => chipShapeGenerator(props.shape, props.size)};
  ${props => props.overrideStyle};
`;
