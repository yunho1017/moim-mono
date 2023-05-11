import * as React from "react";

import MessageItem from "../messageItem";
import { Container, Content, Group } from "./styledComponents";

import useCurrentUser from "common/hooks/useCurrentUser";

interface IProps {
  channelId: Moim.Id;
  messageGroupList: Moim.Conversations.IMessageGroup[];
  useIsMine?: boolean;
  enableRightOrderForMine?: boolean;
  onLike?(message: Moim.Conversations.IMessage): void;
  onReport?(message: Moim.Conversations.IMessage): void;
  onRetry?(message: Moim.Conversations.IMessage): void;
  onDelete?(message: Moim.Conversations.IMessage): void;
}

function useCachedMessageKey() {
  const cachedMessages: React.MutableRefObject<Moim.Conversations.IMessage[]> = React.useRef(
    [],
  );
  return React.useCallback(
    (messages: readonly Moim.Conversations.IMessage[]) => {
      const messageIds = messages.map(message => message.id);
      let cachedMessage = cachedMessages.current.find(message =>
        messageIds.includes(message.id),
      );
      if (!cachedMessage) {
        cachedMessage = messages[0];
        cachedMessages.current.push(cachedMessage);
      }
      return cachedMessage.id;
    },
    [cachedMessages],
  );
}

function TalkGroup({
  channelId,
  messageGroupList,
  enableRightOrderForMine,
  useIsMine,
  onLike,
  onReport,
  onRetry,
  onDelete,
}: IProps) {
  const getCachedMessageKey = useCachedMessageKey();
  const currentUser = useCurrentUser();

  if (!messageGroupList.length) {
    return null;
  }

  return (
    <Container>
      <Content>
        {messageGroupList.map(messageGroup => (
          <Group
            key={`messageGroup__${getCachedMessageKey(messageGroup.messages)}`}
          >
            {messageGroup.messages.map((message, messageIndex) => {
              const messageItemMode = Boolean(messageIndex)
                ? "simple"
                : "normal";
              const isMine = Boolean(
                useIsMine && currentUser?.id === message.user.id,
              );
              return (
                <MessageItem
                  key={`talkItem__${message.id}`}
                  channelId={channelId}
                  isMine={isMine}
                  message={message}
                  onLike={onLike}
                  onReport={onReport}
                  onRetry={onRetry}
                  onDelete={onDelete}
                  enableRightOrderForMine={enableRightOrderForMine}
                  mode={messageItemMode}
                />
              );
            })}
          </Group>
        ))}
      </Content>
    </Container>
  );
}

export default React.memo(TalkGroup);
