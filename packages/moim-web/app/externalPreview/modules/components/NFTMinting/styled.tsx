import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  ${useScrollStyle}
`;

export const Body = styled.div`
  padding: ${px2rem(45)} ${px2rem(24)} ${px2rem(24)} ${px2rem(24)};
`;
