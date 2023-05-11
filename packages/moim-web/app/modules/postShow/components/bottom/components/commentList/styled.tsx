import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { B1Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import {
  MAX_HEIGHT,
  TOOLBAR_HEIGHT,
} from "common/components/groupInput/styledComponent";

const MIN_HEIGHT = MAX_HEIGHT + TOOLBAR_HEIGHT + 30;

export const Wrapper = styled.div`
  margin-top: ${px2rem(22)};
`;

export const Container = styled.div`
  flex: 1;
  min-width: 0;
`;

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${px2rem(MIN_HEIGHT)};
  padding-bottom: ${px2rem(98)};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${px2rem(80)} 0;
`;

const GuideText = styled(B1Regular)`
  text-align: center;
  white-space: pre-line;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export function EmptyComment() {
  return (
    <EmptyWrapper>
      <GuideText>
        <FormattedMessage id="post_show/comment_empty" />
      </GuideText>
    </EmptyWrapper>
  );
}
