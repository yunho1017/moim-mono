import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B2RegularStyle } from "common/components/designSystem/typos";

const DescriptionBody = styled.div`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(12)} 0;
  white-space: pre-wrap;

  ${B2RegularStyle}
`;

interface IProps {
  text: string;
}
const Description: React.FC<IProps> = ({ text }) => (
  <DescriptionBody>{text}</DescriptionBody>
);

export default React.memo(Description);
