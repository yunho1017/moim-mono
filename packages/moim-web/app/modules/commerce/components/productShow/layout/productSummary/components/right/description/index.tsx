import React from "react";
import styled from "styled-components";

import ProductSummaryElementWrapper from "../../wrapper";
import ShavedText from "common/components/shavedText";
import { getTextComponent } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled(ProductSummaryElementWrapper)`
  padding: ${px2rem(4)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  white-space: pre-wrap;
`;

const Description: React.FC<{
  description?: string;
  block: Moim.Component.ProductShow.IDescription;
}> = ({ description, block }) => {
  if (!description) {
    return null;
  }
  const Text = getTextComponent(block.textStyle ?? "p-body3");
  return (
    <Wrapper hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}>
      <Text>
        {block.maxLine ? (
          <ShavedText value={description} line={block.maxLine} />
        ) : (
          description
        )}
      </Text>
    </Wrapper>
  );
};

export default React.memo(Description);
