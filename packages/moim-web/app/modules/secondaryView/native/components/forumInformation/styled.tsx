import styled from "styled-components";
import { H8BoldStyle } from "common/components/designSystem/typos";
import ShavedText from "common/components/shavedText";

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled(ShavedText)`
  ${H8BoldStyle};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
