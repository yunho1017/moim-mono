import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div<{
  element: Moim.Layout.Navigation.WrapperElementType;
}>`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;

  ${props => {
    const { size } = props.element;

    switch (size?.type) {
      case "ratio":
        return css`
          flex: ${size.value};
          min-width: 0;
        `;

      case "percentage":
        return css`
          width: ${size.value}%;
        `;

      case "fixed":
        return css`
          width: ${px2rem(size.value)};
        `;

      case "fit-contents":
      default:
        return css`
          width: fit-content;
        `;
    }
  }}

  ${props => {
    const { minWidth, maxWidth, padding, align } = props.element;

    return css`
      ${() => {
        switch (minWidth?.type) {
          case "percentage":
            return css`
              min-width: ${minWidth.value}%;
            `;

          case "fixed":
            return css`
              min-width: ${px2rem(minWidth.value)};
            `;
        }
      }};

      ${() => {
        switch (maxWidth?.type) {
          case "percentage":
            return css`
              max-width: ${maxWidth.value}%;
            `;

          case "fixed":
            return css`
              max-width: ${px2rem(maxWidth.value)};
            `;
        }
      }};

      ${() => {
        switch (align) {
          case "center":
            return css`
              justify-content: center;
            `;

          case "left":
            return css`
              justify-content: flex-start;
            `;
          case "right":
            return css`
              justify-content: flex-end;
            `;
        }
      }};

      padding: ${px2rem(padding?.top ?? 0)} ${px2rem(padding?.right ?? 0)}
        ${px2rem(padding?.bottom ?? 0)} ${px2rem(padding?.left ?? 0)};
    `;
  }}
`;
