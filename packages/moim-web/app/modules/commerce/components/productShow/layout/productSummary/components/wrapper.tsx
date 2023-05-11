import React from "react";
import styled from "styled-components";
import { DefaultDivider } from "common/components/divider";
import { DividerWrapper } from "../styled";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

const ProductSummaryElementWrapper: React.FC<{
  hasBottomDivider: boolean;
  className?: string;
}> = ({ children, hasBottomDivider, className }) => {
  return (
    <>
      <Wrapper className={className}>{children}</Wrapper>
      {hasBottomDivider && (
        <DividerWrapper>
          <DefaultDivider />
        </DividerWrapper>
      )}
    </>
  );
};

export default ProductSummaryElementWrapper;
