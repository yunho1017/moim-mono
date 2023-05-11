import * as React from "react";
import styled from "styled-components";
import { B2Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const MenuEmptyWrapper = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(10)} ${px2rem(16)};
`;

export function MenuEmpty() {
  return (
    <MenuEmptyWrapper>
      {/* <FormattedMessage id="" /> */}
      No items
    </MenuEmptyWrapper>
  );
}
