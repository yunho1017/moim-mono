import * as React from "react";
import styled from "styled-components";

import { px2rem } from "common/helpers/rem";

import LoadingIcon from "./icon";

export const DefaultLoaderWrapper = styled.div`
  margin: ${px2rem(20)} 0;
`;

export function DefaultLoader({
  ...rest
}: React.ComponentProps<typeof LoadingIcon>) {
  return (
    <DefaultLoaderWrapper>
      <LoadingIcon {...rest} />
    </DefaultLoaderWrapper>
  );
}

export { default as CircularLoading } from "./circular";
export { default as LinearLoading } from "./linear";
export { LoadingIcon };
