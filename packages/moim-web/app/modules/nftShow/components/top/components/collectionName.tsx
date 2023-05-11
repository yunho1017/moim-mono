import React from "react";
import styled from "styled-components";
import { H10Bold } from "common/components/designSystem/typos";

const Wrapper = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
`;

interface PropsType {
  value: string;
  onClick(): void;
}

const CollectionName: React.FC<PropsType> = ({ value, onClick }) => {
  return (
    <Wrapper role="button" onClick={onClick}>
      {value}
    </Wrapper>
  );
};

export default React.memo(CollectionName);
