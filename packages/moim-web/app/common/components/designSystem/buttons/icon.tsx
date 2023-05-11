import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

const sizeMap = new Map<Moim.DesignSystem.Size, number>([
  ["s", 30],
  ["m", 38],
]);

export const IconButton = styled.button.attrs({ type: "button" })<{
  size?: Moim.DesignSystem.Size;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => px2rem(sizeMap.get(props.size || "s")!)};
  height: ${props => px2rem(sizeMap.get(props.size || "s")!)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey50};
  border-top-left-radius: ${px2rem(2)};
  border-bottom-left-radius: ${px2rem(2)};
  border-right-width: 0;
  transition: background-color 300ms;
  & ~ & {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left-width: 0;
  }
  &:last-child {
    border-top-right-radius: ${px2rem(2)};
    border-bottom-right-radius: ${px2rem(2)};
    border-right-width: ${px2rem(1)};
  }
  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }
`;
