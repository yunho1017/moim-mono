import * as React from "react";
import styled from "styled-components";
import ShavedText from "common/components/shavedText";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { Spacer } from "common/components/designSystem/spacer";

const DescriptionText = styled.div`
  ${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

interface IProps {
  value: string;
}

const Description: React.FC<IProps> = ({ value }: IProps) => (
  <DescriptionText>
    <Spacer value={9} />
    <ShavedText value={value} line={2} />
  </DescriptionText>
);

export default React.memo(Description);
