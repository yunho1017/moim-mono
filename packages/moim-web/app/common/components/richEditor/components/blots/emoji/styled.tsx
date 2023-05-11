import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  display: inline;
  padding-right: ${px2rem(4)};
  user-select: text;
  white-space: pre-wrap;
  font-variant-ligatures: none;
`;
