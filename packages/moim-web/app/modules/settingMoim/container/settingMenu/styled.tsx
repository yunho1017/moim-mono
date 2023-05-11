import styled from "styled-components";
import { H2Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Title = styled(H2Bold)`
  padding-left: ${px2rem(16)};
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
