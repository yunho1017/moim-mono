import React from "react";
import styled from "styled-components";
import { H4Bold } from "common/components/designSystem/typos";

const Wrapper = styled(H4Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
`;

interface PropsType {
  value: string;
}

const Name: React.FC<PropsType> = ({ value }) => {
  return <Wrapper>{value}</Wrapper>;
};

export default React.memo(Name);
