import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useOpacityHoverStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(12)} ${px2rem(16)} ${px2rem(8)};
`;

export const PositionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -${px2rem(4)};
`;

export const PositionCell = styled.span.attrs({ role: "button" })`
  display: inline-flex;
  max-width: ${px2rem(270)};
  margin: 0 ${px2rem(8)} ${px2rem(8)} 0;

  ${useOpacityHoverStyle}
`;
