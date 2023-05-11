import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  width: 100%;
  font-size: ${px2rem(14)};
  font-weight: ${props => props.theme.font.bold};

  padding: ${px2rem(12)} ${px2rem(16)};
`;

export const Contents = styled.div`
  width: 100%;
`;
