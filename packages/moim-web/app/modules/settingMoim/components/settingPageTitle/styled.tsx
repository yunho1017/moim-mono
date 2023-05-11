import styled from "styled-components";
import { H8Bold } from "common/components/designSystem/typos";

export const Title = styled(H8Bold)`
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
