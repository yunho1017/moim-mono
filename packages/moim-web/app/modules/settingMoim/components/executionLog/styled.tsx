import styled from "styled-components";
import { H10Bold } from "common/components/designSystem/typos";
import { TextButton } from "common/components/designSystem/buttons";

export const ExecutionTitle = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const LogButton = styled(TextButton).attrs({ size: "s" })`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
