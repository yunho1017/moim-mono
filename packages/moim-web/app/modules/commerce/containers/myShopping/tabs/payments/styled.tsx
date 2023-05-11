import * as React from "react";
import styled from "styled-components";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import { pB2RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  padding: 0 0 ${px2rem(29)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const DateFilterBox = styled.div`
  padding: ${px2rem(4)} 0;
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: center;
  min-height: 50vh;

  span {
    display: inline-block;
    align-self: center;
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${pB2RegularStyle};
  }
`;

export function Divider() {
  return (
    <>
      <Spacer value={8} />
      <DefaultDivider />
      <Spacer value={8} />
    </>
  );
}
