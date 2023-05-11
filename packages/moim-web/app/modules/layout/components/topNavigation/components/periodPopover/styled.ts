// vendor
import styled from "styled-components";
import { B3Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: ${px2rem(230)};
  padding: ${px2rem(8)} ${px2rem(16)} ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Label = styled(B3Regular)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${px2rem(42)};
  & > * + * {
    &::before {
      content: "|";
      margin: 0 ${px2rem(2)};
    }
  }
`;
