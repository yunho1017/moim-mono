import * as React from "react";
import moment from "moment";
import shortid from "shortid";
import { useIntl } from "react-intl";
import styled, { css } from "styled-components";
import { useScrollStyle } from "common/components/designSystem/styles";
import { px2rem } from "common/helpers/rem";
import InfiniteScroller from "common/components/infiniteScroller/new";
import { DefaultLoader as Loader } from "common/components/loading";
import {
  pB2RegularStyle,
  H8Bold,
  B4Regular,
} from "common/components/designSystem/typos";
import { ILocalMessage } from "..";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  ${useScrollStyle};

  > div {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`;

const MessageItem = styled.div<{ isMine?: boolean }>`
  width: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: ${px2rem(8)};
  ${({ isMine }) =>
    isMine &&
    css`
      align-self: flex-end;
    `};
`;

const Header = styled.div<{ isMine?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: ${px2rem(4)};

  ${({ isMine }) =>
    isMine &&
    css`
      align-self: flex-end;
    `};
`;

const Username = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-left: ${px2rem(16)};
`;

const TimeStamp = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-left: ${px2rem(4)};
  margin-right: ${px2rem(16)};
`;

const Bubble = styled.p<{ isMine?: boolean }>`
  display: inline;
  width: fit-content;
  border-radius: ${px2rem(16)};
  padding: ${px2rem(4)} ${px2rem(12)};
  max-width: ${px2rem(252)};
  white-space: pre-wrap;
  word-break: break-word;
  color: ${props => props.theme.colorV2.colorSet.grey800};

  ${({ isMine, theme }) => {
    if (isMine) {
      return css`
        align-self: flex-end;
        margin-right: ${px2rem(9)};
        border-top-right-radius: 0;
        background-color: ${theme.colorV2.colorSet.grey200};
      `;
    } else {
      return css`
        margin-left: ${px2rem(16)};
        border-top-left-radius: 0;
        background-color: ${theme.colorV2.colorSet.grey50};
      `;
    }
  }}
  ${pB2RegularStyle};

  & + & {
    margin-top: ${px2rem(4)};
  }
`;

const MESSAGE_GROUPING_TIME_MS = 2 * 60 * 1000;

interface IMessageGroup {
  id: Moim.Id;
  name: string;
  isMine: boolean;
  timestampMs: number;
  senderExternalUserId: Moim.Id;
  messages: string[];
}

export interface IRefHandler {
  onScrollToBottom(): void;
}

interface IProps {
  id: Moim.Id;
  isLoading: boolean;
  messages: ILocalMessage[];
  paging: Moim.IPaging;
  loadMore(pagingKey: "before" | "after" | "total"): void;
}

const SimpleMessageList = React.forwardRef<IRefHandler, IProps>(
  ({ id, isLoading, messages, paging, loadMore }, ref) => {
    const intl = useIntl();
    const refWrapper = React.useRef<HTMLDivElement>(null);
    const refCanAutoScroll = React.useRef<boolean>(true);

    const messageGroup = React.useMemo(
      () =>
        messages.reduce<IMessageGroup[]>((list, msg) => {
          const latestGroup = list[list.length - 1];
          if (
            latestGroup &&
            latestGroup.name === msg.name &&
            Math.abs(latestGroup.timestampMs - msg.timestampMs) <
              MESSAGE_GROUPING_TIME_MS
          ) {
            latestGroup.messages.push(msg.content);
          } else {
            list.push({
              id: msg.id,
              name: msg.name,
              isMine: msg.isMine,
              timestampMs: msg.timestampMs,
              senderExternalUserId: msg.senderExternalUserId,
              messages: [msg.content],
            });
          }
          return list;
        }, []),
      [messages],
    );

    const messageElements = React.useMemo(
      () =>
        messageGroup.map(msg => {
          const sendDate = moment(msg.timestampMs);
          return (
            <MessageItem
              key={`message_${msg.name}_${shortid()}`}
              isMine={msg.isMine}
            >
              <Header isMine={msg.isMine}>
                {!msg.isMine && <Username>{msg.name}</Username>}
                <TimeStamp>
                  {sendDate.format(
                    intl.formatMessage({ id: "datetime_format_short_time" }),
                  )}
                </TimeStamp>
              </Header>
              {msg.messages.map(content => (
                <Bubble
                  key={`message_bubble_${msg.name}_${shortid()}`}
                  isMine={msg.isMine}
                >
                  {content}
                </Bubble>
              ))}
            </MessageItem>
          );
        }),
      [intl, messageGroup],
    );

    const handleScroll: React.UIEventHandler<HTMLDivElement> = React.useCallback(
      e => {
        const scrollHeight = e.currentTarget.scrollHeight;
        const scrollTop = e.currentTarget.scrollTop;
        const clientHeight = e.currentTarget.clientHeight;
        const calcPos = scrollHeight - scrollTop;
        refCanAutoScroll.current = clientHeight + 120 >= calcPos;
      },
      [],
    );

    const handleScrollToBottom = React.useCallback(() => {
      if (refWrapper.current && refCanAutoScroll.current) {
        refWrapper.current.scrollTo({
          top: refWrapper.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, []);

    const handleAutoScrollToBottom = React.useCallback(() => {
      if (refWrapper.current && refCanAutoScroll.current) {
        refWrapper.current.scrollTo({
          top: refWrapper.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, []);

    React.useImperativeHandle(ref, () => ({
      onScrollToBottom: handleScrollToBottom,
    }));

    React.useLayoutEffect(() => {
      if (messages.length > 0 && messages[messages.length - 1].isMine) {
        handleScrollToBottom();
      } else {
        handleAutoScrollToBottom();
      }
    }, [messages.length]);

    return (
      <Wrapper
        ref={refWrapper}
        data-scroll-lock-scrollable
        onScroll={handleScroll}
      >
        <InfiniteScroller
          loadMore={loadMore}
          isLoading={isLoading}
          loader={<Loader />}
          paging={paging}
          itemLength={messages.length}
          reverse={true}
          useInitialScroll={true}
          identity={id}
          threshold={0}
        >
          {messageElements}
        </InfiniteScroller>
      </Wrapper>
    );
  },
);

export default SimpleMessageList;
