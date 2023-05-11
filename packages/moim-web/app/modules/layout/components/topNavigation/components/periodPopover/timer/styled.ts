import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import { bgLevel2Style } from "common/components/designSystem/BGLevel";

export const Wrapper = styled(H8Bold)`
  ${bgLevel2Style}
  width: 100%;
  height: ${px2rem(40)};
  padding: ${px2rem(8)} 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${props => props.theme.colorV2.colorSet.grey800};

  border-radius: ${px2rem(4)};
`;
