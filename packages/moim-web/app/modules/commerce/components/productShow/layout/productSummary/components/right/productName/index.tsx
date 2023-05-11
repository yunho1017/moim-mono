import React from "react";
import styled from "styled-components";

import ShavedText from "common/components/shavedText";
import ProductSummaryElementWrapper from "../../wrapper";

import { getTextComponent } from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";

const Wrapper = styled(ProductSummaryElementWrapper)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

const ProductName: React.FC<{
  title: string;
  block: Moim.Component.ProductShow.IProductName;
}> = ({ title, block }) => {
  const Text = getTextComponent(block.textStyle ?? "h2");
  return (
    <Wrapper hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}>
      <Text>
        {block.maxLine ? (
          <ShavedText value={title} line={block.maxLine} />
        ) : (
          title
        )}
      </Text>
    </Wrapper>
  );
};

export default React.memo(ProductName);
