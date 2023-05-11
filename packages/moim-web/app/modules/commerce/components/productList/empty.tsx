import * as React from "react";
import styled from "styled-components";
import { B3Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { FormattedMessage } from "react-intl";

const Wrapper = styled(B3Regular)`
  width: 100%;
  margin: ${px2rem(120)} 0;
  text-align: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
export default function ProductList() {
  return (
    <Wrapper>
      <FormattedMessage id="product_list_empty" />
    </Wrapper>
  );
}
