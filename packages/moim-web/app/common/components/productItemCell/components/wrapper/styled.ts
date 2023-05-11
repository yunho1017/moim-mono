import { px2rem } from "common/helpers/rem";
import styled, { css } from "styled-components";

export function getHorizontalAlignStyle(
  horizontalAlign: "start" | "center" | "end" | "space-around",
) {
  switch (horizontalAlign) {
    case "start":
      return css`
        text-align: left;
      `;

    case "center":
      return css`
        text-align: center;
      `;
    case "end":
      return css`
        text-align: right;
      `;
    default:
      return undefined;
  }
}

export function getFlexAlignStyle({
  direction,

  verticalAlign,
  horizontalAlign,
}: {
  direction: "column" | "row";
  verticalAlign?: "start" | "center" | "end" | "space-around";
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}) {
  const alignItems = direction === "row" ? verticalAlign : horizontalAlign;
  const justifyContent = direction === "row" ? horizontalAlign : verticalAlign;

  return css`
    ${alignItems &&
      css`
        align-items: ${alignItems === "start" || alignItems === "end"
          ? `flex-${alignItems}`
          : alignItems};
      `}
    ${justifyContent &&
      css`
        justify-content: ${justifyContent === "start" ||
        justifyContent === "end"
          ? `flex-${justifyContent}`
          : justifyContent};
      `}
  `;
}

export const Wrapper = styled.div<{
  direction?: "column" | "row";
  horizontalAlign?: "start" | "center" | "end" | "space-around";
  verticalAlign?: "start" | "center" | "end" | "space-around";
  gap?: number;
}>`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.direction ?? "column"};

  ${props =>
    getFlexAlignStyle({
      direction: props.direction ?? "column",
      horizontalAlign: props.horizontalAlign,
      verticalAlign: props.verticalAlign,
    })}
  ${props =>
    props.gap &&
    css`
      gap: ${px2rem(props.gap)};
    `}
`;
