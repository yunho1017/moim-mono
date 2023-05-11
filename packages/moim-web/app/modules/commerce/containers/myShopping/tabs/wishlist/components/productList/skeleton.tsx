import React from "react";
import styled from "styled-components";
import ProductITemSkeleton from "../productItem/skeleton";

import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(8)} 0;
`;

export default function Skeleton() {
  return (
    <Wrapper>
      <ProductITemSkeleton />
      <Spacer value={8} />
      <DefaultDivider />
      <Spacer value={8} />
      <ProductITemSkeleton />
      <Spacer value={8} />
      <DefaultDivider />
      <Spacer value={8} />
      <ProductITemSkeleton />
      <Spacer value={8} />
      <DefaultDivider />
      <Spacer value={8} />
      <ProductITemSkeleton />
      <Spacer value={8} />
      <DefaultDivider />
      <Spacer value={8} />
      <ProductITemSkeleton />
    </Wrapper>
  );
}
