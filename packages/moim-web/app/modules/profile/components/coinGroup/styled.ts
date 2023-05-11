import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(4)} ${px2rem(16)} 0;
  display: flex;
  flex-direction: column;
`;
