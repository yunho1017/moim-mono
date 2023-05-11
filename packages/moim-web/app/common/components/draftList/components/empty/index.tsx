import * as React from "react";
import styled from "styled-components";
import { B1Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { FormattedMessage } from "react-intl";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: ${px2rem(32)};
  padding-bottom: ${px2rem(42)};
`;
const EmojiWrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: ${px2rem(60)};
  line-height: 1.5;

  padding-top: ${px2rem(12)};
  padding-bottom: ${px2rem(16)};
`;
const EmptyMessage = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

const EmptyComponent: React.FC = ({}) => (
  <Wrapper>
    <EmojiWrapper>📃</EmojiWrapper>
    <EmptyMessage>
      <FormattedMessage id="post_draft/page_empty" />
    </EmptyMessage>
  </Wrapper>
);

export default EmptyComponent;
