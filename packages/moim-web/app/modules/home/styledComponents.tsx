import styled from "styled-components";
import { H2Bold } from "common/components/designSystem/typos";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WelcomeText = styled(H2Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  text-align: center;
`;
