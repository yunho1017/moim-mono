import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};

  display: flex;
  align-items: center;
  padding: ${px2rem(11)} 0 ${px2rem(10)};
`;
