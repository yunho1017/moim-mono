import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import { MessageStartFromChannel } from "common/components/talk/components/messageStart";
import { ThreadInput } from "common/components/threadV2";
import {
  Wrapper,
  ThreadInputWrapper,
  NoRightTextWrapper,
  NoRightText,
} from "./styled";
import ConversationHelmet from "../../components/helmet";
import PermissionChecker from "common/components/permissionChecker";
import FreezeView from "common/components/freezeView";
import MessageList from "../../components/messageList";
import Header from "../../components/header";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import { UnsignedChatInputFeedback } from "common/components/feedBack/components/unsigned/input";
// hooks
import { useProps, useHandlers, useEffects } from "./hooks";
// helpers
import { PermissionDeniedFallbackType } from "app/enums";
import { MEDIA_QUERY } from "common/constants/responsive";

const StyledUnsignedChatInputFeedback = styled(UnsignedChatInputFeedback)`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${props => props.theme.zIndexes.gnbSticky + 1};
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
  }
`;
export interface IProps {
  channelId: string;
}

export default function ConversationShow(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);
  useEffects(hookProps, hookHandlers);
  const {
    refThis,
    inputRef,
    inputWrapperRef,
    channelId,
    intl,
    isMobile,
    currentConversation,
    hasReadPermission,
    hasSendPermission,
    isPermissionLoading,
    hideInput,
    mobileHeight,
  } = hookProps;
  const { handleEnter, handleFocus } = hookHandlers;
  const { expandSideNavigation } = useSideNavigationPanel();

  return (
    <Wrapper ref={refThis} mobileHeight={mobileHeight}>
      <PermissionChecker
        fallbackType={PermissionDeniedFallbackType.SCREEN}
        hasPermission={hasReadPermission}
        isLoading={isPermissionLoading}
        onBackClick={expandSideNavigation}
      >
        <ConversationHelmet />
        <Header
          type="conversation"
          wrapperRef={refThis}
          channelId={channelId}
          currentConversation={currentConversation}
        />

        <FreezeView isFreeze={false}>
          <MessageList
            channelId={channelId}
            header={
              currentConversation && (
                <MessageStartFromChannel channel={currentConversation} />
              )
            }
            useIsMine={true}
            enableRightOrderForMine={true}
          />
        </FreezeView>
      </PermissionChecker>

      <PermissionChecker
        fallbackType={PermissionDeniedFallbackType.CUSTOM}
        hasPermission={hasSendPermission}
        isLoading={isPermissionLoading}
        permissionDeniedCustomElement={
          <NoRightTextWrapper>
            <NoRightText>
              <FormattedMessage id="no_right_block_input_placeholder" />
            </NoRightText>
          </NoRightTextWrapper>
        }
        unsignedCustomElement={<StyledUnsignedChatInputFeedback />}
      >
        <ThreadInputWrapper visibility={!isMobile || !hideInput}>
          <ThreadInput
            ref={inputWrapperRef}
            inputRef={inputRef}
            id={currentConversation?.id || "group-input"}
            disableImageBlockUpload={true}
            maxAttachmentCount={1}
            onFocus={handleFocus}
            onEnter={handleEnter}
            placeholder={intl.formatMessage(
              {
                id: "chat_show/chat_message_placeholder",
              },
              {
                channel_name: currentConversation?.name,
              },
            )}
            resizeDetectHeight={true}
          />
        </ThreadInputWrapper>
      </PermissionChecker>
    </Wrapper>
  );
}
