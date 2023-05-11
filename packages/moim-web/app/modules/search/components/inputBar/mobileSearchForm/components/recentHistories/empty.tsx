import React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B3Regular } from "common/components/designSystem/typos";
import { FormattedMessage } from "react-intl";

const Wrapper = styled(B3Regular)`
  width: 100%;
  padding: ${px2rem(12)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

const Empty: React.FC = ({}) => {
  return (
    <Wrapper>
      <FormattedMessage id="search_recent_keyword_list_empty" />
    </Wrapper>
  );
};

export default Empty;
