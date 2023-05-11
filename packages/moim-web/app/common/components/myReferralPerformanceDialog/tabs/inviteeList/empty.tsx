import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { B1Regular } from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";

const Wrapper = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  height: ${px2rem(400)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Empty() {
  return (
    <Wrapper>
      <FormattedMessage id="my_referral_my_performance_dialog_tab_invitees_list_empty" />
    </Wrapper>
  );
}

export default Empty;
