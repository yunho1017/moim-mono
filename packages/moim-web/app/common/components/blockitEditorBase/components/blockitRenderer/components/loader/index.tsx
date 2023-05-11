import * as React from "react";
import styled from "styled-components";
import { DefaultLoader } from "common/components/loading";

const Wrapper = styled.div`
  width: 100%;
`;

const LoadingBlock = () => (
  <Wrapper>
    <DefaultLoader />
  </Wrapper>
);

export default LoadingBlock;
