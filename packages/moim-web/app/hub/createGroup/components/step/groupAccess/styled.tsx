import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  useHoverStyle,
  useSelectedStyle,
} from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  margin-bottom: ${px2rem(8)};
`;

export const RowWrapper = styled.div<{ selected?: boolean }>`
  position: relative;
  padding: 0 ${px2rem(16)} ${px2rem(16)};

  ${props => props.selected && useSelectedStyle};
  ${useHoverStyle};
`;
