import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  color: ${props => props.theme.color.red700};

  & > span + span {
    &::before {
      content: ":";
      margin: 0 ${px2rem(4)};
    }
  }
`;
