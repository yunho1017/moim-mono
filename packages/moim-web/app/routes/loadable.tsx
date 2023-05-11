import * as React from "react";
import styled from "styled-components";
import loadable from "@loadable/component";
import { DefaultLoader } from "common/components/loading";

const Wrapper = styled.div`
  margin-top: 30%;
`;

export function VingleLoadable(component: () => Promise<any>) {
  return loadable<any>(component, {
    fallback: (
      <Wrapper>
        <DefaultLoader />
      </Wrapper>
    ),
  });
}
