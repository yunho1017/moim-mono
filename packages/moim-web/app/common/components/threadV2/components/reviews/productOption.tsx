import * as React from "react";
import styled from "styled-components";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(2)} 0;
  ${B4RegularStyle};
  ${useSingleLineStyle}
`;

interface IProps {
  value: string;
}

const ProductOption: React.FC<IProps> = ({ value }) => (
  <Wrapper>{value}</Wrapper>
);

export default ProductOption;
