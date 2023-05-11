import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { B1Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Message = styled(B1Regular)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  margin: ${px2rem(16)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  white-space: pre-line;
  text-align: center;
`;

export default function EmptyFilteredList() {
  return (
    <Message>
      <FormattedMessage id="post_list/filter_result_empty" />
    </Message>
  );
}
