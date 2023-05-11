import * as React from "react";
import styled from "styled-components";

import { H10Bold } from "common/components/designSystem/typos";
import ShavedText from "common/components/shavedText";

import { px2rem } from "common/helpers/rem";

const PopoverCategoryItemWrapper = styled(H10Bold)`
  width: 100%;
  height: ${px2rem(42)};
  padding: 0 ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  display: flex;
  align-items: center;
`;

export const WithPopoverCategory = styled.div`
  width: 100%;
  padding-bottom: ${px2rem(16)};
  border-top: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey50};
`;

export default function PopoverCategoryItem({
  id,
  name,
}: {
  name: string;
  id: Moim.Id;
}) {
  return (
    <PopoverCategoryItemWrapper key={id}>
      <ShavedText line={1} value={name} />
    </PopoverCategoryItemWrapper>
  );
}
