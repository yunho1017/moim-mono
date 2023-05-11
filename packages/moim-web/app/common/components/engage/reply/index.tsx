import * as React from "react";
import styled from "styled-components";
import { FormattedMessage, FormattedNumber } from "react-intl";
import ReplyIconBase from "@icon/18-message-1.svg";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  display: inline-flex;
  width: fit-content;
  height: fit-content;
  align-items: center;

  :last-of-type {
    margin-left: ${px2rem(8)};
  }

  :first-of-type {
    margin-left: 0;
  }
`;

const ReplyButton = styled.span`
  cursor: pointer;
  display: inline-block;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle}
`;

const ReplyIcon = styled(ReplyIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
const ReplyCount = styled.span`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle}
`;

interface IProps {
  replyCount?: number;
  canReply?: boolean;
  replyText?: string;
  onReplyClick?(): void;
}

const Reply: React.FC<IProps> = ({
  replyCount,
  canReply,
  replyText,
  onReplyClick,
}) => {
  const replyElement = React.useMemo(
    () =>
      replyCount !== undefined && (
        <>
          <ReplyIcon />
          <ReplyCount>
            <FormattedNumber useGrouping={true} value={replyCount} />
          </ReplyCount>
        </>
      ),
    [replyCount],
  );

  const replyButton = React.useMemo(() => {
    if (!canReply) return null;
    return (
      <ReplyButton>
        {" "}
        ・ {replyText ?? <FormattedMessage id="thread_reply" />}
      </ReplyButton>
    );
  }, [canReply, replyText]);

  if (!replyElement && !replyButton) return null;
  return (
    <Wrapper onClick={onReplyClick}>
      {replyElement}
      {replyButton}
    </Wrapper>
  );
};

export default Reply;
