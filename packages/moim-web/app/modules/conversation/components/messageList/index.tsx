import * as React from "react";
import moment from "moment";
import { useIntl } from "react-intl";
// components
import InfiniteScroller from "common/components/infiniteScroller";
import { DefaultLoader as Loader } from "common/components/loading";
import { MessageGroup } from "common/components/talk";
import MessageLabel from "common/components/talk/components/messageLabel";
import MessageAutoFocusController from "./messageListFocusController";
import TargetScrollItem from "common/components/targetScrollItem";
import { MessageGroupWrapper, Header, Contents } from "./styled";
// hooks
import useMessages from "../../hooks/useMessages";

import { WITHOUT_TIME_DATE_FORMAT } from "common/constants/default";

export interface IProps {
  channelId: Moim.Id;
  header: React.ReactNode;
  useIsMine?: boolean;
  enableRightOrderForMine?: boolean;
}

export default function MessageList({
  channelId,
  header,
  useIsMine,
  enableRightOrderForMine,
}: IProps) {
  const intl = useIntl();
  const {
    messages,
    messageLength,
    getMessageLoading,
    handleLoadMoreMessageList,
    handleDelete,
  } = useMessages(channelId);

  const messageList = React.useMemo(
    () =>
      messages.data.map((messageGroup, idx) => {
        if (idx === messageGroup.data.length) {
          return (
            <TargetScrollItem>
              <MessageGroupWrapper
                key={`message_group_${messageGroup.created_at}`}
              >
                <MessageLabel
                  title={moment(messageGroup.created_at).format(
                    intl.formatMessage({ id: WITHOUT_TIME_DATE_FORMAT }),
                  )}
                />
                <MessageGroup
                  channelId={channelId}
                  useIsMine={useIsMine}
                  enableRightOrderForMine={enableRightOrderForMine}
                  messageGroupList={messageGroup.data}
                  onDelete={handleDelete}
                />
              </MessageGroupWrapper>
            </TargetScrollItem>
          );
        }
        return (
          <MessageGroupWrapper key={`message_group_${messageGroup.created_at}`}>
            <MessageLabel
              title={moment(messageGroup.created_at).format(
                intl.formatMessage({ id: WITHOUT_TIME_DATE_FORMAT }),
              )}
            />
            <MessageGroup
              channelId={channelId}
              useIsMine={useIsMine}
              enableRightOrderForMine={enableRightOrderForMine}
              messageGroupList={messageGroup.data}
              onDelete={handleDelete}
            />
          </MessageGroupWrapper>
        );
      }),
    [
      messages.data,
      intl,
      channelId,
      useIsMine,
      enableRightOrderForMine,
      handleDelete,
    ],
  );

  return (
    <MessageAutoFocusController channelId={channelId}>
      <Header>{header}</Header>
      <Contents>
        <InfiniteScroller
          loadMore={handleLoadMoreMessageList}
          isLoading={getMessageLoading}
          loader={<Loader />}
          paging={messages.paging}
          itemLength={messageLength}
          reverse={true}
          useInitialScroll={true}
          identity={channelId}
          threshold={0}
        >
          {messageList}
        </InfiniteScroller>
      </Contents>
    </MessageAutoFocusController>
  );
}
