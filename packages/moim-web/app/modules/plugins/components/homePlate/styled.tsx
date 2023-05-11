import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  max-width: ${px2rem(720)};
  height: 100%;
  flex: 1;
  min-width: 0%;
  padding-top: ${px2rem(24)};
  padding-left: ${px2rem(40)};

  ${useScrollStyle}
`;
