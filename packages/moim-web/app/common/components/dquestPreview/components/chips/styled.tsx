import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { ChipSize } from "common/components/chips";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const MaxWidthContent = styled.div<{
  size: ChipSize;
  maxWidth?: number;
}>`
  ${props => {
    if (props.maxWidth) {
      return `max-width: ${px2rem(props.maxWidth)}`;
    }
    switch (props.size) {
      case "medium": {
        return `max-width: ${px2rem(140)};`;
      }
      case "small": {
        return `max-width: ${px2rem(110)};`;
      }
    }
  }}

  ${useSingleLineStyle}
`;
