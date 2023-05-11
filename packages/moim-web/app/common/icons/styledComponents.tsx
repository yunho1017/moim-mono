import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

const sizeMap = new Map<Moim.DesignSystem.Size, number>([
  ["xs", 18],
  ["s", 24],
  ["m", 36],
  ["l", 48],
]);

export const TouchWrapper = styled.span.attrs({ role: "button" })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const SizeWrapper = styled.span<{
  size: Moim.DesignSystem.Size;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => px2rem(sizeMap.get(props.size)!)};
  height: ${props => px2rem(sizeMap.get(props.size)!)};
  svg {
    width: 100%;
    height: 100%;
  }
`;
