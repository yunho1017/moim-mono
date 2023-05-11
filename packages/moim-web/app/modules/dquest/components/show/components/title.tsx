import * as React from "react";
import styled from "styled-components";
import { H2BoldStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const TitleBody = styled.div`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(8)} 0;
  ${H2BoldStyle}
`;

interface IProps {
  text: string;
}
const Title: React.FC<IProps> = ({ text }) => <TitleBody>{text}</TitleBody>;

export default React.memo(Title);
