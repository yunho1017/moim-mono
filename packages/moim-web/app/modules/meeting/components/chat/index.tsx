// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import { createPortal } from "react-dom";
import { FormattedMessage } from "react-intl";
import { IconButton } from "amazon-chime-sdk-component-library-react";
import { isiOS } from "common/helpers/browserDetect";
import { px2rem } from "common/helpers/rem";

import FreezeView from "common/components/freezeView";
import SimpleMessageList, { IRefHandler } from "./components/list";
import SimpleMessageInput from "./components/input";
import { PortalContainer, Chat, Header, Title, Content, Close } from "./styled";
import useMessages from "app/modules/conversation/hooks/useMessages";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions } from "app/store";
import { createConversationMessage } from "app/actions/conversation";
import useIsMobile from "common/hooks/useIsMobile";

interface IProps {
  open: boolean;
  config: Moim.Meeting.IMeetingConfig;
  meetingId: Moim.Id;
  selfAttendId?: Moim.Id;
  onCloseChat(): void;
}

export interface ILocalMessage {
  id: Moim.Id;
  name: string;
  isMine: boolean;
  timestampMs: number;
  senderExternalUserId: Moim.Id;
  content: string;
}

const MeetingChat: React.FC<IProps> = ({
  open,
  config,
  meetingId,
  onCloseChat,
}) => {
  const isMobile = useIsMobile();
  const refPrevHeight = React.useRef<number>(window.outerWidth ?? 0);
  const refList = React.useRef<IRefHandler>(null);
  const refPortalContainer = React.useRef<HTMLDivElement>(null);
  const refLatestMessageId = React.useRef<Moim.Id>();
  const previousMessageId = React.useRef<Moim.Id>();
  const refMessageRecoveryPollTaskId = React.useRef<NodeJS.Timeout | null>(
    null,
  );
  const currentUser = useCurrentUser();
  const isiOSDevice = React.useMemo(() => isiOS(), []);

  const { createMessage } = useActions({
    createMessage: createConversationMessage,
  });
  const {
    messages: messageGroup,
    getMessageLoading,
    handleLoadMoreMessageList,
    handleGetConversationMessage,
    handleGetConversationMessageWithLatestId,
  } = useMessages(meetingId);

  const messages = React.useMemo(() => {
    const tmp: Moim.Conversations.IMessage[] = [];
    const transformedMessages: ILocalMessage[] = [];
    messageGroup.data.forEach(group => {
      group.data.forEach(msg => tmp.push(...msg.messages));
    });
    tmp.forEach(msg => {
      const content = msg.blocks
        ? (msg.blocks[0] as Moim.Blockit.ITextBlock).content
        : msg.content;
      transformedMessages.push({
        id: msg.id,
        name: msg.user.name,
        isMine: msg.user.id === currentUser?.id,
        timestampMs: msg.created_at,
        senderExternalUserId: msg.user.id,
        content,
      });
    });
    return transformedMessages;
  }, [currentUser, messageGroup.data]);

  const sendMessage = React.useCallback(
    (content: string) => {
      createMessage(null, {
        channel_id: meetingId,
        message: {
          content,
        },
      });
    },
    [createMessage, meetingId],
  );

  const messageRecoveryTaskCallback = React.useCallback(async () => {
    try {
      previousMessageId.current = refLatestMessageId.current;
      const latestId = await handleGetConversationMessageWithLatestId(
        meetingId,
        {
          after: refLatestMessageId.current,
          limit: isMobile ? 15 : 30,
        },
      );
      if (latestId) {
        refLatestMessageId.current = latestId;
      }
      // eslint-disable-next-line no-empty
    } catch {}
  }, [isMobile]);

  const registerRecoveryPoll = React.useCallback(() => {
    if (refMessageRecoveryPollTaskId.current === null) {
      refMessageRecoveryPollTaskId.current = setInterval(
        messageRecoveryTaskCallback,
        5000,
      );
    }
  }, [messageRecoveryTaskCallback]);

  const unregisterRecoveryPoll = React.useCallback(() => {
    if (refMessageRecoveryPollTaskId.current === null) {
      return;
    }
    clearInterval(refMessageRecoveryPollTaskId.current);
    refMessageRecoveryPollTaskId.current = null;
    refLatestMessageId.current = undefined;
    previousMessageId.current = undefined;
  }, []);

  React.useEffect(() => {
    if (meetingId) {
      handleGetConversationMessage(meetingId);
      registerRecoveryPoll();

      return () => {
        unregisterRecoveryPoll();
      };
    }
  }, [meetingId]);

  React.useEffect(() => {
    if (window.visualViewport) {
      const handler = () => {
        if (window.visualViewport && refPortalContainer.current) {
          const { height, offsetTop } = window.visualViewport;
          refPortalContainer.current.style.transform = `translate3d(0, ${px2rem(
            offsetTop,
          )}, 0)`;
          refPortalContainer.current.style.height = px2rem(height);
          if (refPrevHeight.current > height) {
            setTimeout(() => {
              refList.current?.onScrollToBottom();
            }, 100);
          }

          refPrevHeight.current = height;
        }
      };
      window.visualViewport.addEventListener("resize", handler, {
        passive: true,
      });

      return () => {
        window.visualViewport!.removeEventListener("resize", handler);
      };
    }
  }, []);

  const mainElem = React.useMemo(
    () => (
      <Chat className="chat">
        <Header>
          <Title>
            <FormattedMessage id="video_chat/screen/chat_title" />
          </Title>
          <IconButton
            className="close-button"
            label="close"
            onClick={onCloseChat}
            icon={<Close />}
          />
        </Header>
        <Content>
          <SimpleMessageList
            ref={refList}
            id={meetingId}
            messages={messages}
            paging={messageGroup.paging}
            loadMore={handleLoadMoreMessageList}
            isLoading={getMessageLoading}
          />
          <SimpleMessageInput
            disabled={!config.enableChat}
            onSend={sendMessage}
          />
        </Content>
      </Chat>
    ),
    [
      config.enableChat,
      getMessageLoading,
      handleLoadMoreMessageList,
      meetingId,
      messageGroup.paging,
      messages,
      onCloseChat,
      sendMessage,
    ],
  );

  if (!open) return null;

  return isiOSDevice
    ? createPortal(
        <PortalContainer ref={refPortalContainer}>
          <FreezeView isFreeze={open}>{mainElem}</FreezeView>
        </PortalContainer>,
        document.getElementById("vingle-portal") ?? document.body,
        "chime-chat-container",
      )
    : mainElem;
};

export default React.memo(MeetingChat);
