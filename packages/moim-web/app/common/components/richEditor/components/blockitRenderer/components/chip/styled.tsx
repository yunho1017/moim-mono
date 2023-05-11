import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { ChipSize } from "common/components/chips";

export const Content = styled.div<{
  size: ChipSize;
}>`
  ${props => {
    switch (props.size) {
      case "medium": {
        return `max-width: ${px2rem(140)};`;
      }
      case "small": {
        return `max-width: ${px2rem(110)};`;
      }
    }
  }}
`;
