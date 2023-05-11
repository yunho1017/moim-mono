import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { B1Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${px2rem(32)} 0 ${px2rem(42)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmojiWrapper = styled.div`
  height: ${px2rem(90)};
  font-size: ${px2rem(60)};
  line-height: 1.5;
  margin-top: ${px2rem(12)};
`;

const GuideText = styled(B1Regular)`
  margin-top: ${px2rem(16)};
  text-align: center;
  white-space: pre-line;
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export default function Empty() {
  return (
    <EmptyWrapper>
      <EmojiWrapper>📌</EmojiWrapper>
      <GuideText>
        <FormattedMessage id="pinned_post_page_empty" />
      </GuideText>
    </EmptyWrapper>
  );
}
